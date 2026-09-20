# 请求控制器

## 目录

- [AbortController](#AbortController)
  - [构造函数](#构造函数)
  - [属性](#属性)
  - [方法](#方法)

# AbortController

&#x20; &#x20;

[ AbortController - Web API 接口参考 | MDN AbortController 接口表示一个控制器对象，允许你根据需要中止一个或多个 Web 请求。 https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController " AbortController - Web API 接口参考 | MDN AbortController 接口表示一个控制器对象，允许你根据需要中止一个或多个 Web 请求。 https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController")

**`AbortController`** 接口表示一个控制器对象，允许你根据需要中止一个或多个 Web 请求。

你可以使用 [AbortController.AbortController()](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/AbortController "AbortController.AbortController()") 构造函数创建一个新的 `AbortController`。使用 [AbortSignal](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal "AbortSignal") 对象可以完成与 DOM 请求的通信。

## [构造函数](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController#构造函数 "构造函数")

[AbortController.AbortController()](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/AbortController "AbortController.AbortController()")创建一个新的 `AbortController` 对象实例。

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController#属性 "属性")

[AbortController.signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal "AbortController.signal")[ (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal " (en-US)") 只读返回一个 [AbortSignal](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal "AbortSignal") 对象实例，它可以用来 with/abort 一个 Web(网络)请求。

## [方法](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController#方法 "方法")

[AbortController.abort()](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/abort "AbortController.abort()")

中止一个尚未完成的 Web(网络)请求。这能够中止 [fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch "fetch") 请求及任何响应体的消费和流。

在下面的代码片段中，我们想通过 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API "Fetch API") 下载一段视频。

我们先使用 [AbortController()](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/AbortController "AbortController()") 构造函数创建一个控制器，然后使用 [AbortController.signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal "AbortController.signal")[ (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal " (en-US)") 属性获取其关联 [AbortSignal](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal "AbortSignal") 对象的引用。

当一个 [fetch request](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch "fetch request") 初始化，我们把 `AbortSignal` 作为一个选项传递到到请求对象（如下 `{ signal }`）。这将&#x20;

signal `和 controller 与这个 fetch request 相关联，然后允许我们通过调用 `[AbortController.abort()](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/abort)`中止请求，如下第二个事件监听函数。`

```javascript 
const controller = new AbortController();
let signal = controller.signal;

const downloadBtn = document.querySelector('.download');
const abortBtn = document.querySelector('.abort');

downloadBtn.addEventListener('click', fetchVideo);

abortBtn.addEventListener('click', function() {
  controller.abort();
  console.log('Download aborted');
});

function fetchVideo() {
  //...
  fetch(url, {signal}).then(function(response) {
    //...
  }).catch(function(e) {
    reports.textContent = 'Download error: ' + e.message;
  })
}

```


> 注意：当 `abort()` 被调用时，这个 `fetch()` promise 将 `reject` 一个名为 `AbortError` 的 `DOMException`。

[AbortController](../../../../前端基础/EcmaScript/Object/特殊对象/AbortController/index.md "AbortController")
