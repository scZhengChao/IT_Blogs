# 性能问题

## 目录

- [问题描述](#问题描述)
- [解决方案](#解决方案)

### 问题描述

SSR 增加了服务器负载，可能导致响应变慢。

### 解决方案

- **实现缓存策略（页面级或组件级）**
- 使用流式渲染(Streaming SSR)
- **代码分割和懒加载**

```javascript 
// 流式渲染示例
import { renderToPipeableStream } from 'react-dom/server';

app.get('/', (req, res) => {
  const { pipe } = renderToPipeableStream(<App />, {
    onShellReady() {
      res.setHeader('Content-type', 'text/html');
      pipe(res);
    }
  });
});
```
