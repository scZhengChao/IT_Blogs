# 高级

[ 搭建websocket消息推送服务，必须要考虑的几个问题-腾讯云开发者社区-腾讯云 近年，不论是正在快速增长的直播，远程教育以及IM聊天场景，还是在常规企业级系统中用到的系统提醒，对websocket的需求越来越大，对websocket的要求也越来越高。从早期对websocket的应用仅限于少部分功能和IM等特殊场景，逐步发展为追求支持高并发，百万、千万级每秒通讯的高可用websocket服务。 https://cloud.tencent.com/developer/article/1627624](https://cloud.tencent.com/developer/article/1627624 " 搭建websocket消息推送服务，必须要考虑的几个问题-腾讯云开发者社区-腾讯云 近年，不论是正在快速增长的直播，远程教育以及IM聊天场景，还是在常规企业级系统中用到的系统提醒，对websocket的需求越来越大，对websocket的要求也越来越高。从早期对websocket的应用仅限于少部分功能和IM等特殊场景，逐步发展为追求支持高并发，百万、千万级每秒通讯的高可用websocket服务。 https://cloud.tencent.com/developer/article/1627624")

[ 万字长文，一篇吃透WebSocket：概念、原理、易错常识、动手实践-腾讯云开发者社区-腾讯云 本文将从基本概念、技术原理、常见易错常识、动手实践等多个方面入手，万字长文，带你一起全方位探索 WebSocket 技术。 https://cloud.tencent.com/developer/article/1887095](https://cloud.tencent.com/developer/article/1887095 " 万字长文，一篇吃透WebSocket：概念、原理、易错常识、动手实践-腾讯云开发者社区-腾讯云 本文将从基本概念、技术原理、常见易错常识、动手实践等多个方面入手，万字长文，带你一起全方位探索 WebSocket 技术。 https://cloud.tencent.com/developer/article/1887095")

**关于 Socket，可以总结以下几点：**

- 1）它可以实现底层通信，几乎所有的应用层都是通过 socket 进行通信的；
- 2）对 TCP/IP 协议进行封装，便于应用层协议调用，属于二者之间的中间抽象层；
- 3）TCP/IP 协议族中，传输层存在两种通用协议: TCP、UDP，两种协议不同，因为不同参数的 socket 实现过程也不一样。

send

**`WebSocket.send()`** 方法将需要**通过 WebSocket 链接传输至服务器的数据排入队列，并根据所需要传输的 data bytes 的大小来增加** `bufferedAmount`的值。&#x20;

[全面理解WebSocket与Socket、TCP、HTTP的关系及区别](./全面理解WebSocket与Socket、TCP、HTTP的/全面理解WebSocket与Socket、TCP、HTTP的关系及区别.md "全面理解WebSocket与Socket、TCP、HTTP的关系及区别")

[Websocket 底层是 TCP 还是 UDP？白话版解析 TCP 和 UDP 传输过程 ](<./Websocket 底层是 TCP 还是 UDP？白话版解析/Websocket 底层是 TCP 还是 UDP？白话版解析 TCP 和 UDP 传输过程-.md> "Websocket 底层是 TCP 还是 UDP？白话版解析 TCP 和 UDP 传输过程 ")

[webSocket 消息丢失](<./webSocket 消息丢失/index.md> "webSocket 消息丢失")

[通信可靠性提升：WebSocket ACK 应答机制](<./通信可靠性提升：WebSocket ACK 应答机制/index.md> "通信可靠性提升：WebSocket ACK 应答机制")

[可靠和顺序问题](./可靠和顺序问题/index.md "可靠和顺序问题")
