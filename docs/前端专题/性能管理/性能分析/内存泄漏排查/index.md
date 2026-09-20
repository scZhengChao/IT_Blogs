# 内存泄漏排查

## 目录

- [Chrome devTools查看内存情况](#Chrome-devTools查看内存情况)

## Chrome devTools查看内存情况

> 打开`Chrome`**的无痕模式**，这样做的目的是为了屏蔽掉`Chrome`插件对我们之后测试内存占用情况的影响
> 打开开发者工具，找到`Performance`这一栏，可以看到其内部带着一些功能按钮，例如：开始录制按钮；刷新页面按钮；清空记录按钮；记录并可视化js内存、节点、事件监听器按钮；触发垃圾回收机制按钮等

![](./image/image_4-tjgGNtgF.png)

![](./image/image_fYOnISs5in.png)

> 从上图中我们可以看到，在页面从零到加载完成这个过程中`JS Heap`（js堆内存）、`documents`（文档）、`Nodes`（DOM节点）、`Listeners`（监听器）、`GPU memory`（`GPU`内存）的最低值、最高值以及随时间的走势曲线，这也是我们主要关注的点。

[内存泄漏的场景](./内存泄漏的场景/index.md "内存泄漏的场景")

[手把手教你排查Javascript内存泄漏](./手把手教你排查Javascript内存泄漏/index.md "手把手教你排查Javascript内存泄漏")
