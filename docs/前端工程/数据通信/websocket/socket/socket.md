# socket

## 目录

- [状态码：](#状态码)
- [场景](#场景)
- [配置](#配置)
- [原理](#原理)
  - [请求头特征](#请求头特征)
  - [横向对比](#横向对比)
    - [短连接轮询](#短连接轮询)
    - [长连接](#长连接)
    - [Websocket](#Websocket)
- [应用](#应用)
  - [心跳保活](#心跳保活)
  - [Snappy 压缩（横向对比了 gzip / zip / 7z）](#Snappy-压缩横向对比了-gzip--zip--7z)
  - [埋点中间层缓存（重复的用户信息可以不用每次都上报，支持刷新缓存）](#埋点中间层缓存重复的用户信息可以不用每次都上报支持刷新缓存)

# 状态码：

**status 101 开始转换网络协议**

# 场景

- 特点: 双向通讯
- 在线聊天室、在线客服系统、评论系统
- 本质：就是一种协议：叫做webSocket 是h5的api

# 配置

- 状态码：400:
- 语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。 　　2、请求参数有误。

\*\*nginx配置：  \*\*

***

```text 
proxy_http_version 1.1;     websocket必须要使用 的http/1.1 通讯协议
 proxy_set_header Upgrade $http_upgrade;   下面这两行是  告诉nginx 响应http协议的升级请求 
proxy_set_header Connection "upgrade";
```


# 原理

![](image_bx-Dvlz7au.png)

## 请求头特征

- HTTP 必须是 1.1 GET 请求
- HTTP Header 中 Connection 字段的值必须为 Upgrade
- HTTP Header 中 Upgrade 字段必须为 websocket
- Sec-WebSocket-Key 字段的值是采用 base64 编码的随机 16 字节字符串
- Sec-WebSocket-Protocol 字段的值记录使用的子协议，比如 binary base64

## 横向对比

### 短连接轮询

- ***很耗费 TCP 连接***
- ***而且 Header 重复发送***
- 且通过宏任务发起，受限于 Event Loop，***无法保证及时******性***
- 同时***无效请求会很多***

### 长连接

- HTTP ***keep-alive*** 开启后虽然\*\*\* TCP 可以复用\*\*\*，但是 ***Header 重复的问题并没有解决***
- 同时 HTTP keep-alive ***还有一个有效期，*** 有效期结束后服务端会发侦查帧探查 TCP 是否有效

> HTTP keep-alive 的作用是，告知服务端持久化当前的 TCP 连接，不要立即断开，以便后续的 HTTP 请求复用它，也就是我们所说的「长连接」

### Websocket

- 和 HTTP 一样都是***建立在 TCP 协议***之上，但***只需一次 HTTP 握手***，就能建立持久性连接，后续就不走 HTTP 了,而是 *WebSocket 特有的数据帧*
- 全双工通信，双向数据传输
- ***数据格式轻量，且支持发送二进制数据***，支持 ws 和加密的 wss

# 应用

## 心跳保活

**背景与目的：为了减少 TCP 连接的无效占用，客户端定时发送一个空包到服务端，告知服务端不要销毁这条 socket，如果服务端超过一定时间都没收到心跳包，则将关闭并销毁该 socket**

## Snappy 压缩（横向对比了 gzip / zip / 7z）

背景与目的：引入第三方压缩包（牺牲包体积），减少 websocket 传输的字节数

```typescript 
import Snappy from 'snappy';
SocketTask.sendSocketMessage = function (msg) {
   const encryptedMsg = Snappy.encode(msg);
   wx.send(encryptedMsg);
}

```


## 埋点中间层缓存（重复的用户信息可以不用每次都上报，支持刷新缓存）

背景与目的：为减少网络传输的包体积，通过 websocket 上报埋点日志时，可以把**部分重复字段值在第一次上报时缓存在服务端**，从第二次上报开始只上报值不重复的字段，然后由服务端做日志合并

```typescript 
SocketTask.sendSocketMessage({
     msg_type: '埋点日志'，
     logs: {
       country: 'China', // 可缓存字段
       city: '北京', // 可缓存字段
       platform: '安卓', // 可缓存字段
       click_some_btn: true // 动态变化的埋点字段
     },
     cacheFields: ['country', 'city', 'platform'] // 只在第一次上报时携带
 });

```
