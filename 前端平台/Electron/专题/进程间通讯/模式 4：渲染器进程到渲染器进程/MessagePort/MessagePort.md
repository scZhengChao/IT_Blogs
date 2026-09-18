# MessagePort

## 目录

- [设计目标](#设计目标)
- [方案选型](#方案选型)
- [设计方案](#设计方案)
  - [整体设计](#整体设计)
  - [注册进程时序图](#注册进程时序图)

## 设计目标

1、支持跨进程之间的通信：

- 主进程与渲染进程
- 渲染进程与渲染进程

2、支持同进程不同组件之间的通信；

3、对外提供的接口和参数需与 electron-common-ipc 对齐

4、职责单一、对内聚合，不依赖其它模块

## 方案选型

调研了市面上比较常用的几种进程通信的封装，《深入浅出Electron》的作者和 Sugar-Electron 里的 ipc 模块

本质都是使用 ipcRenderer.on() 和 webContents.send() 等 API 进行封装，在渲染进程与渲染进程之间进行通信时，得经过主进程进行消息转发。

![](image_7NIfXQ7O4J.png)

`Electron` 官方还提供了 `MessagePort` 这种方案允许在不同上下文(进程)之间传递消息，类似于浏览器中的 `window.postMessage`。

这种方案的好处是：**假设两个渲染进程互相保存**了对方的 `port`，那么它们就**可以直接用这对** `port` 进行通信，**不需要通过主进程中继的性能开销。**

如果你之前对 `MessagePort` 不了解的话，可以看看这里的一个小例子：

```javascript 
MessagePort 对象的创建依赖于 MessageChannel 类：

const channel = new MessageChannel();
const port1 = channel.port1
const port2 = channel.port2
 
// 或者简写为：
const { port1, port2 } = new MessageChannel();
举个小例子，假设现在：

渲染进程一有了 port1
渲染进程二有了 port2
那么现在这两个进程就可以通过 port.onmessage 和 port.postMessage 来收发彼此间的消息了：

// 渲染进程一：
port1.onmessage = (event) => {
  console.log('received result:', event.data)
};
port1.postMessage('我是渲染进程一发送的消息');
 
 
// 渲染进程二：
port2.onmessage = (event) => {
  console.log('received result:', event.data)
};
port2.postMessage('我是渲染进程二发送的消息');

```


从上面的分析中得出，**如果我们能设计一套机制，让渲染进程互相存有对方的 port，通过 port 进行收发消息，显然是比通过主进程进行消息转发要更好一些。**

至于**同进程不同组件之间的通信，利用 NodeJS 的 events 模块就可以实现。**

## 设计方案

### 整体设计

- 渲染进程**初始化时，向主进程注册，并创建一对 port**，主进程**分发给渲染进程**
- 之后渲染进程使用 port 进行收发消息，不再经过主进程

![](image_05-tpdysur.png)

### 注册进程时序图

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9865c49e102d4e6e8892bfbb2b143286~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=810\&h=467\&s=65474\&e=png\&b=fefdfd)

[Electron 中的消息端口](<Electron 中的消息端口.md> "Electron 中的消息端口")
