# 常见Q\&A

Q1: `requestIdleCallback` 会在每一次帧结束时执行吗？

A1: 只会在**帧末尾有空闲时间时会执行**，**不应该期望**每一次帧结束都会执行`requestIdleCallback`。

Q2: 什么操作不适合放到 `requestIdleCallback` 的`callback`中。

A2: 更新DOM，以及Promise的回调（会使帧超时），什么意思？请看下面的代码。`requestIdleCallback`中代码，应该是一些可以预测执行时间的小段代码。

```typescript 

// console
// 空闲时间1
// 等待了1000ms
// 空闲时间2
// Promise 会在空闲时间1接受后立即执行，即使没有空闲时间了也是如此。拖延了进入下一帧的时间

requestIdleCallback(() => {
    console.log('空闲时间1')
    Promise.resolve().then(() => {
        sleep(1000)
        console.log('等待了1000ms')
    })
})

requestIdleCallback(() => {
    console.log('空闲时间2')
})

```
