# 模式 1：渲染器进程到主进程（单向）send/on

要将单向 IPC 消息从渲染器进程发送到主进程，您可以使用 [ipcRenderer.send](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer "ipcRenderer.send") API 发送消息，然后使用 [ipcMain.on](https://www.electronjs.org/zh/docs/latest/api/ipc-main "ipcMain.on") API 接收。

通常使用此模式从 `Web` 内容调用主进程 `API`。 我们将通过创建一个简单的应用来演示此模式，`可以通过编程方式更改它的窗口标题`。

对于此演示，您需要将代码添加到主进程、渲染器进程和预加载脚本。 完整代码如下，我们将在后续章节中对每个文件进行单独解释。

```javascript 
// main.js
const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('set-title', (event, title) => {
     const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
   })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```


```javascript 
// preload.js
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title)
})
```


```javascript 
// renderer.js
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
  const title = titleInput.value
  window.electronAPI.setTitle(title)
})

```


[Listen for events with ipcMain.on](<Listen for events with ipcMain.on.md> "Listen for events with ipcMain.on")

[通过预加载脚本暴露 ipcRenderer.send](<通过预加载脚本暴露 ipcRenderer.send.md> " 通过预加载脚本暴露 ipcRenderer.send")

[构建渲染器进程 UI](<构建渲染器进程 UI.md> "构建渲染器进程 UI")
