# CSRF令牌

## 目录

- [前端与BFF层的CSRF令牌协同防御（无需登录场景）](#前端与BFF层的CSRF令牌协同防御无需登录场景)
  - [一、架构概览](#一架构概览)
  - [二、BFF层CSRF令牌生成机制](#二BFF层CSRF令牌生成机制)
    - [1. 匿名会话令牌生成](#1-匿名会话令牌生成)
    - [2. 客户端指纹生成逻辑](#2-客户端指纹生成逻辑)
  - [三、前端获取和使用令牌流程](#三前端获取和使用令牌流程)
    - [1. 页面加载时获取令牌](#1-页面加载时获取令牌)
    - [2. 前端令牌管理类](#2-前端令牌管理类)
  - [四、BFF层令牌验证中间件](#四BFF层令牌验证中间件)
    - [1. 验证中间件实现](#1-验证中间件实现)
  - [五、完整请求流程示例](#五完整请求流程示例)
    - [1. 正常请求流程](#1-正常请求流程)
    - [2. BFF层完整验证链](#2-BFF层完整验证链)
  - [六、安全优势](#六安全优势)
    - [1. 防御CSRF攻击](#1-防御CSRF攻击)
    - [2. 用户体验良好](#2-用户体验良好)
    - [3. 架构清晰](#3-架构清晰)
- [总结](#总结)

## 前端与BFF层的CSRF令牌协同防御（无需登录场景）

### 一、架构概览

```markdown 
前端应用 → BFF层(CSRF令牌管理) → 后端服务
    ↓           ↓               ↓
   页面渲染     令牌生成         业务处理
   令牌携带     令牌验证         无需关心CSRF
```


### 二、BFF层CSRF令牌生成机制

#### 1. 匿名会话令牌生成

```javascript 
// BFF层 - 令牌生成中间件
const generateCSRFToken = (req, res, next) => {
    // 为匿名用户创建临时会话标识
    const anonymousSessionId = createAnonymousSession(req);
    
    // 生成CSRF令牌（基于客户端指纹+随机数）
    const csrfToken = crypto.randomBytes(32).toString('hex');
    const tokenPayload = {
        token: csrfToken,
        sessionId: anonymousSessionId,
        timestamp: Date.now(),
        clientFingerprint: generateClientFingerprint(req)
    };
    
    // 存储令牌（Redis/内存，短期有效）
    await redis.setex(
        `csrf:anonymous:${anonymousSessionId}`, 
        1800, // 30分钟过期
        JSON.stringify(tokenPayload)
    );
    
    // 返回给前端
    res.locals.csrfToken = csrfToken;
    next();
};
```


#### 2. 客户端指纹生成逻辑

```javascript 
const generateClientFingerprint = (req) => {
    const components = {
        ip: req.ip.replace(/\./g, '_').replace(/:/g, '_'),
        userAgent: hashString(req.get('User-Agent') || 'unknown'),
        acceptLanguage: hashString(req.get('Accept-Language') || ''),
        accept: hashString(req.get('Accept') || '')
    };
    
    // 组合生成指纹（不包含敏感信息）
    return hashString(Object.values(components).join('|'));
};
```


### 三、前端获取和使用令牌流程

#### 1. 页面加载时获取令牌

```html 
<!-- BFF返回的页面中包含CSRF令牌 -->
<script>
window.__CSRF_CONFIG__ = {
    token: "a1b2c3d4e5f6...",
    headerName: "X-CSRF-Token",
    endpoints: {
        sendCode: "/api/verify/send-code",
        verifyCode: "/api/verify/confirm"
    }
};
</script>
```


#### 2. 前端令牌管理类

```javascript 
class CSRFTokenManager {
    constructor() {
        this.token = null;
        this.initialized = false;
    }
    
    // 初始化令牌（页面加载时调用）
    async initialize() {
        try {
            // 从BFF获取新令牌
            const response = await fetch('/api/csrf-token', {
                method: 'GET',
                credentials: 'include' // 携带Cookie用于会话关联
            });
            
            const data = await response.json();
            this.token = data.csrfToken;
            this.initialized = true;
            
            // 设置令牌自动刷新
            this.setupTokenRefresh();
        } catch (error) {
            console.error('CSRF令牌初始化失败:', error);
        }
    }
    
    // 为请求添加CSRF头
    addCSRFToken(options = {}) {
        if (!this.initialized || !this.token) {
            throw new Error('CSRF令牌未初始化');
        }
        
        const headers = {
            ...options.headers,
            'X-CSRF-Token': this.token
        };
        
        return { ...options, headers };
    }
    
    // 发送验证码请求示例
    async sendVerificationCode(phoneNumber) {
        const requestOptions = this.addCSRFToken({
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ phone: phoneNumber }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const response = await fetch('/api/verify/send-code', requestOptions);
        
        if (response.status === 403) {
            // CSRF令牌失效，重新获取
            await this.refreshToken();
            return this.sendVerificationCode(phoneNumber);
        }
        
        return response;
    }
    
    // 令牌刷新机制
    async refreshToken() {
        await this.initialize();
    }
    
    setupTokenRefresh() {
        // 每15分钟刷新一次令牌
        setInterval(() => {
            this.refreshToken();
        }, 15 * 60 * 1000);
    }
}

// 全局实例
const csrfManager = new CSRFTokenManager();
```


### 四、BFF层令牌验证中间件

#### 1. 验证中间件实现

```typescript 
const verifyCSRFToken = async (req, res, next) => {
    // 排除只读请求
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
        return next();
    }
    
    try {
        const clientToken = req.headers['x-csrf-token'];
        
        if (!clientToken) {
            return res.status(403).json({
                error: 'CSRF_TOKEN_REQUIRED',
                message: '缺少CSRF令牌'
            });
        }
        
        // 获取客户端指纹
        const clientFingerprint = generateClientFingerprint(req);
        
        // 从存储中验证令牌
        const isValid = await validateCSRFToken(clientToken, clientFingerprint);
        
        if (!isValid) {
            return res.status(403).json({
                error: 'CSRF_TOKEN_INVALID',
                message: 'CSRF令牌无效或已过期'
            });
        }
        
        next();
    } catch (error) {
        console.error('CSRF验证错误:', error);
        res.status(500).json({ error: 'SERVER_ERROR' });
    }
};

const validateCSRFToken = async (clientToken, clientFingerprint) => {
    // 查找对应的令牌记录
    const tokenKey = `csrf:anonymous:${clientFingerprint}`;
    const tokenData = await redis.get(tokenKey);
    
    if (!tokenData) {
        return false; // 令牌不存在或已过期
    }
    
    const { token: serverToken, timestamp } = JSON.parse(tokenData);
    
    // 验证令牌匹配（安全比较，防时序攻击）
    const tokensMatch = crypto.timingSafeEqual(
        Buffer.from(clientToken),
        Buffer.from(serverToken)
    );
    
    // 验证时效性（30分钟内有效）
    const isExpired = Date.now() - timestamp > 30 * 60 * 1000;
    
    return tokensMatch && !isExpired;
};
```


### 五、完整请求流程示例

#### 1. 正常请求流程

```javascript 
// 前端调用
async function requestVerificationCode() {
    await csrfManager.initialize(); // 页面加载时初始化
    
    try {
        const response = await csrfManager.sendVerificationCode('13800138000');
        
        if (response.ok) {
            console.log('验证码发送成功');
        } else {
            const error = await response.json();
            if (error.error === 'CSRF_TOKEN_INVALID') {
                // 自动处理令牌失效
                await csrfManager.refreshToken();
                return requestVerificationCode(); // 重试
            }
        }
    } catch (error) {
        console.error('请求失败:', error);
    }
}
```


#### 2. BFF层完整验证链

```javascript 
// BFF路由配置
app.get('/api/csrf-token', generateCSRFToken, (req, res) => {
    res.json({ csrfToken: res.locals.csrfToken });
});

app.post('/api/verify/send-code', 
    verifyCSRFToken,        // CSRF验证
    rateLimitMiddleware,    // 频率限制
    businessLogicMiddleware, // 业务逻辑
    (req, res) => {
        // 处理发送验证码逻辑
        res.json({ success: true });
    }
);
```


### 六、安全优势

#### 1. 防御CSRF攻击

- **令牌绑定**：令牌与客户端指纹绑定，无法跨客户端使用
- **短期有效**：30分钟过期，减少泄露风险
- **随机性强**：32字节随机数，无法预测

#### 2. 用户体验良好

- **无感验证**：用户无需额外操作
- **自动续期**：令牌自动刷新，不影响使用
- **优雅降级**：令牌失效时自动重试

#### 3. 架构清晰

- **职责分离**：BFF负责安全，前端专注展示
- **易于维护**：安全逻辑集中管理
- **可扩展性**：轻松添加新的安全策略

# 总结

1. **没有银弹**：单一方案无法100%区分，需要多层防御
2. **成本提升**：让**攻击者的成本远高于收益**
3. **动态调整**：根据**攻击模式动态调整验证策略**
4. **业务适配**：根据操作敏感性选择适当的验证强度

这些方案的核心是**让合法前端容易证明身份，让恶意脚本难以模仿**，通过提高攻击成本来实现有效防御。
