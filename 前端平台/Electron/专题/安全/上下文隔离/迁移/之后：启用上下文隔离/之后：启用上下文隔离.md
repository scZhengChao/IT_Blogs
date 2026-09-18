# 之后：启用上下文隔离

`Electron` 提供一种专门的模块来无阻地帮助您完成这项工作。 [contextBridge](https://www.electronjs.org/zh/docs/latest/api/context-bridge "contextBridge") 模块可以用来**安全地**从独立运行、上下文隔离的**预加载脚本中**暴露 `API` 给**正在运行的渲染进程**。 API 还可以像以前一样，从 `window.myAPI` 网站上访问。

```javascript 
// preload.js

// 在上下文隔离启用的情况下使用预加载
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})

```


```javascript 
// renderer.js

// 在渲染器进程使用导出的 API
window.myAPI.doAThing()

```


请阅读 `contextBridge` 的文档，以**全面了解其限**制。 例如，您不能在 contextBridge 中**暴露原型或者 Symbol**。
