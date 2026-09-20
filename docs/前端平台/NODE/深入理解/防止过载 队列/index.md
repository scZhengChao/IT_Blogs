# 防止过载 队列

[bagpipe.js](./file/bagpipe_heJoD8qvtk.js "bagpipe.js")

[bagpipe-source.js](./file/bagpipe-source_ddVMiRehvf.js "bagpipe-source.js")

1.bagpipe的解决方案

            在node作为服务器时，很容易的实现高并发的异步调用；最为消费者；但是下层服务器的压力就大了； 这个时候如何实现过载保护；

            在Node中我们可以十分方便利用异步和并行来提升我们的业务速度。但是，如果并发量过大，我们的服务器却可能吃不消，我们需要限制并发量。尽管

http模块自身有[http.Agent](http://nodejs.org/docs/latest/api/http.html#http_class_http_agent "http.Agent")

这样的玩意，用于控制socket的数量，但是通常我们的异步API早就封装好了。改动API的内部agent是不现实的，那么我们自己在逻辑层实现吧。

            异步调用的并发限制在不同的场景下的需求不同：在非实时场景下，让超出限制的并发暂时等待执行已经可以满足需求；但是在实时场景下，需要更细粒度，更合理的控制

    解决思路：

1. 通过一个队列来控制并发量
2. 如果当前活跃（指调用发起但未执行回调）的异步调用量小于限定值，从队列中取出执行
3. 如果活跃调用达到限定值，调用暂时存放在队列中
4. 每个异步调用结束时，从队列中取出新的异步调用执行

```纯文本 
 源码： bagpipe.js 
 'use strict'; 
 const EventEmitter = require('events'); 
 
 function hasOwnProperty(obj, key) { 
   return Object.prototype.hasOwnProperty.call(obj, key); 
 } 
 
 /** 
 * 构造器，传入限流值，设置异步调用最大并发数 
 * Examples: 
 * ``` 
 * var bagpipe = new Bagpipe(100); 
 * bagpipe.push(fs.readFile, 'path', 'utf-8', function (err, data) { 
 *   // TODO 
 * }); 
 * ``` 
 * Events: 
 * - `full`, 当活动异步达到限制值时，后续异步调用将被暂存于队列中。当队列的长度大于限制值的2倍或100的时候时候，触发`full`事件。事件传递队列长度值。 
 * - `outdated`, 超时后的异步调用异常返回。 
 * Options: 
 * - `disabled`, 禁用限流，测试时用 
 * - `refuse`, 拒绝模式，排队超过限制值时，新来的调用将会得到`TooMuchAsyncCallError`异常 
 * - `timeout`, 设置异步调用的时间上线，保证异步调用能够恒定的结束，不至于花费太长时间 
 * @param {Number} limit 并发数限制值 
 * @param {Object} options Options 
 */ 
 class Bagpipe extends EventEmitter { 
   constructor(limit, options = {}) { 
     super(); 
 
     this.limit = limit; 
     this.active = 0; 
     this.queue = []; 
     this.options = { 
       disabled: false, 
       refuse: false, 
       ratio: 1, 
       timeout: null 
     }; 
 
     if (typeof options === 'boolean') { 
       options = { 
         disabled: options 
       }; 
     } 
 
     for (var key in this.options) { 
       if (hasOwnProperty(options, key)) { 
         this.options[key] = options[key]; 
       } 
     } 
 
     // queue length 
     this.queueLength = Math.round(this.limit * (this.options.ratio || 1)); 
   } 
 
   /** 
    * 推入方法，参数。最后一个参数为回调函数 
    * @param {Function} method 异步方法 
    * @param {Mix} args 参数列表，最后一个参数为回调函数。 
    */ 
   push(method, ...args) { 
     if (typeof args[args.length - 1] !== 'function') { 
       args.push(function () {}); 
     } 
 
     var callback = args[args.length - 1]; 
 
     if (this.options.disabled || this.limit < 1) { 
       method(...args); 
       return this; 
     } 
 
     // 队列长度也超过限制值时 
     if (this.queue.length < this.queueLength || !this.options.refuse) { 
       this.queue.push({ 
         method: method, 
         args: args 
       }); 
     } else { 
       var err = new Error('Too much async call in queue'); 
       err.name = 'TooMuchAsyncCallError'; 
       callback(err); 
     } 
 
     if (this.queue.length > 1) { 
       this.emit('full', this.queue.length); 
     } 
 
     this.next(); 
     return this; 
   } 
 
   /*! 
    * 继续执行队列中的后续动作 
    */ 
   next() { 
     // 没到限制，或者没有排队 
     if (this.active >= this.limit || !this.queue.length) { 
       return; 
     } 
 
     const {method, args} = this.queue.shift(); 
 
     this.active++; 
 
     const callback = args[args.length - 1]; 
     var timer = null; 
     var called = false; 
 
     // inject logic 
     args[args.length - 1] = (err, ...rest) => { 
       // anyway, clear the timer 
       if (timer) { 
         clearTimeout(timer); 
         timer = null; 
       } 
       // if timeout, don't execute 
       if (!called) { 
         this._next(); 
         callback(err, ...rest); 
       } else { 
         // pass the outdated error 
         if (err) { 
           this.emit('outdated', err); 
         } 
       } 
     }; 
 
     var timeout = this.options.timeout; 
     if (timeout) { 
       timer = setTimeout(() => { 
         // set called as true 
         called = true; 
         this._next(); 
         // pass the exception 
         var err = new Error(timeout + 'ms timeout'); 
         err.name = 'BagpipeTimeoutError'; 
         err.data = { 
           name: method.name, 
           method: method.toString(), 
           args: args.slice(0, -1) 
         }; 
         callback(err); 
       }, timeout); 
     } 
     method(...args); 
   } 
   _next() { 
     this.active--; 
     this.next(); 
   } 
 } 
 
 
 
 源码： main：index.js 
 
 'use strict'; 
 const Bagpipe = require('./lib/bagpipe'); 
 Bagpipe.limitify = function (asyncCall, bagpipe) { 
     return function (...args) { 
         bagpipe.push(asyncCall, ...args); 
     }; 
 }; 
 module.exports = Bagpipe;
```


bagpipe的api主要暴露了一个push和full 方法

实践：

```纯文本 
 //十分尴尬的事； 作者的npm 和 github 竟然不同步； 所以我把他源码给搞下来了 
 var Bagpipe = require('./bagpipe-source'); 
 var fs = require('fs') 
 var path = require('path') 
 function resolve(filepath) { 
     return path.resolve(__dirname, filepath) 
 } 
 
 // 深度使用 
 // refuse 拒绝模式 如果等待的调用队列也满了之后，新来的调用就直接它一个队列太忙的拒绝异常(阈值在于调用队列也满了之后) 
 //超时控制  为了防止调用的耗时太久，调用产生的速度远远高于执行的速度；需要设置一个时间阈值(阈值在异步操作时间) 
 //要理解这上面的两种区别 
 var bagpipe = new Bagpipe(10, { 
     refuse: false, 
     timeout:3000 
 }); 
 
 
 function async (data,encode,cb){ 
     setTimeout(()=>{ 
         cb(null,'123') 
     },2600) 
 } 
 //注意 on必须在 emit 前面 ； 正确 
 bagpipe.on('full', function(length) { 
     console.log('底层系统处理不能及时完成，队列拥堵，目前队列长度为：' + length); 
 }); 
 
 for (var i = 0; i < 1300; i++) { 
   // fs.readFile(files[i], 'utf-8', function (err, data) { 
 //   bagpipe.push(fs.readFile,resolve('./data.json') , 'utf-8', function (err, data) { 
     bagpipe.push(async,resolve('./data.json') , 'utf-8', function (err, data) { 
         // won’t occur error because of too many file descriptors 
         // well done 
         console.log(err,data) 
     }); 
 } 

```
