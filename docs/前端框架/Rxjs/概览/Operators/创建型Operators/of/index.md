# of

定义：

- `public static of(values: ...T, scheduler: Scheduler): Observable<T>`

与`from`的能力差不太多，只不过在使用的时候是传入一个一个参数来调用的，有点类似于`js`中的`concat`方法。同样也会返回一个`Observable`，它会依次将你传入的参数合并并将数据以同步的方式发出。

![](./assets/image/image_C08nmr3iXq.png)

```javascript 
const source = Rx.Observable.of(1, 2, 3);
source.subscribe(v => console.log(v));

// 1
// 2
// 3
```


依次打印1、2、3.
