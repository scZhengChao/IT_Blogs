# Schedulers(调度器)

用来控制并发并且是中央集权的调度员，允许我们在发生计算时进行协调，例如 `setTimeout` 或 `requestAnimationFrame` 或其他。

- 调度器是一种数据结构。它知道如何**根据优先级或其他标准来存储任务和将任务进行排序**。
- 调度器是执行上下文。它表示在何时何地执行任务(举例来说，立即的，或另一种回调函数机制(比如 `setTimeout` 或 `process.nextTick`)，或动画帧)。
- **调度器有一个(虚拟的)时钟**。调度器功能通过它的 `getter` 方法 `now()` 提供了“时间”的概念。在具体调度器上安排的任务将严格遵循该时钟所表示的时间。

学到这相信大家也已经或多或少对`RxJS`有一定了解了，不知道大家有没有发现一个疑问，前面所展示的代码示例中有同步也有异步，而笔者却没有显示的控制他们的执行，他们的这套执行机制到底是什么呢？

其实他们的内部的调度就是靠的`Schedulers`来控制数据发送的时机，许多操作符会预设不同的`Scheduler`，所以我们不需要进行特殊处理他们就能良好的进行同步或异步运行。

```javascript 
const source = Rx.Observable.create(function (observer: any) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
});

console.log('订阅前');
source.observeOn(Rx.Scheduler.async) // 设为 async
.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
console.log('订阅后');

// 订阅前
// 订阅后
// 1
// 2
// 3
// complete
```


从打印结果上来看，数据的发送时机的确**已经由同步变成了异步**，如果不进行调度方式修改，那么“订阅后”的打印应该是在数据发送完毕之后才会执行的。

看完示例之后我们再来研究这个调度器能做哪几种调度：

- `queue`
- `asap`
- `async`
- `animationFrame`

[queue](./queue/index.md "queue")

[asap](./asap/index.md "asap")

[async](./async/index.md "async")

[animationFrame](./animationFrame/index.md "animationFrame")
