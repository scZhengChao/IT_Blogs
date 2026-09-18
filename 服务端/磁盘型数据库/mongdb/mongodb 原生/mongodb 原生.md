# mongodb 原生

[05\_持久化\_mongo【瑞客论坛 www.ruike1.com】.pdf](<05_持久化_mongo【瑞客论坛 www.ruike1.com】_eoVPbPiKdL.pdf> "05_持久化_mongo【瑞客论坛 www.ruike1.com】.pdf")

[mac\_mongodb安装及配置说明【瑞客论坛 www.ruike1.com】.pdf](<mac_mongodb安装及配置说明【瑞客论坛 www.ruike1.com】_kGqzx0X0VN.pdf> "mac_mongodb安装及配置说明【瑞客论坛 www.ruike1.com】.pdf")

[windows\_mongodb安装及配置说明【瑞客论坛 www.ruike1.com】.pdf](<windows_mongodb安装及配置说明【瑞客论坛 www.ruike1.com】_Jzsj92.pdf> "windows_mongodb安装及配置说明【瑞客论坛 www.ruike1.com】.pdf")

```纯文本 
 https://www.runoob.com/nodejs/nodejs-mongodb.html     --- 菜鸟教程  node +mogodb 
 https://www.cnblogs.com/baiboy/p/11014650.html    ---- 很详细 
 
 -------------------------------------------------命令行操作------------------------------------------ 
 库操作: 
     查: show dbs 
       db 查看当前库 
     建:  use 库名  没有建，有就切换 
     删: db.dropDatabase()  删除当前库 
   集合(表)操作: 
     建：db.createCollection('表名',{配置}) 
       配置：{size:文件大小,capped:true,max:条数|文档数} capped定量 
       db.表(集合).isCapped() 返回 true/false 是否是定量 
     查：show collections / db.getCollectionNames() 
     删：db.表|集合.drop() 
   文档(row)操作: 
     增： 
       db.集合.save({}) / db.集合.insert({})  添加一条 
       db.saveOne({}) 
       db.insertOne({}) 
 
       db.集合.save([{},{}]) / db.集合.insert([{},{}]) 多条 
       insert  不会替换相同ID  save会 
 
     删: 
       db.集合.deleteOne({}) db.集合.remove({},true)  一条 
       db.集合.remove({要删数据条件描述}) 多条 
       db.集合.remove({}) 清空表 
     改: 
       db.集合.udpate({要替换的数据条件描述},{替换后的},bl插入false,bl全替换false) 
       替换后的： 
         {$set:{数据},$inc:{age:1}} 
     查: 
       按_id 查询  
         var ObjectID = require('mongodb').ObjectID; 
                 dbclient.find({ _id: ObjectID(req.body.id)}) 
       所有：db.集合.find(条件) 
       条数: db.集合.find().count() 
       去重：db.集合.distinct(key) 
 
       条件 
         {age:22}    age == 22 
         {age:{$gt:22}}  age > 22 
         {age:{$lt:22}}    age < 22 
         {age:{$gte:22}} age>=22 
         {age:{$lte:22}} age<=22 
         {age:{$lte:122,$gte:22}}  age<=122 && age>=22 
         {$or:[{age:22},{age:122}]}  22 or 122 
         {key:value,key2:value2}  value && value2 
         {name:/正则/} 
 
 
       db.集合.find({条件},{指定要显示列区域}) 
         指定要显示列区域: 区域名username:1 显示着个区域，其他不显示 
         指定要显示列区域: 区域名username:0 不显示着个区域，其他显示 
         _id 是默认显示 
       限定： 
         db.集合.find().limit(number)  限定 
         db.集合.find().skip(number) 跳过 
         db.集合.findOne() / db.集合.find().limit(1)  查询第一条 
     排 
       升：db.集合.find().sort({key:1}) 
       降：db.集合.find().sort({key:-1}) 
 
     db.集合.find({条件},{指定显示区域}).skip(10).limit(10).sort({key:1}) 
     db.insertOne({数据描述}) 

```


再次认识：mongodb

***

```纯文本 
 更好的风格；更好的认识 
 (async () => { 
   const { MongoClient: MongoDB } = require('mongodb') 
 
   // 创建客户端 
   const client = new MongoDB( 
     'mongodb://localhost:27017', 
     { 
       userNewUrlParser: true 
     } 
   ) 
   let ret 
   // 创建连接 
   ret = await client.connect() 
   console.log('ret:', ret) 
   const db = client.db('test') 
   const fruits = db.collection('fruits') 
 
   // 添加文档 
   ret = await fruits.insertOne({ 
     name: '芒果', 
     price: 20.1 
   }) 
   console.log('插入成功', JSON.stringify(ret)) 
 
   // 查询文档 
   ret = await fruits.findOne() 
   console.log('查询文档:', ret) 
 
   // 更新文档 
   ret = await fruits.updateOne({ name: '芒果' }, 
   { $set: { name: '苹果' } }) 
   console.log('更新文档', JSON.stringify(ret.result)) 
 
   // 删除文档 
   ret = await fruits.deleteOne({name: '苹果'}) 
 
   await fruits.deleteMany() 
 
   client.close() 
 
 })()
```


```纯文本 
 学习的是风格；思想；代码copy很简单；关键要理解编程的思想 
 const conf = require('./conf') 
 const { EventEmitter } = require('events') 
 
 // 客户端 
 const { MongoClient } = require('mongodb') 
 
 class Mongodb { 
     constructor(conf) { 
         this.conf = conf 
         this.emmiter = new EventEmitter() 
         this.client = new MongoClient(conf.url, { 
             useNewUrlParser: true 
         }) 
         this.client.connect(err => { 
             if (err) throw err 
             console.log('连接成功') 
             this.emmiter.emit('connect') 
         }) 
     } 
     col(colName, dbName = conf.dbName){ 
         return this.client.db(dbName).collection(colName) 
     } 
     once(event,cb){ 
         this.emmiter.once(event,cb) 
     } 
 } 
 
 module.exports = new Mongodb(conf) 
 
 使用 
 const mongodb = require('./models/db') 
 mongodb.once('connect', async () => { 
     const col = mongodb.col('fruits') 
     // 删除已存在 
     await col.deleteMany() 
     const data = new Array(100).fill().map((v, i) => { 
         return { name: "XXX" + i, price: i, category: Math.random() > 0.5 ? '蔬菜' : '水果' } 
     }) 
 
 
     // 插入 
     await col.insertMany(data) 
     console.log("插入测试数据成功") 
 }) 
 
 
 
 注意思想；而不要太关注代码 
 const express = require("express") 
 const app = express() 
 const path = require("path") 
 const mongo = require("./models/db") 
 // const testdata = require("./initData") 
 
 
 app.get("/", (req, res) => { 
     res.sendFile(path.resolve("./index.html")) 
 }) 
 
 app.get("/api/list", async (req, res) => { 
     // 分页查询 
     const { page} = req.query 
     try { 
         const col = mongo.col("fruits") 
         const total = await col.find().count() 
         const fruits = await col 
             .find() 
             .skip((page - 1) * 5) 
             .limit(5) 
             .toArray() 
         res.json({ ok: 1, data: { fruits, pagination: { total, page } } }) 
     } catch (error) { 
         console.log(error) 
     } 
 }) 
 
 app.get("/api/category", async (req, res) => { 
     const col = mongo.col("fruits") 
     const data = await col.distinct('category') 
     res.json({ ok: 1, data }) 
 }) 
 
 app.listen(3000)
```
