# 通信可靠性提升：WebSocket ACK 应答机制

## 目录

- [WebSocket ACK 的必要性](#WebSocket-ACK-的必要性)
- [实施WebSocket ACK的方式](#实施WebSocket-ACK的方式)
- [超时与重传的重要性](#超时与重传的重要性)
- [WebSocket ACK 的其他特性和顺序保障](#WebSocket-ACK-的其他特性和顺序保障)
- [调试 WebSocket](#调试-WebSocket)
- [总结](#总结)
- [websocket 处于连接状态；一定保证消息会送达成功嘛](#websocket-处于连接状态一定保证消息会送达成功嘛)

[**WebSocket**](https://link.segmentfault.com/?enc=CpUpqWnzjRv8+y91uP05AA==.ToZscVJ/d6JVlx003bnrNUi1xP19mjGjV4ItSuiDMwOthaHudquarDfyrygX/YWu "WebSocket")，作为一种在单一TCP连接上实现全双工通讯的协议，**允许客户端与服务器之间自由地进行双向数据流动。一旦建立连接，数据可以无限制地在两者之间传输**。但是，由于网络环境不总是完美无缺，讯息有时可能会在传递过程中丢失。这可能是因为**网络拥堵、硬件故障或其他多种因素导致**的。为此，WebSocket **提供了一个确认机制来确保发送的数据包每次都能准确到达目的地，这就是“WebSocket ACK”应答机制。**

![](./image/image_B9HK8GDwH8.png)

## WebSocket ACK 的必要性

在`WebSocket`的世界中，没有`ACK`机制的存在可能导致许多问题的出现。首先，数据包丢失可能由不确定的网络状况引起，且无法确认接收者是否已经收到了数据。接着是讯息可能被重复发送的情况，发生在发送者在未接收到确认反馈的情况下重传消息，导致传输中的数据冗余。最后，消息的顺序问题可能因为网络环境复杂而引发，当消息乱序到达接收端，可能会导致处理上的混淆。

为了确保WebSocket通信的可靠性和准确性，**ACK机制的存在至关重要。**

## 实施WebSocket ACK的方式

[**WebSocket**](https://link.segmentfault.com/?enc=vZRlQfjE3ynHgtpnvxpkjw==.5bCYkRcp5g76sf8jR0161lFxKNGnUGh6WpscjHDTaanmde3sSVvbscVjPDVw9t3MU0Bw7fqWilAEGcHnP1Yvgg== "WebSocket") 在数据传输中实行**了一种“握手”的方式**，以**确保数据的准确发送和接收**。当发送端传输数据包时，必须接收到相应的应答。利用标志性的序号插入每个数据包中，**可以确认接收端是否收到数据**。具体步骤包括：

1. 发送端向接收端发送数据时，**会附带一个序号。**
2. 接收端在收到数据后，会产出一**个包含该序号的ACK应答包。**
3. 发送端在收到应答后，会**对比应答中的序号与最初的序号。如果相符**，数据包就被视为成功送达。\*\*如果在设定的时间内没有收到反馈，\*\***则重发数据。**
4. 如果接收端收到了重复数据包，它会**忽略该数据包而仅发送ACK**。这样，数据包的传输就可以被保证，通信可靠性得到强化。

![](./image/image_A2Y6J0u6Y_.png)

## 超时与重传的重要性

**WebSocket通过设置超时和重传机制来確保ACK的可靠性。** 工作原理如下：

1. **发送方在传送消息的同时设置超时计时器。**
2. **如果超时而未收到ACK，就启动重传机制。**
3. **重传直至收到ACK或达到重传限制。**

**这种机制在对抗网络不稳定和数据丢失的情况下，保证了数据传输的可靠性，提高了体验和减少了数据丢失带来的问题。**

## WebSocket ACK 的其他特性和顺序保障

除了确保数据的安全传输，WebSocket ACK还负责保持数据传输的顺序和流量控制等其他功能。

## 调试 WebSocket

要对WebSocket接口进行调试，可以使用接口测试工具，下面使用 [**Apifox**](https://link.segmentfault.com/?enc=LrH/MlaSYV5ycoPHIJildw==.JUOvaw6emazeI3kw0tDlKsMygzebshYpgtg/dnHJPMk= "Apifox") 给大家简单演示下。Apifox 适用于 [**http(s)**](https://link.segmentfault.com/?enc=qENUGCqrZOLXQpl4eH345g==.x/gv7A38udDE7rMSP6I3c1z6SVcSzVoIQyRSAzyQ+1f/3D/yVCNdGM0+PUxr4eeRhS2sjk8AOxfoBF4xbmDyoIxkalaQagC63UUvnwpzJVY= "http(s)")、WebSocket、Socket、[**gRPC**](https://link.segmentfault.com/?enc=P+h7ZLDg19/tex1vwy12xA==.WUS8UG5qoUd0z3q9egD9bHZ9F2ZE2sOvxcBW6YqI/9PKNAnFbXihqVzHWhBhRsvA54nJ1fu4/wk0QHnJkydBGg== "gRPC")、Dubbo等多种协议的接口调试，它是一个综合性的工具。通过它，你可以轻松地创建、测试和调试你的WebSocket接口。

## 总结

**WebSocket通过ACK机制、超时和重传以及其他增强特性来实现更可靠的通信。** 尽管ACK提供很多优点，但网络环境的不稳定和潜在的超时设定问题可能仍然会影响通信的可靠性。

# websocket 处于连接状态；一定保证消息会送达成功嘛

即使 WebSocket 处于连接状态，也不能绝对保证消息一定会成功送达。虽然 WebSocket 提供了一种可靠的全双工通信通道，但在实际应用中仍然存在一些可能导致消息丢失或传输失败的情况。以下是一些常见的原因：

1. **网络波动**：即使 WebSocket 连接已经建立，网络不稳定或短暂中断仍可能导致消息丢失。
2. **服务器故障**：服务器端可能出现临时性的问题，导致无法处理或响应客户端发送的消息。
3. **程序错误**：客户端或服务器端的代码可能存在 bug，导致消息未被正确处理或确认。
4. **资源限制**：服务器可能因为负载过高或其他资源限制而无法及时处理消息。

为了提高消息传递的可靠性，可以结合超时重发、确认机制和补偿策略来增强系统的健壮性。
