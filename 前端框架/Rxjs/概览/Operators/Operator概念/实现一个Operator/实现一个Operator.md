# 实现一个Operator

假设我们不使用`RxJS`提供的过滤操作符，那么让你自己实现又该怎么做呢？

```javascript 
function filter(source, callback) {
    return Rx.Observable.create(((observer) => {
        source.subscribe(
            (v) => callback(v) && observer.next(v),
            (err) => observer.error(err),
            (complete) => observer.complete(complete)
        );
    }))
}
const source = Rx.Observable.interval(1000).take(3);
filter(source, (value) => value < 2).subscribe((value) => console.log(value));

// 0
// 1
```


这样就实现了一个简单的`filter`操作符，是不是很简洁，**其实主要的做法还是像上面所**说，基于传入的`Observable`，返回一个新的`Observable`。

代码中首先创建了一个`Observable`，接着用一个新的观察者订阅传入的源，并调用回调函数判断是否这个值需要继续下发，如果为`false`，则直接跳过，根据我们传入的源与过滤函数来看，源对象最终会发送三个数0、1、2，打印结果为0、1，2被过滤了。

当然**我们也可以将其放置到**`Rx.Observable.prototype`**上以便以我们可以采用**\*\*`this`\*\***的方式获取源：**

```javascript 
Rx.Observable.prototype.filter = function (callback) {
     return Rx.Observable.create(((observer) => {
        this.subscribe(
            (v) => callback(v) && observer.next(v),
            (err) => observer.error(err),
            (complete) => observer.complete(complete)
        );
    }))
}
Rx.Observable.interval(1000).take(3).filter((value) => value < 2).subscribe((value) => console.log(value));

// 0
// 1
```


这样是不会就更加简洁了，就像我们使用原生数组的`filter`方法一样。

要说这两种方式的区别，其实也比较好理解，一个是放在`prototype`中，能够被实例化的对象直接调用，另一个是定义了一个新的函数，可以用来导出给调用者使用（其实也可以直接挂载到`Observable`的静态属性上）。

> 看到这里估计会有读者已经猜到笔者接下来说讲解什么了。
