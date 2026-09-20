# Partitioned

## 目录

- [1. 基本概念](#1-基本概念)
- [2. 解决的问题](#2-解决的问题)
  - [传统第三方 Cookie 的问题](#传统第三方-Cookie-的问题)
  - [Partitioned Cookie 的特点](#Partitioned-Cookie-的特点)
- [3. 工作方式示例](#3-工作方式示例)
- [4. 使用场景](#4-使用场景)
  - [主要用例](#主要用例)
  - [必要配置](#必要配置)
- [5. 浏览器支持](#5-浏览器支持)
- [6. 检测支持](#6-检测支持)
- [7. 迁移策略](#7-迁移策略)
  - [从传统 Cookie 迁移](#从传统-Cookie-迁移)
- [8. 注意事项](#8-注意事项)
  - [限制](#限制)
  - [最佳实践](#最佳实践)
- [9. 示例配置](#9-示例配置)
  - [Nginx 配置](#Nginx-配置)
  - [Express.js 配置](#Expressjs-配置)
- [10. 调试和测试](#10-调试和测试)
  - [Chrome DevTools](#Chrome-DevTools)
  - [测试工具](#测试工具)
- [总结](#总结)

关于 **`Partitioned`**\*\* 属性在 ****`Set-Cookie`**** 头中的应用 \*\*，这是一个相对较新且重要的特性，主要用于解决**第三方 Cookie 在现代浏览器环境中的设置问题。**

## 1. 基本概念

**`Partitioned`** 是 `Set-Cookie` 响应头的一个布尔属性，用于指示该 Cookie 应存储在**分区存储（Partitioned Storage）** 中。

```http 
Set-Cookie: __Host-example=value; Path=/; Secure; SameSite=None; Partitioned
```


## 2. 解决的问题

### 传统第三方 Cookie 的问题

- **传统第三方 Cookie 是跨站共享的**
- **存在隐私和安全风险（如跨站追踪）**
- **导致浏览器（如 Chrome）逐步淘汰第三方 Cookie**

### Partitioned Cookie 的特点

- **按顶级站点分区**：Cookie 的存储空间与**嵌入的顶级站点关联**
- **有限共享**：仅在同一顶级站点下的**跨站上下文中可用**
- **增强隐私**：防止**跨站用户追踪**

## 3. 工作方式示例

假设：

- 用户访问 `https://shopping-site.example`
- 该页面嵌入了 `https://payment-processor.example` 的 iframe

**传统第三方 Cookie**：

- `payment-processor.example` 设置的 Cookie 在所有站点中都可用

**Partitioned Cookie**：

```http 
Set-Cookie: session=abc123; Secure; SameSite=None; Partitioned
```


- 此 Cookie 仅存储在 `shopping-site.example` 的分区中
- 当用户访问 `https://news-site.example` 时，即使其中也嵌入了 `payment-processor.example`，也无法访问该 Cookie

## 4. 使用场景

### 主要用例

1. **嵌入式服务**：支付处理器、评论插件、视频播放器等
2. **跨站身份验证**：SSO（单点登录）在嵌入式上下文中
3. **状态保持**：需要在 iframe 中保持会话状态

### 必要配置

```http 
Set-Cookie: my_cookie=value; 
    Secure;                    # 必须使用 HTTPS
    SameSite=None;            # 必须为 None
    Partitioned;              # 启用分区存储
    Path=/;                   # 推荐明确指定 Path
```


## 5. 浏览器支持

- **Chrome**：115+ 版本支持
- **Safari**：通过 ITP（智能防跟踪）有类似机制
- **Firefox**：正在实现中
- **Edge**：基于 Chromium，已支持

## 6. 检测支持

JavaScript 检测

```javascript 
// 检查是否支持 Partitioned 属性
function supportsPartitioned() {
    return document.cookie.split(';').some(cookie => 
        cookie.includes('Partitioned')
    );
}

// 或通过特性检测
if ('storage' in navigator && 'partitioned' in navigator.storage) {
    // 支持分区存储
}
```


## 7. 迁移策略

### 从传统 Cookie 迁移

```markdown 
# 传统第三方 Cookie
Set-Cookie: session=old_value; Secure; SameSite=None

# 迁移为 Partitioned Cookie
Set-Cookie: session=new_value; Secure; SameSite=None; Partitioned

# 可同时设置两个版本过渡
Set-Cookie: session=partitioned_value; Secure; SameSite=None; Partitioned
Set-Cookie: session=legacy_value; Secure; SameSite=None
```


## 8. 注意事项

### 限制

1. **存储空间限制**：每个分区可能有独立的配额
2. **跨分区不可访问**：不能在不同顶级站点间共享
3. **需要 HTTPS**：必须与 `Secure` 属性一起使用
4. **SameSite=None**：必须明确指定

### 最佳实践

1. **渐进增强**：同时支持传统和分区 Cookie
2. **明确命名**：使用清晰的 Cookie 名称
3. **监控使用**：跟踪 Partitioned Cookie 的采用率
4. **用户告知**：在隐私政策中说明数据存储方式

## 9. 示例配置

### Nginx 配置

```nginx 
location /api {
    add_header Set-Cookie "session=$session_id; Secure; SameSite=None; Partitioned; Path=/; Max-Age=3600";
}
```


### Express.js 配置

```javascript 
app.get('/set-cookie', (req, res) => {
    res.cookie('session', 'value', {
        secure: true,
        sameSite: 'none',
        partitioned: true,
        path: '/',
        maxAge: 3600000
    });
    res.send('Cookie set');
});
```


## 10. 调试和测试

### Chrome DevTools

1. 打开 **Application** 面板
2. 查看 **Storage** → **Cookies**
3. 分区 Cookie 会显示所属的顶级站点
4. 使用 **Network** 面板查看响应头

### 测试工具

```markdown 
# 使用 curl 测试
curl -I https://example.com/api/set-cookie
# 查看 Set-Cookie 头是否包含 Partitioned
```


## 总结

`Partitioned` 属性是现代 Web 向隐私保护迈出的重要一步。对于依赖第三方上下文的服务，尽早适配 Partitioned Cookie 是应对第三方 Cookie 限制的关键策略。建议在支持的环境中使用，并为不支持的环境提供降级方案。

[和SameSite的区别](./和SameSite的区别/index.md "和SameSite的区别")
