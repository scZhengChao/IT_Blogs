# MessageChannel

## 目录

- [构造函数](#构造函数)
- [实例属性](#实例属性)
- [示例](#示例)
- [浏览器兼容性](#浏览器兼容性)

> **备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API "Web Worker") 中可用。

`Channel Messaging API` 的 `MessageChannel` 接口允许我们创建一个新的消息通道，并通过它的两个 `MessagePort` 属性发送数据。

## [构造函数](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel#构造函数 "构造函数")

[MessageChannel()](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel/MessageChannel "MessageChannel()")

返回**一个新的 ****`MessageChannel`**** 对象**，其中包含两个新的 [MessagePort](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort "MessagePort") 对象。

## [实例属性](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel#实例属性 "实例属性")

[MessageChannel.port1](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel/port1 "MessageChannel.port1") 只读

返回 channel 的 port1。

[MessageChannel.port2](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel/port2 "MessageChannel.port2") 只读

返回 channel 的 port2。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel#示例 "示例")

在以下的代码块中，你可以看到使用 [MessageChannel()](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel/MessageChannel "MessageChannel()") 构造函数创建的新 Channel。

当 IFrame 加载完成后，我们将为 [MessageChannel.port1](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel/port1 "MessageChannel.port1") 注册一个 [onmessage](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort/message_event "onmessage") 处理器，并使用 [window.postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage "window.postMessage") 方法将 [MessageChannel.port2](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel/port2 "MessageChannel.port2") 和一条信息传输到 IFrame。

当收到 IFrame 返回的信息时，`onMessage` 函数会将信息输出到一个段落中。

```javascript 
const channel = new MessageChannel();
const output = document.querySelector(".output");
const iframe = document.querySelector("iframe");

// 等待 iframe 加载
iframe.addEventListener("load", onLoad);

function onLoad() {
  // 在 port1 上监听消息
  channel.port1.onmessage = onMessage;

  // 将 port 2 传输到 iframe
  iframe.contentWindow.postMessage("来自主页的您好！", "*", [channel.port2]);
}

// 处理 port 1 收到的消息
function onMessage(e) {
  output.innerHTML = e.data;
}

```


## [浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel#浏览器兼容性 "浏览器兼容性")

[Report problems with this compatibility data on GitHub](<https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel\&metadata=\<!--+Do+not+make+changes+below+this+line+--\>&#xA;\<details\>&#xA;\<summary\>MDN+page+report+details\</summary\>&#xA;&#xA;*+Query:+`api.MessageChannel`&#xA;*+Report+started:+2024-06-17T02:19:27.421Z&#xA;&#xA;\</details\>\&title=api.MessageChannel+-+\<SUMMARIZE+THE+PROBLEM\>\&template=data-problem.yml> "Report problems with this compatibility data on GitHub")

|                                                                                                                                                                                                                                    | desktop                   |                            |                            |                              |                           | mobile                     |                            |                            |                             |                             |                             | server                       |                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | -------------------------- | -------------------------- | ---------------------------- | ------------------------- | -------------------------- | -------------------------- | -------------------------- | --------------------------- | --------------------------- | --------------------------- | ---------------------------- | -------------------------------------------- |
|                                                                                                                                                                                                                                    | Chrome                    | Edge                       | Firefox                    | Opera                        | Safari                    | Chrome Android             | Firefox for Android        | Opera Android              | Safari on iOS               | Samsung Internet            | WebView Android             | Deno                         | Node.js                                      |
| ---                                                                                                                                                                                                                                | ---                       | ---                        | ---                        | ---                          | ---                       | ---                        | ---                        | ---                        | ---                         | ---                         | ---                         | ---                          | ---                                          |
| `MessageChannel`                                                                                                                                                                                                                   | 2&#xA;&#xA;Toggle history | 12&#xA;&#xA;Toggle history | 41&#xA;&#xA;Toggle history | 10.6&#xA;&#xA;Toggle history | 5&#xA;&#xA;Toggle history | 18&#xA;&#xA;Toggle history | 41&#xA;&#xA;Toggle history | 11&#xA;&#xA;Toggle history | 4.2&#xA;&#xA;Toggle history | 1.0&#xA;&#xA;Toggle history | 4.4&#xA;&#xA;Toggle history | 1.12&#xA;&#xA;Toggle history | 15.0.0&#xA;&#xA;more&#xA;&#xA;Toggle history |
| [MessageChannel()](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel/MessageChannel "MessageChannel()")[ constructor](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel/MessageChannel " constructor") | 2&#xA;&#xA;Toggle history | 12&#xA;&#xA;Toggle history | 41&#xA;&#xA;Toggle history | 10.6&#xA;&#xA;Toggle history | 5&#xA;&#xA;Toggle history | 18&#xA;&#xA;Toggle history | 41&#xA;&#xA;Toggle history | 11&#xA;&#xA;Toggle history | 4.2&#xA;&#xA;Toggle history | 1.0&#xA;&#xA;Toggle history | 4.4&#xA;&#xA;Toggle history | 1.12&#xA;&#xA;Toggle history | 15.0.0&#xA;&#xA;more&#xA;&#xA;Toggle history |
| [port1](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel/port1 "port1")                                                                                                                                             | 2&#xA;&#xA;Toggle history | 12&#xA;&#xA;Toggle history | 41&#xA;&#xA;Toggle history | 10.6&#xA;&#xA;Toggle history | 5&#xA;&#xA;Toggle history | 18&#xA;&#xA;Toggle history | 41&#xA;&#xA;Toggle history | 11&#xA;&#xA;Toggle history | 4.2&#xA;&#xA;Toggle history | 1.0&#xA;&#xA;Toggle history | 4.4&#xA;&#xA;Toggle history | 1.12&#xA;&#xA;Toggle history | 10.5.0&#xA;&#xA;Toggle history               |
| [port2](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel/port2 "port2")                                                                                                                                             | 2&#xA;&#xA;Toggle history | 12&#xA;&#xA;Toggle history | 41&#xA;&#xA;Toggle history | 10.6&#xA;&#xA;Toggle history | 5&#xA;&#xA;Toggle history | 18&#xA;&#xA;Toggle history | 41&#xA;&#xA;Toggle history | 11&#xA;&#xA;Toggle history | 4.2&#xA;&#xA;Toggle history | 1.0&#xA;&#xA;Toggle history | 4.4&#xA;&#xA;Toggle history | 1.12&#xA;&#xA;Toggle history | 10.5.0&#xA;&#xA;Toggle history               |

[MessagePort](IT/前端基础/EcmaScript/Object/MessageChannel/MessagePort/MessagePort.md "MessagePort")
