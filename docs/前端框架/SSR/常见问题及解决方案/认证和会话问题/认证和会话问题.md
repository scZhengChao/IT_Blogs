# 认证和会话问题

## 目录

- [问题描述](#问题描述)
- [解决方案](#解决方案)

### 问题描述

如何在 SSR 中处理用户认证状态。

### 解决方案

- 通过 cookie 传递会话信息
- 使用上下文提供用户数据
- 确保客户端和服务器端认证状态同步

```javascript 
// 服务器端
app.get('*', (req, res) => {
  const user = req.cookies.token ? getUserFromToken(req.cookies.token) : null;
  
  const html = renderToString(
    <UserContext.Provider value={user}>
      <App />
    </UserContext.Provider>
  );
});

// 客户端
const user = window.__USER__;
hydrateRoot(
  <UserContext.Provider value={user}>
    <App />
  </UserContext.Provider>,
  document.getElementById('root')
);
```
