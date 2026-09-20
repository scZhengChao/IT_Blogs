# 类class

## 目录

- [类的类型](#类的类型)
- [对象继承时初始化的顺序](#对象继承时初始化的顺序)
- [类：](#类)
- [interface 和 type 的区别是什么](#interface-和-type-的区别是什么)

[ TypeScript 中文网: 文档 - 类 TypeScript 中的类是如何工作的 https://ts.nodejs.cn/docs/handbook/2/classes.html](https://ts.nodejs.cn/docs/handbook/2/classes.html " TypeScript 中文网: 文档 - 类 TypeScript 中的类是如何工作的 https://ts.nodejs.cn/docs/handbook/2/classes.html")

## 类的类型

初学者一定对 class 这种类型感到困惑，因为他们有时候代表**类的实例类型**，有时候**代表构造器方法类型**

```typescript 
/**
 * 定义一个类
 */
class People {
  name: number;
  age: number;
  constructor() {}
}

 // p1可以正常赋值
const p1: People = new People(); 

// 等号后面的People报错，类型“typeof People”缺少类型“People”中的以下属性: name, age
const p2: People = People;

// p3报错，类型 "People" 中缺少属性 "prototype"，但类型 "typeof People" 中需要该属性
const p3: typeof People = new People();

 // p4可以正常赋值
const p4: typeof People = People;
```


结论是这样的：

- 当把**类直接作为类型**时，该类型约束的是该类型必须是类的实例；即该**类型获取的是该类上的实例属性和实例方法**（也叫原型方法）；
- 当把 **typeof 类作为类型**时，约束的满足该类的类型；即该类型获取的是**该类上的静态属性和方法**。
- **静态属性和静态方法的继承**，即属性和方法**不是挂载到构造函数的 prototype 原型上**的，而是直接**挂载到构造函数本身。**
- new 关键字用在类型上，表示构造函数的类型。
- 当我们声明一个类的时候，其实**声明的是这个类的实例类型和静态类型两个类型。**

## 对象继承时初始化的顺序

在某些情况下，JavaScript类初始化的顺序可能令人惊讶。让我们考虑一下这段代码:

```typescript 
class Base {
  name = "base";
  constructor() {
    console.log("My name is " + this.name);
  }
}
class Derived extends Base {
  name = "derived";
}
// Prints "base", not "derived"
const d = new Derived();

```


这里发生了什么？

由 JavaScript 定义的类**初始化顺序为:**

- 基类字段已初始化
- 基类构造函数运行
- 派生类字段已初始化
- 派生类构造函数运行

这意味着基类构造函数**在其自己的构造函数中看到了自己的 name 值，因为派生类字段初始化尚未运行。**

# 类：

        类(Class)：定义了一件事物的抽象特点，包含它的属性和方法

        对象（Object）：类的实例，通过 new 生成

        面向对象（OOP）的三大特性：封装、继承、多态

-  封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
  - es6:    使用 extends 关键字实现继承，子类中使用 super 关键字来调用父类的构造函数和方法
- 实例属性:&#x20;
  - 定义在类内部 name = 'Jack';&#x20;
  - public xx:string 定义在构造器内部&#x20;
  - &#x20;get|set 属性(){}
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
  -  使用 get 属性(){return this.*属性} 和 set 属性(val){this.* 属性=val} 可以改变属性的赋值和读取行为
- 静态方法: static 方法名(){}        类名.方法()
- 静态属性: static 定义在类内部 name = 'Jack'; ts实现了但转换到js暂不支持        调用：类名.方法()
- 访问修饰符（Modifiers）：

        修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法

- public：修饰的属性或方法是公有的，默认所有的属性和方法都是 public 的
- private 修饰的属性或方法是私有的，不能**在声明它的类的外部访问**
- protected 修饰的属性或方法**是私有的+子类中允许**访问

```javascript 
 public name: string;
constructor(name: string)
sayHi(): void{}
p1: Person = new Person
```


# interface 和 type 的区别是什么

[抽象类](./抽象类/index.md "抽象类")

[this](./this/index.md "this")

[interface 和 type](<./interface 和 type/index.md> "interface 和 type")
