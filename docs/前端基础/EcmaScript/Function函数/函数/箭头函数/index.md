# 箭头函数

## 目录

- [判断是否箭头函数](#判断是否箭头函数)

* **箭头函数体内的this对象，就是定义时所在的对象（固定了），而不是使用时所在的对象**
* **function声明的函数this对象指向的是****函数使用时所在的对象****，所以a.y()输出a对象而c()输出window。**
* 箭头函数不能作为构造函数使用，也不能使用new关键字(因为箭头函数**没有自己的this，它的this其实是继承了外层执行环境中的this，且this指向永远不会改变,作为构造函数其的this要是指向创建的新对象**)。&#x20;
* .call、apply、bind 并不会影响其 this 的指向。 只传入了一个参数，对 this 并没有影响。
* 箭头函数没有原型`prototype`，没有`constructor`
* 不绑定`arguments`；用rest参数...解决
* 箭头函数不能当作 `Generator `函数，不能使用 yield 关键字。&#x20;

> 构造函数是通过 new 关键字来生成对象实例，生成对象实例的过程也是通过构造函数给实例绑定 this 的过程，而箭头函数没有自己的 this。因此不能使用箭头作为构造函数，也就不能通过 new 操作符来调用箭头函数。

## 判断是否箭头函数

利用没有prototype 这点

```typescript 
function isArrowFunction(fn){
    return Object.prototype.toString.call(fn).slice(8).replace(']','') === 'Function' && fn.prototype === undefined
}
```
