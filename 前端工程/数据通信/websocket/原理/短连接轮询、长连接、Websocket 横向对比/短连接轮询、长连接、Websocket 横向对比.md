# 短连接轮询、长连接、Websocket 横向对比

## 目录

- [1. 短连接轮询](#1-短连接轮询)
- [2. 长连接](#2-长连接)
- [3. Websocket](#3-Websocket)

## 1. 短连接轮询

- 很耗费 TCP 连接
- 而且 Header 重复发送
- 且通过宏任务发起，受限于 Event Loop，无法保证及时性
- 同时无效请求会很多

## 2. 长连接

- HTTP keep-alive 开启后虽然 TCP 可以复用，但是 Header 重复的问题并没有解决
- 同时 HTTP keep-alive 还有一个有效期，有效期结束后服务端会发侦查帧探查 TCP 是否有效

> 题外话：

> **HTTP keep-alive 的作用是，** ​**告知服务端持久化当前的** **TCP** **连接，不要立即断开，以便后续的 HTTP 请求复用它，也就是我们所说的「长连接」**

> **HTTP 的 keep-alive 是为了让 TCP 活久一点，而 TCP 本身也有一个 keepalive（注意没有横杠哦）机制**。这是 TCP 的一种**检测连接状况的保活机制**，keepalive 是 TCP 保活定时器：TCP 建立后，如果闲置没用，服务器不可能白等下去，闲置一段时间\[可设置]后，服务器就会尝试向客户端发送侦测包，来判断 TCP 连接状况，如果没有收到对方的回答（ACK包），就会过一会\[可设置]再侦测一次，如果多次\[可设置]都没回答，就会丢弃这个 TCP 连接

![（TCP keepalive 保活示意图）](https://mmbiz.qpic.cn/mmbiz_png/ndgH50E7pIpoC4GCCpgaSlCwdbzUhSsK3npTWK7U1oib2GNFbXHnGLIPCmyjot9iaVGlxyczibtVRRXcJHaR2qwsA/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1 "（TCP keepalive 保活示意图）")

## 3. Websocket

- 和 `HTTP` 一样都是建立在 `TCP` 协议之上，**但只需一次 HTTP 握手，就能建立持久性连接**，后续就不走 `HTTP` 了,而是 `WebSocket` 特有的数据帧
- 全双工通信，双向数据传输
- 数据格式轻量，且支持发送二进制数据，支持 ws 和加密的 wss
