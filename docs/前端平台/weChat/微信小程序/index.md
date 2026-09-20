# 微信小程序

```纯文本 
 ui 库 
 https://www.jianshu.com/p/be2233610f80  WeUI介绍 
 https://weui.io/    微信ui 官网  样式库 类似 bottstrop  复制代码和样式 
 官方wiki  快速上手文档   https://github.com/Tencent/weui/wiki
```


```纯文本 
 插件 
      http://www.fly63.com/nav/873 
     weapp.socket.io 
     基于小程序的websocket的socket.io实现 
     npm i weapp.socket.io 
     构建npm 包   const io = require('weapp.socket.io') 
     实例: 
     const io = require('./yout_path/weapp.socket.io.js') 
     const socket = io('http://localhost:8000') 
     socket.on('news', d => { console.log('received news: ', d) }) 
     socket.emit('news', { title: 'this is a news' })
```


```纯文本 
 框架： 
 
 mpvue: 
 
     环境搭建: 
         vue init mpvue/mpvue-quickstart my-project 
 
 注意： 
     钩子函数的this指向 vue组件 
     添加文件后，需要重启 
     wx工具指向dist/wx 
     资源： static/images 
     微信小程序的页面的 query 参数是通过 onLoad 获取的，mpvue 对此进行了优化，直接通过 this.$root.$mp.query.x 获取相应的参数数据 
     不支持过滤器 
     不支持 官方文档：Class 与 Style 绑定 中的 classObject 和 styleObject 语法。 
     事件直接在 dom 或者 小程序组件上 上将bind改为@ 
     表单推荐使用小程序的组件 
     编写方式: vue习惯 + 小程序UI组件 + dom 
     路由使用小程序的，vue-router不支持, 使用navigator || a 
     v-for (item) of xx 时 出现 loader解析错误 -> item of xx 
     数据绑定时，不支持返单引 
     渲染： 对象.key && 对象.key.key 
     css作用域: vue的css没有隔离作用域|小程序有 需要时scoped 
      
     mpvue vs wepy vs wxcode 
     http://www.bslxx.com/uploads/allimg/180312/1-1P3121A05GF.jpg
```


```纯文本 
 微信小程序： 
 
 
     帮助：微信公众平台->首页->开发文档 
     注册小程序帐号: 
         公众平台->注册->小程序(公众平台->微信小程序接入指南->注册小程序帐号->获取AppID) 
     后去拿到开发秘钥: 
         公众平台->微信小程序接入指南->注册小程序帐号->获取AppID 
         获取AppID:小程序->设置-开发设置->wxf34e69dfcc966870 
     工具安装: 
          https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html 
 
 
 
     框架： 
         为了方便开发者减少配置项，描述页面的四个文件必须具有相同的路径与文件名。 
         逻辑层:  jsCore 
             注册页面或者主 app({配置})|pages({配置}) 
             配置: 
                 data:{}  数据 
                 钩子函数:(参数){} 
                 自定义函数:(){  this  指向 当前模块|当前页面 } 
                 自定义属性:值 
 
             页面抓取主程:     
                 let app=getApp(); app.全局属性.数据名  获取app数据 
 
             数据获取: 
                 this.data.数据  获取当前模块数据  数据绑定: {{数据}} 
             数据修改: 
 
                 this.setData({数据名:值})  修改当前模块数据 
                 this.data.数据=value  不响应 
 
                 app.setData({数据名:值})  修改APP模块数据 
                 app.setData({数据名:值},callback)  修改APP模块数据 
 
     模块化: 
                 自定模块: commonJs / es6 
 
                 npm: npm安装的是小程序插件包(自定组件) | other（不可以操作DOM/BOM) 
                     npm init -y              生成json 
                     npm i miniprogram-xx    安装包 for  小程序 
                     npm i --production 
                     工具-构建npm              
                     详情选择-支持npm 
 
                 之后每次安装：npm i miniprogram-xx -> 工具-构建 
 
             事件： 
                 bindXxx   Xxx=元素移动端事件名 
                 catchXxx 
                 bind冒泡，catch不冒泡。 
     视图层: web-view 
             WXML:    组件(系统提供,自定义，第三插件)，非标签 
             WXCSS:    CSS 
                 尺寸：  rpx 
                     1rpx = 0.5px = 1 物理像素 
     路由方式: 页面栈 
                 重定向(redirect|reLaunch)|navigateBack|转发 导致当前页面出栈(onUnLoad) 
                 子路由，跳转会导致中间栈出栈 | 转发 不会 
             注意: 
                 navigateTo, redirectTo 只能打开非 tabBar 页面。 
                 switchTab 只能打开 tabBar 页面。 
                 reLaunch 可以打开任意页面。 
                 页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部都有 tabBar。 
                 调用页面路由带的参数可以在目标页面的onLoad中获取。 
             路由传参: 
                 url: 'pages/xx/xx?a=1&b=2' 
             接参: 
                 app.js    onLaunch(optoins) 
                 page.js       onLoad(options) options.a/b 
     视图层: web-view 
             WXML:    组件，非标签 
             WXCSS:    CSS 
                 尺寸：  rpx 
                     1rpx = 0.5px = 1 物理像素 
 
     豆瓣挂了 拒绝403端口 
     代理: 
          https://douban.uieee.com 
             接口： 豆瓣查      
                 /v2/movie/top250    
                 start:1 
                 count:10 
         header设置:    application/xml  | json 
 正在上映的电影 -- 北京 
 https://api.douban.com/v2/movie/in_theaters?start=2&count=3 
 
 电影条目搜索 
 
 http://api.douban.com/v2/movie/search?tag= 喜剧 
 http://api.douban.com/v2/movie/search?q= 战狼&count=1 
 
 例如想获取ID为1220562的图书相关信息，则请求如下： 
 
 http://api.douban.com/v2/book/1220562 ，返回的为json 
 
 口碑 
 https://api.douban.com/v2/movie/weekly 
 
 新片榜 
 https://api.douban.com/v2/movie/new_movies 
 
 北美票房榜 
 https://api.douban.com/v2/movie/us_box? 
 即将上映 
 https://api.douban.com/v2/movie/coming_soon 
 
 查询 
 ' https://douban.uieee.com/v2/movie/subject/'+options.id , 
 
 项目: 
     .wxss 中的本地资源图片无法通过 WXSS 获取，可以使用网络图片，或者 base64，或者使用<image/>标签 
     wx.request不支持请求本地json 需要把json  拷贝到 data -> serve -s data 
     wx.request不支持请求接口(localhost) 勾上不校验合法域名 
 
     修改data 
         this.setData({ 
           '父key.子key':result 
         }); 

```


demo

[小程序.rar](./assets/file/小程序_2KotjDBL7r.rar "小程序.rar")
