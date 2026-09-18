# node-ts

## 目录

- [配置](#配置)

[09\_ts项目架构【瑞客论坛 www.ruike1.com】.pdf](<09_ts项目架构【瑞客论坛 www.ruike1.com】_5FqrkD5e-l.pdf> "09_ts项目架构【瑞客论坛 www.ruike1.com】.pdf")

[09\_装饰器【瑞客论坛 www.ruike1.com】.pdf](<09_装饰器【瑞客论坛 www.ruike1.com】_qN604xbDMD.pdf> "09_装饰器【瑞客论坛 www.ruike1.com】.pdf")

[补充材料【瑞客论坛 www.ruike1.com】.pdf](<补充材料【瑞客论坛 www.ruike1.com】_ZdRZOFfx1-.pdf> "补充材料【瑞客论坛 www.ruike1.com】.pdf")

类   class

接口  interfaces

模块 Modules

类型注解  type    annotations 装饰器

1. 装饰器：仅提供定义劫持
2. 注解  供附加原数据支持

编译时类型检查 Compile time type checking

箭头函数

**装饰器**

```纯文本 
 装饰器模式（Decorator Pattern）允 许向一个现有的对象添加新的功能，同时又不改变其结构。这种类型的 设计模式属于结构型模式，它是作为现有的类的一个包装 。 
 这种模式创建了一个装饰类，用来 包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功 能 。 
 我们通过下面的实例来演示装饰器模式的用法。其中，我们将把一个形状装饰上不同的颜色，同时又不改变 形状类。
```


# 配置

```纯文本 
 npm init -y      
 npm i typescript ts-node-dev tslint @types/node -D 
 
 启动脚本 
 "scripts": {     
     "start": "ts-node-dev ./src/index.ts -P tsconfig.json --no-cache",     
     "build": "tsc -P tsconfig.json && node ./dist/index.js",     
     "tslint": "tslint --fix -p tsconfig.json"  
 } 
 
 加入tsconﬁg.json 
 {     
     "compilerOptions": {         
         "outDir": "./dist",         
         "target": "es2017",         
         "module": "commonjs",         
         "sourceMap": true,         
         "moduleResolution": "node",         
         "experimentalDecorators": true,         
         "allowSyntheticDefaultImports": true,         
         "lib": ["es2015"],         
         "typeRoots": ["./node_modules/@types"],     
     },     
     "include": ["src/**/*"]  
 } 
 

```


demo  重点理解思想 ； 理解装饰器的作用；极大的简化了开发；相当的优雅

```纯文本 
 //util/decors.ts    主要作用是动态的注册 路由； 利用装饰器 和 高阶函数 极大简化的框架  
 
 import *  as glob from 'glob' 
 import * as Koa from 'koa' 
 import * as KoaRouter from 'koa-router' 
 
 type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch'; 
 
 type LoadOptions = {     
     /**      
      *  路由文件扩展名，默认值是`.{js,ts}`      
      */    
     extname?: string; 
 }; 
 
 type RouteOptions = {     
     /**      
      * 适用于某个请求比较特殊，需要单独制定前缀的情形     
      */    
     prefix?: string;     
     /**      
      * 给当前路由添加一个或多个中间件      
      */     
     middlewares?: Array<Koa.Middleware>; 
 }; 
 
 const router = new KoaRouter() 
 
 // const method = type =>(path:string,options?:RouteOptions)=>{ 
 //     return (target,property,descriptor)=>{ 
 //         // console.log('target:',target) 
 //         // console.log('property:',property) 
 //         // console.log('descriptor:',descriptor) 
 //         /** 
 //          * 这个地方 重点理解： 
 //          * target： User对象 类 
 //          * property: 被装饰的 对象/函数 
 //          * descriptor：被装饰的 对象的 配置； 类似Object.defineProperty 
 //          */ 
 //         const url = options && options.prefix ? options.prefix + path :path 
 //         router['get'](url,target[property]) 
 //     } 
 // } 
 /** 
 * router变量 不符合函数式编程引用透明的特点 对后面移植不利 
 * 所以要再次进行柯里化 
 */ 
 
 const decorate = (method:HTTPMethod,path:string,options:RouteOptions={},router:KoaRouter)=>{ 
      return (target,property,descriptor)=>{ 
         const url = options && options.prefix ? options.prefix + path :path 
         router['get'](url,target[property]) 
     } 
 } 
 export const method = method =>(path:string,options?:RouteOptions)=>decorate(method,path,options,router) 
 export const get = method('get') 
 export const post = method('post') 
 
 
 export const load = (folder:string,options:LoadOptions={}):KoaRouter=>{ 
      const extname = options.extname || '.{js,ts}' 
     glob.sync(require('path').join(folder,`./**/*${extname}`)) 
     .forEach(item => require(item)); 
     return router 
 } 
 
 
 
 
 //routes 
 
 import * as Koa from 'koa'; 
 import {get,post} from '../utils/route-decors' 
 
 const users = [ 
     { name: 'tom', age: 20 }, 
     { name: 'tom', age: 20 } 
 ]; 
 export default class User {     
      @get('/users')     
     public list(ctx: Koa.Context) {         
         ctx.body = { ok: 1, data: users };     
     } 
 
      @post('/users')      
     public add(ctx: Koa.Context) {         
         users.push(ctx.request.body);         
         ctx.body = { ok: 1 }     
     }    
 } 
 
 
 //index.js 
 
 import * as Koa from 'koa'; 
 import koaBody, * as bodify from 'koa-body'; 
 import * as serve from 'koa-static'; 
 import * as timing from 'koa-xtime'; 
 
 const app = new Koa() 
 
 app.use(timing()) 
 app.use(serve(`${__dirname}/public`)) 
 app.use(bodify({ 
     multipart:true, 
     strict:false, // 使用非严格模式，解析 delete 请求的请求体 
 })) 
 
 import {load} from './utils/route-decors' 
 import {resolve} from 'path' 
 const router = load(resolve(__dirname,'./routes')) 
 app.use(router.routes()) 
 
 app.listen(3000,()=>{ 
     console.log('服务启动3000') 
 })
```


实战：

[09.7z](09_6MOxG03j95.7z "09.7z")

[ts-decorate.7z](ts-decorate_ap7priO2u9.7z "ts-decorate.7z")
