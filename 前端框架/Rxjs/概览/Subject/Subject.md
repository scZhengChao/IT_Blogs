# Subject

**什么是主体？** RxJS Subject 是一种特殊类型的 `Observable`，它允许将**值多播到**多个 Observer。虽然**普通的 Observable 是单播**的（每个订阅的 Observer 都拥有 Observable 的独立执行），但 Subjects 是多播的。

> Subject 类似于 `Observable`，但可以**多播到**多个 Observer。Subjects 就像 `EventEmitters`：它们**维护着许多监听器的注册表。**

**每个 Subject 都是 Observable****。** 给定一个`Subject`，你可以 `subscribe` 它，提供一个 Observer，它将开始正常接收值。从 Observer 的角度来看，它无法判断 Observable 的执行是来自普通的单播 Observable 还是来自 Subject。

在 Subject 内部，`subscribe` 不会调用一次能给出值的新执行过程。它只是在一个 Observer 列表中注册给定的 Observer，类似于 `addListener` 通常在其它库和语言中的工作方式。

**每个 Subject 也都是 Observer****。** 它是一个具有方法`next(v)`、`error(e)` 和 `complete()` 的对象。要为 Subject 提供一个新值，只需调用 `next(theValue)`，它将被多播到注册进来监听 Subject 的 Observer。

在下面的示例中，我们有**两个 Observer 附加到一个主体，我们向这个主体提供一些值：**

```javascript 
import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(1);
subject.next(2);

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
```


由于 `Subject` 是 `Observer`，这也**意味着你可以提供 ****`Subject`**** 作为任意 ****`Observable`**** ****`subscribe`**** 的参数**，如下面的示例所示：

```typescript 
import { Subject, from } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

const observable = from([1, 2, 3]);

 observable.subscribe(subject); // You can subscribe providing a Subject
 
// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```


使用上述方法，我们基本上只是通过 `Subject` 将**单播** `Observable`执行**转换为多播。** 这展示了`Subjects` 是让任何 `Observable` 执行共享给多个 Observers 的唯一方法。

`[Subject]`类型还有一些特化： `[BehaviorSubject]`、`[ReplaySubject]` 和 `[AsyncSubject]`。

[多播Observables](多播Observables.md "多播Observables")

[行为主体 BehaviorSubject，](<行为主体 BehaviorSubject，.md> "行为主体 BehaviorSubject，")

[重播主体ReplaySubject](重播主体ReplaySubject.md "重播主体ReplaySubject")

[异步主体AsyncSubject](异步主体AsyncSubject.md "异步主体AsyncSubject")

[void 主体](<void 主体.md> "void 主体")
