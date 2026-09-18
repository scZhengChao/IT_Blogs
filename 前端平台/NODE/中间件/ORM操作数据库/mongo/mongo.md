# mongo

```纯文本 
 1.monogdb 
 let mongodb = require('mongodb') 
 let mongoClient = mongodb.MongoClient; 
 
 module.exports = (options, callback) => { 
     options = options || {} 
     options.url = options.url || 'mongodb://127.0.0.1:27017'; 
     options.dbName = options.dbName || null 
     options.collectionName = options.collectionName || null 
     mongoClient.connect(options.url, (err, client) => { 
         const db = client.db(options.dbName); 
         const collection = db.collection(options.collectionName) 
         callback(collection,client) 
     }) 
 } 
 使用： 
 var express = require('express'); 
 var router = express.Router(); 
 var mg = require('./mg') 
 /* GET home page. */ 
 router.get('/', function(req, res, next) { 
     mg({ 
         url: 'mongodb://127.0.0.1:27017', 
         dbName: 'zc', 
         collectionName:'user' 
     }, (collection,client) => { 
         collection.find({ 
             username:req.query.username, 
             password:req.query.password, 
         }). toArray((err, data) => { 
             if (data.length > 0) { 
                 res.send(data[0]) 
             } else { 
                 res.send({ err: 1, msg: '用户名或密码错误' }) 
             } 
              
         }) 
     }) 
 }); 
 
 
 router.post('/', function(req, res, next) { 
     console.log('ajx-post',req.body) 
 }); 
 module.exports = router;
```


```纯文本 
 2.mongoose 
 const mongoose = require('mongoose');//引入对象 
 var config = require('../config').mongodb_config 
 const collections = require('./schema/index') 
 const Schema = mongoose.Schema 
 let collectionObj = {} 
 // mongoose  配置 
 let mongooseOptions = {} 
 mongooseOptions.autoIndex = config.autoIndex; 
 mongooseOptions.poolSize = config.poolSize; // Maintain up to 10 socket connections  链接池限制 
 mongooseOptions.bufferMaxEntries = config.bufferMaxEntries; 
 mongooseOptions.keepAlive =  config.keepAlive; 
 mongooseOptions.connectTimeoutMS =  config.connectTimeoutMS; //链接超时 
 mongooseOptions.bufferCommands = config.bufferCommands; //禁止缓存 
 mongooseOptions.useNewUrlParser = true 
 mongooseOptions.useUnifiedTopology = true 
 
 
 module.exports=(options,callback,next)=>new Promise((resolve,reject)=>{ 
     // 传入 业务需求配置 
     options= options || {}; 
     options.dbUrl = options.dbUrl || config.dbUrl // 数据库地址 
     if(!options.dbName) reject('没有数据库') 
     if(!options.collectionName && !collections[options.collectionName]) reject('必须传入集合名') 
     let collection; 
     let handle = { 
         //1.增 
         //1）插入多条数据：单个数据可以是json对象，多个数据放在数组中； 
         insertMany: function (aryjson, callback) { 
             try{ 
                 collection.insertMany(aryjson, function (err, docs) { 
                     try{ 
                         callback(err, docs); 
                     }catch(err){ 
                         next(err) 
                     } 
                 }) 
             }catch(err){ 
                 next(err) 
             }    
         }, 
         //2.删 
         //1）删除满足条件的一条数据： 
         deleteOne: function (filter, callback) { 
             try{ 
                 collection.deleteOne(filter, function (err, doc) { 
                     try{ 
                         callback(err, doc); 
                     }catch(err){ 
                         next(err) 
                     } 
                 }) 
             }catch(err){ 
                 next(err) 
             }    
         }, 
         //2）删除满足条件的所有数据： 
         deleteMany: function (filter, callback) { 
             try{ 
                 collection.deleteMany(filter, function (err, doc) { 
                     try{ 
                         callback(err, doc); 
                     }catch(err){ 
                         next(err) 
                     } 
                 }) 
             }catch(err){ 
                 next(err) 
             } 
         }, 
         //3.改 
         //1）修改满足条件的一条数据： 
         updateOne: function (filter, updatejson, callback) { 
             try{ 
                 collection.updateOne(filter, updatejson, function (err, doc) { 
                     try{ 
                         callback(err, doc); 
                     }catch(err){ 
                         next(err) 
                     } 
                 }) 
             }catch(err){ 
                 next(err) 
             } 
         }, 
         //2）修改满足条件的多条数据： 
         updateMany: function (filter, updatejson, callback) { 
             try{ 
                 collection.updateMany(filter, updatejson, function (err, doc) { 
                     try{ 
                         callback(err, doc); 
                     }catch(err){ 
                         next(err) 
                     } 
                 }) 
             }catch(err){ 
                 next(err) 
             } 
         }, 
         //4.查 
         //1）查找，排序，分页 
         find:function (filter, sortcur, callback) { 
             //sortcur:{"sort":{"age":-1},page,pageamount} 
             try{ 
                 if(arguments.length===2){ 
                     callback=sortcur; 
                     sortcur={}; 
                 } 
                 // throw new Error('我想抛出错误') 
                 var sort=sortcur.sort || {}; 
                 var page=Number(sortcur.page) || 0; 
                 var pageamount=Number(sortcur.pageamount) || 0; 
                 collection.find(filter,function (err,docs) { 
                     try{ 
                         callback(err,docs); 
                     }catch(err){ 
                         next(err) 
                     } 
                 }).sort(sort).limit(pageamount).skip(page*pageamount); 
             }catch(err){ 
                 next(err) 
             } 
         }, 
         //2）获取满足条件的数据总个数 
         count:function (filter, callback) { 
             try{ 
                 collection.countDocuments(filter,function (err, count) { 
                     try{ 
                         callback(err,count); 
                     }catch(err){ 
                         next(err) 
                     } 
                 }) 
             }catch(err){ 
                 next(err) 
             } 
         } 
     } 
     if(collectionObj[options.collectionName]){ 
         collection = collectionObj[options.collectionName] 
         try{ 
             callback(handle) 
         }catch(err){ 
             next(err) 
         }    
          
     }else{ 
         collection = mongoose.model(options.collectionName,new Schema(collections[options.collectionName])) 
         mongoose.connect(options.dbUrl+"/"+options.dbName,mongooseOptions,(err)=>{ 
             if(err) reject('数据路链接失败') 
             collectionObj[options.collectionName] = collection 
             console.log('连接数据库成功:'+options.dbName +':'+options.collectionName) 
             try{ 
                 callback(handle) 
             }catch(err){ 
                 next(err) 
             }        
         }) 
     } 
     const con = mongoose.connection 
     con.on('connected', function () { 
         console.log('Mongoose connected') 
     }) 
     con.on('disconnected', function () { 
         console.log('Mongoose disconnected') 
     }) 
     con.on('error', (err) => { 
         console.log('err:' + err); 
     }) 
     resolve(handle) 
 
 
 }).catch(err=>{ 
     next(new Error(err)) 
 }) 使用: 
 
 let config = require('../../config') 
 let jwt =  require('jsonwebtoken') 
 const { setItem,redisClient} = require('../../redis') 
 var login =(mg)=>(req,res,next)=>{   
     mg({ 
         dbName:'vue_pm', 
         collectionName:'users' 
     }, (handle) => { 
         handle.find({name:req.body.user,password:req.body.password},(err,data) => { 
                 if(err) throw err 
                 if (data.length > 0) { 
                     let payload = { 
                         user:req.body.user, 
                         limit:'all' 
                     } 
                     let secretOrPrivateKey = config.jwtsecret 
                     let token = jwt.sign(payload, secretOrPrivateKey, { 
                         // expiresIn: 60*60*1  // 1小时过期 
                     }); 
                     setItem(req.body.user,token,3600) 
                     responseClient(res,{token:token}) 
                 } else { 
                     responseClient(res,{token:'当前账户和密码不正确'},300) 
                 } 
                  
             }) 
              
     },next) 
 } 
 module.exports = login; 
 

```
