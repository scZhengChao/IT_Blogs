# 常见问题

**1.微信公众平台网页授权两次或多次重定响应问题**

```纯文本 
 昨天我负责的一个项目忽然出现了一个十分诡异的bug，进行微信授权登录的时候请求code的时候安卓手机会多次重定向调转我的接口接收code的接口（redirect_uri 微信请求调转接收code的的接口，加了Url.encode()），也就是我这边默认请求了多次这个接口，然而苹果手机没有问题，于是我写了日志看了下没错，有时候会请求两次或者更多次这个重定向的接口地址，所以导致了与用户登录进去以后，报  {“errcode”:40163,"errmsg":"code been used"} 这里提示已经非常的明白，code已经被使用过了，为何这个项目上线后了三四个月了，才会出现这个问题，然后我其他的项目也是使用同样的微信授权登录的写法都完全没毛病。 
 　　结合这个问题我到网上查找了一些解决方案， 有人说使用缓冲把第一次获取的code存入缓冲，然后再请请求的时候判断是否存在这个值，这种方法虽然听起来挺合理的，但是完全不符合开发原谅，并且没有从更本上找到问题。 
     还有一种方式就是在请求链接中加上一个参数：connect_redirect=1 （ 微信请求code的接口：https://open.weixin.qq.com/connect/oauth2/authorize?appid=xxx&redirect_uri=xxx&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect），很多人的多次请求都加上这个参数解决了，而我发现我的并不是这个问题，不过假如你们遇到了这个问题可以试一试也许有用。 
    最后我发现无论我怎么改动我的代码，微信还是默认会返回多个同样的code给我，最后我在我的服务器采取网络抓吧，结果终于让我找到了bug的源头，原来是360安全卫士搞得鬼，每次会员请求一次让后360也会模拟一次请求，导致了有时候多吃请求，把360一关闭就好了，真的是太坑了，熬夜整整搞了一天，这个锅终于不用我背了，网站又可以正常运行了。 
 
 或者redirect_url  直接改成 鉴权url；但是要准备好暴露出去appid 的准备
```


**2.由于微信默认字体导致的布局不一致**

```纯文本 
 <script> 
        (function() { 
            if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") { 
                handleFontSize(); 
            } else { 
                if (document.addEventListener) { 
                    document.addEventListener("WeixinJSBridgeReady", handleFontSize, false); 
                } else if (document.attachEvent) { 
                    document.attachEvent("WeixinJSBridgeReady", handleFontSize); 
                    document.attachEvent("onWeixinJSBridgeReady", handleFontSize);  } 
            } 
            function handleFontSize() { 
                // 设置网页字体为默认大小 
                WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 }); 
                // 重写设置网页字体大小的事件 
                WeixinJSBridge.on('menu:setfont', function() { 
                    WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 }); 
                }); 
            } 
        })(); 
 </script> 
 
 p{-webkit-text-size-adjust: none;} //禁用Webkit内核浏览器的文字大小调整功能
```


**3.jssdk  分享问题**

```纯文本 
 虽然说验签 在spa页面下 hash 模式下只是签名 一次 ；（官网山说的pushstate 不兼容的问题；应该已经解决了） 
 
 但是： 分享每个页面都要重设一次；否则他以最后一次分享设置的为准；最后一次以前的都会被覆盖掉； 
 
 但是隐藏 分享面板选项则不同；每次都要重新跟新，并不以最后一次为准； 
 
 分享朋友圈的 取消回调函数，被官网取消了，监听不到cancel，原来的cancel和fail的作用类似了； 

```


**4.微信授权页在android 端 ifrmae 授权失败**

```纯文本 
 ios 没问题 android端有问题； 
 <div v-if="src" style="width:100%;height:100%"> 
         <iframe ref="iframe" class="iframe" sandbox="allow-scripts allow-same-origin allow-modals allow-forms allow-popups " :src="src"             frameborder="0"></iframe> 
 </div> 
 
 iframe src 改成http/https XXX 
 iframe 加属性 sandbox=“allow-scripts” （和js加载没关系） XXX 
 公众号配置业务域名 (我自己的域名没有备案，测试不了) 
 和https证书有没有关系 ？ (https://ww.baidu.com http://xiangzizhuye.top http://www.xiaoeknow.com都可以访问 ，https://appytR18sMu5554.h5.xiaoeknow.com/evaluation_wechat/customize_form/submit_info/form_vOfvev04aRGMIH不行) 
 (和www. 和https没有关系 和带参数没有关系 ) 是不是和页面跳转有关系？ 
 微信阻止iframe引入的链接跳转 --> 加属性 sandbox=“allow-scripts allow-same-origin allow-popups” XXX 
 ?5.  微信不允许iframe引入授权页面 ？？ 是的，直接window.href = ‘授权页面’ 
 
 还有一种说法是https 证书链缺失 有问题； 
 
 ios没问题是因为获取code后的重定向不是重定向 iframe标签的的连接；而是把整个父页面的连接改成了你redirect 的连接；
```


**5.本地持久化localstorage失效**

```纯文本 
 我们想判断一件事；当前的用户中心是否登陆了账号。 
 第一直觉是直接去根据localStorage判断用户有没登陆。但是其实是拿不到的，通过面板的模板消息点击进入页面拿到的整个localStorage是{ }。而账号确确实实是登陆了的呀。 
     那么就说明这是两套体系，模板消息进入的页面与菜单跳转进入的页面不是共通的。上微信公众平台看了下 
     首先我们把 微信内置的第三方网页看成是在整个浏览器环境下的想法是错误的，微信这个算不上浏览器，它是用chrome改造做的一套WKwebView,概念上类似是一套组建。百度上也有很多人吐槽这个问题，cookie和session都解决。 
 我的解决方法是在登陆账号的时候设置对应的cookie值，有效时间跟令牌或者token时间大致相同，最好是少一天。这样在外面模板消息点击进入页面时可以通过cookie来判断有没有登陆。 
 再提一个问题：若是本来没有登陆的情况下，点击模板消息的合作邀请会跳转进入合作邀请的页面，但是我判断它当前未登陆，所以就跳转到登陆页面去，（这个流程需要在localStorage中设置标识字段），当用户登陆后再跳转回合作邀请页面，然后确认合作。 
 这样一套流程走下来是没问题，但当用户第二次打开微信当然是点击用户中心菜单进去吧 ，这个时候尴尬了，因为之前的登陆操作的入口是模板消息那边进去的，前面提过了，两套体系不同，所以点击用户中心菜单进去的时候local根本是空的。 
 目前这个问题还没走下去， 鉴于上门提到的cookie好像是共用的，所以暂时是想着用cookie去尝试着做 。 
 
 现在看来： 
     localstorge在ios上取不到；android上还是有效地；但是从公众号入口进入和其他链接进入表现不同；不是同一套体系 
     session和浏览器上一致（实测了android；ios每测）； 
     cookie 应该没问题 

```


**6.移动端调用摄像头进行录像上传**

```纯文本 
 方案一：jssdk 微信api调用 
     发现 jssdk 并没有提供chooseVideo这样的api； 
 方案二：WeixinJSBRridge 
     下面的api 提示 access_denied;不知道是我使用不对还是 没有权限 
                     WeixinJSBridge.invoke('chooseVideo', { 
                         sourceType : ['album', 'camera'], 
                         maxDuration : '8',//限制录制时间 
                         camera : 'back', 
                         isShowProgressTips : 0 
                     }, function(res) { 
                         alert(JSON.stringify(res)); 
                         if (res.err_msg === "chooseVideo:ok") { 
                             window.localId = res.localId; 
                             callback(); 
                         } 
                     }); 
 方案三： 原生js 
     input type=file accept=video/*  capture=camera 没办法限制时间，压缩大小也需要额外来做 
 
 最后选择了方案三：  https://www.jianshu.com/p/00566fa72b97   参考资料 

```
