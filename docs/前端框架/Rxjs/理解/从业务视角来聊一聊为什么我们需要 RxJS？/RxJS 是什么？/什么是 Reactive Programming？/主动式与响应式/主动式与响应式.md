# 主动式与响应式

Proactive（主动式）：即主动轮询，不停的去问需求方以期完成任务，常见的有设置一个定时器，不断的去给服务器发请求询问是否有新的内容产生。

Reactive（响应式）：即有事件发生时，通知我完成任务，常见的有 DOM 事件的监听与触发、WebSocket 等

举个例子🌰

> 完成目标：如云平台中的上课通知，如果服务端收到新的课程开始通知，对应的客户端需要展示这些上课通知。

通过主动式的方式我们会写出如下代码：

```javascript 
setInterval(async function () {
  try {
    const classroomNotification = await fetch('https://xxx');
    // 后续操作
  } catch(err) {}
, 3000)

```


上述代码每隔 3S 去发一次请求，问一下服务端，现在数据有没有更新，有就把数据给我。

通过响应式的方式去实现上述逻辑可能是如下：

```javascript 
const socket = new WebSocket("ws://xxx");
socket.addEventListener('open', function() { // 连接成功，可以开始通讯 });
socket.addEventListener('message', function () {
  // 收到服务端传来的数据，修改前端数据，展示在前端
})

```
