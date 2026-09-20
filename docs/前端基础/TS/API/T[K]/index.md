# T\[K]

## 目录

- [联合类型](#联合类型)
- [案例](#案例)
  - [FunctionKeys](#FunctionKeys)
  - [OptionalKeys](#OptionalKeys)

`T[K]`，表示**接口 T 的属性 K 所代表的类型**，

```javascript 
interface IPerson {
  name: string;
  age: number;
}

let type1:  IPerson['name'] // string
let type2:  IPerson['age']  // number

```


# 联合类型

```typescript 
interface Eg1 {
  name: string,
  readonly age: number,
}
// string
type V1 = Eg1['name']

// string | number
type V2 = Eg1['name' | 'age']

// any
type V2 = Eg1['name' | 'age2222']

// string | number
type V3 = Eg1[keyof Eg1]
```


- 如果 \[] 中的 key **有不存在 T 中的，则是 any；**且也**会报错**；
- 如果**值为never 的；则不会存在联合类型中**
- 交叉类型取的多个类型的并集，
- 但是如**果相同 key 但是类型不同，则该 key 为 never。**
-

`T[keyof T]`的方式，可以获取到`T`**所有**\*\*`key`\*\***的类型组成的联合类型**；&#x20;

# 案例

### FunctionKeys

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
type Eg = FunctionKeys<AType>;
```


- 首先约束参数T类型为`object`
- 通过映射类型`K in keyof T`遍历所有的key，先通过`NonUndefined<T[K]>`过滤`T[K]`为`undefined | null`的类型，不符合的返回never
- `null`和`undefined`可以赋值给其他类型（开始该类型的严格赋值检测除外）,所以上述实现中需要使用`NonUndefined`先行判断。
- 若`T[K]`为有效类型，则判断是否为`Function`类型，是的话返回`K`,否则`never`；此时可以得到的类型
- `T[]`是索引访问操作，可以取到值的类型
- `T['a' | 'b']`若`[]`内参数是联合类型，则也是分发索引的特性，依次取到值的类型进行联合
- `T[keyof T]`则是获取`T`所有值的类型类型；
- **`never`****和其他类型进行联合时，****`never`****是不存在的。例如：****`never | number | string`****等同于****`number | string`**

### OptionalKeys

`OptionalKeys<T>`提取T中所有可选类型的key组成的联合类型

```typescript 
type OptionalKeys<T> = {
  [P in keyof T]: {} extends Pick<T, P> ? P : never
}[keyof T];

type Eg = OptionalKeys<{key1?: string, key2: number}>
```


- 核心实现，用映射类型遍历所有key，通过`Pick<T, P>`提取当前key和类型。注意，这里也是利用了**同态拷贝会拷贝可选修饰符的特性**。
- 利用`{} extends {当前key: 类型}`**判断是否是可选类型**。

```typescript 
// Eg2 = false
type Eg2 = {} extends {key1: string} ? true : false;
// Eg3 = true
type Eg3 = {} extends {key1?: string} ? true : false;
```


利用的就是`{}`和**只包含可选参数类型**`{key?: string}`**是兼容的这一特性**。把`extends`前面的`{}`替换成`object`也是可以的。
