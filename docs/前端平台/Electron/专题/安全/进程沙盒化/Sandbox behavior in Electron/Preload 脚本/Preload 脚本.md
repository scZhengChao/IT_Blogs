# Preload 脚本

为了让渲染进程能与主进程通信，**附属于沙盒化**的渲染进程的 `preload` **脚本中**仍可**使用一部分**以 `Polyfill` 形式实现的 `Node.js API`。 有一个与 `Node` 中类似的 `require` 函数提供了出来，**但只能载入** `Electron` 和 `Node` 内置模块的一个子集：

- `electron` (following renderer process modules: `contextBridge`, `crashReporter`, `ipcRenderer`, `nativeImage`, `webFrame`, `webUtils`)
- [事件](https://nodejs.org/api/events.html "事件")
- [timers](https://nodejs.org/api/timers.html "timers")
- [url](https://nodejs.org/api/url.html "url")

Node. js 中的[import](https://nodejs.org/api/esm.html#node-imports "import")方法也是被支持的：

- [events](https://nodejs.org/api/events.html "events")
- [timers](https://nodejs.org/api/timers.html "timers")
- [url](https://nodejs.org/api/url.html "url")

此外，以下 Node.js 基础对象也填充到了 preload 脚本的全局上下文中：

- [Buffer](https://nodejs.org/api/buffer.html "Buffer")
- [process](https://www.electronjs.org/zh/docs/latest/api/process "process")
- [clearImmediate](https://nodejs.org/api/timers.html#timers_clearimmediate_immediate "clearImmediate")
- [setImmediate](https://nodejs.org/api/timers.html#timers_setimmediate_callback_args "setImmediate")

`require` 函数只是一个**功能有限**的 `Ployfill` 实现，并不支持把 `preload` 脚本拆成多个文件然后作为 `CommonJS` 模块 来加载。 若需要**拆分 ****`preload`**** 脚本的代码，可以使用 ****`webpack`**** 或 ****`Parcel`**** 等打包工具。**

注意，因为 `preload` 脚本的运行**环境本质上比沙盒化渲染进程的拥有更高的特权**，除非**开启了** [contextIsolation](https://www.electronjs.org/zh/docs/latest/tutorial/context-isolation "contextIsolation")，否则高特权的 API 仍有可能被泄漏给渲染进程中的不信任代码。
