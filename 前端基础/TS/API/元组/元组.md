# 元组

## 目录

- [数组是对象的一种](#数组是对象的一种)

变量:类型\[]:

- let arr: number\[] = \[1, 1, 2, 3, 5];
- let arr: any\[] = \[1, 1, 2, 3, 5];
- Array\<elemType>
  - let arr: Array\<number> = \[1, 1, 2, 3, 5];

        推荐：类型\[ ] 这种方式；不然在tsx里有兼容问题

# 数组是对象的一种

```typescript 
// Ts 示例：希望 [1, () => number, string] 能够被处理成 [1, number, string]
// 对象遍历的方式
type GetType1<T extends any[]> = {
  [K in keyof T]: T[K] extends () => infer R ? R : T[K]
}
type GetType1Test = GetType1<[1, () => number, string]>;


```


**数组是 key 为 0，1，2 等数字索引的特殊对象，都可以用映射类型的 in 遍历**
