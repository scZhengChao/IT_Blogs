# 熟悉requestidlecallback到了解react ric polyfill实现

## 目录

- [#前言](#前言)
- [#背景知识](#背景知识)
  - [屏幕刷新率和FPS的关系？](#屏幕刷新率和FPS的关系)
  - [浏览器如何定义一帧？](#浏览器如何定义一帧)
- [认识requestIdleCallback](#认识requestIdleCallback)
- [#requestIdleCallback用法](#requestIdleCallback用法)
  - [demo1：](#demo1)
  - [demo2: 模拟dom更新](#demo2-模拟dom更新)
  - [demo3：用户行为](#demo3用户行为)
  - [总结：](#总结)
- [#react中requestIdleCallback pollyfill的实现](#react中requestIdleCallback-pollyfill的实现)
  - [源码解析react如何实现requestIdleCallback](#源码解析react如何实现requestIdleCallback)
- [#总结](#总结)

## #前言

阅读本文你将收获：

- 全面熟悉`requestidlecallback`用法和存在的价值。
- 明确`requestidlecallback`的使用场景。
- 了解react `requestidlecallback` polyfill的实现。

## #背景知识

#### 屏幕刷新率和FPS的关系？

当前大多数的屏幕刷新率都是60hz，也就是每秒屏幕刷新60次，低于60hz人眼就会感知卡顿掉帧等情况，同样我们前端浏览器所说的`FPS（frame per second）`是浏览器每秒刷新的次数，理论上`FPS`越高人眼觉得界面越流畅，在两次**屏幕硬件刷新之间，浏览器正好进行一次刷新（重绘），网页也会很流畅，当然这种是理想模式，** 如果两次硬件刷新之间浏览器重绘多次是没意义的，只会消耗资源，**如果浏览器重绘一次的时间是硬件多次刷新的时间，那么人眼将感知卡顿掉帧等**， 所以浏览器对一次重绘的渲染工作需要在16ms（1000ms/60）之内完成，也就是说每一次重绘小于16ms才不会卡顿掉帧。

一次**重绘**浏览器需要做哪些事情？

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/21/172d5b83ea2558e5~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

#### 浏览器如何定义一帧？

浏览器的一帧说的就是一次完整的重绘。

## 认识`requestIdleCallback`

> 以下demo源码[地址](https://link.juejin.cn/?target=https://github.com/toringo/ric-demo/blob/master/demo1.html "地址")

`window.requestIdleCallback()`方法将在**浏览器的空闲时段内调用的函数排队。**

**API**

```javascript 
var handle = window.requestIdleCallback(callback[, options])

callback: 一个在事件循环空闲时 即将被调用的函数的引用 。函数会接收到一个名为  IdleDeadline  的参数，这个参数可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态。
其中 IdleDeadline 对象包含：
 didTimeout ，布尔值，表示任务是否超时，结合 timeRemaining 使用。
timeRemaining()，表示当前帧剩余的时间，也可理解为留给任务的时间还有多少。

options的参数
timeout:  表示超过这个时间后，如果任务还没执行， 则强制执行，不必等待空闲 。尚未通过超时毫秒数调用回调，那么回调会在 下一次空闲时期被强制执行 。如果明确在某段时间内执行回调，可以设置timeout值。在浏览器繁忙的时候，requestIdleCallback超时执行就和setTimeout效果一样。
```


返回值：和`setTimeout`、`setInterval`返回值一样，是一个标识符。可以通过`cancelIdleCallback(handle)`清除取消。

**空闲时段**

什么时候浏览器出现空闲时段？

**场景一**

当浏览器一帧渲染所用时间小于屏幕刷新率（对于具有60Hz 的设备，一帧间隔应该小于16ms）时间，到下一帧渲染渲染开始时出现的空闲时间，如图`idle period`，

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/21/172d5b83d6d07dbd~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

**场景二**

当浏览器没有可渲染的任务，主线程一直处于空闲状态，事件队列为空。为了避免在不可预测的任务（例如用户输入的处理）中引起用户可察觉的延迟，这些空闲周期的长度应限制为最大值[50ms](https://link.juejin.cn/?target=https://w3c.github.io/requestidlecallback/#why50 "50ms")，也就是`timeRemaining`最大不超过50（也就是20fps，这也是react polyfill的原因之一），当空闲时段结束时，可以调度另一个空闲时段，如果它保持空闲，那么空闲时段将更长，后台任务可以在更长时间段内发生。如图:

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/21/172d5b83d8906e32~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

> **注意：**`timeRemaining`最大为50毫秒，是根据研究\[[RESPONSETIME](https://link.juejin.cn/?target=https://w3c.github.io/requestidlecallback/#bib-responsetime "RESPONSETIME")] 得出的，该研究表明，对用户输入的100毫秒以内的响应通常被认为对人类是瞬时的，就是人类不会有察觉。将闲置截止期限设置为50ms意味着即使在闲置任务开始后立即发生用户输入，用户代理仍然有剩余的50ms可以在其中响应用户输入而不会产生用户可察觉的滞后。

## #`requestIdleCallback`用法

#### **demo1**：

先模拟一个**可预测执行时间**的占用主线程的方法：

```javascript 
function sleep(date) {
  let flag = true;
  const now = Date.now();
  while (flag) {
    if (Date.now() - now > date) {
      flag = false;
    }
  }
}

```


用`requestIdleCallback`执行主线程空闲开始调用的方法：

```javascript 
function work() {
  sleep(2000); // 模拟主线程任务执行时间

  requestIdleCallback(() => {
    console.log("空闲时间1");
    sleep(1000);
    console.log("空闲时间1回调任务执行完成");
  });

  requestIdleCallback(() => {
    console.log("空闲时间2");
  });
}

btn1.addEventListener("click", work);

```


执行结果：*点击button -> 等待2s -> 打印 空闲时间1 -> 等待 1s -> 打印 空闲时间1回调任务执行完成 -> 空闲时间2*；当`sleep`结束`requestIdleCallback`**获取到主线程空闲，立马执行cb（也是在主线程执行）继续占用主线程，直到sleep结束，** 第二个`requestIdleCallback`获取主线程空闲输出*空闲时间2*。细看一下，此处`requestIdleCallback`不就是`setTimeout`吗，这样的功能用`setTimeout`也能实现，当然他们是有区别的，的我们`sleep`模拟占用主线程时间是可控的，但大多时候主线程work时间是不可预知的，setTimeout需要知道具体延迟时间，所以这是主要的却别。

#### **demo2: 模拟dom更新**

```javascript 
function renderElement(txt) {
  const p = document.createElement("p");
  p.innerText = txt;
  
  return p;
}

let taskLen = 10;
let update = 0;
function work2() {
  document.body.appendChild(renderElement(`任务还剩 ${taskLen}`));
  console.log(`页面更新${++update}次`);
  taskLen--;
  if (taskLen) {
    requestAnimationFrame(work2);
  }
}

btn1.addEventListener("click", () => {
  requestAnimationFrame(work2);
  window.requestIdleCallback(() => {
    console.log("空闲了, requestIdleCallback生效了");
  });
});

```


结果如图：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/21/172d5b83e56dbe65~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

经过`performance`录制分析如图：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/21/172d5b83e5a351b4~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

放大第一帧看：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/21/172d5b83e7876cba~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

`requestIdleCallback`在第一帧过后就执行，原因第一帧过后就出现了空闲时段。那么如果每一帧没有空闲时间，`requestIdleCallback`会什么时候执行哪？

修改代码：

```javascript 
...
function work2() {
  document.body.appendChild(renderElement(`任务还剩 ${taskLen}`));
  console.log(`页面更新${++update}次`);
  sleep(1000);
  taskLen--;
  if (taskLen) {
    requestAnimationFrame(work2);
  }
}
...

```


结果：会等到所有**的渲染任务执行完毕才会有空闲时间**，所以`requestIdleCallback`的`cb`在最后执行

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/6/21/172d5b841d5bcfe3~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

如果**不想让空闲任务等待那么久**，那么`requestIdleCallback`的第二个参数就派上用场了，`{timeout: 1000}`，更改`demo`，如下：

```javascript 
...
btn1.addEventListener("click", () => {
  requestAnimationFrame(work2);
  window.requestIdleCallback(
    () => {
      console.log("空闲了, requestIdleCallback生效了");
    },
    { timeout: 1200 }  // 最迟能等待1.2s
  );
});
...

```


运行的结果，console输出顺序：... -> 页面更新3次 -> 空闲了, requestIdleCallback生效了-> ...

![](<../assets/熟悉requestidlecallback到了解react /image/image_wQBm2369Yp.webp>)

#### **demo3：用户行为**

当用户`input`输入时，可用`requestIdleCallback`来**避免不可见的行为造成用户行为造成卡顿**，**譬如发送数据分析、处理界面不可见的业务逻辑等。**

下面以`发送数据分析`为例：

```javascript 
// 记录需要发送的数据队列
const eventStack = [];
// requestIdleCallback是否已经调度
let isRequestIdleCallbackScheduled = false;
// 模拟发送数据
const sendData = (...arg) => {
  console.log("发送数据", arg);
};

function onDivThemeRed() {
  // 业务逻辑
  render.classList.remove("border-blue");
  render.classList.add("border-red");

  eventStack.push({
    category: "button",
    action: "click",
    label: "theme",
    value: "red",
  });

  schedulePendingEvents();
}

function onDivThemeBlue() {
  // 业务逻辑
  render.classList.remove("border-red");
  render.classList.add("border-blue");

  eventStack.push({
    category: "button",
    action: "click",
    label: "theme",
    value: "blue",
  });

  schedulePendingEvents();
}

function schedulePendingEvents() {
  if (isRequestIdleCallbackScheduled) return;

  isRequestIdleCallbackScheduled = true;

  requestIdleCallback(processPendingAnalyticsEvents, { timeout: 2000 });
}

function processPendingAnalyticsEvents(deadline) {
  isRequestIdleCallbackScheduled = false;

  while (deadline.timeRemaining() > 0 && eventStack.length > 0) {
    const evt = eventStack.pop();

    sendData(
      "send",
      "event",
      evt.category,
      evt.action,
      evt.label,
      evt.value
    );
  }

  if (eventStack.length > 0) schedulePendingEvents();
}

btn2.addEventListener("click", onDivThemeRed);
btn3.addEventListener("click", onDivThemeBlue);

```


#### **总结：**

`requestIdleCallback`会在**每一帧结束后执行，去判断浏览器是否空闲**，如果浏览器一直处于占用状态，则没有空闲时间，且如果`requestIdleCallback`没有设置`timeout`时间，那么`callback`的任务**会一直推迟执行**，如果在当前帧设置`timeout`，浏览器会在当前**帧结束的下一帧开始判断是否超时执行**`callback`。`requestIdleCallback`任务没有和浏览器的帧渲染对其，应用不当会造成掉帧卡顿，原则上`requestIdleCallback`的FPS只有20，所以有高FPS要求的、需要和渲染帧对齐执行任务，如DOM动画等，建议用`requestAnimationFrame`，才会达到最佳流畅效果。

下面介绍一下`react`中有关`requestIdleCallback`的介绍。

## #`react`中`requestIdleCallback pollyfill`的实现

前面提到`requestIdleCallback`工作只有20FPS，一般对用户来感觉来说，需要到60FPS才是流畅的, 即一帧时间为 16.7 ms，所以这也是`react`团队自己实现`requestIdleCallback`的原因。实现大致思路是在`requestAnimationFrame`获取**一桢的开始时间**，触发一个`postMessage`，在空闲的时候调用`idleTick`来完成异步任务。

#### 源码解析react如何实现requestIdleCallback

> 源码在`packages/scheduler/src/forks/SchedulerHostConfig.default.js`下，分别对非DOM和DOM环境有不同的实现。

```javascript 
export let requestHostCallback; // 类似requestIdleCallback
export let cancelHostCallback; // 类似cancelIdleCallback
export let requestHostTimeout; // 非dom环境的实现
export let cancelHostTimeout;  // 取消requestHostTimeout
export let shouldYieldToHost;  // 判断任务是否超时,需要被打断
export let requestPaint; // 
export let getCurrentTime; // 获取当前时间
export let forceFrameRate; // 根据fps计算帧时间
// 非dom环境
if (typeof window === 'undefined' || typeof MessageChannel !== 'function') {
  let _callback = null; // 正在执行的回调
  let _timeoutID = null;
  const _flushCallback = function() {
    // 如果回调存在则执行，
    if (_callback !== null) {
      try {
        const currentTime = getCurrentTime();
        const hasRemainingTime = true;
        // hasRemainingTime 类似deadline.didTimeout
        _callback(hasRemainingTime, currentTime);
        _callback = null;
      } catch (e) {
        setTimeout(_flushCallback, 0);
        throw e;
      }
    }
  };
  
  // ...
  
  requestHostCallback = function(cb) {
    // 若_callback存在，表示当下有任务再继续，
    if (_callback !== null) {
      // setTimeout的第三个参数可以延后执行任务。
      setTimeout(requestHostCallback, 0, cb);
    } else {
      // 否则直接执行。
      _callback = cb;
      setTimeout(_flushCallback, 0);
    }
  };
  cancelHostCallback = function() {
    _callback = null;
  };
  requestHostTimeout = function(cb, ms) {
    _timeoutID = setTimeout(cb, ms);
  };
  cancelHostTimeout = function() {
    clearTimeout(_timeoutID);
  };
  shouldYieldToHost = function() {
    return false;
  };
  requestPaint = forceFrameRate = function() {};
} else {
  // 一大堆的浏览器方法的判断，有performance， requestAnimationFrame， cancelAnimationFrame
  // ...
  const performWorkUntilDeadline = () => {
    if (scheduledHostCallback !== null) {
      const currentTime = getCurrentTime();
      // yieldInterval每帧的时间，deadline为最终期限时间
      deadline = currentTime + yieldInterval;
      const hasTimeRemaining = true;
      try {
        const hasMoreWork = scheduledHostCallback(
          hasTimeRemaining,
          currentTime,
        );
        if (!hasMoreWork) {
          isMessageLoopRunning = false;
          scheduledHostCallback = null;
        } else {
          // 如果有更多的工作，就把下一个消息事件安排在前一个消息事件的最后
          port.postMessage(null);
        }
      } catch (error) {
        // 如果调度任务抛出，则退出当前浏览器任务，以便观察错误。
        port.postMessage(null);
        throw error;
      }
    } else {
      isMessageLoopRunning = false;
    }
    needsPaint = false;
  };

  const channel = new MessageChannel();
  const port = channel.port2;
  channel.port1.onmessage = performWorkUntilDeadline;

  requestHostCallback = function(callback) {
    scheduledHostCallback = callback;
    if (!isMessageLoopRunning) {
        isMessageLoopRunning = true;
        port.postMessage(null);
    }
  };
  
}

```


由上可见，非DOM模式下`requestHostCallback`是`setTimeout`模拟实现的，而在DOM下是基于`MessageChannel`消息的发布订阅模式`postMessage`和`onmessage`实现的。

## #总结

`requestIdleCallback`需要注意的：

- `requestIdleCallback`是**屏幕渲染之后执行的**。
- 一些**低优先级**的任务可使用`requestIdleCallback`等浏览器不忙的时候来执行，同时因为时间有限，它所执行的任务应该尽量是能够量化，细分的微任务（micro task）比较适合`requestIdleCallback`。
- `requestIdleCallback`**不会和帧对齐**，所以涉及到DOM的操作和动画最好放在`requestAnimationFrame`中执行，`requestAnimationFrame`在重新渲染屏幕**之前**执行。
- Promise 也不建议在这里面进行，因为 Promise 的回调**属性 Event loop 中优先级较高的一种微任务**，会在`requestIdleCallback`**结束时立即执行，不管此时是否还有富余的时间，这样有很大可能会让一帧超过 16 ms。**
