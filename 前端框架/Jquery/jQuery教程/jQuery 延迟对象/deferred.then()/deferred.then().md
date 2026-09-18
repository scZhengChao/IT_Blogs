# deferred.then()

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)

```javascript title="添加 .then 方法"
$(function () { 
    $.get("test.php").then(
        function(){ alert("$.get 成功"); },
        function(){ alert("$.get 失败!"); }
    );
})
```


## 定义和用法

`deferred.then()` 函数当Deferred（延迟）**对象被解决，拒绝或仍在进行中时，调用添加处理程序**。

**注意：**

1. 参数可以为 `null` 。或者使用.`done()，.fail()`或者 .`progress()`只设置一种未经过滤的状态或值的回调类型。 &#x20;
2. 从jQuery 1.8开始, 方法返回一个新的 `promise` ，可以通过一个函数过滤 `deferred`（延迟）对象`的状态和值`，用来替换现在过时的`deferred.pipe() `方法。 &#x20;
3. 回调是依照他们被添加时的顺序执行的，由于 deferred.then 返回 `Promise` 对象，可以链接其它的 `Promise` 对象，包括附加的 .then() 方法。

***

## 语法

方法一

`deferred.then( doneFilter [, failFilter ] [, progressFilter ] )`

方法二

`deferred.then( doneCallbacks, failCallbacks [, progressCallbacks ] )`

| 参数                | 描述                                            |
| ----------------- | --------------------------------------------- |
| *doneFilter*​     | Function类型 可选 当Deferred（延迟）对象得到解决时被调用的一个函数。   |
| *failFilter*​     | Function类型 可选 当Deferred（延迟）对象拒绝时被调用的一个函数。     |
| *progressFilter*​ | Function类型 可选 当Deferred（延迟）对象生成进度通知时被调用的一个函数。 |

| 参数                   | 描述                                              |
| -------------------- | ----------------------------------------------- |
| *doneCallbacks*​     | Function类型 当Deferred（延迟）对象得到解决时被调用的一个函数或函数数组。   |
| *failCallbacks*​     | Function类型 当Deferred（延迟）对象拒绝时被调用的一个函数或函数数组。     |
| *progressCallbacks*​ | Function类型 当Deferred（延迟）对象生成进度通知时被调用的一个函数或函数数组。 |
