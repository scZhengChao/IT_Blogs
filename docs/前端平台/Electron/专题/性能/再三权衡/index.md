# 再三权衡

## 目录

- [推荐阅读](#推荐阅读)

以下列举了一些直截了当、易于实现的方式。 但是，如果你想构建性能最优秀的应用，仅仅这些是不够的。 你需要仔细检查应用中运行的所有代码，认真地进行分析和衡量。 瓶颈在哪里？ 当用户点击按钮时，哪些操作的执行占用了最多的时间？ 当应用程序被挂起时，哪些对象占用了最多的内存？

通过多次的尝试，我们发现，构建高性能的`Electron`应用程序，**最成功的策略**是**分析正在运行的代码**，**查找其中最耗资源的部分**，然后**对其进行优化**。 **一遍又一遍地重复这个“搬砖”的过程**，将极大地提高应用程序的性能。 在大型应用程序（例如Visual Studio Code、Slack）中的**实践经验证明**了**这是目前最可靠的性能提升策略。**

要了解更多关于如何分析应用程序代码的信息，请熟悉Chrome开发者工具。 若要高级分析查看多个进程，请使用 [Chrome Tracing](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool "Chrome Tracing") 工具。

### 推荐阅读

- [Analyze runtime performance](https://developer.chrome.com/docs/devtools/performance/ "Analyze runtime performance")
- [谈：“Visual Studio Code - 第一个一秒”](https://www.youtube.com/watch?v=r0OeHRUCCb4 "谈：“Visual Studio Code - 第一个一秒”")
