# 2. 不要为远程内容启用 Node.js 集成

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

> INFO
> 此建议是 Electron 自 5.0.0 以来的默认行为。

其目的是限制您**授予远程内容的权限**, 从而使攻击者在您的网站上执行 `JavaScript` 时更难伤害您的用户。

在此之后，你可以为指定的主机授予附加权限。 举例来说，如果你正在打开一个指向 `https://example.com/` 的 `BrowserWindow`，那么你可以给**他刚刚好足够的权限，但是绝对不要超出这个范围。**

#### 为什么？

如果攻击者跳过渲染进程并在**用户电脑上执行恶意代码**，**那么这种跨站脚本(XSS) 攻击的危害是非常大的**。 跨站脚本攻击很常见，通常情况下，威力仅限于执行代码的网站。 禁用Node.js集成有助于防止XSS攻击升级为“远程代码执行” (RCE) 攻击。

#### 怎么做？

```javascript 
// 不推荐
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: false,
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```


```javascript 
// 推荐
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')


```


```javascript 
<!-- 不推荐 -->
<webview nodeIntegration src="page.html"></webview>

<!-- 推荐 -->
<webview src="page.html"></webview>
```


当禁用Node.js集成时，你依然可以**暴露API给你的站点以使用Node.js的模块功能或特性**。 预加载脚本依然可以使用`require`等Node.js特性， 以使开发者可以通过[contextBridge API](https://www.electronjs.org/zh/docs/latest/api/context-bridge "contextBridge API")向**远程加载的内容公开自定义API。**
