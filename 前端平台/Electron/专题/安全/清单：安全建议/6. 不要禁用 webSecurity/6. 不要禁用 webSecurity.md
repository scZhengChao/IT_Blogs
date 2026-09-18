# 6. 不要禁用 webSecurity

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

> INFO
> 此建议是 `Electron` 的默认值。

**不要在生产环境中禁用**\*\*`webSecurity`。\*\*​

#### 为什么？

禁用 `webSecurity` 将会**禁止同源策略**并且将 `allowRunningInsecureContent` 属性置 `true`。 换句话说，这将使得来自**其他站点的非安全代码被执行。**

#### 怎么做？

```javascript 
// 不推荐
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```


```javascript 
// 推荐
const mainWindow = new BrowserWindow()
```


```javascript 
<!-- 不推荐 -->
<webview disablewebsecurity src="page.html"></webview>

<!-- 推荐 -->
<webview src="page.html"></webview>
```
