# 多播Observables

## 目录

- [多播 Observables](#多播-Observables)
  - [引用计数](#引用计数)

## 多播 Observables

“多播 `Observable`”通过**可能有许多订阅者**的 `Subject` 来传递通知，而普通的“单播 Observable”**仅向单个 Observer 发送通知。**

> 多播的 `Observable` 在底\*\*层使用 ****`Subject`**** \*\*来让多个 Observer 看到相同的 Observable 执行过程。

在底层，这就是 `[multicast]` **操作符的工作方式**： Observer 订阅底层主体，主体订阅源 Observable。下面的例子类似于前面使用 `observable.subscribe(subject)` 的例子：

```typescript 
import { from, Subject, multicast } from 'rxjs';

const source = from([1, 2, 3]);
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));

// These are, under the hood, `subject.subscribe({...})`:
multicasted.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
multicasted.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

// This is, under the hood, `source.subscribe(subject)`:
 multicasted.connect();
```


`[multicast]` 返回一个看起来像普通 `Observable` 的 `Observable`，但在订阅时会像 Subject 一样工作。`[multicast]` 返回一个 `[ConnectableObservable]`，它只是一个带有 `[connect]` 方法的 Observable。

`[connect]` 方法对于确定共享的 `Observable` 何时开始执行非常重要。因为 `[connect]（)` 在后台执行 `source.subscribe(subject)`，所以 `[connect]()` 返回一个订阅，你可以退订以取消共享的 `Observable` 执行过程。

### 引用计数

手动调用 `[connect]()` 并处理订阅通常很麻烦。通常，我们希望在第一个 Observer 抵达时\_**自动**\_连接，并在**最后一个 Observer 退订**时自动取消共享执行。

请考虑以下示例，其中发生了此列表中列出的订阅：

1. 第一个 Observer 订阅了多播的 Observable
2. **多播的 Observable 已连接**
3. `next` 值 `0` 被传递给第一个 Observer
4. 第二个 Observer 订阅了多播的 Observable
5. `next` 的值 `1` 被传递给第一个 Observer
6. `next` 的值 `1` 被传递给第二个 Observer
7. 第一个 Observer 退订多播的 Observable
8. `next` 值 `2` 被传递给第二个 Observer
9. 第二个 Observer 退订多播的 Observable
10. **与多播的 Observable 的连接被退订**

为了通过显式调用 `[connect]()` 来实现这一点，我们编写了以下代码：

```javascript 
import { interval, Subject, multicast } from 'rxjs';

const source = interval(500);
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));
let subscription1, subscription2, subscriptionConnect;

subscription1 = multicasted.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
// We should call `connect()` here, because the first
// subscriber to `multicasted` is interested in consuming values
subscriptionConnect = multicasted.connect();

setTimeout(() => {
  subscription2 = multicasted.subscribe({
    next: (v) => console.log(`observerB: ${v}`),
  });
}, 600);

setTimeout(() => {
  subscription1.unsubscribe();
}, 1200);

// We should unsubscribe the shared Observable execution here,
// because `multicasted` would have no more subscribers after this
setTimeout(() => {
  subscription2.unsubscribe();
  subscriptionConnect.unsubscribe(); // for the shared Observable execution
}, 2000);
```


如果我们希望**避免显式调用** `[connect]()`，可以使用 `ConnectableObservable` 的 `refCount()`方法 \*\*（引用计数）**，它返回一个 Observable 来跟踪它有多少订阅者。当订阅**者数量从 ****`0`**** 增加到 ****`1`**** 时，\*\*它会为我们调用 `[connect]()`，从而开始共享执行。只有当订阅者数量从 `1` 减少到 `0` 时，才会完全退订，并停止进一步执行。

> `refCount` 能使多播的 Observable 在**第一个订阅者抵达时自动开始执行，并在最后一个订阅者离开时停止执行。**

```javascript 
import { interval, Subject, multicast, refCount } from 'rxjs';

const source = interval(500);
const subject = new Subject();
const refCounted = source.pipe(multicast(subject), refCount());
let subscription1, subscription2;

// This calls `connect()`, because
// it is the first subscriber to `refCounted`
console.log('observerA subscribed');
subscription1 = refCounted.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

setTimeout(() => {
  console.log('observerB subscribed');
  subscription2 = refCounted.subscribe({
    next: (v) => console.log(`observerB: ${v}`),
  });
}, 600);

setTimeout(() => {
  console.log('observerA unsubscribed');
  subscription1.unsubscribe();
}, 1200);

// This is when the shared Observable execution will stop, because
// `refCounted` would have no more subscribers after this
setTimeout(() => {
  console.log('observerB unsubscribed');
  subscription2.unsubscribe();
}, 2000);

// Logs
// observerA subscribed
// observerA: 0
// observerB subscribed
// observerA: 1
// observerB: 1
// observerA unsubscribed
// observerB: 2
// observerB unsubscribed
```


refCount() 方法只存在于 ConnectableObservable 上，**它返回一个 Observable，而不是另一个 ConnectableObservable。**
