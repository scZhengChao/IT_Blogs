# 流程模型

## 目录

- [为什么不是一个单一的进程？](#为什么不是一个单一的进程)
- [多进程模型](#多进程模型)
- [主进程](#主进程)
  - [窗口管理](#窗口管理)
- [渲染器进程](#渲染器进程)
- [Preload 脚本](#Preload-脚本)

官网镇楼

[ 流程模型 | Electron Electron 继承自 Chromium 的多进程架构，这使得其框架结构与现代Web浏览器非常相似。 This guide will expand on the concepts applied in the tutorial. http://www.electronjs.org/zh/docs/latest/tutorial/process-model](http://www.electronjs.org/zh/docs/latest/tutorial/process-model " 流程模型 | Electron Electron 继承自 Chromium 的多进程架构，这使得其框架结构与现代Web浏览器非常相似。 This guide will expand on the concepts applied in the tutorial. http://www.electronjs.org/zh/docs/latest/tutorial/process-model")

## 为什么不是一个单一的进程？

网页浏览器是个极其复杂的应用程序。 除了显示网页内容的主要能力之外，他们还有许多次要的职责，例如：管理众多窗口 ( 或 标签页 ) 和加载第三方扩展。

在早期，浏览器通常使用单个进程来处理所有这些功能。 虽然这种模式意味着您打开每个标签页的开销较少，但也同时意味着一个网站的崩溃或无响应会影响到整个浏览器。

## 多进程模型

为了解决这个问题，Chrome 团队决定让每个标签页在自己的进程中渲染， 从而限制了一个网页上的有误或恶意代码可能导致的对整个应用程序造成的伤害。 然后用单个浏览器进程控制这些标签页进程，以及整个应用程序的生命周期。 下方来自 [Chrome 漫画](https://www.google.com/googlebooks/chrome/ "Chrome 漫画") 的图表可视化了此模型：

![](http://www.electronjs.org/zh/assets/images/chrome-processes-0506d3984ec81aa39985a95e7a29fbb8.png)

Electron 应用程序的结构非常相似。 As an app developer, you control two types of processes: [main](http://www.electronjs.org/zh/docs/latest/tutorial/process-model#the-main-process "main") and [renderer](http://www.electronjs.org/zh/docs/latest/tutorial/process-model#the-renderer-process "renderer"). These are analogous to Chrome's own browser and renderer processes outlined above.

## 主进程

每个 Electron 应用都有一个单一的主进程，作为应用程序的入口点。 主进程在 Node.js 环境中运行，这意味着它具有 `require` 模块和使用所有 Node.js API 的能力

### 窗口管理

主进程的主要目的是使用 [BrowserWindow](http://www.electronjs.org/zh/docs/latest/api/browser-window "BrowserWindow") 模块创建和管理应用程序窗口。

`BrowserWindow` 类的每**个实例创建一个应用程序窗口，且在单独的渲染器进程中加载一个网页**。 您可从主进程用 window 的 [webContent](http://www.electronjs.org/zh/docs/latest/api/web-contents "webContent") 对象与网页内容进行交互。

```typescript 
//mian.js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://github.com')

const contents = win.webContents
console.log(contents)
```


> 注意：渲染器进程也是为 [web embeds](http://www.electronjs.org/zh/docs/latest/tutorial/web-embeds "web embeds") 而被创建的，例如 `BrowserView` 模块。 嵌入式网页内容也可访问 `webContents` 对象。

由于 `BrowserWindow` 模块是一个 [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter "EventEmitter")， 所以您也可以为各种用户事件 ( 例如，最小化 或 最大化您的窗口 ) 添加处理程序。

当一个 `BrowserWindow` 实例被销毁时，与其相应的渲染器进程也会被终止。

## 渲染器进程

每个 Electron 应用都会为每个打开的 `BrowserWindow` ( 与每个网页嵌入 ) 生成一个单独的渲染器进程。 洽如其名，渲染器负责 *渲染* 网页内容。 所以实际上，运行于渲染器进程中的代码是须遵照网页标准的 (至少就目前使用的 Chromium 而言是如此) 。

因此，一个浏览器窗口中的所有的用户界面和应用功能，都应与您在网页开发上使用相同的工具和规范来进行攥写。

虽然解释每一个网页规范超出了本指南的范围，但您最起码要知道的是：

- 以一个 HTML 文件作为渲染器进程的入口点。
- 使用层叠样式表 (Cascading Style Sheets, CSS) 对 UI 添加样式。
- 通过 `<script>` 元素可添加可执行的 JavaScript 代码。

此外，这也意味着渲染器无权直接访问 `require` 或其他 Node.js API。 为了在渲染器中直接包含 NPM 模块，您必须使用与在 web 开发时相同的打包工具 (例如 `webpack` 或 `parcel`)

此刻，您或许会好奇：既然这些特性只能由主进程访问，**那渲染器进程用户界面怎样才能与 Node.js 和 Electron 的原生桌面功能进行交互。 而事实上，确实没有直接导入 Electron 內容脚本的方法。**

## Preload 脚本

预加载（preload）脚本**包含了那些执行于渲染器进程中，且先于网页内容开始加载的代码** 。 这些脚本**虽运行于渲染器的环境中，却因能访问 Node.js API 而拥有了更多的权限。**

预加载脚本可以在 `BrowserWindow` 构造方法中的 `webPreferences` 选项里被附加到主进程。

```typescript 
const { BrowserWindow } = require('electron')
//...
const win = new BrowserWindow({
  webPreferences: {
    preload: 'path/to/preload.js',
  },
})
//...
```


因为预加载脚本**与浏览器共享同一个全局 **[**Window**](https://developer.mozilla.org/en-US/docs/Web/API/Window "Window")** 接口**，并且**可以访问 Node.js API**，所以它通过在全局 `window` 中暴露任意 API 来增强渲染器，以便你的网页内容使用。

虽然预加载脚本与其所附着的渲染器在共享着一个全局 `window` 对象，但您并不能从中**直接附加任何变动**到 `window` 之上，因为 [contextIsolation](http://www.electronjs.org/zh/docs/latest/tutorial/context-isolation "contextIsolation") 是默认的。

```typescript 
//preload.js
window.myAPI = {
  desktop: true,
}
//renderer.js
console.log(window.myAPI)
// => undefined

```


语境隔离（Context Isolation）意味着**预加载脚本与渲染器的主要运行环境是隔离开来的**，以**避免泄漏任何具特权的 API 到您的网页内容代码**中。

取而代之，我们將使用 [contextBridge](http://www.electronjs.org/zh/docs/latest/api/context-bridge "contextBridge") 模块来安全地实现交互：

```typescript 
//preload.js
const { contextBridge } = require('electron')
contextBridge.exposeInMainWorld('myAPI', {
  desktop: true,
})
// renderer.js
console.log(window.myAPI)
// => { desktop: true }

```


此功能对两个主要目的來說非常有用：

- 通过暴露 [ipcRenderer](http://www.electronjs.org/zh/docs/latest/api/ipc-renderer "ipcRenderer") 帮手模块于渲染器中，您可以使用 进程间通讯 ( inter-process communication, IPC ) 来从渲染器触发主进程任务 ( 反之亦然 ) 。
- 如果您正在为远程 URL 上托管的现有 web 应用开发 Electron 封裝，则您可在渲染器的 `window` 全局变量上添加自定义的属性，好在 web 客户端用上仅适用于桌面应用的设计逻辑 。
