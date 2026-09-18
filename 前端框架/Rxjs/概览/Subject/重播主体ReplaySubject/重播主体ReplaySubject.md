# 重播主体ReplaySubject

`[ReplaySubject]`与 `[BehaviorSubject]` 类似，它可以将**旧值发送给新订阅者**，但它也可以\*\*\_记录\_\*\* `Observable` 执行结果的一部分。

`[ReplaySubject]` 会记录来自 `Observable` **执行的多个值，并将它们重播给新订阅者。**

> 创建 `[ReplaySubject]` 时，你可以指定要**重播的值的数量：**

```typescript 
import { ReplaySubject } from 'rxjs';
const subject = new ReplaySubject(3); // buffer 3 values for new subscribers

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(5);

// Logs:
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerB: 2
// observerB: 3
// observerB: 4
// observerA: 5
// observerB: 5
```


除了缓冲区大小之外，你还可以指定一个以**毫秒为单位的\_窗口时间**\_，以**确定记录的值可以存在多长时间**。在以下示例中，我们使用 `100` 个元素的大型缓冲区，但窗口时间参数仅为 `500` 毫秒。

```javascript 
import { ReplaySubject } from 'rxjs';
const subject = new ReplaySubject(100, 500 /* windowTime */);

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

let i = 1;
setInterval(() => subject.next(i++), 200);

setTimeout(() => {
  subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`),
  });
}, 1000);

// Logs
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerA: 5
// observerB: 3
// observerB: 4
// observerB: 5
// observerA: 6
// observerB: 6
// ...
```
