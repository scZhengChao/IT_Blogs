# pipe

`pipe`与`compose`完全一样，但它是从左到右执行，并且可以接受多个函数作为参数。

```typescript 
const pipe =
  (...fns) =>
  (accValue) =>
    fns.reduce(
      (currentValue, currentFunction) => currentFunction(currentValue),
      accValue
    );

```
