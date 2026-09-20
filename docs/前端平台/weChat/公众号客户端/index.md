# 公众号客户端

[02\_公众号\_网页端【瑞客论坛 www.ruike1.com】.pdf](<./assets/file/02_公众号_网页端【瑞客论坛 www.ruike1.com】_NC2rq01eYT.pdf> "02_公众号_网页端【瑞客论坛 www.ruike1.com】.pdf")

**oauth2.0 登陆**

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
                 async auth() { 
                     window.location.href = '/wxAuthorize' 
 
 
                 }, 
                 async getUser() { 
                     const qs = Qs.parse(window.location.search.substr(1)) 
                     console.log(qs) 
                     const res = await axios.get('/getUser', { 
                         params: { 
                             openid: qs.openid 
                         } 
                     }) 
                     console.log('User', res.data) 
                 }, 
                 async getJSConfig() { 
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
     //客户端访问 接口 这个包 请求微信，并且成功够访问改回调 
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
     //拿取code 获取token  openid 
     const token = await oauth.getAccessToken(code) 
     const accessToken = token.data.access_token 
     const openid = token.data.openid 
     console.log('accessToken', accessToken) 
     console.log('openid', openid) 
     ctx.redirect('/?openid=' + openid) 
 }) 
 
 
 /** 
 * 获取用户信息 
 */ 
 router.get('/getUser', async ctx => { 
     const openid = ctx.query.openid 
     const userInfo = await oauth.getUser(openid) 
     console.log('userInfo:', userInfo) 
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


**jssdk**

官方资料：

[https://mp.weixin.qq.com/wiki?t=resource/res\_main\&id=mp1421141115](https://mp.weixin.qq.com/wiki?t=resource/res_main\&id=mp1421141115 "https://mp.weixin.qq.com/wiki?t=resource/res_main\&id=mp1421141115")

npm库：&#x20;

[https://github.com/node-webot/co-wechat-api](https://github.com/node-webot/co-wechat-api "https://github.com/node-webot/co-wechat-api")

&#x20;(获取JSConﬁg)

是开发者在网页上通过JavaScript代码使用微信原生功能的工具包，开发者可以使用它在网页上录制和播放微 信语音、监听微信分享、上传手机本地图片、拍照等许多能力

    运行于微信内置浏览器的网页 

    调用微信原生应用如：拍照、语音、扫一扫

```纯文本 
 /** 
 * 获取JSConfig 
 */ 
 router.get('/getJsConfig',async ctx => { 
     console.log('getJSSDK...',ctx.query) 
     const res = await api.getJsConfig(ctx.query) 
     ctx.body = res 
 }) 
 
 
  async getJSConfig() { 
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
```
