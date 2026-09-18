# deferred.promise()

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)

```javascript title="设定两个延时时间是随机的定时器，分别用于解决（resolve）和拒绝（reject）延迟对象"
$(function () { 
    function asyncEvent(){
        var dfd = new jQuery.Deferred();
        // 在一个随机的时间间隔之后 Resolve （解决状态）
        setTimeout(function(){
            dfd.resolve("欢呼");
        }, Math.floor(400+Math.random()*2000));
        // 在一个随机的时间间隔之后 reject （拒绝状态）
        setTimeout(function(){
            dfd.reject("对不起");
        }, Math.floor(400+Math.random()*2000));
        // 每半秒显示一个"working..."消息
        setTimeout(function working(){
            if ( dfd.state() === "pending" ) {
                dfd.notify("working... ");
                setTimeout(working, 500);
            }
        }, 1);
        // 返回 Promise 对象，调用者不能改变延迟对象
        return dfd.promise();
    }
    // 为异步函数附加一个done, fail, 和 progress 处理程序
    $.when( asyncEvent() ).then(
        function(status){
            alert( status+', 事情进展顺利' );
        },
        function(status){
            alert( status+', 这次你失败了' );
        },
        function(status){
            $("body").append(status);
        }
    );
})
```


## 定义和用法

deferred.promise() 函数返回 Deferred(延迟)的 Promise 对象。

**注意：** 1. 方法允许一个异步函数阻止那些干涉其内部请求的进度（progress）或状态（status）的其它代码。

1. 只包含 deferred 对象的一组方法，包括：done(),then(),fail(),isResolved(), isRejected(), always(), 这些方法只能观察一个 deferred 的状态，而无法更改 deferred 对象的内在状态。 &#x20;
2. deferred.promise()也可以接受一个 target 参数，此时传入的 target 将被赋予 Promise 的方法，并作为结果返回，而不是创建一个新对象。

## 语法

`deferred.promise( [target ] )`

| 参数        | 描述                         |
| --------- | -------------------------- |
| *target*​ | Object类型 绑定 promise 方法的对象。 |
