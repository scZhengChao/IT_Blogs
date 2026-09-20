# deferred.state()

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)

## 定义和用法

`deferred.state() `函数用于确定一个`Deferred`（延迟）对象的当前状态。

**注意：** `deferred.state()` 方法返回**一个字符串**，代表`Deferred`（延迟）对象的当前状态。`Deferred` 对象可以在三种状态之一： &#x20;

- **"pending" :** Deferred 对象是尚未完成状态 。
- **"resolved" :** Deferred 对象是在解决状态，这意味着对象的 deferred.resolve() 或者 deferred.resolveWith()已被调用并且 doneCallbacks 已被调用（或在被调用的过程中） 。
- **"rejected" :** Deferred 对象是在被拒绝的状态，这意味着对象的 deferred.reject() 或者 deferred.rejectWith() 已被调用并且 failCallbacks 已被调用（或在被调用的过程中） 。

***

## 语法

这个方法不接受任何参数。

`deferred.state()`
