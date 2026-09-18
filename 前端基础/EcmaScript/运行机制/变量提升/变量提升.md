# 变量提升

## 目录

- [神鬼莫测之变量提升](#神鬼莫测之变量提升)
- [自动提升为全局变量](#自动提升为全局变量)
- [意外全局变量](#意外全局变量)
- [临时死区](#临时死区)
- [申明变量:](#申明变量)
  - [解构赋值:](#解构赋值)

# **神鬼莫测之变量提升**

```javascript 
var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
      var name = 'Jack';
      console.log('Goodbye ' + name);
    } else {
      console.log('Hello ' + name);
    }
})();

// A. Goodbye Jack
// B. Hello Jack
// C. Hello undefined
// D. Hello World

```


答案是A。看如下MDN官方文档的解释：

> 在 JavaScript中，\*\* functions 和 variables 会被提升。变量提升是JavaScript将声明移至作用域 scope (全局域或者当前函数作用域) 顶部的行为。\*\*

> 这意味着你可以在**声明一个函数或变量之前引用它**，或者可以说：**一个变量或函数可以在它被引用之后声明。**

# **自动提升为全局变量**

```javascript 
(function() {
  var x = y = 1;
})();
console.log(y);
console.log(x);

// A. 1, 1
// B. error, error
// C. 1, error
// D. other

```


答案是C。很经典的例子，在函数中没**有用 var 声明变量 y，所以 y 会被自动创建在全局变量 window下面**，所以在函数外面也可以访问得到。而 x 由于被 var 声明过，所以在函数外部是无法访问的。

# 意外全局变量

以下代码段中用于运算 **typeof a**和 **typeof b**的内容：

```vue 
 function foo() {
  let a = b = 0;
  a++;
  return a;
}

foo();
typeof a; // undefined
typeof b; // => number 
```


# 临时死区

如果在声明前访问 myVar 和 myConst，会发生什么情况？

```vue 
 myVar;   // => undefined
myConst; // =>  报错；死区

var myVar = 'value';
const myConst = 3.14;
```


**提升和临时死区是**影响`JavaScript`变量生命周期的两个重要概念。

         在声明之前访问 myVar 的结果为 undefined。在初始化之前，**提升的 var 变量具有 undefined 的值**。

&#x20;       然而，在声明行之前访问**myConst 会引发 ****ReferenceError****。****let/const****变量处于临时死区，直到声明行 ****const myConst = 3.14****。**

# 申明变量:

**变量提升方面**：

- var声明的变量存在变量提升，即变量可以在声明之前调用，值为undefined。 &#x20;
- let和const不存在变量提升问题(注意这个‘问题’后缀，其实是有提升的，**只不过是let和const具有一个暂时性死区的概念**，即没有到其赋值时，之前就不能用)，即它们\*\*所声明的变量一定要在声明后使用，否则报错。 \*\*

**块级作用域方面**：

- var不存在块级作用域 **,let和const存在块级作用域  {} 内变量会保存**

**声明方面**：

- var允许重复声明变量
- let和const在同一作用域不允许重复声明变量。
- 其中const声明一个只读的常量(因为如此，其声明时就一定要赋值，不然报错)。一旦声明，常量的值就不能改变。&#x20;

## 解构赋值:

```javascript 
  var [a,b,c] =[1,2,3];
 var {name,age,sex} = {name:'zc',age:'12',sex:'asf'}
```
