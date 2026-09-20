# mysql 的 链接

```纯文本 
 let mysql = require('mysql')  // 引入mysql 
 
 //配置链接数据库 
 var db = mysql.createConnection({ 
     host: 'localhost',  //域名 
     user: 'root',  // 用户名 
     password: '123456',  //密码 
     database: 'zc'  //选择数据库 
 }); 
 
 //链接数据库 
 db.connect(); 
 
 //操作数据库 
 // db.query(sql, (error, result) => { 
 //     // error 错误 
 //     // result 结果 
 // }) 
 
 //查 
 // db.query('SELECT * FROM project', (error, result) => { 
 //增加 
 // db.query('INSERT INTO project (id,title,cont,idea) VALUES (0,"as","af","asafg")', (error, result) => { 
 //删除 
 // db.query('DELETE FROM project WHERE id=47', (error, result) => { 
 //修改 
 db.query('UPDATE project SET idea = "发发发" WHERE id=46',(error,result)=>{ 
     console.log(result) 
 }) 
 //最后要断开链接 
 db.end()
```


实际运用：

```纯文本 
 app.js 
 
 let express = require('express'); 
 let bodyParser = require('body-parser'); 
 let consolidate = require('consolidate'); 
 let cookieSession = require('cookie-session'); 
 let mysql = require('mysql'); 
 
 let path=require('path'); 
 
 let app=express(); 
 app.listen(3000); 
 
 app.use(express.static(path.join(__dirname,'public'))); 
 
 
 app.use(bodyParser.urlencoded({ 
   limit:1024 
 })); 
 var arr=[]; 
 for(var i=0;i<1000;i++){ 
   arr[i]=Math.random().toFixed(3)+'sha1'; 
 } 
 app.use(cookieSession({ 
   name:'node_id', 
   keys:arr, 
   maxAge:1000*10 
 })) 
 
 app.engine('html', consolidate.ejs); 
 app.set('view engine', 'html'); 
 app.set('views', path.resolve('views')); 
 
 let db = mysql.createPool({ 
   host:'localhost', 
   user:'root', 
   password:'root123', 
   port:3306, 
   database:'news' 
 }); 
 
 //主服务 
 // let home=require('./routes/home') 
 app.use('/',require('./routes/home')(db));//use 的第二个参数 函数体|子服务 
 app.use('/article',require('./routes/article')(db));//use 的第二个参数 函数体|子服务 
 app.use('/follow',require('./routes/follow')(db)); 
 app.use('/column',require('./routes/column')(db)); 
 app.use('/user',require('./routes/user')(db)); 
 app.use('/login',require('./routes/login')(db)); 
 app.use('/reg',require('./routes/reg')(db)); 
 app.use('/logout',require('./routes/logout')(db));
```


```纯文本 
 子服务 或者说 路由里 
 let express = require('express') 
 
 // module.exports=router;//导出子服务对象 
 module.exports=(db)=>{ 
 
   //创建路由（子服务） 
   let router = express.Router(); 
 
   //处理业务 
   router.get('/',(req,res,next)=>{ 
     //兜库 
     db.query('SELECT * FROM banner',(err,result)=>{ 
       if(err){// err 
         res.render('error.ejs',{title:'失败标题',msg:"失败描述+err"}); 
       }else{ 
         // console.log(result)//数组 
         // res.render('index.ejs',{banner:result}); 
         res.banner=result; 
         next() 
       } 
     }) 
   }); 
 
   router.get('/',(req,res,next)=>{ 
     //兜库 
     db.query('SELECT * FROM news',(err,result)=>{ 
        
       if(err){// err 
         res.render('error.ejs',{title:'失败标题',msg:"失败描述 news接口"}); 
       }else{ 
         res.render('index.ejs',{ 
           banner:res.banner, 
           news:result, 
           home:'active', 
           follow:'', 
           column:'' 
         }); 
       } 
     }) 
   }) 
 
   return router; 
 }
```


[04\_Mysql\_Shop【瑞客论坛 www.ruike1.com】.pdf](<./file/04_Mysql_Shop【瑞客论坛 www.ruike1.com】_jAfuboNheO.pdf> "04_Mysql_Shop【瑞客论坛 www.ruike1.com】.pdf")

[04\_持久化\_mysql【瑞客论坛 www.ruike1.com】.pdf](<./file/04_持久化_mysql【瑞客论坛 www.ruike1.com】_OKZOou7JNf.pdf> "04_持久化_mysql【瑞客论坛 www.ruike1.com】.pdf")

[mysql安装文档\_mac【瑞客论坛 www.ruike1.com】.pdf](<./file/mysql安装文档_mac【瑞客论坛 www.ruike1.com】_3Kdr1Xr-Ia.pdf> "mysql安装文档_mac【瑞客论坛 www.ruike1.com】.pdf")

[mysql安装文档\_windows【瑞客论坛 www.ruike1.com】.pdf](<./file/mysql安装文档_windows【瑞客论坛 www.ruike1.com】_fmWFxtM4qb.pdf> "mysql安装文档_windows【瑞客论坛 www.ruike1.com】.pdf")
