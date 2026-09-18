# IsUnion

[never](never.md "never")

```typescript 
type IsUnion<T, Copy = T> =
  [T] extends [never]
    ? false
    : T extends never
      ? false
      : [Copy] extends [T]
        ? false
        : true
;
```
