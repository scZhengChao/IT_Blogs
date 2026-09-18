# settimeout 实现的轮询为什么比setInterval 好

## 目录

- [1.避免时间漂移（Drift）](#1避免时间漂移Drift)
- [2.更灵活的动态调整](#2更灵活的动态调整)
- [3.避免任务重叠（Overlapping）](#3避免任务重叠Overlapping)
- [4.更好的错误处理](#4更好的错误处理)
- [5.更易停止轮询](#5更易停止轮询)
- [6.浏览器后台节流（Throttling）优化](#6浏览器后台节流Throttling优化)
- [何时用setInterval？](#何时用setInterval)
- [总结](#总结)

`setTimeout`实现的轮询（**递归调用**）通常比`setInterval`更可靠和可控

### 1.**避免时间漂移（Drift）**

- \*\*`setInterval`\*\***的问题**： &#x20;

  它严格按照固定时间间隔调度任务，但\*\*如果任务本身的执行时间超过间隔时间，下一次任务会被立即执行（或堆积），导致时间漂移。  \*\*

  例如：间隔 100ms，但任务执行了 110ms，下一次任务会直接触发（没有等待）。
- \*\*`setTimeout`\*\***的解决**： &#x20;

  每次任务完成后才设置下一次调用，**确保两次调用之间的间隔**是`延迟时间 + 任务执行时间`，避免时间漂移。

```javascript 
// setInterval 可能漂移
setInterval(() => {
  longRunningTask(); // 如果执行时间 > 间隔，下次任务会立即触发
}, 100);

// setTimeout 无漂移
const poll = () => {
  longRunningTask();
  setTimeout(poll, 100); // 任务完成后才计划下一次
};
```


### 2.**更灵活的动态调整**

- `setTimeout`可以在每次调用后动态调整下一次的间隔时间（例如根据网络状况或服务器响应）。
- `setInterval`的间隔是固定的，无法动态修改。

```typescript 
// 动态调整轮询间隔
const poll = () => {
  fetchData().then((response) => {
    const nextDelay = response.needsRetry ? 1000 : 100;
    setTimeout(poll, nextDelay);
  });
};
```


### 3.**避免任务重叠（Overlapping）**

- `setInterval`可能在前一个**任务未完成时就触发下一次任务，导致并发执行**（尤其是耗时任务）。
- `setTimeout`确保任务串行执行，避免重叠。

```javascript 
// setInterval 可能导致任务重叠
setInterval(() => {
  if (isProcessing) return; // 需要手动处理重叠
  isProcessing = true;
  asyncTask(() => { isProcessing = false; });
}, 100);

// setTimeout 天然避免重叠
const poll = () => {
  asyncTask(() => {
    setTimeout(poll, 100);
  });
};
```


### 4.**更好的错误处理**

- `setTimeout`允许在每次任务后处理错误并决定是否继续轮询。
- `setInterval`一旦启动，即使任务报错也会继续执行。

```javascript 
const poll = () => {
  fetchData()
    .then(handleData)
    .catch((error) => {
      console.error("Polling failed, retrying in 5s...");
      setTimeout(poll, 5000); // 错误时延长间隔
    });
};
```


### 5.**更易停止轮询**

- `setTimeout`只需清除最后一次的定时器即可。
- `setInterval`需要显式调用`clearInterval`，且可能在清除后还有未执行的任务。

```javascript 
let timer;
const stopPolling = () => clearTimeout(timer);

const poll = () => {
  doWork();
  timer = setTimeout(poll, 100);
};
```


### 6.**浏览器后台节流（Throttling）优化**

现代浏览器对**后台标签页的定时器**（如`setInterval`）**会进行节流（最小 1s 间隔）**，而递归`setTimeout`的行为更贴近实际需求，尤其在需要精确控制的场景（如轮询 API）。

***

### 何时用`setInterval`？

- 仅当任务**绝对同步**且**执行时间远小于间隔时间**时，`setInterval`更简洁。
- 其他情况下，`setTimeout`是更安全的选择。

### 总结

| 特性      | \`setTimeout\`轮询     | \`setInterval\`    |
| ------- | -------------------- | ------------------ |
| 时间精确性   | 避免漂移                 | 可能漂移               |
| 任务重叠    | 不会重叠                 | 可能重叠               |
| 动态调整间隔  | 支持                   | 不支持                |
| 错误处理    | 灵活                   | 需额外逻辑              |
| 停止控制    | 简单（\`clearTimeout\`） | 需\`clearInterval\` |
| 后台标签页行为 | 更友好                  | 可能被节流              |
