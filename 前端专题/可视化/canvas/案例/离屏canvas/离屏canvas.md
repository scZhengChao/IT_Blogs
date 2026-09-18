# 离屏canvas

## 目录

- [注意事项](#注意事项)
- [基础使用](#基础使用)
  - [1. 基本概念](#1-基本概念)
  - [2. 创建离屏 Canvas](#2-创建离屏-Canvas)
  - [3. 获取绘图上下文](#3-获取绘图上下文)
  - [4. 进行绘制操作](#4-进行绘制操作)
  - [5. 将离屏 Canvas 的内容绘制到屏幕上的 Canvas](#5-将离屏-Canvas-的内容绘制到屏幕上的-Canvas)
  - [6. 在 Web Worker 中使用离屏 Canvas](#6-在-Web-Worker-中使用离屏-Canvas)
    - [main.js（主线程代码）](#mainjs主线程代码)
    - [worker.js（Web Worker 代码）](#workerjsWeb-Worker-代码)

**离屏渲染的非凡优势**

与传统的 Canvas 书写模式相比，离屏渲染可谓优势尽显：

- **性能飙升：** 离屏渲染显著提升 Canvas 的书写性能，尤其是面对大量图形元素或复杂动画时，其优越性愈加明显。
- **动画丝滑流畅：** 离屏渲染大幅减少屏幕重绘的次数，让动画效果更上一层楼，堪比行云流水般的顺畅。
- **渲染一致性：** 离屏渲染保证了在不同浏览器和设备上的渲染一致性，避免因浏览器差异造成的兼容性问题。

**Canvas 离屏渲染的必要性**

通常，Canvas 的渲染方式是在主画布上直接绘图，这会带来两个问题：

1. **频繁的重绘和重排：** Canvas 内容每次更新时，都会触发整个画布的重绘，造成巨大的性能开销。
2. **闪烁：** 内容更新时，旧内容被擦除，新内容被绘制，导致明显的闪烁。

Canvas 离屏渲染通过在内存中创建独立画布解决这两个问题。在离屏画布上绘图，避免了主画布的频繁重绘和重排，极大提升了性能。同时，它消除了闪烁，因为旧内容不会被擦除，新内容直接绘制在离屏画布上。

### 注意事项

- **内存占用**：离屏 Canvas 会占用额外的内存，因此在不需要时应及时释放资源。
- **兼容性**：离屏 Canvas 在现代浏览器中得到了广泛支持，但在一些旧版浏览器中可能无法使用。

通过使用离屏 Canvas，你可以有效地优化 Canvas 绘制的性能，特别是在处理复杂图形或动画时。

# 基础使用

离屏 Canvas（OffscreenCanvas）是 HTML5 Canvas API 的一个扩展，它允许在不直接关联到 DOM 的情况下进行画布操作。离屏 Canvas 非常适合用于在后台线程（如 Web Worker）中进行图形处理，以避免阻塞主线程，从而提高页面的响应性能。以下是离屏 Canvas 的基础使用介绍：

### 1. 基本概念

普通的`<canvas>`元素是直接嵌入在 HTML 文档中的，其绘制操作会直接反映在页面上。而离屏 Canvas 是在内存中创建的，不直接与 DOM 关联，你可以在其中进行各种绘制操作，然后将结果绘制到屏幕上的`<canvas>`元素或者进行其他处理。

### 2. 创建离屏 Canvas

在 JavaScript 中，你可以使用`OffscreenCanvas`构造函数来创建一个离屏 Canvas 对象。示例代码如下：

```javascript 
// 创建一个宽为 200，高为 100 的离屏 Canvas
const offscreenCanvas = new OffscreenCanvas(200, 100);
```


### 3. 获取绘图上下文

和普通的`<canvas>`元素一样，你需要获取离屏 Canvas 的绘图上下文来进行绘制操作。目前支持`2d`和`webgl`两种上下文类型。以下是获取 2D 绘图上下文的示例：

```javascript 
const offscreenCtx = offscreenCanvas.getContext('2d');
```


### 4. 进行绘制操作

获取绘图上下文后，就可以使用熟悉的 Canvas 2D API 进行绘制了。例如，绘制一个矩形：

```javascript 
// 设置填充颜色
offscreenCtx.fillStyle = 'blue';
// 绘制一个矩形
offscreenCtx.fillRect(10, 10, 100, 50);
```


### 5. 将离屏 Canvas 的内容绘制到屏幕上的 Canvas

要将离屏 Canvas 的内容显示在页面上，你需要有一个屏幕上的`<canvas>`元素，并获取其绘图上下文，然后使用`drawImage`方法将离屏 Canvas 的内容绘制到屏幕上。示例代码如下：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
</head>

<body>
    <canvas id="screenCanvas" width="200" height="100"></canvas>
    <script>
        // 创建离屏 Canvas
        const offscreenCanvas = new OffscreenCanvas(200, 100);
        const offscreenCtx = offscreenCanvas.getContext('2d');

        // 在离屏 Canvas 上绘制
        offscreenCtx.fillStyle = 'blue';
        offscreenCtx.fillRect(10, 10, 100, 50);

        // 获取屏幕上的 Canvas 元素和绘图上下文
        const screenCanvas = document.getElementById('screenCanvas');
        const screenCtx = screenCanvas.getContext('2d');

        // 将离屏 Canvas 的内容绘制到屏幕上的 Canvas
        screenCtx.drawImage(offscreenCanvas, 0, 0);
    </script>
</body>

</html>
```


### 6. 在 Web Worker 中使用离屏 Canvas

离屏 Canvas 的一个重要应用场景是在 Web Worker 中进行图形处理。这样可以避免在主线程中进行复杂的绘制操作，从而提高页面的响应性能。以下是一个简单的示例：

#### main.js（主线程代码）

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
</head>

<body>
    <canvas id="screenCanvas" width="200" height="100"></canvas>
    <script>
        // 创建离屏 Canvas
        const offscreenCanvas = new OffscreenCanvas(200, 100);
        const screenCanvas = document.getElementById('screenCanvas');

        // 创建 Web Worker
        const worker = new Worker('worker.js');

        // 将离屏 Canvas 传递给 Web Worker
        worker.postMessage({ canvas: offscreenCanvas }, [offscreenCanvas]);

        // 监听 Web Worker 的消息
        worker.onmessage = function (event) {
            const screenCtx = screenCanvas.getContext('2d');
            screenCtx.drawImage(event.data.canvas, 0, 0);
        };
    </script>
</body>

</html>
```


#### worker.js（Web Worker 代码）

```javascript 
onmessage = function (event) {
    const offscreenCanvas = event.data.canvas;
    const offscreenCtx = offscreenCanvas.getContext('2d');

    // 在离屏 Canvas 上绘制
    offscreenCtx.fillStyle = 'red';
    offscreenCtx.fillRect(20, 20, 80, 40);

    // 将处理后的离屏 Canvas 发送回主线程
    postMessage({ canvas: offscreenCanvas }, [offscreenCanvas]);
};
```


通过以上步骤，你可以掌握离屏 Canvas 的基础使用方法，并利用它来优化你的 Web 应用的性能。
