# 使用

## 目录

- [ndb 出现的背景](#ndb-出现的背景)
- [探索ndb](#探索ndb)
  - [如何安装](#如何安装)
  - [启动ndb](#启动ndb)
    - [1️⃣ - 直接执行文件](#1️⃣---直接执行文件)
    - [2️⃣ -运行一个二进制可执行文件](#2️⃣--运行一个二进制可执行文件)
    - [3️⃣ - 运行一个项目](#3️⃣---运行一个项目)
  - [放置断点](#放置断点)
  - [处理文件](#处理文件)
  - [运行 npm 脚本](#运行-npm-脚本)
  - [内置终端](#内置终端)
  - [Blackboxing](#Blackboxing)
  - [进程面板](#进程面板)
  - [代码片段](#代码片段)
  - [变量访问](#变量访问)

[   https://juejin.cn/post/6844903686867533831?searchId=202504181713518EA1FF66E4A2CA2286E4](https://juejin.cn/post/6844903686867533831?searchId=202504181713518EA1FF66E4A2CA2286E4 "   https://juejin.cn/post/6844903686867533831?searchId=202504181713518EA1FF66E4A2CA2286E4")

## ndb 出现的背景

首先附上 ndb 的官方定义：

> ndb is an improved debugging experience for Node.js, enabled by Chrome DevTools &#x20;
> （ndb 是一次对 node 调试体验的升级，Chrome DevTools 原生支持 ndb）

从上面的定义中，我们可以发现：

1. ndb 能够提升调试体验
2. Chrome DevTools 原生支持 ndb，意味着它使用的是 Chrome 的调试协议，类似于 V8 Inspector
3. ndb是谷歌 Chrome 实验室维护的

因此，你可能认为 ndb 只是提供了一个升级版的 V8 Inspector ，然而事实并非如此。

我们可以发现，使用 V8 Inspector 和 Chrome DevTools 有两个前提：**一是 node 版本要大于 6.3.0，另一个是必须要用 Chrome 或者 Chromium 内核的浏览器**。如果我们不满足这两个条件或者想在非 Chromium 内核下调试的话怎么办呢？

前面我们没说到 ndb 的使用依赖什么环境，它依赖一个叫做`Puppeteer`的包，Puppeteer 是一个通过 Chrome DevTools 协议来控制 Chromium 的包，它提供了很多封装好的接口。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/10/2/16632f33a6389b49~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

当 ndb 安装了 Puppeteer 之后，一个最新的与当前环境兼容的 Chromium 也被安装到了依赖包里。

因为是独立安装的，**所以 ndb 不依赖操作系统的浏览器，这种对浏览器不依赖的特性也成为了 ndb 的一个优势。**

但它同时也带来一个问题，那就是 node\_modules 会比较大，毕竟里面有一个 Chromium。

那么 ndb 在调试上的体验如何呢？

## 探索ndb

第一步我们先用 express 建一个 node 应用 demo：

```javascript 

// app.js
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.info('Example app listening on port 3000!'));



```


再在 package.json 定义一个运行脚本：

```json 

"scripts": {
  "start": "node app.js"
}


```


### 如何安装

首先我们在全局环境或者本地安装 ndb。

```bash 
npm install -g ndb

```


### 启动ndb

我们有好几种方法启动 ndb：

#### 1️⃣ - 直接执行文件

我们可以通过直接用 ndb 命令执行一个文件来开启 ndb，如：

```javascript 

ndb app.js



```


#### 2️⃣ -运行一个二进制可执行文件

有时候我们想要用 ndb 来调试一些可执行二进制文件启动的服务，如 npm 脚本、webpack、单元测试这些。

只需要执行如下命令：

```text 

ndb npm start


```


上面我们用 ndb 运行了一个 npm 脚本，同样的，只要配置妥当我们还可以运行 ndb webpack 或 ndb mocha 等命令

#### 3️⃣ - 运行一个项目

**如果我们只是需要打开一个 ndb 服务，可以直接在项目目录里面执行**\*\*`ndb .`\*\***来打开，这个命令允许我们在执行脚本之前设置断点、编辑文件或其他任何东西。**

### 放置断点

在调试的时候放置断点非常简单

我们可以在模块被实际加载之前就放置断点

### 处理文件

使用 Chrome DevTools，我们可以在项目中创建和编辑文件，并将它们保存

### 运行 npm 脚本

如果项目中包含一些 npm 脚本，可以通过 ndb 的面板中运行

### 内置终端

通过 ndb 也可以直接访问终端

### Blackboxing

在默认情况下，ndb 会屏蔽一些外部文件，如 node 内置库，我们调试的时候对这些外部文件并不需要关心

### 进程面板

这个面板会列出当前由 ndb 启动的所有 node 进程。此外，子进程会收拢到它的父进程中，方便管理和终止

### 代码片段

ndb 支持创建一些代码片段来执行和调试

### 变量访问

当前进程变量和 node 的全局变量，ndb 都可以访问到
