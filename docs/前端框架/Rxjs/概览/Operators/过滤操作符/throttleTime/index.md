# throttleTime

定义：

- `public throttleTime(duration: number, scheduler: Scheduler): Observable<T>`

介绍了防抖怎么能忘了它的老伙伴节流呢？

该操作符主要能力跟我们认知的节流函数也是一致的，就是它会控制一定时间内只会发送一个数据，多余的会直接抛弃掉。唯一和防抖操作符不一致的地方就在于它对于第一个值是不会阻塞的。

![](./image/image_6IjL6vFDI1.png)

```javascript 
const source = Rx.Observable.interval(1000).take(6);
const result = source.throttleTime(2000);
result.subscribe(x => console.log(x));

// 0
// 3
```


打印结果如上所示，其实效果也很容易解释，代码中创建了一个数据源每秒发送一个从0开始递增的数，总共发送6个也就是0-5，并使用`throttleTime`设置两秒，订阅者接收第一个值时不会被阻塞，而是接收完一个之后的两秒里都拿不到值，也就是在第四秒的时候才能拿到3。
