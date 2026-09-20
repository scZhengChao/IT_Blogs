# 中断Promise 链

## 目录

- [中断Promise 链](#中断Promise-链)

## 中断Promise 链

```javascript 
Promise.resolve().then(() => {
    console.log('ok1')
    return new Promise(()=>{})  // 返回“pending”状态的Promise对象
}).then(() => {
    // 后续的函数不会被调用
    console.log('ok2')
}).catch(err => {
    console.log('err->', err)
})

```
