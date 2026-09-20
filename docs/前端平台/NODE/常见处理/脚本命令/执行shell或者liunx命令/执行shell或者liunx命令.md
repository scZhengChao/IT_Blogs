# 执行shell或者liunx命令

## 目录

- [一、使用Node.js的child\_process模块](#一使用Nodejs的child_process模块)
  - [1、Exec](#1Exec)
  - [2、Spawn](#2Spawn)
  - [3、ExecFile](#3ExecFile)
  - [4、Fork](#4Fork)
- [二、通过Shell脚本](#二通过Shell脚本)
- [三、使用WebAssembly](#三使用WebAssembly)
  - [1、编写WebAssembly模块](#1编写WebAssembly模块)
  - [2、在JavaScript中调用WebAssembly模块](#2在JavaScript中调用WebAssembly模块)
- [四、使用第三方库](#四使用第三方库)
  - [1、ShellJS](#1ShellJS)
  - [2、Execa](#2Execa)
  - [spawn的跨平台实现](#spawn的跨平台实现)

**JavaScript可以通过多种方法调用Linux命令，包括使用Node.js的child\_process模块、通过Shell脚本以及使用WebAssembly等技术。以下是详细的方法和步骤：**

# 一、**使用Node.js的child\_process模块**

Node.js是一个强大的JavaScript运行环境，允许你在服务器端运行JavaScript代码。通过Node.js，你可以使用child\_process模块来调用Linux命令。**`child_process`****模块提供了四种方法：****`exec`****、****`execFile`****、****`spawn`****和****`fork`**。其中，`exec`和`spawn`最常用。以下是详细介绍：

### 1、Exec

Exec方法可以执行一个命令，**并将结果返回给一个回调函数。这是一个简单、直接的方法**，但它在处理大量数据时可能会出现内存问题。

```javascript 
const { exec } = require('child_process');

exec('ls -al', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});


```


### 2、Spawn

`Spawn`方法创建一个子进程来执行命令，并且可以流式处理数据。这在处理大量数据时更高效。

```javascript 
const { spawn } = require('child_process');
const ls = spawn('ls', ['-al']);
ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});
ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});
ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});


```


### 3、ExecFile

ExecFile方法用于执行可执行文件，而不是一个shell命令。这在需要更高安全性时特别有用。

```javascript 
const { execFile } = require('child_process');

execFile('/path/to/executable', (error, stdout, stderr) => {
    if (error) {
        console.error(`execFile error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});
```


### 4、Fork

Fork方法用于创建一个新的Node.js进程来执行脚本文件。**这在需要并行处理任务时特别有用。**

```javascript 
const { fork } = require('child_process');
const child = fork('script.js');

child.on('message', (message) => {
    console.log('Message from child', message);
});

child.send('Hello from parent');


```


# **二、通过Shell脚本**

JavaScript可以通过Node.js调用Shell脚本来执行Linux命令。以下是一个示例：

```javascript 
const { exec } = require('child_process');
exec('sh myscript.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});


```


在上面的示例中，`myscript.sh`是一个包含Linux命令的Shell脚本文件。

# **三、使用WebAssembly**

WebAssembly是一种允许在浏览器中运行低级二进制代码的技术。虽然这不是最常见的方法，但在某些特殊情况下可能会有用。

### 1、编写WebAssembly模块

首先，你需要使用`C/C++`或`Rust`编写一个可以调用`Linux`命令的`WebAssembly`模块。

### 2、在JavaScript中调用WebAssembly模块

然后，你可以在`JavaScript`中加载并调用这个`WebAssembly`模块。

```javascript 
const fs = require('fs');
const wasmBuffer = fs.readFileSync('module.wasm');
WebAssembly.instantiate(wasmBuffer).then(wasmModule => {
    // 调用WebAssembly模块中的函数
    wasmModule.instance.exports.myFunction();
});


```


# **四、使用第三方库**

除了`Node.js`内置的`child_process`模块外，还有许多第三方库可以帮助你在`JavaScript`中调用`Linux`命令。例如：

### 1、ShellJS

ShellJS是一个流行的库，提供了一组Unix shell命令的**跨平台实现。**

```javascript 
const shell = require('shelljs');

if (shell.exec('ls -al').code !== 0) {
    shell.echo('Error: Command failed');
    shell.exit(1);
}


```


### 2、Execa

Execa是另一个流行的库，它提供了一个Promise接口，适用于现代JavaScript应用。

```javascript 
const execa = require('execa');
(async () => {
    const { stdout } = await execa('ls', ['-al']);
    console.log(stdout);
})();
```


### spawn的跨平台实现

[cross-spawn](cross-spawn.md "cross-spawn")

[如何判断脚本是运行在 类 Unix 的 Shell 环境 还是powershell](<如何判断脚本是运行在 类 Unix 的 Shell 环境 还是powershell.md> "如何判断脚本是运行在 类 Unix 的 Shell 环境 还是powershell")
