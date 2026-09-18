# 12. 创建WebView前确认其选项

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

通过**渲染进程创建**的`WebView`是不开启`Node.js`集成的，**且也不能由自身开启**。 但是，`WebView`可以通过其`webPreferences`属性**创建一个独立的渲染进程。**

#### 为什么？

由于 `<webview>` 存在在DOM中，因此即使Node继承被禁用，它也可以通过运行在您的 网站上的脚本创建它们。

Electron 可以**让开发者关闭各种控制渲染进程的安全特性。** 通常情况下，开发者并不需要关闭他们中的任何一种 -\*\* 因此你不应该允许创建不同配置的\*\*[**\<webview>**](https://www.electronjs.org/zh/docs/latest/api/webview-tag "<webview>")**标签**

#### 怎么做？

利用这个事件来阻止可能含有不安全选项的 `webViews` 创建。

```javascript 
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // 如果未使用，则删除预加载脚本或验证其位置是否合法
    delete webPreferences.preload

    // 禁用 Node.js 集成
    webPreferences.nodeIntegration = false

    // 验证正在加载的 URL
    if (!params.src.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```


同样，这个清单只是将风险降低到最低限度，但没有将其消除。 如果您的目标是展示***一个网站，浏览器将是一个更安全的选择。***
