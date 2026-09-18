# 对多重嵌套 Stream 进行处理

在上面我们理解了 RxJS 将程序抽象为一个个 `Stream` 的概念，并且学习了从 `Stream` 的视角来操作程序，以及对多个 `Stream` 进行组合操作，接**下来我们将探索如何**在 `Stream` 中嵌套 `Stream`，然后**又如何去处理这些多重嵌套的** `Stream`。
那么什么是多重嵌套的 `Stream` 呢？我们**在平时的业务开发中会碰到的典型的多重嵌套的** `Stream` 是什么呢？让我们来带着问题继续往下看 😋

![](image_ke-sEza5bg.png)

上述的 Stream 就是一个多重嵌套 Stream，场景就是我们常见的鼠标按下（mousedown）然后鼠标移动（mousemove）进行拖拽、画图等操作：

- 当我们多次 mousedown ，在时间维度上组合成 initial Stream，为黄色的圆圈那条线
- 每次 mousedown 之后开始 mousemove 时，当鼠标不停的移动，就会持续的触发 mousemove，也就是第一个淡蓝色的 mousemove（2）事件发生之后，以此淡蓝色 mousemove 事件为起点，会引发一条新的 Stream，我们称之为 “不断触发的 mousemove Stream”，从这里开始 Stream 里面嵌套了一条 Stream，**类似二维数组**
- 同样的在第二次 mousedown 之后开始 mousemove，之后以第一个墨绿色的 mousemove（2）为事件起点，会引发一条新的 Stream，我们称之为 “不断触发的 mousemove Stream”

上述的多重嵌套流从数组的视角来看就是如下内容：

```javascript 
[1, [2, 2, 2, 2], 1, [2, 2, 2, 2], 1, [2, 2], 1]

// => 格式化之后
[  1, // mousedown  [2, 2, 2, 2], // mousemove
  1, // mousedown
  [2, 2, 2, 2], // mousemove
  1, // mousedown
  [2, 2], // mousemove
  1 // mousedown
]

```


> 这里能够**很清晰**的看出 `Stream` 和数组有着脱不开的关系，所以数组相关的操作、函数，`Stream` 都**有对应的操作与函数**

了解了多重嵌套 `Stream`，以及其对应的场景之后，我们就来实战演练一下**如何将这种多重** `Stream` 以 `RxJS` 的角度进行实现，并能够完成较为复杂的业务逻辑。

> 给定一个目标：实现通过 Canvas 能够进行自由画图

如果我们通过传统**的命令式的实现大概长这样**：

```javascript 
import React, { useState, useEffect } from "react";

export default function NestedNormal() {
  useEffect(() => {
    let canvas = document.querySelector(".canvas");
    let ctx = canvas.getContext("2d");

    const draw = (e) => {
      ctx.lineTo(e.clientX, e.clientY - canvas.offsetTop);
      ctx.stroke();
    };

    ctx.beginPath();

    canvas.addEventListener("mousedown", (e) => {
      ctx.moveTo(e.clientX, e.clientY - canvas.offsetTop);
      canvas.addEventListener("mousemove", draw);
    });

    canvas.addEventListener("mouseup", (e) => {
      canvas.removeEventListener("mousemove", draw);
    });
  });

  return (
    <div>
      <canvas
        className="canvas"
        style={{ border: "1px solid black" }}
        width={400}
        height={400}
      ></canvas>
    </div>
  );
}

```


它可以实现这样的效果：

![](image_Ys9WWYcKHN.png)

上述代码的实现思路如下：

1. 等 `DOM` `loaded` 之后，对 `canvas` 添加 `mousedown` 事件监听，然后移动 `canvas` 画笔

```javascript 
ctx.lineTo(e.clientX, e.clientY - canvas.offsetTop);

```


1. 接着监听 `mousemove` 事件，等到鼠标移动时，就进行绘图：

```javascript 
ctx.lineTo(e.clientX, e.clientY - canvas.offsetTop);
ctx.stroke();

```


1. 接着监听 mouseup 事件，等到鼠标抬起时，清除 mousemove 的监听事件，宣告此次画图的结束

```javascript 
canvas.addEventListener("mouseup", (e) => {
    canvas.removeEventListener("mousemove", draw);
});

```


那么我们将上述的处理方式换成 RxJS 的形式，让我们来从 Stream 的角度来思考问题。

首先进行问题分析，画出 Stream 图示：

![](image_KCRgiiyiTn.png)

我们抽离一次 `mousedown`、`mousemove`、`mouseup` 的过程来看会更清晰一点，实际上我们整个程序的可以通过如下 `Stream` 来描述：

- 从时间维度上来看，先触发 `mousedown`
- 然后触发 `mousemove`，`mousemove` 实际上会产生一个新的 `Stream`，即嵌套的 `Stream`
- 然后触发 `mouseup` 事件，回到 `initial stream`，宣告从 1 引出的 `Stream`，然后经过嵌套的 2 之后，在 3 进入完成态，此 `Stream` 及其过程中的子 `Stream` 进入完成态。

```javascript 
import React, { useEffect } from "react";
import { fromEvent, tap, takeUntil, mergeMap } from "rxjs";

export default function NestedRxJS() {
  useEffect(() => {
    let canvas = document.querySelector(".canvas");
    let ctx = canvas.getContext("2d");

    const draw = (e) => {
      ctx.lineTo(e.clientX, e.clientY - canvas.offsetTop);
      ctx.stroke();
    };

    ctx.beginPath();

    fromEvent(canvas, "mousedown")
      .pipe(tap((e) => ctx.moveTo(e.clientX, e.clientY - canvas.offsetTop)))
      .pipe(
        mergeMap((source) =>
          fromEvent(canvas, "mousemove").pipe(
            takeUntil(fromEvent(canvas, "mouseup"))
          )
        )
      )
      .subscribe((e) => {
        draw(e);
      });
  });

  return (
    <div>
      <canvas
        className="canvas"
        style={{ border: "1px solid black" }}
        width={400}
        height={400}
      ></canvas>
    </div>
  );
}

```


上面的代码初看上去可能有点费解，但是不要方，我们一步一步来拆解它，并结合上述讲到的 `Stream` 的知识，看看是如何对应起来的。

```javascript 
fromEvent(canvas, "mousedown")

```


基于 `canvas` 的 `mousedown` 事件来生成一个 `Stream`，每次有 `mousedown` 事件就执行一次移动画笔的操作：

```javascript 
tap((e) => ctx.moveTo(e.clientX, e.clientY - canvas.offsetTop))

```


上述 `tap` 是一个 `RxJS` 操作符（`operators`），类似 `subscribe` 的效果，但是**只会拿传过的来值进行一次不影响后续** `Stream` 的 “纯操作”，常用来在 `Stream` 的中间态拿到当前的数据事件来修改外部的状态或做一些通知，它的 `Stream` 图如下：

![](image_sWCXEwBcBX.png)

> 这里 `tap` 所充当的作用较为关键，因为它可以拿到上一步的值，但是又不影响后续的操作，所以我们可以通过 `tap` 操作符进行 RxJS 的 Debug 操作，我们在后续的 如何 Debug RxJS 应用中讲解？

接着我们进行了一个较为复杂的操作：

```javascript 
mergeMap((source) =>
  fromEvent(canvas, "mousemove").pipe(
    takeUntil(fromEvent(canvas, "mouseup"))
  )
)

```


我们先看里面的内容：

```javascript 
fromEvent(canvas, "mousemove").pipe(
  takeUntil(fromEvent(canvas, "mouseup"))
)

```


fromEvent 很好理解，将 `canvas` 的 `mousemove` 事件转为一个 Observable 对象，也就是转为一个 Stream，然后这个 Stream 进行 pipe，即桥接到如下代码：

```javascript 
takeUntil(fromEvent(canvas, "mouseup"))

```


![](image_fYu2FXqR3F.png)

即上面两个 Stream，第一个 Stream pipe 到第二个 Stream 的第一个数据事件之前就结束，也是当第二个 Stream 的 z 事件发生时，第一个 Stream 就进入完成态，即后面的 e/f/g 都不会再继续执行。

对应到我们上述的需求里：

```javascript 
fromEvent(canvas, "mousemove").pipe(
  takeUntil(fromEvent(canvas, "mouseup"))
)

```


即在 `canvas` 的 `mouseup` 事件发生时，`mousemove` 这个 Stream 就进入完成态，也比较符合我们的之前的例子，即在鼠标抬起时，就清除 `mousemove` 事件，只不过我们这里没有命令计算机去清除这个事件，而是告诉计算机我们需要在某个事件发生时，对应的事件要结束，然后计算机就会自己去处理这个过程。

然后我们再回过头来看 `mergeMap` ，它是干什么的呢？我们自己画个图来演示一下，官方的图比较模糊:

![](image_dQDpXFACU5.png)

即对应到每次 `mousedown` 之后，我们移动鼠标产生多个 `mousemove` 事件，对应到数组的表示就是：

```javascript 
[
  1,
  [2, 2, 2, ...]
  1,
  [2, 2, 2, ...]
  ...
]

```


我们的 `Stream` 为多重嵌套状态，类似上述的**二维数组**，但是我们**按照时间的维度来看**，其实只有 1，然后 2，等 2 结束之后才能 1，所以如果我们想把上述二维数组压平，变成如下形状：

```javascript 
[ 1, 2, 2, 2, ..., 1, 2, 2, 2, ..., 1 ... ]

```


变成一维的数组，也就是一维的 Stream，上述场景就需要用到 mergeMap 这个操作符，也就是我们通过 mergeMap 之后的 Stream 图示如下：

![](image_NfKQoOD2sR.png)

即在时间维度上，将 `stream 2 `压平，然后与 `stream 1` 进行 `merge` 合并在一起，为什么需要这样做呢？

答案是我们期望创建一个 `mousedown` 事件的 Stream，当 `mousedown` 事件触发时，都能创建一个 `mousemove` 事件的 Stream，按理来说应该用我们之前提到的 `mapTo` 方法：

```javascript 
fromEvent(canvas, "mousedown")
      .pipe(tap((e) => ctx.moveTo(e.clientX, e.clientY - canvas.offsetTop)))
      .pipe(
        mapTo(fromEvent(canvas, "mousemove").pipe(
            takeUntil(fromEvent(canvas, "mouseup"))
          )
        )
      )
      .subscribe((e) => {
        draw(e);
      });

```


但是这样有个问题就是，如果直接 `mapTo` 其实相当于我们从一个 `mousedown` 数据事件，转成了一个 `mousemove` 的 Stream，如果直接 `subscribe` 的话，拿到的 `e` 其实是 `mousemove` 这个 Stream，而并非是我们期望的 `event` ，所以这里我们将 `mousedown` 与嵌套的 `mousemove` Stream 压平，然后再 `subscribe` 就会拿到单个 `mousedown` 事件触发时的 `event` 对象了，然后执行 `draw` 操作。

通过上述 RxJS 的操作逻辑，我们实现了同样的画图效果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1791531c7c6b41b2b750816c907dfab1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> 不得不说，Canvas 性能无解！🙋♂️

我们再回过头来看我们的整体代码：

```javascript 
fromEvent(canvas, "mousedown")
      .pipe(tap((e) => ctx.moveTo(e.clientX, e.clientY - canvas.offsetTop)))
      .pipe(
        mergeMap((source) =>
          fromEvent(canvas, "mousemove").pipe(
            takeUntil(fromEvent(canvas, "mouseup"))
          )
        )
      )
      .subscribe((e) => {
        draw(e);
      });

```


整体解释如下：

1. 监听 `mousedown` 事件，生成一个 Stream
2. 每触发一次 `mousedown` 事件，就执行一次移动鼠标的操作 `ctx.moveTo`
3. 每触发一次 `mousedown` 事件，就创建一个监听 `mousemove` 事件的 Stream
4. 对于 `mousemove` Stream，通过施加 `takeUntil` 方法，当 `mouseup` 事件发生时，就将此 Stream 的状态修改为完成态
5. 为了能够在每次 `mousedown` 事件时，既满足创建一个 监听 `mousemove` 事件的 Stream，又能在每次 `mousemove` 时，能够触发 `subscribe` 拿到实际 `event` 对象，我们通过 `mergeMap` 将两个 Stream 按照时间维度进行映射合并来达到这个效果
