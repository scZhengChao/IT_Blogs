# deferred.done()&#x20;

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)

```javascript title="当用户点击按钮时，受理延迟对象，触发一系列回调函数"
<button>Go</button>
<p>准备...</p>
<script>
$(function () { 
    // 当Deferred对象被解决时，3个函数被调用
    function fn1() {
        $( "p" ).append( " 1 " );
    }
    function fn2() {
          $( "p" ).append( " 2 " );
    }
    function fn3( n ) {
          $( "p" ).append( n + " 3 " + n );
    } 
    //创建一个deferred对象
    var dfd = $.Deferred();
    // 添加当dfd解决时被调用的处理程序
    dfd
    // .done() 可以获取函数或函数数组的数量
        .done( [ fn1, fn2 ], fn3, [ fn2, fn1 ] )
    // 我们也可以连接其他的方法
        .done(function( n ) {
            $( "p" ).append( n + " 已完成。" );
      });
    // 当按钮被点击时修改状态为已完成
    $( "button" ).on( "click", function() {
        dfd.resolve( "和" );
    });
})
</script>
```


## 定义和用法

`deferred.done()` 函数当`Deferred`（延迟）对象被受理时，调用添加的处理程序。
**提示：** 该方法接受一个或者多个参数。`deferred.done()` 返回的是一个 `Deferred` 对象， 可以连接其他的延迟对象方法，包括额外的 `.done()` 方法。当`Deferred` 对象得到解决时，回调函数按它们被添加时的顺序执行，并且可以作为参数传递给如下的方法使用：`resolve`，`resolveWith`。

## 语法

`deferred.done( doneCallbacks [, doneCallbacks ] )`

| 参数               | 描述                                               |
| ---------------- | ------------------------------------------------ |
| *doneCallbacks*​ | Function类型 一个函数或者函数数组，当Deferred（延迟）对象得到解决时被调用    |
| *doneCallbacks*​ | 可选。Function类型 一个函数或者函数数组，当Deferred（延迟）对象得到解决时被调用 |
