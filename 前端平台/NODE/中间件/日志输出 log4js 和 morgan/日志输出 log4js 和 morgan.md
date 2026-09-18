# 日志输出 log4js 和 morgan

[https://mp.weixin.qq.com/s/AZnKieARdpqBh0wx3ZAZvg](https://mp.weixin.qq.com/s/AZnKieARdpqBh0wx3ZAZvg "https://mp.weixin.qq.com/s/AZnKieARdpqBh0wx3ZAZvg")

   可以看一下

```纯文本 
 1.log4js 应用日志 
 https://blog.csdn.net/liyulong_126/article/details/72624915 
 安装： npm i  log4js 
 log4js 是一个 nodejs 日志管理工具，可以将日志以各种形式输出到各种渠道。 
 
 const log4js = require("log4js"); 
 const config = require('../config') 
 const infoFilename = config.appInfoLogOutputPath; 
 const errorFilename = config.appErrorLogOutputPath; 
 
 log4js.configure({ 
   appenders: { 
     error: { 
       type: "dateFile", //日志类型 
       filename: errorFilename, //日志输出位置 
       alwaysIncludePattern: true, //是否总是有后缀名 
       pattern: "log-yyyy-MM-dd" //后缀，每小时创建一个新的日志文件 
     }, 
     info: { 
       type: 'dateFile', 
       filename: infoFilename, 
       alwaysIncludePattern: true, 
       pattern: 'log-yyyy-MM-dd' 
     } 
   }, 
   categories: { 
     error: { appenders: ['error'], level: 'error' }, 
     default: { appenders: ['info'], level: 'info' } 
   }, 
    
   // pm2: true, 
   // pm2InstanceVar: 'INSTANCE_ID', 
   disableClustering: true 
 }); 
 
 module.exports = log4js; 
 使用: 
 const log4js = require("./log4js"); 
 
 const errorLog = log4js.getLogger("error"); //此处使用categories的值 
 const infoLog = log4js.getLogger("default"); //此处使用categories的值 
 
 let log = {}; 
 log.info = function(infos, req) { 
   infoLog.info(formatReqLog(infos, req)); 
 }; 
 log.error = function(infos,error) { 
   if (error) { 
     errorLog.error(formatError(infos,error)); 
   } 
 }; 
 
 // 处理对象 
 function logout(body={},logText) { 
   Object.entries(body).forEach(item=>{ 
     if(typeof item[1] === 'string'){ 
       if(item[1].length>300){ 
         logText += `\n   ${item[0]}: 内容太长不予输出`; 
       }else{ 
         logText += `\n   ${item[0]}: ${item[1]}`; 
       } 
     }else if(typeof item[1] === 'object'){ 
       logText +=logout(item[1],logText) 
     } 
   }) 
   return logText 
 } 
 
 
 //格式化请求日志 
 let formatReqLog = function(infos, req) { 
   let logText = new String(); 
   if(req){ 
     let body = req.body 
     let getClientIp = function (req) { 
       return  req.headers['x-forwarded-for'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress|| 
         null; 
     }; 
     let ip = getClientIp(req); 
    
     //访问方法 
     let method = req.method; 
     logText += "\n method: " + method; 
     //请求原始地址 
     logText += "\n originalUrl:  " + req.url; 
     //客户端ip 
     logText += "\n client ip:  " + ip ; 
     //请求参数 
     if (method === "GET") { 
       logText += "\n query :" ; 
       logText += logout(req.query,logText) 
     } else { 
       if (typeof body === "string") { 
         if(body.length>300){ 
           logText += "\n body: 内容太长 不予输出" 
         }else{ 
           logText += "\n body: "+ body ; 
         } 
       } else if(typeof body === 'object') { 
         logText += "\n body: " 
         logText +=logout(body,logText) 
       } 
     } 
   } 
   // 需要打印的信息 
   if (typeof(infos) == 'object') { 
     logText += "\n Infos: " 
     logText +=logout(infos,logText) 
   } else { 
     logText += "\n Infos: " + infos 
   } 
   return logText; 
 }; 
 
 
 //格式化错误日志 
 var formatError = function(infos,err) { 
   var logText = new String(); 
   // 需要打印的信息 
   if (typeof(infos) == 'object') { 
     logText += "\n Infos: " 
     logText +=logout(infos,logText) 
      
   } else { 
     logText += "\n Infos: " + infos ; 
   } 
   //添加请求日志 
   //logText += formatReqLog(req); 
   //错误名称 
   logText += "\n err name: " + err.name ; 
   //错误信息 
   logText += "\n err message: " + err.message; 
   //错误详情 
   logText += "\nerr stack: " + err.stack ; 
   return logText; 
 }; 
 
 module.exports = log;
```


```纯文本 
 2.morgan  服务日志 
 const morgan = require('morgan') 
 const rfs = require('rotating-file-stream') 
 const conf = require('../config/index') 
 console.log('AccessLog path: ' + conf.accessLogOutputPath) 
 let logDirectory = conf.accessLogOutputPath 
 
 // 每日创建access.log 
 let accessLogStream = rfs.createStream('access.log', { 
     interval: '1d', // 每日 
     path: logDirectory 
 }) 
 
 // 自定义token,不然时区不对 
 morgan.token('localDate',function() {   
     return new Date().toLocaleString() 
 }) 
 // 自定义输出日志格式 
 let accLogFormat = ':remote-addr - :remote-user [:localDate] ":method :url HTTP/:http-version" :req[header] :status :res[content-length] ":referrer" ":user-agent"' 
 
 module.exports = morgan(accLogFormat, {stream: accessLogStream}, {flags: 'a'}) 
 
 使用: 
 express().use(morgan)
```
