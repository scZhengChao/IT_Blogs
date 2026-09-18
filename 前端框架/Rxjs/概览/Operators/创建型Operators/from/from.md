# from

定义：

- `public static from(ish: ObservableInput<T>, scheduler: Scheduler): Observable<T>`

从一个数组、类数组对象、`Promise`、迭代器对象或者类 `Observable` 对象创建一个 `Observable`

![](image_0ItBtMdpa7.png)

from

该方法就有点像`js`中的`Array.from`方法（可以从一个类数组或者可迭代对象创建一个新的数组），只不过在`RxJS`中是转成一个`Observable`给使用者使用。

```javascript 
const source = Rx.Observable.from([10, 20, 30]);
source.subscribe(v => console.log(v));

// 10
// 20
// 30
```


从示例代码来看，其实这个还是比较简单的用法，如果说你想对现有项目的一些数据（比如数组或类数组）采用`RxJS`来管理，那么`from`操作将是一个不错的选择。
