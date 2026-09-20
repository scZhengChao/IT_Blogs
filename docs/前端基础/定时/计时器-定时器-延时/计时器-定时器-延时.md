# 计时器/定时器/延时

## 目录

- [setTimeout:](#setTimeout)
- [setInterval:](#setInterval)
- [setImmediate:](#setImmediate)
- [requestAnimationFrame:](#requestAnimationFrame)
- [举几个栗子加深思考 ](#举几个栗子加深思考-)
- [需要注意的点 ](#需要注意的点-)
- [计时器队列：](#计时器队列)

在JavaScript里，我们已经会使用一些原生提供的方法来实现需要延时执行的操作代码，比如很多在线时钟的制作，图片轮播的实现，还有一些广告弹窗，**但凡可以自动执行的东西，都是可以和定时器有关的**。今天就来和大家分享一下，关于我们在JavaScript里经常会使用到的定时器方法&#x20;

在JavaScript里，我们要学习四个定时器的使用方法，`setTiemout`、`setInterval`、`setImmediate`、`requestAnimationFrame`，一起来看看吧！&#x20;

# **setTimeout:**

设置一个定时器，在定时器到期后执行一次函数或代码段&#x20;

```javascript 
  var timeoutId = window.setTimeout(func[, delay,param1,...]);
 var timeoutId = window.setTimeout(code[, delay]);
```


上面用到的关键词名称的意义：&#x20;

- timeoutId: 定时器ID&#x20;
- func: 延迟后执行的函数&#x20;
- code: 延迟后执行的代码字符串，不推荐使用原理类似eval()&#x20;
- delay: 延迟的时间（单位：毫秒），默认值为0&#x20;
- param1: 向延迟函数传递而外的参数，IE9以上支持&#x20;

# **setInterval:**

以固定的时间间隔重复调用一个函数或者代码段&#x20;

```javascript 
  var intervalId = window.setInterval(func, delay[, param1,...]);
 var intervalId = window.setInterval(code, delay);
```


- intervalId: 重复操作的ID&#x20;
- func: 延迟调用的函数&#x20;
- code: 代码段&#x20;
- delay: 延迟时间，没有默认值&#x20;

# **setImmediate:**

在**浏览器完全结束当前运行的操作之后立即执行指定的函数**

**(仅IE10和Node 0.10+中有实现)，**

类似setTimeout(func, 0)&#x20;

```javascript 
  var immediateId = setImmediate(func[, param1, param2, ...]);
 var immediateId = setImmediate(func);
```


- immediateId: 定时器ID&#x20;
- func: 回调&#x20;

# **requestAnimationFrame:**

专门为**实现高性能的帧动画而设计的API，**但是不能指定延迟时间，而是根据**浏览器的刷新频率而定（帧）**&#x20;

```javascript 
  var requestId = window.requestAnimationFrame(func);
```


- func: 回调&#x20;

# 举几个栗子加深思考&#x20;

```javascript 
 // 下面代码执行之后会输出什么？
 var intervalId, timeoutId;
 timeoutId = setTimeout(function() {
    console.log(1);
 }, 300);
 setTimeout(function() {
   clearTimeout(timeoutId);
       console.log(2);
   }, 100);
   setTimeout('console.log("5")', 400);
   intervalId = setInterval(function() {
       console.log(4);
     clearInterval(intervalId);
   }, 200);
 }
 // 分别输出: 2、4、5

```


下面代码运行后的结果是什么？&#x20;

```javascript 
  // 题目一
 var t = true;
 
 setTimeout(function(){
    t = false;
 }, 1000);
 
 while(t){}
 
 alert('end');

```


alert永远都不会执行，因为JS是单线程的，且定时器的回调将在等待当前正在执行的任务完成后才执行，而while(t) {}直接就进入了死循环一直占用线程，不给回调函数执行机会

```javascript 
 for(var i = 0; i < 5; i++) {
 setTimeout(function() {
        console.log(i);
 }, 0);
}
```


代码会输出 5 5 5 5 5，理由同上，当i = 0时，生成一个定时器，将回调插入到事件队列中，等待当前队列中无任务执行时立即执行，而此时for循环正在执行，所以回调被搁置。当for循环执行完成后，队列中存在着5个回调函数，他们的都将执行console.log(i)的操作，**因为当前JS代码上中并没有使用块级作用域，** 所以i的值在for循环结束后一直为5，所以代码将输出5个5

```javascript 
 // 题目三
 var obj = {
    msg: 'obj',
   shout: function() {
     alert(this.msg);
   },
   waitAndShout: function() {
       setTimeout(function() {
         this.shout();
       }, 0);
   }
 };
 obj.waitAndShout();

```


Uncaught TypeError: this.shout is not a function

# 需要注意的点&#x20;

1.setTimeout有最小时间间隔限制，HTML5标准为4ms，小于4ms按照4ms处理，但是每个浏览器实现的最小间隔都不同&#x20;

2.因为JS引擎只有一个线程，所以它将会强制异步事件排队执行&#x20;

3.如果setInterval的回调执行时间长于指定的延迟，setInterval将无间隔的一个接一个执行&#x20;

4.this的指向问题可以通过bind函数、定义变量、箭头函数的方式来解决&#x20;

# 计时器队列：

```javascript 
 import logger from "modern/utils/logger";

const doTask = async (info) => {
  let {handler, latest, interval, count, isProcessing = false, retryInterval} = info
  const timeAt = count <= 0 ? interval : retryInterval //检查是首次还是重传操作
  if (Date.now() - latest > timeAt && !isProcessing) {
    info.isProcessing = true
    info.latest=Date.now()
    info.count = count + 1
    logger("doTask")
    const done = await handler()
    info.isProcessing = false
    logger("timeTask:", info.count >= info.maximum, done)
    if ((info.maximum === 0 ?false: info.count >= info.maximum) || done) { //清理失败过多,或者成功的任务
      const idx = timeTask.queen.indexOf(info)
      logger("idx:", idx)
      if (idx != -1) timeTask.queen.splice(idx,1)
    }
  }
}

export const timeTask = {
  timer: null, queen: [],
  isRunning: () => timeTask.timer != null,
  stop: (from='') => {
    logger("timeTask:stop",from)
    clearInterval(timeTask.timer)
    timeTask.timer = null
    timeTask.queen = []
  },
  put: (options = {}) => {
    let {handler, interval = 1 * 1000, maximum = 10, retryInterval = 3 * 1000} = options
    if (options instanceof Function) handler = options
    timeTask.queen.push({handler, interval, latest: Date.now(), count: 0, maximum, retryInterval})
    if (!timeTask.timer) {
      timeTask.timer = setInterval(async () => {
        logger("timeTask:peep")
        if (timeTask.queen.length <= 0) return timeTask.stop()
        timeTask.queen.sort((d1, d2) => (d1.count || 0) - (d2.count || 0))  // 上传次数少的排前面,避免失败的一直失败,影响队列
        for (const info of timeTask.queen) {
          await doTask(info)
        }
      }, 1000)
    }
  }
}

export default timeTask
```
