# 7. 打包你的代码

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

正如中已经指出的那样，"[加载和运行代码太早](https://www.electronjs.org/zh/docs/latest/tutorial/performance#2-loading-and-running-code-too-soon "加载和运行代码太早")", 调用 `require()` 是一项繁重的操作。 如果你能够这样做，将你的应用程序的代码打包到单个文件中。

#### 为什么？

现代JavaScript开发通常涉及许多文件和模块。 对于使用Electron开发的人来说这是非常好的事情，我们强烈建议你将你的**代码打包到单个文件中以确保调用`require()`时只在你的应用加载花费一次开销。**

#### 怎么做？

有许多JavaScript打包的方法可供使用，我们知道我们最好不要因为推荐某一种工具来使得社区不满。 然而，我们的确建议您使用一个能够处理Electron独特的环境的打包程序 **，它需要处理Node.js 和浏览器两种环境。**

在撰写这篇文章时，受欢迎的选择包括[Webpack](https://webpack.js.org/ "Webpack"), [Parcel](https://parceljs.org/ "Parcel")和[rollup.js](https://rollupjs.org/ "rollup.js")。
