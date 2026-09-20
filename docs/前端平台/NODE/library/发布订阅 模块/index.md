# 发布订阅 模块

## 目录

- [Events](#Events)
  - [emit/on](#emiton)
  - [错误](#错误)
  - [监听注册事件newListener](#监听注册事件newListener)
  - [移除事件](#移除事件)
  - [最大监听数](#最大监听数)
  - [获取监听器的事件名数组](#获取监听器的事件名数组)
  - [prependOnceListener](#prependOnceListener)
  - [监听器数组](#监听器数组)
  - [coding](#coding)

# **Events**

[**核心模块 大部分都依赖于 Events的发布订阅 解耦**](http://nodejs.cn/api/events.html#events_passing_arguments_and_this_to_listeners "核心模块 大部分都依赖于 Events的发布订阅 解耦")

## emit/on

```typescript 
var EventEmitter = require('events')
var ee = new EventEmitter()


//发布  订阅    同步 this 指向实例 
ee.on('message', function (text) {
  console.log(text)
})
ee.emit('message', 'hello world')
//异步
     //  EventEmitter 以注册的顺序同步地调用所有监听器。 这样可以确保事件的正确排序，并有助于避免竞态条件和逻辑错误。  
    // 当适当时，监听器函数可以使用 setImmediate() 和 process.nextTick()  方法切换到异步的操作模式 ：
myEmitter.on('event', (a, bd) => {
  setImmediate(() => {
    console.log('异步地发生');
  });
});

```


## 错误

```typescript 
//作为最佳实践，应该 始终为 'error' 事件注册监听器 
 myEmitter.emit('error', new Error('错误'));
```


## **监听注册事件**newListener

```typescript 
//EventEmitter 实例在新的监听器被添加到其内部监听器数组之前， 会触发自身的 'newListener' 事件。 

// 可以重复注册同一个事件
const myEmitter = new MyEmitter();
// 只处理一次，避免无限循环。
myEmitter.once('newListener', (event, listener) => {
  if (event === 'event') {
    // 在前面插入一个新的监听器。
    myEmitter.on('event', () => {
      console.log('B');
    });
  }
});
myEmitter.on('event', () => {
  console.log('A');
});

 myEmitter.emit('event');// 打印:  B   A
```


## **移除事件**

```typescript 
//移除已注册的事件removeListener ;removeAllListeners   均返回实例 以便链式调用 

const ee = new EventEmitter();
function pong() {
      console.log('pong');
}
ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);


ee.emit('ping');
ee.emit('ping');
//示例中，删除了监听器 once('ping')：


const callback = (stream) => {
  console.log('已连接');
};
server.on('connection', callback);// ...
server.removeListener('connection', callback);


removeListener() 将删除 最近添加的实例 。只会从监听器数组中 最多移除一个 监听器。
如果监听器被多次添加到指定 eventName 的监听器数组中，则 必须多次调 用 removeListener() 才能移除所有实例。     
 一旦事件被触发，所有绑定到该事件的监听器都会按顺序依次调用。  这意味着，在事件触发之后、且最后一个监听器执行完成之前， 
 removeListener() 或 removeAllListeners() 不会从 emit() 中移除它们。 


```


## **最大监听数**

**setMaxListeners/defaultMaxListeners**

每个事件可以注册最多 10 个监听器。&#x20;

- 可以使用 emitter.setMaxListeners(n) 方法改变单个 EventEmitter 实例的限制。
- 设置 EventEmitter.defaultMaxListeners 要谨慎，因为会影响所有 EventEmitter 实例，包括之前创建的。 因而，优先使用 emitter.setMaxListeners(n) 而不是 EventEmitter.defaultMaxListeners。限制不是硬性的。   &#x20;

EventEmitter 实例可以添加超过限制的监听器，但会向 stderr 输出跟踪警告，表明检测到可能的内存泄漏。
&#x20;对于单个 EventEmitter 实例，可以使用 emitter.getMaxListeners() 和 emitter.setMaxListeners() 暂时地消除警告：

## 获取**监听器的事件名数组**

eventNames

```typescript 
const EventEmitter = require('events');
    const myEE = new EventEmitter();
        myEE.on('foo', () => {});
        myEE.on('bar', () => {});
    const sym = Symbol('symbol');
    myEE.on(sym, () => {});
console.log(myEE.eventNames());
// 打印: [ 'foo', 'bar', Symbol(symbol) ]

```


## **prependOnceListener**

- 加 listener 函数到名为 eventName 的事件的监听器数组的开头。&#x20;
- 不会检查 listener 是否已被添加。&#x20;
- 多次调用并传入相同的 eventName 和 listener 会导致 listener 被添加多次。

```typescript 
改变当前监听 同样事件的顺序;   prependListener ; prependOnceListener
server.prependListener('connection', (stream) => {
  console.log('已连接');
});
server.prependOnceListener('connection', (stream) => {  // 同once 先移除后调用
  console.log('第一次调用');
});

```


## **监听器数组**

**返回名为 eventName 的事件的监听器数组的副本。listeners 区别eventNames****;** \*\* 一个是名字一个是函数 都是数组\*\*​

```typescript 
server.on('connection', (stream) => {
      console.log('有连接');
});
console.log(util.inspect(server.listeners('connection')));
// 打印: [ [Function] ]
```


## coding

[eventproxy.js](./assets/file/eventproxy_431gc5MnXi.js "eventproxy.js")
