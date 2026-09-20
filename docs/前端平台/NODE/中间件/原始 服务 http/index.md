# 原始 服务 http

```纯文本 
 let http = require('http') 
 let staticHtDos = require('./mod/static');//自定的模块，要加路径 
 let querystring = require('querystring'); 
 let urlLib = require('url'); 
 
 let server = http.createServer( (req, res) = > { 
 
   if (req.url !== '/favicon.ico') { 
     // console.log('请求地址', req.url);//请求地址 
      var str = ''; 
     req.on('data', (chunk) => {//一段一段接收 
       str += chunk;//拼接 
     }); 
     req.on('end', () => {//get、post、静态文件请求都会触发 
       if (req.url.indexOf('/form') !== -1) { 
         //表单请求 
         let post = querystring.parse(str); 
         let get = urlLib.parse(req.url, true).query; 
         //兜库-》res.write(库数据) 
         // res.write('{"a":1,"b":2}'); 
         // res.end(); 
       } else if (req.url.indexOf('/ajx') != -1) { 
         //登录注册 业务 
          checkUser(req, res, str) 
       } else { 
         //文件操作 
         staticHtDos(req, res) 
       } 
     }); 
 
   } 
 }); 
 server.listen(3000); 
 let sql = {};//{alex:alex123}  假库 
 function checkUser(req, res, str) { 
   let post = querystring.parse(str); 
   let get = urlLib.parse(req.url, true).query; 
   console.log('checkUser',post,get) 
   let data = post.act?post:get; 
   switch(data.act){ 
     case 'reg': 
       if(sql[data.username]){ 
         res.write('{"err":1,"msg":"用户名已存在"}') 
       }else{ 
         sql[data.username]=data.password;//注册 
         res.write('{"err":0,"msg":"注册成功"}') 
       } 
       break; 
     case 'login': 
       if(sql[data.username]){ 
         if(sql[data.username]==data.password){ 
           res.write('{"err":0,"msg":"登录成功"}') 
         }else{ 
           res.write('{"err":1,"msg":"用户名或者密码有误"}') 
         } 
       }else{ 
         res.write('{"err":1,"msg":"用户名不存在"}') 
       } 
       break; 
   } 
   res.end(); 
 }
```


```纯文本 
 //上面引入的自定义模块     let staticHtDos = require('./mod/static');//自定的模块，要加路径   
 let fs = require('fs'); 
 
 let staticHtDos = (req,res) => { 
   let path = req.url == '/' ? '/index.html' : req.url; 
   fs.readFile('./htdos' + path, (err, data) => { 
     if (!err) { 
       res.write(data); 
       res.end();//响应结束 
     } else { 
       fs.readFile('./htdos/error.html', (err, data) => { 
         res.write(data); 
         res.end();//响应结束 
       }) 
     } 
   }); 
 } 
 
 //commonJs 输出 
 
 // module.exports=函数|类|对象 
 // exports.属性=值 
 
 module.exports=staticHtDos;
```


```纯文本 
 request模块。node中，http模块也可作为客户端使用（发送请求），第三方模块request对其使用方法进行了封装，操作更方便！所以来介绍一下 
 ----------------------get、 
 var request = require('request'); 
   request('您的请求url', function (error, response, body) { 
     if (!error && response.statusCode == 200) { 
       console.log(body) 
     } 
   }); 
 ---------------------------------- post 
 var request = require('request'); 
 var url="请求url"; 
 var requestData="需要传输的数据"; 
 request({ 
     url: url, 
     method: "POST", 
     json: true, 
     headers: { 
         "content-type": "application/json", 
     }, 
     body: JSON.stringify(requestData) 
 }, function(error, response, body) { 
     if (!error && response.statusCode == 200) { 
         console.log(body) // 请求成功的处理逻辑 
     } 
 }); 
 ----------------------------  form 
 request.post({url:'', form:{key:'value'}}, function(error, response, body) { 
     if (!error && response.statusCode == 200) { 
        console.log(body) // 请求成功的处理逻辑   
     } 
 })
```
