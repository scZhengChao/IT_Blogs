# Electron 中的消息端口

[MessagePort](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort "MessagePort")是一个允许**在不同上下文之间传递消息**的**Web功能**。 就像 `window.postMessage`, 但是**在不同的通道上**。 此文档的目标是描述 `Electron` 如何扩展 `Channel Messaging model` ，并举例说明如何在应用中使用 `MessagePorts`

下面是 MessagePort 是什么和如何工作的一个非常简短的例子：

```javascript 
// renderer.js (Renderer Process)

 // 消息端口是成对创建的。 连接的一对消息端口
// 被称为通道。
 const channel = new MessageChannel()

// port1 和 port2 之间唯一的 不同是你如何使用它们。  消息
// 发送到port1 将被port2 接收，反之亦然。
const port1 = channel.port1
const port2 = channel.port2

//  允许在另一端还没有注册监听器的情况下就通过通道向其发送消息
 // 消息将排队等待，直到一个监听器注册为止。
port2.postMessage({ answer: 42 })

// 这次我们 通过 ipc 向主进程发送 port1 对象。 类似的，
 // 我们也可以发送 MessagePorts 到其他 frames, 或发送到 Web Workers, 等.
ipcRenderer.postMessage('port', null, [port1])
```


```javascript 
// main.js (Main Process)

// 在主进程中，我们接收端口对象。
ipcMain.on('port', (event) => {
  // 当我们在主进程中接收到 MessagePort 对象, 它就成为了
  // MessagePortMain.
  const port = event.ports[0]

  // MessagePortMain 使用了 Node.js 风格的事件 API, 而不是
  // web 风格的事件 API. 因此使用 .on('message', ...) 而不是 .onmessage = ...
  port.on('message', (event) => {
    // 收到的数据是： { answer: 42 }
    const data = event.data
  })

  // MessagePortMain 阻塞消息直到 .start() 方法被调用
  port.start()
})

```


\*\*关于 channel 消息接口的使用文档详见 \*\*[**Channel Messaging API**](https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API "Channel Messaging API")

[主进程中的 MessagePorts](<./主进程中的 MessagePorts/index.md> "主进程中的 MessagePorts")

[扩展: close 事件](<./扩展- close 事件/index.md> "扩展: close 事件")

[示例用例](./示例用例/index.md "示例用例")
