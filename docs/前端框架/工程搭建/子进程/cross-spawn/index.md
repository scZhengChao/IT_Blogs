# cross-spawn

## 目录

- [一句话介绍](#一句话介绍)
- [使用方法](#使用方法)
- [1. 跨平台的子进程创建](#1-跨平台的子进程创建)
- [2. 外部命令执行](#2-外部命令执行)
- [3. 支持命令行参数和选项](#3-支持命令行参数和选项)
- [4. 控制台输出和错误处理](#4-控制台输出和错误处理)
- [5. 跨平台的信号处理](#5-跨平台的信号处理)
- [6.始终在shell 上执行](#6始终在shell-上执行)
- [shelljs ](#shelljs-)

[   https://juejin.cn/post/7310786437775261705](https://juejin.cn/post/7310786437775261705 "   https://juejin.cn/post/7310786437775261705")

#### 一句话介绍

在 Node 中，可以通过 `child_process` 模块来创建子进程，并且通过 `child_process.spawn` 方法来**使用指定的命令行参数创建新进程，**执行完之后返回执行结果。而 `cross-spawn` 包就是提供了**关于 ****`spawn`**** 函数的跨平台写法，不用开发者处理跨平台的逻辑**。

GitHub 地址：[https://github.com/moxystudio/node-cross-spawn](https://github.com/moxystudio/node-cross-spawn "https://github.com/moxystudio/node-cross-spawn")

#### 使用方法

用法和 `child_process.spawn(command[, args][, options])` 保持一致：

```typescript 
const spawn = require('cross-spawn');

// 安装全部依赖
spawn.sync('npm', ['install'], { stdio: 'inherit' });

// 安装指定依赖
spawn.sync('npm', ['install', 'lodash', '--save'], { stdio: 'inherit' });

```


#### 1. 跨平台的子进程创建

`cross-spawn` 可以在 Windows、Linux 和 macOS 等不同操作系统上创建子进程，确保你的代码在不同平台上都能正常工作。

```javascript 
const spawn = require('cross-spawn');

// 创建子进程并执行 'ls -l' 命令
const childProcess = spawn('ls', ['-l']);

// 监听子进程的 'close' 事件
childProcess.on('close', (code) => {
  console.log(`子进程退出，退出码：${code}`);
});

```


#### 2. 外部命令执行

你可以使用 `cross-spawn` 在 Node.js 中执行外部命令，就像在终端中直接键入命令一样。这对于需要在程序中调用第三方命令行工具或执行系统命令非常有用。

```javascript 
const spawn = require('cross-spawn');

// 创建子进程并执行 'npm install package-name' 命令
const childProcess = spawn('npm', ['install', 'package-name']);

// 监听子进程的 'close' 事件
childProcess.on('close', (code) => {
  console.log(`子进程退出，退出码：${code}`);
});

```


#### 3. 支持命令行参数和选项

`cross-spawn` 支持将命令行参数和选项传递给子进程，包括字符串参数、数组参数和对象参数。

```javascript 
const spawn = require('cross-spawn');

// 创建子进程并执行 'node script.js --arg1 value1 --arg2 value2' 命令
const childProcess = spawn('node', ['script.js', '--arg1', 'value1', '--arg2', 'value2']);

// 监听子进程的 'close' 事件
childProcess.on('close', (code) => {
  console.log(`子进程退出，退出码：${code}`);
});

```


#### 4. 控制台输出和错误处理

`cross-spawn` 提供了方便的方法来捕获子进程的标准输出和错误输出，并对其进行处理。你可以将输出重定向到文件、管道中或在控制台中显示。

```javascript 
const spawn = require('cross-spawn');

// 创建子进程并执行 'npm install package-name' 命令，将子进程的标准输出和错误输出重定向到父进程的控制台
const childProcess = spawn('npm', ['install', 'package-name'], { stdio: 'inherit' });

// 监听子进程的 'close' 事件
childProcess.on('close', (code) => {
  console.log(`子进程退出，退出码：${code}`);
});

```


#### 5. 跨平台的信号处理

`cross-spawn` 允许你在不同操作系统上正确处理进程信号，例如终止子进程或处理进程退出。

```javascript 
const spawn = require('cross-spawn');

// 创建子进程并执行 'node script.js' 命令
const childProcess = spawn('node', ['script.js']);

// 监听子进程的 'SIGINT' 信号
childProcess.on('SIGINT', () => {
  console.log('接收到 SIGINT 信号，终止子进程');
  childProcess.kill('SIGINT');
});

// 监听子进程的 'close' 事件
childProcess.on('close', (code) => {
  console.log(`子进程退出，退出码：${code}`);
});
childProcess.on('error', (code) => {
  console.log(`子进程退出，退出码：${code}`);
});

```


总的来说，`cross-spawn` 可以帮助你更轻松地在 Node.js 中创建子进程并执行命令，而无需担心跨平台兼容性问题。它是一个非常有用的工具，特别适用于需要与外部命令行工具进行交互或执行系统命令的场景。

### 6.始终在shell 上执行

类似的还有：

## [shelljs](https://www.npmjs.com/package/shelljs "shelljs")&#x20;

[ shelljs - zhangzongshan - 博客园 shelljs shelljs模块重新包装了child\_process,调用系统命令更加简单。shelljs是Unix Shell在Node.js API层的轻量级实现，可以支持Windows、Lin https://www.cnblogs.com/zzsdream/p/13503383.html](https://www.cnblogs.com/zzsdream/p/13503383.html " shelljs - zhangzongshan - 博客园 shelljs shelljs模块重新包装了child_process,调用系统命令更加简单。shelljs是Unix Shell在Node.js API层的轻量级实现，可以支持Windows、Lin https://www.cnblogs.com/zzsdream/p/13503383.html")
