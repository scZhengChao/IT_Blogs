# 首次内容绘制（First Contentful Paint，FCP）

## 目录

- [First Contentful Paint (FCP)](#First-Contentful-Paint-FCP)
- [首次内容绘制（First Contentful Paint，FCP）](#首次内容绘制First-Contentful-PaintFCP)

### First Contentful Paint (FCP)

第一次内容丰富的绘画(FCP)指标衡量了从**页面开始加载到页面内容的任何部分呈现在屏幕上的时间**。对于该指标，"内容 "指的是文本、图像（包括背景图像）、元素或非白色元素。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8401aa9ee484d7186f5de6ea3308f57~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

在上面的负载时间线中，**FCP发生在第二帧中，** 就像呈现给屏幕的第一文本和图像元素时一样。

你会注意到，**虽然部分内容已经呈现，但并非所有内容都已呈现**。这是First Contentful Paint (FCP)和Largest Contentful Paint (LCP)**之间的一个重要区别**--LCP的目的是**衡量页面的主要内容何时完成加载。**

知道了概念，如何衡量FCP呢，我们可以接触的有**Field tools**和**Lab tools**

要在`JavaScript`中测量`FCP`，你可以使用`Paint Timing API`。下面的例子展示了如何创建一个`PerformanceObserver`，该`PerformanceObserver`监听名称为`first-contentful-paint`的油漆条目，并将其记录到控制台。

```javascript 
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntriesByName('first-contentful-paint')) {
    console.log('FCP candidate:', entry.startTime, entry);
  }
}).observe({type: 'paint', buffered: true});

```


### 首次内容绘制（First Contentful Paint，FCP）

**定义**：首次内容绘制是指浏览器从开始加载网页到首次在屏幕上绘制任何内容的时间。这个时间通常包括 HTML 文档的下载、解析和渲染，以及 CSS 和 JavaScript 文件的下载和执行。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/4f7402c08ede4f809970a057737216b5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg55av54qs5Lio5ZOI5aOr5aWH:q75.awebp?rk3s=f64ab15b\&x-expires=1746595443\&x-signature=zlYxnGfRZqQM2d4Bcmq6NbTNivM%3D)

**影响因素**：

- 网络延迟：网络延迟越高，网页的加载速度就越慢，FCP 时间也就越长。
- 资源大小：网页中的资源（如图片、脚本、样式表等）越大，下载时间就越长，FCP 时间也就越长。
- 脚本执行时间：如果网页中的 JavaScript 脚本执行时间过长，会阻塞浏览器的渲染进程，导致 FCP 时间延长。

**提升方法**：

- 优化网络请求：**减少不必要的网络请求，压缩资源大小，使用 CDN 加速**等。
- 延迟加载非关键资源：对于一些**非关键的资源（如图片、视频等），可以延迟加载**，等到页面主要内容加载完成后再进行加载。
- 优化脚本执行：**减少不必要的脚本执行，使用异步加载和 defer 属性等。**

**示例代码**：

```html 
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Example</title>
  <link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
</head>

<body>
  <h1>Hello World!</h1>
  <img src="image.jpg" alt="Image" loading="lazy">
  <script src="script.js" defer></script>
</body>

</html>

```


在上面的代码中，我们使用了`media`属性和`onload`事件来延迟加载样式表，直到页面打印时才加载。同时，我们使用了`loading="lazy"`属性来延迟加载图片，直到图片进入视口时才加载。最后，我们使用了`defer`属性来延迟加载脚本，直到页面加载完成后再执行。
