# 模式 3：主进程到渲染器进程（WebContents）

将消息从主进程发送到渲染器进程时，**需要指定是哪一个渲染器接收消息**。 消息需要通过其 [WebContents](https://www.electronjs.org/zh/docs/latest/api/web-contents "WebContents") **实例发送到渲染器进程**。 此 WebContents 实例包含一个 [send](https://www.electronjs.org/zh/docs/latest/api/web-contents#contentssendchannel-args "send") 方法，其使用方式与 `ipcRenderer.send` 相同。

为了演示此模式，我们将构建一个**由原生操作系统菜单控制的数字计数器**。

对于此演示，您需要将代码添加到主进程、渲染器进程和预加载脚本。 完整代码如下，我们将在后续章节中对每个文件进行单独解释。

```javascript 
// main.js
const { app, BrowserWindow, Menu, ipcMain } = require('electron/main')
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
          click: ()  => mainWindow.webContents.send('update-counter', 1),
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

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
   ipcMain.on('counter-value', (_event, value) => {
    console.log(value) // will print value to Node console
  })
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
   onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
  counterValue: (value) => ipcRenderer.send('counter-value', value) 
})
```


```javascript 
// renderer.js
const counter = document.getElementById('counter')

window.electronAPI.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue.toString()
  window.electronAPI.counterValue(newValue)
})
```


[使用 webContents 模块发送消息](<./使用 webContents 模块发送消息/index.md> " 使用 webContents 模块发送消息")

[2. 通过预加载脚本暴露 ipcRenderer.on](<./预加载暴露on/index.md> "2. 通过预加载脚本暴露 ipcRenderer.on")

[3. 构建渲染器进程 UI](<./3.%20构建渲染器进程%20UI/index.md> "3. 构建渲染器进程 UI")

[可选：返回一个回复](./可选：返回一个回复/index.md "可选：返回一个回复")
