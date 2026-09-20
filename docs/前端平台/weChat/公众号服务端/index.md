# 公众号服务端

[01\_公众号\_服务器端【瑞客论坛 www.ruike1.com】.pdf](<./file/01_公众号_服务器端【瑞客论坛 www.ruike1.com】_Z2JY5xKk7r.pdf> "01_公众号_服务器端【瑞客论坛 www.ruike1.com】.pdf")

```纯文本 
 //index.js 
 const Koa = require('koa') 
 const Router = require('koa-router') 
 const static = require('koa-static') 
 const bodyParser = require('koa-bodyparser'); 
 const app = new Koa() 
 const conf = require('./conf') 
 app.use(bodyParser()) 
 const router = new Router() 
 app.use(static(__dirname + '/')) 
 const axios = require('axios') 
 
 //公众号 回消息接口 
 // const wechat = require('co-wechat') 
 // router.all('/wechat', wechat(conf).middleware( 
 //     async message => { 
 //         console.log('wechat:', message) 
 //         return 'Hello World ' + message.Content 
 //     } 
 // )) 
 
 
 //原生获取token 请求ap i 
 // const tokenCache = { 
 //     access_token:'', 
 //     updateTime:Date.now(), 
 //     expires_in:7200 
 // } 
 
 
 // router.get('/getTokens',async ctx => { 
 //     const wxDomain =  `https://api.weixin.qq.com` 
 //     const path = `/cgi-bin/token` 
 //     const param = `?grant_type=client_credential&appid=${conf.appid}&secret=${conf.appsecret}` 
 //     const url = wxDomain + path + param 
 //     const res = await axios.get(url) 
 //     Object.assign(tokenCache,res.data,{ 
 //         updateTime:Date.now() 
 //     }) 
 //     ctx.body = res.data 
 // }) 
 
 
 // router.get('/getFollowers',async ctx => { 
 //     const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${tokenCache.access_token}` 
 //     const res = await axios.get(url) 
 //     console.log('getFollowers:',res) 
 //     ctx.body = res.data 
 // }) 
 
 
 
 // 利用npm库获取token 保存token 请求api 
 // const { ServerToken } = require('./mongoose') 
 
 
 // const WechatAPI = require('co-wechat-api') 
 // const api = new WechatAPI( 
 //     conf.appid, 
 //     conf.appsecret, 
 //     // 取Token 
 //     async () => await ServerToken.findOne(), 
 //     // 存Token 
 //     async token => await ServerToken.updateOne({}, token, { upsert: true }) 
 // ) 
 
 
 // router.get('/getFollowers', async ctx => { 
 //     let res = await api.getFollowers() 
 //     res = await api.batchGetUsers(res.data.openid, 'zh_CN') 
 //     ctx.body = res 
 // }) 
 
 
 
 app.use(router.routes()); /*启动路由*/ 
 app.use(router.allowedMethods()); 
 app.listen(3000);
```


```纯文本 
 //conf.js 
 module.exports = { 
     appid:'wxfc60e88fa8622c69', 
     appsecret:'23c57e17b4073db7d03cca2ebac525ae', 
     token:'kaikeba' 
 }
```


```纯文本 
 //mongoose.js 
 const mongoose = require('mongoose') 
 const {Schema} = mongoose 
 mongoose.connect('mongodb://localhost:27017/weixin', { 
     useNewUrlParser: true 
 }, () => { 
     console.log('Mongodb connected..') 
 }) 
 exports.ServerToken = mongoose.model('ServerToken', { 
     accessToken: String 
 });
```


```纯文本 
 //回消息接口的源码 
 
 const Koa = require('koa') 
 const Router = require('koa-router') 
 const static = require('koa-static') 
 const xml2js = require('xml2js') 
 const app = new Koa() 
 const url = require('url') 
 const conf = require('./conf') 
 
 const crypto = require('crypto') 
 const xmlParser = require('koa-xml-body') 
 app.use(xmlParser()) 
 
 const router = new Router() 
 app.use(static(__dirname + '/')) 
 
 
 // 验证 
 router.get('/wechat', ctx => { 
     console.log('微信认证...', ctx.url) 
     const { 
         query 
     } = url.parse(ctx.url, true) 
     const { 
         signature, // 微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。 
         timestamp, // 时间戳 
         nonce, // 随机数 
         echostr // 随机字符串 
     } = query 
     console.log('wechat', query) 
 
     // 将 token timestamp nonce 三个参数进行字典序排序并用sha1加密 
 
     let str = [conf.token, timestamp, nonce].sort().join(''); 
     console.log('str', str) 
     let strSha1 = crypto.createHash('sha1').update(str).digest('hex'); 
 
     console.log(`自己加密后的字符串为：${strSha1}`); 
     console.log(`微信传入的加密字符串为：${signature}`); 
     console.log(`两者比较结果为：${signature == strSha1}`); 
 
     // 签名对比，相同则按照微信要求返回echostr参数值 
     if (signature == strSha1) { 
         ctx.body = echostr 
     } else { 
         ctx.body = "你不是微信" 
     } 
 }) 
 
 // 接受信息 
 router.post('/wechat', ctx => { 
     const { 
         xml: msg 
     } = ctx.request.body 
     console.log('Receive:', msg) 
     const builder = new xml2js.Builder() 
     const result = builder.buildObject({ 
         xml: { 
             ToUserName: msg.FromUserName, 
             FromUserName: msg.ToUserName, 
             CreateTime: Date.now(), 
             MsgType: msg.MsgType, 
             Content: 'Hello ' + msg.Content 
         } 
     }) 
     ctx.body = result 
 }) 
 
 app.use(router.routes()); 
 app.use(router.allowedMethods()); 
 app.listen(3000);
```
