# 数组最后一位

## 目录

- [slice/length/pop](#slicelengthpop)
- [结构成对象](#结构成对象)

### slice/length/pop

```typescript 
const arrayTest = ["第一个元素", "第二个元素", "最后一个元素"];

console.time("==> length");
const length = arrayTest.length;
let lastValue = arrayTest[length - 1];
console.log(lastValue);
console.timeEnd("==> length");

console.time("====> slice");
let [lastValue1] = arrayTest.slice(-1);
console.log(lastValue1);
console.timeEnd("====> slice");

console.time("======> pop");
let lastValue2 = arrayTest.pop();
console.log(lastValue2);
console.timeEnd("======> pop");



arrayTest.at(-1)


最后一个元素
==> length: 6.38ms
最后一个元素
====> slice: 0.038ms
最后一个元素
======> pop: 0.033ms

```


### 结构成对象

```javascript 
const arr = [1, 2, 3];
const { 0: first, length, [length - 1]: last } = arr;
console.log(first,length,last) ; // 1 3 3  把数组结构成对象
```
