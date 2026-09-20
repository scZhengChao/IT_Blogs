# 异步主体AsyncSubject

AsyncSubject 是一种变体，其中仅将 `Observable` 执行的**最后一个值发送**给其 Observer，并且仅在**执行完成时发送。**

```typescript 
import { AsyncSubject } from 'rxjs';
const subject = new AsyncSubject();

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
subject.complete();

// Logs:
// observerA: 5
// observerB: 5
```


AsyncSubject 类似于 [last()](https://rxjs.tech/api/operators/last "last()") 操作符，因为它会等待 `complete` 通知以传递单个值。
