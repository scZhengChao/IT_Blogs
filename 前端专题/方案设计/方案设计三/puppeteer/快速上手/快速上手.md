# 快速上手

## 目录

- [前言：](#前言)
- [puppeteer的简介](#puppeteer的简介)
- [环境搭建](#环境搭建)
- [Puppeteer的基础API](#Puppeteer的基础API)
  - [使用Headless模式](#使用Headless模式)
  - [使用Puppeteer-core](#使用Puppeteer-core)
  - [设置浏览器实例的其他命令行参数](#设置浏览器实例的其他命令行参数)
  - [设置浏览器视口分辨率](#设置浏览器视口分辨率)
  - [指定移动端设备访问](#指定移动端设备访问)
  - [其他](#其他)

# 前言：

众所周知在开发的过程中，数据一直是推动整个业务链条的重要一环，通过爬虫进行数据的爬取和更新也是日常的操作，目前支持爬虫的语言很多：Python、Java、Ruby 还有Nodejs ，也就是今天主角**Puppeteer，** 它是由 `Google Chrome` 官方团队维护以Node.js 为基础的开源工具，主要用于控制和自动化谷歌浏览器（Google Chrome）或其他兼容的浏览器操作。

废话不多说，下面让我们从浅到深一步一步带领大家走进爬虫的世界\~

# puppeteer的简介

`Puppeteer`是一个由`Google`开发的Node.js库，它提供了一套用于控制`headless Chrome`或`Chromium`浏览器的API。它可以模拟**用户在浏览器中的操作行为，如点击、填写表单、截图**等，同时还可以让**开发者获取到浏览器渲染后的HTML内容**。它提供了一套高级的 API，使得浏览器操作变得简单和可靠。主要包括：**自动化控制、页面操控、网络请求拦截、页面截图和 PDF 生成、自动化测试**等一系列操作

总而言之，Puppeteer 是一个功能强大、易用且灵活的浏览器自动化工具，能够帮助开发者完成各种浏览器操作和自动化任务。

# 环境搭建

puppeteer从**v1.7.0**开始支持两个包：[puppeteer](https://link.juejin.cn?target=https://www.npmjs.com/package/puppeteer "puppeteer")、[puppeteer-core](https://link.juejin.cn?target=https://www.npmjs.com/package/puppeteer-core "puppeteer-core")，

- **puppeteer：** 一个完整的包会下载一个可执行的Chromium浏览器。整个体积很大（适合本地调试）
- **puppeteer-core：** 不会下载一个可执行的Chromium浏览器、体积很小、配置的浏览器需要自己手动更新（适合部署在生产环境）

支持的版本Node版本 **>= v16.20.0**

```javascript 
npm i puppeteer or npm i puppeteer -g   // 最新版本:V21.7.0

```


# Puppeteer的基础API

## 使用Headless模式

Puppeteer默认启动的是无头模式进行开发， 可以通过`headless`进行配置关闭，本地调试建议开启，

```javascript 
const browser = await puppeteer.launch();
// Equivalent to
const browser = await puppeteer.launch({headless: false}); // 本地调试

```


需要注意的是[Chrome 112 推出了新的 Headless 模式，](https://link.juejin.cn/?target=https://developer.chrome.com/articles/new-headless/ "Chrome 112 推出了新的 Headless 模式，")可以通过新的参数调整

```javascript 
const browser = await puppeteer.launch({headless: 'new'});

```


## 使用Puppeteer-core

在生产环境部署的时候使用puppeteer-core要注意版本，目测在**v16.2.0** 这个版本是没问题 **，最新v21.7.0**在部署线上的时候有点问题

```javascript 
// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer-core");
const browser = await puppeteer.launch({
// executablePath: "/usr/bin/google-chrome", // 生产环境
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // [本地路径]
});
return browser;

```


关于**executablePath**如何可以访问：`chrome://version/` 「**可执行文件路径进行查看」**

## 设置浏览器实例的其他命令行参数

可以设置[args](https://link.juejin.cn?target=https://pptr.dev/api/puppeteer.browserlaunchargumentoptions "args")来执行当前运行的浏览器实例一些命令行加以限制，具体可以参考[Chromium命令行开关列表](https://link.juejin.cn?target=https://peter.sh/experiments/chromium-command-line-switches/ "Chromium命令行开关列表")

```javascript 
const puppeteer = require("puppeteer-core");
const browser = await puppeteer.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // [本地路径]
  args: [
    "--no-sandbox", // 使用沙盒模式
    "--disable-setuid-sandbox", // 禁用setuid沙盒（仅限Linux）
    "--disable-extensions", // 禁用扩展
    "--incognito", // 禁用GPU硬件加速
    "--disable-gpu", // 以隐身模式运行
    "--no-zygote", // 禁用 Zygote 进程模型，启动时不创建一个共享的子进程来提高性能。
  ],
});
return browser;


```


## 设置浏览器视口分辨率

可以通过**defaultViewport**进行PC端的设置默认的视口分辨率

```javascript 
const puppeteer = require("puppeteer-core");
const browser = await puppeteer.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // [本地路径]
  defaultViewport: {
    height: 1080,
    width: 1920,
  },
});
return browser;

```


## 指定移动端设备访问

```javascript 
const puppeteer = require("puppeteer");
const iPhone = puppeteer.devices["iPhone 6"];

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  await page.emulate(iPhone);
 
})();

```


## 其他

如果使用Docker部署可以[参考](https://link.juejin.cn/?target=https://pptr.dev/guides/docker "参考")相关资源
