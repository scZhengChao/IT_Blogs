# async/await

## 目录

- [简介：](#简介)
- [async：](#async)
- [优缺点：](#优缺点)
- [实例：](#实例)

> 😉async / await

## 简介：

           使用 async / await, 搭配 promise, 可以通过编写

**形似同步的代码来**

处理异步流程, 提高代码的简洁性和可读性. 本文介绍 async / await 的基本用法和一些注意事项.

**注意 unload  async await不能锁住浏览器， 同步请求能锁住浏览器**

## async：

1. **使用 async function 可以定义一个 异步函数,**
2. \*\*async 函数的返回值很特殊: 不管在****函数体内 return 了****什么值,****async 函数的实际返回值总是一个 Promise 对象****.****若在 async 函数中 return 了一个值 x, 不管 x 值是什么类型, async 函数的实际返回值总是 Promise.resolve(x).**** \*\*

**而 await expression 的执行结果有以下几种情况:**

- 若 expression 是一个 Promise 对象, **并且其以值 x 被 fulfilled, 则返回值为 x**.
- 若 expression 是一个 Promise 对象, **并且其以异常 e 被 rejected, 则抛出异常 e.**
- 若 expression **不是 Promise 对象,** 则会将 expression **处理成一个以 expression 值被 fulfilled 的 Promise 对 象, 然后返回这个 Promise 对象的最终值 (即 expression 值).** 这种用法没太大意义, 因此实际使用时还是尽量在 await 后跟一个 Promise 对象.

另外需要注意的是, **await 在等待 Promise 对象**时会导致 **async function 暂停执**行, **一直到 Promise 对象决议之后才会 async function 继续执行.**

## 优缺点：

- 它做到了真正的串行的同步写法，代码阅读相对容易&#x20;
- 对于条件语句和其他流程语句比较友好，可以直接写到判断条件里面&#x20;
- 处理复杂流程时，在代码清晰度方面有优势&#x20;
- 无法处理promise返回的reject对象，要借助try...catch..
- 用 await 可能会导致性能问题，因为 await 会阻塞代码，也许之后的异步代码并不依赖于前者，但仍然需要等待前者完成，导致代码失去了并发性。

## 实例：

1. 只能让 async 定义的异步函数 里面 await 同步执行

```javascript 
 async function getData() {
    // 假装请求数据1
    var data1 = await new Promise((resolve) => {
        setTimeout(() => {
            resolve('data1');
        }, 1000);
    });
    console.log(4)
    // 假装请求数据2且此请求依赖数据1
   var data2 = await new Promise((resolve) => {
        setTimeout(() => {
            resolve('data2');
        }, 1000);
    });
    return data2
}

getData().then((v) => {
    console.log(v);
});
console.log(3)  
// 3 4 data
// 注意如果 await 里面抛出错误 会直接进入catch 
//而不会执行await后年的代码；就把它直接理解成promise
```


1. 猜下面的打印顺序(非常经典)

```javascript 
 let  test = async ()=>{

    Promise.resolve('promise').then(res=>{
        console.log(res)
    })
    console.log('start')
  <---1--->
    // await new Promise((resolve,reject)=>{
    //     setTimeout(()=>{
    //         resolve('1111')
    //         console.log('1111')
    //     },0)
    // })
<---2---->
    // await setTimeout(()=>{
    //     console.log('1111')
    // },0)
<---3--->
    // await console.log('1111')
    
    console.log('end')
    return 'ss'
}
test().then(res=>{
    console.log(res)
})
// 当await 后面是promise 时；一切正常
start
promise
 1111
 end
ss
//当await 是非promise 的异步函数 时；
start
promise
end
ss
1111
//当await 是 同步函数时
start
1111
promise
end
ss
```


总结：不管await 后面是什么；这**个地方可以理解为总有一个promise站位加入任务队列**；当不是promise时直接promise.

**fulfilled；他原本是同步还是宏观任务；随它本身加入任务队列；**
