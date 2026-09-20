# 问题

## 目录

- [node版本](#node版本)
- [Puppeteer没有自动安装Chromium的解决办法](#Puppeteer没有自动安装Chromium的解决办法)
- [安装 Puppeteer 时跳过 Chromium 下载](#安装-Puppeteer-时跳过-Chromium-下载)
- [配置](#配置)
- [路径不对](#路径不对)

# node版本

支持的版本Node版本 **>= v16.20.0**

# Puppeteer没有自动安装Chromium的解决办法

按照官方文档的说法，安装 Puppeteer 时会自动安装 Chromium 浏览器。但是实际安装过程中，会出现不安装 Chromium 的情况，这时需要使用下面的命令来手动安装 Chromium：

```javascript 
node node_modules/puppeteer/install.js

```


这样就能把 Chromium 正确的安装到 node\_modules/puppeteer/.local-chromium 目录下。根据操作系统及浏览器版本的不同，浏览器大概占用 200M～400M 的磁盘空间。

# 安装 Puppeteer 时跳过 Chromium 下载

由于 Chromium 体积过大（>100M），有时候本地已经安装了Chromium，在后续升级 Puppeteer 时，不需要重新下载Chromium，这时候需要跳过 Chromium 的下载。

```javascript 
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD
```


跳过的方法是：

[ 安装 Puppeteer 时跳过 Chromium 下载 | 自由行 安装 Puppeteer 时跳过 Chromium 下载 https://www.lfhacks.com/tech/puppeteer-skip-download-chromium/](https://www.lfhacks.com/tech/puppeteer-skip-download-chromium/ " 安装 Puppeteer 时跳过 Chromium 下载 | 自由行 安装 Puppeteer 时跳过 Chromium 下载 https://www.lfhacks.com/tech/puppeteer-skip-download-chromium/")

# 配置

[   https://pptr.nodejs.cn/guides/configuration#configuration-files](https://pptr.nodejs.cn/guides/configuration#configuration-files "   https://pptr.nodejs.cn/guides/configuration#configuration-files")

# 路径不对

```javascript 
const puppeteer = require("puppeteer-core");
const browser = await puppeteer.launch({
   executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // [本地路径]
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
