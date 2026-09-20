# meta

## 目录

- [http-equiv](#http-equiv)
- [Viewport](#Viewport)
  - [什么是Viewport](#什么是Viewport)
  - [Viewport 基础](#Viewport-基础)
  - [关于viewport的一些问题](#关于viewport的一些问题)

# **http-equiv**

http-equiv顾名思义，**相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容，与之对应的属性值为content，content中的内容其实就是各个参数的变量值**。

http-equiv 属性提供了 content 属性的信息/值的 HTTP 头。

http-equiv 属性可用于模拟一个 HTTP 响应头。

meat标签的http-equiv属性语法格式是：＜meta http-equiv="参数" content="参数变量值"＞；

其中http-equiv属性主要有以下几种参数：

- 1、Expires(期限)

说明：可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输。

用法：＜meta http-equiv="expires" content="Wed, 20 Jun 2007 22:33:00 GMT"＞   注意：必须使用GMT的时间格式。

- 2、Pragma(cache模式)

说明：是用于设定禁止浏览器从本地机的缓存中调阅页面内容，设定后一旦离开网页就无法从Cache中再调出

用法： ＜meta http-equiv="Pragma" content="no-cache"＞  注意：这样设定，访问者将无法脱机浏览。

- 3.Refresh(刷新)

说明：自动刷新并指向新页面。

用法： ＜meta http-equiv="Refresh" content="2；URL=<http://www.net.cn/"＞  注意：其中的2是指停留2秒钟后自动刷新到URL网址。>

- 4、Set-Cookie(cookie设定)

说明：如果网页过期，那么存盘的cookie将被删除。

用法：＜meta http-equiv="Set-Cookie" content="cookievalue=xxx;expires=Wednesday, 20-Jun-2007 22:33:00 GMT； path=/"＞ 注意：必须使用GMT的时间格式。 

- 5、Window-target(显示窗口的设定)

说明：强制页面在当前窗口以独立页面显示

用法： ＜meta http-equiv="Window-target" content="\_top"＞

- 6.content-Type(显示字符集的设定)

说明：设定页面使用的字符集。

用法：＜meta http-equiv="content-Type" content="text/html; charset=gb2312"＞

- 7、Pics-label(网页等级评定)

用法：\<meta http-equiv="Pics-label" contect="">  

- 8、Page\_Enter、Page\_Exit

设定进入页面时的特殊效果

用法：\<meta http-equiv="Page-Enter"    contect="revealTrans(duration=1.0,transtion=    12)">

设定离开页面时的特殊效果

用法：\<meta http-equiv="Page-Exit"    contect="revealTrans(duration=1.0,transtion=    12)">

Duration的值为网页动态过渡的时间，单位为秒。  

Transition是过渡方式，它的值为0到23，分别对应24种过渡方式。如下表：  

0    盒状收缩    1    盒状放射  

2    圆形收缩    3    圆形放射  

4    由下往上    5    由上往下  

6    从左至右    7    从右至左  

8    垂直百叶窗    9    水平百叶窗  

10    水平格状百叶窗    11垂直格状百叶窗  

12    随意溶解    13从左右两端向中间展开  

14从中间向左右两端展开    15从上下两端向中间展开  

16从中间向上下两端展开    17    从右上角向左下角展开  

18    从右下角向左上角展开    19    从左上角向右下角展开  

20    从左下角向右上角展开    21    水平线状展开  

22    垂直线状展开    23    随机产生一种过渡方式  

- 9、清除缓存（再访问这个网站要重新下载！）cache-control

用法：\<meta http-equiv="cache-control" content="no-cache">  

- 10、设定网页的到期时间 expires

用法：\<meta http-equiv="expires" content="0">

- 11、关键字,给搜索引擎用的 keywords

用法：\<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">

- 12.页面描述 description

用法：\<meta http-equiv="description" content="This is my page">

不再缓存html页面（仅html页面）（js，css，图片照旧）

    \<meta http-equiv="Pragma" content="no-cache"/>

　  \<meta http-equiv="Cache-control" content="no-cache;max-age=0"/>

　  \<meta http-equiv="expires" content="0"/>

# **Viewport**

## **什么是Viewport**

手机浏览器是把页面放在一个虚拟的“窗口”（viewport）中，通常这个虚拟的“窗口”（viewport）比屏幕宽，这样就不用把每个网页挤到很小的窗口中（这样会破坏没有针对手机浏览器优化的网页的布局），用户可以通过平移和缩放来看网页的不同部分。移动版的 Safari 浏览器最新引进了 viewport 这个 meta tag，让网页开发者来控制 viewport 的大小和缩放，其他手机浏览器也基本支持。

## **Viewport 基础**

一个常用的针对移动网页优化过的页面的 viewport meta 标签大致如下：

\<meta name=”viewport” content=”width=device-width, initial-scale=1, maximum-scale=1″>

width：控制 viewport 的大小，可以指定的一个值，如果 600，或者特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。

height：和 width 相对应，指定高度。

initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。

maximum-scale：允许用户缩放到的最大比例。

minimum-scale：允许用户缩放到的最小比例。

user-scalable：用户是否可以手动缩放

## **关于viewport的一些问题**

viewport并非只是ios上的独有属性，在android、winphone上同样也有viewport。它**们要解决的问题是相同的，即无视设备的真实分辨率，直接通过dpi，在物理尺寸和浏览器之间重设分辨率**，这个分辨率和设备的分辨率无关。比如，你拿个3.5寸-320 \* 480的iphone3 gs、3.5寸-640 \* 960的iphone4或者9.7寸-1024\*768的ipad2，虽然设备的分辨率不同,物理尺寸也不同，但你可以通过设置viewport让它们在浏览器里有相同的分辨率。比如说，你的网站是800px宽，你可以通过设置viewport的width=800，来让你的网站在这三个不同的设备上都刚好满屏显示你的网站。

以上的知识，相信每个对viewport稍有了解的同学应该都已经了解了。这不是我今天想说的重点。我想说明的是viewport在ios和android上的一些差异表现。

网上一搜关于viewport的知识，基本上全都是如下信息：

```javascript 
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
```


这段代码的意思是，让viewport的宽度等于物理设备上的真实分辨率，不允许用户缩放。一都主流的web app都是这么设置的，它的作用其实是故意舍弃viewport，不缩放页面，这样dpi肯定和设备上的真实分辨率是一样的，不做任何缩放，网页会因此显得更高细腻。玩ps的同学应该都知道，当你将一张1000 \* 1000的图片直接缩放至500 \* 500分变成什么样，对吧？图片的失真一定逃不掉。但
