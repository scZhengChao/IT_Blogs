# distinct

定义：

- `public distinct(keySelector: function, flushes: Observable): Observable`

这个操作符也十分好理解，一句话可以概括，使用了该操作符，那么订阅者收到**的数据就不会有重复的了，也就是它是用来过滤重复数据的。**

![](https://ask.qcloudimg.com/http-save/yehe-1036137/d02635kexc.png)

```javascript 
const source = Rx.Observable.from([1, 2, 3, 2, 4, 3]);
const result = source.distinct();
result.subscribe(x => console.log(x));
```


最终程序运行结果为：1、2、3、4，重复的数直接被过滤了。
