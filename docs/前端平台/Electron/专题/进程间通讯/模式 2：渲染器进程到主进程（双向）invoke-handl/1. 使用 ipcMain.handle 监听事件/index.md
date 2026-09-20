# 1. 使用 ipcMain.handle 监听事件

在主进程中，我们将创建一个 `handleFileOpen()` 函数，它调用 `dialog.showOpenDialog` 并返回用户选择的文件路径值。 每当渲染器进程通过 `dialog:openFile` 通道发送 `ipcRender.invoke` 消息时，**此函数被用作一个回调。 然后，返回值将作为一个 ****`Promise`**** 返回到最初的 ****`invoke`**** 调用。**

> 关于错误处理
> 在主进程中通过 `handle` 引发的错误是不透明的，因为它们被序列化了，并且只有原始错误的 `message` 属性会提供给渲染器进程。 详情请参阅 \[#24427]（[https://github.com/electron/electron/issues/24427）。](https://github.com/electron/electron/issues/24427）。 "https://github.com/electron/electron/issues/24427）。")

```javascript 
// main.js (Main Process)

const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('node:path')

// ...

async function handleFileOpen () {
  const { canceled, filePaths } = await dialog.showOpenDialog({})
  if (!canceled) {
    return filePaths[0]
  }
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
   ipcMain.handle('dialog:openFile', handleFileOpen)
   createWindow()
})
// ...
```


> 关于通道名称
> IPC 通道名称上的 dialog: 前缀对代码没有影响。 它仅用作命名空间以帮助**提高代码的可读性**。

> INFO
> 请确保您为以下步骤加载了 `index.html` 和 `preload.js` 入口点！
