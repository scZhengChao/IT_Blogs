# 主进程接收事件并向应用层发送事件

## 目录

- [mainWindow.js](#mainWindowjs)

在主进程中我们使用ipcMain.on`来监听事件``，并进行相应操作，并在相应操作之后在需要的时候发送事件到应用层``。`下面我们封装mainWindow\.js里面包含`创建窗口方法，获取窗口实例方法，获取窗口是否存在方法及事件监听方法`

#### `mainWindow.js`

```javascript 
const { BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const isProduction = process.env.NODE_ENV === 'development'
let mainWindow = null

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1160,
        height: 752,
        minHeight: 632,
        minWidth: 960,
        show: false,
        frame: false,
        title: 'Harbour',
        webPreferences: {
            nodeIntegration: true,
            preload: path.resolve(__dirname, '../utils/contextBridge.js')
        },
        icon: path.resolve(__dirname, '../assets/logo.png')
    })

    if (isDevelopment) {
        mainWindow.loadURL('http://localhost:8000/')
    } else {
        const entryPath = path.resolve(__dirname, '../../build/index.html')
        mainWindow.loadFile(entryPath)
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindowListenEvents()
}

function mainWindowListenEvents() {
    ipcMain.on('mainWindow-min', () => {
        mainWindowIsExist() && mainWindow.minimize()
    })

    ipcMain.on('mainWindow-max', () => {
        if (mainWindowIsExist()) {
            mainWindow.maximize()
            mainWindow.webContents.send('mainWindowIsMax', true)
        }
    })

    ipcMain.on('mainWindow-restore', () => {
        if (mainWindowIsExist()) {
            mainWindow.unmaximize()
            mainWindow.webContents.send('mainWindowIsMax', false)
        }
    })

    ipcMain.on('mainWindow-close', () => {
        mainWindowIsExist() && mainWindow.hide()
    })

    ipcMain.on('mainWindow-open-devtool', () => {
        mainWindowIsExist() && mainWindow.webContents.openDevTools()
    })
}

function mainWindowIsExist() {
    return mainWindow && !mainWindow.isDestroyed()
}

function getMainWindow() {
    return mainWindow
}

module.exports = {
    getMainWindow,
    createMainWindow,
    mainWindowIsExist
}

```
