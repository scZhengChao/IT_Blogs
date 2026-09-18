# 使用globalShortcut注册全局快捷键

`globalShortcut` 是 `Electron` 提供的模块之一，用于注册和响应全局键盘快捷键。这允许你在你的 `Electron` 应用程序中创建全局快捷键，以执行特定操作或触发事件。以下是一些常用的 `globalShortcut` 模块方法

`globalShortcut.register(accelerator, callback)`注册全局快捷键。

1. `accelerator`：字符串，表示要注册的快捷键，如 "CmdOrCtrl+X"。
2. `callback`：当快捷键被触发时要执行的回调函数。

```javascript 
const { globalShortcut } = require('electron');

globalShortcut.register('CmdOrCtrl+X', () => {
  // 执行某些操作
});

```


`globalShortcut.isRegistered(accelerator)`检查是否已经注册了指定的全局快捷键。
`accelerator`：要检查的快捷键。

```javascript 
const { globalShortcut } = require('electron');

const isRegistered = globalShortcut.isRegistered('CmdOrCtrl+X');
if (isRegistered) {
  console.log('已注册');
} else {
  console.log('未注册');
}

```


`globalShortcut.unregister(accelerator)`注销已注册的全局快捷键。
`accelerator`：要注销的快捷键。

```javascript 
const { globalShortcut } = require('electron');

globalShortcut.unregister('CmdOrCtrl+X');

```


`globalShortcut.unregisterAll()`注销所有已注册的全局快捷键

```javascript 
const { globalShortcut } = require('electron');

globalShortcut.unregisterAll();

```


`globalShortcut.getRegisteredKeys()`获取当前已注册的全局快捷键的列表。

```javascript 
const { globalShortcut } = require('electron');

const registeredKeys = globalShortcut.getRegisteredKeys();
console.log(registeredKeys);

```
