# Comlink 的使用

## 目录

- [Web Workers 简介](#Web-Workers-简介)
- [Comlink 介绍](#Comlink-介绍)
  - [使用案例 - 通过 Comlink 实现简单的插入和查询](#使用案例---通过-Comlink-实现简单的插入和查询)
    - [直接通过 Web Worker API 的方式实现这个需求：](#直接通过-Web-Worker-API-的方式实现这个需求)
    - [通过 Comlink 实现该需求：](#通过-Comlink-实现该需求)
    - [对比二者我们可以发现：](#对比二者我们可以发现)
- [原理解析](#原理解析)
  - [前置知识 - Channel Messaging API](#前置知识---Channel-Messaging-API)
  - [🕶 Comlink 是如何实现的](#-Comlink-是如何实现的)
    - [如何通信](#如何通信)
      - [如何在进程间传递数据](#如何在进程间传递数据)
    - [如何做到无感知地操作 Worker 的对象的](#如何做到无感知地操作-Worker-的对象的)
      - [Getter 的实现](#Getter-的实现)
      - [Setter / Function Call / new 的实现](#Setter--Function-Call--new-的实现)

# Web Workers 简介

Web Worker 为 Web 内容在新线程中运行脚本提供了一种简单的方法，线程可以与主进程并行而避免阻塞渲染和交互。对于计算量大，容易造成页面卡顿（耗时 > 16ms）的任务我们可以考虑将它们移至 Worker 进行计算。

根据 CanIUse [Web Workers 的覆盖率](https://link.juejin.cn?target=https://caniuse.com/webworkers "Web Workers 的覆盖率")已经到了 98%。有人会担心和 Worker 通信造成的卡顿，可参考该 [Benchmark](https://link.juejin.cn?target=https://github.com/zxch3n/js-performance "Benchmark")

| 通信内容     | 耗时 MacBook Pro (13-inch, M1, 2020) - Chrome | 耗时 Huawei Mate 10 Pro - Chrome |
| -------- | ------------------------------------------- | ------------------------------ |
| 10B 字符串  | 5us                                         | 5us                            |
| 1MB 字符串  | 200us                                       | 3ms                            |
| 10MB 字符串 | 2ms                                         | 35ms                           |

简单通信就只需要 5 微秒左右，而大字符串的传输也接近内存拷贝速度（如果是结构化数据，在这个数据量上可能更多耗时会在 JSON 的解析上）。大家可以根据自己的通信频繁程度，通信内容大小判断是否适合通过 Web Workers 进行优化。

虽然 Web Worker 很好，在平常却常常容易因为在通信上处理上过于麻烦，打包不方便等原因不怎么使用它。

**Comlink 解决了其中通信的问题，它通过 Proxy 让你几乎可以忽略其中的通信细节，极大降低了 Worker 的维护成本。**

# [Comlink](https://link.juejin.cn/?target=https://github.com/GoogleChromeLabs/comlink "Comlink") 介绍

![](image_4CqBhorHi-.png)

## 使用案例 - 通过 Comlink 实现简单的插入和查询

假如有以下场景的需求

- 有几十万条数据，每条数据有大约一百个字符
- 数据会不停地发生变动，比如新增一条数据/删除一段数据
- 用户需要在这些数据中完成搜索

在前端中实现这项功能，\*\*如果不通过 Worker 就需要自己完成时间分片来避免阻塞 \*\*UI。并且如果主进程此时还有其他类似的繁忙任务在进行就很容易产生卡顿，**就需要考虑引入 Scheduler 的模块进行优先级划分。通过** Worker 就可以避免这些麻烦，且有更高的搜索效率。

下面我们通过两种不同的方式，实现在 Worker 上的简单插入和查询。

### 直接通过 Web Worker API 的方式实现这个需求：

**Main.js**

```typescript 
// 通过原生 API 实现 Worker 上插入和查询
const worker = new Worker("./normal/worker.js");

let _id = 0;
// 需要通过 id 标识一个请求消息，从而能够知道 response 对应的请求
function getId() {
  return _id++;
}

// 通过 id 创建 response promise
function createPromise(id) {
  return new Promise((r) => {
    const listener = (e) => {
      if (e.data.id === id) {
        r(e.data.value);

        worker.removeEventListener("message", listener);
      }
    };
    worker.addEventListener("message", listener);
  });
}

export function insert(s) {
  const id = getId();
  const promise = createPromise(id);

  worker.postMessage({
    id,
    value: s,
    type: "insert",
  });
  return promise;
}

export function search(query) {
  const id = getId();
  const promise = createPromise(id);

  worker.postMessage({
    id,
    type: "search",
    value: query,
  });

  return promise;
}

```


**Worker.js**

```typescript 
/** @type {{id: string, str: string}[]} */
const arr = [];
onmessage = (e) => {
  if (e.data.type === "insert") {
    arr.push(e.data.value);
    self.postMessage({
      // 返回中带上请求的 id
      id: e.data.id,
    });
  } else if (e.data.type === "search") {
    /** @type {typeof arr} */
    const ans = [];
    const value = e.data.value;
    arr.forEach((x) => {
      if (x.str.includes(value)) {
        ans.push(x);
      }
    });
    self.postMessage({
      // 返回中带上请求的 id
      id: e.data.id,
      value: ans,
    });
  }
};

```


### 通过 Comlink 实现该需求：

**main.js**

```typescript 
// 通过 Comlink 实现 Worker 上插入和查询
import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";

const DataProcessor = Comlink.wrap(new Worker("./comlink/worker.js"));
let processor = await new DataProcessor();

export async function insert(s) {
  await processor.insert(s);
}

export async function search(s) {
  return await processor.search(s);
}

```


**worker.js**

```typescript 
importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");

class DataProcessor {
  arr = [];
  constructor() {}

  insert(...s) {
    this.arr.push(...s);
  }

  search(target) {
    const ans = [];
    for (const value of this.arr) {
      if (value.str.match(target)) {
        ans.push(value);
      }
    }

    return ans;
  }
}

Comlink.expose(DataProcessor);

```


### 对比二者我们可以发现：

- **通过 Comlink 实现的 Worker 的代码和普通代码几乎无差异，对通信过程无感知**
- **直接通过 Web Worker 实现需要自己管理繁琐的通信过程。如果没有封装自己的 Worker 管理模块则 Worker 内的复杂度很难维护**

除了上面的好处之外，通过 Comlink 我们**甚至可以传递函数**，例如

**main.js**

```typescript 
...

export async function map(callback) {
  return processor.map(Comlink.proxy(callback));
}

async function test() {
  await insert({id: '0', str: 'hello'})
  await insert({id: '1', str: 'value'})
  console.log(await map(x => x.str.toUpperCase())); 
  // OUTPUT: ['HELLO', 'VALUE']
}

```


**worker.js**

```typescript 
class DataProcessor {
  ...

  map(callback) {
    return Promise.all(this.arr.map(callback));
  }
}


```


为什么**通过 Comlink 还能够在 Worker 和 主进程间传递函数呢？这个函数甚至还能带有原进程的闭包，** 这是如何做到的呢？请看下一节详解

# 原理解析

## 前置知识 - Channel Messaging API

为了理解 Comlink 的基本原理我们首先要认识 [Channel Messaging API](https://link.juejin.cn/?target=https://developer.mozilla.org/zh-CN/docs/Web/API/Channel_Messaging_API "Channel Messaging API")。

> Channel Messaging API 允许两个不同的脚本运行在同一个文档的不同浏览器上下文（Browsing Context, 比如两个 iframe，或者文档主体和一个 iframe，使用 SharedWorker 的两个文档，或者两个 worker）来直接通讯，在每端使用一个端口（port）通过双向频道（channel）向彼此传递消息。

`new MessageChannel()` 返回 `port1` `port2`, 二者之间通过 postMessage / onmessage 可以进行通信。通过 `postMessage` 的方式我们能够将 port 转移到其他的 Browsing Context 上（转移之后它们就从原来的上下文中消失了）。

```javascript 
var channel = new MessageChannel();
var iframe = document.querySelector('iframe');

// Listen for messages on port1
channel.port1.onmessage = function onMessage(e) {
  console.log(e.data);
}

// Transfer port2 to the iframe
iframe.contentWindow.postMessage('Hello from the main page!', '*', [channel.port2]);

```


为什么要通过 `Channel Messaging` 进行通信，而不是直接使用 `Worker` 的 `message event` 和 `postMessage` 呢？

1. 通过 `Channel Messaging` **我们能让 ****`Worker`**** 和 ****`Worker`**** 直接通信，而不需要经过主进程**
2. 新建 `Channel` 可以避免消息冲突。例如 `Comlink` 的实现中就会新建 `port` 来 `expose` 不同的对象

## 🕶 Comlink 是如何实现的

(本文的摘录的源码中过滤了不重要的细节，和真实源码略有出入)

下面将针对几个问题逐个剖析

- 如何通信
  - 如何向”传递“一个函数？（`Comlink.proxy`  是如何实现的）
- 如何做到无感知的操作 worker 的对象的（只需要加 await 前缀 🧐）
  - `await workerObject.value` 就能够拿到 worker 的 obj 的 value
  - `workerObject.value = 123` 就能直接赋值给 worker 的 `workerObject.value`
  - `await new WorkerConstructor()` 就创建一个对象

### 如何通信

在 Comlink 的实现中，主动发送消息时都通过 `requestResponseMessage` 函数发送，而回复消息时直接通过 `ep.postMessage`，为了表示**回复的是哪一个消息所以需要带上额外的 id 标识。**

```typescript 
function requestResponseMessage(
  ep: Endpoint,
  msg: Message,
  transfers?: Transferable[]
): Promise<WireValue> {
  return new Promise((resolve) => {
    // 随机生成一个 uuid， 回复消息时需要带上这个 id
    const id = generateUUID(); 
    ep.addEventListener("message", function l(ev: MessageEvent) {
      // 消息中的 id 不匹配代表回复的不是此次请求
      if (!ev.data || !ev.data.id || ev.data.id !== id) {
        return;
      }
      ep.removeEventListener("message", l as any);
      resolve(ev.data);
    } as any);
    if (ep.start) {
      ep.start();
    }
    ep.postMessage({ id, ...msg }, transfers);
  });
}


```


#### 如何在进程间传递数据

在 `Comlink.expose` `Comlink.createProxy` 的代码中我们都会看到 `fromWireValue` `toWireValue` 两个函数的身影。例如

- 在 `setter` 中，就会将原始数据 `toWireValue` 封装之后再通过 `postMessage` 发送
- 接收方收到消息后，会将数据通过 `fromWireValue` 再转换为可操作的原始数据

为什么需要这样的操作呢？直接通过默认的通信方法把 `value` 塞过去不就好了吗？

这就涉及了 `Comlink` 的高级 `feature`：**支持跨进程“传递”带原进程闭包的函数/带有这种函数的对象**。例如上文的例子中我们可以 `const processor = await new DataProcessor()` 来创建一个来自于 Worker 的对象。其中 `DataProcessor` 是定义于 Worker 上的 constructor，`processor` 也是存在 Worker 进程上，**而主进程拿到的只是操作 Worker 中的 ****`processor`**** 的本体的句柄**：`processor.search` `processor.insert` 等操作都是在 worker 上运行的, 查询/插入的数据也都处于 Worker 进程上。

`toWireValue` & `fromWireValue` 是如何做成这样的事的呢？首先让我们来回顾以下几个要点：

1. 首先我们定义好消息的传输终端 `Endpoint` 类型。它能够通过 postMessage 发送消息，包含了 Worker 和 **Chanel Messaging API 中的 port**

```typescript 
export interface Endpoint extends EventSource {
  postMessage(message: any, transfer?: Transferable[]): void;
  start?: () => void;
}

export interface EventSource {
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: {}
  ): void;

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: {}
  ): void;
}

```


1. 我们知道 Comlink 中有一个 `expose` 函数, 让一个 object 能够被 Endpoint 上收到的消息所控制

```typescript 
export function expose(obj: any, ep: Endpoint = self as any) {
  ep.addEventListener("message", function callback(ev: MessageEvent) {
    ...
  }
}

```


1. 我们也知道 Comlink 中有一个 `wrap` 函数, 能够封装一个代理，读取/控制被 `expose` 暴露到 endpoint 的对象。

```typescript 
export function wrap<T>(ep: Endpoint, target?: any): Remote<T> {
  return createProxy<T>(ep, [], target) as any;
}

```


1. 在 `new MessageChannel()` 后我们得到的两个 port，两个 port 之间是能够通过 `postMessage`, `addEventListener('message', (ev) => {...})` 进行通信的。且在上文的 Channel Messaging API 的介绍中提到了，port 是能够被转移给另外一个进程的。

结合以上四点，如果我们在进程 A 中想把一个带闭包的函数 / 带这样的函数的对象 `fn` 传递给进程 B，只需要

- 在进程 A `expose(fn, port1)`
- 在进程 B `const handler = wrap(port2)`

从而在进程 B 中就能通过 `handler` 去做需要的处理了。例如

- 在 B 中直接调用这个函数 `handler()`
- 这个调用操作的行为就会被转发到 A 进程中
- A 执行 `fn()`
- 返回值被异步返回给 B

这个设计很巧妙的一点就是能够**递归地利用 wrap & expose 的能力**。例如

- 在 B 进程中 `handler.value = callback`，其中 callback 是一个函数
- 这个 set 操作会被同步到进程 A，所以这个 callback 也需要被包装
- 这个 callback 会在进程 B 上被 `expose(callback, port1)`
- port2 会被传递到进程 A，在进程 A 上被 `wrap(port2)`，得到进程 B 的 callback 的 handler

从而 toWireValue / fromWireValue 的实现就不难推测了：

- 对于基本类型（plain object，string，number），直接通过默认的 worker 方式传递即可
- 对于需要被代理的对象（例如带闭包的函数），就需要通过新建 MessageChannel 传递 port，进行 expose & wrap 的方式进行
  - 在默认情况下不会代理函数，需要通过 `Comlink.proxy(callback)` 包装的函数才会被 expose & wrap 的方式传递到另外一个进程

```typescript 
/*
 * 在传递一个值时（setter, 函数参数传递, 传递函数返回值）
 * 会在原进程通过 toWireValue 封装, 
 * 接收消息的进程通过 fromWireValue 解析
 */

function toWireValue(value: any): [WireValue, Transferable[]] {
  for (const [name, handler] of transferHandlers) {
    if (handler.canHandle(value)) {
      const [serializedValue, transferables] = handler.serialize(value);
      return [
        {
          type: WireValueType.HANDLER,
          name,
          value: serializedValue,
        },
        transferables,
      ];
    }
  }
  return [
    {
      type: WireValueType.RAW,
      value,
    },
    transferCache.get(value) || [],
  ];
}

function fromWireValue(value: WireValue): any {
  switch (value.type) {
    case WireValueType.HANDLER:
      return transferHandlers.get(value.name)!.deserialize(value.value);
    case WireValueType.RAW:
      return value.value;
  }
}

export const transferHandlers = new Map<
  string,
  TransferHandler<unknown, unknown>
>([
  ["proxy", proxyTransferHandler],
  ...
]);

const proxyTransferHandler: TransferHandler<object, MessagePort> = {
  // 只有带了 proxyMarker 的 obj 才会用 proxy 的方式封装
  canHandle: (val): val is ProxyMarked =>
    isObject(val) && (val as ProxyMarked)[proxyMarker],
  serialize(obj) {
    /**
      * 新建 MessageChanel
      * 在原进程 expose(obj, port1)
      * 在接收消息的进程 wrap(port2)
      */ 
    const { port1, port2 } = new MessageChannel();
    expose(obj, port1);
    return [port2, [port2]];
  },
  deserialize(port) {
    port.start();
    return wrap(port);
  },
};

```


### 如何做到无感知地操作 Worker 的对象的

你可能已经猜到是通过 Proxy 实现的。如果你对 Proxy 不熟可以先看看 [Proxy 的 MDN 文档](https://link.juejin.cn?target=https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy "Proxy 的 MDN 文档")。

但是它又是如何通过 Proxy 完成这样的代理的呢？

在 Worker 中我们通过 `Comlink.expose(obj)` 选择暴露一个对象，而在主进程中我们通过 `Comlink.wrap(worker)` 获取到这个对象。

所以可以推测出 `wrap` 操作**返回了一个 Proxy 对象，将操作变为对 worker 的 postMessage**，而 `expose` 则增加了 `message` **事件的 listener，将收到的消息转为操作。**

我们可以通过不同的操作类型的实现具体展开

#### Getter 的实现

Comlink.wrap 的实现是直接基于 createProxy 的

```typescript 
export function wrap<T>(ep: Endpoint, target?: any): Remote<T> {
  return createProxy<T>(ep, [], target) as any;
}

```


createProxy 的实现则是封装了一个 Proxy

```typescript 
function createProxy<T>(
  ep: Endpoint,
  path: (string | number | symbol)[] = [],
  target: object = function () {}
): Remote<T> {
  let isProxyReleased = false;
  const proxy = new Proxy(target, {
    /**
      * proxy.a 会调用 get 函数, 此时的函数参数：
      * 
      * _target 等于 target
      * prop    等于 'a'
      */
    get(_target, prop) {
      // 当调用 await proxy 时，prop 等于 'then'
      if (prop === "then") {
        if (path.length === 0) {
          return { then: () => proxy };
        }
        const r = requestResponseMessage(ep, {
          type: MessageType.GET,
          path: path.map((p) => p.toString()),
        }).then(fromWireValue);
        return r.then.bind(r);
      }

      // 递归创建 Proxy，将 prop 推入 path 的末尾
      return createProxy(ep, [...path, prop]);
    },
    ...
  }

  return proxy as any;
}

```


此处比较神奇的是 `if (prop === 'then')` 条件语句下的处理，为什么这样的处理能够让 `await proxy.value` 就能够直接拿到 worker 当中的值呢？这就要从 `await xxx` 在 Proxy 当中的处理说起。

根据 ECMAScript® 2022 Language Specification 中 [await](https://link.juejin.cn?target=https://tc39.es/ecma262/#await "await") 的描述:

- `await value` 在内部实现中会变成 `await Promise.resolve(value)`
- 而 [Promise.resolve 的处理中](https://link.juejin.cn?target=https://tc39.es/ecma262/#sec-promise-resolve-functions "Promise.resolve 的处理中") 则会获取 `value.then` 的值，如果它是一个函数则会通过它创建一个 Promise Job。

所以下面这个例子中 `ans` 等于 100

```typescript 
const ans = await {
  then: (resolve, reject) => {
    resolve(100);
  }
}

// ans = 100

```


从而在 `await proxy` 时会触发 Proxy 的 getter，获取的属性等于 `'then'`。 `await proxy.a` 在 proxy 的 getter 中最终会走到下面这段代码

```typescript 
const r = requestResponseMessage(ep, {
  type: MessageType.GET,
  path: path.map((p) => p.toString()), // path = ['a']
}).then(fromWireValue); // 解析 Response 的返回值
return r.then.bind(r); // 该返回值会被用于创建 Promise Job

```


这个发送的消息被 Worker 收到后的处理被写在了 `Comlink.expose` 函数中:

```typescript 
export function expose(obj: any, ep: Endpoint = self as any) {
  ep.addEventListener("message", function callback(ev: MessageEvent) {
    const { id, type, path } = ev.data
    try {
      const rawValue = path.reduce((obj, prop) => obj[prop], obj);
      switch (type) {
        case MessageType.GET:
          {
            returnValue = rawValue;
          }
          break;
        ...
      }
    }
    const [wireValue, transferables] = toWireValue(returnValue);
    ep.postMessage({ ...wireValue, id }, transferables);
  }
}

```


#### Setter / Function Call / new 的实现

了解了 getter 的实现后，剩下的几种操作的实现就是类似的：

- createProxy 中代理操作，将操作参数 `toWireValue` 后发送到 worker
- worker 接收到操作，进行对应处理后返回所需要的值
- 原进程收到消息，将消息内容 `fromWireValue` 处理后返回给调用方（通过 Promise 封装）

```typescript 
function createProxy<T>(
  ep: Endpoint,
  path: (string | number | symbol)[] = [],
  target: object = function () {}
): Remote<T> {
  let isProxyReleased = false;
  const proxy = new Proxy(target, {
    ...
    set(_target, prop, rawValue) {
      const [value, transferables] = toWireValue(rawValue);
      return requestResponseMessage(
        ep,
        {
          type: MessageType.SET,
          path: [...path, prop].map((p) => p.toString()),
          value,
        },
        transferables
      ).then(fromWireValue) as any;
    },
    apply(_target, _thisArg, rawArgumentList) {
      // 多参数的 toWireValue
      const [argumentList, transferables] = processArguments(rawArgumentList);
      return requestResponseMessage(
        ep,
        {
          type: MessageType.APPLY,
          path: path.map((p) => p.toString()),
          argumentList,
        },
        transferables
      ).then(fromWireValue);
    },
    construct(_target, rawArgumentList) {
      // 多参数的 toWireValue
      const [argumentList, transferables] = processArguments(rawArgumentList);
      return requestResponseMessage(
        ep,
        {
          type: MessageType.CONSTRUCT,
          path: path.map((p) => p.toString()),
          argumentList,
        },
        transferables
      ).then(fromWireValue);
    },
    ...
  }

  return proxy as any;
}

```


`Comlink.expose` 中的相关实现

```typescript 
export function expose(obj: any, ep: Endpoint = self as any) {
  ep.addEventListener("message", function callback(ev: MessageEvent) {
    const { id, type, path } = ev.data
    try {
      const parent = path.slice(0, -1).reduce((obj, prop) => obj[prop], obj);
      const rawValue = path.reduce((obj, prop) => obj[prop], obj);
      switch (type) {
        case MessageType.SET:
          {
            // value 有可能是 port，需要通过 fromWireValue 处理
            // 详情见上文 「如何在进程间传递数据」
            parent[path.slice(-1)[0]] = fromWireValue(ev.data.value);
            returnValue = true;
          }
          break;
        case MessageType.APPLY:
          {
            returnValue = rawValue.apply(parent, argumentList);
          }
          break;
        case MessageType.CONSTRUCT:
          {
            const value = new rawValue(...argumentList);
            // 通过 proxy 标记这个 value 需要被 expose & wrap 封装
            // 详情见上文 「如何在进程间传递数据」
            returnValue = proxy(value);
          }
          break;
        ...
      }
    }
    const [wireValue, transferables] = toWireValue(returnValue);
    ep.postMessage({ ...wireValue, id }, transferables);
  }
}

```
