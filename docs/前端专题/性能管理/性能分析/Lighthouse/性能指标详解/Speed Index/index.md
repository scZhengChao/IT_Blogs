# Speed Index

速度指数是Lighthouse报告中性能部分跟踪的六个指标之一。每项指标都能反映出页面加载速度的某些方面。

那么它是如何检测的呢？

> 速度指数衡量的是**内容在页面加载过程中的视觉显示速度**。`Lighthouse`首先会在浏览器中捕获一段页面加载的视频，并计算出**各帧之间的视觉进度**。然后，Lighthouse使用Speedline Node.js模块来生成速度指数得分。

至于具体的计算，可以参考GitHub里面的代码，这里就不展开了。

那么我们有机会提升它的性能吗？

利用Lighthouse报告中的 "**Opportunities**"部分来**确定哪些改进对你的页面最有价值。机会越重要，对性能评分的影响就越大**。例如，下面的Lighthouse截图显示，消除渲染阻塞资源将带来最大的改善。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af5279e1bb4643f9aec3b9e13f6605bb~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
