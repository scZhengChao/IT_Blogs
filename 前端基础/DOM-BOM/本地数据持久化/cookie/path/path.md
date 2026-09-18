# path

## 目录

- [Path 属性](#Path-属性)
  - [定义](#定义)
  - [特点](#特点)
- [Path 限制的具体含义](#Path-限制的具体含义)

`Path`和`Domain`都是用来**控制 Cookie 作用范围的属性**，但它们控制的是不同维度的访问权限。

## Path 属性

### 定义

- **作用**：**指定 Cookie 可被访问的 URL 路径范围**
- **格式**：`Path=/some/path`
- **默认值**：当前设置 Cookie 的页面路径（通常建议设置为`/`）

### 特点

1. **路径匹配**：
   - **设置**\*\*`Path=/admin`****的 Cookie 只能在****`/admin`****及其子路径（如****`/admin/users`）访问\*\*​
   - 不会发送到其他路径如`/home`或`/`
2. **路径隔离**：

```http 
Set-Cookie: admin_token=xyz; Path=/admin
```


1. 这个 Cookie 不会出现在`/`或`/products`等路径的请求中
2. **最佳实践**：
   - 通常设置为`Path=/`让整个站点可用
   - 需要路径隔离时才指定特定路径

## Path 限制的具体含义

1. **浏览器自动管理**：
   - 浏览器会根据 Path 设置**自动过滤哪些** Cookie 会随请求发送到服务器
   - 如果当前访问的 URL **路径不匹配 Cookie 的 Path 设置**，浏览器**不会将该 Cookie 包含在 HTTP 请求头**中
2. **JavaScript 访问**：
   - 通过`document.cookie`API 也只能获取到**当前路径及其子路径**下的 Cookie
   - 不同路径的 Cookie 对 JavaScript 也是隔离的
