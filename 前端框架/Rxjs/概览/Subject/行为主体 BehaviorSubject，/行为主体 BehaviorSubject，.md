# 行为主体 BehaviorSubject，

`Subjects` 的变体之一是 `[BehaviorSubject]`，它具有“**当前值**”的概念。它**存储发送给其消费者的最新值**，并且每当有新的 Observer 订阅时，它将立即从 `[BehaviorSubject]` 接收到“当前值”。

> BehaviorSubjects 对于表示“随时间变化的值”很有用。例如，生日事件流是一个主体，但一个人的年龄流是一个行为主体。

在下面的示例中，BehaviorSubject 使用第一个 Observer 在订阅时收到的值 `0` 进行初始化。第二个 Observer 接收到值 `2`，即使它是在发送值 `2` 之后订阅的。

```javascript 
import { BehaviorSubject } from 'rxjs';
const subject = new BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(3);

// Logs
// observerA: 0
// observerA: 1
// observerA: 2
 // observerB: 2
 // observerA: 3
// observerB: 3
```
