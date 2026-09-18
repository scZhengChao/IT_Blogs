# node----数据代理:豆瓣

```纯文本 
 数据代理: 
 
   跨域： 
     ajax 默认不可以跨域的，要跨就要"后台允许" 
 
     后台允许: true 
       ajax 
     后台公开API： 
       jsonp 接口:   前端 可以通过jsonp 访问 
       后台对后台:    同过 localhost的后台(PHP,nodeJs) 访问  douban后台 
               通过前端的工具webpack(模拟后台)  访问  duban后台接口 
 ----------------------------------------------------------------- 
   豆瓣: 
     hostname:'api.douban.com',//主机名 
       port: 443,//端口 
       path:'/v2/movie/top250?start=3&count=1', 
       method:'get' 
 
   数据代理proxy:    request请求 抓取异步数据 
     options={ 
       hostname:'api.douban.com', 
       port:443, 
       path:'/v2/movie/top250?count='+req.query.count, 
       method:'GET' 
     }; 
 
     发送http[s]请求 
     http[s].request(配置项,回调(响应对象resHttp))  返回请求对象reqHttp 
       resHttp 响应对象 
       resHttp.statusCode 状态码  200 OK 
       resHttp.headers 获取响应头信息 
       resHttp.setEncoding('utf-8') 设置编码方式 
       resHttp.on('data/end',fn)  ->send给前端 
     }); 
 
 
 
 
     reqHttp 请求对象 
     reqHttp.on('error',(err)=>{console.log(err)});  监听请求失败信息 
     reqHttp.end();请求结束 
      
     代码： 
     router.get('/', function(req, res, next) { 
     let start = req.query.start; 
     let count = req.query.count; 
     //数据代理    本域后端向它域后端发请求  https 
     let options={ 
         hostname:'api.douban.com', 
         port:443, 
         path:'/v2/movie/top250?start='+start+'&count='+count, 
         method:'GET' 
     } 
      
     //reqhttp  模块帮你去对方后台请求 req   并且帮你返回请求对象 resHttp 
     let reqHttp = https.request(options, (resHttp) => { 
         // resHttp 响应对象 
         // resHttp.statusCode 状态码  200 OK 
         // resHttp.headers 获取响应头信息 
         // resHttp.setEncoding('utf-8') 设置编码方式 
         // resHttp.on('data/end',fn)  ->send给前端 
         var str = ``; 
         resHttp.on('data', (chunk) => { 
             str+=chunk 
         }) 
         resHttp.on('end', () => { 
             res.send(str) 
         }) 
 
 
     }) 
     reqHttp.on('error', (err) => { console.log('数据代理',err) }) 
     reqHttp.end()  // 结束响应 
 
 });
```


node 路由 --数据代理到豆瓣   mongo

```纯文本 
 var express = require('express'); 
 var router = express.Router(); 
 var mg = require('./mg') 
 let https = require('https') 
 /* GET home page. */ 
 router.get('/', function(req, res, next) { 
     let start = req.query.start; 
     let count = req.query.count; 
     //数据代理 本域后端向它域后端发请求 https 
     let options={ 
        hostname:'api.douban.com', 
         port:443, 
         path:'/v2/movie/top250?start='+start+'&count='+count, 
         method:'GET' 
     } 
 //reqhttp 模块帮你去对方后台请求 req 并且帮你返回请求对象 resHttp 
     let reqHttp = https.request(options, (resHttp) => { 
 // resHttp 响应对象 
 // resHttp.statusCode 状态码 200 OK 
 // resHttp.headers 获取响应头信息 
 // resHttp.setEncoding('utf-8') 设置编码方式 
 // resHttp.on('data/end',fn) ->send给前端 
     var str = ``; 
     resHttp.on('data', (chunk) => { 
         str+=chunk 
     }) 
     resHttp.on('end', () => { 
         res.send(str) 
     }) 
 }) 
 reqHttp.on('error', (err) => { console.log('数据代理',err) }) 
     reqHttp.end() // 结束响应 
 }); 
 router.post('/', function(req, res, next) { 
     console.log('ajx-post',req.body) 
 }); 
 module.exports = router;
```
