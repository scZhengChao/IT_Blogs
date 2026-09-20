# socket.io

尽管 [Socket.IO](http://Socket.IO "Socket.IO") 确实在可能的情况下使用 WebSocket 进行传输，但它为每个数据包添加了额外的元数据。这就是为什么 WebSocket 客户端将无法成功连接到 [Socket.IO](http://Socket.IO "Socket.IO") 服务器，而 [Socket.IO](http://Socket.IO "Socket.IO") 客户端也将无法连接到普通 WebSocket 服务器。

[ 消息可达性保证 | Socket.IO 消息顺序 https://socket.io/zh-CN/docs/v4/delivery-guarantees](https://socket.io/zh-CN/docs/v4/delivery-guarantees " 消息可达性保证 | Socket.IO 消息顺序 https://socket.io/zh-CN/docs/v4/delivery-guarantees")
