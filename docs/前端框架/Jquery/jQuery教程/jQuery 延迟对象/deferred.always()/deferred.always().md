# deferred.always()

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)

```javascript 
$(function () { 
    $.get( "test.php" ).always(function() {
      alert( "带有成功和错误的回调参数的$.get方法已完成。" );
    });
})
```


## 定义和用法

`deferred.always() `函数当`Deferred`（延迟）对象被**受理或被拒绝**时，调用添加的处理程序。 &#x20;

> **提示：** 参数可以是一个函数或一个函数数组。由于 deferred.always() 返回的是一个 Deferred 对象，所以可以连接其他的延迟对象方法，包括额外的 .always 方法。 当 Deferred 对象得到解决或被拒绝时，回调函数按它们被添加时的顺序执行，并且可以作为参数传递给如下的方法使用：`resolve` ， `reject` ， `resolveWith` 或 `rejectWith`。

## 语法

`deferred.always( alwaysCallbacks [, alwaysCallbacks ] )`

| 参数                 | 描述                                                   |
| ------------------ | ---------------------------------------------------- |
| *alwaysCallbacks*​ | Function类型 一个函数或者函数数组，当Deferred（延迟）对象得到解决或被拒绝时被调用    |
| *alwaysCallbacks*​ | 可选。Function类型 一个函数或者函数数组，当Deferred（延迟）对象得到解决或被拒绝时被调用 |
