# 什么是原型链

## 目录

- [原型链（Prototype Chain）](#原型链Prototype-Chain)
  - [是什么？](#是什么)
  - [如何工作？](#如何工作)
  - [示例](#示例)
- [2.prototype属性](#2prototype属性)
  - [是什么？](#是什么)
  - [关键点](#关键点)
- [3.constructor属性](#3constructor属性)
  - [是什么？](#是什么)
  - [关键点](#关键点)
- [4.三者的关系图示](#4三者的关系图示)
- [5.完整示例分析](#5完整示例分析)
- [6.常见误区与注意事项](#6常见误区与注意事项)
- [7.总结表](#7总结表)

## **原型链（Prototype Chain）**

### **是什么？**

原型链是 `JavaScript` **实现继承的机制。当访问一个对象的属性或方法时，如果对象本身没有该属性，引擎会沿着它的原型链向上查找，直到找到该属性或到达链的顶端（****`null`****）**。

### **如何工作？**

1. **每个对象都有一个隐式原型（****`__proto__`****），指向它的构造函数的**\*\*`prototype`。\*\*​
2. \*\*`prototype`\*\***本身也是一个对象**，它也有自己的`__proto__`，形成链式结构。
3. 查找属性时，按`obj → obj.__proto__ → obj.__proto__.__proto__ → ... → null`的顺序搜索。

### **示例**

```javascript 
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, ${this.name}!`);
};

const alice = new Person("Alice");

// 原型链：alice → Person.prototype → Object.prototype → null
alice.sayHello(); // 1. alice 自身无 sayHello → 2. 查找 alice.__proto__（Person.prototype）→ 找到并调用
```


## 2.\*\*`prototype`\*\***属性**

### **是什么？**

- \*\*`prototype`\*\***是函数独有的属性**（**构造函数才有**），指向一个对象（原型对象）。
- 该对象包含**共享给所有实例的属性和方法**。

### **关键点**

1. **只有函数有**\*\*`prototype`\*\*（因为函数可能作为构造函数）其实`class` 也有

```javascript 
function Foo() {}
console.log(Foo.prototype); // { constructor: Foo, __proto__: Object.prototype }

const obj = {};
console.log(obj.prototype); // undefined（普通对象无 prototype）
```


1. \*\*`prototype`\*\***的用途**：
   通过`new`创建实例时，实例的`__proto__`会指向构造函数的`prototype`。

## 3.\*\*`constructor`\*\***属性**

### **是什么？**

- **`constructor`****是****原型对象**\*\*（****`prototype`****）上的一个属性 \*\*，默认指向该**原型关联的构造函数。**
- 它是**从原型对象反向指向构造函数的引用**。

### **关键点**

1. **默认情况下**，函数的`prototype`是一个对象，其`constructor`指向函数本身：

```javascript 
function Dog() {}
console.log(Dog.prototype.constructor === Dog); // true
```


1. **实例的**\*\*`constructor`\*\***继承自原型**：

```javascript 
const dog1 = new Dog();
console.log(dog1.constructor === Dog); // true（实际访问的是 dog1.__proto__.constructor）
```


## 4.**三者的关系图示**

```javascript 
实例 (obj)       构造函数 (Foo)       原型对象 (Foo.prototype)
{ __proto__ }    { prototype }      { constructor, __proto__ }
      │               │                      │
      │               └──────────────────────┤
      │                                      │
      └──────────────────────────────────────┘
```


1. **`obj.__proto__ === Foo.prototype`** &#x20;

   （实例的隐式原型指向构造函数的显式原型）
2. **`Foo.prototype.constructor === Foo`** &#x20;

   （原型的 constructor 指向构造函数本身）
3. **`Foo.prototype.__proto__ === Object.prototype`** &#x20;

   （原型对象的隐式原型指向 Object 的原型）

## 5.**完整示例分析**

```javascript 
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log(`${this.name} is eating.`);
};

const cat = new Animal("Tom");

// 原型链关系：
cat.__proto__ === Animal.prototype;                  // true
Animal.prototype.constructor === Animal;             // true
Animal.prototype.__proto__ === Object.prototype;    // true
Object.prototype.__proto__ === null;                // true

// 属性查找流程：
cat.eat();  // 1. cat 自身无 eat → 2. 查 cat.__proto__（Animal.prototype）→ 找到并调用
```


## 6.**常见误区与注意事项**

1. **修改**\*\*`prototype`\*\***会影响所有实例**：

```javascript 
Animal.prototype.run = function() { console.log("Running!"); };
cat.run(); // 所有已存在的实例均可访问新方法
```


1. **重写**\*\*`prototype`\*\***会切断原有链**：

```javascript 
Animal.prototype = { jump: function() {} };
const dog = new Animal("Buddy");
dog.eat(); // 报错！eat 方法已不存在于新的 prototype
```


1. \*\*`constructor`\*\***可以被覆盖**：

```javascript 
Animal.prototype = { constructor: Dog }; // 错误做法，破坏原型链
```


## 7.**总结表**

| 概念                | 归属   | 指向目标               | 作用         |
| ----------------- | ---- | ------------------ | ---------- |
| \`\_\_proto\_\_\` | 所有对象 | 构造函数的\`prototype\` | 构成原型链，实现继承 |
| \`prototype\`     | 函数   | 原型对象               | 存放共享属性和方法  |
| \`constructor\`   | 原型对象 | 关联的构造函数            | 标识对象的创建者   |
