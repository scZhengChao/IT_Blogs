# 每次单击增加当前鼠标 x

## 目录

- [Values(值)](#Values值)

### Values(值)

你可以通过你的 observables **传来的值进行转换。**

以下是使用纯 JavaScript 来为每次**单击增加当前鼠标 x 位置的方法：**

```typescript 
let count = 0;
const rate = 1000;
let lastClick = Date.now() - rate;
document.addEventListener('click', (event) => {
  if (Date.now() - lastClick >= rate) {
    count += event.clientX;
    console.log(count);
    lastClick = Date.now();
  }
});
```


使用 RxJS：

```typescript 
import { fromEvent, throttleTime, map, scan } from 'rxjs';

fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    map((event) => event.clientX),
    scan((count, clientX) => count + clientX, 0)
  )
  .subscribe((count) => console.log(count));
```


**其它能产生值的操作符**有 [**pluck**](https://rxjs.tech/api/operators/pluck "pluck")、[**pairwise**](https://rxjs.tech/api/operators/pairwise "pairwise")、[**sample**](https://rxjs.tech/api/operators/sample "sample") 等。
