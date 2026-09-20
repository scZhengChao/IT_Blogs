# Minimize main-thread work 最小化主线程工作

## 目录

- [如何分析非关键代码](#如何分析非关键代码)

浏览器的渲染器过程将您的代码转换为用户可以与之交互的网页。默认情况下，渲染器进程的主线程通常处理大多数代码：它解析HTML并构建DOM，解析CSS并应用指定的样式，并解析，评估并执行JavaScript。主线程还处理用户事件。因此 **，每当主线程忙于执行其他操作时，您的网页就可能无法响应用户交互**，从而导致不良的体验。

1. 脚本评估
   - 优化第三方JavaScript
   - 消除您的输入处理程序
   - 使用网络工作者
2. 样式和布局
   - **减少样式计算的范围和复杂性**
   - 避免大型，**复杂的布局和布局颠簸**
3. 渲染
   - 坚持只使用合成器属性并管理层数
   - 简化paint复杂性并减少paint面积
4. 解析HTML和CSS
   - 提取关键CSS
   - 缩小CSS
   - 推迟非关键CSS
5. 脚本解析和编译
   - 通过代码拆分减少JavaScript负载
   - 删除未使用的代码

###### 如何分析非关键代码

上面有提过 Coverage Tool

图片可以看出这个页面其实根本就不使用到element-ui css， 我们可以设置延迟加载非关键CSS

![](image_gul8h4aiPC.png)

`webpack`设置 `html-critical-webpack-plugin`

![](image_haEvCLE5ln.png)

效果

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb9bb86371b049848d16635603a05a55~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

原理

- `link rel="preload" as="style"`异步请求样式表。您可以`preload`在[《预载关键资产》指南](https://link.juejin.cn/?target=https://web.dev/preload-critical-assets/ "《预载关键资产》指南")中了解更多信息。
- onload属性link允许CSS在加载完成后进行处理，在这里执行null转化，可以避免在切换rel属性时重复处理
- noscript元素对不支持javascript的浏览器做兼容。
