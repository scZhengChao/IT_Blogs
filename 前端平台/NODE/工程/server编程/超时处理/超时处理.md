# 超时处理

## 目录

- [一：http模块的超时设置  ](#一http模块的超时设置)
  - [1.服务端的超时设置](#1服务端的超时设置)
  - [2.客户端的超时设置](#2客户端的超时设置)
- [二.Express.js的超时设置](#二Expressjs的超时设置)
  - [ 1.Express.js所有的请求超时时间](#1Expressjs所有的请求超时时间)
  - [2.使用Express.js中间件设置超时](#2使用Expressjs中间件设置超时)

# 一：http模块的超时设置  

[https://itbilu.com/nodejs/core/4yHX3Aiie.html?tdsourcetag=s\_pctim\_aiomsg](https://itbilu.com/nodejs/core/4yHX3Aiie.html?tdsourcetag=s_pctim_aiomsg "https://itbilu.com/nodejs/core/4yHX3Aiie.html?tdsourcetag=s_pctim_aiomsg")

### **1.服务端的超时设置**

```javascript 
 const http = require('http'); 
 
 const hostname = '127.0.0.1'; 
 const port = 1337; 
 
 var server = http.createServer((req, res) => { 
   res.writeHead(200, { 'Content-Type': 'text/plain' }); 
   res.end('Hello World\n'); 
 }) 
 server.listen(port, hostname, () => { 
   console.log(`Server running at http://${hostname}:${port}/`); 
 });
```


- 用户请求的超时：即上例中http.IncomingMessage实例－req用户请求时间过长，会导致服务器停留在一个用户请求的接收状态，从而阻碍其它用户请求的进入。
- 服务器响应的超时：即上例中http.ServerResponse实例－res服务器响应时间过长，会导致用户长时间接收不到服务器响应信息，影响用户体验和其它用户请求的处理

`Node.js HTTP`服务器设置超时使用`setTimeout(`)方法。
**http.Server、http.IncomingMessage和http.ServerResponse中都有一个setTimeout()方法。**

- **server.setTimeout()会设置****所有用户请求和服务器响应的超时时间****，**
- **而req.setTimeout()只能****针对本次请求超时时间进行设置****，**
- **res.setTimeout()只能针对****本次请求的服务器响应超时时间进行设置****。**

我们可以像下面这样在HTTP服务端设置超时：

将所有的用户请求和服务器响应超时时间设置为5秒：

```javascript 
 server.setTimeout(5000);
```


对于某一个比较耗时的用户请求（如：图片上传），我们将**用户请求**超时时间设置为20秒

```javascript 
 req.setTimeout(20*1000);
```


对于一个需要在服务器进行较长时间处理用户请求，我们将**服务器响应**的超时时间设置为10秒：

```javascript 
 res.setTimeout(10*1000);
```


### **2.客户端的超时设置**

    `Node.js`的`http`模块除了可以做为`HTTP`服务器使用，来处理和响应用户请求外。还可以做为\*\*`HTTP`\*\***客户端来使用，来发送客户端请求。**

    `http`模块中的[ClientRequest对象](https://itbilu.com/nodejs/core/4yHX3Aiie.html?tdsourcetag=s_pctim_aiomsg "ClientRequest对象")实现了`HTTP`客户端功能，该对象同样提供了一个`setTimeout()`方法，用于**设置请求的超时时间，当服务器超时未响应时，客户端对象会重置到服务器的链接。**

如，我们可以像下面这样创建一个HTTP客户端，并设置请求的超时时间：

```javascript 
 const http = require('http'); 
 
 const options = { 
   host: 'itbilu.com', 
   method: 'GET', 
   port: 80, 
   path: '/' 
 } 
 var req = http.request(options); 
 req.setTimeout(2000); 
 req.on('response', (res) => { 
   res.setEncoding('utf8'); 
   res.on('data', function(chunk){ 
         console.log('收到数据：%s', chunk); 
   }); 
   res.on('end', function(){ 
         console.log(res.trailers); 
   }); 
 }); 
 req.end();
```


注意：所有的超时设置都是以毫秒为单位，当设置为0时表示永不超时。

# **二.Express.js的超时设置**

**Express.js框架是在http模块的基础上构建的一个HTTP服务器模块**，因此我们也可以像http模块那样设置所有HTTP请求的用户请求和服务器响应超时时间，也可以针对某一个HTTP请求设置用户请求和服务器响应超时时间。

### \*\* 1.Express.js所有的请求超时时间\*\*​

类似`Node.js`原生的`HTTP`服务器设置，我们对`Express.js`应用所有请求的用户请求和服务器响应超时时间进行设置：

```javascript 
 var app = require('../app'); 
 
 app.set('port', process.env.PORT || 3000); 
 
 var server = app.listen(app.get('port'), function() { 
   debug('Express服务器运行于：' + server.address().port); 
 }); 
 
 server.setTimeout(1000); 
 server.on('timeout', function(){ 
   console.log('超时了'); 
 })
```


### **2.使用Express.js中间件设置超时**

`Express.js`提供了强大的中间件机制，利用这一机制我们可以更为灵活的设置`HTTP`服务器超时时间。如，我们可以在app.js文件中添加如下处理程序，分别设置**请求和服务器响应的超时时间**，当然也可以**只设置请求超时或服务器响应超时时间**：

```javascript 
 app.use(function(req, res, next) { 
   // 设置所有HTTP请求的超时时间 
   req.setTimeout(5000); 
   // 设置所有HTTP请求的服务器响应超时时间 
   res.setTimeout(5000); 
   next(); 
 });
```


对比较某一个比较耗时的用户请求，或需要较多响应时间才能完成处理的请求，我们可以其路由处理方法或路由中间件中单独设置超时时间：

```javascript 
 router.post('/file', function(req, res) { 
   req.setTimeout(20*1000) 
   // 一些处理……   
 });
```
