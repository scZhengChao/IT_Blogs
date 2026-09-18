# 第 1 篇：beginWork 前的准备工作：jsxDEV，createRoot，render 源码实现

[ React 源码：beginWork 前的准备工作：jsxDEV、createRoot、render 源码实现 - 掘金 渲染的三个阶段：beginWork对应虚拟DOM转成fiber树的过程；completeWork对应fiber树转转成真实的DOM树的；commitWork真实的DOM树挂载到页面上的过程 https://juejin.cn/post/7310156414252711936](https://juejin.cn/post/7310156414252711936 " React 源码：beginWork 前的准备工作：jsxDEV、createRoot、render 源码实现 - 掘金 渲染的三个阶段：beginWork对应虚拟DOM转成fiber树的过程；completeWork对应fiber树转转成真实的DOM树的；commitWork真实的DOM树挂载到页面上的过程 https://juejin.cn/post/7310156414252711936")

`react@18` 由于引入了 `fiber`，目录结构有了很大的变化，它的主要目录结构如下：

- react
  - react 相关 api
- react-dom
  - 渲染相关
- react-dom-bindings
  - 对真实 DOM 的操作
  - 事件的绑定
- react-reconciler
  - fiber 相关内容
- scheduler
  - 优先级相关调度
- shared
  - 工具函数
