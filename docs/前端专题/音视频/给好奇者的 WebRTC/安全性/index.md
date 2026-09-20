# 安全性

## 目录

- [WebRTC 具有哪些安全性保障？](#WebRTC-具有哪些安全性保障)
- [它是如何做到的？ #](#它是如何做到的-)
- [安全性 101 #](#安全性-101-)
  - [明文和密文 #](#明文和密文-)
  - [Cipher #](#Cipher-)
  - [哈希函数 #](#哈希函数-)
  - [公钥 / 私钥加密 #](#公钥--私钥加密-)
  - [Diffie-Hellman 交换 #](#Diffie-Hellman-交换-)
  - [伪随机函数（PRF） #](#伪随机函数PRF-)
  - [密钥派生（KDF） #](#密钥派生KDF-)
  - [Nonce #](#Nonce-)
  - [消息身份验证代码（Message Authentication Code） #](#消息身份验证代码Message-Authentication-Code-)
  - [密钥轮换 #](#密钥轮换-)
- [DTLS #](#DTLS-)

## WebRTC 具有哪些安全性保障？

每个 WebRTC 连接**都经过身份验证和加密**。你可以确信第三方看不到你发送的内容，也无法插入虚假消息。你还可以确保与你进行通信的 WebRTC Agent 正是生成会话描述的 Agent。

**没有人能够篡改消息这一点非常重要**。如果第三方在传输中读取了会话描述，这不会产生什么影响。**然而，WebRTC 无法防止会话描述被修改**。攻击者可以**通过更改 ICE 候选地址和证书指纹来对你进行中间人攻击（man-in-the-middle）。**

> 译注：这里指的是，**P2P 连接建立之后，双方之间的通信安全是有保障的**。但在连接建立的过程中，攻击者可以通过 **man-in-the-middle 方式伪装中间人同时与通信双方建立连接并通信。**

## 它是如何做到的？ [#](https://webrtcforthecurious.com/zh/docs/04-securing/#它是如何做到的 "#")

WebRTC 使用两个**预先存在的协议**，数据报传输层安全（Datagram Transport Layer Security / [DTLS](https://tools.ietf.org/html/rfc6347 "DTLS")）和 安全实时传输协议（Secure Real-time Transport Protocol / [SRTP](https://tools.ietf.org/html/rfc3711 "SRTP")）。

`DTLS` **使你可以协商会话**，然后在两个 `peer` 之间**安全地交换数据**。它是 `TLS` 的同类产品，`TLS` 是 `HTTPS` 所使用的技术，而\*\* DTLS 与 TLS 的区别仅在与其使用 UDP 而不是 TCP 作为其传输层\*\*。这也意味着 `DTLS` 协议必须处理不可靠的数据传输。`SRTP` 是**专为安全的交换媒体数据而设计的**。相对于 `DTLS` 而言，使用 `SRTP` 对**传输媒体数据有一些优化。**

`DTLS` 先被使用。它通过 `ICE` 提供的连接进行一次握手。`DTLS` 是一种客户端 / 服务器协议，因此其中一侧需要开始握手。客户端 / 服务器的角色是在信令中被确定的。在 DTLS 握手期间，双方都会提供证书。 握手完成后，需要将收到的证书与`会话描述`中的证书哈希进行比较。这是为了确定握手的目标就是你所期望的 `WebRTC Agent`。接下来，可以将 `DTLS` 连接用于 `DataChannel` 通信。

要创建 `SRTP` 会话，我们使用 `DTLS` 生成\*\*的密钥对其进行初始化。\*\***SRTP 没有握手机制，因此必须使用外部密钥进行引导。一旦完成此操作，媒体数据即可以用 SRTP 加密并进行交换！**

## 安全性 101 [#](https://webrtcforthecurious.com/zh/docs/04-securing/#安全性-101 "#")

要了解本章介绍的技术，你首先需要了解这些术语。密码学是一个棘手的主题，因此其他资源也是值得参考的！

### 明文和密文 [#](https://webrtcforthecurious.com/zh/docs/04-securing/#明文和密文 "#")

**明文是 cipher 的输入。密文是 cipher 的输出。**

### Cipher [#](https://webrtcforthecurious.com/zh/docs/04-securing/#cipher "#")

Cipher 是将明文转换为密文的一系列步骤。**Cipher 可以反过来运行，因此你可以将密文恢复为明文。** 一个 cipher 通常拥有一个更改其行为的密钥。还有一个术语是加密和解密。

举例来说，一个简单的 cipher 是 ROT13。也就是每个字母向前移动 13 个字符。要解密这个 cipher，需要每个字母向后移动 13 个字符。明文 `HELLO` 将成为密文 `URYYB`。 在这种情况下，Cipher 是 ROT，密钥是 13。

### 哈希函数 [#](https://webrtcforthecurious.com/zh/docs/04-securing/#哈希函数 "#")

哈希函数是一种生成摘要的**单向过程。**给定一个输入，它每次都会生成相同的输出。其重要特点是**输出不可逆**。也就是说，根据输出的摘要，无法确定其输入。**当你要确认消息未被篡改时，哈希函数很有用**。

哈希函数可以很简单，比如只是对输入间隔取字母。这样 HELLO 将变成 HLO。你不能认为 `HELLO` 就是输入，但可以确认如果输入的是 `HELLO`，那么结果是匹配的。

### 公钥 / 私钥加密 [#](https://webrtcforthecurious.com/zh/docs/04-securing/#公钥--私钥加密 "#")

公钥 / 私钥加密描述了 DTLS 和 SRTP 使用的 cipher 类型。在此系统中，你有两个密钥，即公钥和私钥。公钥用于加密消息，可以安全共享。 私钥用于解密消息，永远不应共享。当解密那些使用对应的公钥加密的消息时，它是唯一的密钥。

### Diffie-Hellman 交换 [#](https://webrtcforthecurious.com/zh/docs/04-securing/#diffie-hellman-交换 "#")

`Diffie-Hellman` 交换允许两个以前**从未见过的用户通过** `Internet` 安全的**创建一个共享的秘密信息**。用户 `A` 可以将秘密信息发送给用户 `B`，而不必担心被窃听。破解该信息的难度将**取决于破解离散对数问题的难度**。 你不必完全理解该算法是如何工作的，但这可以帮助你了解是什么使得 `DTLS` 握手变得可行的。

Wikipedia 在[此处](https://en.wikipedia.org/wiki/Diffie–Hellman_key_exchange#Cryptographic_explanation "此处")中有一个实际的例子。

### 伪随机函数（PRF） [#](https://webrtcforthecurious.com/zh/docs/04-securing/#伪随机函数prf "#")

伪随机函数是一个预定义函数，用于生成随机出现的值。它可能需要多个输入并生成一个输出。

### 密钥派生（KDF） [#](https://webrtcforthecurious.com/zh/docs/04-securing/#密钥派生kdf "#")

密钥派生是一类伪随机函数。是一种用于增强密钥的安全性的方法。一种常见的模式是密钥扩展。

假设你获得的密钥为 8 字节。你可以使用 KDF 使其更坚固。

### Nonce [#](https://webrtcforthecurious.com/zh/docs/04-securing/#nonce "#")

Nonce 是 cipher 的附加输入。这样，**即使你多次加密同一条消息，也可以从 cipher 中获得不同的输出。**

如果将同一条消息加密 10 次，cipher 将为你提供 10 次相同的密文。通过使用 nonce，在使用同一个密钥的情况下，你将得到不同的输入。需要注意的是，每条消息都要使用不同的 nonce！ 否则就没有太大意义了。

### 消息身份验证代码（Message Authentication Code） [#](https://webrtcforthecurious.com/zh/docs/04-securing/#消息身份验证代码message-authentication-code "#")

消息身份验证代码（MAC）是放在**消息末尾的哈希值**。MAC 能证明该消息来自你期望的用户。

如果你不使用 MAC，攻击者可能会插入无效的消息。因为他们不知道密钥，所以这些消息解密后是无意义的垃圾内容。

### 密钥轮换 [#](https://webrtcforthecurious.com/zh/docs/04-securing/#密钥轮换 "#")

密钥轮换是一种间隔一段时间便更改密钥的做法。这种做法会使得被窃取的密钥影响较小。如果密钥被窃取或泄漏，那么只有很少的数据可以被解密。

## DTLS [#](https://webrtcforthecurious.com/zh/docs/04-securing/#dtls "#")

DTLS（数据报传输层安全协议）允许两个 peer 在没有预先存在的配置的情况下建立安全的通信。即使有人窃听了通信，他们也将无法解密消息。

为了使 DTLS 客户端和服务器进行通信，他们需要就 cipher 和密钥达成一致。他们通过进行 DTLS 握手来确定这些值。在握手期间，消息为纯文本格式。 当 DTLS 客户端 / 服务器交换了足够的详细信息以开始加密时，它会发送 `Change Cipher Spec`（更改 Cipher 规格）消息。在此消息之后，后续的每个消息都将会被加密！
