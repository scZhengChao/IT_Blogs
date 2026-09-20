# 模式 2：渲染器进程到主进程（双向）invoke/handle

双向 `IPC` 的一个常见应用是从渲染器进程代码调用**主进程模块并等待结果**。 这可以通过将 [ipcRenderer.invoke](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args "ipcRenderer.invoke") 与 [ipcMain.handle](https://www.electronjs.org/zh/docs/latest/api/ipc-main#ipcmainhandlechannel-listener "ipcMain.handle") 搭配使用来完成。

在下面的示例中，我们将从渲染器进程打开一个原生的文件对话框，并返回所选文件的路径。

对于此演示，您需要将代码添加到主进程、渲染器进程和预加载脚本。 完整代码如下，我们将在后续章节中对每个文件进行单独解释。

```javascript 
// main.js

const { app, BrowserWindow, ipcMain, dialog } = require('electron/main')
const path = require('node:path')

async function handleFileOpen () {
   const { canceled, filePaths } = await dialog.showOpenDialog()
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
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})

```


```javascript 
// renderer.js
const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
   const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath
 })
```


[1. 使用 ipcMain.handle 监听事件](<1. 使用 ipcMain.handle 监听事件.md> "1. 使用 ipcMain.handle 监听事件")

[2. 通过预加载脚本暴露 ipcRenderer.invoke](<2. 通过预加载脚本暴露 ipcRenderer.invoke.md> "2. 通过预加载脚本暴露 ipcRenderer.invoke")

[3. 构建渲染器进程 UI](<IT/前端平台/Electron/专题/进程间通讯/模式 2：渲染器进程到主进程（双向）invoke-handl/3. 构建渲染器进程 UI/3. 构建渲染器进程 UI.md> "3. 构建渲染器进程 UI")

[注意：对于旧方法](注意：对于旧方法.md "注意：对于旧方法")
