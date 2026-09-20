# koa源码分析

[https://koa.bootcss.com/](https://koa.bootcss.com/ "https://koa.bootcss.com/")

     express  原班人马打造

[02\_koa2源码解读【瑞客论坛 www.ruike1.com】.pdf](<02_koa2源码解读【瑞客论坛 www.ruike1.com】_qK1e2U3lws.pdf> "02_koa2源码解读【瑞客论坛 www.ruike1.com】.pdf")

致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序

。

**一：中间件原理**

**1.高阶函数**

```纯文本 
 const add = (x,y)=>x+y 
 const square = z=>z*z 
  // const fn = (x,y)=>square(add(x,y)) 
  // const compose = (fn1,fn2)=>(...args)=>fn2(fn1(...args)) 
 const compose = (...[first,...others])=>(...args)=>{ 
      let ret = first(...args) 
      others.forEach(fn=>{ 
          ret = fn(ret) 
      }) 
      return ret 
 } 
 const fn = compose(add,square) 
 console.log(fn(1,2)) 
 

```


进一步扩展

**2.经典compose；虽然没有redux实现的那么优雅；**

```纯文本 
 // 进一步   虽然没有redux 那么优雅；但是非常的经典啊；66 
 function compose(middlewares){ 
     return function(){ 
         return dispatch(0) 
         function dispatch(i){ 
             let fn = middlewares[i] 
             if(!fn){ 
                 return Promise.resolve() 
             } 
             return Promise.resolve( 
                 fn(function(next){   //这个地方就是闭包，递归 就是next 就是执行下一个中间件；理解了对源码原理很有帮助 
                     return dispatch(i+1) 
                 }) 
             ) 
         } 
     } 
 } 
 
 async function fn1(next){ 
     console.log('fn1') 
     await next() 
     console.log('end fn1') 
 } 
 
 async function fn2(next){ 
     console.log('fn2') 
     await delay() 
     await next() 
     console.log('end fn2') 
 } 
 
 function fn3(next){ 
     console.log('fn3') 
 } 
 
 function delay(){ 
     return Promise.resolve(res => { 
         setTimeout(() => reslove(),2000) 
     }) 
 } 
 const middlewares = [fn1,fn2,fn3] 
 const finalFn = compose(middlewares) 
 finalFn() 
 // 输出： 
 // fn1 
 // fn2 
 // fn3 
 // end fn2 
 // end fn1
```


**图解：**

![  ](afdceb9aac0c3d76e3fdf5532ed2fb0d_6EBP3VjtOz.png "  ")

**3.洋葱圈的实现**

```纯文本 
 //KKB.js 
 const http = require('http') 
 const context = require('./context') 
 const request = require('./request') 
 const response = require('./response') 
 class KKb{ 
     //初始化中间件数组 
     constructor(){ 
         this.middlewares = [] 
     } 
     listen(...args){ 
         const server = http.createServer( async (req,res)=>{ 
             // 构建上下文 
             const ctx = this.createContext(req,res) 
 
 
             //合成中间件 
             const fn = this.compose(this.middlewares) 
 
 
             await fn(ctx) 
 
 
 
 
             // this.callback(req,res) 
             // this.callback(ctx) 
              
             // 响应 
             res.end(ctx.body) 
         }) 
         server.listen(...args) 
     } 
     // use(callback){ 
     //     this.callback = callback 
     // } 
     use(middleware){ 
         this.middlewares.push(middleware) 
     } 
     //构建上下文 
     createContext(req,res){ 
         const ctx = Object.create(context) 
         ctx.request = Object.create(request) // ctx.request.__proto__ = request 
         ctx.response = Object.create(response) 
         ctx.req = ctx.request.req = req; 
         ctx.res = ctx.response.res = res 
         return ctx 
     } 
     // 合成函数 
     compose(middlewares){ 
         return function(ctx){ 
             return dispatch(0) 
             function dispatch(i){ 
                 let fn = middlewares[i] 
                 if(!fn){ 
                     return Promise.resolve() 
                 } 
                 return Promise.resolve( 
                     fn(ctx,function(next){ 
                         return dispatch(i+1) 
                     }) 
                 ) 
      
             } 
         } 
     } 
 } 
 module.exports = KKb 
 
 
 
 //app.js 
 const KKB = require('./kkb') 
 const app = new KKB() 
 // app.use((req,res)=>{ 
 //     res.writeHead(200) 
 //     res.end('hi kaikeba') 
 // }) 
 // app.use((ctx)=>{ 
 //     ctx.body = 'zc hahahha' 
 // }) 
 
 
 const delay = () => Promise.resolve(resolve => setTimeout(() => resolve(), 2000)); 
 
 
 app.use(async (ctx, next) => { 
     ctx.body = "1"; 
     await next(); 
     ctx.body += "5"; 
 }); 
 
 
 app.use(async (ctx, next) => { 
     ctx.body += "2"; 
     await delay(); 
     await next(); 
     ctx.body += "4"; 
 }); 
 
 
 app.use(async (ctx, next) => { 
     ctx.body += "3"; 
 }); 
 
 
 app.listen(3000, () => { 
     console.log('listenning at 3000') 
 })
```


**二:router 路由原理 和vue-router 有点类似**

**图解：**

![  ](d26dfe7a92433b9bba9ed845638eca29_UZGxqvOxIS.png "  ")

```纯文本 
 //生成一个路由表 
 class Router { 
     constructor() { 
       this.stack = []; 
     } 
    
     register(path, methods, middleware) { 
       let route = {path, methods, middleware} 
       this.stack.push(route); 
     } 
     // 现在只支持get和post，其他的同理 
     get(path,middleware){ 
       this.register(path, 'get', middleware); 
     } 
     post(path,middleware){ 
       this.register(path, 'post', middleware); 
     } 
     routes() { 
       let stock = this.stack; 
       return async function(ctx, next) { 
         let currentPath = ctx.url; 
         let route; 
    
         for (let i = 0; i < stock.length; i++) { 
           let item = stock[i]; 
           if (currentPath === item.path && item.methods.indexOf(ctx.method) >= 0) { 
             // 判断path和method 
             route = item.middleware; 
             break; 
           } 
         } 
    
         if (typeof route === 'function') { 
           route(ctx, next); 
           return; 
         } 
    
         await next(); 
       }; 
     } 
   } 
   module.exports = Router; 
 
 
 //app.js  原本也就是一个中间件 
 const Router = require('./router') 
 const router = new Router() 
 
 router.get('/index', async ctx => { ctx.body = 'index page'; }); 
 router.get('/post', async ctx => { ctx.body = 'post page'; }); 
 router.get('/list', async ctx => { ctx.body = 'list page'; }); 
 router.post('/index', async ctx => { ctx.body = 'post page'; }); 
 
 // 路由实例输出父中间件 router.routes() 
 app.use(router.routes());
```


**三 ：static 模块**

```纯文本 
 // static.js 
 const fs = require("fs"); 
 const path = require("path"); 
 
 
 module.exports = (dirPath = "./public") => { 
   return async (ctx, next) => { 
     if (ctx.url.indexOf("/public") === 0) { 
       // public开头 读取文件 
       const url = path.resolve(__dirname, dirPath); 
       const fileBaseName = path.basename(url); 
       
       const filepath = url + ctx.url.replace("/public", ""); 
       console.log(filepath); 
       // console.log(ctx.url,url, filepath, fileBaseName) 
       try { 
         stats = fs.statSync(filepath); 
         if (stats.isDirectory()) { 
             console.log('文件夹  目录') 
           const dir = fs.readdirSync(filepath); 
           // const 
           const ret = ['<div style="padding-left:20px">']; 
           // 拼装目录 
           dir.forEach(filename => { 
             console.log(filename); 
             // 简单认为不带小数点的格式，就是文件夹，实际应该用statSync 
             if (filename.indexOf(".") > -1) { 
               ret.push( 
                 `<p><a style="color:black" href="${ 
                   ctx.url 
                 }/${filename}">${filename}</a></p>` 
               ); 
             } else { 
               // 文件 
               ret.push( 
                 `<p><a href="${ctx.url}/${filename}">${filename}</a></p>` 
               ); 
             } 
           }); 
           ret.push("</div>"); 
           ctx.body = ret.join(""); 
         } else { 
           console.log("文件"); 
 
 
           const content = fs.readFileSync(filepath); 
           ctx.body = content; 
         } 
       } catch (e) { 
         // 报错了 文件不存在 
         ctx.body = "404, not found"; 
       } 
     } else { 
       // 否则不是静态资源，直接去下一个中间件 
       await next(); 
     } 
   }; 
 }; 
 
 
 //app.js   也就是中间件 
 const static = require('./static') 
 app.use(static(__dirname + '/public'));
```
