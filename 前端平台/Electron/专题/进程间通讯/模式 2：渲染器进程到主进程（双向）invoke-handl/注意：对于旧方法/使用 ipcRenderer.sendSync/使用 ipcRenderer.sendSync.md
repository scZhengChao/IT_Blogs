# 使用 ipcRenderer.sendSync

`ipcRenderer.sendSync` API 向**主进程发送消息**，并 ***同步*** 等待响应。

```javascript 
// main.js (Main Process)

const { ipcMain } = require('electron')
ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // 在 Node 控制台中打印“ping”
   event.returnValue = 'pong'
 })
```


```javascript 
// preload.js (Preload Script)

// 您也可以使用 `contextBridge` API
// 将这段代码暴露给渲染器进程
const { ipcRenderer } = require('electron')

const result = ipcRenderer.sendSync('synchronous-message', 'ping')
console.log(result) // 在 DevTools 控制台中打印“pong”

```


这份代码的结构与 `invoke` 模型非常相似，但**出于性能原因**，我们建议**避免使用此 API**。 它的同步特性意味着**它将阻塞渲染器进程**，直到收到回复为止。
