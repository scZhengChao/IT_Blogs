# deferred.resolveWith()

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)

## 定义和用法

`deferred.resolveWith()` 函数用于解决`Deferred`（延迟）对象，并根据给定的 `context` 和 `args` 参数调用任何 `doneCallbacks` 回调函数。

**注意：**

1. 通常只有延迟对象的创建者才可以调用该方法。你可以通过调用 `deferred.promise()`，返回一个受限的 Promise 对象，来阻止其它代码改变延迟对象的状态或报告它的状态。 &#x20;
2. 当延迟对象被 resolved 时，任何通过 deferred.then 或 deferred.done 添加的 doneCallbacks，都会被调用。回调函数按它们被添加时的顺序执行。传递给 deferred.resolve() 的 args 参数， 会传给每个回调函数。当延迟对象进入 resolved 状态后，任何 doneCallbacks 被添加时，就会被立刻执行，并带上传入给 .resolve() 的参数。

***

## 语法

**deferred.resolveWith( context \[, args ] )**

| 参数         | 描述                                       |
| ---------- | ---------------------------------------- |
| *context*​ | Object类型 作为 this对象传递给 doneCallbacks 回调函数 |
| *args*​    | Array类型 传递一个可选的参数数组给 oneCallbacks 回调函数   |
