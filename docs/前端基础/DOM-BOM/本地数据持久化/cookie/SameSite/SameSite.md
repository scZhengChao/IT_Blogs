# SameSite

## 目录

- [浏览器默认行为](#浏览器默认行为)
- [应用场景示例](#应用场景示例)
- [重要注意事项](#重要注意事项)

1. **Strict**(最严格)
   - 仅当当前网页的**域名与请求目标域名**完全一致时才发送 Cookie
   - 示例：`Set-Cookie: key=value; SameSite=Strict`
2. **Lax**(默认值，较宽松)
   - 允许在顶级导航(如链接点击)和 GET 请求中跨站发送 Cookie
   - 阻止**跨站的 POST 请求、iframe 嵌入等场景发送 Cookie**
   - 示例：`Set-Cookie: key=value; SameSite=Lax`
3. **None**(无限制)
   - 允许所有跨站请求携带 Cookie
   - 必须**与 Secure 属性一起使用(即必须通过 HTTPS)**
   - 示例：`Set-Cookie: key=value; SameSite=None; Secure`

## 浏览器默认行为

- 现代浏览器(Chrome 80+、Firefox 69+等)默认将没有明确指定 SameSite 的 Cookie 视为`SameSite=Lax`
- 需要跨站使用 Cookie 时必须显式设置为`SameSite=None; Secure`

## 应用场景示例

1. **需要跨站共享的 Cookie**(如第三方服务)

```javascript 
Set-Cookie: session_id=abc123; SameSite=None; Secure; Domain=.example.com
```


1. **仅限同站使用的敏感 Cookie**

```javascript 
Set-Cookie: auth_token=xyz456; SameSite=Strict; HttpOnly
```


1. **一般网站 Cookie (默认推荐)**

```http 
Set-Cookie: user_prefs=dark; SameSite=Lax
```


## 重要注意事项

1. **Secure 要求**：`SameSite=None`必须与`Secure`一起使用，否则会被浏览器拒绝
2. **兼容性问题**：旧版本浏览器可能不支持 SameSite 属性
3. **测试验证**：使用浏览器开发者工具检查 Cookie 的实际发送情况
4. **CSRF 防护**：SameSite 不能完全替代 CSRF Token，建议结合使用

SameSite 属性是现代 Web 安全的重要组成部分，合理配置可以有效平衡功能需求与安全性。
