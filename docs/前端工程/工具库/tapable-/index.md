# tapable&#x20;

## 目录

- [基本使用](#基本使用)
  - [同步钩子](#同步钩子)
    - [SyncHook](#SyncHook)
  - [异步钩子](#异步钩子)
    - [AsyncParallelHook](#AsyncParallelHook)
    - [AsyncSeriesHook](#AsyncSeriesHook)
- [其他](#其他)

&#x20;           `tapable `是一个类似于 `Node`.js 中的 `EventEmitter`的库，但更专注于自定义事件的触发和处理。`webpack `通过 `tapable `将实现与流程解耦，所有具体实现通过插件的形式存在。

# 基本使用

想要了解 `tapable `的实现，那就必然得知道 `tapable `的用法以及有哪些使用姿势。`tapable `中主要提供了**同步与异步**两种钩子。我们先从简单的同步钩子开始说起。

## 同步钩子

### SyncHook

以最简单的 SyncHook 为例：

```react tsx 
const { SyncHook } = require('tapable');
const hook = new SyncHook(['name']);
hook.tap('hello', (name) => {
    console.log(`hello ${name}`);
});
hook.tap('hello again', (name) => {
    console.log(`hello ${name}, again`);
});

hook.call('ahonn');
// hello ahonn
// hello ahonn, again
```


&#x20;            可以看到当我们执行 `hook.call('ahonn')` 时会依次执行前面 `hook.tap(name, callback)` 中的回调函数。通过 `SyncHook` **创建同步钩子**，使用 `tap` **注册回调**，再调用 `call` **来触发**。这是 tapable 提供的多种钩子中比较简单的一种，通过 EventEmitter 也能轻松的实现这种效果。

此外，tapable 还提供了很多有用的同步钩子：

- SyncBailHook：类似于 SyncHook，执行过程中**注册的回调返回非** `undefined `时**就停止不在执**行。
- SyncWaterfallHook：接受至**少一个参数**，**上一个注册的回调返回值**会作为**下一个注册的回调的参数**。
- SyncLoopHook：有点类似 SyncBailHook，但是是在**执行过程中回调返回非** `undefined `时继续**再次执行当前的回调**。

## 异步钩子

&#x20;        除了同步执行的钩子之外，`tapable `中还有一些异步钩子，最基本的两个异步钩子分别是 `AsyncParallelHook `和 `AsyncSeriesHook `。其他的异步钩子都是在这两个钩子的基础上添加了一些流程控制，类似于 `SyncBailHook `之于 `SyncHook `的关系。

### AsyncParallelHook

&#x20;          `AsyncParallelHook `顾名思义是**并行执行的异步钩子**，当注册的所有异步回调都**并行执行完毕之后**再执行 `callAsync `或者 `promise `中的函数。

```react tsx 
const { AsyncParallelHook } = require('tapable');
const hook = new AsyncParallelHook(['name']);

console.time('cost');

hook.tapAsync('hello', (name, cb) => {
  setTimeout(() => {
    console.log(`hello ${name}`);
    cb();
  }, 2000);
});
hook.tapPromise('hello again', (name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`hello ${name}, again`);
      resolve();
    }, 1000);
  });
});

hook.callAsync('ahonn', () => {
  console.log('done');
  console.timeEnd('cost');
});
// hello ahonn, again
// hello ahonn
// done
// cost: 2008.609ms

// 或者通过 hook.promise() 调用
// hook.promise('ahonn').then(() => {
//  console.log('done');
//  console.timeEnd('cost');
// });
```


&#x20;         可以看到 `AsyncParallelHook `比 `SyncHook `复杂很多，`SyncHook `之类的同步钩子**只能通过** `tap` 来注册， 而异步钩子还能够通过 `tapAsync `或者 `tapPromise `来注册回调，**前者**以 `callback `的方式执行，而**后者**则通过 `Promise` 的方式来执行。异步钩子没有 `call `方法，**执行注册的回调**通过 `callAsync `与 `promise `方法进行触发。两者间的不同如上代码所示。

### AsyncSeriesHook

&#x20;         如果你想要**顺序的执行异步函数**的话，显然 `AsyncParallelHook `是不适合的。所以 `tapable `提供了另外一个基础的异步钩子：`AsyncSeriesHook`。

```react tsx 
const { AsyncSeriesHook } = require('tapable');
const hook = new AsyncSeriesHook(['name']);

console.time('cost');

hook.tapAsync('hello', (name, cb) => {
  setTimeout(() => {
    console.log(`hello ${name}`);
    cb();
  }, 2000);
});
hook.tapPromise('hello again', (name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`hello ${name}, again`);
      resolve();
    }, 1000);
  });
});

hook.callAsync('ahonn', () => {
  console.log('done');
  console.timeEnd('cost');
});
// hello ahonn
// hello ahonn, again
// done
// cost: 3011.162ms
```


&#x20;        上面的示例代码与 `AsyncParallelHook `的示例代码几乎相同，不同的是 `hook `是通过 `new AsyncSeriesHook()` 实例化的。通过 `AsyncSeriesHook `**就能够顺序的执行注册的回调**，除此之外注册与触发的用法都是相同的。

同样的，异步钩子也有一些带流程控制的钩子：

- `AsyncParallelBailHook`：执行过程中注册的回调**返回非** `undefined` 时就会**直接执行** `callAsync `或者 `promise `中的函数（由于并行执行的原因，注册的其他回调依然会执行）。
- `AsyncSeriesBailHook`：执行过程中注册的回调**返回非** undefined 时就会**直接执行** `callAsync `或者 `promise `中的函数，并且注册的后续回调都不会执行。
- `AsyncSeriesWaterfallHook`：与 `SyncWaterfallHook` 类似，**上一个**注册的异步回调执行之后的**返回值**会**传递给下一个注册的回调**。

# 其他

&#x20;         `tapable `中除了这一些核心的钩子之外还提供了一些功能，例如 [HookMap](https://link.zhihu.com/?target=https://github.com/webpack/tapable#hookmap "HookMap")，[MultiHook](https://link.zhihu.com/?target=https://github.com/webpack/tapable#multihook "MultiHook") 等。这里就不详细描述它们了，有兴趣的可以自行前往游览。
