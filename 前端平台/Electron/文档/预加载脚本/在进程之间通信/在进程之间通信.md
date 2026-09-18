# 在进程之间通信

我们之前提到，`Electron` 的主进程和渲染进程**有着清楚的分工并且不可互换**。 这代表着无论是从**渲染进程直接**访问 `Node.js` 接口，亦或者是从**主进程访问** `HTML` 文档对象模型 (`DOM`)，**都是不可能的。**

解决这一问题的方法是使用进程间通信 (IPC)。可以使用 `Electron` 的 `ipcMain` 模块和 `ipcRenderer` 模块来进行进程间通信。 为了从你的**网页向主进程发送消息**，你可以使用 `ipcMain.handle` 设置一个**主进程处理程序**（handler），然后在预处理脚本中暴露一个被称为 `ipcRenderer.invoke` 的**函数来触发该处理程序**（handler）。

我们将向渲染器添加一个叫做 `ping()` 的全局函数来演示这一点。这个函数将返回一个从主进程翻山越岭而来的字符串。

首先，在预处理脚本中设置 `invoke` 调用：

```javascript 
// preload.js

const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
  // 除函数之外，我们也可以暴露变量
})

```


> IPC 安全
>
> 可以注意到我们使用了一个辅助函数来包裹 `ipcRenderer.invoke('ping')` 调用，而并非直接通过 context bridge 暴露 `ipcRenderer` 模块。 你**永远都不会想要通**过预加载直接暴露整个 `ipcRenderer` 模块。 这将使得你的**渲染器能够**直接向**主进程发送任意的 IPC 信息，** 会使得其成为恶意代码最强有力的攻击媒介。

然后，在主进程中设置你的 `handle` 监听器。 我们在 HTML 文件加载\_之前\_完成了这些，所以才能保证在你从渲染器发送 `invoke` 调用之前处理程序能够准备就绪。

```javascript 
// main.js

const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')
}
app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()
})

```


将发送器与接收器设置完成之后，现在你可以将信息通过刚刚定义的 `'ping'` 通道从渲染器发送至主进程当中。

```javascript 
// renderer.js
const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // 打印 'pong'
}

func()
```
