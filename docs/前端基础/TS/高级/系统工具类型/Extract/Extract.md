# Extract

根据源码我们推断出 Extract 的作用是**提取出 T 包含在 U 中的元素**, 换种更加贴近语义的说法就是从 T 中提取出 U

源码如下

```typescript 
type Extract<T, U> = T extends U ? T : never;
type T = Extract<1 | 2, 1 | 3> // -> 1   和 exclude 相反
```
