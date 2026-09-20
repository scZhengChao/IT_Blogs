# requestIdleCallback介绍

## 目录

- [为什么需要 requestIdleCallback ？](#为什么需要-requestIdleCallback-)
- [requestIdleCallback API简介](#requestIdleCallback-API简介)
- [空闲时间](#空闲时间)
- [timeout](#timeout)

## 为什么需要 requestIdleCallback ？

在网页中，有**许多耗时但是却又不能那么紧要的任务。** 它们和紧要的任务，比如对用户的输入作出及时响应的之类的任务，它们共享事件队列。如果两者发生冲突，用户体验会很糟糕。我们可以使用setTimout，对这些任务进行延迟处理。**但是我们并不知道，setTimeout在执行回调时，是否是浏览器空闲的时候。**

而`requestIdleCallback`就解决了这个痛点，`requestIdleCallback`会在**帧结束时并且有空闲时间。或者用户不与网页交互时，执行回调。**

## requestIdleCallback API简介

- `requestIdleCallback`的第一个参数时`callback`
  - 当`callback`被调用时，回接受一个参数 `deadline`，`deadline`是一个对象，**对象上有两个属性**
    - `timeRemaining`，`timeRemaining`属性**是一个函数**，**函数的返回值表示当前空闲时间还剩下多少时间**
    - `didTimeout`，`didTimeout`属性是**一个布尔值**，如果`didTimeout`是true，那么表示本次`callback`的**执行是因为超时的原因**
- `requestIdleCallback`的第二个参数是`options`
  - `options`是一个对象，可以用来**配置超时时间**

```typescript 

requestIdleCallback((deadline) => {
    // deadline.timeRemaining() 返回当前空闲时间的剩余时间
    if (deadline.timeRemaining() > 0) {
        task()
    }
}, {
    timeout: 500
})

```


## 空闲时间

`requestIdleCallback` 的`callback`会在浏览器的空闲时间运行，那么什么是空闲时间呢？

![](image_Pl9Co02eVa.png)

- 如上图。当我们在执行一段连续的动画的时候，第一帧已经渲染到屏幕上了，到第二帧开始渲染，这段时间内属于空闲时间。这种空闲时间会非常的短暂，如果我们的屏幕是60hz（1s内屏幕刷新60次）的。那么空闲时间会小于16ms（1000ms / 16）。

![](image_HhHsAbLxd8.png)

- 另外一种空闲时间，**当用户属于空闲状态（没有与网页进行任何交互），并且没有屏幕中也没有动画执行。此时空闲时间是无限长的。但是为了避免不可预测的事（用户突然和网页进行交互），空闲时间最大应该被限制在50ms以内。**

> 为什么最大是50ms？人类对100ms内的响应会认为是瞬时的。将空闲时间限制在50ms以内，是为了避免，空闲时间内执行任务，从而导致了对用户操作响应的阻塞，使用户感到明显的响应滞后。

在空闲期间，`callback`的执行顺序是以`FIFO`（**先进先出**）的顺序。但是如果在空闲时间内依次执行`callback`时，**有一个callback的执行时间，已经将空闲时间用完了，**剩下的`callback`将会**在下一次的空闲时间执行**。

```typescript 
const task1 = () => console.log('执行任务1')
const task2 = () => console.log('执行任务2')
const task3 = () => console.log('执行任务3')

// console
// 执行任务1
// 执行任务2
// 执行任务3
requestIdleCallback(task1)
requestIdleCallback(task2)
requestIdleCallback(task3)

```


**如果当前的任务所需要的执行时间，超过了当前空闲时间周期内的剩余时间，** 我们也可以将任务带到下一个空闲时间周期内执行。在下一个空闲周期开始后，新添加的callback会被添加到callback列表的末尾。

```typescript 

const startTask = (deadline) {
    // 如果 `task` 花费的时间是20ms
    // 超过了当前空闲时间的剩余毫秒数，我们等到下一次空闲时间执行task
    if (deadline.timeRemaining() <= 20) {
        // 将任务带到下一个空闲时间周期内
        // 添加到下一个空闲时间周期callback列表的末尾
        requestIdleCallback(startTask)
    } else {
        // 执行任务
        task()
    }
}

```


当我们网页**处于不可见的状态时（比如切换到其他的tag），我们空闲时间将会每10s, 触发一次空闲期。**

## timeout

如果指定了`timeout`，但是浏览器没有在`timeout`**指定的时间内，执行**`callback`。**在下次空闲时间时，** \*\*`callback`\*\***会强制执行**。并且`callback`的参数，`deadline.didTimeout`等于`true`, `deadline.timeRemaining()`返回0。

```typescript 

requestIdleCallback((deadline) => {
    // true
    console.log(deadline.didTimeout)
}, {
    timeout: 1000
})

// 这个操作大概花费5000ms
for (let i = 0; i < 3000; i++) {
    document.body.innerHTML = document.body.innerHTML + `<p>${i}</p>`
}

```
