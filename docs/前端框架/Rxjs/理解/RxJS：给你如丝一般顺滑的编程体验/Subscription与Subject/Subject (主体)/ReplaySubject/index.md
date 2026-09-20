# ReplaySubject

在理解了`BehaviorSubject`之后再来理解`ReplaySubject`就比较轻松了，`ReplaySubject`会**保存所有值，然后回放给新的订阅者**，同时它提供了**入参用于控制重放值的数量**（默认重放所有）。

![](./image/image_u483JqpSvz.png)

什么？还不理解？看码：

```javascript 
const subject = new Rx.ReplaySubject(2);

subject.next(0);
subject.next(1);
subject.next(2);

subject.subscribe((value: number) => console.log('A：' + value))
// A：1
// A：2

subject.next(3);
// A：3
subject.next(4);
// A：4

setTimeout(() => {
 subject.subscribe((value: number) => console.log('B：' + value))
 // B：3
 // B：4
}, 1000)

// 整体打印顺序：
// A：1
// A：2
// A：3
// A：4
// B：3
// B：4
```


我们先从构造函数传参来看，`BehaviorSubject`与`ReplaySubject`都**需要传入一个参数**，对`BehaviorSubject`来说**是初始值**，而对于`ReplaySubject`来说就是**重放先前多少次的值**，如果不**传入重放次数，那么它将重放所有发射过的值。**

> 从结果上看，如果你不传入确定的重放次数，那么实现的效果与之前介绍的单播效果几乎没有差别。

所以我们再分析代码可以知道在订阅的那一刻，观察者们就能收到源对象前多少次发送的值。
