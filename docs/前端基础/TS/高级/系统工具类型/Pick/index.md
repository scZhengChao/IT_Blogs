# Pick

从 T 中取出 一系列 K 的属性

```typescript 
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
```
