# repeat

定义：

- `public repeat(count: number): Observable`

将数据源重复`n`次，`n`为你传入的数字类型参数。

![](./image/image_2W_8LJubAh.png)

```javascript 
const source = Rx.Observable.of(1, 2, 3).repeat(3);
source.subscribe(v => console.log(v));
```


这里配合`of`操作符，打印结果为一次打印1、2、3、1、2、3、1、2、3，将原本只会打印一次的1、2、3转化成三次。
