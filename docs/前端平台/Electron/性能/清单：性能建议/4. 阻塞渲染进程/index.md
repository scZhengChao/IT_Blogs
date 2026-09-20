# 4. 阻塞渲染进程

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

自从 `Electron` 使用了当前版本的 `Chrome`，你可以使用`Web` **平台提供的最新和最优秀的功能**来**推迟或卸载繁重**的操作，以使你的应用保持**流畅和迅速的反应**。

#### 为什么？

你的应用可能有很多`JavaScript`在渲染过程中运行。 有个技巧是**尽快执行操作**，**而不占用**保持滚动平滑、响应用户输入或60帧/秒动画**所需的资源。**

如果有用户抱怨你的应用“口吃”的时候在渲染的代码中**编排操作流就显得尤其重要。**

#### 怎么做？

一般来说，所有用于构建现代浏览器的性能网络应用程序的建议，对于Electron 的渲染器也同样适用。 现在处理你的应用的主要两个方法是**对于小的操作使用**`requestIdleCallback()` 而**长时间运行的操作使用** `Web Workers`。

\_`requestIdleCallback()`\_允许开发者将函数排队为在**进程进入空闲期后立刻执行**。 它使你能够在**不影响用户体验的情况下执行低优先级或后台执行的工作**。 想要了解如何使用它的更多信息，[请查看MDN上的文档](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback "请查看MDN上的文档")。

\_Web Workers\_是在**单独线程上运行代码**的一个好方式。 有一些注意事项需要考虑 - 请查阅 Electron 的 [多线程文档](https://www.electronjs.org/zh/docs/latest/tutorial/multithreading "多线程文档") 和 [MDN 的 Web Workers文档](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers "MDN 的 Web Workers文档")。 对于**长时间并且大量使用CPU的操作来说**它们是**一个理想的解析器。**
