# 防止对象被修改

## 目录

- [1. 使用Object.preventExtensions()](#1-使用ObjectpreventExtensions)
- [2. 使用Object.seal()](#2-使用Objectseal)
- [1. 使用Object.freeze()](#1-使用Objectfreeze)
- [3. 使用Object.defineProperty()或Object.defineProperties()](#3-使用ObjectdefineProperty或ObjectdefineProperties)
- [4. 使用 Proxy 创建只读代理](#4-使用-Proxy-创建只读代理)
- [使用不可变数据结构库](#使用不可变数据结构库)
- [注意事项](#注意事项)

## 1. 使用`Object.preventExtensions()`

**防止****给对象****添加新属性**\*\*，但****允许修改或删除****现有属性。\*\*

```javascript 
const obj = { a: 1 };
Object.preventExtensions(obj);

obj.b = 2; // 静默失败或在严格模式下抛出TypeError
obj.a = 3; // 仍然可以修改
delete obj.a; // 仍然可以删除
```


## 2. 使用`Object.seal()`

比`freeze`稍宽松，**允许修改现有属性但****不能添加/删除属性：**

```javascript 
const obj = { a: 1, b: 2 };
Object.seal(obj);

obj.a = 3; // 允许修改
console.log(obj.a); // 输出: 3

obj.c = 3; // 无法添加新属性
delete obj.a; // 无法删除属性
```


## 1. 使用`Object.freeze()`

这是最严格的方法，它会阻止对象的所有修改：

最高级别的保护，防止：

- 添加新属性
- 删除现有属性
- 修改现有属性的值
- 修改现有属性的可枚举性、可配置性或可写性

```javascript 
const obj = { a: 1, b: 2 };
Object.freeze(obj);

obj.a = 3; // 静默失败，严格模式下会抛出错误
console.log(obj.a); // 输出: 1

obj.c = 3; // 无法添加新属性
delete obj.a; // 无法删除属性
```


> 只能冻结对象本身；**不能阻止复写**
> 是个浅层冻结；**不能递归冻结所有的字**

## 3. 使用`Object.defineProperty()`或`Object.defineProperties()`

可以**精细控制每个属性的可写性：**

可以单独设置属性的`writable`和`configurable`为`false`。

```javascript 
const obj = {};
Object.defineProperty(obj, 'a', {
  value: 1,
  writable: false,
  enumerable: true,
  configurable: false
});

obj.a = 2; // 静默失败，严格模式下会抛出错误
console.log(obj.a); // 输出: 1
```


## 4. 使用 Proxy 创建只读代理

```javascript 
const obj = { a: 1, b: 2 };
const readOnlyProxy = new Proxy(obj, {
  get(target, prop) {
    return target[prop];
  },
  set() {
    throw new Error('Object is read-only');
  },
  deleteProperty() {
    throw new Error('Object is read-only');
  }
});

readOnlyProxy.a = 3; // 抛出错误



const obj = { a: 1 };
const immutableObj = new Proxy(obj, {
  set() { return false; },
  deleteProperty() { return false; },
  defineProperty() { return false; },
  preventExtensions() { return true; }
});

immutableObj.a = 2; // 静默失败
delete immutableObj.a; // 静默失败

```


## 使用不可变数据结构库

如 Immutable.js、Immer 等，它们提供了不可变的数据结构。

```javascript 
// 使用Immer示例
import { produce } from 'immer';

const baseState = { a: 1 };
const nextState = produce(baseState, draft => {
  draft.a = 2; // 只在副本上修改
});
```


## 注意事项

1. 这**些方法都是浅层的，对于嵌套对象需要递归应用**
2. 在**严格模式下，尝试修改会抛出错误**，而非严格模式下会静默失败
3. 一旦**应用了这些方法，就无法撤销**（特别是`preventExtensions`、`seal`和`freeze`）
4. **这些方法都不能防止原型链被修改**
