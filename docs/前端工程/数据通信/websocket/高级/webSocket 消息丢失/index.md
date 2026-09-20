# webSocket 消息丢失

## 目录

- [背景](#背景)
- [前言](#前言)
- [测试](#测试)
- [结论](#结论)

## 背景

项目在使用 websocket 通信出现消息丢失的情况。考虑的是先尝试看在网络传输层是否可以捕获到发送的异常，如果不行的话可能需要考虑在应用层再搭建一套类 ACK 确认机制;

本文主要是记录测试 websocket 网络波动情况下是否可以捕获到异常。

模拟网络波动(loss, delay)工具是macOS的NLC(Network Link Conditioner)，用tcpdump命令进行tcp抓包。

## 前言

在测试之前需要先确认下原理，**websocket是基于 TCP 的，而 TCP 是由 ACK 机制来保障消息可靠的，** e.g. server 向 client 发送一个数据

```markdown 
server -> [P.] -> client  // 发送数据
client -> [.]  -> server  // ACK 确认

```


所以我们需要测试的是当网络波动时，收不到 client 的 ACK 确认，TCP 会怎么处理。

测试代码如下：

```javascript 
// server 
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3002 });

wss.on('connection', function connection(ws) {
  setTimeout(() => {
    let message = `测试的消息，时间戳为： ${new Date().getTime()}`
    ws.send(message, (err) => {
      if(err) {
        console.log(`出现异常: ${err}, 消息内容${message}`)
      }
      console.log(`消息发送成功:${message}`)
    });
  }, 30000)
});


// client
const socket = new WebSocket('ws://66.42.50.27:3002');

// Connection opened
socket.addEventListener('open', function (event) {
  console.log('websocket on open')
});
// on message
socket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data);
});
// on closed
socket.addEventListener('close', (event) => {
  console.log(`连接关闭: ${event}`)
})
// on error
socket.addEventListener('error', (err) => {
  console.log(`连接异常: ${err}`)
})

```


## 测试

首先，我们从 server -> client 发送一个正常的消息，client 正常收到了消息，并且 tcpdump 也正常抓包到了 ACK 确认：

![](./image/image_6ixvCGheY3.png)

**然后 client 开启 NLC 模拟 100% loss 的情况，会发现当 server 收不到 ACK 确认的时候， 会不断的重新发送数据，直到websockt超时没有收到消息断开连接(一般默认 60s):**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/974d017ecc664e5980631bc7a32e5270~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

但在重发的过程中回调函数没有执行，也没有捕获到任何异常。如果在重发过程中，重新恢复网络状态，消息最终还是发送成功了。

## 结论

在网络\*\*传输层(TCP/IP)，如果出现丢包，会尝试不断的重新发送数据，直到发送成功或者连接断开,不会主动抛出异常。  \*\*
我们可以通过设置 超时 重发机制来保障消息不丢失。 但需要同时注意，重发可能会导致消息重复发送，需要 client 进行处理。
