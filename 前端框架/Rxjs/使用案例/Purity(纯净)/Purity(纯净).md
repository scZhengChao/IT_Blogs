# Purity(纯净)

RxJS 的强大之处在于它能够使**用纯函数生成值。** 这意味着你的代码不太容易出错。

通常你会创建一个不纯的函数，你的代码的其它部分可能会弄乱你的状态。

```typescript 
let count = 0;
document.addEventListener('click', () => console.log(`Clicked ${++count} times`));
```


使用 RxJS 可以隔离状态。

```typescript 
import { fromEvent, scan } from 'rxjs';

fromEvent(document, 'click')
  .pipe(scan((count) => count + 1, 0))
  .subscribe((count) => console.log(`Clicked ${count} times`));
```


**scan** 操作符的工作方式与数组的 **reduce** 类似。它接受一个要传给回调的值。回调的返回值将成为**下一次回调运行时传入的下一个值。**
