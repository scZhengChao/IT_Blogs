# 实例操作符-静态操作符

- 实例操作符：通常是能**被实例化的对象直接调用的操作符**。我们一般更多会使用实例操作符多一点，比如`filter`、`map`、`concat`等等。使用实例操作符可以更快乐的使用`this`，而**省去一个参数，还能维持链式调用。**
- 静态操作符：`Observable`是一个`class`类，我们可以直接把操作符挂载到他的静态属性上，好处在于无需实例化即可调用，缺点在于就无法再使用`this`的方式进行目标对象调用了，而是需要把目标对象传入。

> 如果添加一个实例化属性上面已经有示例了，这里就不做过多赘述了。

将上述的`filter`例子改造一下，将其挂载到静态属性上：

```javascript 
Rx.Observable.filter = (source, callback) => {
    return Rx.Observable.create(((observer) => {
        source.subscribe(
            (v) => callback(v) && observer.next(v),
            (err) => observer.error(err),
            (complete) => observer.complete(complete)
        );
    }))
}
```
