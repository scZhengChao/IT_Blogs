# mapTo

定义：

- `public mapTo(value: any): Observable`

**忽略数据源发送的数据，只发送指定的值（传参）。**

就像是一个你讨厌的人让你帮忙传话，他说了一大堆表白的话，然后让你传给某个妹子，你因为讨厌他所以不想帮他，于是跟那个妹子说我喜欢你，最后你们幸福的生活在一起了。

![](image_TsWutcmxo9.png)

```javascript 
const source = Rx.Observable.interval(1000).take(3);
const result = source.mapTo(666);
result.subscribe(x => console.log(x));
```


就像这段代码，数据源发送的是0、1、2，而订阅者实际收到的是三个666。
