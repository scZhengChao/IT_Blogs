# 类数组

## 目录

- [核心特性](#核心特性)
- [转换为真正数组的方法](#转换为真正数组的方法)
  - [1. ES5 方式](#1-ES5-方式)
  - [2. ES6 方式（推荐）](#2-ES6-方式推荐)
- [现代替代方案 - 剩余参数](#现代替代方案---剩余参数)
- [特殊注意事项](#特殊注意事项)
- [为什么不是真正的数组？](#为什么不是真正的数组)
- [总结](#总结)
- [JavaScript 中的类数组对象](#JavaScript-中的类数组对象)
  - [1. 内置类数组对象](#1-内置类数组对象)
    - [arguments对象](#arguments对象)
    - [DOM 元素集合](#DOM-元素集合)
    - [字符串](#字符串)
  - [2. 特殊对象](#2-特殊对象)
    - [FileList对象](#FileList对象)
    - [FormData的 entries](#FormData的-entries)
    - [正则表达式匹配结果](#正则表达式匹配结果)
  - [3. 自定义类数组对象](#3-自定义类数组对象)
  - [类数组对象的特征](#类数组对象的特征)

## 核心特性

1. **类数组对象**：
   - 具有`length`属性 **（表示参数个数）**
   - 可以**通过索引访问参数**（如`arguments[0]`）
2. **与数组的区别**：

```javascript 
function example(a, b) {
  console.log(arguments instanceof Array);  // false
  console.log(Array.isArray(arguments));   // false
}
```


## 转换为真正数组的方法

### 1. ES5 方式

```javascript 
function toArray() {
  return Array. prototype.slice.call(arguments);
 }
```


### 2. ES6 方式（推荐）

```javascript 
function toArray(...args) {   // 使用剩余参数
  return args;
}

// 或者
function toArray() {
   return Array.from(arguments); 
}
```


## 现代替代方案 - 剩余参数

ES6 引入了更好的解决方案：

```javascript 
function sum(...numbers) {  // 真正的数组
  return numbers.reduce((a, b) => a + b, 0);
}
```


## 特殊注意事项

1. **严格模式下的变化**：
   - 在严格模式中，`arguments`不再与形参绑定

```javascript 
function strictExample(a) {
  'use strict';
  a = 2;
  console.log(a, arguments[0]);  // 2, 1 (非严格模式会是 2, 2)
 }
strictExample(1);
```


1. **箭头函数没有**\*\*`arguments`\*\*：

```javascript 
const arrowFn = () => {
  console.log(arguments); // 报错：arguments is not defined
};
```


## 为什么不是真正的数组？

设计历史原因：

- 早期 JavaScript 需要保持轻量
- 类数组设计足以满足参数访问的基本需求
- 真正的数组方法会带来不必要的开销

## 总结

虽然`arguments`看起来像数组，但它只是一个类数组对象。在现代 JavaScript 开发中，建议使用剩余参数语法`...args`来获取真正的参数数组，它更安全、更直观，且具有所有数组方法。

# JavaScript 中的类数组对象

类数组对象（Array-like Objects）是指具有数字索引和`length`属性，但不具备数组方法（如`push`、`pop`、`forEach`等）的对象。以下是 JavaScript 中常见的类数组对象：

## 1. 内置类数组对象

### `arguments`对象

```javascript 
function example() {
  console.log(arguments); // 类数组对象
}
example(1, 2, 3);
```


### DOM 元素集合

```javascript 
// NodeList
const nodes = document.querySelectorAll('div');

// HTMLCollection
const elements = document.getElementsByClassName('item');
```


### 字符串

```javascript 
const str = 'hello';
console.log(str[0]); // 'h'
console.log(str.length); // 5
```


## 2. 特殊对象

### `FileList`对象

```javascript 
document.querySelector('input[type="file"]').files; // FileList 对象
```


### `FormData`的 entries

```javascript 
const formData = new FormData();
formData.append('key', 'value');
// formData.entries() 返回的是类数组迭代器
```


### 正则表达式匹配结果

```javascript 
const match = 'abc'.match(/a(b)c/);
// match 是 ["abc", "b", index: 0, input: "abc", groups: undefined]
```


## 3. 自定义类数组对象

你可以创建自己的类数组对象：

```javascript 
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};
```


## 类数组对象的特征

1. 具有数字索引属性（`0`,`1`,`2`...）
2. 有`length`属性
3. 没有数组的原型方法（`push`,`pop`,`slice`等）
4. **可以使用**\*\*`for`****循环或****`for...of`\*\***遍历**
