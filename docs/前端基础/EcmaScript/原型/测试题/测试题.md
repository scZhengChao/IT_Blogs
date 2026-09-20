# 测试题

## 目录

- [intanceof](#intanceof)
- [最顶层](#最顶层)
- [原型把戏](#原型把戏)
- [构造函数的函数](#构造函数的函数)

# **intanceof**

**intanceof** 的判断方式**是原型对象是否在当前对象的原型链上面**

```javascript 
function People() {}
function Man() {}
Man.prototype = new People();
Man.prototype.constructor = Man;

const man = new Man();
man instanceof People;    // true

// 替换People的原型
People.prototype = {};
man instanceof People;    // false

```


**您用es6的class的话，prototype原型是不允许被重新定义的，所以不会出现上述情况**

# 最顶层

```javascript 
// 这是原型链向上查找的最顶层，一个 null

Object.prototype.__proto__ === null; // true

```


# **原型把戏**

```javascript 
var a = {};
var b = Object.prototype;

[a.prototype === b, Object.getPrototypeOf(a) == b]

// A. [false, true]
// B. [true, true]
// C. [false, false]
// D. other

```


答案是A。对象是没有 prototype 属性的，所以 a.prototype 是 undefined，但我们可以通过 `Object.getPrototypeOf` 方法来获取一个对象的原型。

# **构造函数的函数**

```javascript 
function f() {}
var a = f.prototype;
var b = Object.getPrototypeOf(f);
a === b;

// A. true
// B. false
// C. null
// D. other

```


答案是B。这个解释起来有点绕口，我们先来看另外一段代码：

```javascript 
function Person() {}
var p = new Person();

var a = p.__proto__;
var b = Object.getPrototypeOf(p);
var c = Person.prototype;
console.log(a === b, a === c, b === c);
// true, true, true

var d = Person.__proto__;
var e = Object.getPrototypeOf(Person);
var f = Function.prototype;
console.log(d === e, d === f, e === f);
// true, true, true

```


首先你要明白，任何函数都是 Function 的实例，而p是函数 Person 的实例，**Object.getPrototypeOf 会获取构造当前对象的原型。**

所以 `Object.getPrototypeOf(p) === Person.prototype`，而&#x20;

`Object.getPrototypeOf(Person) === Function.prototype`，所以答案就很明显了。我解释的不是很好，如果读者有更好的解释，欢迎评论。
