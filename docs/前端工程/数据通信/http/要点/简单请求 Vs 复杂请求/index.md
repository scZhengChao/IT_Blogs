# 简单请求 Vs 复杂请求

## 目录

- [简单请求 vs 复杂请求的判定标准](#简单请求-vs-复杂请求的判定标准)
  - [简单请求的条件（必须同时满足）：](#简单请求的条件必须同时满足)

## 简单请求 vs 复杂请求的判定标准

### 简单请求的条件（必须同时满足）：

1. **方法限制**：GET、POST、HEAD
2. **头部限制**：只能包含以下头部：
   - `Accept`
   - `Accept-Language`
   - `Content-Language`
   - `Content-Type`（仅限于：`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`）
3. **无自定义头部**

**任何以下情况都会变成复杂请求：**

```javascript 
// 1. 使用非常规方法
method: 'PUT', 'DELETE', 'PATCH'

// 2. 使用非常规Content-Type  
'Content-Type': 'application/json'

// 3. 添加任何自定义头部
'X-Custom-Header': 'value',
'Authorization': 'Bearer token',
'X-CSRF-Token': 'token123'
```
