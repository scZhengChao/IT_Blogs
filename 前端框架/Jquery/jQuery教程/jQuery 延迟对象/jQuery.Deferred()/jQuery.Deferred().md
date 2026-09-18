# jQuery.Deferred()

## 目录

- [语法](#语法)

`$.Deferred()` 是一个构造函数，用来返回一个链式实用对象方法来注册多个回调，并且调用回调队列，传递任何同步或异步功能成功或失败的状态。 &#x20;

**提示：**

1. `$.Deferred()` 构造函数创建一个新的 `Deferred`（延迟）对象，` jQuery.Deferred` 可传递一个可选的函数，该函数在构造方法返回之前被调用并传递一个新的 `Deferred` 对象作为函数的第一个参数。例如被调用的函数可以使用` deferred.then（）`来附加回调函数。 &#x20;
2. 一个 `Deferred` 对象开始于挂起状态。任何使用 `deferred.then(), deferred.always(), deferred.done()`, 或者 `deferred.fail()` **添加到这个对象的回调函数都是排队等待执行**的。调用 `deferred.resolve() `或 `deferred.resolveWith()` 转换延迟**到解决状态后立即执行设置**的 `doneCallbacks` 。调用 `deferred.reject() `或 `deferred.rejectWith() `转换延迟到**拒绝状态后立即执行设置**的 `failCallbacks` 。一旦对象已经**进入了解决或拒绝状态，它保持该状态**。回调仍然可以添加到已解决或已拒绝的 `Deferred` 对象——它们会立即执行。

## 语法

*`$`*`.Deferred( [beforeStart ] )`

| 参数             | 描述                                               |
| -------------- | ------------------------------------------------ |
| *beforeStart*​ | Function( Deferred deferred )类型 一个在构造函数返回之前调用的函数 |
