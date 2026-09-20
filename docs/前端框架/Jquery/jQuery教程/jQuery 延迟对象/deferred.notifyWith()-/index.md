# deferred.notifyWith()&#x20;

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)

## 定义和用法

`deferred.notify() `函数用于给定上下文和参数调用正在延迟对象上进行的回调函数( progressCallbacks )。

> \*\*注意：
> \*\*1. 通常，只有延迟对象（Deferred）的创建者才能调用此方法。 &#x20;
> 2\. 你可以通过调用 `deferred.promise()` 返回一个受限的 Promise 对象，来阻止其它代码改变延迟对象的状态或报告它的状态。 &#x20;
> 3.当 `deferred.notifyWith` 被调用时， 任何 progressCallbacks 可以通过访问 deferred.then 或者 deferred.progress 来添加。回调 依照他们添加时的顺序执行。通过 .notifyWith() 传递参数给每个回调函数，当迟延对象已经被 resolved 或被 rejected 之后，再调用任何 .notifyWith() (或者添加 progressCallbacks) 都会被忽略。

***

## 语法

`deferred.notifyWith( context [, args ] )`

| 参数         | 描述                         |
| ---------- | -------------------------- |
| *context*​ | Object类型 作为this对象传递给进行中的回调 |
| *args*​    | Object类型 可选参数，传递给进行中的回调    |
