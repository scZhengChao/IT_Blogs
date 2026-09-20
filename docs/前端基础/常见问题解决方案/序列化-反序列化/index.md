# 序列化/反序列化

## 目录

- [序列化 JSON.stringify](#序列化-JSONstringify)
  - [enumerable 是否枚举](#enumerable-是否枚举)
  - [getOwnPropertyNames](#getOwnPropertyNames)
  - [JSON.stringify() 语法](#JSONstringify-语法)
  - [JSON.stringify的性能瓶颈](#JSONstringify的性能瓶颈)
    - [JSON.stringify 与遍历对比](#JSONstringify-与遍历对比)
    - [定制化更快的JSON.stringify](#定制化更快的JSONstringify)
  - [更快的fast-json-stringify](#更快的fast-json-stringify)
    - [语法](#语法)
    - [scheme](#scheme)
    - [总结](#总结)
- [反序列化 JSON.parse](#反序列化-JSONparse)

# 序列化 JSON.stringify

JSON.stringify()将值转换为相应的JSON格式：

- 转换值如果有toJSON()方法，该方法定义什么值将被序列化。
- 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
- 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
- undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。函数、undefined被单独转换时，会返回undefined，如JSON.stringify(function(){}) or JSON.stringify(undefined).
- 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
- 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
- Date日期调用了toJSON()将其转换为了string字符串（同Date.toISOString()），因此会被当做字符串处理。
- NaN和Infinity格式的数值及null都会被当做null。
- 其他类型的对象，包括Map/Set/weakMap/weakSet，仅会序列化可枚举的属性。

仅会序列化可枚举的属性”，是什么意思呢？众所周知，**在 JS 的世界中一切皆对象**，对象有着不同的属性，**这些属性是否可枚举，我们用 enumerable 来定义.**

## enumerable 是否枚举

对象属性的 enumerable

举个例子，我们用 `obj = { a: 1, b: 2, c: 3 }` 来定义一个对象，然后设置它的 `c` 属性为“不可枚举”，看看效果会如何：

首先看处理前的效果：

```javascript 
const obj = {a: 1,b: 2,c: 3};
JSON.stringify(obj)
// '{"a":1,"b":2,"c":3}'
```


再看处理后的效果：

```javascript 
const obj = { a: 1, b: 2, c: 3 }
 
 Object.defineProperty(obj, 'c', {
  value: 3,
  enumerable: false
})
  
JSON.stringify(obj)
 
 // => "{"a":1,"b":2}"
```


可以看到，在对 c 属性设置为不可枚举以后，JSON.stringify() 便不再对其进行序列化。

## getOwnPropertyNames

我们把问题再深入一些，有没有办法能够**获取一个对象中包含不可枚举在内的所有属性**呢？答案是使用 Object.getOwnPropertyNames() 方法。

依然是刚刚被改装过的 obj 对象，我们来看看它所包含的所有属性：

```javascript 
Object.getOwnPropertyNames(obj)
 
// => ["a", "b", "c"]
```


不可枚举的 `c` 属性也被获取到了！

用同样的方法，我们来看看一个 Error 都包含哪些属性：

```javascript 
const err = new Error('This is an error')
Object.getOwnPropertyNames(err)
  
// => ["stack", "message"]
```


可以看到，Error 包含了 `stack` 和 `message` 两个属性，它们均可以使用点运算符 `.` 从 `err` 实例里面拿到。

既然我们已经能够获取 Error 实例的不可枚举属性及其内容，那么距离使用 JSON.stringify() 序列化 Error 也已经不远了！

## JSON.stringify() 语法

JSON.stringify() 可以接收三个参数：

语法: JSON.stringify(value\[, replacer \[, space]])

value

- 将要序列化成 一个JSON 字符串的值。

replacer 可选

- 如果该参数是一个函数，则在序列化过程中，**被序列化的值的每个属性都会经过该函数的转换和处理**；
- 如果该参数是一个数组，则只有包含在这个**数组中的属性名才会被序列化到最终的 JSON 字符串中**；
- 如果该参数为null或者未提供，则对象所有的属性都会被序列化。

space 可选

- 指定缩进用的空白字符串，用于美化输出（pretty-print）；
- 如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；
- 如果该参数为字符串(字符串的前十个字母)，该字符串将被作为空格；
- 如果该参数没有提供（或者为null）将没有空格。

&#x20;依然使用上文的 `obj` 为例子：

```javascript 
const obj = { a: 1, b: 2, c: 3 }
 
Object.defineProperty(obj, 'c', {
  value: 3,
  enumerable: false
})
 
JSON.stringify(obj, ['a', 'c'])
 
// => "{"a":1,"c":3}"
```


&#x20;可以看到，我们在 **`replacer`**\*\* 中指定了要序列化 ****`a`**** 和 ****`c`****属性 **，输出结果也是只有这两个属性的值，** 且不可枚举的****`c`**** 属性也被序列化了！\*\*守得云开见月明，Error 对象被序列化的方法也就出来了：

```javascript 
const err = new Error('This is an error')

console.log(JSON.stringify(err, Object.getOwnPropertyNames(err), 'tttttttt'))
```


![](./assets/image/image_CaYqH4gBUd.png)

## JSON.stringify的性能瓶颈

由于 JavaScript 是动态语言，它的变量类型只有在运行时才能确定，所以 JSON.stringify 在执行过程中要进行大量的类型判断，对不同类型的键值做不同的处理。由于不能做静态分析，执行过程中的类型判断这一步就不可避免，而且还需要一层一层的递归，循环引用的话还有爆栈的风险。

我们知道，JSON.string的底层有两个非常重要的步骤：

- **类型判断**
- **递归遍历**

既然是这样，我们可以先来对比一下JSON.stringify与普通遍历的性能，看看类型判断这一步到底是不是影响JSON.stringify性能的主要原因。

### JSON.stringify 与遍历对比

```typescript 
const obj1 = {}, obj2 = {}
for(let i = 0; i < 1000000; i++) {
    obj1[i] = i
    obj2[i] = i
}

function fn1 () {
    console.time('jsonStringify')
    const res = JSON.stringify(obj1) === JSON.stringify(obj2)
    console.timeEnd('jsonStringify')
}

function fn2 () {
    console.time("for");
    const res = Object.keys(obj1).every((key) => {
        if (obj2[key] || obj2[key] === 0) {
          return true;
        } else {
          return false;
        }
      });
    console.timeEnd("for");
}
fn1()
fn2()


```


![](./assets/image/image_tKzn5c91Ac.png)

从结果来看，两者的性能差距在4倍左右，那就证明`JSON.string`的类型判断这一步还是非常耗性能的。如果JSON.stringify能够跳过类型判断这一步是否对类型判断有帮助呢？

### 定制化更快的JSON.stringify

基于上面的猜想，我们可以来尝试实现一下：

现在我们有下面这个对象

```typescript 
const obj = {
  name: '南玖',
  hobby: 'fe',
  age: 18,
  chinese: true
}
//上面这个对象经过JSON.stringify处理后是这样的
JSON.stringify(obj)
// {"name":"南玖","hobby":"fe","age":18,"chinese":true}

```


现在假如我们已经提前知道了这个对象的结构

- **键名不变**
- **键值类型不变**

这样的话我们就可以定制一个更快的JSON.stringify方法

```typescript 
function myStringify(obj) {
    return `{"name":"${obj.name}","hobby":"${obj.hobby}","age":${obj.age},"chinese":${obj.chinese}}`
}

console.log(myStringify(obj) === JSON.stringify(obj))  // true
```


这样也能够得到**JSON.stringify一样的效果，前提是你已经知道了这个对象的结构。**

事实上，这是许多`JSON.stringify`加速库的通用手段：

- 需要先确定对象的结构信息
- 再根据结构信息，为该种结构的对象创建“定制化”的`stringify`方法
- 内部实现依然是这种字符串拼接

## 更快的fast-json-stringify

> fast-json-stringify 需要[JSON Schema Draft 7](https://link.juejin.cn?target=https://json-schema.org/specification-links.html#draft-7 "JSON Schema Draft 7")输入来生成快速`stringify`函数。

这也就是说`fast-json-stringify`这个库是用来给我们生成一个定制化的stringily函数，从而来提升`stringify`的性能。

这个库的GitHub简介上写着**比 JSON.stringify() 快 2 倍**，其实它的优化思路跟我们上面那种方法是一致的，也是一种定制化`stringify`方法。

### 语法

```typescript 
const fastJson = require('fast-json-stringify')
const stringify = fastJson(mySchema, {
  schema: { ... },
  ajv: { ... },
  rounding: 'ceil'
})
```


- `schema`: \$ref 属性引用的外部模式。
- `ajv`: [ajv v8 实例](https://link.juejin.cn?target=https://ajv.js.org/options.html "ajv v8 实例")对那些需要`ajv`.
- `rounding`: 设置当`integer`类型不是整数时如何舍入。
- `largeArrayMechanism`：设置应该用于处理大型（默认情况下`20000`或更多项目）数组的机制

### scheme

这其实就是我们上面所说的定制化对象结构，比如还是这个对象：

```typescript 
const obj = {
  name: '南玖',
  hobby: 'fe',
  age: 18,
  chinese: true
}
```


它的JSON scheme是这样的：

```typescript 
{
  type: "object",
  properties: {
    name: {type: "string"},
    hobby: {type: "string"},
    age: {type: "integer"},
    chinese: {type: 'boolean'}
  },
  required: ["name", "hobby", "age", "chinese"]
}
```


**当我们可以提前确定一个对象的结构时，可以将其定义为一个 Schema，这就相当于提前告诉 stringify 函数，需序列化的对象的数据结构，这样它就可以不必再在运行时去做类型判断，这就是这个库提升性能的关键所在。**

### 总结

事实上`fast-json-stringify`只是通过静态的结构信息将优化与分析前置了，通过开发者定义的`scheme`内容可以提前知道对象的数据结构，然后会生成一个`stringify`函数供开发者调用，该函数内部其实就是做了字符串的拼接。

- 开发者定义 Object 的 `JSON scheme`
- stringify 库根据 scheme 生成对应的模版方法，模版方法里会对属性与值进行字符串拼接
- 最后开发者调用生成的stringify 方法

# 反序列化 JSON.parse

```javascript 
 //json.parse 兼容报错（这个一旦报错，有可能阻塞程序）
function parse(a) {  // json.parse
    if (!a || "string" != typeof a) {  // 如果a不存在或者 不是string
      return a;
    }
    var d = null;
    try {
      d = JSON.parse(a);
    } catch (n) {
    }
    return d;
},
```
