# MessagePort

## 目录

- [实例方法](#实例方法)
- [事件](#事件)
- [示例](#示例)

> **备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API "Web Worker") 中可用。

[Channel Messaging API](https://developer.mozilla.org/zh-CN/docs/Web/API/Channel_Messaging_API "Channel Messaging API") 的 **`MessagePort`** 接口代表 [MessageChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel "MessageChannel") 的两个端口之一，它可以让你从一个端口发送消息，并在消息到达的另一个端口监听它们。

`MessagePort` 是一个[可转移对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects "可转移对象")。

## [实例方法](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort#实例方法 "实例方法")

*继承父类 *[*EventTarget*](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget "EventTarget")* 的方法*。

[postMessage()](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort/postMessage "postMessage()")

从端口发送一条消息，并且可选是否将对象的所有权交给其他浏览器上下文。

[start()](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort/start "start()")

开始发送该端口中的消息队列（仅在使用 [EventTarget.addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener "EventTarget.addEventListener") 时需要；使用 [onmessage](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort/message_event "onmessage") 已隐含调用该方法）。

[close()](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort/close "close()")

断开端口连接，它将不再是激活状态。

## [事件](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort#事件 "事件")

*继承父类 *[*EventTarget*](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget "EventTarget")* 的事件*。

[message](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort/message_event "message")

当 `MessagePort` 对象收到消息时触发。

[messageerror](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort/messageerror_event "messageerror")

当 `MessagePort` 对象收到无法被反序列化的消息时触发。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort#示例 "示例")

在下面的示例中，你可以看到一个使用 [MessageChannel()](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel/MessageChannel "MessageChannel()") 构造函数创建出的新通道。

当 IFrame 加载完成后，我们给 [MessageChannel.port1](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel/port1 "MessageChannel.port1") 注册了一个 [onmessage](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort/message_event "onmessage") 回调，并且使用 [window.postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage "window.postMessage") 方法把 [MessageChannel.port2](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel/port2 "MessageChannel.port2") 和一条消息一起传给 IFrame。

当从 IFrame 收到消息时，`onMessage` 函数会把消息输出到一个段落里。

```javascript 
const channel = new MessageChannel();
const output = document.querySelector(".output");
const iframe = document.querySelector("iframe");

// 等待 iframe 加载
iframe.addEventListener("load", onLoad);

function onLoad() {
  // 监听 port1 的消息
  channel.port1.onmessage = onMessage;

  // 把 port2 传给 iframe
  iframe.contentWindow.postMessage("Hello from the main page!", "*", [
    channel.port2,
  ]);
}

// 处理 port1 收到的消息
function onMessage(e) {
  output.innerHTML = e.data;
}

```
