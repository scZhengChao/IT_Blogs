# robotjs 远程控制

## 目录

- [robotjs](#robotjs)

```markdown 
setKeyboardDelay(ms: number)：设置键盘输入的延迟时间，即按下按键后与释放按键之间的时间间隔。

keyTap(key: string, modifier?: string | string[])：模拟按下并释放指定的键，可以选择性地指定修饰键。

keyToggle(key: string, down: string, modifier?: string | string[])：模拟按下或释放指定的键，可以选择性地指定修饰键。

typeString(string: string)：模拟键盘输入字符串，将字符串逐个字符模拟为键盘输入。

typeStringDelayed(string: string, cpm: number)：以指定的字符每分钟速度模拟键盘输入字符串。

setMouseDelay(delay: number)：设置鼠标操作的延迟时间，即鼠标移动或点击操作之间的时间间隔。

updateScreenMetrics()：更新屏幕的度量信息，用于确保鼠标和键盘操作的准确性。

moveMouse(x: number, y: number)：将鼠标移动到指定的屏幕坐标位置。

moveMouseSmooth(x: number, y: number, speed?: number)：平滑地将鼠标移动到指定的屏幕坐标位置，可以指定移动速度。

mouseClick(button?: string, double?: boolean)：模拟鼠标点击操作，可以指定点击的按钮和是否双击。

mouseToggle(down?: string, button?: string)：模拟鼠标按下或释放操作，可以指定按下或释放的按钮。

dragMouse(x: number, y: number)：模拟鼠标拖动操作，将鼠标从当前位置拖动到指定的位置。

scrollMouse(x: number, y: number)：模拟鼠标滚动操作，将鼠标滚轮向上或向下滚动指定的距离。

getMousePos()：获取当前鼠标的屏幕坐标位置。

getPixelColor(x: number, y: number)：获取屏幕上指定位置的像素颜色。

getScreenSize()：获取屏幕的尺寸信息，包括宽度和高度。
```


# robotjs

> 注意报错：需要python\@2.7； 高版本比如3.x 是不支持的；(这个坑我踩了好久；mac和brew 两个版本的有问题；找的不一样；可能同时存在两个版本；写在homebrew 上面的3.x的版本；环境变量是2.7x的；但是robotjs找的是homebrew上的3.12版本的)

> **robotjs只能在主进程中运行，所以robotjs代码在主进程通过ipc的方法，让渲染进程调用主进程去做软件控制(键盘和鼠标)**

> 掘金

[   https://juejin.cn/post/6940539888198483998](https://juejin.cn/post/6940539888198483998 "   https://juejin.cn/post/6940539888198483998")

> npm

[ robotjs - npmGitDownloads Node.js Desktop Automation.. Latest version: 0.6.0, last published: 5 years ago. Start using robotjs in your project by running \`npm i robotjs\`. There are 193 other projects in the npm registry using  https://www.npmjs.com/package/robotjs](https://www.npmjs.com/package/robotjs " robotjs - npmGitDownloads Node.js Desktop Automation.. Latest version: 0.6.0, last published: 5 years ago. Start using robotjs in your project by running `npm i robotjs`. There are 193 other projects in the npm registry using  https://www.npmjs.com/package/robotjs")

> gitee

[ robotjs: RobotJS 是一个 Node.js 的 GUI 自动化工具，可用来控制鼠标、键盘和读取屏幕 RobotJS 是一个 Node.js 的 GUI 自动化工具，可用来控制鼠标、键盘和读取屏幕 https://gitee.com/mirrors/robotjs](https://gitee.com/mirrors/robotjs " robotjs: RobotJS 是一个 Node.js 的 GUI 自动化工具，可用来控制鼠标、键盘和读取屏幕 RobotJS 是一个 Node.js 的 GUI 自动化工具，可用来控制鼠标、键盘和读取屏幕 https://gitee.com/mirrors/robotjs")

> 文档

[ RobotJS - Node.js Desktop Automation Node.js Cross Platform Desktop Automation. Control the mouse, keyboard, and read the screen. https://robotjs.io/](https://robotjs.io/ " RobotJS - Node.js Desktop Automation Node.js Cross Platform Desktop Automation. Control the mouse, keyboard, and read the screen. https://robotjs.io/")

> electron  + robotjs 中遇到的坑

[   https://juejin.cn/post/7175070301326147639](https://juejin.cn/post/7175070301326147639 "   https://juejin.cn/post/7175070301326147639")

> electron 构建

[ Electron - RobotJS Node.js Cross Platform Desktop Automation. Control the mouse, keyboard, and read the screen. https://robotjs.io/docs/electron](https://robotjs.io/docs/electron " Electron - RobotJS Node.js Cross Platform Desktop Automation. Control the mouse, keyboard, and read the screen. https://robotjs.io/docs/electron")

> 如果遇到问题；可能和python 有关

[ Python 如何在 NPM 安装过程中使用不同版本的 Python|极客教程 Python 如何在 NPM 安装过程中使用不同版本的 Python  在本文中，我们将介绍如何在 NPM 安装过程中使用不同版本的 Python。NPM 是一个流行的包管理器，用于在 Node.js 项目中安装和管理依赖。然而，有时候我们可能需要使用不同版本的 Python 来构建项目或运行依赖项，这就需要在 NPM 安装过程中切换 Python 版本。  阅读更多：Python 教程  Pyt https://geek-docs.com/python/python-ask-answer/6\_python\_how\_to\_use\_a\_different\_version\_of\_python\_during\_npm\_install.html#:\~:text=%E5%9C%A8.npmrc%20%E6%96%87%E4%BB%B6%E4%B8%AD%E6%B7%BB%E5%8A%A0%E4%BB%A5%E4%B8%8B%E5%86%85%E5%AE%B9%EF%BC%9A%20python%253D%252Fpath%252Fto%252Fproject%252F.python-version%20%E5%85%B6%E4%B8%AD%EF%BC%8C%20%252Fpath%252Fto%252Fproject%252F,%E6%98%AF%E9%A1%B9%E7%9B%AE%E7%9A%84%E6%A0%B9%E7%9B%AE%E5%BD%95%E8%B7%AF%E5%BE%84%E3%80%82%20%E4%BF%9D%E5%AD%98%E6%96%87%E4%BB%B6%E5%90%8E%EF%BC%8CNPM%20%E5%9C%A8%E5%AE%89%E8%A3%85%E4%BE%9D%E8%B5%96%E6%97%B6%E5%B0%86%E4%BC%9A%E4%BD%BF%E7%94%A8%E6%8C%87%E5%AE%9A%E7%9A%84%20Python%20%E7%89%88%E6%9C%AC%E3%80%82](https://geek-docs.com/python/python-ask-answer/6_python_how_to_use_a_different_version_of_python_during_npm_install.html#:~:text=%E5%9C%A8.npmrc%20%E6%96%87%E4%BB%B6%E4%B8%AD%E6%B7%BB%E5%8A%A0%E4%BB%A5%E4%B8%8B%E5%86%85%E5%AE%B9%EF%BC%9A%20python%253D%252Fpath%252Fto%252Fproject%252F.python-version%20%E5%85%B6%E4%B8%AD%EF%BC%8C%20%252Fpath%252Fto%252Fproject%252F,%E6%98%AF%E9%A1%B9%E7%9B%AE%E7%9A%84%E6%A0%B9%E7%9B%AE%E5%BD%95%E8%B7%AF%E5%BE%84%E3%80%82%20%E4%BF%9D%E5%AD%98%E6%96%87%E4%BB%B6%E5%90%8E%EF%BC%8CNPM%20%E5%9C%A8%E5%AE%89%E8%A3%85%E4%BE%9D%E8%B5%96%E6%97%B6%E5%B0%86%E4%BC%9A%E4%BD%BF%E7%94%A8%E6%8C%87%E5%AE%9A%E7%9A%84%20Python%20%E7%89%88%E6%9C%AC%E3%80%82 " Python 如何在 NPM 安装过程中使用不同版本的 Python|极客教程 Python 如何在 NPM 安装过程中使用不同版本的 Python  在本文中，我们将介绍如何在 NPM 安装过程中使用不同版本的 Python。NPM 是一个流行的包管理器，用于在 Node.js 项目中安装和管理依赖。然而，有时候我们可能需要使用不同版本的 Python 来构建项目或运行依赖项，这就需要在 NPM 安装过程中切换 Python 版本。  阅读更多：Python 教程  Pyt https://geek-docs.com/python/python-ask-answer/6_python_how_to_use_a_different_version_of_python_during_npm_install.html#:~:text=%E5%9C%A8.npmrc%20%E6%96%87%E4%BB%B6%E4%B8%AD%E6%B7%BB%E5%8A%A0%E4%BB%A5%E4%B8%8B%E5%86%85%E5%AE%B9%EF%BC%9A%20python%253D%252Fpath%252Fto%252Fproject%252F.python-version%20%E5%85%B6%E4%B8%AD%EF%BC%8C%20%252Fpath%252Fto%252Fproject%252F,%E6%98%AF%E9%A1%B9%E7%9B%AE%E7%9A%84%E6%A0%B9%E7%9B%AE%E5%BD%95%E8%B7%AF%E5%BE%84%E3%80%82%20%E4%BF%9D%E5%AD%98%E6%96%87%E4%BB%B6%E5%90%8E%EF%BC%8CNPM%20%E5%9C%A8%E5%AE%89%E8%A3%85%E4%BE%9D%E8%B5%96%E6%97%B6%E5%B0%86%E4%BC%9A%E4%BD%BF%E7%94%A8%E6%8C%87%E5%AE%9A%E7%9A%84%20Python%20%E7%89%88%E6%9C%AC%E3%80%82")

```javascript 
node-gyp rebuild --runtime=electron --target=28.2.0 --disturl=https://atom.io/download/atom-shell --abi=119
```


[@hurdlegroup/robotjs](./@hurdlegroup-robotjs/index.md "@hurdlegroup/robotjs")

[常见陷阱](./常见陷阱/index.md "常见陷阱")

[electron 详细使用robotjs 的详细安装编译 步骤](<./robotjs安装编译/index.md> "electron 详细使用robotjs 的详细安装编译 步骤")

[傀儡端：键盘操作](./傀儡端：键盘操作/index.md "傀儡端：键盘操作")

[傀儡端：鼠标操作](./傀儡端：鼠标操作/index.md "傀儡端：鼠标操作")

[控制端监控](./控制端监控/index.md "控制端监控")
