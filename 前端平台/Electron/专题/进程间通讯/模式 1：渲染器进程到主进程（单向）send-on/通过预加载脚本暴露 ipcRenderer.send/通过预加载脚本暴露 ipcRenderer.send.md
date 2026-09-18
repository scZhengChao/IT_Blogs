# &#x20;通过预加载脚本暴露 ipcRenderer.send

要将消息发送到上面创建的监听器，您可以使用 `ipcRenderer.send` API。 默认情况下，渲染器进程没有权限访问 `Node.js` 和 `Electron` 模块。 作为应用开发者，您需要使用 `contextBridge` API 来选择要从预加载脚本中暴露哪些 API。

在您的预加载脚本中添加以下代码，向渲染器进程暴露一个全局的 `window.electronAPI` 变量。

```javascript 
// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title)
})


```


此时，您将能够在渲染器进程中使用 `window.electronAPI.setTitle()` 函数。

> 安全警告
> 出于 [安全原因](https://www.electronjs.org/zh/docs/latest/tutorial/context-isolation#security-considerations "安全原因")，我们不会直接暴露整个 `ipcRenderer.send` API。 确保尽可能限制渲染器对 Electron API 的访问。
