# domain

## 目录

- [如何实现共享](#如何实现共享)
- [实际应用示例](#实际应用示例)
- [Domain 属性](#Domain-属性)
  - [定义](#定义)
  - [特点](#特点)

**一级域名和二级域名之间是可以共享Cookie的，** 但需要特定的设置才能实现。

## 如何实现共享

1. **设置domain属性**：
   - 在一级域名([如example.com](http://xn--example-i22m.com "如example.com"))设置Cookie时，将domain属性设置为`.example.com`（注意前面的点）
   - 这样设置的Cookie可以被example.com及其所有二级域名([如sub.example.com](http://xn--sub-eo8e.example.com "如sub.example.com"))访问

```javascript 
// 在example.com或任何子域设置
document.cookie = "name=value; domain=.example.com; path=/; expires=...";

```


1. **Path属性**：
   - 通常需要设置`path=/`以确保Cookie在整个域名下可用
2. **HTTPS和安全Cookie**：
   - 如果使用`HTTPS`，可以考虑添加`Secure`标志
   - 对于敏感`Cookie`，建议添加`HttpOnly`标志

## 实际应用示例

假设你有一个网站：

- 主站：[www.example.com](http://www.example.com/ "www.example.com")
- 子站：[api.example.com](http://api.example.com "api.example.com")

要让两者共享一个名为"session"的Cookie：

```javascript 
// 在www.example.com或api.example.com上设置
document.cookie = "session=abc123; domain=.example.com; path=/; max-age=3600";
```


这样设置的Cookie可以在以下域名中读取：

- [example.com](http://example.com "example.com")
- [www.example.com](http://www.example.com/ "www.example.com")
- [api.example.com](http://api.example.com "api.example.com")
- 任何其他 \*.example.com的子域

通过这种方式，你可以在不同子域之间共享用户会话或其他需要共享的状态信息。

## Domain 属性

### 定义

- **作用**：指定 Cookie **可被访问的域名范围**
- **格式**：
  - `Domain=example.com`**（精确匹配）**
  - `Domain=.example.com`（**包含所有子域**）
- **默认值**：当前设置 Cookie 的域名（不包括子域）

### 特点

1. **子域共享**：

```text 
Set-Cookie: session=abc; Domain=.example.com
```


- 这个 Cookie 可用于`example.com`、`www.example.com`、`api.example.com`等

1. **安全限制**：
   - **不能设置顶级域名**（如`.com`）
   - 不能**设置不属于当前域的域名**
2. **精确匹配**：

```javascript 
Set-Cookie: local=123; Domain=api.example.com
```


- 这个 Cookie 只能在`api.example.com`使用，不能在`example.com`使用
-
