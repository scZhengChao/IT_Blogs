# 7. Content Security Policy（内容安全策略）

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)
- [CSP HTTP headers](#CSP-HTTP-headers)
- [CSP meta tag](#CSP-meta-tag)

内容安全策略(CSP) 是应对**跨站脚本攻击**和**数据注入攻击的**又一层保护措施。 我们建议任何载入到`Electron`的站点都要开启。

#### 为什么？

CSP允许Electron通过服务端内容对指定页面的**资源加载进行约束与控制**。 如果你定义`https://example.com`这个源，所属这个源的脚本都允许被加载，反之`https://evil.attacker.com`不会被允许加载运行。 对于提升你的应用安全性，设置CSP是个很方便的办法。

#### 怎么做？

下面的CSP设置使得Electron只能执行自身站点和来自`apis.example.com`的脚本。

```javascript 
// 不推荐
Content-Security-Policy: '*'

// 推荐
Content-Security-Policy: script-src 'self' https://apis.example.com
```


#### CSP HTTP headers

Electron 会处理 [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy "Content-Security-Policy")[ HTTP 标头](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy " HTTP 标头")，它可以在 [webRequest.onHeadersReceived](https://www.electronjs.org/zh/docs/latest/api/web-request#webrequestonheadersreceivedfilter-listener "webRequest.onHeadersReceived") 中进行设置：

```javascript 
const { session } = require('electron')

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': ['default-src \'none\'']
    }
  })
})
```


#### CSP meta tag

CSP 的首选传输机制是一个 `HTTP` 头. 但是， 使用 `file://`协议加载资源时 **，无法使用此方法**。 在某些情况下，使用`<meta>` 标记直接在标记（makeup）中**对页面设置策略** 很有用：

```javascript 
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```
