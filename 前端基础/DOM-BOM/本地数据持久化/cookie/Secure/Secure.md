# `Secure`

## 目录

- [基本作用](#基本作用)
- [使用方法](#使用方法)
- [重要规则](#重要规则)
- [为什么需要 Secure](#为什么需要-Secure)

`Secure`是 Cookie 的一个安全属性，用于**确保 Cookie 只在加密的 HTTPS 连接中传输**，防止敏感信息在未加密的 HTTP 连接中被窃取。

## 基本作用

- **仅限 HTTPS**：带有`Secure`标志的 Cookie 只能通过 HTTPS 协议传输
- **阻止明文传输**：防止 Cookie 在非加密的 HTTP 连接中被中间人攻击者截获

## 使用方法

```http 

Set-Cookie: session=abc123; Secure; SameSite=Lax

```


或通过 JavaScript：

```javascript 
document.cookie = "session=abc123; Secure; path=/";
```


## 重要规则

1. **与**\*\*`SameSite=None`\*\***的强制组合**：
   - **当设置**\*\*`SameSite=None`****时，必须同时设置****`Secure`\*\*
   - 否则浏览器会拒绝这个 Cookie
2. **开发环境注意事项**：
   - 在本地开发([http://localhost)时，某些浏览器允许不设置](http://xn--localhost\),-cr8qv1dh5qj7tjw2djugwv0aow2fgj0bxri2d/ "http://localhost)时，某些浏览器允许不设置")Secure
   - 但在生产环境必须使用 HTTPS + Secure
3. **浏览器行为**：
   - **非 HTTPS 站点尝试设置 Secure Cookie 会被浏览器静默拒绝**
   - 开发者工具中可以看到被拒绝的 Cookie 设置尝试

## 为什么需要 Secure

1. **防止窃听**：避免 Cookie 在公共WiFi等不安全网络中被窃取
2. **符合安全标准**：现代Web安全最佳实践要求
3. **配合SameSite：作为跨站安全策略的基础保障**
