# 路由问题

## 目录

- [问题描述](#问题描述)
- [解决方案](#解决方案)

### 问题描述

客户端和服务器端路由不匹配导致的问题。

### 解决方案

- 使用**同构路由库（如 React Router）**
- 确保服务器能处理所有客户端路由
- 使用静态路由配置

```javascript 
// 使用 React Router 的 SSR 示例
import { StaticRouter } from 'react-router-dom/server';
import { BrowserRouter } from 'react-router-dom';

// 服务器端
const html = renderToString(
  <StaticRouter location={req.url}>
    <App />
  </StaticRouter>
);

// 客户端
hydrateRoot(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```
