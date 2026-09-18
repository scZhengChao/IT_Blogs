# redis 实践

```javascript 
 //redis.js 
 var redis = require('redis'); 
 let config = require('../config').redis_config 
 
 // 初始化 
 const _createClient = () => { 
   const client = redis.createClient(config.port,config.hostname); 
    //login  
   // redis_client.auth('6478**12',function(){ 
   //     console.log('auth succress'); 
   // }); 
   //记录redis错误 
   logger.info(`redis 启动成功,liten:${config.port} ${config.hostname}`) 
   client.on("error", function (err) { 
       logger.error(`redis error:`,err) 
   }); 
   return client; 
 }; 
 
 const redisClient = _createClient(); 
 
 
 // 封装api 开箱即用 
 
 //设置  
 function setItem(key, value, exprires) { 
   redisClient.set(key, value); 
   //设置过期 单位：秒 
   if (exprires) { 
       redisClient.expire(key, exprires); 
   } 
 } 
 
 //获取 
 async function getItem(key) { 
   return new Promise((resolve, reject) => { 
       redisClient.get(key, (err, val) => { 
           if(err) { 
               reject(err) 
           } 
           resolve(val); 
       }) 
   }).catch(err=>{ 
     logger.error(`redis get item failed`,err) 
   }) 
 } 
 或者 
 function getItem(key) { 
   return redisClient.getAsync(key) //promise 
 } 
 
 module.exports = { 
   redisClient, 
   setItem, 
   getItem 
 }; 
 
 
 redisClient.auth(123456);  // 如果没有设置密码 是不需要这一步的 
 redisClient.set('hello','This is a value'); 
 redisClient.expire('hello',10) //设置过期时间 
 redisClient.exists('key') //判断键是否存在 
 redisClient.del('key1') 
 redisClient.get('hello'); 
 redisClient.expire(tokenKey,3600) //给tokenKey 续期, 单位秒 
 
 // 发布订阅, 注意 发布方和订阅方 不能是同一个 client 端 
 redisClient2.publish("its_swiper", req.body.userid);  // 发布 
 redisClient.subscribe('its_swiper')  //订阅 
 redisClient.on('message',(channel,message)=>{  // 监听订阅的消息 
    console.log("redis on message", message);      
    if(channel === 'its_swiper') socket.emit('openBrower',{open:true}) 
 }) 
 
     //监听订阅成功事件 
     client.on("subscribe", function (channel, count) { 
         console.log("client subscribed to " + channel + "," + count + "total subscriptions"); 
     }); 
 
     //收到消息后执行回调，message是redis发布的消息 
     client.on("message", function (channel, message) { 
         console.log("我接收到信息了" + message); 
         dealWithMsg(message); 
     }); 
 
     //监听取消订阅事件 
     client.on("unsubscribe", function (channel, count) { 
         console.log("client unsubscribed from" + channel + ", " + count + " total subscriptions") 
     });
```
