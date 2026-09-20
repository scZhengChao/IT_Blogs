# switch

定义：

- `public switch(): Observable<T>`

通过**只订阅最新发出的内部** `Observable` ，将高阶 `Observable` 转换成一阶 `Observable` 。

对于该操作符的用法其实前面我们在介绍`switchMap`这个转换操作符时就已经说到了，相当于`map`+`switch`=`switchMap`。

举个栗子：

```javascript 
const btn = document.createElement('button');
btn.innerText = '我要发言！'
document.body.appendChild(btn);
const source = Rx.Observable.fromEvent(btn, 'click');
const source2 = source.map(x => Rx.Observable.interval(1000).take(3));
const result = source2.switch();
result.subscribe(x => console.log(x));
```


上述代码实现的效果与`switchMap`一致，当用户点击按钮时会开始发送数据，当这次数据发送未完成时，再次点击按钮，**则会开始一个新的发射数据流程，将原先的发射数据流程直接抛弃。**
