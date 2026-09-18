# http/socket

## 目录

- [telnet](#telnet)
- [socket](#socket)
- [开启服务](#开启服务)
  - [流](#流)

# **telnet**

Telnet意思是Internet的远程登录协议，可以通过它远程登录来控制别的计算机； 底层就是socket协议；

一般的window 无法使用telnet；下面教程教你如何打开：

- [x] 设置 -->     勾选“Telnet客户端”
- [x] 控制面板 -->
- [x] 程序--> 
- [x] 启用或关闭Windows功能 --->

# **socket**

**二：socket 套接字  socket 编程就是tcp协议  ==/= websocket（一个是浏览器的一个是服务端的）**

原理：Net模块提供一个异步API能够创建基于流的TCP服务器，客户端与服务器建立连接后，服务器可以获得一个 全双工Socket对象，服务器可以保存Socket对象列表，在接收某客户端消息时，推送给其他客户端。

```typescript 
 简单使用： 
 //socket.js 
 const net = require('net') 
 const chatServer = net.createServer() 
 const clientList = [] 
 chatServer.on('connection',client => { 
     client.write('Hi!\n') 
     clientList.push(client) 
     client.on('data',data => { 
         console.log('receive:',data.toString()) 
         clientList.forEach(v => { 
             v.write(data) 
         }) 
     }) 
 }) 
 chatServer.listen(9000) 
 node socket.js 
 
 
 另起客户端：通过Telnet连接服务器 
 telnet localhost 9000 
 输入发送信息
```


# 开启服务

```typescript 
const http = require('http');
const fs = require('fs')

const server = http.createServer((request,response)=>{  
  const {url,method,headers} = request
  if(url==='/' && method ==='GET'){
      fs.readFile('./index.html',(err,data)=>{
          response.statusCode = 200;
          response.setHeader('Content-Type','text/html')
          response.end(data)
      })
  }else if(url==='/users' && method === 'GET'){
      //AJAX
      response.writeHead(200,{
          'Content-Type':'application/json'
      })
      response.end(JSON.stringify({
          name:'laowang'
      }))
  }else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1 && url !== '/favicon.ico'){
      //图片服务
      fs.createReadStream('./'+url).pipe(response)
  }
})

server.listen(3000,()=>{
    console.log('端口监听成功')
})

```


## **流**

```typescript 
 一个非常简洁但是很到位的文件流的例子； 
 const http = require('http') 
 const fs = require('fs') 
 const path = require('path') 
 const chunk = [] 
 let size = 0 
 const server = http.createServer((request, response) => { 
     const { pathname } = require('url').parse(request.url) 
 
 
     if (pathname === '/upload') { 
         console.log('upload....') 
         const fileName = request.headers['file-name'] ? request.headers['file-name'] : 'abc.png' 
         const outputFile = path.resolve(__dirname, fileName) 
         const fis = fs.createWriteStream(outputFile) 
 
 
         // Buffer connect 
         // request.on('data',data => { 
         //     chunk.push(data) 
         //     size += data.length 
         //     console.log('data:',data ,size) 
         // }) 
         // request.on('end',() => { 
         //     console.log('end...') 
         //     const buffer = Buffer.concat(chunk,size) 
         //     size = 0 
         //     fs.writeFileSync(outputFile,buffer) 
         //     response.end() 
         // }) 
 
 
         // 流事件写入 
         // request.on('data', data => { 
         //     console.log('data:',data) 
         //     fis.write(data) 
         // }) 
         // request.on('end', () => { 
         //     fis.end() 
         //     response.end() 
         // }) 
 
 
 
 
         request.pipe(fis) 
         response.end() 
 
 
     } else { 
         const filename = pathname === '/' ? 'index.html' : pathname.substring(1) 
         var type = (function (_type) { 
             switch (_type) { // 扩展名 
                 case 'html': 
                 case 'htm': return 'text/html charset=UTF-8' 
                 case 'js': return 'application/javascript charset=UTF-8' 
                 case 'css': return 'text/css charset=UTF-8' 
                 case 'txt': return 'text/plain charset=UTF-8' 
                case 'manifest': return 'text/cache-manifest charset=UTF-8' 
                 default: return 'application/octet-stream' 
             } 
         }(filename.substring(filename.lastIndexOf('.') + 1))) 
         // 异步读取文件,并将内容作为单独的数据块传回给回调函数 
         // 对于确实很大的文件,使用API fs.createReadStream()更好 
         fs.readFile(filename, function (err, content) { 
             if (err) { // 如果由于某些原因无法读取文件 
                 response.writeHead(404, { 'Content-type': 'text/plain charset=UTF-8' }) 
                 response.write(err.message) 
             } else { // 否则读取文件成功 
                 response.writeHead(200, { 'Content-type': type }) 
                 response.write(content) // 把文件内容作为响应主体 
             } 
             response.end() 
         }) 
     } 
 }) 
 server.listen(3000)
```


[03\_网路编程\_http\_https\_http2\_websocket【瑞客论坛 www.ruike1.com】.pdf](<03_网路编程_http_https_http2_websocket【瑞客论坛 www.ruike1.pdf> "03_网路编程_http_https_http2_websocket【瑞客论坛 www.ruike1.com】.pdf")

[HTTP协议详解【瑞客论坛 www.ruike1.com】.pdf](<HTTP协议详解【瑞客论坛 www.ruike1.com】_z6_BiRNbUU.pdf> "HTTP协议详解【瑞客论坛 www.ruike1.com】.pdf")
