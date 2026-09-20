# 2. 通过预加载脚本暴露 ipcRenderer.on

与前面的渲染器到主进程的示例一样，我们使用预加载脚本中的 `contextBridge` 和 `ipcRenderer` 模块向渲染器进程暴露 IPC 功能：

```javascript 
// preload.js (Preload Script)

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value))
})

```


加载预加载脚本后，渲染器进程应有权访问 `window.electronAPI.onUpdateCounter()` 监听器函数

> 安全警告
> 出于 [安全原因](https://www.electronjs.org/zh/docs/latest/tutorial/context-isolation#security-considerations "安全原因")，我们不会**直接暴露整个** `ipcRenderer.on` API。 确保尽可能限制渲染器对 Electron API 的访问。 Also don't just pass the callback to `ipcRenderer.on` as this will leak `ipcRenderer` via `event.sender`. Use a custom handler that invoke the `callback` only with the desired arguments.

> INFO
> 在这个最小示例中，您可以直接在预加载脚本中调用 `ipcRenderer.on` ，而不是通过 context bridge 暴露它。

```javascript 
// preload.js (Preload Script)

const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('counter')
  ipcRenderer.on('update-counter', (_event, value) => {
    const oldValue = Number(counter.innerText)
    const newValue = oldValue + value
    counter.innerText = newValue
  })
})

```


但是，与通过 context bridge 暴露预加载 API 相比，此方法的灵活性有限，因为**监听器无法直接与渲染器代码交互。**
