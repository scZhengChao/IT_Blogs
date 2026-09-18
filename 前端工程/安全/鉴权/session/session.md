# session

**1.下面使用了 redis cookie session 去保存状态来鉴权；**

```纯文本 
 但是不是最好的方式： 
     缺点： 在node 开启多进程 内存虽然可以共享；但是方式不太好； 
           利用cookie保持一个状态；但是cookie 是浏览器的一个机制；不能适配所有； 
           跨域问题；虽然可以解决 ； 
         但是综合上面的问题；实在不是很方便； 是一种老旧的方式；应该被淘汰了 
 
 const Koa = require('koa') 
 const router = require('koa-router')() 
 const session = require('koa-session') 
 const cors = require('koa2-cors') 
 const bodyParser = require('koa-bodyparser') 
 const static = require('koa-static') 
 const app = new Koa(); 
 
 //配置session的中间件 
 app.use(cors({ 
     credentials: true 
 })) 
 app.keys = ['some secret']; 
 
 app.use(static(__dirname + '/')); 
 app.use(bodyParser()) 
 app.use(session(app)); 
 
 app.use((ctx, next) => { 
     if (ctx.url.indexOf('login') > -1) { 
         next() 
     } else { 
         console.log('session', ctx.session.userinfo) 
         if (!ctx.session.userinfo) { 
             ctx.body = { 
                 message: "登录失败" 
             } 
         } else { 
             next() 
         } 
     } 
 }) 
 
 router.post('/login', async (ctx) => { 
     const { 
         body 
     } = ctx.request 
     console.log('body',body) 
     //设置session 
     ctx.session.userinfo = body.username; 
     ctx.body = { 
         message: "登录成功" 
     } 
 }) 
 router.post('/logout', async (ctx) => { 
     //设置session 
     delete ctx.session.userinfo 
     ctx.body = { 
         message: "登出系统" 
     } 
 }) 
 router.get('/getUser', async (ctx) => { 
     ctx.body = { 
         message: "获取数据成功", 
         userinfo: ctx.session.userinfo 
     } 
 }) 
 
 app.use(router.routes()); 
 app.use(router.allowedMethods()); 
 app.listen(3000); 
 
 html 
 <html> 
 <head> 
   <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script> 
   <script src="https://unpkg.com/axios/dist/axios.min.js"></script> 
 </head> 
 
 <body> 
   <div id="app"> 
     <div> 
       <input v-model="username"> 
       <input v-model="password"> 
     </div> 
     <div> 
       <button v-on:click="login">Login</button> 
       <button v-on:click="logout">Logout</button> 
       <button v-on:click="getUser">GetUser</button> 
     </div> 
     <div> 
       <button onclick="document.getElementById('log').innerHTML = ''">Clear Log</button> 
     </div> 
   </div> 
   <h6 id="log"></h6> 
   </div> 
   <script> 
     // axios.defaults.baseURL = 'http://localhost:3000' 
     axios.defaults.withCredentials = true 
     axios.interceptors.response.use( 
       response => { 
         document.getElementById('log').append(JSON.stringify(response.data)) 
         return response; 
       } 
     ); 
     var app = new Vue({ 
       el: '#app', 
       data: { 
         username: 'test', 
         password: 'test' 
       }, 
       methods: { 
         async login() { 
           await axios.post('/login', { 
             username: this.username, 
             password: this.password 
           }) 
         }, 
         async logout() { 
           await axios.post('/logout') 
         }, 
         async getUser() { 
           await axios.get('/getUser') 
         } 
       } 
     }); 
   </script> 
 </body> 
 </html>
```
