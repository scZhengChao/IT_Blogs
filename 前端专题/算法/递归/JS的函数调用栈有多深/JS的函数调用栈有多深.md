# JS的函数调用栈有多深

## 目录

- [1. 计算方法](#1-计算方法)
- [2. ECMAScript 6中尾递归优化](#2-ECMAScript-6中尾递归优化)
- [3. 亮点评论](#3-亮点评论)

**译者按：** 有时候会遇到Maximum call stack size exceeded的问题，本文教你stack size的计算方法。

- 原文: [The maximum call stack size](https://link.zhihu.com/?target=http://2ality.com/2014/04/call-stack-size.html "The maximum call stack size")
- 译者: [Fundebug](https://link.zhihu.com/?target=https://fundebug.com/ "Fundebug")

**为了保证可读性，本文采用意译而非直译。另外，本文版权归原作者所有，翻译仅用于学习。**

如果你写了一个一直调用自身的死循环，那么恭喜你，很快就可以看到报错：Uncaught RangeError: Maximum call stack size [exceeded](https://zhida.zhihu.com/search?content_id=7435548\&content_type=Article\&match_order=2\&q=exceeded\&zhida_source=entity "exceeded")。那么这个call stack size有多少呢？

## **1. 计算方法**

如下的方法可以为你计算出你使用的JavaScript引擎可以支持多深的调用(由Ben Alman的[一段代码](https://link.zhihu.com/?target=https://gist.github.com/cowboy/10262391 "一段代码")获得灵感)：

```text 
function computeMaxCallStackSize() {
        try {
            return 1 + computeMaxCallStackSize();
        } catch (e) {
            // Call stack overflow
            return 1;
        }
    }
```


运行得到如下三个结果：

- [Node.js: 11034](<Node.js: 11034> "Node.js: 11034")
- [Firefox: 50994](<Firefox: 50994> "Firefox: 50994")
- [Chrome: 10402](<Chrome: 10402> "Chrome: 10402")

这些数字代表了什么呢？Mr.Aleph告诉我在V8，可调用的层数基于两个方面：1. 栈的大小；2. 每一栈帧的大小(用于记录函数参数和[局部变量](https://zhida.zhihu.com/search?content_id=7435548\&content_type=Article\&match_order=1\&q=局部变量\&zhida_source=entity "局部变量"))。你可以在`computeMaxCallStackSize`声明局部变量来测试，你会发现数字变小。

```javascript 
var i = 0;
function inc() {
  i++;
  inc();
}
    
try {
  inc();
}
catch(e) {
  // The StackOverflow sandbox adds one frame that is not being counted by this code
  // Incrementing once manually
  i++;
  console.log('Maximum stack size is', i, 'in your current browser');
}

```


## **2. ECMAScript 6中**[**尾递归**](https://zhida.zhihu.com/search?content_id=7435548\&content_type=Article\&match_order=1\&q=尾递归\&zhida_source=entity "尾递归")**优化**

ECMAScript 6支持尾递归优化：如果一个函数的最后一个操作是[函数调用](https://zhida.zhihu.com/search?content_id=7435548\&content_type=Article\&match_order=1\&q=函数调用\&zhida_source=entity "函数调用")，**那么将会用“跳转”而不是“子调用”。也就是说如果你将**\*\*`computeMaxCallStackSize`\*\***重写成如下形式，在ES6的严格模式下，就会一直运行了。**

```javascript 
function computeMaxCallStackSize(size) {
       size = size || 1;
       return computeMaxCallStackSize(size + 1);
   }

```


## **3. 亮点评论**

- [Andrei: “ECMAScript 6”版本的代码根本跑不通。虽然size会被更改，但是最终并没有值返回。](<Andrei: “ECMAScript 6”版本的代码根本跑不通。虽然size会被更改，但是最终并没有值返回。> "Andrei: “ECMAScript 6”版本的代码根本跑不通。虽然size会被更改，但是最终并没有值返回。")
- 回复Andrei: 有趣！你不能用这段代码去计算stack size。在ES6下，这段代码会一直运行，因此不会返回数据。在其它情况下，会返回RangeError。为了使其工作，我把代码重写了一下：

```javascript 
var computeMaxCallStackSize = (function() {
  return function() {
    var size = 0;
    function cs() {
      try {
        size++;
        return cs();
      } catch(e) {
        return size + 1;
      }
    }
    return cs();
  };
}());

```
