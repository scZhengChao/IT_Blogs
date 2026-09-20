# 隔离不受信任的内容

每当你从不被信任的来源(如一个远程服务器)获取代码并在本地执行，其中就存在安全性问题。 例如在默认的 [BrowserWindow](https://www.electronjs.org/zh/docs/latest/api/browser-window "BrowserWindow")中显示一个远程网站. 如果攻击者以某种方式设法改变所述内容 (通过**直接攻击源**或者**通过在应用和实际目的地之间进行攻击**) ，他们将能够在用户的机器上执行本地代码。

:::警告

无论如何，在启用`Node.js`集成的情况下，你**都不该加载并执行远程代码**。 相反，只使用**本地文件**(和您的应用打包在一起)来执行Node.js代码 To display remote content, use the [\<webview>](https://www.electronjs.org/zh/docs/latest/api/webview-tag "<webview>") tag or a [WebContentsView](https://www.electronjs.org/zh/docs/latest/api/web-contents-view "WebContentsView") and make sure to disable the `nodeIntegration` and enable `contextIsolation`.

> ELECTRON 安全警告
> 安全警告和建议被打印到开发者控制台。 只有当二进制文件的名称为Electron时，它们才会显示，这表明开发人员 当前正在查看控制台。
> 你可以通过在`process.env` 或 `window`对象上配置
> `ELECTRON_ENABLE_SECURITY_WARNINGS` 或
> `ELECTRON_DISABLE_SECURITY_WARNINGS`来强制开启或关闭这些警告。
