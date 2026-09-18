# Readonly

将传入的属性变为只读选项, 源码如下

```typescript 
type Readonly<T> = { readonly [P in keyof T]: T[P] };
```
