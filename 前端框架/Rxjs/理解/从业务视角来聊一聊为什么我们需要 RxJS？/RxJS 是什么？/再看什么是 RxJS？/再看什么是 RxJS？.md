# 再看什么是 RxJS？

RxJS 最核心的概念就是 Observable（可观察对象）、Observer（观察者），当然还有一些 Subject、Scheduler 与 Operators 我们后续讲解。
Observable 就是我们上节提到的 Stream，RxJS 通过 Observable 这样一个可观察对象来具象化 Stream 的概念，我们通过一个例子来体会一下：

```javascript 
import { fromEvent } from "rxjs";

// 创建一个监听 document click 事件的 Observable
let Observable = fromEvent(document, "click");

// 通过 Observable.subscribe 方法来声明一个观察者 observer，当有点击事件（click）发生时
// 则调用传入的回调函数
let subscription = Observable.subscribe((e) => {
  console.log("dom clicked");
});

```


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6d9e20b664444c28916570ecce26d23~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> 上述为 fromEvent 的 Stream 图示

我们知道，Variables、User Inputs、Properties、Caches、Data Structures 等在 Stream 的概念中都是一个个数据事件，而 RxJS 可以将这些数据事件转换为 `Observable`，从而变成可观察对象，即创建为一个 `Stream`，然后此 `Stream` 则可以进行一系列 “中间态”，如进行 `map` 操作，**最后到达“错误态”或“完成态**”，同时在整个 Stream 的生命周期，我们可以 Subscribe（订阅）此流，声明一个 Observer（观察者），当 Stream 中的数据事件有 Side Effects 时，观察者就可以执行对应的操作。
