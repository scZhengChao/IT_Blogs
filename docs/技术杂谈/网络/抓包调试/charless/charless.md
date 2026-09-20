# charless

## 目录

- [windows](#windows)
- [Mac ](#Mac-)
  - [修改了手机网络代理联不上网；](#修改了手机网络代理联不上网)

# windows

关闭防火墙

[windows电脑使用Charles抓包 - 李传炎 - 博客园 1. 电脑安装Charles软件 官网安装包下载地址：https://www.charlesproxy.com/download/ 2. 电脑安装Charles证书 打开Charles，Help -& https://www.cnblogs.com/lichuanyan/p/11205246.html](https://www.cnblogs.com/lichuanyan/p/11205246.html "windows电脑使用Charles抓包 - 李传炎 - 博客园 1. 电脑安装Charles软件 官网安装包下载地址：https://www.charlesproxy.com/download/ 2. 电脑安装Charles证书 打开Charles，Help -& https://www.cnblogs.com/lichuanyan/p/11205246.html")

[https://blog.csdn.net/abc6368765/article/details/80976652](https://blog.csdn.net/abc6368765/article/details/80976652 "https://blog.csdn.net/abc6368765/article/details/80976652")

**SSL Pinning 双向验证防止抓包**

[为了抓包某app,我折腾了10天,原来他是这样防抓包的 --艺灵设计 为了抓包某app,我折腾了10天,原来他是这样防抓包的|为了抓包一款app，无知的我折腾了10天时间，最终在逆向大神的指点下才成功抓包。这10天，一共接触了6款知名抓包软件、几款安卓模拟器、几种对SSL Pinning绕过的工具、初步了解逆向破解思路...... http://www.yilingsj.com/xwzj/2019-03-25/ssl-pinning.html](http://www.yilingsj.com/xwzj/2019-03-25/ssl-pinning.html "为了抓包某app,我折腾了10天,原来他是这样防抓包的 --艺灵设计 为了抓包某app,我折腾了10天,原来他是这样防抓包的|为了抓包一款app，无知的我折腾了10天时间，最终在逆向大神的指点下才成功抓包。这10天，一共接触了6款知名抓包软件、几款安卓模拟器、几种对SSL Pinning绕过的工具、初步了解逆向破解思路...... http://www.yilingsj.com/xwzj/2019-03-25/ssl-pinning.html")

大神

[【答疑解惑】为什么你的 Charles 会抓包失败？ 作为一名 Web 开发工程师，天天都会和网络打交道。Charles 作为一款网络抓包工具，几乎成了 Web 开发的标配。 本文是我 深度使用 Charles 后总结而成，不同于其它介绍 Charles 的文章，这篇文章不会详细介绍 Charl… https://zhuanlan.zhihu.com/p/259336762](https://zhuanlan.zhihu.com/p/259336762 "【答疑解惑】为什么你的 Charles 会抓包失败？ 作为一名 Web 开发工程师，天天都会和网络打交道。Charles 作为一款网络抓包工具，几乎成了 Web 开发的标配。 本文是我 深度使用 Charles 后总结而成，不同于其它介绍 Charles 的文章，这篇文章不会详细介绍 Charl… https://zhuanlan.zhihu.com/p/259336762")

# Mac&#x20;

破解版

[Charles Mac 破解版安装教程 Charles Mac是一款免费的HTTP信息抓包工具，可以有效地获取HTTP通信信息，主要用于网页的开发\[http://www.pc6.com/mach/rjkfgj/\]和... https://www.jianshu.com/p/c4a390b52041](https://www.jianshu.com/p/c4a390b52041 "Charles Mac 破解版安装教程 Charles Mac是一款免费的HTTP信息抓包工具，可以有效地获取HTTP通信信息，主要用于网页的开发\[http://www.pc6.com/mach/rjkfgj/]和... https://www.jianshu.com/p/c4a390b52041")

Mac Charles 配置：

[macOS: mac下配置charles来抓取http请求 - 夜行过客 - 博客园 1. 准备charles 下载链接：https://www.charlesproxy.com/download/ 2. 配置charles 2.1）配置http代理。打开Charles软件，配置htt https://www.cnblogs.com/yongdaimi/p/11344931.html](https://www.cnblogs.com/yongdaimi/p/11344931.html "macOS: mac下配置charles来抓取http请求 - 夜行过客 - 博客园 1. 准备charles 下载链接：https://www.charlesproxy.com/download/ 2. 配置charles 2.1）配置http代理。打开Charles软件，配置htt https://www.cnblogs.com/yongdaimi/p/11344931.html")

安装证书失败：

也可以搜索 华为安装charles 证书：

安全==》更多安全设置==〉加密和凭据==》从储存设备安装

https：unkown

[解决Charles https抓包显示\<unknown> 用mac电脑开发安卓的都应该知道青花瓷吧\~（不知道的都是小菜鸡，邪恶.jpg） 安装证书 电脑端 点击 Help  -- SSL Proxying -- Install Ch... https://www.jianshu.com/p/4635aa405568](https://www.jianshu.com/p/4635aa405568 "解决Charles https抓包显示<unknown> 用mac电脑开发安卓的都应该知道青花瓷吧~（不知道的都是小菜鸡，邪恶.jpg） 安装证书 电脑端 点击 Help  -- SSL Proxying -- Install Ch... https://www.jianshu.com/p/4635aa405568")

最后发现android https 就是抓不了；网上的没解决我的问题； 随缘吧

最后把Proxy——>SSL Proxying Settings,include 改成 *.* 发现一半https可以抓包了成了；一些还是抓不了；

### 修改了手机网络代理联不上网；

\*\*    证书没安装 或者安装了没信任\*\*​

[Android（华为Mate9Pro为例）：浏览器输入网址chls.pro/ssl下载证书（记住下载路径，一般默认文件管理-Download中可找到），设置-](http://Android%EF%BC%88%E5%8D%8E%E4%B8%BAMate9Pro%E4%B8%BA%E4%BE%8B%EF%BC%89%EF%BC%9A%E6%B5%8F%E8%A7%88%E5%99%A8%E8%BE%93%E5%85%A5%E7%BD%91%E5%9D%80chls.pro/ssl%E4%B8%8B%E8%BD%BD%E8%AF%81%E4%B9%A6%EF%BC%88%E8%AE%B0%E4%BD%8F%E4%B8%8B%E8%BD%BD%E8%B7%AF%E5%BE%84%EF%BC%8C%E4%B8%80%E8%88%AC%E9%BB%98%E8%AE%A4%E6%96%87%E4%BB%B6%E7%AE%A1%E7%90%86-Download%E4%B8%AD%E5%8F%AF%E6%89%BE%E5%88%B0%EF%BC%89%EF%BC%8C%E8%AE%BE%E7%BD%AE- "Android（华为Mate9Pro为例）：浏览器输入网址chls.pro/ssl下载证书（记住下载路径，一般默认文件管理-Download中可找到），设置-")

\>无线和网络->WLAN->（更多）高级WLAN设置-安装证书（找到证书路径安装）&#x20;

大神文章：

[https://cloud.tencent.com/developer/article/1490033](https://cloud.tencent.com/developer/article/1490033 "https://cloud.tencent.com/developer/article/1490033")

[重定向](技术杂谈/网络/抓包调试/charless/重定向.md "重定向")

[弱网测试](弱网测试.md "弱网测试")

[过滤请求](过滤请求.md "过滤请求")

[Rewrite 功能](<Rewrite 功能.md> "Rewrite 功能")

[简单压力测试 ](简单压力测试-.md "简单压力测试 ")
