# Preload 脚本

预加载（`preload`）脚本包含了那些**执行于渲染器进程中**，且**先于网页**内容开始加载的代码 。 这些**脚本虽运行于渲染器的环境中**，**却因能访问**\*\*` Node.js API`而拥有了更多的权限。\*\*​

预加载脚本可以在 `BrowserWindow` 构造方法中的 `webPreferences` 选项里被附加到主进程。

```javascript 
const { BrowserWindow } = require('electron')
// ...
const win = new BrowserWindow({
  webPreferences: {
    preload: 'path/to/preload.js'
  }
})
// ...
```


因为预加载脚本与浏览器**共享同一个全局** [Window](https://developer.mozilla.org/en-US/docs/Web/API/Window "Window") 接口，**并且可以访问 Node.js API**，所以它通过在全局 `window` 中**暴露任意 API **来**增强渲染器**，以便你的网页内容使用。

**虽然预**加载脚本与其所附着的渲染器在**共享着一个全局** `window` 对象，但您并不能**从中直接附加任何变动**到 `window` 之上，因为 [contextIsolation](https://www.electronjs.org/zh/docs/latest/tutorial/context-isolation "contextIsolation") 是默认的。

```javascript 
// preload.js
window.myAPI = {
  desktop: true
}
```


```javascript 
// renderer.js
console.log(window.myAPI)
// => undefined

```


语境隔离（`Context Isolation`）意味着**预加载脚本与渲染器的主要运行环境是隔离开来**的，以避免泄漏任何具**特权的 API 到您**的**网页内容代码中。**

取而代之，我们將使用 [contextBridge](https://www.electronjs.org/zh/docs/latest/api/context-bridge "contextBridge") 模块来安全地实现交互：

```javascript 
// preload.js

const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true
})

```


```javascript 
// renderer.js
console.log(window.myAPI)
// => { desktop: true }

```


- 通过暴露 [ipcRenderer](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer "ipcRenderer") 帮手模块于渲染器中，您可以使用 进程间通讯 ( `inter-process communication, IPC` ) 来从渲染器触发主进程任务 ( 反之亦然 ) 。
- 如果您正在为`远程 URL `上托管的现有 `web` 应用开发 `Electron` 封裝，则您可在渲染器的 `window` 全局变量上添加自定义的属性，好在 `web` 客户端用上仅适用于桌面应用的设计逻辑 。
