# concatAll

定义：

- `public concatAll(): Observable`

顾名思义，该操作符有点像我们`js`中数组方法`concat`，用于将多个`Observable`合成一个，**不过它有个注意点****在于它是串行的****，也就是合并了两个**\*\*`Observable`****，那订阅者在获取值的时候会****先获取完第一个`Observable`****，之后****才开始接收到后一个`Observable`\*\***的值。**

![](https://ask.qcloudimg.com/http-save/yehe-1036137/g3rczlqvif.png)

```javascript 
const source1 = Rx.Observable.of(1, 2);
const source2 = source1.map(x => Rx.Observable.interval(1000).take(3));
const result = source2.concatAll();
result.subscribe(x => console.log(x));
```


的文字介绍，相信大家对于这段代码应该也能多少看得懂一些，没错，这段代码的含义就是我们的数据源发送了两个数，并且采用`map`操作符处理完返回了一个新的`Observable`，这个时候为了订阅者能够正常的接收多个`Observable`，则采用`concatAll`合并一下，并且最终订阅者收到的结果依次为：0、1、2、0、1、2。
