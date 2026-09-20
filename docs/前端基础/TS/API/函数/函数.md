# 函数

## 目录

- [ 泛型表达式：](#-泛型表达式)
- [泛型接口](#泛型接口)
- [不确定入参个数](#不确定入参个数)
- [给函数挂载属性](#给函数挂载属性)

&#x20; 一个函数有输入和输出，进行约束，需要把输入和输出都考虑到

```typescript 
function sum(x: number, y: number): number {}
```


注意：输入多余的（或者少于要求的）参数，是不被允许的

函数的类型声明格式很多样，记**住是在 () 后面添加返回值类型即可。**

## &#x20;泛型表达式：

```typescript 
function aa<T> (a:T) { return a }
const foo1 = <T, >(x: T): T => x
const foo2: <T>(x: T) => T = x => x
const foo3 = <T extends {name:'666'}>(x: T): T => x 

// <>里面传入类型
function getArr<T>(val: T, count: number): Array<T> {
    const arr: Array<T> = []; // 也可以这样定义 const arr: T[] = [];
    for(let i = 0; i < count; i++) {
        arr.push(val)
    }
    return arr
}

console.log(getArr<string>('温情key', 5));  // [ '温情key', '温情key', '温情key', '温情key', '温情key' ]
// 也可以省略调用时的类型，TS会帮我推断出这个参数的类型
console.log(getArr(true, 3));  // [ true, true, true ]


```


```typescript 
let mySum = function (x: number, y: number): number {}
//变量:输入类型=>输出类型=function(参数){}
 let mySum: (x: number, y: number) => number  =  function (x: number, y: number): number {}
function buildName(a: string = 'Liu', b?: string) {}
 // 可选参数:  注意：可选参数在后 
 // 参数默认值lastName: string = ‘Liu'

```


&#x20;        &#x20;

# 泛型接口

```typescript 
// 
export interface RefProps {
  reSetPage?: <T,>(extra?: T) => void
}

useImperativeHandle(ref, () => ({
  reSetPage: <T,>(extra?: T) => {
    setCurrentPage(1);
    onRefresh(1, pageSize, orderParams,extra);
  },
}));

//
interface SearchFunc {
  (a: string, b: number): boolean;
}
let c: SearchFunc=function() {return true}
c('qq',11)



// 
interface Search {
    <T, K>(val1: T, val2: K): K
}

const searchHandle: Search = <T, K>(id: T, name: K): K => {
    console.log('id' + id + ';' + '名称' + name);
    return name
}

searchHandle<number, string>(123, '温情key');  // id123;名称温情key


```


# 不确定入参个数

```javascript 

//入参任意个数任意值：
(…params:any[])=>any

```


# 给函数挂载属性

```typescript 
interface FuncWithAttachment {
    (param: string): boolean;
    someProperty: number;
}
const testFunc: FuncWithAttachment = ...;

const result = testFunc('mike');    // 有类型提醒
testFunc.someProperty = 3;    // 有类型提醒
```
