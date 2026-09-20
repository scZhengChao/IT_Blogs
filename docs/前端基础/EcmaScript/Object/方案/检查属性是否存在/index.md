# 检查属性是否存在

## 目录

- [in](#in)
- [Reflect.has()](#Reflecthas)
- [hasOwnProperty](#hasOwnProperty)
  - [构造函数法](#构造函数法)
  - [对象字面量](#对象字面量)
  - [缺点](#缺点)
    - [不支持create](#不支持create)
    - [覆盖报错](#覆盖报错)
  - [Object.prototype.hasOwnProperty()](#ObjectprototypehasOwnProperty)
- [Object.hasOwn()](#ObjecthasOwn)

# in

> JavaScript的in操作符可以用来判断一个属性是否属于一个对象，也可以用来变量一个对象的属性

本文我们只讨论in的检查作用

`in`运算符检查对象是否具有给定名称的属性：

```react tsx 
> 'name' in {name: '搞前端的半夏'}
true
> 'name' in {}
false
```


但是**因为in会判断继承过来的属性！**

> 'toString' in {} true

那是因为`{}`继承了方法Object.prototype.toString()

# Reflect.has()

Reflect是在ES2015新增的一个内置对象，提供了与Javascript对象交互的方法。

判断一个对象是否存在某个属性，**和 ****`in`**** 运算符] 的功能完全相同**。(**会判断继承过来的属性！**)

用法：Reflect.has(obj, propName)

```react tsx 
Reflect.has({name:"搞前端的半夏"}, "name"); // true
Reflect.has({name:"搞前端的半夏"}, "age"); // false

Reflect.has({name:"搞前端的半夏"}, "toString"); //true
```


# hasOwnProperty

> hasOwnProperty这个方法可以用来检测一个对象是否含有**特定的自身属性**，即是用来判断一个属性是定义在对象本身而不是继承自原型链的，

通过**对象字面量**或者**构造函数法**创建的对象都从Object.prototype继承了hasOwnProperty()。

## 构造函数法

```react tsx 
o = new Object();
o.name = '搞前端的半夏';
o.hasOwnProperty('name');             // 返回 true
o.hasOwnProperty('toString');         // 返回 false
o.hasOwnProperty('hasOwnProperty');   // 返回 false
```


## 对象字面量

```react tsx 
o={name:"搞前端的半夏"}
o.hasOwnProperty('name');             // 返回 true
o.hasOwnProperty('toString');         // 返回 false
o.hasOwnProperty('hasOwnProperty');   // 返回 false
```


## 缺点

### 不支持create

但是下面这种情况：会直接报错：

```react tsx 
o =  Object.create(null)
Uncaught TypeError: o.hasOwnProperty is not a function
    at <anonymous>:1:3

```


### 覆盖报错

如果一个对象有一个自己的名为 name 的属性`'hasOwnProperty'`，那么该属性将被覆盖`Object.prototype.hasOwnProperty`并且我们无法访问它：

```react tsx 
o={hasOwnProperty:"搞前端的半夏"}
o.hasOwnProperty('name');    
```


直接报错

```react tsx 
VM123:3 Uncaught TypeError: o.hasOwnProperty is not a function
    at <anonymous>:3:3
```


## Object.prototype.hasOwnProperty()

用法：`Object.prototype.hasOwnProperty.call(obj, propName);`，接受两个参数。请注意我们这里用到了call。改变this的指向。

`Object.prototype.hasOwnProperty`除了支持hasOwnProperty的相同用法，同时还**解决了hasOwnProperty的两个缺点。**

```react tsx 
o={hasOwnProperty:"搞前端的半夏"}
Object.prototype.hasOwnProperty.call.hasOwnProperty(o,'name'); // 返回false
```


# Object.hasOwn()

Object.hasOwn()，目前来看就是替代Object.prototype.hasOwnProperty.call()。

如果用Object.prototype.hasOwnProperty.call() 来封装的话，代码如下：

```react tsx 
function hasOwn(obj, propName) {
  return Object.prototype.hasOwnProperty.call(obj, propName);
}
Object.hasOwn({name: '搞前端的半夏'}, 'name')  // true
Object.hasOwn({}, 'name')               //false
Object.hasOwn({}, 'toString')             //false
Object.hasOwn(Object.create(null), 'name')     //false
Object.hasOwn({hasOwnProperty: 'yes'}, 'name')  //false
Object.hasOwn({hasOwn: 'yes'}, 'name')     //false
```
