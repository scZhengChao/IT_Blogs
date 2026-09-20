# Omit&#x20;

用之前的 Pick 和 Exclude 进行组合, 实现**忽略对象某些属性功能,** 源码如下

```typescript 
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
// 使用
type Foo = Omit<{name: string, age: number}, 'name'> // -> { age: number }
```
