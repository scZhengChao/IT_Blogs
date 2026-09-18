# 3. 上下文隔离

> INFO
> 此建议是 Electron 自 12.0.0 以来的默认行为。

上下文隔离是`Electron`的一个特性，它允许开发者在预加载脚本里运行代码，里面包含Electron API和专用的JavaScript上下文。 实际上，这意味全局对象如 `Array.prototype.push` 或 JSON.parse等无法**被渲染进程里的运行脚本修改。**

`Electron`使用了和`Chromium`相同的[Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment "Content Scripts")技术来开启这个行为。

即便使用了 `nodeIntegration: false`, 要实现真正的强隔离并且防止使用 Node.js 的功能， `contextIsolation` **也 必须 开启.**

> INFO
> 获取关于`contextIsolation`是什么以及如何使用的更多信息，请参阅我**们的**[**上下文隔离**](https://www.electronjs.org/zh/docs/latest/tutorial/context-isolation "上下文隔离")**文档**
