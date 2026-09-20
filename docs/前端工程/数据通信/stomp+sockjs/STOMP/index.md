# STOMP

[sockjs.js](./file/sockjs_l7mGR44k_a.js "sockjs.js")

[stomp.js](./file/stomp_ex4vmElrDg.js "stomp.js")

```纯文本 
 STOMP帧由命令， 一个或多个头信息、一个空行及负载（文本或字节）所组成；支持json，而底层websocket 是二进制：
```


```纯文本 
 stomp 和 websocket 的关系 
     都是一种通讯协议， websocket 相当于 stomp的底层，类似 http 协议和 tcp 协议的关系，axios 和XMLHttpRequest  和关系 ， 

```


```纯文本 
 实例 
      1. 通过sockJS绑定好服务器中配置的endpoint连接点，并通过stomp.over方式创建一个stompClient，完成客户端的创建。 
     2.再通过stompClient.subscribe订阅N多个的消息地址。 
     3.发送消息的时候也同样的通过stompClient.send方法去发送消息到指定的。destination
```


```纯文本 
 script： stomp.js  sockjs.js 
 coding： 
     
   //// 建立连接对象（还未发起连接） 
   // 获取 STOMP 子协议的客户端对象 
   let stompClient, subscription ,reconnectCount,sock 
   $('.btn1').on('click',function(){ 
     function connect(){ 
       if(stompClient) return 
       sock =  new SockJS('/localhost:8080') 
       stompClient = Stomp.over(sock); 
       // 向服务器发起websocket连接并发送CONNECT帧 
       // {} 第一个参数是客户端认证信息，第二个参数为回调函数，第三个参数为headers对象 
       subscription =  stompClient.connect({},function(frame){ 
         console.log('Connected:'+ frame) 
         stompClient.subscribe('/user/info',function(mesg){ 
             console.log(mesg) 
         }) 
       },function(err){ 
         reconnectCount += 1 
         console.log(err,reconnectCount,'1111') 
         if(reconnectCount > 5){ 
           alert('连接失败，请联系管理员') 
         }else{ 
           connect() 
         } 
       }) 
     } 
     connect() 
   }) 
   $('.btn2').on('click',function(){ 
     // 第二个参数 headers 为发送信息的header，JavaScript 对象，可选参数； 第三个参数为为发送信息的body字符窜，可选参数 
     stompClient.send("/app/hello", {}, 'hahah'); 
   }) 
   $('.btn3').on('click',function(){ 
     stompClient.disconnect(); 
   }) 
   $('.btn4').on('click',function(){ 
     subscription.unsubscribe() 
   }) 
 

```


[testLib.rar](./file/testLib_pXiQAFYOhY.rar "testLib.rar")
