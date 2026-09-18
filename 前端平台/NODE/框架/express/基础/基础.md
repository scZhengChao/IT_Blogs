# 基础

```纯文本 
 路由(router):  告诉你去哪 
     前端：导向 路由就告诉你应该去哪 
     后端: 子服务    一个路由就是一个小的服务(server/app) 
 
 
     创建路由 
         router = express.Router();  返回路由对象 
         server.use('地址,接口',router); 响应的处理过程给了router(子服务) 
 
 
         处理过程： 
         router.get('/',fn) 
         router.get('/1',fn) 
         router.get('/2',fn)
```


```纯文本 
 app.js   express 
 //响应 
 app.use('/banner', require('./routes/banner.js')); 
 app.use('/dujia', require('./routes/dujia.js')); 
 app.use('/news', require('./routes/news.js')); 
 app.use('/reg', require('./routes/reg.js')); 
 app.use('/login', require('./routes/login.js')); 
 app.use('/user', require('./routes/user.js')); 
 app.use('/logout', require('./routes/logout.js')); 
 app.use('/car', require('./routes/car.js'));
```


```纯文本 
 路由内部 
 let express = require('express'); 
 let router = express.Router(); 
 let mg = require('./mymg') 
 //象印 
 router.get('/', (req,res,next) => { 
      // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);//允许当前跨域 
 //读库 
 mg({ 
      dbname: 'vue', 
      collectionName:'banner' 
 }, (collection,client) => { 
           collection.find({}).toArray((err,data) => { 
                if (data.length > 0) { 
                     res.send(data) 
                } else { 
                     res.send({ error: 1, msg: err }) 
                     client.close() 
                } 
            }) 
      }) 
 }) 
 module.exports = router
```
