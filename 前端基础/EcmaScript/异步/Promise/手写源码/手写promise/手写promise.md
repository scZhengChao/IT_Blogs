# 手写promise

## 目录

- [then/catch/finally](#thencatchfinally)
- [resolve,reject](#resolvereject)
- [all](#all)
- [race](#race)

```javascript 
 //promise A+ 高级前端必问 then catch finally resolve reject all race
function Promise(fn) {
    /**
     * state: 保存状态  
     * pedding 等待
     * fulfilled  成功状态
     * rejected 失败
     */
    let state = 'pending'
    /**
     * value :返回值 或者说 在then 链式回调里传递的值（对错都有）
     */
    let value = null
    /**
     * 保存函数数组
     */
    const callbacks = []


    /**
     * 下面这三个就是promise 的构成了很重要
     * callback 为对象
     * 据我分析:对象包含4个值
     * onFulfilled 成功的函数
     * onRejected 失败的函数
     * resolve 打破promise的成功条件
     * reject 打破promise的失败条件
     * 只有handle 可以想callbacks 添加callback
     */
    function handle(callback) {
        // 如果在pedding状态下就把callback 添加到callbacks
        if (state === 'pending') {
            callbacks.push(callback)
            return
        }
        /**
         * 下面两个const
         * cb为需要执行的函数
         * next为 打断promise 的函数
         */
        const cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected
        const next = state === 'fulfilled' ? callback.resolve : callback.reject
        /**
         * 如何你没有传cb
         * 就打断promise,并且打断 handle 函数
         * 继续传递给下一个promise
         */
        if(!cb) {
            next(value)
            return
        }
        /**
         * 否者
         * 把cb 函数的返回值传给下一个 next
         */
        try {
            const ret = cb(value)
            next(ret)
        } catch (e) {
            callback.reject(e)
        }
    }


    /**
     * resolve 函数
     * 理解上面会对你理解这个有帮助
     * setTimeout 确保你promise 怎么处理都是异步的,不可能同步
     * 同样 resolve 和reject 和其他函数刚刚相反,它只在不是pedding的状态下执行
     * 同样 ; 它照单接收 你传入任何类型的值
     * 但是
     * resolve 接收的是promise或者满足条件的对象函数
     * 他会递归执行到最后
     * 就是说 返回的是一个确定的同步的值;
     */
    function resolve(newValue) {  
        const fn = () => {
            if (state !== 'pending') return
            if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                const { then } = newValue
                if (typeof then === 'function') {
                    /**
                     * 此处为递归
                     * 所以一定要有不满足条件的 !== function
                     * 否者会一直pedding
                     *
                     */
                    then.call(newValue, resolve, reject)
                    return
                }
            }
            state = 'fulfilled'
            // 替换value 为链路传递的值
            value = newValue
            handelCb()
        }
        setTimeout(fn, 0)
    }
    /**
     *
     * 同理： 几乎和 resolve 相反一摸一样
     */
    function reject(error) {   
        const fn = () => {
            if (state !== 'pending') return
             if (error && (typeof error === 'object' || typeof error === 'function')) {
                const { then } = error
                if (typeof then === 'function') {
                    then.call(error, resolve, reject)
                    return
                }
            }
             state = 'rejected'
            value = error
            handelCb()
        }
        setTimeout(fn, 0)
    }




    /**
     * 遍历执行 callbacks 里的函数
     * 执行一个删除一个
     * 知道callbacks.length 为0
     */
    function handelCb() {
        while (callbacks.length) {
            const fn = callbacks.shift()
            handle(fn)
        }
    }


    fn(resolve, reject) //启动
}


```


### then/catch/finally

```javascript 
/**
 * then(最关键的部分): 接收两个函数; resolve reject 函数 永远返回的是 promise 函数 方便连缀
 */
this.then = function (onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
        /**
         * 注意这里是同步的
         * 不要以为promise 全都是异步的
         * 初代promise 的同步内容 为同步的
         */
        handle({
            onFulfilled,
            onRejected,
            resolve,
            reject,
        })
    })
}
/**
 * catch  : 执行catch  就是 执行then 但是不传第一个resolve函数
 */
this.catch = function (onError) {
    this.then(null, onError)
}
/***
 * finally 函数 就是 then 但是resovle 和 reject 都执行 这个函数
 */
this.finally = function (onDone) {
    this.then(onDone, onDone)
}

```


### resolve,reject

```javascript 
/**
 * resolve  和 reject  立地成promise
 */
this.resolve = function (value) {
    // 如果value 是 promise 就直接返回
    if (value && value instanceof Promise) {
        return value
    }
    // object  而且 object的then 还为函数
    if (value && typeof value === 'object' && typeof value.then === 'function') {
        const { then } = value
        // 返回肯定为promise 且 value.then接收一个函数:这个函数是resolve;resolve 接收一个参数,这个参数就then(res=>{res就为这个此参数})
        return new Promise((resolve) => {
            then(resolve)
        })
    }
    // 如果有value 且 不满足上面条件 就 返回 value
    if (value) {
        return new Promise(resolve => resolve(value))
    }
    // 否者返回一个空
    return new Promise(resolve => resolve())
}
/**
 * reject  相对 resolve 简单 catch err == value
 */
this.reject = function (value) {
    return new Promise(((resolve, reject) => {
        reject(value)
    }))
}

```


### all

```javascript 
/**
     * 全部接收 promise  等待全部promise 返回成功 就返回
     */
    this.all = function (arr) {
        // 确定转化为数组
        const args = Array.prototype.slice.call(arr)
        // 无论什么情况下都是返回 promise
        return new Promise(((resolve, reject) => {
            // 如果没传 就返回 空[]
            if (args.length === 0) return resolve([])
            let remaining = args.length
            function res(i, val) {
                /**
                 * 这个地方有意思了
                 */
                try {
                    /**
                     * promise 都会进入 这个if 但是进入了这个if 的不一定都是Promise
                     * 当然我也不在乎, 谁来我都收
                     */
                    if (val && (typeof val === 'object' || typeof val === 'function')) {
                        const { then } = val
                        /**
                         * 这个地方厉害了
                         * 如果你是对象 或者 promise
                         * 我要取 then
                         * 而且你的then 要还必须的是函数
                         * 如何确定promise then已经执行完毕就是重点了
                         */
                        if (typeof then === 'function') {
                            /**
                             * 这个地方就有意思了,call必须bind this
                             * 如果他的then时函数的话 到这里都会被return 掉的.
                             * 在res函数里形成一个递归 ; 但reject会一下打断 promise 所以一个错其余的皆错
                             */
                            then.call(val, (val) => {
                                /**
                                 * res的目的
                                 * 为了then执行的时候 计数 和 打破闭包
                                 * 但是如果你的val 任然满足 结构出then且时函数的话
                                 * 会继续闭包下去,且不会被计数
                                 * 一旦计数 就确定不满足条件,
                                 * 且这条链路上的promise都执行到了then打破闭包
                                 */
                                res(i, val)
                            }, reject)
                            return
                        }
                    }
                    /**
                     * 其他情况下:原路返回,
                     */
                    args[i] = val
                    /**
                     * 即使前面有递归; 但是只有一个满足下面的判断,打断
                     */
                    if (--remaining === 0) { //等待所有的args 执行完 就resolve args 数组
                        resolve(args)
                    }
                } catch (ex) {
                    reject(ex)
                }
            }
            // 遍历执行 res  接收下标 和 对应的 promise
            for (let i = 0; i < args.length; i++) {
                res(i, args[i])
            }


        }))
    }
```


### race

```javascript 
/**
 * race 相比 all 简单多了
 * resovle 和 reject 执行一个 立即打断promise
 *
 */
this.race = function (values) {
    return new Promise(((resolve, reject) => {
        for (let i = 0, len = values.length; i < len; i++) {
            values[i].then(resolve, reject)
        }
    }))
}
```
