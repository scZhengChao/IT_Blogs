# PRC管道通讯

## 目录

- [文档](#文档)
- [原教旨主义](#原教旨主义)
- [事件封装](#事件封装)
  - [面向接口](#面向接口)
- [远程过程调用（RPC）](#远程过程调用RPC)
  - [promisify](#promisify)
  - [JSON-RPC](#JSON-RPC)
    - [id](#id)
  - [封装实现](#封装实现)

## 文档

[ 使用RPC思想封装处理浏览器通信(postMessage)的技巧 引文本文以postMessage为例，浅谈一下浏览器通信的一个封装技巧； postMessage大家都应该都接触过，它常用语iframe和web worker中，用于跨页面、跨线程的通信，有些浏览器插件有时也会用到； 废话不多说，对postMe… https://zhuanlan.zhihu.com/p/499789004?utm\_id=0](https://zhuanlan.zhihu.com/p/499789004?utm_id=0 " 使用RPC思想封装处理浏览器通信(postMessage)的技巧 引文本文以postMessage为例，浅谈一下浏览器通信的一个封装技巧； postMessage大家都应该都接触过，它常用语iframe和web worker中，用于跨页面、跨线程的通信，有些浏览器插件有时也会用到； 废话不多说，对postMe… https://zhuanlan.zhihu.com/p/499789004?utm_id=0")

[ JSON-RPC & postMessage 谈谈浏览器消息通信的封装技巧\_徐小夕@趣谈前端的博客-CSDN博客 大厂技术坚持周更精选好文楔子postMessage 常见于内嵌 iframe 或是 Web Workers 中，用于跨页面（线程） 的消息通信，在一些其他开发环境中也能看到类似的影子，如 Chrome 插件环境、Electron 环境、figma 插件等。最近的工作需要经常与 iframe 与 Web Workers 打交道，处理页面与内嵌页、主线程与 worke... https://blog.csdn.net/KlausLily/article/details/124335589](https://blog.csdn.net/KlausLily/article/details/124335589 " JSON-RPC & postMessage 谈谈浏览器消息通信的封装技巧_徐小夕@趣谈前端的博客-CSDN博客 大厂技术坚持周更精选好文楔子postMessage 常见于内嵌 iframe 或是 Web Workers 中，用于跨页面（线程） 的消息通信，在一些其他开发环境中也能看到类似的影子，如 Chrome 插件环境、Electron 环境、figma 插件等。最近的工作需要经常与 iframe 与 Web Workers 打交道，处理页面与内嵌页、主线程与 worke... https://blog.csdn.net/KlausLily/article/details/124335589")

以postMessage为例

[postMessage](https://so.csdn.net/so/search?q=postMessage\&spm=1001.2101.3001.7020 "postMessage") 常见于内嵌 `iframe` 或是 `Web Workers` 中，用于跨页面（线程） 的消息通信，在一些其他开发环境中也能看到类似的影子，如 Chrome 插件环境、[Electron](https://so.csdn.net/so/search?q=Electron\&spm=1001.2101.3001.7020 "Electron") 环境、figma 插件等。

## 原教旨主义

先来看一个 `iframe` 父子级页面通信的例子：

```typescript 
// parent.js
const childWindow = document.querySelector('iframe').contentWindow;
window.addEventListener('message', function (event) {
    const data = event.data;
    if (data.method === 'do_something') {
        // ... handle iframe data
        childWindow.postMessage({
            method: 're:do_something',
            data: 'some data',
        });
    }
});
 
// iframe.js
window.top.postMessage(
    {
        method: 'do_something',
        data: 'ifame data',
    },
    '*'
);
window.addEventListener('message', function (event) {
    const data = event.data;
    if (data.method === 're:do_something') {
        // ... handle parent data
    }
});
```


使用原教旨主义的写法可以很容写出上述代码，处理简单消息通信不会有什么问题，但针对**复杂场景下跨页面（线程）通信则需要有个简单有效机制来维护消息通信。**

聪明的你一定想到了基于**统一消息格式**配合对应的消息**处理策略**来维护消息事件的方法调用，很简单的机制，却很好用：

```typescript 
const childWindow = document.querySelector('iframe').contentWindow;
const handlers = {
    add: (a: number, b: number) => a + b,
    subtract: (a: number, b: number) => a - b,
};
window.addEventListener('message', function (event) {
    const { method, args } = event.data;
    const result = handlers[method](...args);
    childWindow.postMessage({
        method: `re:${method}`,
        args: [result],
    });
});
```


使用上述的处理方式，消息通信的处理维护一份策略处理函数即可，接下来的工作也是建立在此基础上的，加一点“细节”即可。

## 事件封装

**消息通信本身是事件的一种**，所以不妨往**事件封装的方向靠**，这时候就有很多可以借鉴的接口设计了，这里可以借鉴 [socket.io](http://socket.io "socket.io") 的接口设计。相对与本地事件调用，消息通信则本质是监听远程服务所发出的事件，与 [socket.io](http://socket.io "socket.io") 类似：

```typescript 
// client
socket.emit('join-in', input.value);
// server
socket.on('join-in',(user) => {...});
```


### 面向接口

对于一个工具函数（库）的封装设计，最好是从**接口开始**，接口设计可以直接决定最终工具使用形式。这也是 Typescript 带来的开发模式转变，**面向接口的设计**，可以帮助我们更好组装模块以达到解耦的目的。

封装的接口格式定义：

```typescript 
interface RPCHandler {
    (...args: any[]): any;
}
 
interface RPCEvent {
    emit(event: string, ...args: any[]): void;
    on(event: string, fn: RPCHandler): void;
    off(event: string, fn?: RPCHandler): void;
}
```


基于上述定义的接口，以 `iframe` 的父子通信为例做工具库封装：

```typescript 
interface RPCHandler {
    (...args: any[]): any;
}
 
interface RPCEvent {
    emit(event: string, ...args: any[]): void;
    on(event: string, fn: RPCHandler): void;
    off(event: string, fn?: RPCHandler): void;
}
 
interface RPCMessageDataFormat {
    event: string;
    args: any[];
}
 
interface RPCMessageEventOptions {
    currentEndpoint: Window;
    targetEndpoint: Window;
    targetOrigin: string;
}
 
class RPCMessageEvent implements RPCEvent {
    private _currentEndpoint: RPCMessageEventOptions['currentEndpoint'];
    private _targetEndpoint: RPCMessageEventOptions['targetEndpoint'];
    private _targetOrigin: RPCMessageEventOptions['targetOrigin'];
    private _events: Record<string, Array<RPCHandler>>;
 
    constructor(options: RPCMessageEventOptions) {
        this._events = {};
        this._currentEndpoint = options.currentEndpoint;
        this._targetEndpoint = options.targetEndpoint;
        this._targetOrigin = options.targetOrigin;
        // 监听远程消息事件
        const receiveMessage = (event: MessageEvent) => {
            const { data } = event;
            const eventHandlers = this._events[data.event] || [];
            if (eventHandlers.length) {
                eventHandlers.forEach((handler) => {
                    handler(...(data.args || []));
                });
                return;
            }
        };
        this._currentEndpoint.addEventListener(
            'message',
            receiveMessage as EventListenerOrEventListenerObject,
            false
        );
    }
 
    emit(event: string, ...args: any[]): void {
        const data: RPCMessageDataFormat = {
            event,
            args,
        };
        // postMessage
        this._targetEndpoint.postMessage(data, this._targetOrigin);
    }
 
    on(event: string, fn: RPCHandler): void {
        if (!this._events[event]) {
            this._events[event] = [];
        }
        this._events[event].push(fn);
    }
 
    off(event: string, fn?: RPCHandler): void {
        if (!this._events[event]) return;
        if (!fn) {
            this._events[event] = [];
            return;
        }
        const handlers = this._events[event] || [];
        this._events[event] = handlers.filter((handler) => handler !== fn);
    }
}
```


经典的事件实现，这里不做赘述，使用方式如下：

```typescript 
// 父级页面
const childWindow = document.querySelector('iframe').contentWindow;
const parentEvent: RPCEvent = new RPCMessageEvent({
    targetEndpoint: window,
    currentEndpoint: childWindow,
    targetOrigin: '*',
});
parentEvent.on('add', (a, b) => a + b);
parentEvent.emit('test');
 
// 子级页面
const childEvent: RPCEvent = new RPCMessageEvent({
    targetEndpoint: window,
    currentEndpoint: window.top,
    targetOrigin: '',
});
childEvent.emit('add', 1, 2);
childEvent.on('test', () => {});
childEvent.on('max', (a, b) => Math.max(a, b));
childEvent.off('max');
```


思考一个问题，上述实现了父子级 window 对象的消息通信封装，能否将其一般化支持到所有浏览器消息事件？

答案是肯定的，看一眼事件的 Window 封装初始化选项：

```typescript 
interface RPCMessageEventOptions {
    currentEndpoint: Window;
    targetEndpoint: Window;
    targetOrigin: string;
}
```


这里的事件接收与发送对象都是 `Window`，但实际上我们只是依赖了：

- currentEndpoint 上的 `message` 事件
- targetEndpoint 上的 `postMessage` 方法与其配置

**换言之，只要浏览器中的其他对象支持 ****`message`**** 事件与 ****`postMessage`**** 方法即可实现同样的封装，即满足接口即可**。

```typescript 
interface RPCMessageEventOptions {
    currentEndpoint: {
        addEventListener<K extends keyof MessagePortEventMap>(
            type: K,
            listener: (
                this: RPCMessageEventOptions['currentEndpoint'],
                ev: MessagePortEventMap[K]
            ) => any,
            options?: boolean | AddEventListenerOptions
        ): void;
    };
    targetEndpoint: {
        postMessage(message: any, ...args: any[]): void;
    };
}
```


## 远程过程调用（RPC）

经过上面的封装我们得到一个**基于事件驱动的消息通信工具**，但这还不够，因为其使用还**较为原子化（原始）**，处理消息回复**显得繁琐**，举个例子：

```typescript 
import { RPCMessageEvent } from 'rpc-shooter';
// main
const mainEvent = new RPCMessageEvent({
    currentEndpoint: window,
    targetEndpoint: iframe.contentWindow,
    config: {
        targetOrigin: '*',
    },
});
mainEvent.on('reply:max', (data) => {
    console.log('invoke max result:', data);
});
mainEvent.emit('max', 1, 2);
 
// child
const childEvent = new RPCMessageEvent({
    currentEndpoint: window,
    targetEndpoint: window.top,
});
childEvent.on('max', (a, b) => {
    const result = Math.max(a, b);
    childEvent.emit('reply:max', result);
});
```


当 `main` 中调用 `child` 的 `max` 方法时还需要监听一个 `child` 中的回复（`reply:max`）事件，`child` 接受消息调用方法成功后也需要 emit 一个 `reply:max` 事件。这**一来一回并不优雅，眼不看为净**，还需要再做一层封装包装事件的触发与响应。

### promisify

异步事件自然使用 Promise 比较合理，封装也比较简单：

```typescript 
// child
function registerMethod(method: string, handler: RPCHandler) {
    const synEventName = `syn:${method}`;
    const ackEventName = `ack:${method}`;
    const synEventHandler = (data) => {
        Promise.resolve(handler(data.params))
            .then((result) => {
                this._event.emit(ackEventName, result);
            });
    };
    this._event.on(synEventName, synEventHandler);
}
registerMethod('max', ([a,b]) => Math.max(a,b));
 
// main
function invoke(method: string, params: any): Promise<any> {
    return new Promise((resolve) => {
        const synEventName = `syc:${method}`;
        const ackEventName = `ack:${method}`;
        this._event.emit(synEventName, params);
        this._event.on(ackEventName, (res) => {
            resolve(res);
        });
    });
}

invoke('max', [1,2]).then((res) => {
    console.log(res);
});
```


调用方 emit 一个带有 `syc:` 前缀的事件，被调用方注册并监听同名事件，消息调用成功后回复一个带 `ack:` 前缀事件，调用方监听 `ack:` 事件标识一次消息相应成功，Promise.resolve。

promisify 简单，但实际使用消息通信会遇到各种各样的问题：

- 远程方法调用错误
- 调用方法不存在
- 连接超时
- 数据格式错误（如 worker 中错误传递了无法序列化 dom 对象）
- ......

针对通信过程各种情况我们需要将其描述出来。

实际上网页消息通信过程与 RPC 调用十分类似，可类比于调用远程服务的方法。而刚好有个\*\* JSON-RPC 协议规范可以十分简单清晰描述此过程\*\*，不妨借来用一用。

### JSON-RPC

> JSON-RPC是一个**无状态且轻量级的远程过程调用(RPC)协议**。本规范主要定义了一些数据结构及其相关的处理规则。它允许运行在基于socket,http等诸多不同消息传输环境的同一进程中。其使用JSON（RFC 4627）作为数据格式。

相对动则几百页 http 协议规范，JSON-RPC 的规范很简单，只有一页，有兴趣的同学可以研究下 JSON-RPC 2.0 规范。

这里主要看一下 JSON-RPC 定义请求与响应的数据格式

```typescript 
// 错误对象
interface RPCError {
    code: number;
    message: string;
    data: any;
}
 
// RPC 请求对象
interface RPCSYNEvent {
    jsonrpc: '2.0';
    method: string;
    params: any;
    id?: string;
}
 
// RPC 响应
interface RPCSACKEvent {
    jsonrpc: '2.0';
    result?: any;
    error?: RPCError;
    id?: string;
}
```


带索引数组参数的 rpc 调用:

```typescript 
--> {"jsonrpc": "2.0", "method": "subtract", "params": [42, 23], "id": 1}
<-- {"jsonrpc": "2.0", "result": 19, "id": 1}
```


通知:

```typescript 
--> {"jsonrpc": "2.0", "method": "update", "params": [1,2,3,4,5]}
--> {"jsonrpc": "2.0", "method": "foobar"}
```


不包含调用方法的rpc调用:

```typescript 
--> {"jsonrpc": "2.0", "method": "foobar", "id": "1"}
<-- {"jsonrpc": "2.0", "error": {"code": -32601, "message": "Method not found"}, "id": "1"}
```


规范中最重要的几条规则如下：

#### **id**

> **已建立客户端的唯一标识id，值必须包含一个字符串、数值或NULL空值。** 如果不包含该成员则被认定为是一个通知。该值一般不为NULL\[1]，若为数值则不应该包含小数\[2]。

每次调用**需要有个唯一 id 标识此次调用，因为我们可能会多次调用同一个远程服务，需要需要有个 id 来标识每次调用。如果没有 id 则表示调用方并不关心调用结果（表示此次调用是一次通知）。**

**error** 和 **result**

> **响应对象必须包含result或error成员**，但两个成员必须不能同时包含。

调用失败返回 error，result 为空，调用成功返回 result，error 为空，有 error 对象时则表示调用失败。

JOSN-RPC 协议简单明了描述数据请求与响应，我们只需要按照其要求封装 Promise 调用，成功时 resolve 失败时 reject 即可

### 封装实现

还是老规矩，先看一样接口定义：

```typescript 
interface RPCHandler {
    (...args: any[]): any;
}
 
interface RPCEvent {
    emit(event: string, ...args: any[]): void;
    on(event: string, fn: RPCHandler): void;
    off(event: string, fn?: RPCHandler): void;
}
 
interface RPCInitOptions {
    event: RPCEvent;
    methods?: Record<string, RPCHandler>;
    timeout?: number;
}
 
interface RPCInvokeOptions {
    isNotify: boolean;
    timeout?: number;
}
 
declare class RPC {
    private _event;
    private _methods;
    static uuid(): string;
    constructor(options: RPCInitOptions);
    registerMethod(method: string, handler: RPCHandler): void;
    removeMethod(method: string): void;
    invoke(method: string, params: any, options?: RPCInvokeOptions): Promise<any>;
}
```


具体封装可看 RPC 实现，最终 RPC 工具方式如下：

```typescript title="main.ts
"
import { RPCMessageEvent, RPC } from 'rpc-shooter';
 
(async function () {
    const iframe = document.querySelector('iframe')!;
    const rpc = new RPC({
        event: new RPCMessageEvent({
            currentEndpoint: window,
            targetEndpoint: iframe.contentWindow!,
            config: { targetOrigin: '*' },
        }),
        // 初始化时注册处理函数
        methods: {
            'Main.max': (a: number, b: number) => Math.max(a, b),
        },
    });
    // 动态注册处理函数
    rpc.registerMethod('Main.min', (a: number, b: number) => {
        return Promise.resolve(Math.min(a, b));
    });
 
    // 调用 iframe 服务中的注册方法
    const randomValue = await rpc.invoke('Child.random', null, { isNotify: false, timeout: 2000 });
    console.log(`Main invoke Child.random result: ${randomValue}`);
})();
```


```typescript title="child.ts
"
import { RPCMessageEvent, RPC } from 'rpc-shooter';
(async function () {
    const rpc = new RPC({
        event: new RPCMessageEvent({
            currentEndpoint: window,
            targetEndpoint: window.top,
        }),
    });
 
    rpc.registerMethod('Child.random', () => Math.random());
 
    const max = await rpc.invoke('Main.max', [1, 2]);
    const min = await rpc.invoke('Main.min', [1, 2]);
    console.log({ max, min });
})();
```


有一点需要注意以下，在 RPC 初始化实际我们只依赖 `RPCEvent` 接口，浏览器的通信是由 `RPCMessageEvent` 模块实现的，我们也可将其换成其他的业务实现，如使用 [socket.io](http://socket.io "socket.io") 来替代 `RPCMessageEvent` 以达到和服务端通信的目的，又一个面向接口开发的好处。

**附注：Google 专业解决 worker 调用的工具库 comlink，有生产需要同学可以试试。**

[postMessage 消息通信如何 Promise 化？](<./postMessage异步封装/index.md> "postMessage 消息通信如何 Promise 化？")
