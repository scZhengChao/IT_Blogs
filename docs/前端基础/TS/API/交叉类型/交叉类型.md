# 交叉类型

交叉类型取的多个类型的并集，但是如果**相同key但是类型不同，则该key为never**。

```typescript 
interface Eg1 {
  name: string,
  age: number,
}
​
interface Eg2 {
  color: string,
  age: string,
}
​
/**
 * T的类型为 {name: string; age: never; color: string}
 * 注意，age因为Eg1和Eg2中的类型不一致，所以 交叉后age的类型是never 
 */
type T = Eg1 & Eg2
```


**注意：相同属性的交叉类型 为never**
