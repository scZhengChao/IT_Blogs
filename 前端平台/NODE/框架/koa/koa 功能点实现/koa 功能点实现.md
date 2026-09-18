# koa 功能点实现

## 目录

- [1.响应客户端的eventSource](#1响应客户端的eventSource)
  - [1.1服务端返回数据需要特殊的格式，它分为四种消息类型：](#11服务端返回数据需要特殊的格式它分为四种消息类型)
  - [1.2 实战代码](#12-实战代码)
  - [1.3 stream注意](#13-stream注意)

# 1.响应客户端的eventSource

参考资料：

[https://blog.csdn.net/cpongo3/article/details/93623784](https://blog.csdn.net/cpongo3/article/details/93623784 "https://blog.csdn.net/cpongo3/article/details/93623784")

        事件流的对应MIME格式为

**text/event-stream**

，而且其基于HTTP长连接。针对HTTP1.1规范默认采用长连接，针对HTTP1.0的服务器需要特殊设置。

## 1.1服务端返回数据需要特殊的格式，它分为四种消息类型：

```javascript 
 event, data, id, retry
```


其中，

- event指定自定义消息的名称，如**event: customMessagen**;
- data指定具体的消息体，可以是对象或者字符串，如**data: JSON.stringify(jsonObj)\n\n**,在消息体后面有两个换行符n，代表当前消息体发送完毕，一个换行符标识当前消息并未结束，浏览器需要等待后面数据的到来后再触发事件；
- id为当前消息的标识符，可以不设置。一旦设置则在浏览器端的eventSource对象中就会有体现(假设服务端返回**id: 369n**)，eventSource.lastEventId == 369。该字段使用场景不大;
- retry设置当前http连接失败后，重新连接的间隔。EventSource规范规定，客户端在http连接失败后默认进行重新连接，重连间隔为3s，通过设置retry字段可指定重连间隔;

每个字段都有名称，紧接着有个”:“。当出现一个

**没有名称的字段而只有”:“时，这就会被服务端理解为”注释“，并不会被发送至浏览器端**

，如

*: commision*

。

由于EventSource是基于HTTP连接之上的，因此在一段没有数据的时期会出现超时问题。

\*\*      服务器默认HTTP超时时间为2分钟，在node端可以通过response.connection.setTimeou(0)设置为默认的2min超时\*\*​

， 因此需要服务端做心跳保活，否则客户端在连接超时的情况下出现

**net::ERR\_INCOMPLETE\_CHUNKED\_ENCODING**

错误。通过阅读相关规范，

**发现注释行可以用来防止连接超时,服务器可以定期发送一条消息注释行,以保持连接不断。**

## 1.2 实战代码

```javascript 
 const Router = require('koa-router')
const router = new Router()
var PassThrough = require('stream').PassThrough;
var Readable = require('stream').Readable;

function RR(){
    Readable.call(this,arguments);
}
RR.prototype = new Readable();
RR.prototype._read = function(data){
}

const sse = (stream,event, data) => {
    return stream.push(`event:${ event }\nretry:2000\ndata:${ JSON.stringify(data) }\nid:12345\n\n`)
//    return stream.write(`event:${ event }ndata: ${ JSON.stringify(data) }nn`);
}
router.all('/',(ctx,next)=>{
   
    /***
     * let res = ctx.response
     * 绕过 Koa 的 response 处理是 不被支持的. 应避免使用以下 node 属性：
     * res.statusCode statusCode write end
     * 以下是express 的写法
     */
    
    // // 根据 EventSource 规范设置报头
    // res.writeHead(200, {
    //     "Content-Type": "text/event-stream", // 规定把报头设置为 text/event-stream
    //     "Cache-Control": "no-cache" // 设置不对页面进行缓存
    // })
    // // 用write返回事件流，事件流仅仅是一个简单的文本数据流，每条消息以一个空行(\n)作为分割。
    // res.write(':注释' + '\n\n')  // 注释行 （注释行解决没有数据时请求超时的问题）
    // res.write('data:' + '消息内容1' + '\n\n') // 未命名事件

    // res.write(  // 命名事件
    //     'event: myEve' + '\n' +
    //     'data:' + '消息内容2' + '\n' +
    //     'retry:' + '2000' + '\n' +
    //     'id:' + '12345' + '\n\n'
    // )
    // setInterval(() => { // 定时事件
    //     res.write('data:' + '定时消息' + '\n\n')
    // }, 2000)



    /***
     * 以下是koa的写法
     * koa 有自身的特殊性 相比较 express
     * 所以当你返回的是流 文件的时候 不能用常规的字符串的方式写
     */
    var stream = new RR()//PassThrough();
    ctx.set({
        'Content-Type':'text/event-stream',
        'Cache-Control':'no-cache',
        Connection: 'keep-alive'
    });
    sse(stream,'test',{a: "zheng",b: "chap"});
    ctx.body = stream;
    setInterval(()=>{
        sse(stream,'test',{a: "yango",b: Date.now()});
    },1000); 
})

module.exports = router.routes()
```


## 1.3 stream注意

        此处需要注意的是koa-router的返回值必须是一个

**Stream（Readable）**

，这是由于koa的特殊性造成的。如果context.body不是Stream是一个字符串或者Buffer实例，会

**直接在node原生中调用res.end(buffer),结束了HTTP响应**

```javascript 
 koa lib/application.js

// responses
if (Buffer.isBuffer(body)) return res.end(body);
if ('string' == typeof body) return res.end(body);
if (body instanceof Stream) return body.pipe(res);
```


         因此造成了服务端事件流无法正确响应。而返回Stream类型的方式有几种，如通过扩展stream模块的Readable可读流返回或者直接采用PassThrough流返回，亦可通过through2模块或者Transform对象实现，归

**根到底保证可以从该stream对象中pipe出数据至http.ServerResponse对象中。**
