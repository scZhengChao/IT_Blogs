# 比较运算

## 目录

- [equals](#equals)
- [浅比较](#浅比较)
  - [使用equals进行深度比较](#使用equals进行深度比较)
  - [实现浅比较的几种方法](#实现浅比较的几种方法)
    - [方法1：使用toPairs和equals](#方法1使用toPairs和equals)
    - [方法2：比较键和值](#方法2比较键和值)
    - [方法3：使用whereEq进行属性值比较](#方法3使用whereEq进行属性值比较)
  - [注意事项](#注意事项)

`gt`：判断第一个参数是否大于第二个参数。

```javascript 

R.gt(2)(1) // true
R.gt('a')('z') // false
```


`gte`：判断第一个参数是否大于等于第二个参数。

```javascript 
R.gte(2)(2) // true
R.gte('a')('z') // false

```


`lt`：判断第一个参数是否小于第二个参数

```javascript 
R.lt(2)(1) // false
R.lt('a')('z') // true

```


`lte`：判断第一个参数是否小于等于第二个参数。

```javascript 
R.lte(2)(2) // true
R.lte('a')('z') // true

```


`eqBy`：比较两个值传入指定函数的运算结果是否相等。

```javascript 

R.eqBy(Math.abs, 5)(-5)
// true


```


# `equals`

深比较

```javascript title="比较两个值是否相等（支持对象的比较）"
R.equals(1)(1) // true
R.equals(1)('1') // false
R.equals([1, 2, 3])([1, 2, 3]) // true

var a = {}; 
a.v = a;
var b = {}; 
b.v = b;
R.equals(a)(b)
// true


```


# 浅比较

在 Ramda 中，可以使用`equals`函数进行浅比较（shallow equality）来判断两个对象是否相等。Ramda 的`equals`函数实际上执行的是深度比较，但如果你只想进行浅比较，可以结合其他函数来实现。

## 使用`equals`进行深度比较

```javascript 
const R = require('ramda');

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };

console.log(R.equals(obj1, obj2)); // true - 深度比较
```


## 实现浅比较的几种方法

### 方法1：使用`toPairs`和`equals`

```javascript 
const shallowEquals = (a, b) => 
  R.equals(R.toPairs(a), R.toPairs(b));

const obj1 = { a: 1, b: 2 };
const obj2 = { a: 1, b: 2 };
const obj3 = { a: 1, b: { c: 2 } };

console.log(shallowEquals(obj1, obj2)); // true
console.log(shallowEquals(obj1, obj3)); // false (因为结构不同)
```


### 方法2：比较键和值

```javascript 
const shallowEquals = (a, b) => 
  R.and(
    R.equals(R.keys(a), R.keys(b)),
    R.all(key => a[key] === b[key], R.keys(a))
  );

```


### 方法3：使用`whereEq`进行属性值比较

```javascript 
const shallowEquals = (a, b) => 
  R.and(
    R.equals(R.keys(a), R.keys(b)),
    R.whereEq(a)(b)
  );

```


## 注意事项

1. 浅比较只比较对象的第一层属性，不会递归比较嵌套对象
2. 对于数组、日期等特殊对象，可能需要特殊处理
3. Ramda 的`equals`已经非常高效，大多数情况下直接使用它即可

如果你确实需要浅比较，第一种方法 (`toPairs`+`equals`) 通常是最简洁的实现方式。
