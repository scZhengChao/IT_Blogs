# IPC 通道和上下文隔离进程

在 `Electron` 中，进程使用 [ipcMain](https://www.electronjs.org/zh/docs/latest/api/ipc-main "ipcMain") 和 [ipcRenderer](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer "ipcRenderer") 模块，通过开发人员定义的“通道”传递消息来进行通信。 这些通道是 **任意** （您可以随意命名它们）和 **双向** （您可以在两个模块中使用相同的通道名称）的。

在本指南中，我们将介绍一些基本的 IPC 模式，并提供具体的示例。您可以将这些示例作为您应用程序代码的参考。

在开始实现细节之前，您应该熟悉使用 [预加载脚本](https://www.electronjs.org/zh/docs/latest/tutorial/process-model#preload-scripts "预加载脚本") 在上下文隔离渲染器进程中导入 Node.js 和 Electron 模块的概念。

- 有关 Electron 进程模型的完整概述，您可以阅读 [进程模型文档](https://www.electronjs.org/zh/docs/latest/tutorial/process-model "进程模型文档")。
- 有关使用 `contextBridge` 模块从预加载脚本暴露 API 的入门知识，请查看 [上下文隔离教程](https://www.electronjs.org/zh/docs/latest/tutorial/context-isolation "上下文隔离教程")。

[跨进程通信(IPC)的核心原理](./跨进程通信(IPC)的核心原理/index.md "跨进程通信(IPC)的核心原理")

[底层通信原理详解](./底层通信原理详解/index.md "底层通信原理详解")

这片文章页详细的介绍了`node`中的ipc 通讯

[深入理解 Node.js 进程与线程](<../../../NODE/深入理解/深入理解%20Node.js%20进程与线程/index.md> "深入理解 Node.js 进程与线程")
