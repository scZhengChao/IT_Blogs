# 使用 Tap 操作符

主要是因为这个是某个领域特定的写法，所以需要遵循这个领域特定的调试方法，在 RxJS 这个领域下，有一个名为 `tap`的操作符 \*\*，它的引入不会对后续的****`Stream`**** 产生影响，所以用它来进行 ****`Debug`**** 操作已经成为 ****`RxJS`****届的共识 \*\*，看一个例子：

```javascript 
import { interval, tap } from 'rxjs';

const example = interval(1000)
                  .tap(x => console.log(`tap log: ${x}`)
                  .map(x => x + 1)
                  .subscribe(x => {
                    console.log(`subscription log: ${x}`);
                  });

// tap log: 0 
// subscription log: 1
// tap log: 1
// subscription log: 2

```
