# BehaviorSubject

`Subject` 的一种变体，它**需要一个初始值并会在订阅时发送其当前值。**

`BehaviorSubject` 是一种在有**新的订阅时会额外发出最近一次发出的值**的`Subject`。

![](https://ask.qcloudimg.com/http-save/yehe-1036137/1smybvuijs.png)

同样我们结合现实场景来进行理解，假设有我们需要使用它来维护一个状态，在**它变化之后给所有重新订阅的人都能发送一个当前状态的数据，这就好比我们要****实现一个计算属性****，我们只关心该计算属性最终的状态，而不关心过程中变化的数**，那么又该怎么处理呢？

我们知道普通的`Subject`只会在当前有新数据的时候发送当前的数据，而发送完毕之后就不会再发送已发送过的数据，那么这个时候我们就可以引入`BehaviorSubject`来进行终态维护了，因为订阅了该对象的观察者在**订阅的同时**能够**收到该对象发送的最近一次的值，** 这样就能满足我们上述的需求了。

然后再结合代码来分析这种`Subject`应用的场景：

```javascript 
const subject = new Rx.Subject();

subject.subscribe((value) => console.log('A：' + value))

subject.next(1);
// A：1
subject.next(2);
// A：2

setTimeout(() => {
 subject.subscribe((value) => console.log('B：' + value)); // 1s后订阅，无法收到值
}, 1000)
```


首先演示的是采用普通`Subject`来作为订阅的对象，然后观察者`A`在实例对象`subject`调用`next`发送新的值之前订阅的，然后观察者是延时一秒之后订阅的，所以`A`接受数据正常，那么这个时候由于`B`在数据发送的时候还没订阅，所以它并没有收到数据。

那么我们再来看看采用`BehaviorSubject`实现的效果：

```javascript 
const subject = new Rx.BehaviorSubject(0); // 需要传入初始值

subject.subscribe((value: number) => console.log('A：' + value))
// A：0
subject.next(1);
// A：1
subject.next(2);
// A：2

setTimeout(() => {
 subject.subscribe((value: number) => console.log('B：' + value))
 // B：2
}, 1000)
```


同样从打印的结果来看，与普通`Subject`的区别在于，在**订阅的同时源对象就发送了最近一次改变的值**（如果没改变则发送初始值），这个时候我们的`B`也如愿获取到了最新的状态。

> 这里在实例化`BehaviorSubject`的时候需要传入一个初始值。
