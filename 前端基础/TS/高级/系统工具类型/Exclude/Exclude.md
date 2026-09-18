# Exclude

T extends U ? X : Y

以上语句的意思就是 如果 T 是 U 的子类型的话，那么就会返回 X，否则返回 Y

```typescript 
type Exclude<T, U> = T extends U ? never : T;
结合实例
type T = Exclude<1 | 2, 1 | 3> // -> 2   排除子类型
```
