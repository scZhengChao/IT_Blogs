# SetDifference

- 差集
- 返回 T 中有，U中没有的属性，和 Exclude 一致

```typescript 
namespace b {
  type SetDifference<T, U> = T extends U ? never : T;
  type A = string | number | symbol;
  type B = number | boolean;
  type AB = SetDifference<A, B>; // type AB = string | symbol
}

```
