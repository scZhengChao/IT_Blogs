# take

定义：

- `public take(count: number): Observable<T>`

只发出源 `Observable` 最初发出的的N个值 `(N = count)`。

这个操作符可谓是在前面出现了很多次了，还挺常见的，用于控制只获取特定数目的值，跟`interval`这种会持续发送数据的配合起来就能自主控制要多少个值了。
