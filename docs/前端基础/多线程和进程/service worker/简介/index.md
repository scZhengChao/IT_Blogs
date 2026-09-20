# 简介

## 目录

- [一句话概括](#一句话概括)
- [由来](#由来)
- [兼容性](#兼容性)
- [成熟程度](#成熟程度)
- [使用条件](#使用条件)
- [调试方法](#调试方法)

Service Worker**本质上也是浏览器缓存资源用的**，只不过他不仅仅是Cache，也是通过worker的方式来进一步优化。
他**基于h5的web worker**，所以**绝对不会阻碍当前js线程的执行**，sw最重要的工作原理就是：
1、**后台线程**：独立于当前网页线程；
2、**网络代理：在网页发起请求时代理，来缓存文件。**

### 一句话概括

&#x20;    **一个服务器与浏览器之间的中间人角色**，如果网站中注册了service worker那么它可以拦截当前网站所有的请求，进行判断（需要编写相应的判断程序），如果需要向服务器发起请求的就转给服务器，**如果可以直接使用缓存的就直接返回缓存不再转给服务器。从而大大提高浏览体验。**

### 由来

W3C 组织早在 2014 年 5 月就提出过 Service Worker 这样的一个 HTML5 API ，**主要用来做持久的离线缓存**。service worker是浏览器的一个高级特性，**本质是一个web worker**，`是独立于网页运行的脚本`。 web worker这个api被造出来时，就是为了`解放主线程`。因为，浏览器中的JavaScript都是运行在单一个线程上，随着web业务变得越来越复杂，js中耗时间、耗资源的运算过程则会导致各种程度的性能问题。 而web worker由于独立于主线程，则可以将一些复杂的逻辑交由它来去做，完成后再通过postMessage的方法告诉主线程。 **service worker则是web worker的升级版本，相较于后者，前者拥有了持久离线缓存的能力。**

# 兼容性

![](./image/image_3yuAWolM4s.png)

基本上新版浏览器还是兼容滴

# **成熟程度**

判断一个技术是否值得尝试，肯定要考虑下它的成熟程度，否则过一段时间又和应用缓存一样被规范抛弃就尴尬了。

所以这里我列举了几个使用Service Worker的页面：

- 淘宝
- 网易新闻
- 考拉

所以说还是可以尝试下的。

# **使用条件**

**sw 是基于 HTTPS 的，因为Service Worker中涉及到请求拦截，** ​**所以必须使用HTTPS协议来保障安全**。如果是本地调试的话，localhost是可以的。

而我们刚好全站强制https化，所以正好可以使用。

# 调试方法

一个网站是否启用Service Worker，可以通过**开发者工具中的Application来查看：**

![](./image/image_Vrglb3fS25.png)

被Service Worker缓存的文件，可以在**Network中看到Size项为from Service Worker**：

![](./image/image_YBGHgramnG.png)

也可以在Application的**Cache Storage中查看缓存的具体内容：**

![](./image/image_0wtfK19wC1.png)

如果是具体的断点调试，需要使用对应的线程，**不再是main线程了，这也是webworker的通用调试方法：**

![](./image/image_jx0osbfoup.png)
