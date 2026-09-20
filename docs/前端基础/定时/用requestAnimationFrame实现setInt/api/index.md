# api

## 目录

- [API 函数签名](#API-函数签名)
  - [1.requestAnimationFrame(callback)](#1requestAnimationFramecallback)
  - [2.cancelAnimationFrame(requestID)](#2cancelAnimationFramerequestID)
- [关键特性](#关键特性)
- [基本使用示例](#基本使用示例)
- [高级用法：控制帧率](#高级用法控制帧率)
- [与其他定时器的对比](#与其他定时器的对比)
- [兼容性](#兼容性)
- [总结](#总结)

`requestAnimationFrame`（简称`rAF`）是浏览器提供的专门用于优化动画性能的 API，它会根据屏幕刷新率（通常是 60Hz）自动调度回调函数，确保动画平滑执行。以下是它的详细说明：

***

### **API 函数签名**

#### **-`requestAnimationFrame(callback)`**

- **作用**：请求浏览器在下次重绘之前执行指定的回调函数。
- **参数**：
  - `callback`（函数）：回调函数，接收一个[DOMHighResTimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp "DOMHighResTimeStamp")参数（时间戳，单位为毫秒，精度高达微秒）。

```typescript 
type Callback = (timestamp: DOMHighResTimeStamp) => void;
```


- **返回值**：一个唯一的`requestID`（整数），用于取消请求。

```typescript 
const requestID: number = requestAnimationFrame(callback);
```


#### **-`cancelAnimationFrame(requestID)`**

- **作用**：取消之前通过`requestAnimationFrame`安排的请求。
- **参数**：
  - `requestID`（数字）：`requestAnimationFrame`返回的 ID。

```javascript 
cancelAnimationFrame(requestID);
```


### **关键特性**

1. **回调参数**\*\*`timestamp`\*\*
   - 表示回调被触发时的精确时间戳（从页面加载开始计算，类似`performance.now()`）。
   - 用于计算动画的增量时间（delta time），避免因帧率波动导致动画速度不一致。
2. **自动匹配屏幕刷新率**
   - 默认以屏幕刷新率（通常 60Hz，即每 16.67ms 一次）调用回调函数。
   - 在 120Hz 高刷屏幕上会自动适配为约 8.33ms 一次。
3. **后台暂停**
   - 当页面隐藏（如切换标签页）时，`rAF`会**自动暂停执行，节省资源。**
4. **任务合并**
   - 浏览器会**将同一帧内的多次 DOM 操作合并，减少重绘和回流。**

### **基本使用示例**

```javascript 
// 启动动画
let startTime;
function animate(timestamp) {
  if (!startTime) startTime = timestamp;
  const progress = timestamp - startTime; // 计算已过时间
  console.log(`动画已运行 ${progress} 毫秒`);

  // 更新动画状态（例如：移动元素）
  if (progress < 2000) { // 运行 2 秒
    requestAnimationFrame(animate); // 继续下一帧
  }
}

// 开始动画
const requestID = requestAnimationFrame(animate);

// 停止动画（例如在某个条件下）
// cancelAnimationFrame(requestID);
```


### **高级用法：控制帧率**

如果需要限制帧率（如 30FPS），可通过时间差控制：

```javascript 
const fps = 30;
const interval = 1000 / fps; // 每帧间隔（毫秒）
let lastTime = 0;

function throttledAnimate(timestamp) {
  if (timestamp - lastTime >= interval) {
    console.log("执行逻辑，当前帧率:", fps);
    lastTime = timestamp;
  }
  requestAnimationFrame(throttledAnimate);
}

requestAnimationFrame(throttledAnimate);
```


### **与其他定时器的对比**

| 特性        | \`requestAnimationFrame\` | \`setTimeout\`/\`setInterval\` |
| --------- | ------------------------- | ------------------------------ |
| **执行时机**​ | 屏幕刷新前同步                   | 固定时间间隔                         |
| **精度**​   | 微秒级时间戳                    | 毫秒级（可能受系统影响）                   |
| **后台运行**​ | 自动暂停                      | 继续运行（可能被节流）                    |
| **适用场景**​ | 动画/视觉更新                   | 通用定时任务                         |
| **性能优化**​ | 浏览器自动合并渲染                 | 可能引发布局抖动                       |

***

### **兼容性**

- **所有现代浏览器（包括移动端）均支持。**
- 如需兼容旧浏览器（如 IE9），可使用 polyfill：

```javascript 
window.requestAnimationFrame = window.requestAnimationFrame || 
  function(callback) {
    return setTimeout(callback, 1000 / 60);
  };
```


### **总结**

- **何时使用**：**动画、Canvas/WebGL 渲染、高频视觉更新。**
- **何时不用**：**非视觉任务（如数据轮询）、低频操作（如秒级定时）。**
- **优势**：性能优化、自动帧率适配、精确时间控制。
