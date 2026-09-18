# CSS 样式闪烁问题

## 目录

- [问题描述](#问题描述)
- [解决方案](#解决方案)

### 问题描述

Flash of Unstyled Content (FOUC) - 在样式加载前短暂显示无样式内容。

### 解决方案

- 使用 CSS-in-JS 库（如 styled-components, emotion）的服务器端渲染支持
- 提取关键 CSS 并内联到 HTML 中
- 使用 webpack 的`MiniCssExtractPlugin`

```javascript 
// 使用 styled-components 的 SSR 示例
import { ServerStyleSheet } from 'styled-components';

const sheet = new ServerStyleSheet();
const html = renderToString(sheet.collectStyles(<App />));
const styleTags = sheet.getStyleTags(); // 获取样式标签

// 将 styleTags 插入到 HTML 的 head 中
```
