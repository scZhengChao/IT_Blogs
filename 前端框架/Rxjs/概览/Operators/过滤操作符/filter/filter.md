# filter

定义：

- `public filter(predicate: function(value: T, index: number): boolean, thisArg: any): Observable`

这种基本应该没啥好介绍的了，与我们理解的数组`filter`方法并无差别，只是用的地方不一致。

```javascript 
const source = Rx.Observable.from([1, 2, 3, 2, 4, 3]);
const result = source.filter(x => x !== 3);
result.subscribe(x => console.log(x));
```


程序运行结果就是除了3以外的其他值都被打印出来。
