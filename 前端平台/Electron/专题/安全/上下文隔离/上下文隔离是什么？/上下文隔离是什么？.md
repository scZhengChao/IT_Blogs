# 上下文隔离是什么？

上下文隔离功能将确保您的 `预加载`脚本 和 `Electron`的内部逻辑 运行在所加载的 [webcontent](https://www.electronjs.org/zh/docs/latest/api/web-contents "webcontent")网页 **之外的另一个独立的上下文环境**里。 这对安全性很重要，因为它有助于**阻止网站访问** **`Electron`**\*\* 的内部组件 和 您的预加载脚本可访问的高等级权限的API 。\*\* ​

这意味着，实际上，您的预加载脚本访问的 `window` 对象**并不是**网站所能访问的对象。 例如，如果您在预加载脚本中设置 `window.hello = 'wave'` 并且**启用了上下文隔离**，当网站尝试访问`window.hello`对象时将返回 undefined。

自 Electron 12 以来，默认情况下已启用上下文隔离，并且它是 所有应用程序推荐的安全设置。
