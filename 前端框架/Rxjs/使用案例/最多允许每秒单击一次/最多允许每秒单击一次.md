# 最多允许每秒单击一次

## 目录

- [Flow(流动)](#Flow流动)

### Flow(流动)

RxJS 有一系列的操作符，可以帮助你**控制事件如何在你的 observables 中流动。**

下面是使用纯 JavaScript 实现“最多允许每秒单击一次”的方式：

```typescript 
let count = 0;
let rate = 1000;
let lastClick = Date.now() - rate;
document.addEventListener('click', () => {
  if (Date.now() - lastClick >= rate) {
    console.log(`Clicked ${++count} times`);
    lastClick = Date.now();
  }
});
```


使用 RxJS：

```typescript 
import { fromEvent, throttleTime, scan } from 'rxjs';

fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    scan((count) => count + 1, 0)
  )
  .subscribe((count) => console.log(`Clicked ${count} times`));
```


**其它流动控制操作符**有 [**filter**](https://rxjs.tech/api/operators/filter "filter")、[**delay**](https://rxjs.tech/api/operators/delay "delay")、[**debounceTime**](https://rxjs.tech/api/operators/debounceTime "debounceTime")、[**take**](https://rxjs.tech/api/operators/take "take")、[**takeUntil**](https://rxjs.tech/api/operators/takeUntil "takeUntil")、[**distinct**](https://rxjs.tech/api/operators/distinct "distinct")、[**distinctUntilChanged**](https://rxjs.tech/api/operators/distinctUntilChanged "distinctUntilChanged") 等。
