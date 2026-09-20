# web worker

## 目录

- [致命bug](#致命bug)
- [Performance分析假死期间的性能表现](#Performance分析假死期间的性能表现)
- [在Vue中 使用 Web Worker](#在Vue中-使用-Web-Worker)
- [对比试验](#对比试验)
- [前戏差不多了，上硬菜](#前戏差不多了上硬菜)
- [35s变成6s](#35s变成6s)
- [web worker 提高Canvas运行速度](#web-worker-提高Canvas运行速度)
- [Web Worker的限制](#Web-Worker的限制)
- [计算时长 超过多长时间 适合用Web Worker](#计算时长-超过多长时间-适合用Web-Worker)
  - [通信时长](#通信时长)
- [场景补充说明](#场景补充说明)
- [总结](#总结)

如何让前端拥有后端的计算能力？一文彻底了解Web Worker，十万、百万条数据都是弟弟

**页面中有十万条数据，对其进行复杂运算，需要多久呢？**

表格4000行，25列，总十万条数据

![](https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHoAGUDSgTOrPzhda9iacsPfokgCKvhibwoO2NzbkXjicH6ywjVTiaKSeHAK1tdPOQGSHvnYx1cOp1Aj8Q/640?wx_fmt=other\&wxfrom=5\&wx_lazy=1\&wx_co=1)

运算包括：`总和、算术平均、加权平均、最大、最小、计数、样本标准差、样本方差、中位数、总体标准差、总体方差`

答案是: **35s 左右**

![](https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHoAGUDSgTOrPzhda9iacsPfoF9MXvhhLu0gZx6PSjnwZ7vibk5HUQtkPI3kUtnMCnqRCCQwS8j8FEicQ/640?wx_fmt=other\&wxfrom=5\&wx_lazy=1\&wx_co=1)

**并且这个时间段内，页面一直处于假死状态，对页面做任何操作都没有反应（原地爆炸）**

*注：具体时间根据电脑配置会有所不同*

![](https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHoAGUDSgTOrPzhda9iacsPfo7gwwc0dsjHKja6uDTHBq8d00YEOBoN1BibibbWL831FgDHbqEXicQOZ1w/640?wx_fmt=other\&wxfrom=5\&wx_lazy=1\&wx_co=1)

**什么是假死？**

浏览器有GUI渲染线程与JS引擎线程，这两个线程是互斥的关系。当js有大量计算时，会造成 UI 阻塞，出现界面渲染卡顿、掉帧等情况，严重时会出现页面卡死的情况，俗称**假死**

## 致命bug

**强行送测吧**

测试小姐姐：你的页面又死了！！我：还没有死，在ICU…… ，过一会就好了测试小姐姐：已经等了好一会了，还不行啊，是个**致命bug**我：……

![](https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHoAGUDSgTOrPzhda9iacsPfoRMicATWficDRMPuvbHS1kicnQ24OsMcYI9bSKBtmXgwC45NZ03h0iaLgDQ/640?wx_fmt=other\&wxfrom=5\&wx_lazy=1\&wx_co=1)

**闯荡前端数十载，竟被提了个致命bug，颜面何在！**

## Performance分析`假死期间`的性能表现

**如下图所示： 此次计算总用时为35.45s**

重点从以下三个方面分析：

1、**FPS:** FPS: 表示每秒传输帧数，是分析动画的一个主要性能指标，绿色的长度越长，用户体验越好；反之红色越长，说明卡顿严重

**从图中看到FPS中有一条持续了35s的红线，说明这期间卡顿严重**

2、**火焰图Main**Main: 表示主线程运行状况，包括js的计算与执行、css样式计算、Layout布局等等。

展开Main,红色倒三角的为**Long Task**,执行时长50ms就属于长任务，会阻塞页面渲染

**从图中看到计算过程的Long Task执行时间为35.45s, 是造成页面假死的原因**

3、**Summary 统计汇总面板**Summary: 表示各指标时间占用统计报表

- Loading: 加载时间
- Scripting: js计算时间
- Rendering: 渲染时间
- Painting: 绘制时间
- Other: 其他时间
- Idle: 浏览器闲置时间

**Scripting代码执行为35.9s**

![](./image/image_21yYCB8mO_.png)

拿什么拯救你，我的页面

![](./image/image_yOJjJOpYmO.png)

召唤Web Worker，出来吧神龙

![](./image/image_qyitQqxyVA.png)

神龙，我想让页面的计算变快，并且不卡顿

Web Worker了解一下：

在HTML5的新规范中，实现了 Web Worker 来引入 js 的 “多线程” 技术, 可以让我们可以在页面主运行的 js 线程中加载运行另外单独的一个或者多个 js 线程。

**一句话： Web Worker专门处理复杂计算的，从此让前端拥有后端的计算能力**

## 在Vue中 使用 Web Worker

1、安装`worker-loader`

**npm install worker-loader**

2、编写worker.js

```html 
onmessage = function (e) {
  // onmessage获取传入的初始值
  let sum = e.data;
  for (let i = 0; i < 200000; i++) {
    for (let i = 0; i < 10000; i++) {
      sum += Math.random()
    }
  }
  // 将计算的结果传递出去
  postMessage(sum);
}
```


3、通过行内loader 引入 worker.js

```javascript 
import Worker from "worker-loader!./worker"
```


4、最终代码

```html 
<template>
    <div>
        <button @click="makeWorker">开始线程</button>
        <!--在计算时 往input输入值时 没有发生卡顿-->
        <p><input type="text"></p>
    </div>
</template>

<script>
    import Worker from "worker-loader!./worker";

    export default {
        methods: {
            makeWorker() {
                // 获取计算开始的时间
                let start = performance.now();
                // 新建一个线程
                let worker = new Worker();
                // 线程之间通过postMessage进行通信
                worker.postMessage(0);
                // 监听message事件
                worker.addEventListener("message", (e) => {
                    // 关闭线程
                    worker.terminate();
                    // 获取计算结束的时间
                    let end = performance.now();
                    // 得到总的计算时间
                    let durationTime = end - start;
                    console.log('计算结果:', e.data);
                    console.log(`代码执行了 ${durationTime} 毫秒`);
                });
            }
        },
    }
</script>
```


**计算过程中，在input框输入值，页面一直未发生卡顿**

![](https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHoAGUDSgTOrPzhda9iacsPfo2ibGn3vcP7n6Ae1sqkuxVSJAX1VN1teTXx03sy8mNFOvWYdgiaDpQmibA/640?wx_fmt=other\&wxfrom=5\&wx_lazy=1\&wx_co=1)

## 对比试验

如果直接把这段代码直接丢到主线程中 &#x20;
计算过程中，页面一直处于假死状态，input框无法输入

```html 
let sum = 0;
for (let i = 0; i < 200000; i++) {
    for (let i = 0; i < 10000; i++) {
      sum += Math.random()
    }
  }
```


## 前戏差不多了，上硬菜

![](https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHoAGUDSgTOrPzhda9iacsPfonU07t18aRIF6XbW5eUXVdclRn7LGNQzPsjyyt99HjIVvOjalMpSNAA/640?wx_fmt=other\&wxfrom=5\&wx_lazy=1\&wx_co=1)

**开启多线程，并行计算**

回到要解决的问题**执行多种运算时，给每种运算开启单独的线程，线程计算完成后要及时关闭**

多线程代码

```html 
<template>
    <div>
        <button @click="makeWorker">开始线程</button>
        <!--在计算时 往input输入值时 没有发生卡顿-->
        <p><input type="text"></p>
    </div>
</template>

<script>
    import Worker from "worker-loader!./worker";

    export default {
        data() {
          // 模拟数据
          let arr = new Array(100000).fill(1).map(() => Math.random()* 10000);
          let weightedList = new Array(100000).fill(1).map(() => Math.random()* 10000);
          let calcList = [
              {type: 'sum', name: '总和'},
              {type: 'average', name: '算术平均'},
              {type: 'weightedAverage', name: '加权平均'},
              {type: 'max', name: '最大'},
              {type: 'middleNum', name: '中位数'},
              {type: 'min', name: '最小'},
              {type: 'variance', name: '样本方差'},
              {type: 'popVariance', name: '总体方差'},
              {type: 'stdDeviation', name: '样本标准差'},
              {type: 'popStandardDeviation', name: '总体标准差'}
          ]
          return {
              workerList: [], // 用来存储所有的线程
              calcList, // 计算类型
              arr, // 数据
              weightedList // 加权因子
          }
        },
        methods: {
            makeWorker() {
                this.calcList.forEach(item => {
                    let workerName = `worker${this.workerList.length}`;
                    let worker = new Worker();
                    let start = performance.now();
                    worker.postMessage({arr: this.arr, type: item.type, weightedList: this.weightedList});
                    worker.addEventListener("message", (e) => {
                        worker.terminate();

                        let tastName = '';
                        this.calcList.forEach(item => {
                            if(item.type === e.data.type) {
                                item.value = e.data.value;
                                tastName = item.name;
                            }
                        })

                        let end = performance.now();
                        let duration = end - start;
                        console.log(`当前任务: ${tastName}, 计算用时: ${duration} 毫秒`);
                    });
                    this.workerList.push({ [workerName]: worker });
                })
            },
            clearWorker() {
                if (this.workerList.length > 0) {
                    this.workerList.forEach((item, key) => {
                        item[`worker${key}`].terminate && item[`worker${key}`].terminate(); // 终止所有线程
                    });
                }
            }
        },
        // 页面关闭，如果还没有计算完成，要销毁对应线程
        beforeDestroy() {
            this.clearWorker();
        },
    }
</script>

```


**worker.js**

```typescript 
import { create, all } from 'mathjs'
const config = {
  number: 'BigNumber',
  precision: 20 // 精度
}
const math = create(all, config);

//加
const numberAdd = (arg1,arg2) => {
  return math.number(math.add(math.bignumber(arg1), math.bignumber(arg2)));
}
//减
const numberSub = (arg1,arg2) => {
  return math.number(math.subtract(math.bignumber(arg1), math.bignumber(arg2)));
}
//乘
const numberMultiply = (arg1, arg2) => {
  return math.number(math.multiply(math.bignumber(arg1), math.bignumber(arg2)));
}
//除
const numberDivide = (arg1, arg2) => {
  return math.number(math.divide(math.bignumber(arg1), math.bignumber(arg2)));
}

// 数组总体标准差公式
const popVariance = (arr) => {
  return Math.sqrt(popStandardDeviation(arr))
}

// 数组总体方差公式
const popStandardDeviation = (arr) => {
  let s,
    ave,
    sum = 0,
    sums= 0,
    len = arr.length;
  for (let i = 0; i < len; i++) {
    sum = numberAdd(Number(arr[i]), sum);
  }
  ave = numberDivide(sum, len);
  for(let i = 0; i < len; i++) {
    sums = numberAdd(sums, numberMultiply(numberSub(Number(arr[i]), ave), numberSub(Number(arr[i]), ave)))
  }
  s = numberDivide(sums,len)
  return s;
}

// 数组加权公式
const weightedAverage = (arr1, arr2) => { // arr1: 计算列，arr2: 选择的权重列
  let s,
    sum = 0, // 分子的值
    sums= 0, // 分母的值
    len = arr1.length;
  for (let i = 0; i < len; i++) {
    sum = numberAdd(numberMultiply(Number(arr1[i]), Number(arr2[i])), sum);
    sums = numberAdd(Number(arr2[i]), sums);
  }
  s = numberDivide(sum,sums)
  return s;
}

// 数组样本方差公式
const variance = (arr) => {
  let s,
    ave,
    sum = 0,
    sums= 0,
    len = arr.length;
  for (let i = 0; i < len; i++) {
    sum = numberAdd(Number(arr[i]), sum);
  }
  ave = numberDivide(sum, len);
  for(let i = 0; i < len; i++) {
    sums = numberAdd(sums, numberMultiply(numberSub(Number(arr[i]), ave), numberSub(Number(arr[i]), ave)))
  }
  s = numberDivide(sums,(len-1))
  return s;
}

// 数组中位数
const middleNum = (arr) => {
  arr.sort((a,b) => a - b)
  if(arr.length%2 === 0){ //判断数字个数是奇数还是偶数
    return numberDivide(numberAdd(arr[arr.length/2-1], arr[arr.length/2]),2);//偶数个取中间两个数的平均数
  }else{
    return arr[(arr.length+1)/2-1];//奇数个取最中间那个数
  }
}

// 数组求和
const sum = (arr) => {
  let sum = 0, len = arr.length;
  for (let i = 0; i < len; i++) {
    sum = numberAdd(Number(arr[i]), sum);
  }
  return sum;
}

// 数组平均值
const average = (arr) => {
  return numberDivide(sum(arr), arr.length)
}

// 数组最大值
const max = (arr) => {
  let max = arr[0]
  for (let i = 0; i < arr.length; i++) {
    if(max < arr[i]) {
      max = arr[i]
    }
  }
  return max
}

// 数组最小值
const min = (arr) => {
  let min = arr[0]
  for (let i = 0; i < arr.length; i++) {
    if(min > arr[i]) {
      min = arr[i]
    }
  }
  return min
}

// 数组有效数据长度
const count = (arr) => {
  let remove = ['', ' ', null , undefined, '-']; // 排除无效的数据
  return arr.filter(item => !remove.includes(item)).length
}

// 数组样本标准差公式
const stdDeviation = (arr) => {
  return Math.sqrt(variance(arr))
}

// 数字三位加逗号，保留两位小数
const formatNumber = (num, pointNum = 2) => {
  if ((!num && num !== 0) || num == '-') return '--'
  let arr = (typeof num == 'string' ? parseFloat(num) : num).toFixed(pointNum).split('.')
  let intNum = arr[0].replace(/\d{1,3}(?=(\d{3})+(.\d*)?$)/g,'$&,')
  return arr[1] === undefined ? intNum : `${intNum}.${arr[1]}`
}

onmessage = function (e) {

  let {arr, type, weightedList} = e.data
  let value = '';
  switch (type) {
    case 'sum':
      value = formatNumber(sum(arr));
      break
    case 'average':
      value = formatNumber(average(arr));
      break
    case 'weightedAverage':
      value = formatNumber(weightedAverage(arr, weightedList));
      break
    case 'max':
      value = formatNumber(max(arr));
      break
    case 'middleNum':
      value = formatNumber(middleNum(arr));
      break
    case 'min':
      value = formatNumber(min(arr));
      break
    case 'variance':
      value = formatNumber(variance(arr));
      break
    case 'popVariance':
      value = formatNumber(popVariance(arr));
      break
    case 'stdDeviation':
      value = formatNumber(stdDeviation(arr));
      break
    case 'popStandardDeviation':
      value = formatNumber(popStandardDeviation(arr));
      break
    }

  // 发送数据事件
  postMessage({type, value});
}
```


## 35s变成6s

**从原来的35s变成了最长6s，并且计算过程中全程无卡顿，YYDS**

![](https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHoAGUDSgTOrPzhda9iacsPfopiaJHKzd1GxKEGhsT5o8IDhtuPKb5sXJicKJia1zMJgLhPhafts3m6VGg/640?wx_fmt=other\&wxfrom=5\&wx_lazy=1\&wx_co=1)

## web worker 提高Canvas运行速度

web worker除了单纯进行计算外还可以结合**离屏canvas**进行绘图，提升绘图的渲染性能和使用体验

**案例：**

```html 
<template>
    <div>
        <button @click="makeWorker">开始绘图</button>
        <canvas id="myCanvas" width="300" height="150"></canvas>
    </div>
</template>

<script>
    import Worker from "worker-loader!./worker";
    export default {
        methods: {
            makeWorker() {
                let worker = new Worker();
                let htmlCanvas = document.getElementById("myCanvas");
                // 使用canvas的transferControlToOffscreen函数获取一个OffscreenCanvas对象
                let offscreen = htmlCanvas.transferControlToOffscreen();
                // 注意：第二个参数不能省略
                worker.postMessage({canvas: offscreen}, [offscreen]);
            }
        }
    }
</script>
```


worker.js

```html 
onmessage = function (e) {
  // 使用OffscreenCanvas（离屏Canvas）
  let canvas = e.data.canvas;
  // 获取绘图上下文
  let ctx = canvas.getContext('2d');
  // 绘制一个圆弧
  ctx.beginPath() // 开启路径
  ctx.arc(150, 75, 50, 0, Math.PI*2);
  ctx.fillStyle="#1989fa";//设置填充颜色
  ctx.fill();//开始填充
  ctx.stroke();
}
```


**离屏canvas的优势**

1、对于复杂的canvas绘图，可以避免阻塞主线程

2、由于这种解耦，OffscreenCanvas的渲染与DOM完全分离了开来，并且比普通Canvas速度提升了一些

## Web Worker的限制

1、在 Worker 线程的运行环境中没有 window 全局对象，也无法访问 DOM 对象

2、Worker中只能获取到部分浏览器提供的 API，如`定时器`、`navigator`、`location`、`XMLHttpRequest`等

3、由于可以获取`XMLHttpRequest` 对象，可以在 Worker 线程中执行`ajax`请求

4、每个线程运行在完全独立的环境中，需要通过`postMessage`、 `message`事件机制来实现的线程之间的通信

## 计算时长 超过多长时间 适合用Web Worker

**原则：**

**运算时间超过50ms会造成页面卡顿，属于Long task，这种情况就可以考虑使用Web Worker**

但还要先考虑`通信时长`的问题

假如一个运算执行时长为100ms, 但是通信时长为300ms, 用了Web Worker可能会更慢

![](https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHoAGUDSgTOrPzhda9iacsPfoQK5a8thXoFzbUicwmg7RnofuMvHBC89ag3iaFC1FCr1myBgBvp9LorQg/640?wx_fmt=other\&wxfrom=5\&wx_lazy=1\&wx_co=1)

### 通信时长

新建一个web worker时, 浏览器会加载对应的worker.js资源

**下图中的Time是这个js资源的总时长: 包括加载时间、执行时间**

![](https://mmbiz.qpic.cn/sz_mmbiz/H8M5QJDxMHoAGUDSgTOrPzhda9iacsPfobPibTY3nYeTpTKVs7vKiaUYufDPK8YYGj9IzNwebJVw4Pd7T6ibKCGFvg/640?wx_fmt=other\&wxfrom=5\&wx_lazy=1\&wx_co=1)

**最终标准：**

**计算的运算时长 - 通信时长 > 50ms，推荐使用Web Worker**

## 场景补充说明

**遇到大数据，第一反应: 为什么不让后端去计算呢？**

这里比较特殊，表格4000行，25列 &#x20;
1）用户可以对表格进行灵活操作，比如删除任何行或列，选择或剔除任意行 &#x20;
2）用户可以灵活选择运算的类型，计算一个或多个

即便是让后端计算，需要把大量数据传给后端，计算好再返回，这个时间也不短 &#x20;
还可能出现用户频繁操作，接口数据被覆盖等情况

## 总结

**Web Worker为前端带来了后端的计算能力，扩大了前端的业务边界**

可以实现主线程与复杂计运算线程的分离，从而减轻了因大量计算而造成UI阻塞的情况

并且更大程度地利用了终端硬件的性能
