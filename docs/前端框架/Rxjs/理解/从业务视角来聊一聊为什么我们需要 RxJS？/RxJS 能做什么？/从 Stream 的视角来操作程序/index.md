# 从 Stream 的视角来操作程序

从 `RxJS` 的视角来看，我们程序就是一个个 `Stream` 组成，无论是同步还是异步，无论是变量、事件等，都是一个个的 `Stream`，通过 `RxJS`，我们将这**些数据事件转**换为 `Observable`，然后进行 “流式” 操作。
我们通过一个 RxJS 的例子来重新理解 Stream 这个概念，也就是 Observable 这个概念，来看下面这段代码：

```javascript 
import { fromEvent, map, scan } from "rxjs";

// 创建一个监听 document click 事件的 Observable
 fromEvent(window, "click")
      .pipe(
        map((val) => 1),
        scan((total, curr) => total + curr)
      )
      .subscribe((val) => console.log(val));

```


先提一个问题：

> 我如果点击 4 次，打印的结果是什么？

答案是：1，2，3，4

首先说明一下 scan 类似我们平时的 reduce，即对一组数据进行聚合，而 map 就和我们平时使用的 map 的作用一致，这两个都是对 Stream 进行了转换，而 subscribe 则是声明了一个观察者，一旦有数据过来，即打印这个数据。

如果**要理解上述结果，我们首先需要从 Stream 这个概念出来**，去**描绘整个处理过程**，而首先需要关注的是 `Stream` 是**一个具有 “时间” 这个维度的一个概念，即类似下面图：**

![](./image/image_YgDO5nGy8K.png)

通过 `fromEvent` 创建了一个 Stream，也就是一个 Observable，然后随着时间推移，后续会触发多次 click 事件，即会在 Stream 这条线上，按时间维度触发这些 click 事件，每个事件即为上图中的一个圆，这一系列的事件实际上组成了一个数组。

而我们通过 `map` 操作符，将数组中每个事件都映射成 1 这个数字，这里注意映射之后成为了一个新 `Stream`，我这里称它为 `stream 2`，`stream 2` 中每个数据事件都是 1。

接着我们继续调用 `scan` 操作符，`scan` 操作符类似 `reduce`，对传过来的数据进行聚合操作，但是这里为什么结果是 `1， 2， 3， 4 `呢？这里的核心就是需要理解我们 `Stream` 的核心，即从第一次点击开始，到后续的点击，这条流上共发生了 4 个数据事件，而每一次 `scan` 则会扫描从 `stream` 上面开始的**第一个事件到当前发生的事**件，并对这些数据进行聚合操作，所以结果计算如下：

1. total 为 0，now 为 1，结果为 1
2. total 为 0，对 \[1, 1] 进行聚合，结果为 2
3. total 为 0，对 \[1, 1, 1] 进行聚合，结果为 3
4. total 为 0，对 \[1, 1, 1, 1] 进行聚合，结果为 4
