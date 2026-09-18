# @hurdlegroup/robotjs

## 目录

- [robotjs](#robotjs)
- [@hurdlegroup/robotjs](#hurdlegrouprobotjs)
  - [Mouse](#Mouse)
  - [Keyboard](#Keyboard)
  - [Screen](#Screen)
- [安装](#安装)
- [同时输入多个按键](#同时输入多个按键)

# robotjs

> 原来的robotjs；mac安装编译太难了

[ Could not detect abi for version 22.3.3 and runtime electron. Updating "node-abi" might help solve this issue if it is a new release of electron at getAbi · Issue #1073 · electron/rebuild · GitHub Hi, I'm using electron-builder v24.0.0 which uses electron-rebuild to rebuild the native dependencies (electron-userland/electron-builder#7196) The generated app worked fine as I see (there are no exc https://github.com/electron/rebuild/issues/1073](https://github.com/electron/rebuild/issues/1073 " Could not detect abi for version 22.3.3 and runtime electron. Updating \"node-abi\" might help solve this issue if it is a new release of electron at getAbi · Issue #1073 · electron/rebuild · GitHub Hi, I'm using electron-builder v24.0.0 which uses electron-rebuild to rebuild the native dependencies (electron-userland/electron-builder#7196) The generated app worked fine as I see (there are no exc https://github.com/electron/rebuild/issues/1073")

[   https://github.com/octalmage/robotjs](https://github.com/octalmage/robotjs "   https://github.com/octalmage/robotjs")

> 代替方案

# @hurdlegroup/robotjs

[ GitHub - hurdlegroup/robotjs: Node.js Desktop Automation. Node.js Desktop Automation. . Contribute to hurdlegroup/robotjs development by creating an account on GitHub. https://github.com/hurdlegroup/robotjs](https://github.com/hurdlegroup/robotjs " GitHub - hurdlegroup/robotjs: Node.js Desktop Automation. Node.js Desktop Automation. . Contribute to hurdlegroup/robotjs development by creating an account on GitHub. https://github.com/hurdlegroup/robotjs")

```bash 
npm install @hurdlegroup/robotjs
```


[robotjs-master.zip](robotjs-master_rQYdXIlq5D.zip "robotjs-master.zip")

> 经常会下载失败；请用 —ignore-scripts 配置

> electron + @hurdlegroup/robotjs.   + 声网 rtm

[ electron-agora: electron-agora electron-agora https://gitee.com/changtuizhengchao/electron-agora](https://gitee.com/changtuizhengchao/electron-agora " electron-agora: electron-agora electron-agora https://gitee.com/changtuizhengchao/electron-agora")

##### [Mouse](https://github.com/hurdlegroup/robotjs/wiki/Syntax#mouse "Mouse")

```javascript 
// Move the mouse across the screen as a sine wave.
var robot = require("@hurdlegroup/robotjs");

// Speed up the mouse.
robot.setMouseDelay(2);

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;

for (var x = 0; x < width; x++)
{
  y = height * Math.sin((twoPI * x) / width) + height;
  robot.moveMouse(x, y);
}
```


##### [Keyboard](https://github.com/hurdlegroup/robotjs/wiki/Syntax#keyboard "Keyboard")

```javascript 
// Type "Hello World" then press enter.
var robot = require("@hurdlegroup/robotjs");

// Type "Hello World".
robot.typeString("Hello World");

// Press enter.
robot.keyTap("enter");
```


##### [Screen](https://github.com/hurdlegroup/robotjs/wiki/Syntax#screen "Screen")

```javascript 
// Get pixel color under the mouse.
var robot = require("@hurdlegroup/robotjs");

// Get mouse position.
var mouse = robot.getMousePos();

// Get pixel color in hex format.
var hex = robot.getPixelColor(mouse.x, mouse.y);
console.log("#" + hex + " at x:" + mouse.x + " y:" + mouse.y);
```


# 安装

```bash 
npm install @hurdlegroup/robotjs --ignore-scripts
```


# 同时输入多个按键

在robotjs中，我们可以使用robot.keyTap()方法来模拟键盘按键的操作。该方法接受两个参数：**键盘按键的名称和可选的修饰键（** 如Ctrl、Shift等）。下面是一个示例代码，演示了同时按下Ctrl和S键保存文件的操作。

```javascript 
const robot = require('robotjs');

// 按下Ctrl和S键
robot.keyTap('s', ['control']);
```
