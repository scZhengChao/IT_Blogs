# Subscription

**什么是订阅？** 订阅是一个表示可释放资源的对象，**通常是 Observable 的一次执行**。订阅有一个重要的方法 `unsubscribe`，它不接受任何参数，只是释放本订阅所持有的资源。在以前的 RxJS 版本中，Subscription 被称为 “Disposable”。

```javascript 
import { interval } from 'rxjs';

const observable = interval(1000);
const subscription = observable.subscribe(x => console.log(x));
// Later:
// This cancels the ongoing Observable execution which
// was started by calling subscribe with an Observer.
subscription.unsubscribe();
```


> `Subscription` 本质上只有一个 `unsubscribe`() 函数来**释放资源或取消** Observable 的执行过程。

多个订阅也可以放在一起，以便调用一个订阅的 `unsubscribe()` 就可以退订多个订阅。你可以**通过将一个订阅“添加”到另一个订阅**中来做到这一点：

```javascript 
import { interval } from 'rxjs';

const observable1 = interval(400);
const observable2 = interval(300);

const subscription = observable1.subscribe(x => console.log('first: ' + x));
const childSubscription = observable2.subscribe(x => console.log('second: ' + x));

subscription.add(childSubscription);

setTimeout(() => {
  // Unsubscribes BOTH subscription and childSubscription
  subscription.unsubscribe();
}, 1000);
```


执行时，我们在控制台中看到：

```python 
second: 0
first: 0
second: 1
first: 1
second: 2
```


订阅也有一个 `remove(otherSubscription)` 方法，以撤消添加进来的子订阅。
