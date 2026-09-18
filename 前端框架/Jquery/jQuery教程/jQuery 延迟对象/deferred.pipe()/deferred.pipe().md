# deferred.pipe()

## 目录

- [定义和用法](#定义和用法)

```javascript title="过滤解决(resolve)值"
$(function () { 
    var defer = $.Deferred(),
        filtered = defer.pipe(function( value ) {
            return value * 2;
        });
    defer.resolve( 5 );
    filtered.done(function( value ) {
        alert( "值是 ( 2*5 = ) 10: " + value ); // 10
    });
})
```


## 定义和用法

deferred.pipe() 函数用于过滤 and/or 链式延迟对象的工具方法。

**注意：** ​**从jQuery 1.8开始, deferred.pipe() 方法过时。使用 deferred.then() 代替它。**
