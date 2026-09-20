# pluck

定义：

- `public pluck(properties: ...string): Observable`

用于**选择出每个数据对象上的指定属性值**。

就比如某个数据源发送的数据是一个对象，对象上面有一个`name`属性，并且订阅者指向知道这个`name`属性，那么就可以使用该操作符来提取该属性值给用户。

![](./image/image_YN1b-lsPAy.png)

```javascript 
const source = Rx.Observable.of({name: '张三'}, {name: '李四'});
const result = source.pluck('name');
result.subscribe(x => console.log(x));

// 张三
// 李四
```


毫无疑问，这个操作符就是为了提取属性来的，相当于我们使用`map`操作符来处理一下提取出`name`再返回给订阅者
