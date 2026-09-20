# 微信特殊

## 目录

- [https://www.cnblogs.com/chentan/p/6297064.html   x5内核的一些兼容问题](#httpswwwcnblogscomchentanp6297064html-x5内核的一些兼容问题)
- [微信内置浏览器私有接口WeixinJSBridge介绍](#微信内置浏览器私有接口WeixinJSBridge介绍)

# [**https://www.cnblogs.com/chentan/p/6297064.html**](https://www.cnblogs.com/chentan/p/6297064.html "https://www.cnblogs.com/chentan/p/6297064.html")\*\*   x5内核的一些兼容问题\*\*​

# **微信内置浏览器私有接口WeixinJSBridge介绍**

**1.禁止微信内置浏览器调整字体大小的方法js**

```纯文本 
 微信webview内置了调整字体大小的功能，用户可以根据实际情况进行调节。但是很多移动端页面的开发都是使用rem作为单位的，字体大小改变以后，会出现页面布局错乱的情况，因此希望能够禁止微信的字体放大功能，下面是通过查找资料找到的一些解决方法。 
 WeixinJSBridge（应该是web-view内置的一个对象；类似混合开发的桥） 
 
 1.安卓手机禁止微信客户端修改字体大小 
 <!-- 强制禁止用户修改微信客户端的字体大小---begin--- --> 
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
 
 <!-- 强制禁止用户修改微信客户端的字体大小---end--- --> 
 2.IOS系统禁止微信客户端修改字体大小 
 
 body {  /* IOS禁止微信调整字体大小 */ 
     -webkit-text-size-adjust: 100% !important; 
     text-size-adjust: 100% !important; 
     -moz-text-size-adjust: 100% !important; 
 } 

```


**2.其他一些api**

**其余功能不是不能用了，而是有各种条件了。以下列出的功能，均可直接使用，无需appid等任何东东，只要在手机微信网页环境中**

**可以在微信开发者工具里看一看**

```纯文本 
   mounted() { 
       setTimeout(()=>{ 
         console.log(WeixinJSBridge) 
       },2000) 
   }
```


![  ](./image/fcbdea408c3b9b7d5bcbdc2f77ecfa55_cqd1scUnm_.png "  ")

```纯文本 
 发送邮件 
 WeixinJSBridge.invoke("sendEmail", { 
             "title": "title!", 
             "content": "i am an Email!", //时间戳 这⾥里随意使⽤用了⼀一个值 
         }, 
             function (e) { 
                 //alert(e.err_msg) 
             }) 
 
 获取网路状态 
 WeixinJSBridge.invoke("getNetworkType", {}, 
                        function (e) { 
                            alert(netType[e.err_msg]) 
                        }) 
 
 预览图片 
 WeixinJSBridge.invoke("imagePreview",{ 
                 "urls":[ 
                 "http://rescdn.qqmail.com/bizmail/zh_CN/htmledition/images/bizmail/v3/logo1ca3fe.png", 
                 "http://rescdn.qqmail.com/bizmail/zh_CN/htmledition/images/bizmail/v3/icons_features1ca3fe.png", 
                 "http://rescdn.qqmail.com/bizmail/zh_CN/htmledition/images/bizmail/v3/icons_workStyle1ca3fe.png" 
                 ], 
                 "current":"http://rescdn.qqmail.com/bizmail/zh_CN/htmledition/images/bizmail/v3/icons_features1ca3fe.png" 
             }) 
 
 
 js功能：分享到朋友圈 
 function weixinShareTimeline(title,desc,link,imgUrl){ 
     WeixinJSBridge.invoke(‘shareTimeline',{ 
         “img_url”:imgUrl, 
         //”img_width”:”640″, 
         //”img_height”:”640″, 
         “link”:link, 
         “desc”: desc, 
         “title”:title 
     }); 
 } 
 
 发送给好友 
 function weixinSendAppMessage(title,desc,link,imgUrl){ 
     WeixinJSBridge.invoke(‘sendAppMessage',{ 
         //”appid”:appId, 
         “img_url”:imgUrl, 
         //”img_width”:”640″, 
         //”img_height”:”640″, 
         “link”:link, 
         “desc”:desc, 
         “title”:title 
     }); 
 } 
 分享到腾讯微博 
 function weixinShareWeibo(title,link){ 
     WeixinJSBridge.invoke(‘shareWeibo',{ 
         “content”:title + link, 
         “url”:link 
     }); 
 } 
 关注指定的微信号 
 function weixinAddContact(name){ 
     WeixinJSBridge.invoke(“addContact”, {webtype: “1″,username: name}, function(e) { 
         WeixinJSBridge.log(e.err_msg); 
         //e.err_msg:add_contact:added 已经添加 
         //e.err_msg:add_contact:cancel 取消添加 
         //e.err_msg:add_contact:ok 添加成功 
         if(e.err_msg == ‘add_contact:added' || e.err_msg == ‘add_contact:ok'){ 
             //关注成功，或者已经关注过 
         } 
     }) 
 }
```
