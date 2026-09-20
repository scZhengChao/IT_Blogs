# RxJS：所有订阅都需要调用unsubscribe取消订阅？

最开始用RxJS的时候，看官方文档对Subscription的介绍如下：

> What is a Subscription? A Subscription is an object that represents a disposable resource, usually the execution of an Observable. A Subscription has one important method,unsubscribe, that takes no argument and just disposes the resource held by the subscription&#x20;

从此用RxJS订阅的时候，时刻都不忘调用unsubscribe()以防内存泄漏。对于结束Observable，释放内存的方式有三种方式：

- 第一种，Observable完成值的发送，执行Observable.onComplete()
- 第二种，Observable发生错误，执行Observable.OnError()
- 第三种，订阅者主动取消订阅，执行subscription.unsubscribe()

对于`Observable.onComplete()`和`Observable.OnError()`，RxJS自身会处理这两种情况，所以不需要在代码里再手动取消订阅释放内存。对于第三种方式，Observable还在源源不断的发送值，订阅者想主动取消订阅，那就需要在代码里调用`unsubscribe()`取消订阅释放内存。

**那么显然在代码中，并不是所有的Observable都需要手动调用unsubscribe()取消订阅。**

在Angular项目中，常用到的订阅以及是否需要调用unsubscribe()取消订阅，有以下几种：

- Angular中通过HttpClient执行Http Request返回的Observables，订阅这些Observables拿到API返回的数据，不需要调用unsubscribe()取消订阅。
- Angular AsyncPipe，不需要调用unsubscribe()取消订阅。
- 通过Subject，BehaviorSubject，AsyncSubject，ReplaySubject在各个Component之间通信，需要调用unsubscribe()取消订阅。
- RxJS自带的一些操作符：take，takeWhile，first等等，不需要调用unsubscribe()取消订阅。

接下来，详细解释下以上几种订阅以及为什么有的需要手动调用unsubscribe()取消订阅，而有些不需要。
