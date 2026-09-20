# Record

将 K 中所有的属性的**值转化为 T 类型**

```typescript 
type Record<K extends keyof any, T> = { [P in K]: T };
```
