# Subscription

`Subscription`就是表示`Observable`的执行，可以被清理。这个对象最常用的方法就是`unsubscribe`方法，它不需要任何参数，只是用来清理由`Subscription`占用的资源。同时，它还有`add`方法可以使我们取消多个订阅。

```javascript 
const myObservable = Rx.Observable.create(observer => {
  observer.next('foo');
  setTimeout(() => observer.next('bar'), 1000);
});
const subscription = myObservable.subscribe(x => console.log(x));
// 稍后：
// 这会取消正在进行中的 Observable 执行
// Observable 执行是通过使用观察者调用 subscribe 方法启动的
subscription.unsubscribe();
```
