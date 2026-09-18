# skip

定义：

- `public skip(count: Number): Observable`

返回一个 `Observable`， 该 `Observable` 跳过源 `Observable` 发出的前N个值`(N = count)`。

举个栗子来说就是，假设这个数据源发送6个值，你可以使用`skip`操作符来跳过前多少个。

```javascript 
const source = Rx.Observable.from([1, 2, 3, 2, 4, 3]);
const result = source.skip(2);
result.subscribe(x => console.log(x));
```


打印结果为：3、2、4、3，跳过了前面两个数
