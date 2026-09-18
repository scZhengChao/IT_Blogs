# 快速入门

## 目录

- [运行主进程](#运行主进程)
- [管理窗口的生命周期](#管理窗口的生命周期)
  - [关闭所有窗口时退出应用 (Windows & Linux)](#关闭所有窗口时退出应用-Windows--Linux)
  - [如果没有窗口打开则打开一个窗口 (macOS)](#如果没有窗口打开则打开一个窗口-macOS)
- [通过预加载脚本从渲染器访问Node.js](#通过预加载脚本从渲染器访问Nodejs)

### 运行主进程

任何 Electron 应用程序的入口都是 `main` 文件。 这个文件控制了**主进程**，它运行在一个完整的Node.js环境中，负责控制您应用的生命周期，显示原生界面，执行特殊操作并管理渲染器进程(稍后详细介绍)。

执行期间，Electron 将依据应用中 `package.json`配置下[main](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#main "main")字段中配置的值查找此文件，您应该已在[应用脚手架](http://www.electronjs.org/zh/docs/latest/tutorial/quick-start#scaffold-the-project "应用脚手架")步骤中配置。

要初始化这个`main`文件，需要在您项目的根目录下创建一个名为`main.js`的空文件。

### 管理窗口的生命周期

虽然你现在可以打开一个浏览器窗口，但你还需要一些额外的模板代码使其看起来更像是各平台原生的。 应用程序窗口在每个OS下有不同的行为，Electron将在app中实现这些约定的责任交给开发者们。

一般而言，你可以使用 `进程` 全局的 [platform](https://nodejs.org/api/process.html#process_process_platform "platform") 属性来专门为某些操作系统运行代码。

#### 关闭所有窗口时退出应用 (Windows & Linux)

在Windows和Linux上，关闭所有窗口通常会完全退出一个应用程序。

为了实现这一点，你需要监听 `app` 模块的 ['window-all-closed'](http://www.electronjs.org/zh/docs/latest/api/app#event-window-all-closed "'window-all-closed'") 事件。如果用户不是在 macOS(`darwin`) 上运行程序，则调用 [app.quit()](http://www.electronjs.org/zh/docs/latest/api/app#appquit "app.quit()")。

```typescript 
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

```


#### 如果没有窗口打开则打开一个窗口 (macOS)

当 Linux 和 Windows 应用在没有窗口打开时退出了，macOS 应用通常即使在没有打开任何窗口的情况下也继续运行，并且在没有窗口可用的情况下激活应用时会打开新的窗口。

为了实现这一特性，监听 `app` 模块的 [activate](http://www.electronjs.org/zh/docs/latest/api/app#event-activate-macos "activate") 事件。如果没有任何浏览器窗口是打开的，则调用 `createWindow()` 方法。

因为窗口无法在 `ready` 事件前创建，你应当在你的应用初始化后仅监听 `activate` 事件。 通过在您现有的 `whenReady()` 回调中附上您的事件监听器来完成这个操作。

```typescript 
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
```


### 通过预加载脚本从渲染器访问Node.js

在主进程通过Node的全局 `process` 对象访问这个信息是微不足道的。 然而，你不能直接在主进程中编辑DOM，因为它无法访问渲染器 **`文档`**\*\* 上下文。 它们存在于完全不同的进程！\*\* ​

> 注意：如果您需要更深入地了解Electron进程，请参阅 [进程模型](http://www.electronjs.org/zh/docs/latest/tutorial/process-model "进程模型") 文档。

这是将 **预加载** 脚本连接到渲染器时派上用场的地方。 **预加载脚本在渲染器进程加载之前加载，并有权访问两个 渲染器全局 (例如 ****`window`**** 和 ****`document`****) 和 Node.js 环境。**

创建一个名为 `preload.js` 的新脚本如下：

```typescript 
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```


要将此脚本附加到渲染器流程，请在你现有的 `BrowserWindow` 构造器中将路径中的预加载脚本传入 `webPreferences.preload` 选项。

```typescript 
// include the Node.js 'path' module at the top of your file
const path = require('path')

// modify your existing createWindow() function
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}
// ...
```


[流程模型](IT/前端平台/Electron/文档/快速入门/流程模型/流程模型.md "流程模型")
