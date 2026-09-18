# 总阻塞时间（Total Blocking Time，TBT）

**定义**： Total Blocking Time 指的**是在主线程被阻塞的总时间**。在网页加载和交互过程中，浏览器的主线程负责处理各种任务，如解析 HTML、执行 JavaScript、渲染页面等。当主线程被阻塞时，用户的交互和页面的更新都会受到影响，导致页面响应变慢，用户体验下降。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/69e2a47ce43742d2b8d753b2288dedfa~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg55av54qs5Lio5ZOI5aOr5aWH:q75.awebp?rk3s=f64ab15b\&x-expires=1746595443\&x-signature=BCtptF%2BEcgRlgp2QXWXbwunxulk%3D)

**影响因素：**

- 长任务执行：如果网页中有长时间运行的任务 **，如复杂的 JavaScript 计算、大量的 DOM 操作等**，这些任务会占用主线程，导致主线程被阻塞。(例如一次画十万个圆)
- 同步加载脚本：当**网页加载同步脚本时，浏览器会暂停其他任务**，直到脚本下载并执行完成。这会导致主线程被阻塞，增加 TBT。
- 资源加载顺序不当：如果关键资源（如 CSS 和 JavaScript 文件）的加载顺序不合理，可能会导致主线程在等待资源加载时被阻塞。

**提升方法：**

- 任务拆分：将长任务拆分成多个小任务，利用浏览器的空闲时间逐步执行。

1. 例如，可以使用`requestIdleCallback`函数在浏览器空闲时执行任务。

```javascript 
function longTask() {
  let total = 0;
  for (let i = 0; i < 1000000; i++) {
    total += Math.pow(i, 2);
    if (i % 1000 === 0 && window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        // 可以在这里继续执行下一部分任务
      });
    }
  }
  return total;
}

```


1. 使用 `Web Workers`：将一些耗时的计算任务转移到 `Web Workers` 中执行，这样不会阻塞主线程。

```javascript 
// 创建一个 Web Worker
const worker = new Worker('worker.js');

// 在主线程中向 Web Worker 发送消息
worker.postMessage({ data: [1, 2, 3, 4, 5] });

// 在 Web Worker 中接收消息并进行处理
self.onmessage = function(event) {
  const data = event.data;
  const result = data.map(item => item * 2);
  // 将处理结果发送回主线程
  self.postMessage(result);
};

```


- 异步加载脚本

1. 使用`async`和`defer`属性：对于非关键的脚本，可以使用`async`属性使其异步加载，不阻塞页面的渲染。对于需要在页面加载完成后执行的脚本，可以使用`defer`属性。

```html 
<script src="script.js" async></script>
<script src="anotherScript.js" defer></script>

```


1. 动态加载脚本：在需要的时候动态加载脚本，而不是在页面加载时一次性加载所有脚本。

```javascript 
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// 在需要的时候加载脚本
loadScript('script.js').then(() => {
  console.log('Script loaded successfully.');
});

```


- 优化资源加载顺序

1. 合理安排 CSS 和 JavaScript 文件**的加载顺序：** 确保关键的 CSS 文件在页面渲染之前加载完成，而 JavaScript 文件在页面加载完成后或者在需要的时候加载。
2. 使用预加载：**对于关键资源，可以**使用`<link rel="preload">`标签**进行预加载，** 这样可以在浏览器空闲时提前下载资源，减少等待时间。
