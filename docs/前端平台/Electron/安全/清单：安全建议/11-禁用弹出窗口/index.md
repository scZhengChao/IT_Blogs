# 11. 不要在 WebViews 中使用 allowpopups

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

> INFO
> 此建议是 Electron 的默认值。

开启`allowpopups`属性将使得[BrowserWindows](https://www.electronjs.org/zh/docs/latest/api/browser-window "BrowserWindows")**可以通过**`window.open()`方法创建。 否则， `<webview>` 标签内**不允许创建新窗口。**

#### 为什么？

如果你不需要弹窗，最好使用默认值以关闭新[BrowserWindows](https://www.electronjs.org/zh/docs/latest/api/browser-window "BrowserWindows")的创建。 以下是最低的权限要求原则：**若非必要，不要再网站中创建新窗口。**

#### 怎么做？

```javascript 
<!-- 不推荐 -->
<webview allowpopups src="page.html"></webview>

<!-- 推荐 -->
<webview src="page.html"></webview>
```
