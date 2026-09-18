# &#x20;使用 webContents 模块发送消息

对于此演示，我们需要首先使用 Electron 的 `Menu` 模块在主进程中构建一个自定义菜单，该模块使用 `webContents.send` API 将 IPC 消息从主进程发送到目标渲染器。

```javascript 
// main.js (Main Process)
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('node:path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
           click: () => mainWindow.webContents.send('update-counter', 1), 
          label: 'Increment'
        },
        {
           click: () => mainWindow.webContents.send('update-counter', -1),
           label: 'Decrement'
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  mainWindow.loadFile('index.html')
}
// ...
```


出于本教程的目的，请务必注意， `click` 处理函数通过 `update-counter` 通道向渲染器进程发送消息（`1` 或 `-1`）。

```javascript 
click: () => mainWindow.webContents.send('update-counter', -1)
```


> INFO
> 请确保您为以下步骤加载了 `index.html` 和 `preload.js` 入口点！
