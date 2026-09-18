# deferred.fail()

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)

```javascript title="Deferred（延迟）对象被拒绝时调用deferred.fail()"
$(function () { 
    $.get("test.php")
        .done(function(){ alert("$.get 成功！"); })
        .fail(function(){ alert("$.get 失败!"); });
})
```


## 定义和用法

`deferred.fail() `函数当 `Deferred` （延迟）对象被拒绝时，调用添加的处理程序。

> **提示：** 该方法接受一个或者多个参数。`deferred.fail() `返回的是一个 `Deferred` 对象， 可以连接其他的延迟对象方法，包括额外的 `.fail()` 方法。当 `Deferred` 对象被拒绝时，回调函数 按它们被添加时的顺序执行，并且可以作为参数传递给如下的方法使用：`deferred.resolve()` 或 `deferred.rejectWith()`。

## 语法

`deferred.fail( failCallbacks [, failCallbacks ] )`

| 参数               | 描述                                              |
| ---------------- | ----------------------------------------------- |
| *failCallbacks*​ | Function类型 一个函数或者函数数组，当Deferred（延迟）对象被拒绝时被调用    |
| *failCallbacks*​ | 可选。Function类型 一个函数或者函数数组，当Deferred（延迟）对象被拒绝时被调用 |
