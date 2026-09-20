# websocket/SSE/轮询

## 目录

- [前言](#前言)
- [服务端向客户端推送数据的实现方案有哪几种？](#服务端向客户端推送数据的实现方案有哪几种)
  - [轮询简介](#轮询简介)
  - [websocket简介](#websocket简介)
  - [SSE简介](#SSE简介)
- [websocket和SSE有什么区别？](#websocket和SSE有什么区别)
  - [轮询](#轮询)
  - [Websocket和SSE](#Websocket和SSE)
  - [Websocket和SSE分别适用于什么业务场景？](#Websocket和SSE分别适用于什么业务场景)
- [SSE有哪些主要的API?](#SSE有哪些主要的API)
  - [SSE连接状态](#SSE连接状态)
  - [SSE相关事件](#SSE相关事件)
  - [数据格式](#数据格式)
- [如何实操一个SSE链接？Demo↓](#如何实操一个SSE链接Demo)
  - [前端代码Demo](#前端代码Demo)
  - [后端代码Demo（node的express）](#后端代码Demonode的express)
- [总结  ](#总结--)

# **前言**

在日常的开发中，我们经常能碰见服务端需要主动推送给客户端数据的业务场景，比如数据大屏的实时数据，比如消息中心的未读消息，比如聊天功能等等。

本文主要介绍SSE的使用场景和如何使用SSE。

# **服务端向客户端推送数据的实现方案有哪几种？**

我们常规实现这些需求的方案有以下三种

1. 轮询
2. websocket
3. SSE

### **轮询简介**

在很久很久以前，前端一般使用轮询来进行服务端向客户端进行消息的伪推送，为什么说轮询是伪推送？因为轮询本质上还是通过客户端向服务端发起一个单项传输的请求，服务端对这个请求做出响应而已。

通过不断的请求来实现服务端向客户端推送数据的错觉。并不是服务端主动向客户端推送数据。显然，轮询一定是上述三个方法里最下策的决定。

**轮询的缺点：**

1. 首先轮询需要不断的发起请求，每一个请求都需要经过http建立连接的流程（比如三次握手，四次挥手），是没有必要的消耗。
2. 客户端需要从页面被打开的那一刻开始就一直处理请求。虽然每次轮询的消耗不大，但是一直处理请求对于客户端来说一定是不友好的。
3. 浏览器请求并发是有限制的。比如Chrome 最大并发请求数目为 6，这个限制还有一个前提是针对同一域名的，超过这一限制的后续请求将会被阻塞。而轮询意味着会有一个请求长时间的占用并发名额。
4. 而如果轮询时间较长，可能又没有办法非常及时的获取数据

### **websocket简介**

websocket是一个双向通讯的协议，他的优点是，可以同时支持客户端和服务端**彼此相互进行通讯。** 功能上很强大。

缺点也很明显，websocket是一个新的协议，ws/wss。也就是说，支持http协议的浏览器不一定支持ws协议。

相较于SSE来说，websocket因为功能更强大。结构更复杂。所以相对比较重。

websocket对于各大浏览器的兼容性↓

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/x0kXIOa6owWO37XmuyDfqjQl9LvdgNnKdzDWxClVIwb6wb2NfVZd9tQ0tILyaicljzVfOM46QgGHz9jgmNgS49w/640?wx_fmt=other\&from=appmsg\&wxfrom=5\&wx_lazy=1\&wx_co=1\&tp=webp)

### **SSE简介**

sse是一个单向通讯的协议也是一个长链接，它只能支持**服务端主动向客户端推送数据**，但是无法让客户端向服务端推送消息。

长链接是一种HTTP/1.1的持久连接技术，

它允许客户端和服务器在**一次TCP连接上进行多个HTTP请求和响应，**

而不必为每个请求/响应建立和断开一个新的连接。

长连接有助于减少服务器的负载和提高性能。 &#x20;

SSE的优点是，它是一个轻量级的协议，相对于websockte来说，他的复杂度就没有那么高，相对于客户端的消耗也比较少。而且SSE使用的是http协议（websocket使用的是ws协议），也就是现有的服务端都支持SSE，无需像websocket一样需要服务端提供额外的支持。

注意:IE大魔王不支持SSE

SSE对于各大浏览器的兼容性↓

![](./assets/image/image_hqCamt4rq1.png)

注意哦，上图是SSE对于浏览器的兼容不是对于服务端的兼容。

# **websocket和SSE有什么区别？**

### **轮询**

对于当前计算机的发展来说，几乎很少出现同时不支持websocket和sse的情况，所以轮询是在极端情况下浏览器实在是不支持websocket和see的下策。

### **Websocket和SSE**

我们一般的服务端和客户端的通讯基本上使用这两个方案。首先声明:这两个方案没有绝对的好坏，只有在不同的业务场景下更好的选择。

SSE的官方对于SSE和Websocket的评价是

1. WebSocket是**全双工通道，可以双向通信，功能更强；SSE是单向通道，只能服务器向浏览器端发送。**
2. WebSocket是一**个新的协议，需要服务器端支持**；**SSE则是部署在HTTP协议之上的，现有的服务器软件都支持。**
3. **SSE是一个轻量级协议**，相对简单；WebSocket是一种较重的协议，相对复杂。
4. **SSE默认支持断线重连，** WebSocket则需要额外部署。
5. **SSE支持自定义发送的数据类型。**

### **Websocket和SSE分别适用于什么业务场景？**

对于SSE来说，它的优点就是轻，而且对于服务端的支持度要更好。换言之，可以使用SSE完成的功能需求，没有必要使用更重更复杂的websocket。

比如：**数据大屏的实时数据，消息中心的消息推送等一系列只需要服务端单方面推送而不需要客户端同时进行反馈的需求，SSE就是不二之选****。** ​

对于Websocket来说，他的优点就是可以同时支持客户端和服务端的双向通讯。所适用的业务场景：最典型的就是聊天功能。这种服务端需要主动向客户端推送信息，并且客户端也有向服务端推送消息的需求时，Websocket就是更好的选择。

# **SSE有哪些主要的API?**

建立一个SSE链接 ：`var source = new EventSource(url)`; &#x20;

#### **SSE连接状态**

`source.readyState`

- 0，相当于常量`EventSource.CONNECTING`，表示连接还未建立，或者连接断线。
- 1，相当于常量`EventSource.OPEN`，表示连接已经建立，可以接受数据。
- 2，相当于常量`EventSource.CLOSED`，表示连接已断，且不会重连。

#### **SSE相关事件**

- `open`事件(连接一旦建立，就会触发open事件，可以定义相应的回调函数)
- `message`事件(收到数据就会触发message事件)
- `error`事件(如果发生通信错误（比如连接中断），就会触发error事件)

#### **数据格式**

```http 
Content-Type: text/event-stream //文本返回格式
Cache-Control: no-cache  //不要缓存
Connection: keep-alive //长链接标识

```


SSE相关文档：.w3cschool.cn/nwfchn/wpi3cozt.html

显然，如果直接看api介绍不论是看这里还是看官网，大部分同学都是比较懵圈的状态，那么我们写个demo来看一下?

# **如何实操一个SSE链接？Demo↓**

这里Demo前端使用的就是最基本的html静态页面连接，没有使用任何框架。后端选用语言是node，框架是Express。

### 前端代码Demo

```html 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <ul id="ul">
        
    </ul>
</body>
<script>

//生成li元素
function createLi(data){
    let li = document.createElement("li");
    li.innerHTML = String(data.message);
    return li;
}
    
//判断当前浏览器是否支持SSE
  let source = ''
 if (!!window.EventSource) {
    source = new EventSource('http://localhost:8088/sse/');
 }else{
    throw new Error("当前浏览器不支持SSE")
 }

//对于建立链接的监听
 source.onopen = function(event) {
   console.log(source.readyState);
   console.log("长连接打开");
 };

 //对服务端消息的监听
 source.onmessage = function(event) {
   console.log(JSON.parse(event.data));
   console.log("收到长连接信息");
   let li = createLi(JSON.parse(event.data));
   document.getElementById("ul").appendChild(li)
 };

 //对断开链接的监听
 source.onerror = function(event) {
   console.log(source.readyState);
   console.log("长连接中断");
 };
</script>
</html>
```


### 后端代码Demo（node的express）

```javascript 
const express = require('express'); //引用框架
const app = express(); //创建服务
const port = 8088; //项目启动端口

//设置跨域访问
app.all("*", function(req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", '*');
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // 可以带cookies
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
})

app.get("/sse",(req,res) => {
    res.set({
        'Content-Type': 'text/event-stream', //设定数据类型
        'Cache-Control': 'no-cache',// 长链接拒绝缓存
        'Connection': 'keep-alive' //设置长链接
      });

      console.log("进入到长连接了")
      //持续返回数据
      setInterval(() => {
        console.log("正在持续返回数据中ing")
        const data = {
          message: `Current time is ${new Date().toLocaleTimeString()}`
        };
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      }, 1000);  
})

//创建项目
app.listen(port, () => {
  console.log(`项目启动成功-http://localhost:${port}`)
})

```


# 总结 &#x20;

1. SSE比websocket更轻
2. SSE是基于http/https协议的
3. websocket是一个新的协议，ws/wss协议
4. 如果只需要服务端向客户端推送消息，推荐使用SSE
5. 如果需要服务端和客户端双向推送，请选择websocket
6. 不论是SSE还是websocket，对于浏览器的兼容性都不错
7. 轮询是下策，很占用客户端资源，不建议使用。（不过偷懒的时候他确实方便）
8. IE不支持SSE

对了，小程序不支持SSE哦
