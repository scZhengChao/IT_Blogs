# 如何让 var \[a, b] = {a: 1, b: 2} 解构赋值成功？

## 目录

- [前言](#前言)
- [思路](#思路)
  - [错误思路](#错误思路)
  - [正确解题思路](#正确解题思路)

# 前言

这是一道字节面试题，大家第一眼看到这个面试题的时候，是不是脑瓜子嗡嗡的？有一种熟悉又陌生的感觉？我当时也一样的😭😭😭

在 JavaScript 中，解构赋值语法的左侧是一个数组，而右侧则应该是一个具有迭代器接口的对象（如数组、Map、Set等）。因此，将对象 `{a: 1, b: 2}` 解构赋值给 `[a, b]` 会导致语法错误，可偏偏面试官要求我们让这个解构赋值表达式成立，真是有苦说不出的感受啊！！！

# 思路

## 错误思路

既然将一个对象解构赋值给数组，是一个语法错误，那我们直接把这个解构语法变为对象的解构赋值语法不就好了。直接改成`var { a, b } = { a: 1, b: 2 };` 如果这样做的话，哈哈哈哈哈哈，恭喜你面试结束了。

所以我们得好好想清楚，这可是一个字节的面试题，它的考点可不是这么显而易见的。

## 正确解题思路

我们首先来看看报错是什么样的：

> var \[a, b] = {a: 1, b: 2}
> TypeError: {(intermediate value)(intermediate value)} is not iterable

这个错误是个类型错误，并且是对象有问题，因为对象是一个不具备迭代器属性的数据结构。所以我们可以知道，这个面试题就是考验我们对于迭代器属性的认识，我们再来个场景加深下理解。

```javascript 
let arr = [1, 2, 3]
let obj = {
    a: 1,
    b: 2,
    c: 3
}
for(let item of arr){
    console.log(item)
}
for(let item of obj){
    console.log(item)
}

```


我们知道`for of` 只能遍历具有迭代器属性的，在遍历数组的时候会打印出`1 2 3`，遍历对象时会报这样的一个错误`TypeError: obj is not iterable`，那么数组上的迭代器属性究竟是什么样的呢，我们来看一看。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bea8e2e12878425f860abe7c24a5cc80~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=483\&h=1219\&s=116234\&e=png\&b=ffffff)

我们可以在最下面发现，数组原型上有`Symbol.iterator`这样一个属性，这个属性显然是从`Array`身上继承到的，并且这个属性的值是一个函数体，如果我们调用一下这个函数体会怎么样？我们打印来看看

```javascript 
console.log(arr.__proto__[Symbol.iterator]());
// Object [Array Iterator] {}

```


**最重要的点来了**🔥🔥🔥🔥

它返回的是一个对象类型，并且是一个迭代器对象！！！所以一个可迭代对象的基本结构是这样的：

```javascript 
interable
{
    [Symbol.iterator]: function () {
        return 迭代器 (可通过next()就能读取到值)
    }
}

```


我们可以得出只要一个数据结构身上，具有`[Symbol.iterator]`这样一个属性，且值是一个函数体，可以返回一个迭代器的话，我们就称这个数据结构是可迭代的。

这时候我们回到面试题之中，面试官要我们让 `var [a, b] = {a: 1, b: 2}` 这个等式成立，那么有了上面的铺垫，我们可以知道，我们接下来的操作就是：人为的为对象打造一个迭代器出来，也就是让对象的隐式原型可以继承到迭代器属性，我们可以先这样做：

```javascript 
Object.prototype[Symbol.iterator] = function(){

}

var [a, b] = {a: 1, b: 2}
console.log(a,b);

```


这样的话，报错就改变了，变成：

> TypeError: Result of the Symbol.iterator method is not an object

接下来，我们知道`var [a, b] = [1, 2]`这是肯定没有问题的，所以我们可以将对象身上的迭代器，打造成和数组身上的迭代器（`arr[Symbol.iterator]`）一样，代码如下：

```javascript 
Object.prototype[Symbol.iterator] = function(){
    // 使用 Object.values(this) 方法获取对象的所有值，并返回这些值的迭代器对象
    return Object.values(this)[Symbol.iterator]()
}

```


这段代码是将 `Object.prototype` 上的 `[Symbol.iterator]` 方法重新定义为一个新的函数。新的函数通过调用 `Object.values(this)` 方法获取对象的所有值，并返回这些值的迭代器对象。

通过这个代码，我们可以使得任何 JavaScript 对象都具有了迭代能力。例如，对于一个对象 `obj`，我们可以直接使用 `for...of` 循环或者 `...` 操作符来遍历它的所有值。
