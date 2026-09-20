# 进程沙盒化

`Chromium`的一个关键安全特性是，**进程可以在沙盒中执行**。 沙盒通过限制对**大多数系统资源的访问**来**减少恶意代码**可能造成的伤害 — 沙盒化的进程只能自由使用`CPU`周期和内存。 为了执行需要额外权限的操作，沙盒处的**进程通过专用通信渠道将任务下放给更大权限的进程。**

在Chromium中，沙盒化**应用于主进程以外的大多数进程**。 其中包括**渲染器进程**，以及**功能性进程**，如**音频服务、GPU 服务和网络服务**。

查阅Chromium的 [沙箱设计文档](https://chromium.googlesource.com/chromium/src/+/main/docs/design/sandbox.md "沙箱设计文档") 了解更多信息。

从 Electron 20 开始，渲染进程**默认启用了沙盒，**无需进一步配置。 如果你想**禁用某个进程的沙盒**，请参阅[为单个进程禁用沙盒](https://www.electronjs.org/zh/docs/latest/tutorial/sandbox#为单个进程禁用沙盒 "为单个进程禁用沙盒")部分。

[Sandbox behavior in Electron](<./Sandbox behavior in Electron/index.md> "Sandbox behavior in Electron")

[配置沙盒](./配置沙盒/index.md "配置沙盒")

[渲染不可信内容的注意事项](./渲染不可信内容的注意事项/index.md "渲染不可信内容的注意事项")
