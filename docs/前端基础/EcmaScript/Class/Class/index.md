# Class

## 目录

- [构造函数和 new 运算符](#构造函数和-new-运算符)
  - [1. 构造函数](#1-构造函数)
  - [2. 简单示例](#2-简单示例)
  - [3. new 运算符操作过程](#3-new-运算符操作过程)
- [Class 类基本用法](#Class-类基本用法)
- [constructor ](#constructor-)
  - [返回值](#返回值)
  - [调用](#调用)
  - [指向](#指向)
- [Class的自定义方法](#Class的自定义方法)
  - [非静态方法都定义在 prototype 属性上面](#非静态方法都定义在-prototype-属性上面)
  - [静态方法](#静态方法)
  - [可通过 Object.assign 向 prototype 一次性添加多个](#可通过Objectassign向prototype一次性添加多个)
  - [方法都是不可枚举的](#方法都是不可枚举的)
- [Class 类的属性](#Class-类的属性)
  - [表达式](#表达式)
  - [存取值函数](#存取值函数)
  - [私有属性](#私有属性)
  - [静态属性](#静态属性)
  - [实例属性的另一种写法](#实例属性的另一种写法)
- [Class 的继承](#Class-的继承)
  - [静态方法的继承](#静态方法的继承)
- [子类](#子类)
- [class Demo](#class-Demo)

# ***构造函数和 new 运算符***

## **1. 构造函数**

构造函数的作用在于 **「实现可重用的对象创建代码」**。通常，对于构造函数有两个约定：

- 命名时首字母大写；
- 只能使用 new 运算符执行。

**「new 运算符」**

创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。语法如下：

`new constructor[([arguments])]`

## **2. 简单示例**

举个简单示例：

```javascript 
 function User (name){
    this.name = name;
    this.isAdmin = false;
}
const leo = new User('leo');
console.log(leo.name, leo.isAdmin); // "leo" false
```


## **3. new 运算符操作过程**

当一个函数被使用 new 运算符执行时，它按照以下步骤：

1. 一个新的空对象被创建并分配给 this。
2. 函数体执行。通常它会修改 this，为其添加新的属性。
3. 返回 this 的值。

以前面 User方法为例：

**精辟易懂**

```javascript 
 function User(name) {
  // this = {};（隐式创建）

  // 添加属性到 this
  this.name = name;
  this.isAdmin = false;

  // return this;（隐式返回）
}
const leo = new User('leo');
console.log(leo.name, leo.isAdmin); // "leo" false
```


# **Class 类基本用法**

       Class 类完全可以看作**构造函数**的另一种写法，类的数据类型其实就是函数，**类本身也就是其实例的构造函数**。使用的时候也是使用 new 命令。

```javascript 
 class Person {
  constructor(name,age) {
    this.name = name;
    this.age = age;
  }
  getName(){
    console.log(`My name is ${this.name}!`)
  }
  static sayHi() {
    console.log('Hi');
  }
}
let p = new Person();
typeof Person          // "function"
p instanceof Person    // true

```


# \*\*constructor \*\*

- **constructor 方法就是类的构造方法，this 关键字代表实例对象**。
- constructor 方法是类的默认方法，通过 new 命令生成对象实例时，会自动调用该方法。
- **一个类必须有 constructor 方法，如果没有显式定义，会默认添加一个空的 constructor 方法**。

```javascript 
 class Person {}
Person.prototype    //  {construtor:f}
```


## 返回值

constructor 方法默认返回实例对象，也完全可以 return 另外一个对象。

```javascript 
 class Foo {
  constructor(){
    return Object.create(null);
  } 
}
new Foo() instanceof Foo      // false
```


## 调用

类必须使用 new 调用，也就是 constructor 方法只能通过 new 命令执行，否则会报错。

```javascript 
 class Foo {
  constructor(){} 
}
Foo()   // TypeError: Class constructor Foo cannot be invoked without 'new'
```


## 指向

prototype 对象的 constructor 属性，也是直接指向类本身。

```javascript 
 Person.prototype.constructor === Person // true
p.constructor === Person // true
```


# **Class的自定义方法**

## 非静态方法都定义在 prototype 属性上面

```javascript 
 class Person {
  constructor() {}
  aaa(){}
  bbb(){}
}
Object.getOwnPropertyNames(Person.prototype)   // ["constructor", "aaa", "bbb"]
```


## **静态方法**

- 类相当于实例的原型，所有在**类中定义的方法，都会被实例继承。**
- 但如果在一个方法前，加上\*\* static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。\*\*

```javascript 
 class Person {
  static sayHi() {
    console.log('Hi');
  }
}
Person.sayHi()      // "Hi"
let p = new Person();
p.sayHi()           // TypeError: p.sayHi is not a function
```


- \*\*如果静态方法包含 ****this**** 关键字，\*\***这个 ****this**** 指的是类，而不是实例。**
- **静态方法可以与非静态方法重名**。

```javascript 
 class Person {
  static sayHi() {
    this.hi();
  }
  static hi(){
    console.log('hello')
  }
  hi(){
    console.log('world')
  }
}
Person.sayHi()      // "hello"
```


## **可通过**\*\* ****Object.assign**** 向 ****prototype**** 一次性添加多个\*\*

```javascript 
 class Person {
  constructor() {}
}
Object.assign(Person.prototype, {
  aaa(){},
  bbb(){}
})
```


注意，

定义类的时候，前面不需要加上 function 关键字，也不需要逗号分隔。

## **方法都是不可枚举的**

与 ES5 构造函数的不同的是，Class 内部所有定义的方法，**都是不可枚举的**。

```javascript 
 class Person {
  constructor() {}
  aaa(){}
}
Object.keys(Person.prototype)                  // []
Object.getOwnPropertyNames(Person.prototype)   // ["constructor", "aaa"]
```


**而 ES5 的构造函数的 prototype原型定义的方法是可枚举的。**

```javascript 
 let Person = function(){};
Person.prototype.aaa = function(){};

Object.keys(Person.prototype)                  // ["aaa"]
Object.getOwnPropertyNames(Person.prototype)   // ["constructor", "aaa"]
```


# **Class 类的属性**

## **表达式**

```javascript 
 let methodName = 'getName';
class Person {
  constructor() {}
  [methodName](){}
}
Object.getOwnPropertyNames(Person.prototype)   // ["constructor", "getName"]
```


## 存取值函数

**取值函数 getter 和存值函数 setter**

与 ES5 一样，在 Class 内部可以使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为

```javascript 
 class Person {
  constructor() {
    this.name = 'dora';
  }
  get author() {
    return this.name;
  }
  set author(value) {
    this.name = this.name + value;
  }
}
let p = new Person();
console.log(p.author)          //  dora
p.author = 666;   
console.log(p.author) // dora666

```


且其中 author 属性定义在 Person.prototype 上 **，但 get 和 set 函数是设置在 author 属性描述对象 Descriptor 上的。**

```javascript 
 Object.getOwnPropertyNames(Person.prototype)   // ["constructor", "author"]
Object.getOwnPropertyDescriptor(Person.prototype,'author')
// { get: ƒ author()(),
//   set: ƒ author()(value),
//   ...
// }
```


## 私有属性

你可能不希望类内部的所有内容都是全局可用的。通过在变量或函数前面添加一个#可以将它们完全保留为类内部使用

```javascript 
 class Message {  
  #message = "Howdy"  
  greet() { 
    console.log(this.#message)
   }
 } 
const greeting = new Message()   
greeting.greet() // Howdy 内部可以访问
console.log(greeting.#message)  // Private name  #message is 


   // 我们将使用 # 符号表示类的私有变量。这样就不需要使用闭包来隐藏不想暴露给外界的私有变量。
class Counter {
  #x = 0;
  #increment() {
    this.#x++;
  }

  onClick() {
    this.#increment();
  }
}

const c = new Counter();
c.onClick(); // 正常
c.#increment(); // 报错

```


## 静态属性

```javascript 
 class Message {  
  static message = "Howdy"  
  greet() { 
    console.log(this.message)
   }
 } 
const greeting = new Message()   
greeting.greet() // Howdy 内部可以访问
console.log(greeting.message)  // undefined
```


## **实例属性的另一种写法**

**实例属性除了定义在 constructor() 方法里面的 this 上面，也可以定义在类的最顶层**

。此时定义的时候，属性前面不需要加上 this。而在类内部其它地方调用的时候，需要加上 this。

```javascript 
 class Person {
  name = 'dora';
  getName() {
    return this.name;
  }
}
let p = new Person();
p.name           // "dora"
Object.keys(p)   // ["name"]
```


**这种写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，写法简洁，一眼就能看出这个类有哪些实例属性。**

# **Class 的继承**

Class 子类可以通过 extends 关键字实现继承。

```javascript 
 class Person {
  constructor() {}
  sayHi() {
    return 'Hi';
  }
}
class Teacher extends Person {
  constructor() {
    super();
  }
}
let t = new Teacher();
t.sayHi();   // "Hi"
```


## **静态方法的继承**

父类的静态方法，可以被子类继承。

```javascript 
class Person {

  static sayHi() {

    return 'hello';

  }

}

class Teacher extends Person {

}

**Teacher.sayHi()      // "hello"**
```


在子类的 static 内部，可以从 super 对象上调用父类的静态方法。

```javascript 
class Teacher extends Person {

  static sayHi() {

    super.sayHi();

  }

}

Teacher.sayHi()      // "hello"
```


# **子类**

子类必须在 constructor 方法中调用 super() 方法，否则新建实例时会报错。

如果子类没有定义 constructor 方法，这个方法会被默认添加，且子类默认添加的 constructor 方法都会默认执行 super() 方法。

```javascript 
 class Teacher extends Person {
}
let t = new Teacher();
t.sayHi();   // "Hi"
//等同于
class Teacher extends Person {
  constructor(...args) {
    super(...args);
  }
}
```


# class Demo

```javascript 
 class Person {
  name: string
  static sex: string = '男'
  public gy = '公有的'//默认是公有的，可以被任何地方访问
  private sy = '私有的'//只能在当前类内部访问
  protected bh: string = '保护的'//只能在当前类内部和子类内部访问

  constructor(n: string) {
    this.name = n
    console.log('保护1', this.bh)
  }
  static setSex(): string { //static属性要和static方法配合使用
    return this.sex
  }
  syFun(val: string) {
    this.sy = val
    return this.sy
  }
}

class person extends Person {
  constructor(n: string) {
    super(n)
    console.log(this.gy)
    console.log('保护2', this.bh)
  }
}

const p1 = new Person('欧文')
const p2 = new person('詹姆斯')

console.log(p1.syFun('哈哈哈'))
console.log(p1.name)
console.log(Person.setSex())

```


[私有属性](./私有属性/index.md "私有属性")

[常见用法](IT/前端基础/EcmaScript/Class/Class/常见用法/常见用法.md "常见用法")
