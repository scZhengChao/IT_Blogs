# 单例模式

## 目录

- [写在前面](#写在前面)
- [实现](#实现)
  - [构造函数的静态属性](#构造函数的静态属性)
  - [重写构造函数](#重写构造函数)
  - [利用闭包 ](#利用闭包)
  - [立即执行函数](#立即执行函数)
  - [es6](#es6)

# 写在前面

定义：保证**一个类仅有一个实例，并且提供一个可以访问它的访问点**

实现：用一个**变量来标识实例是否已经存在，如果存在，则直接返回已经创建好的实例，反之就创建一个对象**

场景：模态框、浏览器window对象，等等

# 实现

重点变了--**如何缓存初次创建的对象**。

**首先先排除全局变量，因为一般情况下需要保证全局环境的纯净，其次全局变量容易被改写，出现意外情况**。所以采用以下2种方案来实现缓存。

## **构造函数的静态属性**

```typescript 
function A(name){
    // 如果已存在对应的实例
   if(typeof A.instance === 'object'){
       return A.instance
   }
   //否则正常创建实例
   this.name = name
   
   // 缓存
   A.instance =this
   return this
}
var a1 = new A()
var a2= new A()
console.log(a1 === a2)//true

```


返回对象前做个判断，构造函数的静态属性上是否已经有了该对象，如果有了该对象，就不创建了

## 重写构造函数

```typescript 
function A(name){
  var instance = this
  this.name = name
  //重写构造函数
  A = function (){
      return instance
  }
}
var a1 = new A()
var a2= new A()
console.log(a1 === a2)//true
```


> 到这里我们其实已经实现了最核心的步骤，但是这样的实现存在问题，如果看过**原型链继承**的小伙伴会注意到，如果我们在第一次调用构造函数之后，**由于构造函数被重写，那么在之后添加属性和方法到A的原型上，就会丢失（但是之前的原型链指向之后的）**。比如：

```typescript 
function A(name){
  var instance = this
  this.name = name
  //重写构造函数
  A = function (){
      return instance
  }
}
A.prototype.pro1 = "from protptype1"

var a1 = new A()
A.prototype.pro2 = "from protptype2"
var a2= new A()

console.log(a1.pro1)//from protptype1
console.log(a1.pro2)//underfined
console.log(a2.pro1)//from protptype1
console.log(a2.pro2)//underfined
```


**重写构造函数之后，，实际上原先的****A****指针对应的函数实际上还在内存中(因为instance变量还在被引用着，这里的内容如果忘记了请看闭包)，但是此时****A****指针已经指向了一个新的函数了**，可以简单测试下：

```typescript 
console.log(a1.constructor ==== A)//false
```


所以接下来我们应该解决这个问题，根据上文可知，我们的重点是，**调整原型实例之间的关系**，所以应该这样实现（这一块忘记的还是建议回头看看js继承里面的那张函数、原型、实例之间的关系图[点击直达](https://segmentfault.com/a/1190000008739672 "点击直达")）：

## \*\*利用闭包 \*\*​

```typescript 
function A(name){
  var instance = this
  this.name = name
  //重写构造函数
  A = function (){
      return instance
  }
  
  // 第一种写法,这里实际上实现了一次原型链继承，如果不想这样实现，也可以直接指向原来的原型
  A.prototype = this
  // 第二种写法，直接指向旧的原型
  A.prototype = this.constructor.prototype
  
  instance = new A()
  
  // 调整构造函数指针，这里实际上实现了一次原型链继承，如果不想这样实现，也可以直接指向原来的原型
  instance.constructor = A
  
  return instance
}
A.prototype.pro1 = "from protptype1"

var a1 = new A()
A.prototype.pro2 = "from protptype2"
var a2= new A()

console.log(a1.pro1)//from protptype1
console.log(a1.pro2)//from protptype2
console.log(a2.pro1)//from protptype1
console.log(a2.pro2)//from protptype2
```


现在一切就正常了。

## **立即执行函数**

还有一种方式，是利用**立即执行函数来保持私有变量，**(立即执行函数的内容请看《详解js中的函数部分》)原理也是闭包：

```typescript 
var A;
(function(name){
    var instance;
    A = function(name){
        if(instance){
            return instance
        }
        
        //赋值给私有变量
        instance = this
        
        //自身属性
        this.name = name
    }
}());
A.prototype.pro1 = "from protptype1"

var a1 = new A('a1')
A.prototype.pro2 = "from protptype2"
var a2 = new A('a2')

console.log(a1.name)
console.log(a1.pro1)//from protptype1
console.log(a1.pro2)//from protptype2
console.log(a2.pro1)//from protptype1
console.log(a2.pro2)//from protptype2
```


[单例模式.html](https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/_2G20Ch5Bln.html "单例模式.html")

## es6

```javascript 
class Logger {
  constructor() {
    if (!Logger.instance) {
      this.logs = [];
      Logger.instance = this;
    }

    return Logger.instance;
  }

  log(message) {
    this.logs.push(message);
    console.log(`Logger: ${message}`);
  }

  printLogCount() {
    console.log(`Number of logs: ${this.logs.length}`);
  }
}

// 可以使用全局变量来访问实例
const logger = new Logger();
Object.freeze(logger);

// 对于每个实例，输出应该是相同的
logger.log('First message'); // Output: Logger: First message
logger.printLogCount(); // Output: Number of logs: 1

const anotherLogger = new Logger(); // 此时返回一个已经存在的实例
anotherLogger.log('Second message'); // Output: Logger: Second message
anotherLogger.printLogCount(); // Output: Number of logs: 2

```


或者

```javascript 
class Singleton {
    //构造函数
    constructor(name) {
        this.name = name;
    }
    //实例方法
    getName() {
        console.log(this.name);
    }
    //静态方法获取实例对象
    static getInstance(name) {
        if (!this.instance) {
            this.instance = new Singleton(name);
        }
        return this.instance;
    }
}
//创建静态属性作为唯一标识
Singleton.instance = null;
//验证
var a = Singleton.getInstance('a');
var b = Singleton.getInstance('b');
a.getName(); //a
b.getName(); //a
console.log(a===b);//true
```
