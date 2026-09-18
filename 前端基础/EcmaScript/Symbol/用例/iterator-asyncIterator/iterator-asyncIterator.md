# iterator/asyncIterator

## 目录

- [Symbol是什么？](#Symbol是什么)
- [Symbol的作用是什么？](#Symbol的作用是什么)
- [Symbol.iterator](#Symboliterator)
  - [那什么是迭代器呢？](#那什么是迭代器呢)
  - [Symbol.iterator是如何实现遍历的呢？](#Symboliterator是如何实现遍历的呢)
- [Symbol.asyncIterator](#SymbolasyncIterator)
  - [那Symbol.asyncIterator是如何实现异步迭代的呢？](#那SymbolasyncIterator是如何实现异步迭代的呢)

## Symbol是什么？

symbol是[ES6](https://link.juejin.cn?target=https://www.w3cschool.cn/escript6/escript6-827l37er.html "ES6")标准中新增的一种基本数据类型，symbol 的值是通过 Symbol()函数返回的，每一个 symbol 的值都是唯一的，即使传入相同的描述值。

注：Symbol 函数不允许通过 new 的方式调用

## Symbol的作用是什么？

因为每一个 symbol 的值都是唯一的，所以不会出现重复的现象，所以symbol 类型的值可以作为对象的属性[标识符](https://link.juejin.cn?target=https://zhuanlan.zhihu.com/p/391452024 "标识符")使用。

## Symbol.iterator

> **Symbol.iterator** 为每一个对象定义了默认的迭代器。该迭代器可以被 [for...of](https://link.juejin.cn?target=https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of "for...of") 循环使用，当我们需要遍历一个对象的时候，iterator函数就会被调用。

### 那什么是迭代器呢？

> `迭代器`就是为**实现对不同集合进行统一遍历操作的一种机制，**

在`es6`中有三类结构生来就具有Iterator属性：数组、类数组对象、Map和Set结构。

### Symbol.iterator是如何实现遍历的呢？

我们用代码模拟一下

```typescript 
let obj = {
    data: [],
    [Symbol.iterator]() {
        const self = this;
        let index = 0;
        return {
            next() {
                if (index < self.data.length) {
                    return {
                        value: self.data[index++],
                        done: false
                    };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
};

```


从上面的代码可以看出，我们的Symbol.iterator会返回一个对象，这个对象就是一个遍历器对象，而作为遍历器对象，其必须具备的特征就是必须具备next()方法。

## Symbol.asyncIterator

> Symbol.asyncIterator 符号用于标识一个异步迭代器，作用与 Symbol.iterator 相同，但产生的值期待为 Promise 实例，该异步迭代器被 for await...of 使用.

### 那Symbol.asyncIterator是如何实现异步迭代的呢？

```typescript 
let obj = {
    data: [],
    [Symbol.asyncIterator]() {
        const self = this;
        let index = 0;
        return {
            next() {
                if (index < self.data.length) {
                    return {
                        value: Promise.resolve(i++),
                        done: false
                    };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
};

```


我们的`Symbol.asyncIterator`和`Symbol.iterator`一样都会返回一个对象，一个遍历器对象，同样在`Symbol.asyncIterator`里也有有一个`next()`方法，不同的是`Symbol.asyncIterator`里面返回的value是一个异步的Promise.resolve(i++)。执行的是异步的迭代。
