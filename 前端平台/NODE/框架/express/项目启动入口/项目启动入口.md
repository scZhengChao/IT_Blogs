# 项目启动入口

```纯文本 
 // import 等语法要用到 babel 支持 
 require('babel-register') 
 const express = require('express'); 
 const cors = require('cors') 
 const path = require('path') 
 const cluster = require('cluster') 
 // const numCPUs = require('os').cpus().length; 
 let history = require('connect-history-api-fallback') 
 // 全局的util 无需 手写引入 
 let util = require('./util') 
 Object.entries(util).forEach(item=>global[item[0]] = item[1]) 
 
   const app = express(); 
   // 解决history模式 
   app.use(history()); 
   app.use(morgan4acc) 
   app.use(express.json()); 
   app.use(express.urlencoded({ extended: false })); 
   app.use(express.static(path.join(__dirname, 'public'))); 
   app.use(cors({ 
     origin: true, 
     methods: ['GET', 'PUT', 'POST', 'DELETE'], 
     credentials: true 
   })) 
    
   let {checktoken} = require('./middle_ware') 
   let whiteList = ['/vue/login','/sdk/upLog','/sdk/upLogVideo','/vue/test/testone','/vue/test/testtwo'] 
   app.use(checktoken(whiteList)) 
    
   // 按sdk vue 分 , 或者 按表分, 按增删改查 分 ... 
   app.use('/sdk',require('./routes/sdk')) 
   app.use('/vue',require('./routes/vue')) 
    
   // catch 404 and forward to error handler 
   app.use(function(req, res, next) { 
     res.status(404).json({ 
       message:'找不到此接口' 
     }) 
   }); 
    
   // error handler 
   app.use(function(err, req, res, next) { 
     console.log(err,'err middleware 捕捉') 
     if(err){ 
       let {message,stack} = err 
       res.status(500).json({ 
         message, 
         stack 
       }) 
     }else{ 
         next() 
     } 
   }); 
    
   let server = app.listen(3000,()=>{ 
     console.log('server running at http://localhost:3000  '+ process.env.NODE_ENV) 
     console.log(`工作进程 ${process.pid} 已启动`); 
   }); 
    
 
 
 // if (cluster.isMaster) { 
 //   console.log(`主进程 ${process.pid} 正在运行`); 
 
 
 //   // 衍生工作进程。 
 //   for (let i = 0; i < numCPUs; i++) { 
 //     cluster.fork(); 
 //   } 
 
 
 //   cluster.on('exit', (worker, code, signal) => { 
 //     console.log(`工作进程 ${worker.process.pid} 已退出`); 
 //   }); 
 // } else { 
 //   // 工作进程可以共享任何 TCP 连接。 
 //   // 在本例子中，共享的是 HTTP 服务器。 
 //   startup() 
 // } 
 
 
 // 注意这里监听了 没有捕获掉的异常, 但是serve 不会 cash掉,但是栈堆消息会丢失 所以得重启 
 // 如果没有这个监听, serve 直接down 掉,即使有cluster 开启多个进程, 也会一个进程一个进程的down 掉 
 //糟糕！请求一直在等待，内存上涨。原因在于res.end 永远不会执行， 
 //现有的I/O处于等待的状态，已经开辟的资源不仅不会被释放，而且服务器还在不知疲倦地接受新的用户请求。 
 //所以需要优雅的重启 
 //我们可以用Cluster模式，由之而来的推荐做法是： - 针对发生异常的请求返回一个错误代码 - 出错的Worker不再接受新的请求 - 退出关闭Worker进程 
 // 或者就是pm2 
 
 
 process.on('uncaughtException', function (err) {   
   try{ 
     // 所以以下, 只是保证你优雅的推出 , 重启还是的pm2 来 
     logger.error(`监听到的未捕获到的异常:请管理注意:`,err) 
     // server.close(); 
     // // 保证 worker.disconnect 不会拖太久.. 
     // setTimeout(function () { 
     //   process.exit(1);; 
     // }, 100).unref(); 
     // if (cluster.worker) { 
     //   cluster.worker.disconnect(); 
     // } 
   }catch(error){ 
     logger.error(`未捕获到的异常logger.error写入失败:请管理注意:`,error) 
   } 
 }) 

```


```纯文本 
 package.json 
 { 
   "name": "performancemonitor", 
   "version": "0.0.0", 
   "private": true, 
   "scripts": { 
     "dev": " set NODE_ENV=development&&nodemon app.js", 
     "dev-linux": " export NODE_ENV=development&&nodemon app.js", 
     "test": " set NODE_ENV=test&&pm2 start pm2.config.json", 
     "prd": "set NODE_ENV=production&&pm2 start pm2.config.json" 
   }, 
   "dependencies": { 
     "babel-register": "^6.26.0", 
     "connect-history-api-fallback": "^1.6.0", 
     "cors": "^2.8.5", 
     "express": "^4.17.1", 
     "jsonwebtoken": "^8.5.1", 
     "lodash": "^4.17.15", 
     "log4js": "^6.1.0", 
     "mongoose": "^5.8.1", 
     "morgan": "~1.9.1", 
     "pm2": "^4.2.1", 
     "redis": "^2.8.0", 
     "rotating-file-stream": "^2.0.1" 
   }, 
   "devDependencies": { 
     "nodemon": "^2.0.2" 
   } 
 }
```
