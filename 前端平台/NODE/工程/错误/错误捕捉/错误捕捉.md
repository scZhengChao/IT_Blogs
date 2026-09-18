# 错误捕捉

## 目录

- [node uncaughtException 之后优雅的推出方案](#node-uncaughtException-之后优雅的推出方案)
  - [domain](#domain)
  - [ uncaughtException 事件](#-uncaughtException-事件)
  - [domain + uncaughtException](#domain--uncaughtException)
  - [express 中异常的处理  中间件集中处理](#express-中异常的处理--中间件集中处理)
  - [和 cluster 一起使用](#和-cluster-一起使用)
  - [不要通过 uncaughtException 来忽略错误](#不要通过-uncaughtException-来忽略错误)
  - [ pm2 对于 uncaughtException 的额外处理](#-pm2-对于-uncaughtException-的额外处理)
  - [要小心 worker.disconnect()](#要小心-workerdisconnect)
- [3.UnhandledPromiseRejectionWarning 让其一直冒泡（propagation），直至被进程捕获](#3UnhandledPromiseRejectionWarning让其一直冒泡propagation直至被进程捕获)
- [2.uncaughtException 事件 违背try catch 捕捉到的错误](#2uncaughtException-事件-违背try-catch-捕捉到的错误)
  - [uncaughtException 事件发生的条件](#uncaughtException-事件发生的条件)
  - [缺点与问题](#缺点与问题)
- [1.错误捕捉](#1错误捕捉)
  - [无法捕获的情况](#无法捕获的情况)
  - [能捕获到情况](#能捕获到情况)
    - [promise 异常处理](#promise-异常处理)

# **node uncaughtException 之后优雅的推出方案**

[ Node 出现 uncaughtException 之后的优雅退出方案\_onuncaughtexception-CSDN博客 文章浏览阅读4.2k次。转载：http://www.infoq.com/cn/articles/quit-scheme-of-node-uncaughtexception-emergence/Node 的异步特性是它最大的魅力，但是在带来便利的同时也带来了不少麻烦和坑，错误捕获就是一个。由于 Node 的异步特性，导致我们无法使用 try/catch 来捕获回调函数中的异常，例如:try {    https://blog.csdn.net/shmnh/article/details/51647807](https://blog.csdn.net/shmnh/article/details/51647807 " Node 出现 uncaughtException 之后的优雅退出方案_onuncaughtexception-CSDN博客 文章浏览阅读4.2k次。转载：http://www.infoq.com/cn/articles/quit-scheme-of-node-uncaughtexception-emergence/Node 的异步特性是它最大的魅力，但是在带来便利的同时也带来了不少麻烦和坑，错误捕获就是一个。由于 Node 的异步特性，导致我们无法使用 try/catch 来捕获回调函数中的异常，例如:try {    https://blog.csdn.net/shmnh/article/details/51647807")

&#x20;       **Node 的异步特性是它最大的魅力**，但是在带来便利的同时也带来了不少麻烦和坑，错误捕获就是一个 **。由于 Node 的异步特性，导致我们无法使用 try/catch 来捕获回调函数中的异常，**
\*\*      程序员永远无法保证代码中不出现****`uncaughtException`****，即便是自己代码写的足够小心，也不能保证用的第三方模块没有 bug.\*\*
&#x20;        当这种情况发生在 Web 服务上时结果是灾难性的。\*\*`uncaughtException`错误会导致当前的所有的用户连接都被中断，甚至不能返回一个正常的****`HTTP`**** 错误码，用户只能等到浏览器超时才能看到一个 no data received 错误。
\*\*         这是一种非常野蛮粗暴的异常处理机制，任何线上服务都不应该因为 `uncaughtException` 导致服务器崩溃。**一个友好的错误处理机制应该满足三个条件:**

1. **对于引发异常的用户，返回 500 页面**
2. **其他用户不受影响，可以正常访问**
3. **不影响整个进程的正常运行**

\*\*    ****很遗憾的是，保证 uncaughtException 不影响整个进程的健康运转是不可能的****。当 Node 抛出`uncaughtException`异常时就会丢失当前环境的堆栈，导致 Node 不能正常进行内存回收。也就是说，每一次 uncaughtException 都有可能导致内存泄露。\*\*​

\*\* 既然如此，退而求其次，\*\* \*\*我们可以在满足前两个条件的情况下退出进程以便重启服务。
\*\*​

### domain

**用 ****domain 来捕获异步异常 大部分的用这个属性来捕捉****,但是最新版的已经废弃了(简单介绍下)**
&#x20;   domain 主要的 API 有 domain.run 和 error 事件。简单的说，通过 domain.run 执行的函数中引发的异常都可以通过 domain 的 error 事件捕获:

```javascript title="domain"
var app = express();
var server = require('http').createServer(app);
var domain = require('domain');

// 中间件的处理  思想可以看一下
app.use(function (req, res, next) {
    var reqDomain = domain.create();
    reqDomain.on('error', function (err) { // 下面抛出的异常在这里被捕获
        res.send(500, err.stack); // 成功给用户返回了 500
    });
    reqDomain.run(next);
});

app.get('/', function () {
    setTimeout(function () {
        throw new Error('async exception'); // 抛出一个异步异常
    }, 1000);
});

```


**上面的代码将 ****`domain`****作为一个中间件来使用**，保证之后 **express 所有的**中间件都在domain.run 函数内部执行 \*\*。这些中间件内的异常都可以通过****`error`****事件来捕获。\*\*
\*\*    尽管借助于闭包，并没有丢失上下文信息,我们可以正常的给用户返回 500 错误 \*\*，**但是 domain 捕获到错误时依然会丢失堆栈信息，此时已经无法保证程序的健康运行，必须退出**。\*\*Node http server 提供了 ****`close`**** 方法，该方法在调****用时会停止 ****`server`**** 接收新的请求****，\*\***但不会断开当前已经建立的连接。**

```javascript 
 reqDomain.on('error', function () {
      try {
          // 强制退出机制
          var killTimer = setTimeout(function () {
              process.exit(1);
          }, 30000);
          killTimer.unref(); // 非常重要

          // 自动退出机制，停止接收新链接，等待当前已建立连接的关闭
          server.close(function () {
            // 此时所有连接均已关闭，此时 Node 会自动退出，不需要再调用process.exit(1) 来结束进程    
          });
      } catch(e) {
          console.log('err', e.stack);
      }
 });
```


***

**其中有几个关键点:**
\*\*    1.Node 有个非常好的特性，****所有连接都被释放后进程会自动结束，所以不需要再server.close 方法的回调函数中退出进程**
\*\*    2.强制退出机制: 因为用户连接有可能因为某些原因无法释放，在这种情况下应该强制退出整个进程。**\*\*    3.killTimer.unref():****如果不使用 unref 方法，那么****即使 server 的所有连接都关闭，Node 也会保持运行直到    ****killTimer 的回调函数被调用。unref 可以创建一个"不保持程序运行"的计时器。**
\*\*    4.处理异常时要小心的把异常处理逻辑用 try/catch 包住，避免处理异常时抛出新的异常**



### &#x20;**uncaughtException 事件**

**uncaughtException 是一个非常古老的事件。** ​**当 Node 发现一个未捕获的异常时，会触发这个事件。并且如果这个事件存在回调函数，Node 就不会强制结束进程**。这个特性，可以用来弥补domain 的不足:

```javascript 
process.on('uncaughtException', function (err) {
    console.log(err);
    try {
        var killTimer = setTimeout(function () {
            process.exit(1);
        }, 30000);
        killTimer.unref();
        server.close();
    } catch (e) {
        console.log('error when exit', e.stack);
    }
});
```


&#x20;   `uncaughtException` 事件的**缺点在于无法为抛出异常的用户请求返回一个 500 错误**，\*\*这是由于uncaughtException 丢失了当前环境的上下文最终出错的用户只能等待浏览器超时。
\*\*

### **domain + uncaughtException**

&#x20;      \*\*所以，我们可以结合两种异常捕获机制，用 \*\***domain 来捕获大部分的异常，并且提供友好的 500 页面以及优雅退出。对于剩下的异常，通过 uncaughtException 事件来避免服务器直接 crash。**

```javascript 
var app = express();
var server = require('http').create(app);
var domain = require('domain');

// 使用 domain 来捕获大部分异常
app.use(function (req, res, next) {
    var reqDomain = domain.create();
    reqDomain.on('error', function () {
        try {
            var killTimer = setTimeout(function () {
                process.exit(1);
            }, 30000);
            killTimer.unref();

            server.close();

            res.send(500);
        } catch (e) {
            console.log('error when exit', e.stack);
        }
    });

    reqDomain.run(next);
});

// uncaughtException 避免程序崩溃
process.on('uncaughtException', function (err) {
    console.log(err);
    try {
        var killTimer = setTimeout(function () {
            process.exit(1);
        }, 30000);
        killTimer.unref();

        server.close();
    } catch (e) {
        console.log('error when exit', e.stack);
    }
});

```


### **express 中异常的处理  中间件集中处理**

使用 `express` 时记住一定不要在 `controller` 的异步回调中抛出异常，例如:

```javascript 
app.get('/', function (req, res, next) { // 总是接收 next 参数
    mysql.query('SELECT * FROM users', function (err, results) {
        // 不要这样做
        if (err) throw err;

        // 应该将 err 传递给 errorHandler 处理
        if (err) return next(err);
    });
});
app.use(function (err, req, res, next) {
    // 带有四个参数的 middleware 专门用来处理异常
    res.render(500, err.stack);
});

```


### **和 cluster 一起使用**

&#x20;`cluster` 是 node 自**带的负载均衡模块**，使用 `cluster` 模块可以方便的建立起一套` master/slave` 服务。在使用 `cluster` 模块时，需要注意不仅需要调用 `server.close()` 来关闭连接，同时还需要调用 `cluster.worker.disconnect()` 通知 `master` 进程已停止服务:

```javascript 
var cluster = require('cluster');

process.on('uncaughtException', function (err) {
    console.log(err);
    try {
        var killTimer = setTimeout(function () {
            process.exit(1);
        }, 30000);
        killTimer.unref();
        server.close();
        if (cluster.worker) {
            cluster.worker.disconnect();
        }
    } catch (e) {
        console.log('error when exit', e.stack);
    }
});

```


### **不要通过 uncaughtException 来忽略错误**

当 `uncaughtException` 事件有一个以上的 `listener` 时，会阻止 `Node` 结束进程。**因此就有一个广泛流传的做法是监听 ****`process`**** 的 ****`uncaughtException`**** 事件来阻止进程退出，这种做法有内存泄露的风险**，所以千万不要这么做:

```javascript 
//javascript
process.on('uncaughtException', function (err) { // 不要这么做
    console.log(err);
});

```


### &#x20;**pm2 对于 uncaughtException 的额外处理**

> 如果你在用 pm2 0.7.1 之前的版本，那么要当心。pm2 有一个 bug，如果进程抛出了uncaughtException，**无论代码中是否捕获了这个事件，进程都会被 pm2 杀死。0.7.2 之后的 pm2 解决了这个问题**

### **要小心 worker**\*\*.****disconnect****()\*\*

如果你在退出进程时希望可以发消息给监控服务器，并且还使用了 cluster，那么这个时候要特别小心，比如下面的代码:

```javascript 
var udpLog = dgram.createSocket('udp4');
var cluster = require('cluster');

process.on('uncaughtException', function (err) {
    udpLog.send('process ' + process.pid + ' down');
    server.close();
    cluster.worker.disconnect();
});

```


**这份代码就不能正常的将消息发送出去。因为**\*\* udpLog.send 是一个异步方法\*\*，真正发消息的操作发生在下一个事件循环中。而在真正的发送消息之前 **`cluster.worker.disconnect()`**\*\* 就已经执行了。****`worker.disconnect()`**** 会在当前进程没有任何链接之后，杀掉整个进程，这种情况有可能发生在发送 log 数据之前，导致 log 数据发不出去。\*\*

一个解决方法是在 **udpLog.send 方法发送完数据后再调用 worker.disconnect:**

```javascript 
// 注意这里监听了 没有捕获掉的异常, 但是serve 不会 cash掉,但是栈堆消息会丢失 所以得重启
// 如果没有这个监听, serve 直接down 掉,即使有cluster 开启多个进程, 也会一个进程一个进程的down 掉
//糟糕！请求一直在等待，内存上涨。原因在于res.end 永远不会执行，
//现有的I/O处于等待的状态，已经开辟的资源不仅不会被释放，而且服务器还在不知疲倦地接受新的用户请求。
//所以需要优雅的重启
//我们可以用Cluster模式，由之而来的推荐做法是： - 针对发生异常的请求返回一个错误代码 - 出错的Worker不再接受新的请求 - 退出关闭Worker进程
// 或者就是pm2

    
var udpLog = dgram.createSocket('udp4');
var cluster = require('cluster');

process.on('uncaughtException', function (err) {
    udpLog.send('process ' + process.pid + ' down', function () {
        cluster.worker.disconnect();
    });
    server.close();
    // 保证 worker.disconnect 不会拖太久..
    setTimeout(function () {
        cluster.worker.disconnect();
    }, 100).unref();
});

```


**说了这么多，结论是****，目前为止(Node 0.10.25)，依然没有一个完美的方案来解决任意异常的优雅退出问题。用 domain 来捕获大部分异常，并且通过 uncaughtException 避免程序 crash 是目前来说最理想的方案。** ​**回调异常的退出问题在遇到 ****`cluster`**** 以后会更加复杂，特别是对于连接关闭的处理要格外小心。**

# **3.UnhandledPromiseRejectionWarning 让其一直冒泡（propagation），直至被进程捕获**

```javascript 
Promise((resolve,reject)=>{})  // 第一次必须有resolve 或者 rejected 处理 否则会UnhandledPromiseRejectionWarning
process.on('unhandledRejection', (reason, p) => {  // 未被 reject 处理的
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});
```


# **2.uncaughtException 事件 违背try catch 捕捉到的错误**

> `uncaughtException`，是`NodeJS`进程（`Process`）中的一个事件。如果进程中发生了**一个异常且异常没有被任何try...catch进行捕获就会触发这个事件。**

##### uncaughtException 事件发生的条件

1. 当程序发生了异常
2. 且异常未被 try...catch捕获

##### 缺点与问题

1. 无法**获取异常的上下文。**
2. 无法**给出友好的异常处理**。例如，当接口发生 uncaughtException 时，无法获取到 response对象（已经丢失了上下文），告知调用方服务当前出现异常。
3. 会导致内存泄露。`uncaughtException`事件发生后，会丢失\*\*当前环境的堆栈，可能导致Node不能正常进行内存回收，从而导致内存泄露。

   \*\*   &#x20;

由于使用 uncaughtException捕获异常，会导致内存泄露。建议的使用方式为，当 uncaughtException事件发生时，**记录error，然后结束 Node 进程进行重启服务。(😭然后我们在项目中并没有这样做。。。业务不允许重启。。)**

# **1.错误捕捉**

我们都知道 try catch 无法捕获 setTimeout 异步任务中的错误，那其中的原因是什么。以及异步代码在 js 中是特别常见的，我们该怎么做才比较？

### **无法捕获的情况**

```javascript 
function main() {
    try {
        setTimeout(() => {
            throw new Error('async error')
        }, 1000)
    } catch(e) {
        console.log(e, 'err')
        console.log('continue...')
    }
}
main();

```


**异步任务无法捕获 宏观 微观 大多数回调函数**

```javascript 
// 异步任务  宏任务
const task = () => {
    setTimeout(() => {
        throw new Error('async error')
    }, 1000)
}
// 主任务
function main() {
    try {
        task();
    } catch(e) {
        console.log(e, 'err')
        console.log('continue...')
    }
}

// 微任务（promise）的回调
// 返回一个 promise 对象
const promiseFetch = () =>
    new Promise((reslove) => {
    reslove();
})
function main() {
    try {
        // 回调函数里抛出错误
        promiseFetch().then(() => {
            throw new Error('err')
        })
    } catch(e) {
        console.log(e, 'eeee');
        console.log('continue');
    }
}

 

 //promise 的异常捕获 
function main1() {
    try {
        new Promise(() => {
            throw new Error('promise1 error')
        })
    } catch(e) {
        console.log(e.message);
    }
}
function main2() {
    try {
        Promise.reject('promise2 error');
    } catch(e) {
        console.log(e.message);
    }
}


```


**以上两个 try catch 都不能捕获到 error，****因为 promise 内部的错误不会冒泡出来，而是被 promise 吃掉了，** ​**同理promise 也不能捕获try catch 已经捕获到的错误**；

**只有通过 promise.catch 才可以捕获，所以用 Promise 一定要写 catch 啊****。promise 内部的无论是 reject 或者 throw new Error，都可以通过 catch 回调捕获。** ​

## 能捕获到情况

```javascript 
//回调 函数
// 定义一个 fn，参数是函数。
const fn = (cb: () => void) => {  //同步函数的回调 能被捕捉到
    cb();
};
function main() {
    try {
        // 传入 callback，fn 执行会调用，并抛出错误。
        fn(() => {
            throw new Error('123');
        })
    } catch(e) {
        console.log('error');
    }
}
main();

```


### promise 异常处理

```javascript 
// 用promise  处理异步异常 
const p3 = () => new Promise((reslove, reject) => {
    setTimeout(() => {
        reject('async error');
    })
});
function main3() {
    p3().catch(e => console.log(e));
}
main3();

function main3() {
    Promise.resolve(true).then(() => {
        try {
            throw new Error('then');
        } catch(e) {
            return e;
        }
    }).then(e => console.log(e.message));
}



```


async await 处理异步异常 async 函数处理异步流程是利器，但是它也不会自动去 catch 错误  try catch 捕捉到了promise

```javascript 
 const    fetchFailure   =   ( )  => new Promise((resolve, reject) => { 
     setTimeout(() => {// 模拟请求 
         if(1) reject('fetch failure...'); 
     }) 
 }) 
 async function main () { 
     try { 
         const res = await fetchFailure(); 
         console.log(res, 'res'); 
     } catch(e) { 
         console.log(e, 'e.message'); 
     } 
 } 
 main();
```
