# Eliminate render-blocking resources消除渲染阻止资源

![](<../assets/Eliminate render-blocking reso/image/image_SSClp8oa_u.webp>)

浏览器可以呈现任何内容之前，它需要将HTML标记解析为DOM树。如果遇到任何外部样式表（`<link rel="stylesheet" />`）或同步JavaScript标记（`<script src="main.js"></script>`），HTML解析器将暂停。 脚本和样式表都是渲染阻塞资源，这些资源会延迟FCP，从而延迟LCP。推迟使用任何非关键的JavaScript和CSS来加快网页主要内容的加载。 减少CSS阻断时间:

- 缩小CSS: 对于Webpack：optimize-css-assets-webpack-plugin
- 推迟非关键CSS
- 内联关键CSS
