# 14. 禁用或限制新窗口创建

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

如果您有已知的窗口组，那么限**制您的应用程序创建额外的窗口**是一个好主意。

#### 为什么？

与导航非常相似，创建新 `webContents` 是 一种常见的攻击方式。 **攻击者试图诱使您的应用创建新的窗口、框架、 或其他渲染过程，拥有比以前更多的权限； 或 打开之前无法打开的页面。**

如果您除了知道需要创建的窗口之外，还不需要创建 窗口，则**禁用创建**可以免费为您带来一些额外的 安全性。 对于打开一个 `BrowserWindow` 并且不需要在运行时打开任意数量的附加 窗口的应用来说，情况通常如此。

#### 怎么做？

除其他参数外，处理程序 将接收请求打开窗口的 `url` 以及用于创建窗口的选项。 我们建议您注册一个**处理程序来 监视窗口的创建**，**并拒绝任何意外的窗口创建。**

```javascript 
const { app, shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    // 在这个例子中，我们要求操作系统
    // 在默认浏览器中打开此事件的URL
    //
    // 关于哪些URL应该被允许通过shell.openExternal打开，
    // 请参照以下项目。
    if (isSafeForExternalOpen(url)) {
      setImmediate(() => {
        shell.openExternal(url)
      })
    }

    return { action: 'deny' }
  })
})
```
