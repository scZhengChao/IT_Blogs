# Object.prototype.toString.call

## 目录

- [第一种](#第一种)
- [第二种](#第二种)
- [第三种](#第三种)
- [自定义类型](#自定义类型)

![](image_sawD-C3rC6.png)

```typescript 
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
```


# 第一种

```typescript 
function typeOf(any) {
    return Object.prototype.toString.call(any).split(' ')[1].slice(0, -1)
}
```


# 第二种

```typescript 
// 提取原始数据类型
function typeTest(data, e) {  
  var n = Object.prototype.toString.call(data).substring(8).replace("]", "");
  // [object String]  
  // String Number Boolean Function Null Undefined Object Array Date RegExp Error  Symbol PromiseSet  
  return e ? n === e : n
}
```


# 第三种

```typescript 
// 提取原始数据类型
function typeTest(data, e) {  
  var n = Object.prototype.toString.call(data).slice(8, -1);
  // [object String]  
  // String Number Boolean Function Null Undefined Object Array Date RegExp Error  Symbol PromiseSet  
  return e ? n === e : n
}
```


# 自定义类型

[从构建产物洞悉模块化原理](从构建产物洞悉模块化原理.md "从构建产物洞悉模块化原理")

这里 `toString()` 方法能识别 `Map`、`GeneratorFunction`、`Promise`这些类型是因为浏览器引擎为它们设置好了 **`toStringTag`** 标签，那我们该如何设置自己想要的类型标签呢？

引自官方介绍：**`Symbol.toStringTag`** 是一个内置 `symbol`，它通常作为对象的属性键使用，对应的**属性值应该为字符串类型**，这个字符串用来表示该**对象的自定义类型标签**，通常只有内置的 [Object.prototype.toString()](https://link.juejin.cn?target=https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString "Object.prototype.toString()") 方法会去读取这个标签并把它包含在自己的返回值里。

我们来试一试：通过 [Object.defineProperty](https://link.juejin.cn/?target=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty "Object.defineProperty") 在对象上定义 toStringTag 属性：

```javascript 
const obj = {};

//定义属性
Object.defineProperty(obj, Symbol.toStringTag, { value: "Module" });

//查看自定义类型
console.log(Object.prototype.toString.call(obj)) //'[object Module]'改变了类型为Module
```
