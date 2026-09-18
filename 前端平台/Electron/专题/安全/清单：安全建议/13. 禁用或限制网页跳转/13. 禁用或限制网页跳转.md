# 13. 禁用或限制网页跳转

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

如果你的应用**不需要导航或只需要导航到已知页面**，最好将**导航完全限制在该已知范围内**，**不允许任何其他类型的导航。**

#### 为什么？

**导航是一种常见的攻击媒介**。 如果攻击者可以诱使你的应用导航离开其当前页面，则他们可能会强制你的应用在 `Internet` 上打开网站。 即使你的`webContents`被配置为增强安全（如禁用`nodeIntegration`或启用`contextIsolation`），让你的应用打开一个任意的网站依旧是非常简单的操作。

一种常见的攻击模式是，攻击者诱导你的应用的用户与此应用进行能够使其导航到攻击者的某个页面的互动。 这通常是通过链接、插件或其他用户生成的内容完成的。

#### 怎么做？

如果您知道您的应用程序可能会导航到哪些界面，请在事件处理器中检查URL，**并且仅当它与您预期的URL匹配时才进行导航。**

我们建议您使用`Node`的解析器来处理`URL`。 **简单的字符串比较有时会出错** - `startsWith('https://example.com')`测试会让`https://example.com.attacker.com`通过.

```javascript 
const { URL } = require('url')
const { app } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```
