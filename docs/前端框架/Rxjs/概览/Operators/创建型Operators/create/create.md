# create

定义：

- `public static create(onSubscription: function(observer: Observer): TeardownLogic): Observable`

经过前面代码的洗礼，相信大家对该操作符已经不陌生了。

![](image_I8eCmBZBTK.png)

create

> `create` 将 `onSubscription` 函数转化为一个实际的 `Observable` 。每当有人订阅该 `Observable` 的时候，`onSubscription`函数会接收 `Observer` 实例作为唯一参数执行。`onSubscription` 应该 调用观察者对象的 `next`, `error` 和 `complete` 方法。

官方文档的描述其实已经很清晰了，相当于只要有人订阅该操作符创建出来的`Observable`，它则会通过调用订阅者本身的方法传递一系列值。

> 上图与演示代码并无直接关联。

```javascript 
const source = Rx.Observable.create(((observer: any) => {
    observer.next(1);
    observer.next(2);
    setTimeout(() => {
        observer.next(3);
    }, 1000)
}))

// 方式一
source.subscribe(
    {
        next(val) {
            console.log('A：' + val);
        }
    }
);
// 方式二
source.subscribe((val) => console.log('B：' + val));

// A：1
// A：2
// B：1
// B：2
//- 1s后:
// A：3
// B：3
```


打印结果自然是不用多提了，首先`A`和`B`都会分别打印，1、2，并在1s后打印出3。

这里我们可以注意一下，我们的在调用`subscribe`的时候可以使用这两种方式，**以一个对象形式**，该对象具备`next`、`error`、`complete`三个方法（都是可选的），或者**直接传入函数的方式**，参数前后分别为`next`、`error`、`complete`。
