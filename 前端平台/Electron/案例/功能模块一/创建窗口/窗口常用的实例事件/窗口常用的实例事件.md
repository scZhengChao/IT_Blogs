# 窗口常用的实例事件

窗口有很多实例事件，使用`window.on来监听，可以在这些事件触发时做一切操作`例如下面是一些常用的实例事件：
`close
`触发时机：窗口即将关闭时触发，但实际关闭前。
作用：允许执行一些在窗口关闭前的清理操作，或者阻止窗口关闭。
`closed
`触发时机：窗口已经关闭时触发。
作用：通常用于释放资源或执行一些在窗口关闭后的最终操作。
`resize
`触发时机：窗口大小发生变化时触发。
作用：允许在窗口大小变化时执行一些操作。
`move
`触发时机：窗口位置发生变化时触发。
作用：允许在窗口位置变化时执行一些操作。
`focus
`触发时机：窗口获得焦点时触发。
作用：允许在窗口获得焦点时执行一些操作。
`blur
`触发时机：窗口失去焦点时触发。
作用：允许在窗口失去焦点时执行一些操作。
`minimize
`触发时机：窗口被最小化时触发。
作用：允许在窗口最小化时执行一些操作。
`maximize
`触发时机：窗口被最大化时触发。
作用：允许在窗口最大化时执行一些操作。
`unmaximize
`触发时机：窗口从最大化状态恢复时触发。
作用：允许在窗口从最大化状态恢复时执行一些操作。
`ready-to-show
`触发时机：当窗口完成初始化并且准备好显示时触发。
作用：允许在窗口已准备好显示之后执行一些操作。这通常在窗口加载内容后并准备好显示时触发，用于控制窗口的显示时机。
`show
`触发时机：当窗口被显示时触发。
作用：允许在窗口显示时执行一些操作。
`hide
`触发时机：当窗口被隐藏时触发。
作用：允许在窗口隐藏时执行一些操作。
`enter-full-screen
`触发时机：当窗口进入全屏模式时触发。
作用：允许在窗口进入全屏模式时执行一些操作。
`leave-full-screen
`触发时机：当窗口离开全屏模式时触发。
作用：允许在窗口离开全屏模式时执行一些操作。

```javascript 
// main.js

const { app, BrowserWindow } = require('electron');
let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // 加载你的 HTML 文件
  mainWindow.loadFile('index.html');

  // 事件: 关闭
  mainWindow.on('close', (event) => {
    // 允许或阻止窗口关闭
    // event.preventDefault();
    // 执行清理操作
  });

  // 事件: 关闭后
  mainWindow.on('closed', () => {
    // 释放资源或执行最终操作
    mainWindow = null;
  });

  // 事件: 调整大小
  mainWindow.on('resize', () => {
    // 在窗口调整大小时执行操作
  });

  // 事件: 移动
  mainWindow.on('move', () => {
    // 在窗口移动时执行操作
  });

  // 事件: 获得焦点
  mainWindow.on('focus', () => {
    // 在窗口获得焦点时执行操作
  });

  // 事件: 失去焦点
  mainWindow.on('blur', () => {
    // 在窗口失去焦点时执行操作
  });

  // 事件: 最小化
  mainWindow.on('minimize', () => {
    // 在窗口最小化时执行操作
  });

  // 事件: 最大化
  mainWindow.on('maximize', () => {
    // 在窗口最大化时执行操作
  });

  // 事件: 还原
  mainWindow.on('unmaximize', () => {
    // 在窗口从最大化状态还原时执行操作
  });

  // 事件: 准备好显示
  mainWindow.on('ready-to-show', () => {
    // 在窗口准备好显示后执行操作
    mainWindow.show();
  });

  // 事件: 显示
  mainWindow.on('show', () => {
    // 在窗口显示时执行操作
  });

  // 事件: 隐藏
  mainWindow.on('hide', () => {
    // 在窗口隐藏时执行操作
  });

  // 事件: 进入全屏模式
  mainWindow.on('enter-full-screen', () => {
    // 在窗口进入全屏模式时执行操作
  });

  // 事件: 离开全屏模式
  mainWindow.on('leave-full-screen', () => {
    // 在窗口离开全屏模式时执行操作
  });
}

```
