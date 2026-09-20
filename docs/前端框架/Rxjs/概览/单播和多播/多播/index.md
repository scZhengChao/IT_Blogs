# 多播

那么如果实现多播能力呢，也就是实现我们不论什么时**候订阅只会接收到实时的数据的功能。**

可能这个时候会有小伙伴跳出来了，直接给个中间人来订阅这个源，然后将数据转发给`A`和`B`不就行了？

```typescript 

const source = Rx.Observable.interval(1000).take(3);

const subject = {
  observers: [],
  subscribe(target) {
    this.observers.push(target);
  },
  next: function(value) {
    this.observers.forEach((next) => next(value))
  }
}

source.subscribe(subject);

subject.subscribe((value) => console.log('A ' + value))

setTimeout(() => {
  subject.subscribe((value) => console.log('B ' + value))
}, 1000)

// A 0
// A 1
// B 1
// A 2
// B 2


```


先分析一下代码，`A`和`B`的订阅和单播里代码并无差别，唯一变化的是他们订阅的对象由`source`变成了`subject`，然后再看看这个`subject`包含了什么，这里做了一些简化，移除了`error`、`complete`这样的处理函数，只保留了`next`，然后内部含有一个`observers`数组，这里包含了所有的订阅者，暴露一个`subscribe`用于观察者对其进行订阅。

在使用过程中，让这个中间商`subject`来订阅`source`，这样便做到了统一管理，以及保证数据的实时性，因为本质上对于`source`来说只有一个订阅者。

> 这里主要是方便理解，简易实现了`RxJS`中的`Subject`的实例，这里的中间人可以直接换成`RxJS`的`Subject`类实例，效果是一样的

```typescript 
const source = Rx.Observable.interval(1000).take(3);

const subject = new Rx.Subject();

source.subscribe(subject);

subject.subscribe((value) => console.log('A ' + value))

setTimeout(() => {
  subject.subscribe((value) => console.log('B ' + value))
}, 1000)


```
