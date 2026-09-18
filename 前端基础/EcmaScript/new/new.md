# new

## 目录

- [new](#new)
- [案例](#案例)
- [new解密](#new解密)
  - [一](#一)
  - [二](#二)

# new

- 实例化**一个函数或者ES6的class**

```typescript 
function Person(name) {
  this.name = name;

  this.getName = function () {
    return this.name;
  };
}

const person = new Person("二哈"); // Person构造函数内部的this指向person实例
console.log(person.getName());
```


对于**构造函数的返回值**

- return 非对象，实际返回构造函数隐式创建的对象
- return\*\* 对象，实际返回该对象\*\*

# 案例

```typescript 
function MyObject() {
  this.name = "myObject";
}

function MyObject2() {
  this.name = "myObject";
   return {
    name: "myObject2",
  }; 
}

function MyObject3() {
  this.name = "myObject3";
   return undefined;
 }

 console.log(new MyObject()); // MyObject { name: 'myObject' }
console.log(new MyObject2()); // { name: 'myObject2' }
console.log(new MyObject3()); // MyObject3 { name: 'myObject3' }
```


# new解密

## 一

- 创建一个空对象
- 设置**空对象的原型为构造函数的原型**
- 绑定this为之前创建的对象，执行构造函数方法
- 如果构造函数显式返回对象类型，就直接返回该对象，反之返回第一步创建的对象

```typescript 
const slice = Array.prototype.slice;
function newObject(constructor) {
  const args = slice.call(arguments, 1);
  const obj = {}; // 1
  obj.__proto__ = constructor.prototype; // 2
  const res = constructor.apply(obj, args); // 3
  return res instanceof Object ? res : obj; // 4
}

```


## 二

1. js 在内部创建了一个对象
2. 这个对象可以**访问到构造函数原型上的属性，所以需要将对象与构造函数连接起来**
3. 构造**函数内部的this被赋值为这个新对象(即this指向新对象)**
4. 返回原始值需要忽略，返回对象需要正常处理

```javascript 
function _new(fn, ...args) {
  const newObj = Object.create(fn.prototype);
  const value = fn.apply(newObj, args);
  return value instanceof Object ? value : newObj;
}

```


[new Function](<IT/前端基础/EcmaScript/new/new Function/new Function.md> "new Function")

[new class 和 new function 可有什么区别](<new class 和 new function 可有什么区别.md> "new class 和 new function 可有什么区别")
