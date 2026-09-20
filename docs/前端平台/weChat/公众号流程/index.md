# 公众号流程

## 目录

- [步骤一：绑定域名](#步骤一绑定域名)
- [步骤二：引入JS文件](#步骤二引入JS文件)
- [步骤三：通过config接口注入权限验证配置](#步骤三通过config接口注入权限验证配置)
- [步骤四：通过ready接口处理成功验证](#步骤四通过ready接口处理成功验证)
- [步骤五：通过error接口处理失败验证](#步骤五通过error接口处理失败验证)

**测试号配置：**

[**https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo\&t=sandbox/index**](https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo\&t=sandbox/index "https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo\&t=sandbox/index")

```纯文本 
 //config.js  
 module.exports = { 
     appid:'wxe6b6e171a86ba4b0', 
     appsecret:'d1c9d43f20801fa81fa56cb9a22e505d', 
     token:'zhengchao' 
 }
```


**一：服务器端API调用**

**access tokens获取使用**

```纯文本 
 第一步：获取access tokens 
     获取access tokens   access_token的存储至少要保留512个字符空间。access_token的有效期目前为2个小时，需定时刷新，重复获取将导致上次获取的access_token失效。 
         1、建议公众号开发者使用中控服务器统一获取和刷新access_token，其他业务逻辑服务器所使用的access_token均来自于该中控服务器，不应该各自去刷新，否则容易造成冲突，导致access_token覆盖而影响业务； 
         2、目前access_token的有效期通过返回的expire_in来传达，目前是7200秒之内的值。中控服务器需要根据这个有效时间提前去刷新新access_token。在刷新过程中，中控服务器可对外继续输出的老access_token，此时公众平台后台会保证在5分钟内，新老access_token都可用，这保证了第三方业务的平滑过渡； 
         3、access_token的有效时间可能会在未来有调整，所以中控服务器不仅需要内部定时主动刷新，还需要提供被动刷新access_token的接口，这样便于业务服务器在API调用获知access_token已超时的情况下，可以触发access_token的刷新流程。 
 
 const tokenCache = { 
     access_token:'', 
     updateTime:Date.now(), 
     expires_in:7200 
 } 
 
 // 服务端获取access token 储存在redis 或者 数据库  两小时失效 应该有中控服务器同意刷新 
 router.get('/getTokens',async ctx => { 
     const wxDomain =  `https://api.weixin.qq.com` 
     const path = `/cgi-bin/token` 
     const param = `?grant_type=client_credential&appid=${conf.appid}&secret=${conf.appsecret}` 
     const url = wxDomain + path + param 
     const res = await axios.get(url) 
     Object.assign(tokenCache,res.data,{ 
         updateTime:Date.now() 
     }) 
     ctx.body = res.data 
 }) 
 
 
 第二部：服务端入参access token的各种操作 
 
 具体的接口见 官网：  https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index 
 获取用户列表 
 router.get('/getFollowers',async ctx => { 
     const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${tokenCache.access_token}` 
     const res = await axios.get(url) 
     console.log('getFollowers:',res) 
     ctx.body = res.data 
 })
```


**co-wechat-api（简化开发流程）**

```纯文本 
 const { ServerToken,ClientToken } = require('./mongoose') 
 
 const WechatAPI = require('co-wechat-api') 
 const api = new WechatAPI( 
     conf.appid, 
     conf.appsecret, 
     // 取Token 
     async () => await ServerToken.findOne(), 
     // 存Token 
     async token => await ServerToken.updateOne({}, token, { upsert: true }) 
 ) 
 router.get('/getFollowers', async ctx => { 
     let res = await api.getFollowers() 
     res = await api.batchGetUsers(res.data.openid, 'zh_CN') 
     ctx.body = res 
 })
```


\*\*客服消息 - (你问我答) \*\*​

[https://developers.weixin.qq.com/doc/offiaccount/Message\_Management/Receiving\_standard\_messages.html](https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Receiving_standard_messages.html "https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Receiving_standard_messages.html")

               见官网

![  ](./assets/image/027fa6c49abac70c0dc61f3c252bd30b_Zu_Wb0xaZl.png "  ")

**co-wechat-oauth（简化开发流程**

**）**

```纯文本 
 const wechat = require('co-wechat') 
 router.all('/wechat', wechat(conf).middleware( 
     async message => { 
         console.log('wechat:', message) 
         return 'Hello World ' + message.Content 
     } 
 ))
```


**原理解析（**

**源码）**

```纯文本 
 外网：http 80端口 https 443端口 
 
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
 
 
 // 验证 （我们认证微信，返回  echostr） 
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
 
 
 
 // 接受信息（用户的输入信息） 
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


**二：客户端使用**

**Oauth2.0 的认证（网页授权）**

    授权码模式（authorization code）是功能最完整、流程最严密的授权模式。它的特点就是通过客户端的后 台服务器，与"服务提供商"的认证服务器进行互动。

![  ](./assets/image/e652f88345cce182bbcda0264b1e7f86_DQ1ouYcInn.png "  ")

![  ](./assets/image/a017fcdc5e7add7f157ec284c67789c5_BPgSNz5F-R.png "  ")

[https://developers.weixin.qq.com/doc/offiaccount/OA\_Web\_Apps/Wechat\_webpage\_authorization.html](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html "https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html")

    网页授权的官方文档（具体步骤）

[https://developers.weixin.qq.com/doc/offiaccount/OA\_Web\_Apps/JS-SDK.html](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html "https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html")

   jssdk 的使用

如果用户在

**微信客户端中访问第三方网页**

，公众号可以通过微信网页授权机制，来获取用户基本信息，进而实现业务逻辑。

**关于网页授权回调域名的说明**

1、在微信公众号请求用户网页授权之前，开发者需要先到公众平台官网中的“开发 - 接口权限 - 网页服务 - 网页帐号 - 网页授权获取用户基本信息”的配置选项中，修改授权回调域名。请注意，这里填写的是域名（是一个字符串），而不是URL，因此请勿加 http\:// 等协议头；

2、授权回调域名配置规范为全域名，比如需要网页授权的域名为：

[www.qq.com](http://www.qq.com/ "www.qq.com")

，配置以后此域名下面的页面

[http://www.qq.com/music.html](http://www.qq.com/music.html "http://www.qq.com/music.html")

、

[http://www.qq.com/login.html](http://www.qq.com/login.html "http://www.qq.com/login.html")

都可以进行OAuth2.0鉴权。但

[http://pay.qq.com](http://pay.qq.com/ "http://pay.qq.com")

、

[http://music.qq.com](http://music.qq.com/ "http://music.qq.com")

、

[http://qq.com](http://qq.com/ "http://qq.com")

无法进行OAuth2.0鉴权

3、如果公众号登录授权给了第三方开发者来进行管理，则不必做任何设置，由第三方代替公众号实现网页授权即可

**关于网页授权的两种scope的区别说明**

1、以snsapi\_base为scope发起的网页授权，是用来获取进入页面的用户的openid的，并且是静默授权并自动跳转到回调页的。用户感知的就是直接进入了回调页（往往是业务页面）

2、以snsapi\_userinfo为scope发起的网页授权，是用来获取用户的基本信息的。但这种授权需要用户手动同意，并且由于用户同意过，所以无须关注，就可在授权后获取该用户的基本信息。

3、用户管理类接口中的“获取用户基本信息接口”，是在用户和公众号产生消息交互或关注后事件推送后，才能根据用户OpenID来获取用户基本信息。这个接口，包括其他微信接口，都是需要该用户（即openid）关注了公众号后，才能调用成功的。

**关于网页授权access\_token和普通access\_token的区别**

1、微信网页授权是通过OAuth2.0机制实现的，在用户授权给公众号后，公众号可以获取到一个网页授权特有的接口调用凭证（网页授权access\_token），通过网页授权access\_token可以进行授权后接口调用，如获取用户基本信息；

2、其他微信接口，需要通过基础支持中的“获取access\_token”接口来获取到的普通access\_token调用。

**关于UnionID机制**

1、请注意，网页授权获取用户基本信息也遵循UnionID机制。即如果开发者有在多个公众号，或在公众号、移动应用之间统一用户帐号的需求，需要前往微信开放平台（

[open.weixin.qq.com](http://open.weixin.qq.com/ "open.weixin.qq.com")

）绑定公众号后，才可利用UnionID机制来满足上述需求。

2、UnionID机制的作用说明：如果开发者拥有多个移动应用、网站应用和公众帐号，可通过获取用户基本信息中的unionid来区分用户的唯一性，因为同一用户，对同一个微信开放平台下的不同应用（移动应用、网站应用和公众帐号），unionid是相同的。

**关于特殊场景下的静默授权**

1、上面已经提到，对于以

**snsapi\_base为scope的网页授权，就静默授权的，用户无感知；**

2、对于

**已关注公众号的用户**

，如果用户从公众号的会话或者自定义菜单进入本公众号的网页授权页，

**即使是scope为snsapi\_userinfo，也是静默授**

权，用户无感知。

具体而言，网页授权流程分为四步：

1、引导用户进入授权页面同意授权，获取code

2、通过code换取网页授权access\_token（与基础支持中的access\_token不同）

3、如果需要，开发者可以刷新网页授权access\_token，避免过期

4、通过网页授权access\_token和openid获取用户基本信息（支持UnionID机制）

**JSSDK使用步骤**

#### **步骤一：绑定域名**

先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。

备注：登录后可在“开发者中心”查看对应的接口权限。

#### **步骤二：引入JS文件**

在需要调用JS接口的页面引入如下JS文件，（支持https）：

[http://res.wx.qq.com/open/js/jweixin-1.6.0.js](http://res.wx.qq.com/open/js/jweixin-1.6.0.js "http://res.wx.qq.com/open/js/jweixin-1.6.0.js")

如需进一步提升服务稳定性，当上述资源不可访问时，可改访问：

[http://res2.wx.qq.com/open/js/jweixin-1.6.0.js](http://res2.wx.qq.com/open/js/jweixin-1.6.0.js "http://res2.wx.qq.com/open/js/jweixin-1.6.0.js")

（支持https）。

备注：支持使用 AMD/CMD 标准模块加载方法加载

#### **步骤三：通过config接口注入权限验证配置**

所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,目前Android微信客户端不支持pushState的H5新特性，所以使用pushState来实现web app的页面会导致签名失败，此问题会在Android6.2中修复）。

```纯文本 
 wx.config({ 
   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。 
   appId: '', // 必填，公众号的唯一标识 
   timestamp: , // 必填，生成签名的时间戳 
   nonceStr: '', // 必填，生成签名的随机串 
   signature: '',// 必填，签名 
   jsApiList: [] // 必填，需要使用的JS接口列表 
 })
```


签名算法见文末的

[附录1](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62 "附录1")

，所有JS接口列表见文末的

[附录2](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#63 "附录2")

#### **步骤四：通过ready接口处理成功验证**

```纯文本 
 wx.ready(function(){ 
   // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。}); 
 

```


#### **步骤五：通过error接口处理失败验证**

```纯文本 
 wx.error(function(res){ 
   // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。}); 

```


具体步骤可以见 官网 流程很详细

**co-wechat-oauth（简化开发流程）**

```纯文本 
   <div id="app"> 
         <cube-button @click='getTokens'>getTokens</cube-button> 
         <cube-button @click='getFollowers'>getFollowers</cube-button> 
         <cube-button @click='auth'>微信登录</cube-button> 
         <cube-button @click='getUser'>获取用户信息</cube-button> 
         <cube-button @click='getJSConfig'>获取JSSKConfig</cube-button> 
     </div> 
     <script> 
         var app = new Vue({ 
             el: '#app', 
             data: { 
                 value: 'input' 
             }, 
 
             methods: { 
                 async getTokens() { 
                     const res = await axios.get('/getTokens') 
                     console.log('res:', res) 
                 }, 
                 async getFollowers() { 
                     const res = await axios.get('/getFollowers') 
                     console.log('res', res) 
                 }, 
                 async auth() {  //  这一步仅仅是为了获得用户的openid 
                     window.location.href = '/wxAuthorize'  
                 }, 
                 async getUser() {   // 拿到openid 去后端请求用户信息 
                     const qs = Qs.parse(window.location.search.substr(1)) 
                     console.log(qs) 
                     const res = await axios.get('/getUser', { 
                         params: { 
                             openid: qs.openid 
                         } 
                     }) 
                     console.log('User', res.data) 
                 }, 
                  async getJSConfig() {  // 仅仅是配置jssdk 
 
                                       //返回值 
                     //appId: "wxe6b6e171a86ba4b0" 
                     //jsApiList: (2) ["onMenuShareTimeline", "onMenuShareAppMessage"] 
                     //nonceStr: "4hz9ylkwkrg" 
                     //signature: "20231cfe53531ee9b65b4f4916b357de885efa00" 
                     //timestamp: "1594115835" 
 
                     console.log('wx', wx) 
                     const res = await axios.get('/getJSConfig', { 
                         params: { 
                             url: window.location.href 
                         } 
                     }) 
                     console.log('res....', res.data) 
                     res.data.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'] 
                     wx.config(res.data); 
                     wx.ready(function () { 
                         console.log('wx.ready......') 
                     }) 
                     wx.getNetworkType({ 
                         success: function (res) { 
                             // 返回网络类型2g，3g，4g，wifi 
                             var networkType = res.networkType; 
                             console.log('getNetworkType...', networkType) 
                         } 
                     }) 
                 } 
             },
```


```纯文本 
 const OAuth = require('co-wechat-oauth') 
 const oauth = new OAuth(conf.appid, conf.appsecret, 
     async function (openid) { 
         return await ClientToken.getToken(openid) 
     }, 
     async function (openid, token) { 
         return await ClientToken.setToken(openid, token) 
     } 
 ) 
 
 /** 
 * 生成用户URL 
 */ 
 router.get('/wxAuthorize', async (ctx, next) => { 
     const state = ctx.query.id 
     console.log('ctx...' + ctx.href) 
     let redirectUrl = ctx.href 
     redirectUrl = redirectUrl.replace('wxAuthorize', 'wxCallback') 
     const scope = 'snsapi_userinfo' 
     //客户端访问 接口 这个包 请求微信，并且成功够访问改回调 
     const url = oauth.getAuthorizeURL(redirectUrl, state, scope) 
     console.log('url：' + url) 
     ctx.redirect(url)  // 浏览器会相应 跳转到这个地址 
 }) 
 
 /** 
 * 用户回调方法 
 */ 
 router.get('/wxCallback', async ctx => { 
     const code = ctx.query.code 
     console.log('wxCallback code', code) 
     //拿取code 获取token  openid 
     const token = await oauth.getAccessToken(code) 
     const accessToken = token.data.access_token 
     const openid = token.data.openid 
     console.log('accessToken', accessToken) 
     console.log('openid', openid) 
     ctx.redirect('/?openid=' + openid)   // 浏览器会相应 跳转到这个地址  （前端获得了当前用户的openid） 
 }) 
 
 
 /** 
 *  获取用户信息 
 */ 
 router.get('/getUser', async ctx => { 
     const openid = ctx.query.openid 
      const userInfo = await oauth.getUser(openid)  
     ctx.body = userInfo 
 }) 
 
 
 /** 
 * 获取JSConfig 
 */ 
 router.get('/getJsConfig',async ctx => { 
     console.log('getJSSDK...',ctx.query) 
     const res = await api.getJsConfig(ctx.query) 
     ctx.body = res 
 }) 

```


```纯文本 
 wx_jssdk: 
 
     使用要求: 在使用wx_jssdk,页面要在真实服务器环境 
 
   1)    服务器端配置:   bulala.域名.com 
     提供文件： 
       wx_sample.php     后台验证 
       MP_verify..txt     验证文本 
       hello world 示例代码 
 
   2)    微信端配置:  登录公众号管理平台 
     通过公众号|微信浏览器  跳转  服务器 
 
     a) 订阅|企业配置 
 
       1) 拿到开发秘钥: 开发->基本配置 
       2）设置校验文件位置: 开发->基本配置->服务器配置 
            URL:   xx.duapp.com/xx/wx_sample.php 
           Token:  xxxx        Token 对应 wx_sample.php 里面token 
           随机生成key:  一旦生成，请快速提交 
       2) 设置安全域名： 
           公众号设置->功能设置->JS接口安全域名->填入  后台域名(不含http) 
 
     b) 测试号配置 
 
         1) 拿到开发秘钥: 开发者工具->公众平台测试账号->获取测试id/秘钥 
             wxcfc056111e4f47c2 
             660175f98e2f06105ed18b5cfc1b1cc1 
 
         2) 设置校验文件位置 
              http://xx .域名 .com/xx/wx_sample.php 
             token: wx_sample.php里面的token 
 
         3) 设置安全域名 
             xxx.域名.com 
 
 如何拿到提供文件: 
   wx_sample.php  下载一个 
   MP_verify..txt 
     公众号设置->功能设置->JS接口安全域名 
   hello示例代码  下载  微信端 
     开发->开发者工具->开发者文档(API)->微信网页开发->微信js-sdk说明文档->拉到最后 
     copy pnp目录 到svn 地址下 
 
     修改 
         sample.php 开发秘钥(微信端->基本配置->开发者ID|密码) 
         wx_sample.php里面的token 
 
 调试: 
     {errMsg:'config,fail'} 
         订阅号 
         jsApiList 数组:    没有使用api，ready里面为空  时 
             解决: jsApiList[''] ready里面加了代码  ios   安卓fail 
     {errMsg:'config,ok'} 
 
 vue + jssdk 
    
     在jssdk后面引入  <script src="./dist/build.js"></script> 
     wx.config 部分保留 
     main.js 
       import './mo/wx.js';  wx.js 自定义的公共模块 
     wx.js == 自定义全局模块模块 
       wx.ready 
         wx.onMenuShareTimeline 
         wx.onMenuShareAppMessage 
     app.vue 
       methods里面，使用wx全局对象的api 
     webpack.config.js 
 
     cli2: 
       path: path.resolve(__dirname, '../appidf17qocgbjb/dist'), 
       publicPath: '../appidf17qocgbjb/dist/', 
 
 
     cli3: @vue/vue-service/lib/options.js 
        indexPath: 'index.php',  打包vue的html->php 
        outputDir: './baeapp-52fd0bvkqw0k',指定打包到jssdk仓库目录 
 
 
 jssdk 的一些坑 
 https://www.jianshu.com/p/b017fd6bb908   简书   H5分享的一些坑 
 
 spa 页面 jssdk 签名问题：（动态的获取url；每次url改变是都去签名校验一遍；保证每次都有效） 
     所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,目前Android微信客户端不支持pushState的H5新特性，所以使用pushState来实现web app的页面会导致签名失败，此问题会在Android6.2中修复） 
 
 注意：微信分享出去的页面会携带一些自己参数：query
```


**状态保持**

```纯文本 
 其实最主要还是要搞清openid，每个用户针对同一个公众号，此openid是永远不会变的，哪怕是你取消了重新关注。 
 状态保持 ；数据持久化 
 
 关于微信中的localStorage及使用cookie的解决方案 
 
 首先，微信环境其实是个webview组件而已，并不是真正意义上的什么内置浏览器。 
 安卓版微信直接调用系统浏览器内核，它是用chrome改造做的一套WKwebView,概念上类似是一套组建, iOS则是调用safari， 
 所以把微信内置的第三方网页看成是在整个浏览器环境下的想法是错误的。 
 
 其次，微信内置第三方网页中localStorage等, 是可以用, 
 有些机型不能存储信息到localStorage中 ，或者是页面一旦关闭或微信退出之后，存储的信息也失效了。 
 百度上也有很多人吐槽这个问题，cookie和session都能解决。 
 于是想到用cookie来替代localStorage，存储一些简单的数据。上网查找了一下，发现w3school上已有不错的解决方案。 
 
 //设置cookie 
 function setCookie(c_name,value,expiredays){ 
     var exdate=new Date() 
     exdate.setDate(exdate.getDate()+expiredays) 
     document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) 
 } 
 
 
 //取回cookie 
 function getCookie(c_name){ 
     if (document.cookie.length>0){ 
           c_start=document.cookie.indexOf(c_name + "=") 
           if (c_start!=-1){ 
                 c_start=c_start + c_name.length+1 
                 c_end=document.cookie.indexOf(";",c_start) 
                 if (c_end==-1) c_end=document.cookie.length 
                 return unescape(document.cookie.substring(c_start,c_end)) 
            } 
      } 
     return "" 
 } 
 
 //设置cookie，有效期为365天 
 setCookie('username','123',365); 
 
 
 //取回，若cookie失效，将返回空 
 getCookie('username'); 
 
 经过测试，完全兼容，没有出现问题，但是这个微信退出；重新登录缓存就又没了，  有需要的小伙伴可以参考下 
 （这个地方需要知道至少cookies自测： 退出公众号和 关闭微信依然存在的；）
```


**access\_token  详解**

```纯文本 
 https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html    服务端token 
 https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html    网页授权 客户端token 
 
 https://developers.weixin.qq.com/doc/offiaccount/User_Management/Get_users_basic_information_UnionID.html#UinonId    （UnionID机制）  产生消息交互后；获取userinfo 
 
 
 access_token是公众号的全局唯一接口调用凭据，公众号调用各接口时都需要使用access_token。 
 注意：是所有接口都需要使用 
 
 两者异同 
     有效期：两者有效时间都是7200s。 
     使用范围：通过网页授权获得的access_token，只能获取到对应的微信用户信息，与微信用户是一对一关系；而普通的access_token在有效期内可以使用，可以获取所有用户信息。 
 次数限制： 普通access_token每天获取最多次数为2000次，而网页授权的access_token获取次数没有限制 
 
 如何利用普通access_token获取用户信息 
 调用接口https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN，请求方式GET。参数lang表示返回国家地区语言版本。
```
