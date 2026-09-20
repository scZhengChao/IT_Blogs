# 发布订阅

## 目录

- [pub-sub](#pub-sub)
- [events](#events)
- [自定义](#自定义)
  - [EventEmitter](#EventEmitter)

## pub-sub

[pubsub.js](./file/pubsub_wpbPKp48Ah.js "pubsub.js")

```typescript 
// clearAllSubscriptions: ƒ clearAllSubscriptions()
// clearSubscriptions: ƒ clearSubscriptions(topic)
// publish: ƒ ( message, data )
// publishSync: ƒ ( message, data )
// subscribe: ƒ ( message, func )
// subscribeOnce: ƒ ( message, func )
// unsubscribe: ƒ (value)

var user = PubSub.subscribe('haha',(type,data)=>{
    console.log(data)
})

PubSub.publish('haha',true)
PubSub.publish('haha','asga')
PubSub.unsubscribe('haha')
PubSub.publish('haha',false)

```


## events

[http://nodejs.cn/api/events.html#events\_passing\_arguments\_and\_this\_to\_listeners](http://nodejs.cn/api/events.html#events_passing_arguments_and_this_to_listeners "http://nodejs.cn/api/events.html#events_passing_arguments_and_this_to_listeners")

```typescript 
var EventEmitter = require('events')
var ee = new EventEmitter()

 1.发布  订阅   同步 this 指向实例 
 ee.on('message', function (text) { 
   console.log(text) 
 }) 
 ee.emit('message', 'hello world') 

 2.异步 
EventEmitter  以注册的顺序同步地调用所有监听器 。 这样可以确保事件的正确排序，并有助于避免竞态条件和逻辑错误。 当适当时，
 监听器函数可以使用 setImmediate() 和 process.nextTick()  方法切换到异步的操作模式：
myEmitter.on('event', (a, b) => {
  setImmediate(() => {
    console.log('异步地发生');
  });
});


 4.作为最佳实践，应该始终为 'error' 事件注册监听器 
myEmitter.emit('error', new Error('错误'));

 5.监听注册事件once ;;on 
 EventEmitter  实例在新的监听器被添加到其内部监听器数组 之前 ，会触发自身的 'newListener' 事件。
    // 可以重复注册同一个事件
const myEmitter = new MyEmitter();// 只处理一次，避免无限循环。
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
myEmitter.emit('event');// 打印://   B//   A

 6.移除已注册的事件removeListener ;removeAllListeners  均返回实例 以便链式调用 
const callback = (stream) => {
    console.log('已连接');
};
server.on('connection', callback);// ...
server.removeListener('connection', callback);
removeListener() // removeListener() 将删除最近添加的一个实例。
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

注意： 一旦事件被触发，所有绑定到该事件的监听器都会按顺序依次调用。 
这意味着，在 事件触发之后、且最后一个监听器执行完成之前，  removeListener() 或 removeAllListeners() 不会从 emit() 中移除它们。 



 7. 最大监听数setMaxListeners;; defaultMaxListeners 
每个事件可以注册最多 10 个监听器。 可以使用 emitter.setMaxListeners(n) 方法改变单个 EventEmitter 实例的限制。
 设置 EventEmitter.defaultMaxListeners 要谨慎，因为会影响所有 EventEmitter 实例，包括之前创建的。 因而，优先使用 emitter.setMaxListeners(n) 而不是 EventEmitter.defaultMaxListeners。 
 限制不是硬性的。 EventEmitter 实例可以添加超过限制的监听器 ，但会向 stderr 输出跟踪警告，表明检测到可能的内存泄漏。
对于单个 EventEmitter 实例，可以使用 emitter.getMaxListeners() 和 emitter.setMaxListeners() 暂时地消除警告：

 7.回已注册监听器的事件名数组。eventNames 
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log( myEE.eventNames() );
// 打印: [ 'foo', 'bar', Symbol(symbol) ]

 8.当前的监听器最大限制数的值， defaultMaxListeners 
 EventEmitter.defaultMaxListeners。

 9. 改变当前监听 同样事件的顺序;   prependListener ; prependOnceListener 
server. prependListener ('connection', (stream) => {
  console.log('已连接');
});
server. prependOnceListener ('connection', (stream) => {  // 同once 先移除后调用
  console.log('第一次调用');
});
 加 listener 函数到名为 eventName 的事件的监听器数组的 开头。   不会检查 listener 是否已被添加 。 
  多次调用并传入相同的 eventName 和 listener 会导致 listener 被添加多次。 

 10.返回名为 eventName 的事件的监听器数组的副本。listeners 区别eventNames; 一个是名字一个是函数 都是数组 
server.on('connection', (stream) => {
      console.log('有连接');
});
console.log(util.inspect(server.listeners('connection')));
// 打印: [ [Function] ]
```


# 自定义

## EventEmitter

```typescript 
class EventEmitter {
  constructor(props){
    this._events = Object.create(null)  //纯净的对象
    this._count = null
    this.defaultMaxListeners = 10
    this.addListener = this.on
  }
  eventNames(){   // 返回监听的事件名
    return Object.keys(this._events);
  }
  setMaxListeners(n){   // 设置最大监听数
    this._count = n;
  }
  getMaxListeners(type, cb, flag){  // 返回监听数
    return this._count ? this._count : this.defaultMaxListeners;
  }
  on(type,cb,flag){  // 监听
    // 监听的事件不能超过了设置的最大监听数
    if (this._events[type] && this._events[type].length === this.getMaxListeners()) {
        throw new Error(type + '已超出最大的监听数')
        return false
    }
    // 默认值，如果没有_events的话，就给它创建一个
    if (!this._events) {
        this._events = Object.create(null);
    }
    // 不是newListener 就应该让newListener执行以下
    if (type !== 'newListener') {
        this._events['newListener'] && this._events['newListener'].forEach(listener => {
            listener(type);
        });
    }
    if (this._events[type]) {
        // 根据传入的flag来决定是向前还是向后添加
        if (flag) {
            this._events[type].unshift(cb);
        } else {
            this._events[type].push(cb);
        }
    } else {
        this._events[type] = [cb];
    }
   
  }
  prependListener(type,cb){   // 向前添加
    this.on(type, cb, true);
  }
  prependOnceListener(type,cb){  //向前添加一次的
    this.once(type, cb, true);
  }
  once(type, cb, flag){   //监听一次
      // 先绑定，调用后删除
    function wrap() {
        cb(...arguments);
        this.removeListener(type, wrap);
    }
    // 自定义属性
    wrap.listen = cb;
    this.on(type, wrap, flag);
  }
  removeListener(type,cb){
    if (this._events[type]) {
        this._events[type] = this._events[type].filter(listener => {
            return cb !== listener && cb !== listener.listen;
        });
    }
  }
  removeAllListener(){
    this._events = Object.create(null);
  }
  listeners(type){
    return this._events[type];
  }
  emit(type,...args){
    if (this._events[type]) {
        this._events[type].forEach(listener => {
            listener.call(this, ...args);
        });
    }
  }
}
let event = new EventEmitter()
```
