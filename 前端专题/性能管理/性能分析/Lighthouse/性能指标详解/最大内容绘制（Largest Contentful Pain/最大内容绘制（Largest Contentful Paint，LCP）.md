# 最大内容绘制（Largest Contentful Paint，LCP）

1. **定义**：最大内容绘制是指浏览器从开始**加载网页到绘制最大内容元素**的时间。这个时间通常包括 `HTML` 文档的下载、解析和渲染，以及 CSS 和 JavaScript 文件的下载和执行。最大内容元素通常是指页面中最大的图片、视频、文本块等。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/352d8ae12d0b46d483609d91108e3ec2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg55av54qs5Lio5ZOI5aOr5aWH:q75.awebp?rk3s=f64ab15b\&x-expires=1746595443\&x-signature=HJOFQpQvBx3OIoUGlLOWZQrDwd8%3D)

**影响因素**：

- 资源大小：网页中的资源（如图片、脚本、样式表等）越大，下载时间就越长，LCP 时间也就越长。
- 脚本执行时间：如果网页中的 JavaScript 脚本执行时间过长，会阻塞浏览器的渲染进程，导致 LCP 时间延长。
- 网络延迟：网络延迟越高，网页的加载速度就越慢，LCP 时间也就越长。

**提升方法**：

- 优化资源大小：压缩图片、脚本、样式表等资源的大小，减少下载时间。
- 延迟加载非关键资源：对于一些非关键的资源（如图片、视频等），可以延迟加载，等到页面主要内容加载完成后再进行加载。
- 优化脚本执行：减少不必要的脚本执行，使用异步加载和 defer 属性等。
