# 和node的关系

尽管你需要在本地安装 Node.js 来搭建 Electron 项目，**但 Electron 不会使用系统的 Node.js 安装来运行其代码**。相反，它与自己的 Node.js 运行时打包在一起。这意味着你的终端用户不需要自己安装 Node.js 作为运行你的应用的先决条件。

要检查你的应用中正在运行哪个版本的 Node.js，你可以在**主进程或预加载脚本**中访问全局[process.versions](https://nodejs.cn/api/process.html#processversions "process.versions")变量。你也可以参考[https://releases.electronjs.org/releases.json](https://releases.electronjs.org/releases.json "https://releases.electronjs.org/releases.json")。
