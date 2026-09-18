# 性能分析

## 目录

- [内存性能](#内存性能)
- [fps 降低了；但是内存的消耗不大； 前端页面变卡顿了；是因为什么原因](#fps-降低了但是内存的消耗不大-前端页面变卡顿了是因为什么原因)
  - [1. 渲染相关问题](#1-渲染相关问题)
  - [2. JavaScript 执行问题](#2-JavaScript-执行问题)
  - [3. 浏览器兼容性问题](#3-浏览器兼容性问题)
  - [4. 外部资源加载问题](#4-外部资源加载问题)

### 内存性能

内存性能关乎应用在运行过程中对系统内存的使用情况，合理的内存使用可以避免应用因内存不足而崩溃，也能减少系统资源的占用。

- **内存占用量**：可以使用 Node.js 的`process.memoryUsage()`方法来获取应用的内存使用信息。在主进程中可以定期记录内存使用情况。

```javascript 
// 在主进程中
setInterval(() => {
    const memoryUsage = process.memoryUsage();
    console.log(`RSS: ${memoryUsage.rss} bytes`);
    console.log(`Heap Total: ${memoryUsage.heapTotal} bytes`);
    console.log(`Heap Used: ${memoryUsage.heapUsed} bytes`);
}, 5000); // 每 5 秒记录一次
```


- **内存泄漏检测**：长时间运行应用，观察内存占用是否持续增长。可以使用 Chrome DevTools 的 Memory 面板进行详细的内存分析，通过拍摄堆快照、记录内存分配时间线等方式来检测是否存在内存泄漏。
- **帧率（FPS）**：对于有动画或实时渲染需求的应用，帧率是一个重要指标。可以使用`requestAnimationFrame`来计算帧率。

```javascript 
// 在渲染进程中
let lastFrameTime = performance.now();
let frameCount = 0;

function updateFPS() {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastFrameTime;
    frameCount++;

    if (deltaTime >= 1000) {
        const fps = frameCount;
        console.log(`FPS: ${fps}`);
        frameCount = 0;
        lastFrameTime = currentTime;
    }

    requestAnimationFrame(updateFPS);
}

requestAnimationFrame(updateFPS);
```


# fps 降低了；但是内存的消耗不大； 前端页面变卡顿了；是因为什么原因

### 1. 渲染相关问题

- **复杂的 DOM 操作**
  - 频繁的 DOM 插入、删除、修改操作会触发浏览器的重排（reflow）和重绘（repaint）。例如，在一个循环中不断向 DOM 中添加新元素，会使浏览器频繁计算元素的布局和样式，消耗大量渲染时间，导致帧率下降。
  - 示例代码：

```javascript 
for (let i = 0; i < 1000; i++) {
    const newDiv = document.createElement('div');
    document.body.appendChild(newDiv);
}
```


- **大量的 CSS 动画或过渡效果**
  - 过多复杂的 CSS 动画和过渡效果会增加浏览器的渲染负担。比如，使用`transform`、`opacity`等属性进行动画时，如果同时有大量元素在执行动画，会导致帧率下降。
  - 示例 CSS：

```css 
.element {
    animation: rotate 2s infinite;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
```


- **高分辨率的图片或视频**
  - 页面中使用高分辨率的图片或视频会占用大量的渲染资源。如果图片没有进行适当的压缩或缩放，浏览器需要花费更多的时间来解码和渲染这些资源，从而导致页面卡顿。

### 2. JavaScript 执行问题

- **长时间的同步任务**
  - 当 JavaScript 代码中存在长时间运行的同步任务时，会阻塞主线程，导致页面无法及时响应用户操作和进行渲染。例如，一个复杂的计算密集型循环会占用主线程的时间，使帧率下降。
  - 示例代码：

```javascript 
function longRunningTask() {
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
        sum += i;
    }
    return sum;
}

longRunningTask();
```


- **频繁的事件处理**
  - 过多的事件监听器或者在事件处理函数中执行复杂的操作，会使事件处理变得缓慢，影响页面的响应性能。例如，在`scroll`事件中进行大量的 DOM 操作，会导致页面滚动时卡顿。
  - 示例代码：

```javascript 
window.addEventListener('scroll', function() {
    const newDiv = document.createElement('div');
    document.body.appendChild(newDiv);
});
```


### 3. 浏览器兼容性问题

- **不同浏览器的渲染引擎差异**
  - 不同浏览器的渲染引擎对 HTML、CSS 和 JavaScript 的支持和实现方式可能存在差异。某些代码在某些浏览器中可能会出现性能问题，导致帧率下降和页面卡顿。
- **旧版本浏览器的性能限制**
  - 旧版本的浏览器可能对新的 Web 技术支持不够完善，或者本身的性能较低。在这些浏览器中访问页面时，可能会出现性能问题。

### 4. 外部资源加载问题

- **网络延迟**
  - 如果页面依赖于外部资源（如 CSS 文件、JavaScript 文件、图片等），网络延迟会导致资源加载缓慢，影响页面的渲染和响应性能。例如，从远程服务器加载一个大的 JavaScript 文件时，如果网络不稳定，会导致页面卡顿。
- **第三方脚本的性能问题**
  - 引入的第三方脚本（如广告脚本、统计脚本等）可能存在性能问题，会影响页面的整体性能。这些脚本可能会在页面加载时执行大量的代码，导致帧率下降。
