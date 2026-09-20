# 移动屏开发细节一

## 目录

- [文字字体不居中](#文字字体不居中)
  - [解决方案一、不要用这种居中方式](#解决方案一不要用这种居中方式)
  - [解决方案二、使用CSS3 scale属性，设置时将所有的值设置大一倍，然后缩小一倍](#解决方案二使用CSS3-scale属性设置时将所有的值设置大一倍然后缩小一倍)
- [字体 受手机主题 字体的 影响](#字体-受手机主题-字体的-影响)
- [拼音换行问题](#拼音换行问题)
- [iframe bug](#iframe-bug)

# **文字字体不居中**

&#x20;   先说下为什么line-height等于元素高度文字却没有垂直居中，其实line-height等于元素高度的时候文本并不是真的居中了，而是看着居中了，**当元素高度和font-size差距较大的时候**，这种不是真正的居中就越发的明显

#### **解决方案一、不要用这种居中方式**

```css 
 .text{ 
   width: 16px; 
   height: 16px; 
   font-size: 10px; 
   text-align: center; 
 } 
 .text::after{ 
   content: ' '; 
   display: inline-block; 
   width: 0; 
   height: 100%; 
   vertical-align: middle; 
   margin-top: 1px; //这一行不能省略 
 }
```


#### **解决方案二、使用CSS3 scale属性，设置时将所有的值设置大一倍，然后缩小一倍**

```纯文本 
 .text{ 
     width: 32px; 
     height: 32px; 
     line-height: 32px; 
     font-size: 20px; 
     text-align: center; 
     transform: scale(0.5); 
 }
```


# **字体 受手机主题 字体的 影响**

```纯文本 
 见 css 自定义字体：@face-font 影响； 别忘了 ！important
```


# **拼音换行问题**

```纯文本 title="复合事件"
 
 compositionstart 事件在用户开始进行非直接输入的时候触 
 compositionend  事件在用户开始进行非直接输入结束的时候触发 
 compositionupdate  输入过程中不断更新 （可以去到拼音+ value 解决换行问题） 
 
 不要用v-model  可以 用 :value  和 input
```


# **iframe bug**

```纯文本 
 bug1:  微信不支持在android 上 授权重定向；ios支持但是是刷新整个父页面； 
 解决方法： 不进行重定向授权 
 
 
 bug2： iframe 嵌套页面时注意： 在 iphone xs max上出现：第一个页面过长；跳转到第二个页面 导致第二个页面的html 高度是第一个页面的高度；表现出渲染不及时；底部留有大空白的bug； 
 解决方法： scrollto 到底部 
 
 bug3：   iframe收回软键盘导致   页面不下来留有空白的问题 
 https://www.cnblogs.com/lisaShare/p/10576875.html 
 var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i); 
     if(wechatInfo){ 
         $("input,textarea").blur(function(){ 
         var currentPosition,timer; 
         var speed=1;//页面滚动距离 
         timer = setInterval(function(){ 
             currentPosition = $('window.top').scrollTop(); 
             currentPosition-=speed; 
             window.top.scrollTo(0,currentPosition);//页面向上滚动 
             currentPosition+=speed; //speed变量 
             window.top.scrollTo(0,currentPosition);//页面向下滚动 
             clearInterval(timer); 
         },1); 
     }) 
 }
```
