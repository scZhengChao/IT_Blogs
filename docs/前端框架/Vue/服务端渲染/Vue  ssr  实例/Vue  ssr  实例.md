# Vue  ssr  实例

[https://ssr.vuejs.org/zh/](https://ssr.vuejs.org/zh/ "https://ssr.vuejs.org/zh/")

   官网  这里不是nuxt框架 而是原生 + webpack + 后端实现的； 详细参考官网

**新建工程**

    vue create ssr    vue脚手架版本尽量高

**安装依赖**

    npm&#x20;

install vue-server-renderer express

\--save    渲染插件和express 服务器

**启动脚本**

```纯文本 
 //这是最简单的例子没有什么实用 
 //随便在src 建立一个app.js 
 const express = require('express') 
 const Vue = require('vue') 
 const app = express() 
 const renderer = require('vue-server-renderer').createRenderer()  //生成一个render实例 
 // 页面 
 const page = new Vue({  //page 页面 
     data: { 
         name: '开课吧', 
         count: 1 
     }, 
     template: ` 
         <div > 
         <h1>{{name}}</h1> 
         <h1>{{count}}</h1> 
         </div> 
     ` 
 }) 
 app.get('/', async function (req, res) { 
     // renderToString可以将vue实例转换为html字符串 
     const html = await renderer.renderToString(page) 
     res.send(html) 
 }) 
 app.listen(3000, () => { 
     console.log('启动成功') 
 })
```


**构建步骤**

webpack根据执行环境生成server bundle和client bundle

![  ](85392b44fca699b795226a9f47914bdb_iYFTjPKN_Y.png "  ")

**路由 Vue-router**

        单页应用的页面路由，都是前端控制，后端只负责提供数据

        一个简单的单页应用，使用vue-router,为了方便前后端公用路由数据，我们新建router.js 对外暴露createRouter

```纯文本 
 npm i vue-router -s 
 // router.js   工厂函数； 每次访问都创建一个全新的 router 和 vuex 等 
     import Vue from 'vue' 
     import Router from 'vue-router' 
     import Index from './components/Index' 
     import Kkb from './components/Kkb' 
     Vue.use(Router) 
     export function createRouter() { 
         return new Router({ 
             routes: [ 
                 { path: "/", component: Index }, 
                 { path: "/kkb", component: Kkb }, 
                 // ... 
             ] 
         }) 
     } 
 
 // src/ components /Index.vue   组件 
 <template> 
     <div> 
         <h1>hi {{name}}</h1> 
     </div> 
 </template> 
 <script> 
     export default { 
         data() { 
             return { 
                 name: '首页' 
             } 
         } 
     } 
 </script> 
 // src/components/Kkb.vue    组件 
 <template> 
     <div> 
         <h1>hi {{name}}</h1> 
     </div> 
 </template> 
 <script> 
     export default { 
         data() { 
             return { 
                 name: '开课吧' 
             } 
         } 
     } 
 </script> 
 //app.vue  跟组件  
 <template> 
     <div id="app"> 
         <img alt="Vue logo" src="./assets/logo.png"> 
         <ul> 
             <li> 
                 <router-link to="/">首页</router-link> 
             </li> 
             <li> 
                 <router-link to="/kkb">开课吧</router-link> 
             </li> 
         </ul> 
         <router-view></router-view> 
     </div> 
 </template> 
 <script> 
 export default { 
     name:'app' 
 } 
 </script>
```


**csr 和ssr统一入口**

```纯文本 
 //这个地方关键来了： 统一入口 服务端和客户端统一 还是工厂函数 createapp   src/createapp.js  app.js  统一入口     
 import Vue from 'vue' 
 import App from './App.vue' 
 import { createRouter } from './router' 
 export function createApp(context) { 
     const router = createRouter() 
     const app = new Vue({ 
         router, 
         context, 
         render: h => h(App) 
     }) 
     return { app, router } 
 } 
 
 //csr的入口文件main.js   src/main.js   client-entry 
 import { createApp } from './createapp' 
 const { app, router } = createApp() 
 router.onReady(() => { 
     app.$mount('#app') 
 }) 
 //ssr的入口文件entry-server.js  src/entry-server.js  server-entry 
 import { createApp } from './src/createapp' 
 export default context => { 
     // 我们返回一个 Promise 
     // 确保路由或组件准备就绪 
     return new Promise((resolve, reject) => { 
         const { app, router } = createApp(context)// 跳转到首屏的地址 
         router.push(context.url) 
         router.onReady(() => { 
             resolve(app) 
         }, reject) 
     }) 
 }
```


**后端加入webpack**

```纯文本 
 npm install cross-env vue-server-renderer webpack-node-externals lodash.merge --save 
 其中最重要的时 vue-server-renderer  vue的服务端渲染     
 
 
 
 // vue.config.js 具体配置 
 //两个渲染插件 
 const VueSSRServerPlugin = require("vue-server-renderer/server-plugin"); 
 const VueSSRClientPlugin = require("vue-server-renderer/client-plugin"); 
 const nodeExternals = require("webpack-node-externals"); 
 const merge = require("lodash.merge"); 
 // 环境变量的判断 时服务端还是客户端 
 const TARGET_NODE = process.env.WEBPACK_TARGET === "node"; 
 const target = TARGET_NODE ? "server" : "client"; 
 module.exports = { 
     css: { 
         extract: false 
     }, 
     configureWebpack: () => ({ 
         // 将 entry 指向应用程序的 server / client 文件  入口文件 
         entry: TARGET_NODE ? `./src/entry-${target}.js` : './src/main.js', 
         // 对 bundle renderer 提供 source map 支持 
         devtool: 'source-map', 
         target: TARGET_NODE ? "node" : "web", 
         node: TARGET_NODE ? undefined : false, 
         // 输出 
         output: { 
             // 输出格式 
             libraryTarget: TARGET_NODE ? "commonjs2" : undefined 
         }, 
         // https://webpack.js.org/configuration/externals/#function 
         // https://github.com/liady/webpack-node-externals 
         // 外置化应用程序依赖模块。可以使服务器构建速度更快， 
         // 并生成较小的 bundle 文件。 
         externals: TARGET_NODE 
             ? nodeExternals({ 
                 // 不要外置化 webpack 需要处理的依赖模块。 
                 // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件， 
                 // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单 
                 whitelist: [/\.css$/] 
             }) 
             : undefined, 
         optimization: { 
             splitChunks: undefined 
         }, 
         // 动态插件指令 
         plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()] 
     }), 
     // 链式的 配置vue-loader 
     chainWebpack: config => { 
         config.module 
             .rule("vue") 
             .use("vue-loader") 
             .tap(options => { 
                 merge(options, { 
                     optimizeSSR: false 
                 }); 
             }); 
     } 
 };
```


**服务器启动文件，server.js**

```纯文本 
 const fs = require("fs"); 
 const express = require('express') 
 const app = express() 
 // 开放dist目录 
 app.use(express.static('./dist')) 
 // 第 2 步：获得一个createBundleRenderer 
 const { createBundleRenderer } = require("vue-server-renderer"); 
 const bundle = require("./dist/vue-ssr-server-bundle.json"); 
 const clientManifest = require("./dist/vue-ssr-client-manifest.json"); 
 const renderer = createBundleRenderer(bundle, { 
     runInNewContext: false, 
     template: fs.readFileSync("./src/index.temp.html", "utf-8"), 
     clientManifest: clientManifest 
 }); 
 function renderToString(context) { 
     return new Promise((resolve, reject) => { 
         renderer.renderToString(context, (err, html) => { 
             resolve(html); 
         }); 
     }); 
 } 
 app.get('*', async (req, res) => { 
     console.log(req.url, 123) 
     const context = { 
         title: 'ssr test', 
         url: req.url 
     } 
     const html = await renderToString(context); 
     res.send(html) 
 }) 
 const port = 3001; 
 app.listen(port, function () { 
     console.log(`server started at localhost:${port}`); 
 });
```


**宿主文件**

**注意注释的格式必须这么写**

```纯文本 
 <!DOCTYPE html> 
 <html lang="en"> 
 
 <head> 
     <meta charset="utf-8"> 
     <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
     <meta name="viewport" content="width=device-width,initial-scale=1.0"> 
     <title>Document</title> 
 </head> 
 <body> 
     <!--vue-ssr-outlet--> 
 </body> 
 </html>
```


**脚本配置**

```纯文本 
 // package.json 
 "scripts": { 
     "serve": "vue-cli-service serve", 
     "build:client": "vue-cli-service build", 
     "build:server": "cross-env WEBPACK_TARGET=node vue-cli-service build --mode server", 
     "build": "npm run build:server && mv dist/vue-ssr-server-bundle.json bundle && npm 
     run build:client && mv bundle dist/vue-ssr-server-bundle.json", 
     "lint": "vue-cli-service lint" 
 },
```


**整合Vuex**

```纯文本 
 //store.js 
 import Vue from 'vue' 
 import Vuex from 'vuex' 
 Vue.use(Vuex) 
 export function createStore() { 
     return new Vuex.Store({ 
         state: { 
             count: 108 
         }, 
         mutations: { 
         }, 
         actions: { 
         } 
     }) 
 } 
 //挂载store，createapp.js 
 // src/createapp.js 
 import Vue from 'vue' 
 import App from './App.vue' 
 import { createRouter } from './router' 
 import { createStore } from './store' 
 // 创建新的实例 创建新的 路由； 渲染新的app 
 export function createApp(context) { 
     const router = createRouter() 
     const store = createStore() 
     const app = new Vue({ 
         router, 
         store, 
         context, 
         render: h => h(App) 
     }) 
     return { app, router } 
 } 
 //使用 
 // src/components/Kkb.vue 
 <h2>num:{{$store.state.count}}</h2>
```


ssr记得先跑 npm run build

[https://segmentfault.com/a/1190000020249126](https://segmentfault.com/a/1190000020249126 "https://segmentfault.com/a/1190000020249126")

  参考博客
