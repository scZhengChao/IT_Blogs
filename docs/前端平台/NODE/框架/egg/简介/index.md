# 简介

[https://eggjs.org/zh-cn/](https://eggjs.org/zh-cn/ "https://eggjs.org/zh-cn/")

          官网  阿里系

[07\_eggjs\_mvc分层架构【瑞客论坛 www.ruike1.com】.pdf](<./assets/file/07_eggjs_mvc分层架构【瑞客论坛 www.ruike1.com】_7XXetYCxgn.pdf> "07_eggjs_mvc分层架构【瑞客论坛 www.ruike1.com】.pdf")

```纯文本 
 // 创建项目  脚手架 
 $ npm i egg-init -g  
 $ egg-init egg --type=simple  
 $ cd egg-example  
 $ npm i
```


[07.7z](./assets/file/07_n13Ymsxt26.7z "07.7z")

[https://cron.qqe2.com/](https://cron.qqe2.com/ "https://cron.qqe2.com/")

         在线corn 生产器  用于 定时任务；

关键在于 工程化和架构思想；

**添加SwaggerDoc功能：**

```纯文本 
 npm install egg-swagger-doc-feat -s 
 
 配置： 
    swaggerdoc : {   
       enable: true,   
       package: 'egg-swagger-doc-feat', 
    } 
 
 
   config.swaggerdoc = {     
       dirScanner: './app/controller',     
       apiInfo: {       
           title: '郑超',       
           description: '郑超 swagger-ui for egg',       
           version: '1.0.0',     
         },     
         schemes: ['http', 'https'],     
         consumes: ['application/json'],     
         produces: ['application/json'],     
         enableSecurity: false, 
         // enableValidate: true,     
         routerMap: true,     
         enable: true,   
  } 
 
 
 使用： 
 
 const Controller = require('egg').Controller 
 /** 
 * @Controller 用户管理 
 */ 
 class UserController extends Controller { 
   constructor(ctx) { 
     super(ctx) 
   } 
 
 
   /** 
    * @summary 创建用户 
    * @description 创建用户，记录用户账户/密码/类型 
    * @router post /api/user 
    * @request body createUserRequest *body 
    * @response 200 baseResponse 创建成功 
    */ 
   async create() { 
     const { ctx, service } = this 
     // 校验参数 
     ctx.validate(ctx.rule.createUserRequest) 
     // 组装参数 
     const payload = ctx.request.body || {} 
     // 调用 Service 进行业务处理 
     const res = await service.user.create(payload) 
     // 设置响应内容和响应状态码 
     ctx.helper.success({ctx, res}) 
   } 
 
 
 
 
   /** 
    * @summary 删除单个用户 
    * @description 删除单个用户 
    * @router delete /api/user/{id} 
    * @request path string *id eg:1 用户ID 
    * @response 200 baseResponse 创建成功 
    */ 
   async destroy() { 
     const { ctx, service } = this 
     // 校验参数 
     const { id } = ctx.params 
     // 调用 Service 进行业务处理 
     await service.user.destroy(id) 
     // 设置响应内容和响应状态码 
     ctx.helper.success({ctx}) 
   } 
 
 
   /** 
    * @summary 修改用户 
    * @description 获取用户信息 
    * @router put /api/user/ 
    * @response 200 baseResponse 创建成功 
    * @ignore 
    */ 
   async update() { 
     const { ctx, service } = this 
     // 校验参数 
     ctx.validate(ctx.rule.createUserRequest) 
     // 组装参数 
     const { id } = ctx.params 
     const payload = ctx.request.body || {} 
     // 调用 Service 进行业务处理 
     await service.user.update(id, payload) 
     // 设置响应内容和响应状态码 
     ctx.helper.success({ctx}) 
   } 
   /** 
    * @summary 获取单个用户 
    * @description 获取用户信息 
    * @router get /api/user/{id} 
    * @request url baseRequest 
    * @response 200 baseResponse 创建成功 
    */ 
   async show() { 
     const { ctx, service } = this 
     // 组装参数 
     const { id } = ctx.params 
     // 调用 Service 进行业务处理 
     const res = await service.user.show(id) 
     // 设置响应内容和响应状态码 
     ctx.helper.success({ctx, res}) 
   } 
 
 
    
   /** 
    * @summary 获取所有用户(分页/模糊) 
    * @description 获取用户信息 
    * @router get /api/user 
    * @request query integer *currentPage eg:1 当前页 
    * @request query integer *pageSize eg:10 单页数量 
    * @request query string search eg: 搜索字符串 
    * @request query boolean isPaging eg:true 是否需要翻页 
    * @response 200 baseResponse 创建成功 
    */ 
   async index() { 
     const { ctx, service } = this 
     // 组装参数 
     const payload = ctx.query 
     // 调用 Service 进行业务处理 
     const res = await service.user.index(payload) 
     // 设置响应内容和响应状态码 
     ctx.helper.success({ctx, res}) 
   } 
 
 
   /** 
    * @summary 删除所选用户 
    * @description 获取用户信息 
    * @router delete /api/user/{id} 
    * @request path string *id 
    * @response 200 baseResponse 创建成功 
    */ 
   async removes() { 
     const { ctx, service } = this 
     // 组装参数 
     // const payload = ctx.queries.id 
     const { id } = ctx.request.body 
     const payload = id.split(',') || [] 
     // 调用 Service 进行业务处理 
     const result = await service.user.removes(payload) 
     // 设置响应内容和响应状态码 
     ctx.helper.success({ctx}) 
   } 
 } 
 
 
 module.exports = UserController
```


[http://localhost:7001/swagger-ui.html](http://localhost:7001/swagger-ui.html "http://localhost:7001/swagger-ui.html")

![  ](./assets/image/ec08d2b21a98e1e19e7fc6002571a592_noUE4ImfYh.png "  ")

**增加异常处理中间件：**

    异常统一处理：

    开发环境返回详细异常信息

    生产环境不返回详细信息

```纯文本 
 // /middleware/error_handler.js 
 'use strict' 
 module.exports = (option, app) => { 
     return async function (ctx, next) { 
         try {      
              // 所有的next 都会被统一捕获 
             await next()    
 
 
         } catch (err) {      
              // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志       
             app.emit('error', err, this)       
             const status = err.status || 500       
             // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息       
             const error = status === 500 && app.config.env === 'prod' ?         
             'Internal Server Error' :         
             err.message       
             // 从 error 对象上读出各个属性，设置到响应中       
             ctx.body = {         
                 code: status, 
                 // 服务端自身的处理逻辑错误(包含框架错误500 及 自定义业务逻辑错误533开 始 ) 客户端请求参数导致的错误(4xx开始)，设置不同的状态码         
                 error: error       
             }       
             if (status === 422) {       //用户定义型错误    
                 ctx.body.detail = err.errors       
             }       
             ctx.status = 200     
         }   
     } 
 }
```


**helper方法实现统一响应格式 Helper 函数用来提供一些实用的 utility 函数**

它的作用在于我们可以将一些常用的动作抽离在 helper.js 里面成为一个独立的函数，

这样可以用 JavaScript 来写复杂的逻辑，避免逻辑分散各处。

另外还有一个好处是 Helper 这样一个简单的函数，可以让我们更容易 编写测试用例。 

框架内置了一些常用的 Helper 函数。我们也可以编写自定义的 Helper 函数。

```纯文本 
 // extend/helper.js    注意这是约定 手动去挂载的地方；可以理解是框架帮你做了；不能换名字； 
 const moment = require('moment')     
 // 格式化时间   
 exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')     
 // 处理成功响应   
 exports.success = ({ ctx, res = null, msg = '请求成功' })=> {     
     ctx.body = {       
         code: 0,       
         data: res,       
         msg     
     }     
     ctx.status = 200 
 }
```


**Validate检查**

```纯文本 
 // config/plugin.js  
 validate: {     
     enable: true,     
     package: 'egg-validate',  
 }, 
 //校验参数 这个地方要小心了； 不想把校验放的到处都是，希望统一位置；  结合了 前面swagger 的 format 的参数在源码中的定义；这是一种创新； 
 ctx.validate(ctx.rule.createUserRequest)
```


**添加Model层**

```纯文本 
 npm install egg-mongoose -s 
 // plugin.js 
 mongoose : {   
     enable: true,   
     package: 'egg-mongoose',  
 }, 
 
 // config.default.js  
 config.mongoose = {     
     url: 'mongodb://127.0.0.1:27017/egg_x',     
     options: {       
         // useMongoClient: true,       
         autoReconnect: true,       
         reconnectTries: Number.MAX_VALUE,       
         bufferMaxEntries: 0,     
     },   
 } 
 // model/user.js 
 module.exports = app => {   
     const mongoose = app.mongoose   
     const UserSchema = new mongoose.Schema({     
         mobile: { type: String, unique: true, required: true },    
         password: { type: String, required: true },     
         realName: { type: String, required: true },     
         avatar: { type: String, default: 'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm'},     
         extra: { type: mongoose.Schema.Types.Mixed },     
         createdAt: { type: Date, default: Date.now }   
     })   
     return mongoose.model('User', UserSchema) 
 } 
 
 
 
 
 // service 
 const service = require('egg').Service 
 
 class UserService extends service { 
     constructor(){ 
 
     } 
     /** 
      * 创建用户 
      * @param {*} payload 
      */ 
     async create(payload){ 
         const { ctx} = this 
         payload.password  = await this.ctx.genHash(payload.password) 
         console.log(payload.password) 
         return ctx.model.User.create(payload) 
     } 
 } 
 
 
 //control 
 
    const payload = ctx.request.body || {} 
    const res = await service.user.create(payload)
```


**添加Service层**

```纯文本 
 npm install egg-bcrypt -s  加密 
 
 // plugin.js 
 bcrypt : {     
     enable: true,     
     package: 'egg-bcrypt'   
 } 
 
 const service = require('egg').Service 
 
 
 
 // 注意这个地方不要加constructor 也不要加super  否则会报错 
 class UserService extends service { 
      
     /** 
      * 创建用户 
      * @param {*} payload 
      */ 
     async create(payload){ 
         const { ctx} = this 
          payload.password  = await this.ctx.genHash(payload.password) 
          console.log(payload.password) 
         return ctx.model.User.create(payload) 
     } 
 } 
 
 module.exports  = UserService
```


**生命周期 初始化数据**

```纯文本 
 /** 
 *  全局定义 
 * @param app 
 */ 
 根目录   app.js   https://eggjs.org/en/basics/app-start.html#mobileAside 
   
 class AppBootHook { 
     constructor(app) { 
         this.app = app; 
         app.root_path = __dirname; 
     } 
     configWillLoad() { 
         // Ready to call configDidLoad, 
         // Config, plugin files are referred, 
         // this is the last chance to modify the config. 
     } 
     configDidLoad() { 
         // Config, plugin files have been loaded. 
     } 
     async didLoad() { 
         // All files have loaded, start plugin here. 
     } 
     async willReady() { 
         // All plugins have started, can do some thing before app ready 
     } 
     async didReady() { 
         // Worker is ready, can do some things 
         // don't need to block the app boot. 
         console.log('========Init Data=========') 
         const ctx = await this.app.createAnonymousContext(); 
         await ctx.model.User.remove(); 
         await ctx.service.user.create({ 
             mobile: '13611388415', 
             password: '111111', 
             realName: '老夏', 
         }) 
     } 
     async serverDidReady() { 
 
     } 
 
     async beforeClose() { 
         // Do some thing before app close. 
     } 
 } 
 
 module.exports = AppBootHook; 

```


**用户鉴权模块 jwt**

```纯文本 
 npm i egg-jwt -s 
 
 jwt: {   
         enable: true,   
         package: 'egg-jwt', 
     } 
 
 config.jwt = {     
      secret: 'Great4-M',     
      enable: true, // default is false 
      match: /^\/api/,  // optional  什么时候检查你 鉴权 相当于 一个表明但 
 } 
 
 
   
 // service/actionToken.js   生成token 
 const { Service } = require('egg') 
 class ActionTokenService extends Service { 
     async apply(_id) { 
         const { ctx } = this 
         return ctx.app.jwt.sign({ 
             data: { 
                 _id: _id 
             }, 
             exp: Math.floor(Date.now() / 1000 + (60 * 60 * 7)) 
         }, ctx.app.config.jwt.secret) 
     } 
 
 
 } 
 module.exports = ActionTokenService 
 
 
 //service/userAccess.js    给user_id  加token  和  token 解除 user 
 const  Service = require('egg').Service 
 
 class UserAccessService extends Service { 
     async login(payload){ 
         const { ctx,service} = this 
         const user = await service.user.findByMobile(payload.mobile) 
         if(!user){ 
             ctx.throw(404,'user not found') 
         } 
         let verifyPsw = await ctx.compare(payload.password,user.password) 
         if(!verifyPsw){ 
             ctx.throw(404,'user password is error ') 
         } 
         // 生成token 
         return {token: await service.actionToken.apply(user._id) } 
     } 
     async logout() { 
     } 
     async current(){  //jtw 解析出 user 
         const { ctx, service } = this 
         // ctx.state.user 可以提取到JWT编码的data 
         const _id = ctx.state.user.data._id 
         const user = await service.user.find(_id) 
         if (!user) { 
             ctx.throw(404, 'user is not found') 
         } 
         user.password = 'How old are you?' 
         return user 
     } 
 } 
 module.exports = UserAccessService 
 
 // controller/userAccess.js 
 'use strict' 
 const Controller = require('egg').Controller 
 /** 
 * @Controller 用户鉴权 
 */ 
 class UserAccessController extends Controller { 
   constructor(ctx) { 
     super(ctx) 
   } 
   /** 
    * @summary 用户登入 
    * @description 用户登入 
    * @router post /auth/jwt/login 
    * @request body loginRequest *body 
    * @response 200 baseResponse 创建成功 
    */ 
   async login() { 
     const { ctx, service } = this 
     // 校验参数 
     ctx.validate(ctx.rule.loginRequest); 
     // 组装参数 
     const payload = ctx.request.body || {} 
     // 调用 Service 进行业务处理 
     const res = await service.userAccess.login(payload) 
     // 设置响应内容和响应状态码 
     ctx.helper.success({ ctx, res }) 
   } 
 
   /** 
    * @summary 用户登出 
    * @description 用户登出 
    * @router post /auth/jwt/logout 
    * @request body loginRequest *body 
    * @response 200 baseResponse 创建成功 
    */ 
   async logout() { 
     const { ctx, service } = this 
     // 调用 Service 进行业务处理 
     await service.userAccess.logout() 
     // 设置响应内容和响应状态码 
     ctx.helper.success({ ctx }) 
   } 
 } 
 
 module.exports = UserAccessController
```


**静态资源  约定在public 下**

[http://localhost:7001/public/index.html](http://localhost:7001/public/index.html "http://localhost:7001/public/index.html")

**文件上传**

```纯文本 
 npm i await-stream-ready stream-wormhole image-downloader -s 
 
 // app/controller/upload.js 
 const fs = require('fs') 
 const path = require('path') 
 const Controller = require('egg').Controller 
 const awaitWriteStream = require('await-stream-ready').write 
 const sendToWormhole = require('stream-wormhole') 
 const download = require('image-downloader') 
 /** 
 * @Controller 上传 
 */ 
 class UploadController extends Controller { 
     constructor(ctx) { 
         super(ctx) 
     } 
 
 
     // 上传单个文件 
     /** 
      * @summary 上传单个文件 
      * @description 上传单个文件 
      * @router post /api/upload/single 
      */ 
     async create() { 
         const { ctx } = this 
         // 要通过 ctx.getFileStream 便捷的获取到用户上传的文件，需要满足两个条件： 
         // 只支持上传一个文件。 
         // 上传文件必须在所有其他的 fields 后面，否则在拿到文件流时可能还获取不到 fields。 
         const stream = await ctx.getFileStream() 
         // 所有表单字段都能通过 `stream.fields` 获取到 
         const filename = path.basename(stream.filename) // 文件名称 
         const extname = path.extname(stream.filename).toLowerCase() // 文件扩展名称 
         const uuid = (Math.random() * 999999).toFixed() 
 
 
         // 组装参数 stream 
         const target = path.join(this.config.baseDir, 'app/public/uploads', `${uuid}${extname}`) 
         const writeStream = fs.createWriteStream(target) 
         // 文件处理，上传到云存储等等 
         try { 
             await awaitWriteStream(stream.pipe(writeStream)) 
         } catch (err) { 
             // 必须将上传的文件流消费掉，要不然浏览器响应会卡死 
             await sendToWormhole(stream) 
             throw err 
         } 
         // 调用 Service 进行业务处理 
         // 设置响应内容和响应状态码 
         ctx.helper.success({ ctx }) 
     } 
 } 
 
 module.exports = UploadController
```


[egg-best.7z](./assets/file/egg-best_xPCvC9pmei.7z "egg-best.7z")

[egg-server.7z](./assets/file/egg-server_So8849G1sW.7z "egg-server.7z")
