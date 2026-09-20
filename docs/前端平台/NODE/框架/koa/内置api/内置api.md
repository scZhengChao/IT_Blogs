# 内置api

## 目录

- [1.设置响应头](#1设置响应头)
  - [1.1response.set(fields)](#11responsesetfields)
    - [2.Stream](#2Stream)

# 1.设置响应头

### 1.1response.set(fields)

用一个对象设置多个响应头fields:

```vue 
 ctx.set({   'Etag': '1234',   'Last-Modified': date });
```


这将委托给 

[setHeader](https://nodejs.org/dist/latest/docs/api/http.html#http_request_setheader_name_value "setHeader")

 ，它通过指定的键设置或更新消息头，并且不重置整个消息头。

#### 2.Stream

Content-Type 默认为 application/octet-stream。

         每当流被设置为响应主体时，.onerror 作为侦听器自动添加到 error 事件中以捕获任何错误。此外，每当请求关闭（甚至过早）时，流都将被销毁。

         如果你不想要这两个功能，请勿直接将流设为主体。例如，当将主体设置为代理中的 HTTP 流时，你可能不想要这样做，因为它会破坏底层连接。

参阅: 

[https://github.com/koajs/koa/pull/612](https://github.com/koajs/koa/pull/612 "https://github.com/koajs/koa/pull/612")

 获取更多信息。

以下是流错误处理的示例，而不会自动破坏流：

```javascript 
 const PassThrough = require('stream').PassThrough;  
app.use(async ctx => {   
  ctx.body = someHTTPStream.on('error', (err) => 	                 ctx.onerror(err)).pipe(PassThrough()
   ); 
});
```
