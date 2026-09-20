# 窗口管理

主进程的主要目的是使用 [BrowserWindow](https://www.electronjs.org/zh/docs/latest/api/browser-window "BrowserWindow") 模块创建和管理应用程序窗口。

`BrowserWindow` 类的**每个实例创建一个应用程序窗口**，且在**单独的渲染器进程中加载一个网页**。 您可从主进程用 `window` 的 [webContent](https://www.electronjs.org/zh/docs/latest/api/web-contents "webContent") 对象与网页内容进行交互。

```javascript 
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://github.com')

const contents = win.webContents
console.log(contents)
```


> 注意：渲染器进程也是为 web embeds 而被创建的，例如 BrowserView 模块。 嵌入式网页内容也可访问 webContents 对象。

由于 `BrowserWindow` 模块是一个\*\* **[**EventEmitter**](https://nodejs.org/api/events.html#events_class_eventemitter "EventEmitter")， 所以您也可以为**各种用户事件\*\* ( 例如，最小化 或 最大化您的窗口 ) **添加处理程序**。

当一个 `BrowserWindow` 实例被销毁时，**与其相应的渲染器进程也会被终止**。
