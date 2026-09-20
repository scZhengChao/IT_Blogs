# 联合类型变交叉类型

`并集转交集`

利用**函数入参的逆变特性**，把输入类型构建成函数参数

```typescript 
type UnionToIntersection<U> = 
  (U extends any 
   ? (arg: U) => any 
   : never
  ) extends ((arg: infer I) => any) 
  ? I 
  : never
  
type TestUnion2Intersection = UnionToIntersection<{a: 1} | {b: 2} | {c: 3}> 

// expected to be {a: 1} & {b: 2} & {c: 3}

```
