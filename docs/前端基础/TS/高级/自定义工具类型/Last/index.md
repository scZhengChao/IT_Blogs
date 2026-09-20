# Last

实现一个通用Last\<T>，它接受一个数组T并返回其最后一个元素的类型。

**数组可以直接用类似 js 的\[infer start, ...infer M, infer end] 来获得一个数组的第一个和最后一个值。**

```typescript 
// 15 实现一个通用Last<T>，它接受一个数组T并返回其最后一个元素的类型。
type Last<T extends any[]> = T extends [...infer B, infer P] ? P : never;
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]
type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1

```
