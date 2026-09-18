# 如何避免频繁的发送预检请求

## 目录

- [后端设置较长缓存时间](#后端设置较长缓存时间)
- [合并自定义请求头](#合并自定义请求头)
- [预检请求预热](#预检请求预热)
  - [缓存生效条件](#缓存生效条件)
  - [实际效果示例](#实际效果示例)
  - [必须完全匹配的特征](#必须完全匹配的特征)
  - [浏览器缓存逻辑](#浏览器缓存逻辑)
  - [实际应用场景建议](#实际应用场景建议)
  - [需要特别注意的问题](#需要特别注意的问题)

> 简单请求；服务器代理；jsonp除外；

### 后端设置较长缓存时间

```markdown 
# 响应头设置预检缓存(单位秒)
Access-Control-Max-Age: 86400  # 24小时
```


### 合并自定义请求头

```javascript 
// 不推荐（每个新header都会触发预检）
headers: {
  'X-User-ID': '123',
  'X-Device-Type': 'mobile'
}

// 推荐方案：合并为一个标准头
headers: {
  'X-Custom-Data': JSON.stringify({
    userId: '123',
    deviceType: 'mobile'
  })
}
```


### 预检请求预热

浏览器对每个 \*\*"****唯一跨域请求****"\*\*会独立缓存预检结果。通过提前发送`OPTIONS`请求，**可以强制浏览器建立缓存：**

```javascript 
// 应用初始化时主动发送OPTIONS预热 
fetch('https://api.example.com/data', {
  method: 'OPTIONS'
});
```


#### **缓存生效条件**

- **相同请求特征**：后续请求必须与预热的`OPTIONS`请求完全匹配：
  - 相同的URL
  - 相同的HTTP方法（如`POST`）
  - 相同的自定义头（如`Authorization`）
- **缓存时间**：依赖服务端返回的`Access-Control-Max-Age`头（默认5秒）

#### 实际效果示例

```javascript 
// 第一次：发送OPTIONS预检
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: { 'X-Custom': 'value' } // 自定义头触发预检
});

// 5分钟内再次发送相同请求（无OPTIONS）
fetch('https://api.example.com/data', {
  method: 'POST', 
  headers: { 'X-Custom': 'value' } // 直接发POST，跳过预检
});
```


#### 必须完全匹配的特征

浏览器会检查以下属性是否一致：

| 检查项  | 示例                                | 必须一致 |
| ---- | --------------------------------- | ---- |
| URL  | \`<https://api.example.com/data`> | ✅    |
| 方法   | \`POST\`                          | ✅    |
| 头列表  | \`X-Custom\`,\`Content-Type\`     | ✅    |
| 凭证模式 | \`credentials: 'include'\`        | ✅    |

#### 浏览器缓存逻辑

- **缓存Key**：`(Origin, URL, Method, Headers)`的哈希值
- **失效条件**：
  - 超过`Access-Control-Max-Age`时间
  - 用户强制刷新页面（Ctrl+F5）
  - 浏览器隐私模式

#### 实际应用场景建议

```javascript 
// 应用启动时预热所有高频API
const preflightUrls = [
  '/api/user',
  '/api/orders'
];

preflightUrls.forEach(url => {
  fetch(url, { method: 'OPTIONS' })
    .catch(() => {}); // 静默失败
});
```


#### 需要特别注意的问题

- **缓存污染**：如**果动态URL参数变化（如`/api/item/123`****→****`/api/item/456`），会被视为不同请求**
- **移动端限制**：部分手机浏览器可能缩短缓存时间
- **预检失败**：如果预热请求失败，不影响后续实际请求（浏览器会重新预检）
