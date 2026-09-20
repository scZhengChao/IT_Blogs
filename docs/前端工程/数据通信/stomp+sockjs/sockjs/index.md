# sockjs

```纯文本 
 websocket 是端对端的长连接  要注意这一点，socket.io 就很好的体现了这一点
```


```纯文本 
 sockjs 
         是对websocket 的一个兼容，优先采用websocket ， 然后在自动降级， 
       api 和原生的websocket api 几乎相同 
       支持跨域
```


```纯文本 
 心跳检测： 
     心跳检测： 
      每隔一段时间发送一个ping ，同时初始化 超时重连， 如果在达到心跳规定次数后仍没有返回 PONG，则判定心跳超时，前端主动关闭ws，触发 ws重连。【注意】：ws重连的时候，要清空之前的心跳定时器。 
      如果期间收到了 PONG，则重新初始化超时重连。
```


```纯文本 
 断开连接的三种情况： 
 
      * 心跳超时（连接层不断）的情况，则前端可主动关闭 ws； 
      * 连接未建立成功（如TCP连接断掉），ws 自动关闭； 
      * 服务端关闭（如多端剔除），这是要防止前端进行重连。 
      【注意】：锁屏情况下，js 会停止工作，这时，ws 会自动关闭，当屏幕唤醒时，通过触发 onclose 事件，ws 又会进行重连。在某些特殊业务场景下，需要注意下这种情况。 

```


```纯文本 
 websocket 自动重连 
      无论是前端主动关闭 ws，还是ws自动关闭，都会触发 onclose 事件，可在其中进行重连。如果达到了重连次数或者后端返回了不可进行重连的标志码，则不进行重连。 
     sockjs.onclose = function(e) { 
         // 已经关闭的情况，不重连 
         if (isClose) { 
             return; 
         } 
         // 小于重连次数 
         if (connectCount < CONNECT_COUNT) { 
             setTimeout(function() { 
                 new_conn(); 
             }, (Math.random() * 3 + 1 )* 1000);    
         } else { 
             isClose = true; 
         } 
     };
```
