# 泛型

## 目录

- [泛型:](#泛型)
  - [约束泛型](#约束泛型)
  - [默认参数](#默认参数)
  - [函数副作用操作](#函数副作用操作)
  - [泛型的一些应用](#泛型的一些应用)
    - [泛型约束类](#泛型约束类)
    - [泛型约束接口](#泛型约束接口)
    - [泛型定义数组](#泛型定义数组)

ts语言特点： ts 只管编译时，不管运行时。

# 泛型:

在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

[泛型 · TypeScript 入门教程 从 JavaScript 程序员的角度总结思考，循序渐进的理解 TypeScript。 https://ts.xcatliu.com/advanced/generics.html](https://ts.xcatliu.com/advanced/generics.html "泛型 · TypeScript 入门教程 从 JavaScript 程序员的角度总结思考，循序渐进的理解 TypeScript。 https://ts.xcatliu.com/advanced/generics.html")

```javascript 
 function createArray<T>(length: number, value: T): Array<T> {
        let result: T[] = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
}
createArray<string>(3, 'x'); // ['x', 'x', 'x']
      //  上例中，我们在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了。      
```


        接着在调用的时候，可以指定它具体的类型为 string。当然，也可以

不手动指定，而让类型推论自动推算出来：

    createArray(3, 'x'); // \['x', 'x', 'x’]

- 定义泛型的时候，可以一次定义多个类型参数：

```javascript 
 function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```


### 约束泛型

```javascript 
 interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```


## 默认参数

如果要给泛型加默认参数，可以这么写：

```javascript 
interface Iprint<T = number> {
    (arg: T): T
}

function print<T>(arg:T) {
    console.log(arg)
    return arg
}

const myPrint: Iprint = print
复制代码

```


## 函数副作用操作

泛型不仅可以很方便地约束函数的参数类型，还可以用在函数执行副作用操作的时候。

比如我们有一个通用的异步请求方法，想根据不同的 url 请求返回不同类型的数据。

我们希望调用 API 都**清晰的知道返回类型是什么数据结构**，就可以这么做：

```javascript 
interface UserInfo {
    name: string
    age: number
}

function request<T>(url:string): Promise<T> {
    return fetch(url).then(res => res.json())
}

request<UserInfo>('user/info').then(res =>{
    console.log(res)
})

```


## 泛型的一些应用

### 泛型约束类

定义一个栈，有入栈和出栈两个方法，如果想入栈和出栈的元素类型统一，就可以这么写：

```javascript 
class Stack<T> {
    private data: T[] = []
    push(item:T) {
        return this.data.push(item)
    }
    pop():T | undefined {
        return this.data.pop()
    }
}

```


特别注意的是，**泛型无法约束类的静态成员**。 给 pop 方法定义 `static` 关键字，就报错了

### 泛型约束接口

使用泛型，也可以对 interface 进行改造，让 interface 更灵活。

```javascript 
interface IKeyValue<T, U> {
    key: T
    value: U
}

const k1:IKeyValue<number, string> = { key: 18, value: 'lin'}
const k2:IKeyValue<string, number> = { key: 'lin', value: 18}


```


### 泛型定义数组

定义一个数组，我们之前是这么写的：

```javascript 
const arr: number[] = [1,2,3]

const arr: Array<number> = [1,2,3]


```
