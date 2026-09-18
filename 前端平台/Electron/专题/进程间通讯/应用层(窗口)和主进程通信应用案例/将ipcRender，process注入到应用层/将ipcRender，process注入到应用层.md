# 将ipcRender，process注入到应用层

## 目录

- [contextBridge.js](#contextBridgejs)

我们知道`ipcMain和ipcRender都是electron的Api，要想在应用层使用ipcRender就需要`**`先将其注入到应用层`**`，在electron中使用contextBridge.exposeInMainWorld方法将electron的Api注入到应用层，注入之后我们就可以`**`在应用层的window上访问注入的属性`**`。我们这里将ipcRender和process`**`两个属性注入到应用层，`**`分别用来实现`**`通信和判断当前运行环境`**`。`

封装`contextBridge.js`文件

#### `contextBridge.js`

```javascript 
const { contextBridge, ipcRenderer } = require('electron')

/**
 * contextBridge.exposeInMainWorld的作用就是将主进程的某些API注入到渲染进程，
 * 供渲染进程使用（主进程并非所有的API或对象都能注入给渲染进程，需要参考文档）
 * ipcRenderer 渲染进程通过window.ipcRenderer调用
 */
contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, ...args) => {
        if (args?.length > 0) {
            ipcRenderer.send(channel, ...args)
        } else {
            ipcRenderer.send(channel)
        }
    },
    on: (channel, func) => {
        ipcRenderer.on(channel, func)
    },
    once: (channel, func) => {
        ipcRenderer.once(channel, func)
    },
    removeListener: (channel, func) => {
        ipcRenderer.removeListener(channel, func)
    },
    sendSync: (channel, ...args) => {
        if (args?.length > 0) {
            return ipcRenderer.sendSync(channel, ...args)
        } else {
            return ipcRenderer.sendSync(channel)
        }
    },
    invoke: (channel, ...args) => {
        try {
            return ipcRenderer.invoke(channel, ...args)
        } catch (error) {
            console.error(`Error invoking API: ${channel}`, error)
        }
    },
})

contextBridge.exposeInMainWorld('process', {
    NODE_ENV: process.env.NODE_ENV
})

```
