# 调度器Scheduler

## 目录

- [调度器类型](#调度器类型)
- [使用调度器](#使用调度器)
  - [静态创建操作符](#静态创建操作符)
  - [实例操作符可以将调度器作为参数](#实例操作符可以将调度器作为参数)

**什么是调度器？**调度器控制某**个订阅何时开始以及何时传递通知**。它由三个部件组成。

- \*\*调度器是一种****数据结构****。\*\*它知道如何根据优先级或其它标准来存储和对任务进行排队。
- \*\*调度器是一个****执行上下文****。\*\*它表示任务在何时何地执行（例如立即执行，或在另一个回调机制中，如 setTimeout 或 process.nextTick，或动画帧）。
- **调度器有一个****（虚拟）时钟** **。** 它通过调度器上的 getter 方法`now()` 提供了“时间”的概念。在特定调度器上调度的任务将仅遵守该时钟指示的时间。

> 调度器允许你定义 Observable 将在什么执行上下文中向其 Observer 传递通知。

在下面的示例中，我们采用通常的简单 `Observable` 同步发送值 `1`、`2`、`3`，并使用操作符 `[observeOn]`指定用于传递这些值的 `async` 调度器。

```javascript 
import { Observable, observeOn, asyncScheduler } from 'rxjs';

const observable = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
}).pipe(
  observeOn(asyncScheduler)
);

console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
});
console.log('just after subscribe');
```


与输出一起执行：

```python 
just before subscribe
just after subscribe
got value 1
got value 2
got value 3
done
```


请注意本通知的 `got value...` 是在 `just after subscribe` 收到的，这与我们目前看到的默认行为不同。这是因为 `[observeOn]([asyncScheduler])` 在 `new [Observable]` **和最终的 Observer 之间引入了一个代理 Observer**。让我们重命名一些标识符，以使示例代码中的区别显而易见：

```javascript 
import { Observable, observeOn, asyncScheduler } from 'rxjs';

const observable = new Observable((proxyObserver) => {
  proxyObserver.next(1);
  proxyObserver.next(2);
  proxyObserver.next(3);
  proxyObserver.complete();
}).pipe(
   observeOn(asyncScheduler)
 );

const finalObserver = {
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
};

console.log('just before subscribe');
observable.subscribe(finalObserver);
console.log('just after subscribe');
```


`proxyObserver` 是在 `[observeOn]([asyncScheduler])` 中创建的，它的 `next(val)` 函数大致如下：

```javascript 
const proxyObserver = {
  next(val) {
     asyncScheduler.schedule(
      (x) => finalObserver.next(x),
      0 /* delay */,
      val /* will be the x for the function above */
    );
   },

  // ...
};
```


`async` 调度器使用 `setTimeout` 或 `setInterval` 运行，即使给定的 `[delay]` 为零。像往常一样，在 JavaScript 中，已知 `setTimeout(fn, 0)` 在下一次事件循环迭代中最早运行函数 `fn`。这就解释了为什么在 `just after subscribe` 发生后会将 `got value 1` 传递给 `finalObserver`。

Scheduler 的 `schedule()` 方法会接受一个 `[delay]` 参数，它指的是相对于 `Scheduler` **内部时钟的时间量**。调度器的时钟**不需要与实际的钟表时间有任何关系**。这就是像 `[delay]` 这样的**时间操作符不是在实际时间上运行的，**而是在**调度器时钟指定的时间上运行**的。这在测试中特别有用，其中可以使用\_虚拟时间调度器\_来伪造挂钟时间，而实际上是同步执行计划任务。

## 调度器类型

`async` 调度器是 `RxJS` 提供的内置调度器之一。这些中的每一个都可以通过使用 `[Scheduler]` 对象的静态属性来创建和返回。

| 调度器                         | 用途                                                           |
| --------------------------- | ------------------------------------------------------------ |
| `null`                      | 不传递任何调度器，通知将以同步和递归方式传递。要把它用于恒定时间操作或尾递归操作。                    |
| `[queueScheduler]`          | 在当前事件框架（蹦床调度器）中的队列上调度。将其用于迭代操作。                              |
| `[asapScheduler]`           | 在微任务队列上调度，这与用于 Promise 的队列相同。基本上在当前工作之后，但在下一个工作之前。这些将用于异步转换。 |
| `[asyncScheduler]`          | 使用 `setInterval` 的调度器。将此用于基于时间的操作。                           |
| `[animationFrameScheduler]` | 调度将在下一次浏览器内容重绘之前发生的任务。可用于创建流畅的浏览器动画。                         |

## 使用调度器

你可能已经在你的 `RxJS` 代码中使用了调度器，而**没有明确说明要使用的调度器的类型**。这是因为**所有处理并发**的 `Observable` 操作符都有可选的调度器。如果你不提供调度器，`RxJS` 会根据**最少并发的原则选择一个默认的调度器**。这意味着会选择引入满足操作符需求的最少并发量的调度器。例如，**对于返回具有有限且少量消息的 observable 的操作符，RxJS 不使用调度器**，即 `null` 或 `undefined`。对于返回可能**大量或无限数量的消息的操作符**，会使用 `[queue]` 调度器。对于使用计时器的操作符，会使用 `async` 调度器。

因为 RxJS 使用会最少并发调度器，如果你想为了性能目的而引入并发，你可以选择一个不同的调度器。要指定特定的调度器，你可以使用**那些能接收调度器的操作符方法**，例如 `from([10, 20, 30], asyncScheduler)`。

##### **静态创建操作符**

\*\*静态创建操作符通常****以****某个 Scheduler 作为参数。\*\*例如，`from(array, scheduler)` 允许你指定在传递从 `array` 转换出来的每个通知时要使用的调度器。它通常是操作符的最后一个参数。以下静态创建操作符会接收 Scheduler 参数：

- `[bindCallback]`
- `[bindNodeCallback]`
- `[combineLatest]`
- `[concat]`
- `[empty]`
- `[from]`
- `fromPromise`
- `[interval]`
- `[merge]`
- `[of]`
- `[range]`
- `throw`
- `[timer]`

使用 **`subscribeOn`** 来安排 `subscribe()` **在什么上下文中发生调用**。默认情况下，对 Observable 的 `subscribe()` 调用将同步并立即发生。但是，你可以使用实例操作符 `subscribeOn(scheduler)`来**推迟或安排在给定调度器上发生的实际订阅，** 其中`scheduler` 是你要提供的参数。

使用 **`observeOn`** 来安排在什么上下**文中发送通知**。正如我们在上面的例子中看到的，实例操作符 `observeOn(scheduler)` 在源 `Observable` 和目标 `Observer` 之间引入了一个中介 Observer，此中介会使用给定的 `scheduler` 调度对目标 Observer 的调用。

##### **实例操作符可以将调度器作为参数**

与时间相关的操作符，如 `[bufferTime]`、`[debounceTime]`、`[delay]`、`[auditTime]`、`[sampleTime]`、`[throttleTime]`、`[timeInterval]`、`[timeout]`、`[timeoutWith]`、`[windowTime]` 都将 Scheduler 作为最后一个参数，否则默认在 `[asyncScheduler]` 上运行。

其它以 Scheduler 作为参数的实例操作符有：`cache`、`[combineLatest]`、`[concat]`、`[expand]`、`[merge]`、`[publishReplay]`、`[startWith]`。

请注意，`cache` 和 `[publishReplay]`都接受 Scheduler，因为它们使用了 ReplaySubject。ReplaySubjects 的**构造函数将可选的 Scheduler 作为最后一个参数**，因为 ReplaySubject 可能会处理时间，这仅在 Scheduler 的上下文中才有意义。默认情况下，ReplaySubject 会使用 `[queue]` 调度器提供时钟。

\*
