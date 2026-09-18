# 基础类型

## 目录

- [类型：](#类型)
- [any、unknown 和 void 类型](#anyunknown-和-void-类型)
- [unknown ](#unknown-)
  - [不可预先定义的类型](#不可预先定义的类型)

# 类型：

- 原始数据类型：boolean、number、string、null、undefined、symbol、void、any
- 内置对象类型: Boolean Error Date RegExp Math  Array  Document HTMLElementDiv Event MouseEvent NodeList,
- 属性描述符descriptor: PropertyDescriptor
- 实例成员：{ new(...args:any\[]):{} }
- 自定义类型: class |  interface

# any、unknown 和 void 类型

```javascript 
let notSure: any = 4
notSure = "maybe a string"     // 可以是 string 类型
notSure = false                // 也可以是 boolean 类型

notSure.name                   // 可以随便调用属性和方法
notSure.getName()
- let unusable: void = undefined
- function alertName(): void{}

```


**注意：** ​**undefined 和 null 是所有类型的子类型，可以赋值给 number 类型的变量，而 void 类型的变量不能赋值给 number 类型的变量**

`unknown` 类型代表任何类型，它的定义和 `any` 定义很像，但是它是一个安全类型，**使用 ****`unknown`**** 做任何事情都是不合法的**。

`void`类型与 `any` 类型相反，它表示没有任何类型。比如函数没有明确返回值，默认返回 Void 类型

# unknown&#x20;

#### **不可预先定义的类型**

unknown 指的是**不可预先定义的类型**，在很多场景下，它可以替代 any 的功能同时保留静态检查的能力。

```typescript 
const num: number = 10;
(num as unknown as string).split('');      
```


这个时候 unknown 的作用就跟 any 高度类似了，你可以把它转化成任何类型，不同的地方是，在**静态编译的时候，unknown 不能调用任何方法，而 any 可以。**

```typescript 
const foo: unknown = 'string';
foo.substr(1);           // Error: 静态检查不通过报错
const bar: any = 10;
bar.substr(1); 

```


unknown 的一个使用场景是，避免使用 any 作为函数的参数类型而**导致的静态类型检查 bug：**

```typescript 
function test(input: unknown): number {
  if (Array.isArray(input)) {
    return input.length;    // Pass: 这个代码块中，类型守卫已经将input识别为array类型
  }
  return input.length;      // Error:  这里的input还是unknown类型，静态检查报错。如果入参是any，则会放弃检查直接成功，带来报错风险
}
```


我们在一些无法确定函数参数（返回值）类型中 unknown 使用的场景非常多

```typescript 
// 在不确定函数参数的类型时
// 将函数的参数声明为unknown类型而非any
// TS同样会对于unknown进行类型检测，而any就不会
function resultValueBySome(val:unknown) { 
  if (typeof val === 'string') {  
    // 此时 val 是string类型   
    // do someThing 
  } else if (typeof val === 'number') { 
    // 此时 val 是number类型   
    // do someThing  
  } 
  // ...
}

```
