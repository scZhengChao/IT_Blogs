# 通过预加载脚本从渲染器访问Node.js

现在，最后要做的是输出Electron的版本号和它的依赖项到你的web页面上。

在主进程通过Node的全局 `process` 对象访问这个信息是微不足道的。 然而，你不能直接在主进程中编辑DOM，因为它无法访问渲染器 `文档` 上下文。 它们存在于完全不同的进程！

> 注意：如果您需要更深入地了解Electron进程，请参阅 [进程模型](https://www.electronjs.org/zh/docs/latest/tutorial/process-model "进程模型") 文档。

这是将 **预加载** 脚本连接到渲染器时派上用场的地方。 **预加载脚本在渲染器进程加载之前加载**，**并有权访问两个 渲染器全局** (例如 `window` 和 `document`) 和 Node.js 环境。

创建一个名为 `preload.js` 的新脚本如下：

```javascript 
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


上面的代码访问 Node.js `process.versions` 对象，并运行一个基本的 `replaceText` 辅助函数将版本号插入到 HTML 文档中。

要将此脚本附加到渲染器流程，请在你现有的 `BrowserWindow` **构造器中将路径中的预加载脚本传入** `webPreferences.preload` 选项。

```javascript 
const { app, BrowserWindow } = require('electron')
// 在你文件顶部导入 Node.js 的 path 模块
const path = require('node:path')

// 修改已有的 createWindow() 方法
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


这里使用了两个Node.js概念：

- [\_\_dirname](https://nodejs.org/api/modules.html#modules_dirname "__dirname") 字符串指向当前正在执行脚本的路径 (在本例中，它指向你的项目的根文件夹)。
- [path.join](https://nodejs.org/api/path.html#path_path_join_paths "path.join") API 将多个路径联结在一起，创建一个跨平台的路径字符串。

我们使用一个**相对当前正在执行JavaScript文件的路径**，这样您的相对路径将在**开发模式和打包模式中都将有效**。
