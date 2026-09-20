# 错误处理

## 目录

- [400](#400)
- [426](#426)
- [Connection reset by peer](#Connection-reset-by-peer)

# **400**

&#x20;   语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。 　　2、请求参数有误。
**可能原因:**
\*\*    nginx\*\*
\*\*    配置：  同样 stomp 也需要设置\*\*
\*\*        proxy\_http\_version 1.1;     websocket必须要使用的http/1.1 通讯协议\*\*
\*\*        proxy\_set\_header Upgrade \$http\_upgrade;   下面这两行是 告诉nginx 响应http协议的升级请求\*\*
\*\*        proxy\_set\_header Connection "upgrade";\*\*

&#x20;   因为WebSocket是一个长连接，不像HTTP那样是典型的短连接，所以反向代理服务器需要允许连接保持着打开，而不是在它们看起来空闲时就将它们关闭。
&#x20;   WebSocket是端对端的，所以当一个代理服务器从客户端拦截一个Upgrade请求，它需要去发送它自己的Upgrade请求到后端服务器，也包括合适的头。

***

# **426**

客户端应当切换到TLS/1.0。（RFC 2817） TLS：安全传输层协议
安全传输层协议（TLS）用于在两个通信应用程序之间提供保密性和数据完整性。

***

# **Connection reset by peer**

[ \[261\]Connection reset by peer的常见原因及解决办法\_周小董的博客-CSDN博客\_by peer 1，如果一端的Socket被关闭（或主动关闭，或因为异常退出而 引起的关闭），另一端仍发送数据，发送的第一个数据包引发该异常(Connect reset by peer)。 Socket默认连接60秒，60秒之内没有进行心跳交互，即读写数据，就会自动关闭连接。2，一端退出，但退出时并未关闭该连接，另一端如果在从连接中读数据则抛出该异常（Connection reset）。   简单的... https://blog.csdn.net/xc\_zhou/article/details/80950753](https://blog.csdn.net/xc_zhou/article/details/80950753 " \[261]Connection reset by peer的常见原因及解决办法_周小董的博客-CSDN博客_by peer 1，如果一端的Socket被关闭（或主动关闭，或因为异常退出而 引起的关闭），另一端仍发送数据，发送的第一个数据包引发该异常(Connect reset by peer)。 Socket默认连接60秒，60秒之内没有进行心跳交互，即读写数据，就会自动关闭连接。2，一端退出，但退出时并未关闭该连接，另一端如果在从连接中读数据则抛出该异常（Connection reset）。   简单的... https://blog.csdn.net/xc_zhou/article/details/80950753")
