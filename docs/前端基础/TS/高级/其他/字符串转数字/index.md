# 字符串转数字

使用场景：字符串的逐个解析有递归特性，我们可以转成字符串后做一些这方面的处理，处理完后还需要转回去

```typescript 
type ToNumber<T> = T extends `${infer N extends number}`
  ? N
  : T

```
