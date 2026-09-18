# 如何解决前端常见的竞态问题

## 目录

- [什么是竞态问题](#什么是竞态问题)
- [取消过期请求](#取消过期请求)
  - [XMLHttpRequest 取消请求](#XMLHttpRequest-取消请求)
  - [fetch API 取消请求](#fetch-API-取消请求)
  - [axios 取消请求](#axios-取消请求)
  - [可取消的 promise](#可取消的-promise)
- [忽略过期请求](#忽略过期请求)
  - [封装指令式 promise](#封装指令式-promise)
  - [使用唯一 id 标识每次请求](#使用唯一-id-标识每次请求)
- [「取消」和「忽略」的比较](#取消和忽略的比较)
  - [「取消」更实际](#取消更实际)
  - [「忽略」更通用](#忽略更通用)
- [总结](#总结)

# 什么是竞态问题

> **竞态问题**，又叫**竞态条件**（race condition），它旨在描述一个系统或者进程的输出依赖于不受控制的事件出现顺序或者出现时机。
> 此词源自于两个信号试着彼此竞争，来影响谁先输出。

简单来说，竞态问题出现的原因是**无法保证**异步操作的完成**会按照他们开始时同样的顺序**。举个🌰：

- 有一个分页列表，快速地切换第二页，第三页；
- 先后请求 `data2 `与 `data3`，分页器显示当前在第三页，并且进入 `loading`；
- 但由于网络的不确定性，先发出的请求不一定先响应，所以有可能 `data3 `比 `data2 `先返回；
- 在 `data2 `最终返回后，分页器指示当前在第三页，但展示的是第二页的数据。

这就是竞态条件，在前端开发中，**常见于搜索，分页，选项卡等切换**的场景。

那么如何解决竞态问题呢？在以上这些场景中，我们很容易想到

**当发出新的请求时，取消掉上次请求即可。**

# 取消过期请求

## XMLHttpRequest 取消请求

`XMLHttpRequest`（XHR）是一个内建的浏览器对象，它允许使用 JavaScript 发送 HTTP 请求。

如果请求已被发出，可以使用 `abort()` 方法立刻中止请求。

```javascript 
const xhr= new XMLHttpRequest();

xhr.open('GET', 'https://xxx');
xhr.send();
    
xhr.abort(); // 取消请求
```


## fetch API 取消请求

`fetch `号称是 `AJAX `的替代品，出现于 `ES6`，它也可以发出类似 `XMLHttpRequest `的网络请求。

主要的区别在于 `fetch `使用了 `promise`，要中止 `fetch `发出的请求，需要使用 `AbortController`。

```javascript 
const controller = new AbortController();
const signal = controller.signal;

fetch('/xxx', {
  signal,
}).then(function(response) {
  //...
});

controller.abort(); // 取消请求

```


相比原生 API，大多项目都会选择 axios 进行请求。

## axios 取消请求

`axios `是一个 `HTTP `请求库，本质是对原生 `XMLHttpRequest `的封装后基于 `promise `的实现版本，因此 `axios `请求也可以被取消。

可以利用 `axios `的 `CancelToken API` 取消请求。

```javascript 
const source = axios.CancelToken.source();

axios.get('/xxx', {
  cancelToken: source.token
}).then(function (response) {
  // ...
  
});

source.cancel() // 取消请求

```


在 `cancel` 时，`axios `会在内部调用 `promise.reject()` 与 `xhr.abort()`。

所以我们**在处理请求错误时**，需要判断 `error `**是否是** `cancel `导致的，**避免与常规错误一起处理**。

```javascript 
axios.get('/xxx', {
  cancelToken: source.token
}).catch(function(err) { 
  if (axios.isCancel(err)) {
    console.log('Request canceled', err.message);
  } else {
    // 处理错误
  }
});

```


&#x20;      但 `cancelToken `从 `v0.22.0` 开始已被 axios 弃用。原因是基于实现该 API 的提案 [cancelable promises proposal](https://link.juejin.cn/?target=https://github.com/tc39/proposal-cancelable-promises "cancelable promises proposal") 已被撤销。

&#x20;      从 `v0.22.0` 开始，`axios `支持以 `fetch API `方式的 `AbortController `取消请求

```javascript 
const controller = new AbortController();

axios.get('/xxx', {
  signal: controller.signal
}).then(function(response) {
   //...
});

controller.abort() // 取消请求

```


同样，在处理请求错误时，也需要判断 `error `是否来自 `cancel`。

## 可取消的 promise

&#x20;     原生 promise 并不支持 cancel，但 cancel 对于异步操作来说又是个很常见的需求。所以社区很多仓库都自己实现了 promise 的 cancel 能力。

&#x20;    我们以`awesome-imperative-promise` 为例，来看看 cancel 的实现，它的 cancel 实现基于**指令式 promise，** 源码一共只有 40 行。

什么是指令式 promise？

&#x20;     我们普遍使用的 promise，它的 resolve/reject 只能在 new Promise 内部调用，而指令式 promise 支持在 promise 外部手动调用 resolve/reject 等指令。

通过它的用法能更好地理解何为指令式 promise：

```javascript 
import { createImperativePromise } from 'awesome-imperative-promise';

const { resolve, reject, cancel } = createImperativePromise(promise);

resolve("some value");
// or
reject(new Error());
// or
cancel();

```


**内部的 cancel 方法其实就是将 resolve，reject 设为 null，让 promise 永远不会 resolve/reject。**

> **一直没有 resolve 也没有 reject 的 Promise 会造成内存泄露吗？**
> 有兴趣的同学可以了解下[**这篇知乎**](https://link.juejin.cn/?target=https://www.zhihu.com/question/386595851 "这篇知乎")讨论，回答众说纷纭。
> 我个人认为，如果**没有保留对 promise 的引用，就不会造成内存泄露**。

回到 promise cancel，可以看到，虽然 API 命名为 cancel，但实际上没有任何 cancel 的动作，promise 的状态还是会正常流转，只是回调不再执行，被“**忽略**”了，所以看起来像被 cancel 了。

因此解决竞态问题的方法，除了「取消请求」，还可以「**忽略请求**」。

# 忽略过期请求

我们又有哪些方式来忽略过期的请求呢？

## 封装指令式 promise

利用指令式 `promise`，我们可以手动调用 `cancel API` 来忽略上次请求。

但是如果每次都需要手动调用，会导致项目中相同的模板代码过多，偶尔也可能忘记 `cancel`。

我们可以基于指令式 `promise `封装一个自动忽略过期请求的高阶函数 `onlyResolvesLast`。

**在每次发送新请求前，cancel 掉上一次的请求，忽略它的回调。**

```javascript 
function onlyResolvesLast(fn) {
  // 保存上一个请求的 cancel 方法
  let cancelPrevious = null; 

  const wrappedFn = (...args) => {
    // 当前请求执行前，先 cancel 上一个请求
    cancelPrevious && cancelPrevious();
    // 执行当前请求
    const result = fn.apply(this, args); 
    
    // 创建指令式的 promise，暴露 cancel 方法并保存
    const { promise, cancel } = createImperativePromise(result);
    cancelPrevious = cancel;
    
    return promise;
  };

  return wrappedFn;
}

```


以上就是 [github.com/slorber/awe…](https://link.juejin.cn/?target=https://github.com/slorber/awesome-only-resolves-last-promise/ "github.com/slorber/awe…")` `的实现。

只需要将 onlyResolvesLast 包装一下请求方法，就能实现自动忽略，减少很多模板代码。

```javascript 
const wrappedFn = onlyResolvesLast(fn);

wrappedFn(500).then(() => console.log(1));
wrappedFn(1000).then(() => console.log(2));
wrappedFn(100).then(() => console.log(3));

```


## 使用唯一 id 标识每次请求

除了指令式 promise，我们还可以给「请求标记 id」的方式来忽略上次请求。

具体思路是：

- 利用全局变量记录最新一次的请求 id
- 在发请求前，生成唯一 id 标识该次请求
- 在请求回调中，判断 id 是否是最新的 id，如果不是，则忽略该请求的回调

伪代码如下：

```javascript 
let fetchId = 0; // 保存最新的请求 id

const getUsers = () => {
  // 发起请求前，生成新的 id 并保存
  const id = fetchId + 1;
  fetchId = id;
  
  await 请求
  
  // 判断是最新的请求 id 再处理回调
  if (id === fetchId) {
    // 请求处理
  }
}

```


上面的使用方法也会在项目中产生很多模板代码，稍做封装后也能实现一套同样用法的 `onlyResolvesLast`：

```javascript 
function onlyResolvesLast(fn) {
  // 利用闭包保存最新的请求 id
  let id = 0;
  
  const wrappedFn = (...args) => {
    // 发起请求前，生成新的 id 并保存
    const fetchId = id + 1;
    id = fetchId;
    
    // 执行请求
    const result = fn.apply(this, args);
    
    return new Promise((resolve, reject) => {
      // result 可能不是 promise，需要包装成 promise
      Promise.resolve(result).then((value) => {
        // 只处理最新一次请求
        if (fetchId === id) { 
          resolve(value);
        }
      }, (error) => {
        // 只处理最新一次请求
        if (fetchId === id) {
          reject(error);
        }
      });
    })
  };
  
  return wrappedFn;
}

```


用法也一样，使用 `onlyResolvesLast` 包装一下请求方法，实现过期请求自动忽略。

而且，这样的实现不依赖指令式 promise，也更轻量。

# 「取消」和「忽略」的比较

## 「取消」更实际

&#x20;      如果请**求被「取消」了没有到达服务端，那么可以一定程度减轻服务的压力。**

&#x20;      但是取消请求也依赖底层的请求 API，比如 XMLHttpRequest 需要用 abort，而 fetch API 和 axios 需要用 AbortController。

## 「忽略」更通用

&#x20;    而「忽略」的方式，**不依赖请求的 API**，更加通用，更容易抽象和封装。本质上所有的异步方法都可以使用 `onlyResolvesLast` 来忽略过期的调用。

一个更实际，一个更通用，两者的使用需要根据具体场景来权衡。

# 总结

在前端常见的搜索，分页，选项卡等切换的场景中。由于网络的不确定性，先发出的请求不一定先响应，这会造成竞态问题。

解决竞态问题，我们可以选择「取消」或「忽略」过期请求。

- 「取消请求」，XMLHttpRequest 可以使用 abort 方法，fetch API 以及 axios 可以使用 AbortController
- 「忽略请求」，可以基于指令式 promise 或请求 id 的方式封装高阶函数来减少模板代码

两种方式各有各的好，需要根据实际场景权衡利弊。

其实解决方式不止这些，像 React Query，GraphQL，rxjs 等都有竞态处理，感兴趣的同学可以再继续深入了解。
