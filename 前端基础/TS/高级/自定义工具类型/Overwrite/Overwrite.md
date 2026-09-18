# Overwrite

Overwrite **\<T, U>从 U 中的同名属性的类型覆盖 T 中的同名属性类型**。(**后者中的同名属性覆盖前者**)

```typescript 
/**
 * Overwrite实现
 * 获取前者独有的key和类型，再取两者共有的key和该key在后者中的类型，最后合并。
 */
// 从T中提取存在于U中的key和对应的类型
type Intersection<T extends object, U extends object> = Pick<T,
  Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>
// 从T中排除存在于U中的key和类型
type Diff<T extends object, U extends object> = Pick<
  T,
  Exclude<keyof T, keyof U>
>;
type Overwrite<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T>
> = Pick<I, keyof I>;
/**
 * @example
 * type Eg = { key1: string; other: boolean }
 */
type Eg = Overwrite<{key1: number, other: boolean}, {key1: string}>

```
