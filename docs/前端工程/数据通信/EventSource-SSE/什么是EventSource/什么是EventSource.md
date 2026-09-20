# 什么是EventSource

## 目录

- [1.1是什么：](#11是什么)
- [ 2.2有什么用：](#-22有什么用)
- [2.3WebSocket & EventSource 的区别](#23WebSocket--EventSource-的区别)

参考资料：

[利用WebSocket和EventSource实现服务端推送 可能有很多的同学有用 setInterval 控制 ajax 不断向服务端请求最新数据的经历(轮询)看下面的代码： 这样每隔5秒前端会向后台请求一次数据，实现上看起来很简单但... https://www.jianshu.com/p/958eba34a5da](https://www.jianshu.com/p/958eba34a5da "利用WebSocket和EventSource实现服务端推送 可能有很多的同学有用 setInterval 控制 ajax 不断向服务端请求最新数据的经历(轮询)看下面的代码： 这样每隔5秒前端会向后台请求一次数据，实现上看起来很简单但... https://www.jianshu.com/p/958eba34a5da")

## 1.1是什么：

          `EventSource`的官方名称应该是 `Server-sent events`（缩写SSE）**服务端派发事件**，**`EventSource`****基于http协议****只是简单的单项通信**，实现了**服务端推的过程**客户端**无法**通过`EventSource`向**服务端发送**数据。

**喜闻乐见的是ie并没有良好的兼容；**

当然也有解决的办法比如 npm install event-source-polyfill。虽然不能实现双向通信但是在功能设计上他也有一些**优点比如可以自动重连接**,event IDs,以及发送随机事件的能力（WebSocket要借助第三方库比如socket.io可以实现重连。）

## \*\* ****2.2****有什么用：\*\*

 因为受**单项通信的限制**`EventSource`只能用来实现像股票报价、新闻推送、实时天气这些**只需要服务器发送消息给客户端**场景中。`EventSource`的使用更加便捷这也是他的优点。

## 2.3WebSocket & EventSource 的区别

1. `WebSocket`基于`TCP`协议，\*\*`EventSource`****基于****`http`\*\***协议。**
2. **`EventSource`****是****单向通信**，而`websocket`是**双向通信**。
3. **`EventSource`****只能发送文本****，**而`websocket`支持发送**二进制数据**。
4. 在实现上`EventSource`比`websocket`更简单。
5. `EventSource`有**自动重连接（不借助第三方）**以及**发送随机事件**的能力。
6. `websocket`的资源占用过大`EventSource`更轻量。
7. `websocket`可以跨域，\*\*`EventSource`\*\***基于http跨域需要服务端设置请求头**。

```javascript 
 var source = new EventSource('/EventSource-test')
source.onopen = function (event) { 
      // 与服务器连接成功回调 
      console.log('成功与服务器连接')
}
// 监听从服务器发送来的所有没有指定事件类型的消息(没有event字段的消息)
source.onmessage = function (event) { 
  // 监听未命名事件 
  console.log('未命名事件', event.data)
}
source.onerror = function (error) { 
  // 监听错误 
  console.log('错误',error)
}
  // 监听指定类型的事件（可以监听多个）
source.addEventListener("test", function (event) {  
  console.log("test", event.data)
})
```


服务端案例见Node/koa
