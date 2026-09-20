# koa-compose 洋葱模型

## 目录

- [场景](#场景)
- [koa-compose实现](#koa-compose实现)

## 场景

面试官让你实现一个场景：有一件衣服单价50元，买了num件，总和打了8折，然后运费是12元，算出买这num件衣服加上运费算上折扣需要多少钱？

首先需要实现三个函数

```typescript 
const express = (total) => {
  return total + 12;
};

const discount = (total) => {
  return total * 0.8;
};

const TShirtNum = (num) => {
  return 50 * num;
};
```


`TShirtNum`代表num件衣服需要的费用，`discount`表示打了8折之后的费用，`express`表示算上运费的费用。

现在要求实现一个`compose`函数，然后调用这个函数，并把上面三个函数传入`compose`函数中，最后计算出结果。比如

```typescript 
const sellTshirt = compose([TShirtNum, discount, express]);
sellTshirt(100)
```


`sellTshirt(100)`会计算出最后的结果。如果要计算出最后的结果，就需要将TShirtNum计算出的结果传给discount，然后discount计算出的结果传给express。
此时我们可以使用`reduce`实现。MDN介绍reduce为：`reduce`()  方法对数组中的每个元素按序执行一个由您提供的 `reducer `函数，每一次运行 reducer **会将先前元素的计算结果作为参数传**入，最后将其结果汇总为单个返回值。
第一次执行回调函数时，不存在“上一次的计算结果”。**如果需要回调函数从数组索引为 0 的元素开始执行，则需要传递初始值。否则，数组索引为 0 的元素将被作为初始值 initialValue，** 迭代器将从第二个元素开始执行（索引为 1 而不是 0）。
很显然compose需要返回一个函数

```typescript 
const compose = (funcArr) => (startNum) => funcArr.reduce((pre, cur) => cur(pre), startNum) 
```


一行代码解决。`startNum`表示我们需要购买的数量，当做`reduce`的初始值，然后将上一次计算的结果传给下一个函数，相当于是`TShirtNum`计算的结果传给`discount`, 也就是我们代码中实现的`cur(pre)`。最后即可计算出结果。`redux`源码就是这样实现的😄

## koa-compose实现

现在面试官将这三个方法改造了一下。

```typescript 
const express = (total, next) => {
  console.log("starting, express"); // 3
  next(total + 12);
  console.log("ending, express"); // 4
};

const discount = (total, next) => {
  console.log("starting, discount"); // 2
  next(total * 0.8); 
  console.log("ending, discount"); // 5
};

const TShirtNum = (num, next) => {
  console.log("starting, TShirtNum"); // 1
  next(15 * num); 
  console.log("ending, TShirtNum"); // 6
};
```


要求按照顺序打印结果。同时会看到每个函数中都多了一个`next`方法。仔细观察你会发现，`next`其实就是调用下一个方法。我们用一个图来表示：

> **著名的洋葱圈**

![](./assets/image/image_wxe_z1FMpF.png)

```typescript 
function compose(arr) {
  let result;
  return function (ctx) {
    let dispatch = function (i, ctx) {
      let fn;
      if (i < arr.length) {
        fn = arr[i];
      }
      if (i === arr.length) {
        result = ctx;
        return;
      }
      return fn(ctx, dispatch.bind(null, ++i));
    };

    dispatch(0, ctx);
    return result;
  };
}

const sellTshirt = compose([TShirtNum, discount, express]);

console.log(sellTshirt(100));
```


由于最后执行的是`sellTshirt(100)`,所以需要返回一个函数。在这个函数内部定义一个`dispatch`方法，然后首次执行传入一个`i`为0，代表`arr`中的第一个函数，执行这个函数。在执行这个函数的时候需要多传入一个参数作为`next`, 而这个参数就是`dispatch`，传入的时候，`i`递增，代表arr中可以取下一个函数了。当执行`next`的时候其实就是执行`dispatch`。最后执行的结果为：

![](./assets/image/image_jiw8b-4xpu.png)
