# postMessage 消息通信如何 Promise 化？

## 目录

- [思考](#思考)
- [实现](#实现)
- [陷入沉思](#陷入沉思)

`postMessage` Api 想必大家都不陌生，`WebWorker` 通信会用到，`iframe` 窗口之间通信也会用到，尤其像一些通过 iframe 嵌入其他项目产品的应用，想要实现实时通信，就少不了它。

但是，监听消息基本都是全局注册事件来接收对应消息，然后在做分发处理的。

假如业务比较复杂，流程比较长，消息通信的频率高，而且通信场景繁琐，那么通过全局事件处理就显得不太合适了。

那么问题来了，我们能不能将 `postMessage` 进行一次转化，把他变成类似 `Promise` 的使用方式，这样业务里使用 `postMessage` 进行通信的时候，就不需要考虑全局回调事件了。而且 `Promise` 和他的语法糖 `await` 都可以很好的消除回调地狱的情况。

## **思考**

Promise 化，需要解决那些问题？

- 业务中发起的事件，如何注册并消费？
- 相同的事件多次发起，应该如何处理响应结果？

我们先来看**业务中发起的事件，如何注册并消费？**

举个实际的例子：我们假定有子系统向父级 `iframe` 获取 `loginToken` 的行为。

正常情况我们会这样写：

```typescript 
const messageEventHandler = (event: MessageEvent) => {
  const data = event.data;
  // 分发事件
  emit(data?.api, data);
}
// 接收
window.addEventListener("message", messageEventHandler);
// 发送
window.parent.postMessage({ api: "getLoginToken" }, "*");

```


这样写逻辑有问题吗？没有问题！逻辑可以正确的执行，事件也成功的被分发了

> 通过消息订阅来接收通知，单发的时候看起来没什么问题，假如 `getLoginToken` 被多次触发，或者说，同一个事件被多次注册，那么还需要考虑业务侧事件执行后销毁，避免重复触发

有没有办法可以减轻业务侧的心智负担呢？

办法总比困难多嘛\~

> 我们可以使用一个全局变量 `PostMessageCallBackMap` 来存放注册的事件及回调，`Promise` 中的 `resolve` 正好有阅后即焚的特性，那么我们是不是可以考虑把创建出来的 `resolve` 作为 `callback` 放到 `Map` 中呢？

想到就立即行动！

## **实现**

改造后的代码如下

```typescript 
export const PostMessageCallBackMap = new Map();
const messageEventHandler = (event: MessageEvent) => {
  // 事件分发
  const data = event.data;
  let eventKey = data?.api;
​
  if (PostMessageCallBackMap.has(eventKey)) {
    PostMessageCallBackMap.get(eventKey)(data);
  }
};
​
// 接收
window.addEventListener("message", messageEventHandler);
```


接收我们写好了，发送这块怎么实现呢？

```typescript 
function sendMessage<T>(param: JSBridgeReq): Promise<JSBridgeRes<T>> {
  return new Promise((resolve, reject) => {
    if (window.parent) {
      window.parent.postMessage(param, "*");
      // 将当前的 resolve 添加到 Map 中，等待返回事件触发
      let eventKey = param.api;
      PostMessageCallBackMap.set(eventKey, resolve);
    }
  });
}
// 这样封装一下，业务中使用就十分方便了
const { token } = await sendMessage({ api: "getLoginToken" })
console.log(token);
```


这样看起来舒服了很多，业务中应用起来也顺手了很多，完结撒花\~

等等！

还有个问题呐。

**相同的事件多次发起，应该如何处理响应结果？**

## **陷入沉思**

emm，按上面的写法，多次发送 `getLoginToken` 事件，Map 中的 Key 是唯一的，之前的事件会被覆盖掉，再加上异步事件返回时间不确定的话，完蛋了啊！

> **每一个回调给他一个唯一id**，然后通过事件id来进行匹配，不管事件执行的时间长短，通过**事件id**总可以找到另一半。

唯一id，最简单的我们就用时间戳吧。

改造！改造！改造！

```typescript 
export const PostMessageCallBackMap = new Map();
​
// 发送
function sendMessage<T>(param: JSBridgeReq): Promise<JSBridgeRes<T>> {
  return new Promise((resolve, reject) => {
    if (window.parent) {
      param.timestamp = Date.now();
      window.parent.postMessage(param, "*");
      
      let eventKey = param.api + param.timestamp;
      PostMessageCallBackMap.set(eventKey, resolve);
    }
  });
}
​
// 接收
const messageEventHandler = (event: MessageEvent) => {
  // 事件分发
  const data = event.data;
  let eventKey = data?.api;
  // timestamp 来保证对应关系
  eventKey = data?.api + (data?.timestamp || "");
​
  if (PostMessageCallBackMap.has(eventKey)) {
    PostMessageCallBackMap.get(eventKey)(data);
    // 由于事件id的存在，Map会越来越大，清除字典防止内存泄漏
    setTimeout(() => {
      PostMessageCallBackMap.delete(eventKey);
    }, 0);
  }
};
window.addEventListener("message", messageEventHandler);
```
