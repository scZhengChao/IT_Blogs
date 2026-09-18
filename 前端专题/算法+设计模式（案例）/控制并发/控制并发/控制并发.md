# 控制并发

## 目录

- [引出](#引出)
- [思路](#思路)
- [实现一](#实现一)
- [实现二](#实现二)
- [增加重试次数](#增加重试次数)

> 📌推荐

## 引出

题目：

```typescript 
// 设计一个函数，可以限制请求的并发，同时请求结束之后，调用callback函数
// sendRequest(requestList:,limits,callback):void
sendRequest(
  [
    ()=>request('1'),
    ()=>request('2'),
    ()=>request('3'),
    ()=>request('4')
  ],
  3, //并发数
  (res)=>{
     console.log(res)
  }
)

// 其中request 可以是： 
function request (url,time=1){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('请求结束：'+url);
            if(Math.random() > 0.5){
                resolve('成功')
            }else{
                reject('错误;')
            }
        },time*1e3)
    })
}

```


⚠️ 这里有几个概念需要明确一下

- 并发：并发是多个任务同时交替的执行（因为cpu执行指令的速度非常之快，它可以不必按顺序一段代码一段代码的执行，这样效率反而更加低下），这样看起来就是一起执行的，所以叫并发。
- 并行：可以理解为多个物理cpu或者有分布式系统，是真正的`'同时'`执行
- 并发控制：意思是多个并发的任务，一旦有任务完成，就立刻开启下一个任务
- 切片控制：将并发任务切片的分配出来，比如10个任务，切成2个片，每片有5个任务，当`前一片的任务`执行完毕，再开始`下一个片`的任务，这样明显效率`没并发控制那么高`了

## 思路

首先执行能执行的并发任务，根据并发的概念，**每个任务执行完毕后，捞起下一个要执行的任务。**

将关键步骤拆分出合适的函数来组织代码

1. 循环去启动能执行的任务
2. 取出任务并且推到执行器执行
3. 执行器内更新当前的并发数，并且触发捞起任务
4. 捞起任务里面可以触发最终的回调函数和调起执行器继续执行任务

# 实现一

1. 定义常量和函数

```typescript 
function sendRequest(requestList,limits,callback){
        const promises = requestList.slice() // 取得请求list（浅拷贝一份）
        // 得到开始时，能执行的并发数
        const concurrentNum = Math.min(limits,requestList.length)
        let concurrentCount = 0 // 当前并发数
        // 第一次先跑起可以并发的任务
        const runTaskNeeded = ()=> {
            let i = concurrentNum
            // 启动当前能执行的任务
            while (i) {
                i--
                // 取出任务并且执行任务
                const runTask = () => {
                    const task = promises.shift()
                    task && runner(task)
                }
                runTask()
                // 执行器
                // 执行任务，同时更新当前并发数
                const runner = async (task) => {
                    try {
                        concurrentCount++
                        await task()
                    } catch (error) {

                    } finally {
                        // 并发数--
                        concurrentCount--
                        // 捞起下一个任务
                        picker()
                    }
                }
                // 捞起下一个任务
                const picker = () => {
                    // 任务队列里还有任务并且此时还有剩余并发数的时候 执行
                    if (concurrentCount < limits && promises.length > 0) {
                        // 继续执行任务
                        runTask()
                        // 队列为空的时候，并且请求池清空了，就可以执行最后的回调函数了
                    } else if (promises.length == 0 && concurrentCount == 0) {
                        // 执行结束
                        callback && callback()
                    }
                }
            }
        }

        // 入口执行
        runTaskNeeded()

    }

```


# 实现二

核心代码是判断是当你 【**有任务执行完成**】 ，再去判断**是否有剩余还有任务可执行。 可以先维护一个pool（代表当前执行的任务**），利用await Promise.race这个pool，不就知道是否有任务执行完毕了吗？

```typescript 
async function sendRequest(requestList,limits,callback){
    // 维护一个promis  队列
    const promises = []
    // 当前的并发池,用Set结构方便删除
    const pool = new Set()  // set也是Iterable[]类型，因此可以放入到race里
     // 开始并发执行所有的任务
    for(let request of requestList){
        // 开始执行前，先await 判断 当前的并发任务是否超过限制
        if(pool.size >= limits){
e            // 这里因为没有try catch ，所以要捕获一下错误，不然影响下面微任务的执行
            await Promise.race(pool).catch(err=>err)
        }
        const promise = request()// 拿到promise
        // 删除请求结束后，从pool里面移除
        const cb = ()=>{
            pool.delete(promise)
        }
        // 注册下then的任
        promise.then(cb,cb)
        pool.add(promise)
        promises.push(promise)
    }
    // 等最后一个for await 结束，这里是属于最后一个 await 后面的 微任务
    // 注意这里其实是在微任务当中了， 当前的promises里面是能确保所有的promise都在其中(前提是await那里命中了if) 
    Promise.allSettled(promises).then(callback,callback)
}
```


# 增加重试次数

```javascript 
function sendRequest(requestList, limits, callback, retryTimes) {

    // 定义执行队列，表示所有待执行的任务
    const requestListWrapperedQueue = [];

    // 定义开始时能执行的并发数
    const concurrentNum = Math.min(limits, requestList.length);

    // 定义放在allSettled的所有promise
    const returnPromises = [];

    // 当前并发数
    let concurrentCount = 0;

    // 新增： 包裹promise,并且将相关信
    息重新包装放入请求队列
    const wrapePromise = (requestItem)=>{
        return new Promise((resolve,reject)=>{
            // 构建执行队列
            requestListWrapperedQueue.push({
                requestFn:requestItem,  // 请求函数放到此处
                resolve,
                reject,
                remainRetryTime:retryTimes // 剩余重试次数
            })
        })
    };

    // 启动初次能执行的任务
    const runTaskNeeded = () => {
        let i = 0
        // 启动当前的任务
        while(i < concurrentNum){
            i++
            runTask()
        }
    };

    // 取出任务并推送到执行器
    const runTask = () => {
        const task = requestListWrapperedQueue.shift()
        task && runner(task)
    };

    // 执行器，这里去执行任务
    const runner = async (task) => {
        const {
            requestFn,
            resolve,
            reject,
            remainRetryTime
        } = task;

        try {
            // 并发数 +1
            concurrentCount++
            // 执行任务
            const res = await requestFn()
            // 拿到结果，直接结束
            resolve(res)
            
        } catch (error) {
            // 判断还有无重试次数
            if(remainRetryTime > 0){
                // 重新放回队列，注意这样并不会影响allSettled结果的顺序
                requestListWrapperedQueue.push(task)
                // 剩余重试次数-1
                task.remainRetryTime --

            }else {
                // 没有剩余次数则直接结束
                reject(error)
            }

        }finally{
            // 并发数-1
            concurrentCount--
            // 捞起下一个任务
            picker()
        }
    };
    
    // 捞起下一个任务
    const picker = () => {
        if(concurrentCount < limits && requestListWrapperedQueue.length > 0 ){
            // 继续执行任务
            runTask()
        }
    };

    // 新增： 初始化，构建执行队列以及包裹promise
    const init = ()=>{
        for(let requestItem of requestList){
            const wrapperedPromise = wrapePromise(requestItem)
            // 构建包裹promise的数组，用于allSettled
            returnPromises.push(wrapperedPromise)
        }
    }

    // 开始执行函数
    const start = ()=>{
        init()
        runTaskNeeded()
    }
    
    // 开始
    start()
    
    // 新增：allSettled用来获取结果
    Promise.allSettled(returnPromises).then(callback,callback)
}

```
