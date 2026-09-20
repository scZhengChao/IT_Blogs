# void 主体

有时，发出值这件事本身比所发出的值更重要。

例如，下面的代码表示已经过了一秒钟。

```javascript 
const subject = new Subject<string>();
setTimeout(() => subject.next('dummy'), 1000);
```


以这种方式传递一个虚拟值很笨拙，并且可能会使用户感到困惑。

通过声明一个 *`void`*\* 主体\*，你可以表明该值是无所谓的。只有事件本身才重要。

```typescript 
const subject = new Subject<void>();
setTimeout(() => subject.next(), 1000);
```


带有上下文的完整示例如下所示：

```javascript 
import { Subject } from 'rxjs';

const subject = new Subject(); // Shorthand for Subject<void>

subject.subscribe({
  next: () => console.log('One second has passed'),
});

setTimeout(() => subject.next(), 1000);
```
