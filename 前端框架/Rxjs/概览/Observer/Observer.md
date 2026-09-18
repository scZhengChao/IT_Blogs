# Observer

> 观察者

**什么是 Observer？** Observer 是 Observable 传递的各个值的**消费者**。 Observer **只是一组回调**，\*\*对应于 \*\*`Observable` 传递的每种类型的通知：`next`、`error` 和 `complete`。下面是一个典型的 Observer 对象的例子：

```javascript 
const observer = {
  next: (x) => console.log('Observer got a next value: ' + x),
  error: (err) => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

observable.subscribe(observer);

```


> `Observer` 只是具有**三个回调的对象，分别用于 Observable 可能传递的每种类型的通知**

> RxJS 中的 Observer 也**可能是部分的**。如果你**不提供其中一个回调**，Observable 的执行仍然会正常进行，除了某些类型的**通知会被忽略**，因为它们在 Observer 中没有对应的回调。

```javascript 
const observer = {
  next: (x) => console.log('Observer got a next value: ' + x),
  error: (err) => console.error('Observer got an error: ' + err),
};


```


**默认是next**

```javascript 
observable.subscribe((x) => console.log('Observer got a next value: ' + x));
```
