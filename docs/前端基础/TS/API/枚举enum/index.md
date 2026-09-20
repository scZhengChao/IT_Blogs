# 枚举enum

## 目录

- [enum](#enum)
- [反向映射的原理](#反向映射的原理)
  - [手动赋值](#手动赋值)
  - [计算成员](#计算成员)
- [字符串枚举](#字符串枚举)
- [常量枚举](#常量枚举)
- [获取枚举的key](#获取枚举的key)
- [获取枚举的value](#获取枚举的value)
- [枚举类型 key 的重新映射和过滤](#枚举类型-key-的重新映射和过滤)
- [枚举可能性组合 - 联合类型](#枚举可能性组合---联合类型)

enum 在 TS 中出现的比较早，它引入了 **JavaScript 没有的数据结构（编译成一个双向map）**;入侵了运行时，与 TypeScript 宗旨不符。用 string literal union（'small' | 'big' | 'large'）可以做到相同的事，且在 debug 时可读性更好。如果很在意**条件比较的性能，应该用二进制 flag 加位运算。**

```typescript 
// TypeScript
enum Size {
    small = 3,
    big,
    large
}
const a:Size = Size.large;    // 5
// 编译为
var Size;
(function (Size) {
    Size[Size["small"] = 3] = "small";
    Size[Size["big"] = 4] = "big";
    Size[Size["large"] = 5] = "large";
})(Size || (Size = {}));
const a = Size.large; // 5

```


## enum

```javascript 
 export enum ApplicationTpe {
    SelfApplication,
    Accounts,
    ThirdApplication
}
//当然也可以给各个值手动赋值
export enum ApplicationTpe {
    SelfApplication = 6,
    Accounts = 3,
    ThirdApplication = 2
}
```


在任何项目开发中，我们都会遇到定义常量的情况，常量就是指不会被改变的值。

TS 中我们使用 `const` 来声明常量，但是有些取值是在一定范围内的一系列常量，比如一周有七天，比如方向分为上下左右四个方向。

这时就可以使用枚举（Enum）来定义。

```javascript 
enum Direction {
    Up,
    Down,
    Left,
    Right
}

```


这样就定义了一个**数字枚举**，他有两个特点：

- 数字递增
- 反向映射

```javascript 
//枚举成员会被赋值为从 0 开始递增的数字，
console.log(Direction.Up)        // 0
console.log(Direction.Down)      // 1
console.log(Direction.Left)      // 2
console.log(Direction.Right)     // 3
//枚举会对枚举值到枚举名进行反向映射，
console.log(Direction[0])      // Up
console.log(Direction[1])      // Down
console.log(Direction[2])      // Left
console.log(Direction[3])      // Right
//如果枚举第一个元素赋有初始值，就会从初始值开始递增，
enum Direction {
    Up = 6,
    Down,
    Left,
    Right
}

console.log(Direction.Up)        // 6
console.log(Direction.Down)      // 7
console.log(Direction.Left)      // 8
console.log(Direction.Right)     // 9


```


## 反向映射的原理

```javascript 
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 6] = "Up";
    Direction[Direction["Down"] = 7] = "Down";
    Direction[Direction["Left"] = 8] = "Left";
    Direction[Direction["Right"] = 9] = "Right";
})(Direction || (Direction = {}));

执行 Direction[Direction["Up"] = 6] = "Up";

相当于执行
Direction["Up"] = 6
Direction[6] = "Up"


```


### 手动赋值

```javascript 
enum ItemStatus {
    Buy = 1,
    Send,
    Receive
}

console.log(ItemStatus['Buy'])      // 1
console.log(ItemStatus['Send'])     // 2
console.log(ItemStatus['Receive'])  // 3


enum ItemStatus {
    Buy = 100,
    Send = 20,
    Receive = 1
}

console.log(ItemStatus['Buy'])      // 100
console.log(ItemStatus['Send'])     // 20
console.log(ItemStatus['Receive'])  // 1


```


### 计算成员

枚举中的成员可以被计算，比如经典的使用位运算合并权限，可以这么写，

```javascript 
enum FileAccess {
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
}

console.log(FileAccess.Read)       // 2   -> 010
console.log(FileAccess.Write)      // 4   -> 100
console.log(FileAccess.ReadWrite)  // 6   -> 110
//看个实例吧，Vue3 源码中的 patchFlags，用于标识节点更新的属性。
export const enum PatchFlags {
  TEXT = 1,                    // 动态文本节点
  CLASS = 1 << 1,              // 动态 class
  STYLE = 1 << 2,              // 动态 style
  PROPS = 1 << 3,              // 动态属性
  FULL_PROPS = 1 << 4,         // 具有动态 key 属性，当 key 改变时，需要进行完整的 diff 比较
  HYDRATE_EVENTS = 1 << 5,     // 具有监听事件的节点
  STABLE_FRAGMENT = 1 << 6,    // 子节点顺序不会被改变的 fragment
  KEYED_FRAGMENT = 1 << 7,     // 带有 key 属或部分子节点有 key 的 fragment
  UNKEYED_FRAGMENT = 1 << 8,   // 子节点没有 key 的 fragment
  NEED_PATCH = 1 << 9,         // 非 props 的比较，比如 ref 或指令
  DYNAMIC_SLOTS = 1 << 10,     // 动态插槽
  DEV_ROOT_FRAGMENT = 1 << 11, // 仅供开发时使用，表示将注释放在模板根级别的片段
  HOISTED = -1,                // 静态节点
  BAIL = -2                    // diff 算法要退出优化模式
}


```


## 字符串枚举

字符串枚举的意义在于，提供有具体语义的字符串，可以更容易地理解代码和调试。

```javascript 
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

const value = 'UP'
if (value === Direction.Up) {
    // do something
}
```


## 常量枚举

上文的例子，使用 const 来定义一个常量枚举

```javascript 
//上文的例子，使用 const 来定义一个常量枚举

const enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

const value = 'UP'
if (value === Direction.Up) {
    // do something
}

//编译出来的 JS 代码会简洁很多，提高了性能。
const value = 'UP';
if (value === 'UP' /* Up */) {
    // do something
}
//不写 const 编译出来是这样的，
var Direction;
(function (Direction) {
    Direction["Up"] = "UP";
    Direction["Down"] = "DOWN";
    Direction["Left"] = "LEFT";
    Direction["Right"] = "RIGHT";
})(Direction || (Direction = {}));
const value = 'UP';
if (value === Direction.Up) {
    // do something
}



```


这一堆定义枚举的逻辑会在编译阶段会被删除，常量枚举成员在使用的地方被内联进去。

很显然，常量枚举不允许包含计算成员，不然怎么叫常量呢？

```javascript 
const enum Test {
    A = "lin".length
}

```


# 获取枚举的key

```typescript 
// 获取枚举的 key
type IKey = keyof typeof ENUM_TYPE  // 'ALL' | 'SOME' | 'LITTLE'
```


# 获取枚举的value

```kotlin 
// 获取枚举的 value
type IValue = `${ENUM_TYPE}`  // 'all' | 'some' | 'little'
```


# 枚举类型 key 的重新映射和过滤

《Mapped Types》[https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as")

**可以使用**\*\*`Key in keyof T as XXX`，对枚举类型重新封装生成新类型 \*\*​

**如果 as 后的类型是**\*\*`never`\*\***则会在结果中过滤掉这个类型。**

> Implement RemoveIndexSignature, exclude the index signature from object types.

```typescript 
type TypeLiteralOnly<T> =
  string extends T
  ? never
  : number extends T
    ? never
    : boolean extends T
      ? never
      : symbol extends T
        ? never
        : T;
        
type RemoveIndexSignature<T> = {
  [
    Key in keyof T
    as TypeLiteralOnly<Key>
  ]: T[Key]
};
type FooRemove = {
  [key: string]: any;
  foo(): void;
}
type ARemove = RemoveIndexSignature<FooRemove>  // expected { foo(): void }

```


# 枚举可能性组合 - 联合类型

**联合类型在遍历时能产生枚举的效果：**

```typescript 
// [] | [1] | [3] | [1, 2, 3] | [2, 3] | [1, 2] | [2] | [1, 3]
type Subsequence<T extends any[]> =  T extends [infer Left, ...infer Rest] 
? [Left, ...Subsequence<Rest>] | Subsequence<Rest>  
: T
//  [1, 2, 3]

// type Subsequence<T extends any[]> = T extends [infer Left, ...infer Rest] 
// ? [Left, ...Subsequence<Rest>]
// : T
// []
// type Subsequence<T extends any[]> = T extends [infer Left, ...infer Rest] 
// ? Subsequence<Rest> 
// : T

type TestSubsequence = Subsequence<[1, 2, 3]> 
//[] | [1] | [3] | [1, 2, 3] | [2, 3] | [1, 2] | [2] | [1, 3]
```


这里的巧妙之处就是**构建了一个联合类型**，而其中一项可能是空元组\[]。通过分解我们知道，每一次执行Subsequence\<Rest>的结果可能是\[]也可能是这个元组本身。所以我们会有：

- 每次递归都命中空元组，结果就是`[]`
- 第 1 次递归命中`[Left, ...Subsequence<Rest>]`，这时候元组会有`[1, ...Subsequence<2,3>]`
- 第2轮递归：`Subsequence<2,3>`命中`[Left, ...Subsequence<Rest>]`，结果：`[1, 2, ...Subsequence<3>]`
- 第 3 轮递归，`Subsequence<3>`命中`[Left, ...Subsequence<Rest>]`，经过第四轮获得的`[]`，整体结果`[1,2,3]`
- 第 3 轮递归，`Subsequence<3>`命中`Subsequence<Rest>`，整体结果`[1,2]`
- 第 2 轮递归：`Subsequence<2,3>`命中`[Left, ...Subsequence<Rest>]`，结果：`[1, 2, ...Subsequence<3>]`
- 第 3 轮递归，`Subsequence<3>`命中`[Left, ...Subsequence<Rest>]`，经过第四轮获得的`[]`，整体结果`[1,3]`
- 第3轮递归，`Subsequence<3>`命中`Subsequence<Rest>`，整体结果`[1]`
- 同理，如果第1次递归命中的取值是`Subsequence<Rest>`的类型，则这次递归结果是`[]`，经过后续 2，3，4 轮递归会有
- `[2，3]`
- `[2]`
- 再同理，第一二轮递归都可能命中`Subsequence<Rest>`的类型，递归结果是`[]`，剩下的靠第 3 轮得到：
- `[3]`

这个排列组合确实逻辑比较绕。

可以再看个例子，自个脑补过程巩固下：

```typescript 
type Combination<T extends string[], U = T[number], K = U> = K extends string
    ? K | `${K} ${Combination<[], Exclude<U, K>>}`
    : ''
    
// expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`
type Keys = Combination<['foo', 'bar', 'baz']>
```


[工具函数](./工具函数/index.md "工具函数")
