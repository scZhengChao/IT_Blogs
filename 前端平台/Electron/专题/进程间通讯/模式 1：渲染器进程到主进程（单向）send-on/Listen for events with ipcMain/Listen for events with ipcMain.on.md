# Listen for events with ipcMain.on

In the main process, set an IPC listener on the `set-title` channel with the `ipcMain.on`

API:

```javascript 
// main.js
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

// ...

function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.on('set-title', handleSetTitle)
  createWindow()
})
// ...

```


上面的 `handleSetTitle` 回调函数有两个参数：一个 [IpcMainEvent](https://www.electronjs.org/zh/docs/latest/api/structures/ipc-main-event "IpcMainEvent") 结构和一个 `title` 字符串。 每当消息通过 `set-title` 通道传入时，此**函数找到附加到消息发送方**的 BrowserWindow 实例，并在该实例上使用 `win.setTitle` API。

INFO

请确保您为以下步骤加载了 `index.html` 和 `preload.js` 入口点！
