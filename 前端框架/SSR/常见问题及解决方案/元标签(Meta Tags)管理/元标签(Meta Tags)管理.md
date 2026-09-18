# 元标签(Meta Tags)管理

## 目录

- [问题描述](#问题描述)
- [解决方案](#解决方案)

### 问题描述

如何动态设置页面标题和 meta 标签。

### 解决方案

- 使用 react-helmet 或类似的库
- 服务器端收集并渲染 meta 标签

```javascript 
import { Helmet } from 'react-helmet';

function ProductPage({ product }) {
  return (
    <div>
      <Helmet>
        <title>{product.name} - 我的商店</title>
        <meta name="description" content={product.description} />
      </Helmet>
      {/* 页面内容 */}
    </div>
  );
}

// 服务器端
const html = renderToString(<App />);
const helmet = Helmet.renderStatic();

// 将 helmet.title.toString() 等插入到 HTML 头部
```
