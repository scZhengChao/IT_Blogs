# FunctionKeys

获取`T`中所有类型为函数的`key`组成的联合类型。

```typescript 
/**
 * @desc NonUndefined判断T是否为undefined
 */
type NonUndefined<T> = T extends undefined ? never : T;
 
/**
 * @desc 核心实现
 */
type FunctionKeys<T extends object> = {
  [K in keyof T]: NonUndefined<T[K]> extends Function ? K : never;
}[keyof T];
 
/**
 * @example
 * type Eg = 'key2' | 'key3';
 */
type AType = {
    key1: string,
    key2: () => void,
    key3: Function,
};
type Eg = FunctionKeys<AType>
```


- 首先约束参数T类型为`object`
- 通过映射类型`K in keyof T`遍历所有的key，先通过`NonUndefined<T[K]>`过滤`T[K]`为`undefined | null`的类型，不符合的返回never
- `null`和`undefined`可以赋值给其他类型（开始该类型的严格赋值检测除外）,所以上述实现中需要使用`NonUndefined`先行判断。
- 若`T[K]`为有效类型，则判断是否为`Function`类型，是的话返回`K`,否则`never`；此时可以得到的类型
- `T[]`是索引访问操作，可以取到值的类型
- `T['a' | 'b']`若`[]`内参数是联合类型，则也是分发索引的特性，依次取到值的类型进行联合
- `T[keyof T]`则是获取`T`所有值的类型类型；
- `never`和其他类型进行联合时，`never`是不存在的。例如：`never | number | string`等同于`number | string`
