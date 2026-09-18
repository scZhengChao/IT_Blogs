# http-proxy

```纯文本 
 http-proxy  插件，用于监听转发请求，介入其中做一些处理,用于负载均衡和转发请求  解决跨域问题 
   
 解决跨域问题核心 ：跨域是浏览器安全所致， 而页面是在node服务器上，和node是同一域，不存在跨域。和后端和服务是跨域了，但是是node服务器和后端服务器跨域， 而  在原生native应用和服务器端是不存在跨域情况的。成功的由服务器转发请求逃过了跨域。 
      
 
 const httpProxy = require('http-proxy'); 
 http.createServer(function (req, res) {    
     httpProxy.web(req, res, {target: uri}, function (e) { 
         console.log(e); 
     }); 
 }).listen(PORT); 
 
 httpProxy.createProxyServer({ 
     changeOrigin: true, 
     ignorePath: true 
 }); 
 httpProxy.on('proxyRes', function(proxyRes, req, res) {  //转发的响应 res 
     let host = proxyRes.req.getHeader('host'); 
     let path = proxyRes.req.path; 
 }) 
 proxy.on('proxyReq', function(proxyReq, req, res) {   //转发的请求 req 
     console.log("url：" + proxyReq.path); 
 }); 
 http-proxy可以监听proxyRes事件，当转发的请求返回响应时，会触发该事件。（当客户端发起请求时，http-proxy转发到对应的目标服务器上，目标服务器返回请求内容时，触发proxyRes事件，回调执行结束后，再返回res给客户端） 
 
 proxyRes.req.getHeader() 可以获取对应的header头信息，为了能够得到转发服务器地址， 
 
 创建代理服务器时，需要配置changeOrigin为true，该选项用于更改目标地址头信息。比如: 客户端请求地址为 test.iqiyi.com，转发的目标服务器地址为 target.iqiyi.com，当changeOrigin设置为true时，host得到的是target.iqiyi.com；当设置为false时，host的值为test.iqiyi.com 
 
 ignorePath用于转发请求时，是否将原请求地址中的path附加到转发地址后面。 
 
 比如: 客户端请求地址为：http://test.iqiyi.com/test，转发请求地址为：http://target.iqiyi.com/lib/mac/dianshiju/ 
 
 当ignorePath为true时，代理服务器转发时不会添加path，直接请求http://target.iqiyi.com/lib/mac/dianshiju/ 
 当ignorePath为false时，代理服务器转发请求时，会附加上原地址的path，去请求http://target.iqiyi.com/lib/mac/dianshiju/test 
 使用http-proxy创建代理服务器时，一般都会设置 ignorePath为true，便于转发请求处理。 
 
 -------------或者其他用方法--------------------------------------------------- 
 var http = require('http'), httpProxy = require('http-proxy');   
    
 // 新建一个代理 Proxy Server 对象   
 var proxy = httpProxy.createProxyServer({});   
    
 // 捕获异常   
 proxy.on('error', function (err, req, res) {   
   res.writeHead(500, {   
     'Content-Type': 'text/plain'   
   });   
   res.end('Something went wrong. And we are reporting a custom error message.');   
 });   
      
 // 在每次请求中，调用 proxy.web(req, res config) 方法进行请求分发   
 var server = require('http').createServer(function(req, res) {   
   // 在这里可以自定义你的路由分发   
   var host = req.headers.host, ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;   
   console.log("client ip:" + ip + ", host:" + host);   
      
   switch(host){   
     case 'www.111.cn':    
         proxy.web(req, res, { target: 'http://localhost:3000' });   
     break;   
     case 'vote.111.cn':   
         proxy.web(req, res, { target: 'http://localhost:9527' });   
     break; 
     default:   
         res.writeHead(200, {   
             'Content-Type': 'text/plain'   
         });   
         res.end('Welcome to my server!');   
   }   
 });   
    
 console.log("listening on port 80")   
 server.listen(80); 
 如果你用的是 express  router.use(),  app.use()
```


```纯文本 
 1.在应用启动入口文件（一般为app.js）或者自服务 引入模块 
 var http = require("http"); 
 var httpProxy = require('http-proxy'); 
 var proxy = httpProxy.createProxyServer({}); 
 
 2.监听服务器出错 
 proxy.on('error', function (err, req, res) { 
     res.writeHead(500, { 
         'Content-Type': 'text/plain' 
     }); 
     res.end('500'); 
 }) 
 
 3.在应用启动入口文件部署代理服务器，一般的，我们只是用来做部分转发，即作工具的使用，可以在具体的某个请求中使用代理： 
 app.get(/.*?\.mp3$/, proxyer);//把请求MP3的链接使用代理 
 function proxyer(req,res,next){ 
     delete req.headers.host;//一定要把host删除，不然会出现404，我在这里踩了好久的坑！ 
     proxy.web(req, res, {target: 'http://fs.open.kugou.com'}); 
 } 
 
 4.如果当作另一个服务器来运行，我们可以在加一个代理服务。只要端口号不跟原应用端口不冲突就可以： 
 var server = http.createServer(function(req, res) { 
     var host = req.headers.host, ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; 
     console.log("client ip:" + ip + ", host:" + host); 
     delete req.headers.host; 
     switch(host){ 
         case 'www.mizuiren.com': 
            //把请求url的host主机为www.mizuiren.com 80 端口的请求转发到http://fs.open.kugou.com去获取数据，可以理解为直接把请求地址 http://www.mizuiren.com替换成http://fs.open.kugou.com 
            proxy.web(req, res, {target: 'http://fs.open.kugou.com'}); 
            break; 
         case 'music.mizuiren.com': 
            proxy.web(req, res, {target: 'http://localhost:3000'}); 
            break; 
            default: 
               res.writeHead(200, { 
                 'Content-Type': 'text/plain' 
               }); 
            res.end('你访问的是代理服务器，但是代理域名规则找不到你的请求!'); 
     } 
 }); 
 console.log("proxy listening on port 80") 
 server.listen(80); 

```
