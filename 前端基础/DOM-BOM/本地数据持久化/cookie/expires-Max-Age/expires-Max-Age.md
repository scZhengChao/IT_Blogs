# expires/Max-Age

## 目录

- [1. expires（过期时间）](#1expires过期时间)
- [2. Max-Age（最大存活时间）](#2Max-Age最大存活时间)
- [3. 两者区别](#3-两者区别)
- [4. 代码示例](#4-代码示例)
  - [服务端设置（Node.js/Express）](#服务端设置NodejsExpress)
  - [客户端设置（JavaScript）](#客户端设置JavaScript)
- [5. 最佳实践](#5-最佳实践)
- [6. 注意事项](#6-注意事项)

## **1. ****`expires`****（过期时间）**

- **类型**：`Date` 字符串（UTC 格式）
- **作用**：指定 Cookie 过期的具体日期和时间。
- **示例**：

```http 
Set-Cookie: sessionid=abc123; expires=Wed, 21 Oct 2026 07:28:00 GMT; path=/
```


**注意**：

- 如果不设置 `expires` 或 `Max-Age`，**Cookie 默认为 会话 Cookie，浏览器关闭时删除**。
- 过期时间必须**为 GMT 格式（UTC）。**
- 如果**设置为过去的日期，浏览器会立即删除该 Cookie。**

## **2. ****`Max-Age`****（最大存活时间）**

- **类型**：秒数（整数）
- **作用**：设置 Cookie 从**创建到过期的时间长度（秒）。**
- **示例**

```http 
Set-Cookie: sessionid=abc123; Max-Age=3600; path=/
```


- （Cookie 将在 1 小时后过期）
- **注意**：
  - 如果 `Max-Age` **为 ****`0`**** 或负数，浏览器会立即删除 Cookie。**
  - 优先级：**如果同时设置了 ****`expires`**** 和 ****`Max-Age`****，现代浏览器优先使用 `Max-Age`**。

## **3. 两者区别**

| 特性         | \`expires\` | \`Max-Age\`  |
| ---------- | ----------- | ------------ |
| 时间基准       | 固定时间点（GMT）  | 相对时间（秒）      |
| 浏览器兼容性     | 所有浏览器支持     | IE ≤ 8 不支持   |
| 优先级（同时存在时） | 低（现代浏览器忽略）  | 高            |
| 使用场景       | 需要固定过期时间的场景 | 更推荐，易于计算剩余时间 |

## **4. 代码示例**

### **服务端设置（Node.js/Express）**

```javascript 
// 使用 expires（固定时间）
res.cookie('token', 'xyz', {
  expires: new Date(Date.now() + 900000), // 15分钟后过期
  httpOnly: true
});

// 使用 maxAge（相对时间）
res.cookie('token', 'xyz', {
  maxAge: 900000, // 15分钟（毫秒）
  httpOnly: true
});
```


### **客户端设置（JavaScript）**

```javascript 
// 使用 expires
document.cookie = "username=John; expires=Wed, 21 Oct 2026 07:28:00 GMT; path=/";

// 使用 max-age
document.cookie = "username=John; max-age=3600; path=/";
```


## **5. 最佳实践**

1. **优先使用 `Max-Age`**，除非需要兼容旧版 IE。
2. 对于会话 Cookie，**两者都不设置**，浏览器关闭时自动清除。
3. 安全相关 Cookie（如身份令牌）建议设置合理的过期时间，并启用 `httpOnly`、`Secure` 等属性。
4. 清理 Cookie 时，可设置 `Max-Age=0` 或 `expires` 为过去时间。

***

## **6. 注意事项**

- 如果 Cookie 未设置 `expires`/`Max-Age`，则为 **会话 Cookie**。
- 浏览器可能因存储策略提前清理 Cookie（如 Safari 的 ITP 限制）。
- 时间单位：`expires` 是 `Date`，`Max-Age` 是 **秒**（注意框架差异，如 Express 的 `maxAge` 单位为毫秒）。
