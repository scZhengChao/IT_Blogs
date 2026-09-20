# Equal

判断两个类型相等

大多数非严格情况下的相等使用 `A extends B`基本可以做到，譬如前一步的类型中间方法根据条件返回了 true 或 false，接下来要判断结果是否是 true，直接用 `T extends true ? xxx : xxx`进行接下来的操作就好。

但是枚举类型下，extends 无法很好的区分是否可选，是否只读的区别。

```typescript 
type a = {a: string} extends {readonly a: string} ? true : false; // true
type b = {readonly a: string} extends {a: string} ? true : false; // true
type c = {a: string} extends {a?: string} ? true : false; // true
type d = {a?: string} extends {a: string} ? true : false; // false

```


所以严格的相等要借助函数的协变，具体的逻辑我也没 get 到。。。

```typescript 
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

```
