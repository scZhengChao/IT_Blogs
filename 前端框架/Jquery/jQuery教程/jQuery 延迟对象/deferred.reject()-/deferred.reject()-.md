# deferred.reject()&#x20;

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)

## 定义和用法

`deferred.reject()` 函数用于拒绝延迟对象，并根据给定的参数调用任何 `failCallbacks` 回调函数。

**注意：**

1. 通常只有延迟对象的创建者才可以调用该方法。你可以通过调用 deferred.promise()，返回一个受限的 Promise 对象，来阻止其它代码改变延迟对象的状态或报告它的状态。 &#x20;
2. 当延迟对象被 rejected 时，任何通过 deferred.then 或 deferred.fail 添加的 failCallbacks，都会被调用。回调函数按它们被添加时的顺序执行。传递给 deferred.reject() 的 args 参数，会传给每个回调函数。当延迟对象进入 rejected 状态后，任何 failCallbacks 被添加时，就会被立刻执行，并带上传入给 .reject() 的参数。

***

## 语法

`deferred.reject( args )`

| 参数      | 描述                                      |
| ------- | --------------------------------------- |
| *args*​ | Object类型 传递给失败回调函数（failCallbacks）的可选的参数 |
