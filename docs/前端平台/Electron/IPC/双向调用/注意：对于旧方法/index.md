# 注意：对于旧方法

`ipcRenderer.invoke` API 是在\*\* Electron 7 中添加的，作为处理渲染器进程中双向 IPC 的一种开发人员友好的方式\*\*。 However, a couple of alternative approaches to this IPC pattern exist.

> 如果可能，**请避免使用旧方法**
> 我们**建议尽可能使用** `ipcRenderer.invoke` 。 出于保留历史的目地，记录了下面双向地渲染器到主进程模式。

> INFO
> 对于以下示例，我们将直接从预加载脚本调用 ipcRenderer，以保持代码示例短小

[使用 ipcRenderer.send](<./使用 ipcRenderer.send/index.md> "使用 ipcRenderer.send")

[使用 ipcRenderer.sendSync](<./使用 ipcRenderer.sendSync/index.md> "使用 ipcRenderer.sendSync")
