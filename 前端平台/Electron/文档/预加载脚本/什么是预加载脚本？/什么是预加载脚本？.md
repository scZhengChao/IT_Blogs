# 什么是预加载脚本？

`Electron` 的**主进程**是一个拥有着**完全操作系统访问权限**的 `Node.js` 环境。 除了 [Electron 模组](https://www.electronjs.org/zh/docs/latest/api/app "Electron 模组") 之外，您也可以访问 [Node.js 内置模块](https://nodejs.org/dist/latest/docs/api/ "Node.js 内置模块") 和**所有通过 npm 安装**的包。 另一方面，出于安全原因，**渲染进程默认跑在网页页面上，而并非 Node.js里**。

为了将 `Electron` 的不同类型**的进程桥接在一起**，我们需要使用被称为 **预加载** 的特殊脚本。
