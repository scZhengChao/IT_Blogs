# mongoose

```纯文本 
 ------------- https://www.npmjs.com/package/mongodb   -- node--mongod -------相当于数据库中间件------ 
 
 nodejs + mongodb 
   1.  require('mongodb'); 引入模块  第三方模块 
   2.  创建客户端 mongoCt = mongodb.MongoClient 
   3.  创建链接  mongoCt.connect('协议://地址:端口',回调(err,client)) 
   3.5 链库    client.db('库名') 
   4.  链接集合（表) user = db.collection('集合名'); 
   5.  user.API()  表操作   返回 对象 
     one === 1  Many 多个 
 
     insertOne(对象数据,(err,res)=>{})  res = 对象  res.result 结果 
     insertMany(arr数据,(err,res)=>{}) res = 对象  res.result 结果 
 
     deleteOne({条件},(err,res)=>{})  res = 对象  res.result 结果 
     deleteMany({条件},(err,res)=>{}) res = 对象  res.result 结果 
 
     updateOne({条件},{更新后},(err,res)=>{}) 
     updateMany({条件},{更新后},(err,res)=>{}) 
       updateMany({条件},{更新后},{配置},(err,res)=>{}) 
       配置: upsert:true 插入 
           projection:true 全局替换 
 
     user.find({条件},{配置}).toArray((err,result)=>{reulst==arr}) 
 
     projection:{name:1} 
     limit:3 
     sort: 1 
     skip: 2 
 
 (node:2240) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. 
 To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect. 
 
 
 -------------------------- http://www.mongoosejs.net/docs/index.html ---mongoose------ 
 // mg 封装 
 const mongoose = require('mongoose');//引入对象 
 var config = require('../config/config') 
 const collections = require('../schema/index') 
 const Schema = mongoose.Schema 
 let collectionObj = {} 
 module.exports=(options,callback)=>{ 
   // 通用 
   options=options||{}; 
   options.dbUrl=options.url|| config.dbUrl; 
   options.autoIndex = options.autoIndex || config.autoIndex; 
   // Never stop trying to reconnect 
   options.reconnectTries =options.reconnectTries || config.reconnectTries; 
   // Reconnect every 500ms 
   options.reconnectTries = options.reconnectTries || config.reconnectInterval; 
   // Maintain up to 10 socket connections  链接池限制 
   options.poolSize = options.poolSize || config.poolSize; 
   // If not connected, return errors immediately rather than waiting for reconnect 
   options.bufferMaxEntries = options.bufferMaxEntries || config.bufferMaxEntries; 
   options.keepAlive = options.keepAlive || config.keepAlive; 
   options.connectTimeoutMS = options.connectTimeoutMS || config.connectTimeoutMS; //链接超时 
   options.bufferCommands = options.bufferCommands || config.bufferCommands; //禁止缓存 
   options.useNewUrlParser = true 
   options.useUnifiedTopology = true 
   if(!options.dbName) return 
   if(!options.collectionName || !collections[options.collectionName]) return 
   let collection; 
   if(collectionObj[options.collectionName]){ 
     collection = collectionObj[options.collectionName] 
   }else{ 
     collection =  
     mongoose.model(options.collectionName,new Schema(collections[options.collectionName])) 
     collectionObj[options.collectionName] = collection 
   } 
   mongoose.connect(options.dbUrl+"/"+options.dbName,options,(err)=>{ 
     if(err){ 
       console.log("连接数据库失败"); 
       return; 
     } 
     console.log('连接数据库成功') 
     let handle = { 
         //1.增 
         //1）插入多条数据：单个数据可以是json对象，多个数据放在数组中； 
         insertMany: function (aryjson, callback) { 
             collection.insertMany(aryjson, function (err, docs) { 
                 callback(err, docs); 
             }) 
         }, 
         //2.删 
         //1）删除满足条件的一条数据： 
         deleteOne: function (filter, callback) { 
             collection.deleteOne(filter, function (err, doc) { 
                 callback(err, doc); 
             }) 
         }, 
         //2）删除满足条件的所有数据： 
         deleteMany: function (filter, callback) { 
             collection.deleteMany(filter, function (err, doc) { 
                 callback(err, doc); 
             }) 
         }, 
         //3.改 
         //1）修改满足条件的一条数据： 
         updateOne: function (filter, updatejson, callback) { 
             collection.updateOne(filter, updatejson, function (err, doc) { 
                 callback(err, doc); 
             }) 
         }, 
         //2）修改满足条件的多条数据： 
         updateMany: function (filter, updatejson, callback) { 
             collection.updateMany(filter, updatejson, function (err, doc) { 
                 callback(err, doc); 
             }) 
         }, 
         //4.查 
         //1）查找，排序，分页 
         find:function (filter, sortcur, callback) { 
             //sortcur:{"sort":{"age":-1},page,pageamount} 
             if(arguments.length===2){ 
                 callback=sortcur; 
                 sortcur={}; 
             } 
             var sort=sortcur.sort || {}; 
             var page=Number(sortcur.page) || 0; 
             var pageamount=Number(sortcur.pageamount) || 0; 
             collection.find(filter,function (err,docs) { 
                 callback(err,docs); 
             }).sort(sort).limit(pageamount).skip(page*pageamount); 
         }, 
         //2）获取满足条件的数据总个数 
         count:function (filter, callback) { 
             collection.countDocuments(filter,function (err, count) { 
                 callback(err,count); 
             }) 
         } 
     } 
     callback(handle) 
   }) 
 } 
 //schema 
 module.exports = { 
     name:String, 
     age:String, 
     sex:String, 
     adress:  String, 
     like: String, 
     class:String 
 } 
 // index.js  
 const classes  = require('./classes') 
 const students = require('./students') 
 const uplog = require('./uplog') 
 const user = require('./user') 
 module.exports ={ 
     classes,students,uplog,user 
 }
```


再次认识mongose

***

```纯文本 
 const mongoose = require("mongoose"); 
 
 // 1.连接 
 mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true }); 
 
 const conn = mongoose.connection; 
 conn.on("error", () => console.error("连接数据库失败")); 
 conn.once("open", async () => { 
   // 2.定义一个Schema - Table 
   const Schema = mongoose.Schema({ 
     category: String, 
     name: String 
   }); 
 
   // 3.编译一个Model, 它对应数据库中复数、小写的Collection 
   const Model = mongoose.model("fruit", Schema); 
   try { 
     // 4.创建，create返回Promise 
     let r = await Model.create({ 
       category: "温带水果", 
       name: "苹果", 
       price: 5 
     }); 
     console.log("插入数据:", r); 
 
     // 5.查询，find返回Query，它实现了then和catch，可以当Promise使用 
     // 如果需要返回Promise，调用其exec() 
     // r = await Model.find({ name: "苹果" }); 
     // console.log("查询结果:", r); 
 
     // // 6.更新，updateOne返回Query 
     // r = await Model.updateOne({ name: "苹果" }, { $set: { name: '芒果' } }); 
     // console.log("更新结果：", r); 
 
     // // 7.删除，deleteOne返回Query 
     // r = await Model.deleteOne({ name: "苹果" }); 
     // console.log("删除结果：", r); 
 
     const blogSchema = mongoose.Schema({ 
         title: { type: String, required: [true, '标题为必填项'] }, // 定义校验规则 
         author: String, 
         body: String, 
         comments: [{ body: String, date: Date }], // 定义对象数组 
         date: { type: Date, default: Date.now }, // 指定默认值 
         hidden: Boolean, 
         meta: { 
           // 定义对象 
           votes: Number, 
           favs: Number 
         } 
     }) 
 
      // 定义实例方法 
     blogSchema.methods.findByAuthor = function (author) { 
         return this.model('blog').find({ author: this.author }).exec(); 
     } 
 
     // 静态方法 
     blogSchema.statics.findByAuthor = function(author) { 
         return this.model("blog") 
           .find({ author }) 
           .exec(); 
       }; 
 
       // 虚拟属性 
       blogSchema.virtual("commentsCount").get(function() { 
         return this.comments.length; 
       }); 
     const BlogModel = mongoose.model('blog',blogSchema) 
     await BlogModel.deleteMany({}) 
     const blog = new BlogModel({ 
         title:'nodejs持久化', 
         author:'jerry', 
         body:'....', 
         comments:[ 
             {body:'haha',} 
         ] 
     }) 
     r = await blog.save() 
 
     r = await blog.findByAuthor(); 
     console.log("findByAuthor", r); 
       
     // 静态方法 
     r=await BlogModel.findByAuthor('jerry') 
     console.log('findByAuthor', r); 
 
     // 虚拟属性 
     r = await BlogModel.findOne({author:'jerry'}) 
     console.log('blog留言数:',r.commentsCount) 
 }catch(e){ 
     console.log('e',e.message) 
 } 
    
 }); 
 
 
 可以参考class2 05 代码 把一个项目工程化，自动化，项目架构更加优雅的思路；另 keyStone 了解 
 const fs = require('fs') 
 const path = require('path') 
 const mongoose = require("mongoose") 
 const config = require('../config') 
 
 
 function load(dir, cb) { 
     // 获取绝对路径 
     const url = path.resolve(__dirname, dir) 
     const files = fs.readdirSync(url) 
     files.forEach(filename => { 
         // 去掉后缀名 
         filename = filename.replace('.js', '') 
         // 导入文件 
         const file = require(url + '/' + filename) 
         // 处理逻辑 
         cb(filename, file) 
     }) 
 } 
 function loadModel(app) { 
     mongoose.connect(config.db.url, config.db.options); 
     const conn = mongoose.connection 
     conn.on("error", () => console.error("连接数据库失败")) 
      app.$model = {}  // 尽量的避免 污染全局变量 window。global 
     load('../model', (filename, { schema }) => { 
         console.log('load model: ' + filename, schema) 
         app.$model[filename] = mongoose.model(filename, schema) 
     }) 
 } 
 
 module.exports = { 
     loadModel 
 } 
 
 routers   结合apis看；一种很好的思想； 
 const router = require('koa-router')() 
 const { 
     init, get, create, update, del, 
 } = require('./api') 
 
 router.get('/api/:list', init, get) 
 router.post('/api/:list', init,create) 
 router.put('/api/:list/:id', init, update) 
 router.delete('/api/:list/:id', init, del) 
 
 module.exports = router.routes() 
 
 
 apis 
 module.exports = { 
     async init(ctx, next) { 
         console.log(ctx.params) 
         const model = ctx.app.$model[ctx.params.list] 
         if (model) { 
             ctx.list = model 
             await next() 
         } else { 
             ctx.body = 'no this model' 
         } 
     }, 
     async get(ctx) { 
         ctx.body = await ctx.list.find({}) 
     }, 
     async create(ctx) { 
         const res = await ctx.list.create(ctx.request.body) 
         ctx.body = res 
     }, 
     async update(ctx) { 
         const res = await ctx.list.updateOne({ _id: ctx.params.id }, ctx.request.body) 
         ctx.body = res 
     }, 
     async del(ctx) { 
         const res = await ctx.list.deleteOne({ _id: ctx.params.id }) 
         ctx.body = res 
     }, 
     async page(ctx) { 
         console.log('page...', ctx.params.page) 
         ctx.body = await ctx.list.find({})/*  */ 
     }, 
 } 
 
 index.js 
 const Koa = require('koa') 
 const app = new Koa() 
 const restful = require('./framework/router') 
 const bodyParser = require('koa-bodyparser') 
 const { loadModel } = require('./framework/loader') 
 
 
 // 初始化数据库 
 loadModel(app) 
 
 app.use(bodyParser()) 
 app.use(require('koa-static')(__dirname + '/')) 
 app.use(restful) 
 
 const port = 3000 
 app.listen(port,() => { 
     console.log(`app started at port ${port}...`) 
 }) 
 

```
