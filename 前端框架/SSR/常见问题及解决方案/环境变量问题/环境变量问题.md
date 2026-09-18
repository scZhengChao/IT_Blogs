# 环境变量问题

## 目录

- [问题描述](#问题描述)
- [解决方案](#解决方案)

### 问题描述

客户端和服务器端环境变量访问方式不同。

### 解决方案

- 使用 Webpack 的 DefinePlugin 或 dotenv
- 通过全局变量传递配置
- 使用运行时配置

```javascript 
// 服务器端
const html = renderToString(<App apiUrl={process.env.API_URL} />);

// 客户端
const apiUrl = window.__ENV__.API_URL;

function App({ apiUrl }) {
  // 使用 apiUrl
}
```
