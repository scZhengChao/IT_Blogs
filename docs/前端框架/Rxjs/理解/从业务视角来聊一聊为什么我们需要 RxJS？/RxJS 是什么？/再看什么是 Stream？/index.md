# 再看什么是 Stream？

Stream 是指**时间序列上的一连串数据事件，** 而常见的数据事件（`Data Event`）包括 `Variables`、`User Inputs`、`Properties`、`Caches`、`Data Structures` 等各种同步或异步的操作，通过 `Observe`（观察）这些 `Data Event`，并依据其 `Side Effects` 进行对应的操作。

一个标准的流有**开始态（黄色），有中间态（绿色、蓝色），有错误态（叉），有完成态（竖）。**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/221769cb432841a4bd9b6067dc448d1e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> [rxmarbles.com/](https://link.juejin.cn?target=http://rxmarbles.com/ "rxmarbles.com/") 这个网站可视化了各种 RxJS 的 Stream，也叫 Marbles （弹珠）图，所有的 RxJS 相关内容及 Operators 都可以通过 Marbles 图来表示出来

- 黄色：对于一个点击事件，如 Click Event，当用户点击一个 DOM 元素时，触发了点击事件，这是一个数据事件。这是一个流的开始态。
- 绿色、蓝色：点击事件之后可能对数据进行了取值、缓存、或者声明新的数据结构进行存储等，这些也是数据事件。这是一个流的中间态。
- 叉：遇到 let 暂时性死区，未声明就使用，会抛出一个错误，这也是数据事件。这是一个 Stream 的错误态，错误态是一种完成态。
- 竖：点击以及点击之后的一系列操作执行完成，会到达一个 Stream 的完成态。

通过一段 RxJS 的代码来展现上述的 Stream：

```javascript 
import { range, map } from "rxjs";

let source = range(1, 5);
let subscription = source
  .pipe(map(val => val * 2))
  .subscribe(
    (x) => console.log("onNext: " + x),
    (e) => console.log("onError: " + e.message),
    () => console.log("onCompleted")
);

// Logs:
// onNext: 1
// onNext: 2
// onNext: 3
// onNext: 4
// onNext: 5
// onCompleted

```


![](./assets/image/image_5Q3RRcPu2g.png)

> 上述为 range 的 Marbles 图示

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b716c6d673744a9fbc5395a7474810ed~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> 上述为 map 的 Marbles 图示

上述通过 RxJS 提供的 range operators 快速的创建了一个以 1 为起始值，长度为 5 的递增序列的 Stream：

- 流的创建为起始态
- 对起始态的数据 1-5 进行后续的操作，为中间态，即将 1-5 映射为 2/4/6/8/10
- 如果在 Stream 的中间态遇到错误，进入到错误态，则会执行 subscribe 的第二个参数，，打印 `onError: e.message`
- 如果中间态执行完毕没有遇到错误，则会进入到完成态，执行 subscribe 的第三个参数，打印 `onCompleted`
- 同时，通过 subscribe 此 Stream，我们可以声明一个观察者（observer），当流中的数据事件发生副作用（Side Effects）时，做出对应的反应，对应到上述例子，此流后续会依次发出 1/2/3/4/5 等 5 个数据事件，这样 susbcribe 的第一个参数即会打印出 `onNext: x` 这样的 Log

> Operators 的概念后续会讲解 = =！
