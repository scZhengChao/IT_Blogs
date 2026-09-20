# macbook Proxy error

## 目录

- [项目前提背景](#项目前提背景)
- [问题](#问题)
- [排查过程](#排查过程)
  - [1. 搜索引擎](#1-搜索引擎)
  - [2.不通过ng转发，直接访问后端部署的ip:port来访问](#2不通过ng转发直接访问后端部署的ipport来访问)
  - [3.ng转发时加上跨域请求头](#3ng转发时加上跨域请求头)
  - [4.开启chrome跨域限制](#4开启chrome跨域限制)
  - [5. 增加请求头Connection: "keep-alive"](#5-增加请求头Connection-keep-alive)

## 项目前提背景

前端项目下各业务系统及用户中心分别部署在不同服务器上，为了使用同一cookie，在一台服务器上做nginx转发。接口跨域问题，由前端通过webpack-dev-server解决；

## 问题

从今年大概6月份开始，出现一个问题：本地起项目，访问接口时5次有3次会出现以下错误：`Proxy error: Could not proxy request //api/getCurrentUser?id=320 from localhost:8010 to http://***. See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (ETIMEDOUT)。`这个偶现问题，在我跟另一个使用mac的同事电脑上一定会出现，但是使用windows的同事却从未出现该问题；并且直接部署在服务器上时，mac也不会出现连接超时的问题；说明问题出在mac本地代理到服务器的过程中；

## 排查过程

#### 1. 搜索引擎

\---fail根据错误寻找到的答案也并没有得到解决：[(20条消息) 跨域请求：Proxy error: Could not proxy request 时不时的报这个错误，不知道为啥？-前端-CSDN问答](https://links.jianshu.com/go?to=https://ask.csdn.net/questions/1054158 "(20条消息) 跨域请求：Proxy error: Could not proxy request 时不时的报这个错误，不知道为啥？-前端-CSDN问答")

#### 2.不通过ng转发，直接访问后端部署的ip:port来访问

\---fail &#x20;
ng在A服务器上，业务系统的后端分别部署在A、B、C服务器上，在本地配置代理时，直接配置后端部署的ip:port，发现部署在A、B上的接口同样会出现该问题，但是部署在C服务器上的接口访问非常顺畅；

#### 3.ng转发时加上跨域请求头

\---fail &#x20;
没有生效

#### 4.开启chrome跨域限制

\---fail设置后浏览器是裸奔的，收藏夹、Vue devtools都没法用，属于顾此失彼的解决办法[mac上设置新版chrome浏览器跨域 - mackxu - 博客园 (cnblogs.com)](https://links.jianshu.com/go?to=https://www.cnblogs.com/mackxu/p/cross-domain.html "mac上设置新版chrome浏览器跨域 - mackxu - 博客园 (cnblogs.com)")

### 5. 增加请求头Connection: "keep-alive"

\---pass

1. 观察nginx日志，当直接测试环境的业务系统时，本地IP发起的请求nginx全部接收到了；但通过本地打开业务系统时，本地IP发起的请求，5个只有1～3个被ng接收到了，说明在与服务器连接过程中失败了；
2. 查看webpack-dev-server源码，webpack是使用http-proxy-middleware来实现接口代理的。本地的报错状态码是ECONNRESET，

```javascript 
if (res.writeHead && !res.headersSent) {
  if (/HPE_INVALID/.test(code)) {
    res.writeHead(502)
  } else {
    switch (code) {
      case 'ECONNRESET':
      case 'ENOTFOUND':
      case 'ECONNREFUSED':
        res.writeHead(504)
        break
      default:
        res.writeHead(500)
    }
  }
}
```


3.google关键词"mac ECONNRESET", 找到了出现该问题的解决办法：[node.js - Why I keep getting ECONNRESET error on proxy calls in MAC OSX only, totally arbitrary with some successful calls (Pretty desperate) - Stack Overflow](https://links.jianshu.com/go?to=https://stackoverflow.com/questions/54096937/why-i-keep-getting-econnreset-error-on-proxy-calls-in-mac-osx-only-totally-arbi "node.js - Why I keep getting ECONNRESET error on proxy calls in MAC OSX only, totally arbitrary with some successful calls (Pretty desperate) - Stack Overflow")

```javascript 
proxy: {
    "/act": {
      "target": "http://auditopc.tinyvoice.net/",
      "changeOrigin": true,
      "headers": {
        "Connection": "keep-alive"
      }

    },
    "/kpi": {
      "target": "http://auditopc.tinyvoice.net/",
      "changeOrigin": true,
      "headers": {
        "Connection": "keep-alive"
      }
    },
    "/sys": {
      "target": "http://auditopc.tinyvoice.net/",
      "changeOrigin": true,
      "headers": {
        "Connection": "keep-alive"
      }
    },
    "/mail": {
      "target": "http://auditopc.tinyvoice.net/",
      "changeOrigin": true,
      "headers": {
        "Connection": "keep-alive"
      }
    },
    "/report": {
      "target": "http://auditopc.tinyvoice.net/",
      "changeOrigin": true,
      "headers": {
        "Connection": "keep-alive"
      }
    },
    "/oss": {
      "target": "http://auditopc.tinyvoice.net/",
      "changeOrigin": true,
      "headers": {
        "Connection": "keep-alive"
      }
    },
```
