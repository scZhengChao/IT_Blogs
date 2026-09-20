# async-pool

aysnc-pool 的基本使用

```javascript 
const timeout = i =>new Promise(resolve => setTimeout(() => resolve(i), i));
await asyncPool(2, [1000, 5000, 3000, 2000], timeout);

```


asyncPool 这个函数接受三个参数

- poolLimit（数字类型）：表示限制的并发数；
- array（数组类型）：表示任务数组；
- iteratorFn（函数类型）：表示迭代函数，用于实现对每个任务项进行处理，该函数会返回一个 Promise 对象或异步函数。

这里提醒一下，promise.then 中的函数执行是一异步的，而赋值是同步的

```javascript 
const a = Promise.resolve().then(()=>console.log(a))
// 等价于 此时 a 等于一个 pending 状态的 promise
const a = Promise.resolve().then()
a.then(()=>{
  console.log(a)
})
```


手写实现，这部分可能会多花点时间。可以拷贝代码多调试几次就知道了

```javascript 
async function asyncPool(poolLimit, array, iteratorFn) {
const ret = []; // 存储所有的异步任务
const executing = []; // 存储正在执行的异步任务
for (const item of array) {
    // 调用iteratorFn函数创建异步任务
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p); // 保存新的异步任务

    // 当poolLimit值小于或等于总任务个数时，进行并发控制
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e); // 保存正在执行的异步任务
      if (executing.length >= poolLimit) {
        await Promise.race(executing); // 等待较快的任务执行完成
      }
    }
  }
  return Promise.all(ret);
}

const timeout = i =>new Promise(resolve => setTimeout(() => { console.log(i); resolve(i) }, i));
// 当然,limit <= 0 的时候 我们可以理解为只允许一个请求存在 
asyncPool(2, [1000, 5000, 3000, 2000], timeout).then(res => {
  console.log(res)
})
```
