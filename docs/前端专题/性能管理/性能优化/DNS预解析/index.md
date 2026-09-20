# DNS预解析

## 目录

- [什么是 DNS Prefetch](#什么是-DNS-Prefetch)
  - [下面我们来简单了解一下dns-prefetch：](#下面我们来简单了解一下dns-prefetch)

# 什么是 DNS Prefetch

DNS 实现域名到IP的映射。通过域名访问站点，每次请求都要做DNS解析。目前每次DNS解析，通常在200ms以下。针对DNS解析耗时问题，一些浏览器通过DNS Prefetch 来提高访问的流畅性。 

DNS Prefetch 是一种DNS 预解析技术，当浏览网页时，浏览器会在加载网页时对网页中的域名进行解析缓存，这样在单击当前网页中的连接时就无需进行DNS的解析，减少用户等待时间，提高用户体验。 

目前支持 DNS Prefetch 的浏览器有 google chrome 和 firefox 3.5 

如果要浏览器端对特定的域名进行解析，可以再页面中添加link标签实现。例如： 

\<link rel="dns-prefetch" href="<http://img.jb51.net>" /> 

如果要控制浏览器端是否对域名进行预解析，可以通过Http header 的x-dns-prefetch-control 属性进行控制。

## 下面我们来简单了解一下dns-prefetch：

DNS 作为互联网的基础协议，其解析的速度似乎容易被网站优化人员忽视。现在大多数新浏览器已经针对DNS解析进行了优化，典型的一次DNS解析耗费20-120 毫秒，减少DNS解析时间和次数是个很好的优化方式。DNS Prefetching是具有此属性的域名不需要用户点击链接就在后台解析，而域名解析和内容载入是串行的网络操作，所以这个方式能减少用户的等待时间，提升用户体验。

浏览器对网站第一次的域名DNS解析查找流程依次为：

浏览器缓存-系统缓存-路由器缓存-ISP DNS缓存-递归搜索

预解析的实现：

1\. 用meta信息来告知浏览器, 当前页面要做DNS预解析:\<meta http-equiv="x-dns-prefetch-control" content="on" />

2\. 在页面header中使用link标签来强制对DNS预解析: \<link rel="dns-prefetch" href="<http://bdimg.share.baidu.com>" />

注：dns-prefetch需慎用，多页面重复DNS预解析会增加重复DNS查询次数。

PS：DNS预解析主要是用于网站前端页面优化，在SEO中的作用湛蓝还未作验证，但作为增强用户体验的一部分rel="dns-prefetch"或许值得大家慢慢发现。

如果需要禁止隐式的 DNS Prefetch，可以使用以下的标签：

```javascript 
 <meta http-equiv="x-dns-prefetch-control" content="off">
<meta http-equiv="x-dns-prefetch-control" content="on">
```


需要注意的是，虽然使用 DNS Prefetch 能够加快页面的解析速度，但是也不能滥用，因为有开发者指出 禁用DNS 预读取能节省每月100亿的DNS查询 。

```javascript 
 <link rel="dns-prefetch" href="//www.zhix.net">
<link rel="dns-prefetch" href="//api.share.zhix.net">
<link rel="dns-prefetch" href="//bdimg.share.zhix.net">
```


[preconnect 和 dns-prefetch](<./preconnect 和 dns-prefetch/index.md> "preconnect 和 dns-prefetch")
