# 队列

```typescript 
import { Subject } from 'rxjs';

const queue = new Subject();

queue.next(task1);
queue.next(task2);
queue.next(task3);


queue.subscribe(task => {
  // 处理任务的逻辑
});


```


```typescript 
//控制任务的执行顺序：可以使用RxJS的操作符来控制任务的执行顺序，例如使用concatMap操作符可以保证任务按照添加的顺序依次执行。
import { concatMap } from 'rxjs/operators';
// concatMap 等价于将并发（concurrency）参数设置为 1 的 mergeMap。
queue.pipe(
  concatMap(task => {
    // 处理任务的逻辑
    return result;
  })
).subscribe();
```
