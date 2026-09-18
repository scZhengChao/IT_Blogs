# OptionalKeys

`OptionalKeys<T>`提取T中所有可选类型的key组成的联合类型

```typescript 
type OptionalKeys<T> = {
  [P in keyof T]: {} extends Pick<T, P> ? P : never
}[keyof T];
 
type Eg = OptionalKeys<{key1?: string, key2: number}>
```


- 核心实现，用映射类型遍历所有key，通过`Pick<T, P>`提取当前key和类型。注意，这里也是利用了同态拷贝会拷贝可选修饰符的特性。
- 利用`{} extends {当前key: 类型}`判断是否是可选类型。

```typescript 
// Eg2 = false
type Eg2 = {} extends {key1: string} ? true : false;
// Eg3 = true
type Eg3 = {} extends {key1?: string} ? true : false;
```


利用的就是`{}`和只包含可选参数类型`{key?: string}`是兼容的这一特性。把`extends`前面的`{}`替换成`object`也是可以的。
