# referer

## 目录

- [referer简介](#referer简介)
- [Referer作用是什么？](#Referer作用是什么)
  - [1）防盗链](#1防盗链)
  - [  2）防止恶意请求](#--2防止恶意请求)

![  ](./assets/image/13566833-e3f83f36fe64908f_jT3kghzU89.png "  ")

```纯文本 
 
 
 空Referer是怎么回事？ 
     1、None：绝不允许referrer data通过 
         标签写法：<meta name="referrer" content="none"> 
     2、None When Downgrade：发送referrer信息去安全的HTTPS站点，而非不稳定的HTTP站点。 
         标签写法：<meta name="referrer" content="none-when-downgrade"> 
     3、Origin Only: 发送协议、主机和端口（即子域）没有一个完整的URL作为来源， 
         即https://moz.com/example.html只会发送https://moz.com 
         标签写法：<meta name="referrer" content="origin"> 
     4、Origin When Cross-Origin: 当传origin-only来路信息发送给外部站点时，如果目标有相同的协议、主机和端口 
     （即子域），无论它是HTTP或HTTPS，都将全部的URL作为Referrer发送出去。（注解：官方说明书上有一处排印错误，将来的版本应该是"origin-when-cross-origin"） 
         标签写法：<meta name="referrer" content="origin-when-crossorigin"> 
     5、Unsafe URL: 总是将URL字串作为一个referrer通过。 
         注意：如果你的URL中存在任何敏感信息，这不是最安全的选择。其中URL的片段、用户名、密码被自动剥去。 
         标签写法：<meta name="referrer" content="unsafe-url"></meta> 
 
 Referer的正确英语拼法是referrer 
     js 获取 document.referrer
```


&#x20;  &#x20;

&#x20;

# referer简介

&#x20;        `Referer`是`HTTP`请求`Header`的一部分，当浏览器向`Web`服务器发送请求的时候 **，请求头信息一般需要包含Referer**。该Referer会告诉服务器我是从哪个页面链接过来的，服务器基此可以获得一些信息用于处理。

# Referer作用是什么？

#### 1）防盗链

&#x20;             比如办事通**服务器只允许网站访问自己的静态资源**，那**服务器每次都需要判断Referer的值是否是zwfw\.yn.gov.cn**，如果是就继续访问，不是就拦截。

#### &#x20; 2）防止恶意请求

&#x20;            比如静态请求是.html结尾的，动态请求是.shtml，**那么所有的 \*.shtml请求，必须 Referer为我自己的网站才可以访问**，这就是Referer的作用。
