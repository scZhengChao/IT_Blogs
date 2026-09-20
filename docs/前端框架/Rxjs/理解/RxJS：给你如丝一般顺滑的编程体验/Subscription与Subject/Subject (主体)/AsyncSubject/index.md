# AsyncSubject

`AsyncSubject` 只有当 `Observable` **执行完成时**(执行`complete()`)，它才会**将执行的最后一个值发送给观察者**，**如果因异常而终止**，`AsyncSubject`将**不会释放任何数据**，但是会向`Observer`**传递一个异常通知。**

![](./assets/image/image_YeLhWgDgqW.png)

> `AsyncSubject`一般用的比较少，更多的还是使用前面三种。

```javascript 
const subject = new Rx.AsyncSubject();
subject.next(1);
subject.subscribe(res => {
 console.log('A:' + res);
});
subject.next(2);
subject.subscribe(res => {
 console.log('B:' + res);
});
subject.next(3);
subject.subscribe(res => {
 console.log('C:' + res);
});
subject.complete();
subject.next(4);

// 整体打印结果：
// A:3
// B:3
// C:3
```


从打印结果来看其实已经很好理解了，也就是说对于所有的观察者们来说，**源对象只会在所有数据发送完毕也就是**调用`complete`方法之后才会把最后一个数据返回给观察者们。

> 这就好比小说里经常有的，当你要放技能的时候，先要打一套起手式，打完之后才会放出你的大招。
