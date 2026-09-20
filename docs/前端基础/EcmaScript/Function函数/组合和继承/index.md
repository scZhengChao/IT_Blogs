# 组合和继承

## 目录

- [组合（has-a）](#组合has-a)
- [继承（ is - a 关系）](#继承-is---a-关系)
- [多态](#多态)
- [寄生组合继承](#寄生组合继承)
- [混合](#混合)
- [ES6继承](#ES6继承)

### 组合（has-a）

- 在一个类/对象内使用其他的类/对象。
- has-a： 包含关系，体现的是整体和部分的思想
- 黑盒复用：对象的内部细节不可见。知道怎么使用就可以了

```typescript 
class Logger {
  log() {
    console.log(...arguments);
  }
  error() {
    console.error(...arguments);
  }
}

class Reporter {
  constructor(logger) {
     this.logger = logger || new Logger();
   }
  report() {
    // TODO:
    this.logger.log("report");
  }
}

const reporter = new Reporter();
reporter.report(); // report
```


组合优点

- 功能相对独立，松耦合
- 扩展性好
- 符合单一职责，复用性好
- 支持动态组合，即程序运行中组合
- 具备按需组装的能力

组合的缺点

- 使用上相比继承，更加复杂一些
- 容易产生过多的类/对象

### 继承（ is - a 关系）

- 继承是 is-a 的关系，比如人是动物
- 白盒复用：你需要了解父类的实现细节，从而决定怎么重写父类的方法

```typescript 
class Logger {
  log() {
    console.log(...arguments);
  }
  error() {
    console.error(...arguments);
  }
}

class Reporter extends Logger {
  report() {
    // TODO:
    this.log("report");
  }
}

const reporter = new Reporter();
reporter.report(); // report
```


继承优点

- 初始化简单，子类自动具备父类的能力
- 无需显式初始化父类

继承缺点

- 继承层级多，会导致代码混乱，可读性变差
- 耦合紧
- 扩展性相对组合较差

其实组合和继承的最终目的都是为了更好代码复用

### 多态

形成条件

- 需要有继承关系
- 子类重写父类的方法
- 父类指向子类

```typescript 
class Animal {
  eat() {
    console.log("Animal is eating");
  }
}

class Person extends Animal {
  eat() {
    console.log("Person is eating");
  }
}

// 同一个方法看似是一个实例，输出却是不同
const animal: Animal = new Animal();
animal.eat(); // Animal is eating

const person: Animal = new Person();
person.eat(); // Person is eating
```


如何选择

- 有多态的需求的时候，考虑使用继承
- 如何有多重继承的需求，考虑使用组合
- 既有多态又有多重继承，考虑使用继承+组合

### 寄生组合继承

```typescript 
function Animal(options) {
  this.age = options.age || 0;
  this.sex = options.sex || 1;
  this.testProperties = [1, 2, 3];
}

Animal.prototype.eat = function (something) {
  console.log("eat:", something);
};

function Person(options) {
   // 初始化父类, 独立各自的属性
  Animal.call(this, options);
   this.name = options.name || "";
}

 // 设置原型
Person.prototype = Object.create(Animal.prototype);
// 修复构造函数
Person.prototype.constructor = Person;
 
Person.prototype.eat = function eat(something) {
  console.log(this.name, ":is eating", something);
};
Person.prototype.walk = function walk() {
  console.log(this.name, ":is waking");
};

const person = new Person({ sex: 1, age: 18, name: "小红" });
person.eat("大米"); // 小红 :is eating 大米
person.walk(); // 小红 :is waking

person.testProperties.push("4");

const person2 = new Person({ sex: 1, age: 18, name: "小红" });
// 表示testProperties是相互独立的
console.log(person2.testProperties); // [ 1, 2, 3 ]
```


寄生组合继承解决的问题

- 各个实例的属性独立，不会发生修改一个实例，影响另外一个实例
- 实例化过程中没有多余的函数调用
- 原型上的 constructor 属性指向正确的构造函数

### 混合

```typescript 
class Logger {
  log() {
    console.log("Logger::", ...arguments);
  }
}

class Animal {
  eat() {
    console.log("Animal:: is eating");
  }
}

class Person extends Animal {
  walk() {
    console.log("Person:: is walking");
  }
}

 const whiteList = ["constructor"];
function mixin(targetProto, sourceProto) {
  const keys = Object.getOwnPropertyNames(sourceProto);
  keys.forEach((k) => {
    if (whiteList.indexOf(k) <= 0) {
      targetProto[k] = sourceProto[k];
    }
  });
}
 
mixin(Person.prototype, Logger.prototype);

console.log(Person.prototype);
const person = new Person();
person.log("log test");  // Logger:: log test
```


### ES6继承

- 构造函数this使用之前，必须先调用super方法
- 注意箭头函数形式属性和clas如何在原型上添加非函数的属性

```typescript 
class Animal {
  constructor(options) {
    this.age = options.age || 0;
    this.sex = options.sex || 1;
  }

  eat(something) {
    console.log("eat:", something);
  }
}
// class原型上添加非函数的属性
 Animal.prototype.name = "prototype的name";
 
class Person extends Animal {
  // 私有变量
  #friends = [];

  constructor(options) {
     super(options);
     this.name = options.name || name;
  }
  eat(something) {
    console.log(this.name, "eat:", something);
  }
  run() {
    return `${this.name}正在跑步`;
  }
  // 此为实例上面的属性
  say = () => {
    console.log("say==", say);
  };
}

const p1 = new Person({ name: "张三" });
console.log("name:", p1.name); // name: 张三
p1.eat("鲍鱼"); // 张三 eat: 鲍鱼
// console.log("p1.friends:", p1.friends, p1.#friends);
console.log(Object.getOwnPropertyNames(p1.__proto__)); // 'constructor', 'eat', 'run'
console.log(p1.__proto__.name); // prototype的name
```
