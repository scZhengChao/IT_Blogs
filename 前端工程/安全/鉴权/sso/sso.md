# sso

## 目录

- [单点登录](#单点登录)
- [实现方案](#实现方案)
  - [关键点](#关键点)

## 单点登录

单点登录：Single Sign On，简称SSO。用户只要登录一次，就可以访问所有相关信任应用的资源。企业里面用的会比较多，有很多内网平台，但是只要在一个系统登录就可以。

## 实现方案

- 单一域名：可以***把 cookie 种在二级域名下实现单点登录***；平安的 sso ； 利用 paic.com 作为一个耳机的域名； 共享cookie；（详细见：[域名、顶级域名、一级域名、二级域名、子域名](域名、顶级域名、一级域名、二级域名、子域名.md "域名、顶级域名、一级域名、二级域名、子域名")）
- 多域名：常用 CAS来解决，**新增一个认证中心的服务**。CAS（Central Authentication Service）是实现SSO单点登录的框架

具体的可以下面的文章，讲解的很详细

- [CAS实现单点登录SSO执行原理探究(终于明白了)](https://link.juejin.cn?target=https://blog.csdn.net/javaloveiphone/article/details/52439613 "CAS实现单点登录SSO执行原理探究(终于明白了)")
- [一张图看明白CAS单点登录原理](https://link.juejin.cn?target=https://blog.csdn.net/qq_21251983/article/details/52695206 "一张图看明白CAS单点登录原理")

#### 关键点

下面是举例来详细说明CAS实现单点登录的流程：

一、第一次访问系统A

1. 用户访问系统A ([www.app1.com)，](http://www.app1.com\)，) 跳转认证中心 client([www.sso.com)，然后输入用户名，密码登录，然后认证中心](http://www.sso.com\)，然后输入用户名，密码登录，然后认证中心) serverSSO 把 **cookieSSO**  **种在认证中心的域名下 ([www.sso.com)，](http://www.sso.com\)，)**重定向到系统A，并且带上**生成的 ****`ticket`**** 参数 (**[**www.app1.com?ticket**](https://link.juejin.cn?target=http://www.app1.com?ticket "www.app1.com?ticket")\*\* =xxx)\*\* ​
2. 系统A ([www.app1.com?ticket](http://www.app1.com?ticket) =xxx)请求系统A的后端 serverA ，serverA 去 serverSSO 验证，通过后，将**cookieA**种在 [www.app1.com下](http://www.app1.com下)

二、第二次访问系统A 直接携带 cookieA 去访问后端，验证通过后，即登录成功。

三、第三次访问系统B

1. 访问系统B ([www.app2.com)，跳转到认证中心](http://www.app2.com\)，跳转到认证中心) client([www.sso.com)，](http://www.sso.com\)，) 这个时候会把认证中心的**cookieSSO**也携带上，*发现用户已登录过，则直接重定向到系统B（[www.app2.com）](http://www.app2.com）)*， 并且带上生成的ticket参数（[www.app2.com?ticket](http://www.app2.com?ticket "www.app2.com?ticket") =xxx）
2. 系统B ([www.app2.com?ticket](http://www.app2.com?ticket) =xxx)请求系统B的后端 serverB，serverB 去 serverSSO 验证，通过后，将**cookieB**种在www\.app2.com下

注意cookie生成时机及种的位置。

- cookieSSO，SSO域名下的cookie
- cookieA，系统A域名下的cookie
- cookieB，系统B域名下的cookie
