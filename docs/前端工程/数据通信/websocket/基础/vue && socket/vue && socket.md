# vue && socket

## 目录

- [vue-socket.io](#vue-socketio)
- [Socket.IO](#SocketIO)

# vue-socket.io

```javascript 
npm i --save vue-socket.io --save socket.io-client

socket.客户端出错的情况:
         socket.on('error',fn)   //出错的情况,基本没有触发 
         socket.on('disconnect',fn)   // 链接断开,在已经链接上的时候会触发 
         socket.on('reconnecting',function(num){})   //重连,第一次没连接上还是连接上了在断开都会主动触发这个 重连操作 
          socket.close()  客户端主动断开链接 


客户端socket.on()监听的事件：
      connect：连接成功
      connecting：正在连接
      disconnect：断开连接
      connect_failed：连接失败
      error：错误发生，并且无法被其他事件类型所处理
      message：同服务器端message事件
      anything：同服务器端anything事件
      reconnect_failed：重连失败
      reconnect：成功重连
      reconnecting：正在重连
  
当第一次连接时，事件触发顺序为：connecting->connect；
当失去连接时，事件触发顺序为：disconnect->reconnecting（可能进行多次）->connecting->reconnect->connect。
```


注意:
&#x20;     如果出现页面显示不出来，或者出现  TypeError: Cannot call a class as a function
&#x20;     可以尝试把依赖 替换成   "vue-socket.io": "^2.1.1-a"

# Socket.IO

Socket.IO库特点： 
源于HTML5标准 
支持优雅降级 
    WebSocket 
    WebSocket over FLash 
    XHR Polling 
    XHR Multipart Streaming 
    Forever Iframe 
    JSONP Polling

```javascript 
 事件
socket.on('connect', function(data){
    onlineFlag = true;
    console.log(data + ' - connect');
});
socket.on('connect_error', function(data){
    console.log(data + ' - connect_error');
});
socket.on('connect_timeout', function(data){
    console.log(data + ' - connect_timeout');
});
socket.on('error', function(data){
    console.log(data + ' - error');
});
socket.on('disconnect', function(data){
    onlineFlag = false;
    console.log(data + ' - disconnect');
});
socket.on('reconnect', function(data){
    console.log(data + ' - reconnect');
});
socket.on('reconnect_attempt', function(data){
    console.log(data + ' - reconnect_attempt');
});
socket.on('reconnecting', function(data){
    console.log(data + ' - reconnecting');
});
socket.on('reconnect_error', function(data){
    console.log(data + ' - reconnect_error');
});
socket.on('reconnect_failed', function(data){
    console.log(data + ' - reconnect_failed');
});
socket.on('ping', function(data){
    console.log(data + ' - ping');
});
socket.on('pong', function(data){
    console.log(data + ' - pong');
});
```
