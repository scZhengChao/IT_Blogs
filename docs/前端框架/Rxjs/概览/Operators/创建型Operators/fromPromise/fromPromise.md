# fromPromise

定义：

- `public static fromPromise(promise: PromiseLike<T>, scheduler: Scheduler): Observable<T>`

从命名上看其实已经很明显了，就是将`Promise`转换成`Observable`，这样我们在编写代码时就可以不用写`.then`、`.catch`之类的链式调用了。

如果 `Promise resolves` 一个值, 输出 `Observable` 发出这个值然后完成。如果 `Promise` 被 `rejected`, 输出 `Observable` 会发出相应的 错误。

```javascript 
const source = Rx.Observable.fromPromise(fetch('http://localhost:3000'));
source.subscribe(x => console.log(x), e => console.error(e));
```


> 这里为了演示效果，本地起了一个服务用于测试，自测的时候可以用别的。

这样我们就能轻松拿到该请求的返回值了。
