# startWidth

定义：

- `public startWith(values: ...T, scheduler: Scheduler): Observable`

返回的 `Observable` 会先发出作为参数指定的项，然后再发出由源 `Observable` 所发出的项。

怎么理解呢，其实很好举例，比如有一串糖葫芦，整体都是一个颜色，你觉得不好看，于是你在这串糖葫芦的前面插了几个颜色不一样的糖葫芦，这个时候用户吃的时候就会先吃到你插在最前面的糖葫芦。

```javascript 
const source = Rx.Observable.interval(1000).take(3);
const result = source.startWith(666)
result.subscribe(x => console.log(x));

```


打印结果为：666、0、1、2。

是不是很好理解呢。
