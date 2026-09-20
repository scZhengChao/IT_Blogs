# 可选：返回一个回复

对于从**主进程到渲染器进程**的 IPC，没有与 `ipcRenderer.invoke` 等效的 API。 不过，您可以从 `ipcRenderer.on` **回调中将回复发送回主进程。**

我们可以对前面例子的代码进行略微修改来演示这一点。 In the renderer process, expose another API to send a reply back to the main process through the `counter-value` channel.

```javascript 
// preload.js (Preload Script)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateCounter:  (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)), 
  counterValue: (value) => ipcRenderer.send('counter-value', value)
})
```


```javascript 
// renderer.js (Renderer Process)

const counter = document.getElementById('counter')

window.electronAPI.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue.toString()
  window.electronAPI.counterValue(newValue)
})

```


在主进程中，监听 `counter-value` 事件并适当地处理它们。

```javascript 
// main.js (Main Process)

// ...
ipcMain.on('counter-value', (_event, value) => {
  console.log(value) // will print value to Node console
})
// ...

```
