# extends

## 目录

- [继承](#继承)
  - [约束](#约束)
- [条件判断](#条件判断)
  - [分发](#分发)
- [联合类型遍历](#联合类型遍历)
  - [联合类型组成笛卡尔积的](#联合类型组成笛卡尔积的)
- [元组的递归](#元组的递归)
- [字符串的递归](#字符串的递归)
- [案例](#案例)
  - [检查动态属性](#检查动态属性)

# 继承

- **用于接口，表示继承**

```typescript 
interface T1 {
  name: string,
}
​
interface T2 {
  sex: number,
}
​
/**
 * @example
 * T3 = {name: string, sex: number, age: number}
 */
interface T3 extends T1, T2 {
  age: number,
}
```


注意，接口支持多重继承，语法为**逗号隔开**。如果是type实现继承，则可以使用交叉类型`type A = B & C & D`。

## 约束

`T extends U`，表示**泛型变量可以通过继承某个类型**，**获得某些属性**，之前讲过，复习一下，

```javascript 
interface ILength {
    length: number
}

function printLength<T extends ILength>(arg: T): T {
    console.log(arg.length)
    return arg
}

//这样入参就一定要有 length 属性，比如 str、arr、obj 都可以， num 就不行。
const str = printLength('lin')
const arr = printLength([1,2,3])
const obj = printLength({ length: 10 })

const num = printLength(10) // 报错，Argument of type 'number' is not assignable to parameter of type 'ILength'



```


# 条件判断

- **表示条件类型，可用于条件判断**

表示条件判断，如果前面的条件满足，则返回问号后的第一个参数，否则第二个。类似于js的三元运算。

```typescript 
/**
 * @example
 * type A1 = 1
 */
type A1 = 'x' extends 'x' ? 1 : 2;
​
/**
 * @example
 * type A2 = 2
 */
type A2 = 'x' | 'y' extends 'x' ? 1 : 2;
​
/**
 * @example
 * type A3 = 1 | 2
 */
type P<T> = T extends 'x' ? 1 : 2;
type A3 = P<'x' | 'y'>
```


### 分发

提问：为什么`A2`和`A3`的值不一样？

- 如果用于简单的条件判断，则是直接**判断前面的类型是否可分配给后面的类型**
- 若`extends`**前面的类型是泛型**，且泛型**传入**的是**联合类型**时，则会**依次判断**该联合类型的所有子类型是否可分配给extends后面的类型（是一个**分发的过程**也就是遍历）。

**总结，就是**\*\*`extends`****前面的参数为****联合类型时则会分解（依次遍历所有的子类型进行条件判断）联合类型进行判断。然后将最终的结果组成新的联合类型。\*\*

- **阻止**extends关键词对于联合类型的**分发特性**

如果不想被分解（分发），做法也很简单，可以通过**简单的元组类型包裹以下**（就是将联合类型转为元组进行比较）：

```typescript 
type P<T> = [T] extends ['x'] ? 1 : 2;
/**
 * type A4 = 2;
 */
type A4 = P<'x' | 'y'>
```


# 联合类型遍历

类似结构的联合类型可以直接通过 extends 条件语句遍历到

```typescript 
interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}
interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}
type LookUp<T, K extends string> = T extends { type: K } ? T : never;
 type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
```


## **联合类型组成笛卡尔积的**

这个特性可以做些变态的事了，譬如把**联合类型组成笛卡尔积的**数组，

- 直接看：[https://github.com/type-challenges/type-challenges/issues/614](https://github.com/type-challenges/type-challenges/issues/614 "https://github.com/type-challenges/type-challenges/issues/614")

```typescript 
type Permutation<T, K=T> =
    [T] extends [never]
      ? []
      : K extends K
        ? [K, ...Permutation<Exclude<T, K>>]
        : never 
        
type perm = Permutation<'A' | 'B' | 'C'>; 

// ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
```


# 元组的递归

元组的遍历，借助**元组解构逐个处理逻辑**，再把剩下的元组**迭代调用**当前的类型分析器

```typescript 
type PromiseParseAll<T extends any[]> = T extends [infer P, ...infer O]
  ? P extends Promise<infer R> ? [R, ...PromiseParseAll<O>] : [P, ...PromiseParseAll<O>]
  : [] 
 type PromiseAll<T extends any[]> = Promise<PromiseParseAll<T>> 

// expected to be `Promise<[number, 42, string]>`
type PRes = PromiseAll<[Promise<number>, 42, Promise<string>]>;
```


# 字符串的递归

字符串类似

```typescript 
type TrimLeft<T extends string> = T extends `${infer L}${infer R}`
? L extends " "|"\n"|"\t" ? TrimLeft<R> : T
: never 

type trimed = TrimLeft<'  Hello World '> // 应推导出 'Hello World '
```


# 案例

## 检查动态属性

对索引类型的几个概念了解后,对 getValue 函数进行改造，实现对象上动态属性的检查。

```javascript 
// 改造前
const userInfo = {
  name: 'lin',
  age: '18',
}

function getValues(userInfo: any, keys: string[]) {
  return keys.map(key => userInfo[key])
}

```


- 定义泛型 T、K，用于约束 userInfo 和 keys
- **为 K 增加一个泛型约束,使 K 继承 userInfo 的所有属性的联合类型**, 即`K extends keyof T`

```javascript 
function getValues<T, K extends keyof T>(userInfo: T, keys: K[]): T[K][] {
    return keys.map(key => userInfo[key])
}

```
