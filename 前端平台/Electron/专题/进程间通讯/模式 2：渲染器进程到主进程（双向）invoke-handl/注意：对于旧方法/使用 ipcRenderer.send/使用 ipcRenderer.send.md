# 使用 ipcRenderer.send

我们用于单向通信的 `ipcRenderer.send` API 也可用于双向通信。 这是在 Electron 7 之前通过 IPC 进行异步双向通信的推荐方式。

```javascript 
// preload.js (Preload Script)

// 您也可以使用 `contextBridge` API
// 将这段代码暴露给渲染器进程
const { ipcRenderer } = require('electron')

 ipcRenderer.on('asynchronous-reply', (_event, arg) => {
  console.log(arg) // 在 DevTools 控制台中打印“pong”
})
ipcRenderer.send('asynchronous-message', 'ping')
```


```javascript 
// main.js (Main Process)

 ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // 在 Node 控制台中打印“ping”
  // 作用如同 `send`，但返回一个消息
  // 到发送原始消息的渲染器
  event.reply('asynchronous-reply', 'pong')
})

```


这种方法有几个缺点：

- 您需要设置第二个 `ipcRenderer.on` 监听器来处理渲染器进程中的响应。 使用 `invoke`，您将获得作为 `Promise` 返回到原始 API 调用的响应值。
- **没有显而易见的方法**可以将 `asynchronous-reply` 消息与原始的 `asynchronous-message` 消息配对。 如果您通过这些通道非常频繁地来回传递消息，则需要**添加其他应用代码来单独跟踪**每个调用和响应。
