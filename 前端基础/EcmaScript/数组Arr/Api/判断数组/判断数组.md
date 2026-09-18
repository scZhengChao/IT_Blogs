# 判断数组

**通过instanceof判断**

```bash 
let a = [];
a instanceof Array;// true
let b ={};
b instanceof Array; // false
// instanceof 运算符检测Array.prototype属性是否存在于变量a的原型链上
// 显然a是一个数组，拥有Array-prototype属性，所以为true
```


**通过constructor判断**

```bash 
let a = [7,8,9]；
a. constructor === Array; // true
```


**.通过Object.prototype.toString.call()判断**

```bash 
let a = [7,8,9];
Object.prototype.tostring.call(a) 二二二 [Object Array]'； // true
```


**通过Array.isArray()判断**

```bash 
let a [7,8,9]；
Array.isArray(a)；// true
 注意；数组原型是数组
 
Array.isArray( Array.prototype ). // true


```
