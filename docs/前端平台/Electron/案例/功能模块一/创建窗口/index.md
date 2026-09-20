# 创建窗口

## 目录

- [封装mainWindow.js](#封装mainWindowjs)

由于创建窗口需要在`app.on('ready', () => {})`中，因此我们可以把创建窗口封装成一个函数并导出，在`app.on('ready', () => {})`中执行，例如：

# **封装mainWindow\.js**

```javascript 
const { BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const isDevelopment = process.env.NODE_ENV === 'development'
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
}

module.exports = { createMainWindow }


```


`代码解析：我们这里使用process.env.NODE_ENV的值判断当前的运行环境，这里的运行环境需要说明一下，当我们使用下面配置的npm run dev-electron运行时，该值为"development"，当我们将渲染层代码打包后，使用npm run prod-electron运行时，该值为"production"，然而当我们使用electron-builder打包出来的安装包运行时，该值不存在为undefined。因此只有当该值是"development"时我们才加载一个我们渲染层启动的服务地址，其他两种情况下我们都需要加载我们渲染层打包后的入口文件即：build目录下的index.html
我们在窗口触发"ready-to-show"时显示窗口是为了使加载时的白屏时间不被用户看到`

**index.js导入并在app.on('ready', () => {})中执行**

```javascript 
const { app } = require('electron')
const { createMainWindow } = require('./windows/mainWindow')

app.on('ready', () => {
    createMainWindow()
})

```


此时我们就可以运行electron，我们在package.json中配置运行命令

```javascript 
{
    "scripts": {
        "dev-electron": "cross-env NODE_ENV=development electron main/index.js",
        "prod-electron": "cross-env NODE_ENV=production electron main/index.js",
    }
}

```


[窗口常用的实例属性](./窗口常用的实例属性/index.md "窗口常用的实例属性")

[窗口常用的实例事件](./窗口常用的实例事件/index.md "窗口常用的实例事件")

[窗口常用的实例方法](./窗口常用的实例方法/index.md "窗口常用的实例方法")
