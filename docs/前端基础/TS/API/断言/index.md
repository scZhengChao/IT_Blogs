# 断言

## 目录

- [类型断言:](#类型断言)
  - [断言的限制 ](#断言的限制-)
  - [双重断言 ](#双重断言-)
  - [类型断言 as](#类型断言-as)
  - [非空断言操作符 !](#非空断言操作符-)

# 类型断言:

绕过编译器的类型推断，手动指定一个值的类型

- <类型>值   (\<string>something).length
- 值 as 类型 (something as string).length

           注意：类型断言不是类型转换    

           在 tsx 语法（React 的 jsx 语法的 ts 版）中必须使用后者，即 值 as 类型。

    用途：

- 将一个联合类型断言为其中一个类型

```javascript 
 interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}
function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true;
  }
  return false;
}
```


    需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误：

- 将一个父类断言为更加具体的子类

```javascript 
 class ApiError extends Error {
  code: number = 0;
}
class HttpError extends Error {
  statusCode: number = 200;    
}

function isApiError(error: Error) {
  if (typeof (error as ApiError).code === 'number') {
    return true;
  }
  return false;
}
```


- 将任何一个类型断言为 any

```javascript 
 //但有的时候，我们非常确定这段代码不会出错，比如下面这个例子
window.foo = 1;
(window as any).foo = 1;
//它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any
```


        将 any 断言为一个具体的类型

            在日常的开发中，我们不可避免的需要处理 any 类型的变量，它们可能是由于第三方库未能定义好自己的类型，也有可能是历史遗留的或其他人编写的烂代码，还可能是受到 TypeScript 类型系统的限制而无法精确定义类型的场景。

            遇到 any 类型的变量时，我们可以选择无视它，任由它滋生更多的 any。

            我们也可以选择改进它，通过类型断言及时的把 any 断言为精确的类型，亡羊补牢，使我们的代码向着高可维护性的目标发展。

```javascript 
 function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;        
  run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```


## 断言的限制&#x20;

**类型断言通常用在：缩小类型范围**

- 如果 A 类型兼容 B 类型，那么 A、B 可以相互断言&#x20;
- 顶层类型（any / unknown）可以和任意类型相互断言&#x20;
- 联合类型可以和任意子集相互断言&#x20;

```javascript 
 let foo: number;                foo as any;                     // ok, 顶层类型
let foo: any;               foo as number;                  // ok, 顶层类型
let foo: number | string;   foo as number;                  // ok, 联合类型
interface Parent { p: string }
interface Child extends Parent { c: number }
let foo: Parent;                foo as Child;                   // ok, 兼容
let foo = [1, 'a'];         foo as [number, number];        // ok, 联合类型

let foo: number;                foo as string;                  // 不 ok, 指鹿为马
interface Parent { p: string }
interface Child { c: number }
let foo: Parent;                foo as Child;                   // 不 ok, 不兼容            
```


## 双重断言&#x20;

这就是断言的风险，我先把类型断言为一个宽松的中间类型，又断言到一个本来不可以直接断言到的类型，仍然可以达到“指鹿为马”的效果。

```javascript 
 let foo = 1;    foo as string;                          // 不 ok，类型 "number" 到类型 "string" 的转换可能是错误的，如果这是有意的，请先将表达式转换为 "unknown”。
let foo = 1;    foo as number | string as string;       // ok, 联合类型成了中间类型
```


但在上面第一句的报错中，TS 也提到“如果这是有意的，请先将表达式转换为 "unknown””。可见TS对这个风险是充分知晓的，甚至是如 any 一样有意留的“后门”，而在双重断言中，作为「中间类型」的更常见也更方便的是 any 和 unknown。但不论怎样，我们应尽量减少双重断言的使用。&#x20;

## 类型断言 as

编译器就听你的。但运行时，后果自负。有风险

```javascript 
 function fn(a: string | null): void {
    const length = (a as string).length
    console.log(length)
}
fn('abc') // Ok
// fn(null) // Error js 运行报错
```


> 在我断定了这个类型就是 xxx 类型的时候就能用 `as` 关键字（当然不推荐使用），尽可能还是用 TS 的类型推导

在 TS 的类型定义的时候，as 又有别的含义

比如说这个

```javascript 
const teslaConst = ['tesla', 'model 3', 'model X', 'model Y'] as const
// const teslaConst: readonly ["tesla", "model 3", "model X", "model Y"]

// 用var变量和const推导是一样的，不过会留下代码隐患，不推荐
var teslaConst2 = ['tesla', 'model 3', 'model X', 'model Y'] as const
// var teslaConst: readonly ["tesla", "model 3", "model X", "model Y"]

const tesla = ['tesla', 'model 3', 'model X', 'model Y']
// const tesla: string[]

```


区别很明显，**as const 的会把所有的值拿出来，而且变成 readonly。** 因为 const 确实是只读的标记。

> 不过 TS 不吃 js 变量类型那一套，所以还得通过 `as const` 来告诉 TS，我断言这个就是一个 const 数组了，里面的元素都不会改了，你可以遍历这里面的值

**没用 as const 的只会认为是个 string\[]的数组**。这是一个很大的区别

## 非空断言操作符 !

! 用于排除 null undefined\*\* ，即告诉编译器：xx 变量肯定不是 null 或 undefined ，和?.相反; \*\*

同理，运行时有可能出错。&#x20;

```javascript 
// 例子 1
function fn(a: string | null | undefined) {
    let s: string = ''
    s = a // Error 语法检查失败
    s =  a! // OK —— 【注意】如果 a 真的是 null 或者 undefined ，那么 s 也会是 null 或者 undefined ，可能会带来 bug ！！！ 
}
// fn(null)
    
// 例子 2
type NumGenerator = () => number;
function myFunc(numGenerator: NumGenerator | undefined) {
  const num1 = numGenerator(); // Error 语法检查失败
  const num2 =  numGenerator!(); // OK 
}
// myFunc(undefined) // 【注意】，如果真的传入 undefined ，也会去执行，当然会执行报错！！！
// 例子 3
let a: number
console.log(a) // Error - Variable 'n' is used before being assigned.
let b!: number
console.log(b) // OK - `!` 表示，你会给 b 一个赋值，不用编译器关心
```
