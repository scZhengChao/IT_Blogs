# nuxt

\*\*nuxt 渲染流程：   \*\*​

[**https://zh.nuxtjs.org/**](https://zh.nuxtjs.org/ "https://zh.nuxtjs.org/")

\*\*   官网\*\*​

\*\*   有点像生命周期\*\*​

![  ](./assets/image/4f64dfd65f3ba5c0d27e739a5a11c3e2_-tY9Mfdtyq.png "  ")

**nuxt安装**

**运行**

**create-nuxt-app**

**npx create-nuxt-app <项目名>**

```纯文本 
 npx  相当于 npm 安装并且执行当前命令：  两个命令的结合
```


**路由  pages**

    路由生成

    pages

目录中所有

&#x20;\*.vue&#x20;

文件自动生成应用的路由配置， 

**index 就 是 匹配  ‘/ ’**

新建：

    pages/detail.vue

详情页

    pages/cart.vue

购物车页

    pages/admin.vue

商品管理页

    pages/login.vue 登录页

```纯文本 
 你要记住 所有的页面外面都有一 层布局页 包着它 layouts     
 
 
 动态路由 
     例如： _id? 
       以下划线作为前缀的 .vue文件 或 目录会被定义为动态路由，如下面文件结构  
 pages/ 
 --| detail/ 
 ----| _id.vue 
 
 以下图示： ？ 表示可选参数； 想要必选 在_id的同级 建立index.vue
```


![  ](./assets/image/23cde4d9f5603a7bec2cd8082a4404c2_WiM9O1lxOC.png "  ")

![  ](./assets/image/f8bd65931ce5278e32eed53aadffdabb_4hkn_IoqDr.png "  ")

![  ](./assets/image/ff5cdbf8c3f2bbb7220551bd7dcf92b1_sjaC6iOr5x.png "  ")

**导航**

添加路由导航，

**layouts/default.vue布局页**

     \<nav>

        \<nuxt-link&#x20;

to

\=

"/"

\>首页\</nuxt-link>

        \<!--

别名：

n-link

，

NLink

，

NuxtLink-->

        \<NLink&#x20;

to

\=

"/admin"

\>管理\</NLink>

        \<n-link&#x20;

to

\=

"/cart"

\>购物车\</n-link>

    \</nav>

```纯文本 
 上面都都会预加载 进来；  可以主动禁止 
 禁用预加载：  <n-link no-prefetch>page not pre-fetched</n-link>
```


**商品列表，index.vue**

```纯文本 
 <template> 
     <div> 
         <h2>商品列表</h2> 
         <ul> 
             <li v-for="good in goods" :key="good.id" > 
                <!-- 注意这里的写法 --> 
               <nuxt-link :to="`/detail/${good.id}`"> 
                  <span>{{good.text}}</span> 
                 <span>￥{{good.price}}</span> 
                 <button @click.prevent="addCart(good)">加购物车</button> 
             </nuxt-link> 
             </li> 
         </ul> 
     </div> 
 </template> 
 <script> 
 export default { 
 data() { 
 return { goods: [ 
     {id:1, text:'Web全栈架构师',price:8999}, 
     {id:2, text:'Python全栈架构师',price:8999}, 
 ] } 
 }, 
 methods: { 
     addCart(){} 
     } 
 }; 
 </script>
```


**嵌套路由**

![  ](./assets/image/e895fc29706cc0d7f76d91f34b939005_Mt1Bjr9mxh.png "  ")

![  ](./assets/image/e8ef73b1eb882a21c7fbedbda1d0b5c3_Wuo83dQBlv.png "  ")

![  ](./assets/image/88a68a042daa74cd18210a1e00a302ef_Qdcm3MoUSj.png "  ")

```纯文本 
 创建内嵌子路由，你需要添加一个  .vue 文件， 同时添加一个与 该文件同名的目录用来存放子视图组件 。 
 构造文件结构如下： 
 pages/ 
 --| index/ 
 ----| _id.vue 
 --| index.vue 
 注意上图三种写法；  且必须变成对象的写法  且 必须有name来指定  不然params id 会拦截一切子路由 
 
 剩下路由的扩展 在  nuxt.config.js  router中 可参考官网  https://zh.nuxtjs.org/guide/routing
```


**视图   layout**

下图展示了

Nuxt.js

如何为指定的路由配置数据和视图

![  ](./assets/image/3d089f0c09274856618147a900237260_fZHSLaSGdb.png "  ")

```纯文本 
 根据 页面灵活的选择 视图布局layout 
 默认布局 
     查看 layouts/default.vue     
     <template> 
         <nuxt/> 
     </template> 
 自定义布局 
     创建空白布局页面 layouts/blank.vue ，用于login.vue 
     <template> 
         <div> 
             <nuxt /> 
         </div> 
     </template> 
     页面 pages/login.vue 使用自定义布局： 
     export default { 
           layout: 'blank' 
     } 
 自定义错误页面（error 页面props 为自动传进来的） 
 <template> 
     <div class="container"> 
         <h1 v-if="error.statusCode === 404">页面不存在</h1> 
         <h1 v-else>应用发生错误异常</h1> 
         <nuxt-link to="/">首 页</nuxt-link> 
     </div> 
 </template> 
 <script> 
     export default { 
         props: ['error'] 
     } 
 </script> 
 
 https://zh.nuxtjs.org/guide/views     更多详细解释 看官网
```


![  ](./assets/image/13e431c38b3cade30b057d896460bc73_h7uGeFKC0O.png "  ")

![  ](./assets/image/f38e157714f46ef9703788c8d38f3583_d8VMJXFWeC.png "  ")

![  ](./assets/image/e97bd949375111a2076feeb5ea0b466a_W1xbHdUTzz.png "  ")

**页面（个人觉得 大头部分）pages**

**页面组件就是 Vue 组件，只不过 Nuxt.js 为这些组件添加了一些特殊的配置项**

\*\*    给首页添加标题和meta等，index.vue\*\*​

```纯文本 
 比如：  和 vue 原本的还是有点不同 
 export default { 
     head() { 
         return { 
             title: "课程列表", 
             meta: [{ name: "description", hid: "description", content: "set page meta" }], 
             link: [{ rel: "favicon", href: "favicon.ico" }], 
         }; 
     }, 
     data() { 
         return { 
             goods: [ 
                 {id:1, text:'Web全栈架构师',price:8999}, 
                 {id:2, text:'Python全栈架构师',price:8999}, 
             ] 
         } 
     }, 
     methods: { 
         addCart(){} 
     } 
 };
```


[https://zh.nuxtjs.org/guide/views#%E9%A1%B5%E9%9D%A2](https://zh.nuxtjs.org/guide/views#%E9%A1%B5%E9%9D%A2 "https://zh.nuxtjs.org/guide/views#%E9%A1%B5%E9%9D%A2")

   官网地址

![  ](./assets/image/410330b1fc085257ca3c2eaabcba49d2_dRBVcBbpEJ.png "  ")

**异步数据获取   pages**

```纯文本 
 asyncData 方法使得我们可以在 设置组件数据之前异步获取或处理数据（如果是首屏：在服务端直接请求；而不是在客户端）但是：并不是说这个里面的请求就一定是在服务端；也可以在客户端 
 注意： 
     1.asyncData  仅限于页面组件（其他组件没有） 在每次加载之前调用 
     2.asyncData 可以在服务端或路由跟新之前调用 
     3.第一个 参数被设定为当前页面的上下文对象 
     4.nuxt会将组件 asyncData和data返回数据融合（且优先级较高；如果有重复的 优先取asyncData的返回值覆盖data的返回值） 
     5.asyncData在组件初始化之前调用，所以 不能通过this引用组件实例
```


范例：获取商品数据

\*\*接口准备  \*\*​

**//此处 作为一个 api 正常的服务器；我只是没有新建文件夹分开 ； 正式项目 这个是后端同学的事和nuxt无关**

安装依赖： npm i koa-router koa-bodyparser -S

创建接口文件，server/api.js

```纯文本 
 const Koa = require('koa'); 
 const app = new Koa(); 
 const bodyparser = require("koa-bodyparser"); 
 const router = require("koa-router")({ prefix: "/api" }); 
 // 设置cookie加密秘钥 
 app.keys = ["some secret", "another secret"]; 
 const goods = [ 
     { id: 1, text: "Web全栈架构师", price: 1000 }, 
     { id: 2, text: "Python架构师", price: 1000 } 
 ]; 
 router.get("/goods", ctx => { 
     ctx.body = { 
         ok: 1, 
         goods 
     }; 
 }); 
 router.get("/detail", ctx => { 
     ctx.body = { 
         ok: 1, 
         data: goods.find(good => good.id == ctx.query.id) 
     }; 
 }); 
 router.post("/login", ctx => { 
     const user = ctx.request.body; 
     if (user.username === "jerry" && user.password === "123") { 
         // 将token存入cookie 
         const token = 'a mock token'; 
         ctx.cookies.set('token', token); 
         ctx.body = { ok: 1, token }; 
      } else { 
         ctx.body = { ok: 0 }; 
     } 
 }); 
 // 解析post数据并注册路由 
 app.use(bodyparser()); 
 app.use(router.routes()); 
 app.listen(8080, () => console.log('api服务已启动'))
```


![  ](./assets/image/d2c1829b67de0f21a832c64648135f3f_TGr6788r0i.png "  ")

```纯文本 
 整合axios 
 安装@nuxt/axios模块： npm install @nuxtjs/axios -S 
 
 配置：nuxt.config.js 
 modules: [ 
     '@nuxtjs/axios', 
 ], 
 axios: { 
     proxy: true 
 }, 
 proxy: { 
     "/api": "http://localhost:8080" 
 },
```


```纯文本 
 测试代码：获取商品列表，index.vue 
 <script> 
 export default { 
     async asyncData({ $axios, error,$router }) { 
          // 1.运行时间实在组件创建前，this不能用 
         // 2.nuxt传递上下文进来 
         // 3. axios 和平常的axios 不一样； 直接把resulte的data 截取返回回来 
         const {ok, goods} = await $axios.$get("/api/goods"); 
         if (ok) { 
                         // 此处返回的数据会和data中的数据合并 
             return { goods }; 
         }  
         // 重定向到错误页面  这里貌似是 layout中error 的props 传参 
         error({ statusCode: 400, message: "数据查询失败" }); 
     }, 
 }  
 </script> 
 测试代码：获取商品详情，/index/_id.vue 
 <template> 
     <div> 
         <pre v-if="goodInfo">{{goodInfo}}</pre> 
     </div> 
 </template> 
 <script> 
 export default { 
     async asyncData({ $axios, params, error }) { 
         if (params.id) { 
             // asyncData中不能使用this获取组件实例 
             // 但是可以通过上下文获取相关数据 
             const { data: goodInfo } = await $axios.$get("/api/detail", { params }); 
             if (goodInfo) { 
                 return { goodInfo }; 
             }  
             error({ statusCode: 400, message: "商品详情查询失败" }); 
         } else { 
             return { goodInfo: null }; 
         } 
     } 
 }; 
 </script>
```


中间件    middleware

\*\*    有点类似全局路由守卫  和 单个的路由首位\*\*​

    中间件会在一个页面或一组页面渲染之前运行我们定义的函数，常用于权限控制、校验等任务。

```纯文本 
 范例代码：管理员页面保护，创建middleware/auth.js 
 export default function({ route, redirect, store }) { 
     // 上下文中通过store访问vuex中的全局状态 
     // 通过vuex中令牌存在与否判断是否登录 
     if (!store.state.user.token) { 
         redirect("/login?redirect="+route.path); 
     } 
 }
```


注册中间件，admin.vue

```纯文本 
 单个组件注册： 组件里 
 <script> 
 export default { 
     middleware: ['auth'] 
 } 
 </script> 
 全局注册： nuxt.config.js 
   router: { 
     // middleware: [auth] 
     extendRoutes (routes, resolve) { 
       routes.push({ 
         name: 'custom', 
         path: '*', 
         component: resolve(__dirname, 'pages/404.vue') 
       }) 
     } 
   },
```


状态管理 store

    应用根目录下如果存

在

**store 目录**

，

Nuxt.js将

**启**

**用vuex状态树**

。

定义各状态树时

**具名导出state, mutations,getters, actions**

即可。（其他的均有框架实现）

范例：用户登录及登录状态保存，创建store/user.js

```纯文本 
 //以user为命名空间 有点类似 vuex 的 moudles     其他的vuex 实例 有nuxt 实现 
 export const state = () => ({ 
     token: '' 
 }); 
 export const mutations = { 
     init(state, token) { 
         state.token = token; 
     } 
 }; 
 export const getters = { 
     isLogin(state) { 
         return !!state.token; 
     } 
 }; 
 export const actions = { 
     login({ commit, getters }, u) { 
             //利用nuxt提供的inject方法注入$login  this指的是store实列 
         return this.$login(u).then(({ token }) => { 
             if (token) { 
                 commit("SET_TOKEN", token); 
             } 
             return getters.isLogin; 
         }); 
     } 
 }; 
 
 / / 组件中调用 
     methods: { 
       onLogin() { 
             // user/login 
          this.$store.dispatch("user/login", this.user).then(ok =>  { 
           if (ok) { 
             const redirect = this.$route.query.redirect || "/"; 
             this.$router.push(redirect); 
           } 
         }); 
       } 
     }
```


**插件：plugins**

Nuxt.js会在

**运行应用之前执行插件函数**

，需要引入或

**设置Vue插件、自定义模块**

和

**第三方模块**

时特

别有用。（只调用一次）

```纯文本 
 范例代码：接口注入，利用插件机制将服务接口注入组件实例、store实例中，创建plugins/api-inject.js 
 这个地方时插件中的注入；解释了上面的this.$login 
 // 参数一上下文，参数二 inject 函数 ； 
 //  inject 调用时 要加$login 
 // 如果逻辑比较复杂 和 可以抽出去，然后导入放这里就行 
 export default ({$axios},inject)=>{ 
     inject('login',user=>{ 
         return $axios.$post('/api/login',user) 
     }) 
 } 
 注册插件，nuxt.config.js 
 plugins: [ 
     "@/plugins/api-inject" 
 ],
```


```纯文本 
 登录页面逻辑，login.vue 
 <template> 
     <div> 
       <h2>用户登录</h2> 
       <el-input v-model="user.username"></el-input> 
       <el-input type="password" v-model="user.password"></el-input> 
       <el-button @click="onLogin">登录</el-button> 
     </div> 
   </template> 
    
   <script> 
   export default { 
     layout: "blank", 
     data() { 
       return { 
         user: { 
           username: "", 
           password: "" 
         } 
       }; 
     }, 
     methods: { 
       onLogin() { 
         this.$store.dispatch("user/login", this.user).then(ok => { 
           if (ok) { 
             const redirect = this.$route.query.redirect || "/"; 
             this.$router.push(redirect); 
           } 
         }); 
       } 
     } 
   }; 
   </script> 
 //范例：添加请求拦截器附加token，创建plugins/interceptor.js  还是一个插件的使用  这个时候没有inject 不一定非要注入 
 export default function({ $axios, store }) { 
      //请求拦截器 并不是axios的原生api 记住 一定要区分开 
     $axios.onRequest(config => { 
         if (store.state.user.token) { 
             // 附件到请求头 
             config.headers.Authorization = "Bearer " + store.state.user.token; 
         }  
         return config; 
     }); 
 } 
 注册插件，nuxt.config.js 
 plugins: ["@/plugins/interceptor"]
```


\*\*nuxtServerInit   \*\*​

**类似nuxt 的调用时机 生命周期 可以看到 他很早甚至比middleware还早**

**通过在**

**store的根模块（index）**

**中定义**

**nuxtServerInit 方**

**法，将**

**服务端的一些数据传到客户端。**

```纯文本 
 范例：登录状态初始化，store/index.js 
 export const actions = { 
     //  第一个参数就是 action 里面的第一个参数  store对象 ， 第二个参数是组件上下文实例 
     //  必须声明在跟模块 也就是index 中 
     //  在服务端运行 且只运行一次 ； 所以要在服务端取到客户端的cookie 所以用这个插件 
     nuxtServerInit({ commit }, { app }) { 
          //   app  vue 实例   
          // $cookie 被 cookie-universal-nuxt  插件挂上去的  不管是前台cookie还是后台的都可以收到      
         const token = app.$cookies.get("token"); 
         if (token) { 
             console.log("nuxtServerInit: token:"+token); 
             commit("user/SET_TOKEN", token); 
         } 
     } 
 }; 
 安装依赖模块：cookie-universal-nuxt     无差别的处理cookie服务端的也可以用到 
 npm i -S cookie-universal-nuxt 
 注册, nuxt.config.js 
 modules: ["cookie-universal-nuxt"], 

```


**发布部署**

\*\*    服务端渲染应用部署\*\*​

\*\*    先进行编译构建，然后再启动 Nuxt 服务\*\*​

```纯文本 
 我们跑的就是server  而不是以前的vue那样；  写的就是服务器 
 npm run build   // 打包 
 npm start    // 启动服务
```


**静态应用部署**

**就是不怎么动态的首屏静态渲染**

\*\*    Nuxt.js 可依据路由配置将应用静态化，使得我们可以将应用部署至任何一个静态站点主机服务商。\*\* ​

```纯文本 
 // 理解 静态应用 类似静态资源css js 图片的 资源 ；直接加载  适用于不怎么改动的页面 
 npm run generate 
 注意： 执行该命令时：渲染服务器和 api 接口服务器 都必须处于启动状态  生成内容在dist中 更目录dist中而不是在.nuxt的dist
```


[前言](IT/前端框架/Vue/服务端渲染/nuxt/前言/前言.md "前言")
