# buffer

定义：

- `public buffer(closingNotifier: Observable<any>): Observable<T[]>`

将过往的值收集到一个数组中 **，并且仅当另一个**`Observable` 发出通知时才发出此数组。**这相当于有一个缓冲区，将数据收集起来**，等到**一个信号来临，再释放出去。**

![](image_-1oKn5HIec.png)

> 改操作符就有点像一个大水坝，一些时候我们会选择蓄水，等到特定时候，再由领导下命令打开水坝，让水流出去。

举个栗子：

假设我们有这样一个需求，我们有一个接口是专门用于获取特定数据的，但是呢该接口一次性只返回一个数据，这让我们很苦恼，因为产品想让数据量达到特定值再控制进行操作，也就是他点击一下某个按钮，再去将这些数据渲染出来，那该怎么办呢？

这个时候就需要我们的`buffer`操作符大展身手了：

```javascript 
const btn = document.createElement('button');
btn.innerText = '你点我啊！'
document.body.appendChild(btn);
const click = Rx.Observable.fromEvent(btn, 'click');
const interval = Rx.Observable.interval(1000);
const source = interval.buffer(click);
source.subscribe(x => console.log(x));
```


> 这里我们直接用`interval`来演示接口获取数据，然后再配合`buffer`进行功能实现。

这里我们等四秒之后再点击一下按钮，打印出来的值为：`[0, 1, 2, 3]`，然后再等8秒，点击按钮：`[4, 5, 6, 7, 8, 9, 10, 11]`。

从现象看，我们不难看出，我们已经实现了通过按钮来控制数据的发送。**同时我们可以发现另一个现象，发送出去的数据就直接会在缓冲区中被清空，然后重新收集新的数据。**

这其实也不难理解，我们还是用水坝来举例，我们打开水坝放水一段时间之后，然后关闭它继续蓄水，那么我第二次打开水坝放出去的水自然是我新蓄的水。
