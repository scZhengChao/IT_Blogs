# 渲染器进程

当 `Electron` 中的**渲染进程被沙盒化时**，它们的行为与常规 `Chrome` 渲染器一样。 一个沙盒化的渲染器**不会有一个** `Node.js` 环境。

因此，在沙盒中，渲染进程只能透过 进程间通讯 (`inter-process communication, IPC`) **委派任务给主进程的方式**， 来执行需权限的任务 (例如：文件系统交互，对系统进行更改或生成子进程) 。

> NOTE
> 想要了解更多关于进程间通信的信息，请参阅我们的 [**IPC 指南**](https://www.electronjs.org/zh/docs/latest/tutorial/ipc "IPC 指南")**。**
