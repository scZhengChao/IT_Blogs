# 用requestAnimationFrame实现setInterval

## 目录

- [为什么](#为什么)

# 为什么

为什么要用`requestAnimationFrame`来实现`setInterval`呢？这就要来说说`setInterval`的缺点了：

1. 当**页面被隐藏或最小化**时，`setTinterval`的回调函数仍然在后台执行，这就浪费了电脑的性能。

而`requestAnimationFrame`都能解决上述的问题，`requestAnimationFrame`在mdn的定义是**该方法需要传入一个回调函数作为参数，该回调函数会在浏览器****下一次重绘之前****执行。** 所以它的优点也很明显了：

1. **执行频率是跟浏览器刷新频率保持同步**的，**不会卡顿、丢帧。**
   - 如果电脑的刷新频率为60HZ，`requestAnimationFrame`的回调函数就是在 1 / 60 ≈ 16.7ms 执行一次；
   - 如果电脑的刷新频率为90HZ，`requestAnimationFrame`的回调函数就是在 1 / 90 ≈ 11.1ms 执行一次；
2. 节省`CPU`资源

   当**页面被隐藏或最小化**时，`requestAnimationFrame` **则会停止刷新动画**，当**页面恢复可见状态时，动画就从上次停止的地方继续执行。**
3. 高频率函数节流

   在`resize`, `scroll` 等高频率事件中，**为了防止屏幕在一个刷新间隔内发生多次函数执行**，`requestAnimationFrame` 可保证在**每个刷新间隔内函数只被执行一次**。

那为什么不用 `setTimeout `来实现 `setInterval`呢？因为对于 `setTimeout `来说：

1. `setTimeout `任务被**放入异步队列，只有当主线程任务执行完后才会执行队列中的任务**，因此实际执行时间总是比设定时间要晚。
2. `settimeout `设置的时间**间隔不一定与屏幕刷新间隔时间相同，会引起丢帧。**

```typescript 
function mySetInterval(callback, interval) {
    let timer;
    const now = Date.now;
    let startTime = now();
    let endTime = startTime;
    const loop = () => {
        // requestAnimationFrame中的回调函数是异步的，在下一次重绘之前调用。
        // 所以递归代码不会阻塞后面代码的执行。
        timer = window.requestAnimationFrame(loop);
        endTime = now();
        if (endTime - startTime >= interval) {
            startTime = now();
            callback(timer);
        }
    }
    timer = window.requestAnimationFrame(loop);
    return timer;
}
let a = 0
mySetInterval(timer => {
    console.log(a)
    a++
    if (a === 3) cancelAnimationFrame(timer)
}, 1000)
```


[为什么 requestAnimationFrame 比 setTimeout 更好？](<./帧调度与定时器对比/index.md> "为什么 requestAnimationFrame 比 setTimeout 更好？")

[怎样阻止函数被调用太快或者太多次？ ](./怎样阻止函数被调用太快或者太多次？-/index.md "怎样阻止函数被调用太快或者太多次？ ")

[api](./api/index.md "api")
