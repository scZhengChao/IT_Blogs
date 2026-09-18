# 2. 通过预加载脚本暴露 ipcRenderer.invoke

在预加载脚本中，我们暴露了一个单行的 `openFile` 函数，它调用并返回 `ipcRenderer.invoke('dialog:openFile')` 的值。 我们将在下一步中使用此 API 从渲染器的用户界面调用原生对话框。

```javascript 
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})


```


> 安全警告
> 出于 [安全原因](https://www.electronjs.org/zh/docs/latest/tutorial/context-isolation#security-considerations "安全原因")，我们不会直接暴露整个 `ipcRenderer.invoke` API。 确保尽可能限制渲染器对 Electron API 的访问。
