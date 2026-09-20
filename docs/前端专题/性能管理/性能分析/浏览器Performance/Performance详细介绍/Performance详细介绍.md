# Performance详细介绍

## 目录

- [1. 整体结构](#1-整体结构)
- [2. 工具面板](#2-工具面板)
- [3. 概览面板](#3-概览面板)
  - [1. CPU](#1-CPU)
  - [2. NET](#2-NET)
  - [3. HEAP](#3-HEAP)
- [4. 线程面板](#4-线程面板)
  - [1. Network](#1-Network)
  - [2. Frames](#2-Frames)
  - [3. Timings](#3-Timings)
  - [4. Main](#4-Main)
  - [5. GPU](#5-GPU)
  - [6. Compositor](#6-Compositor)
  - [7. Raster](#7-Raster)
  - [8. Memory](#8-Memory)
- [5. 统计面板](#5-统计面板)
  - [1. Summary](#1-Summary)
  - [2. Bottom-Up](#2-Bottom-Up)
  - [3. Call tree](#3-Call-tree)
  - [4. Event Log](#4-Event-Log)
- [6. 示例](#6-示例)
  - [1. 性能分析](#1-性能分析)
  - [2. 性能优化](#2-性能优化)

# 1. 整体结构

![](image_xVBZO1B2fQ.png)

从上到下分别为 4 个区域：

1. 工具面板：包含录制，刷新页面分析，清除结果等一系列操作
2. 概览面板：高度概括随时间线的变动，包括 CPU，NET
3. 线程面板：例如 Network，Frames，Main 等
4. 统计面板：精确到毫秒级的分析，以及按调用层级，事件分类的整理

# 2. 工具面板

![](image_yH1I9soZs1.png)

工具面板常用功能：

1. `record`：开始记录页面运行时性能，再次点击结束记录并生成分析报告
2. `reload page`：重新加载页面并记录页面加载时的性能
3. `clear`: 清空所有录制的分析内容。
4. `Screenshots`：**是否启用屏幕截图，启用**后将会在录制时捕获每一帧的屏幕截图
5. `Memory`：是否**显示内存指标**
6. `Collect rubbish`：点击使其**强制进行垃圾回收**

# 3. 概览面板

概览面板分为CPU和NET两个区域，如果在工具面板中勾选Memory，会多出HEAP区域

![](image_kXv57OsC5h.png)

## 1. CPU

`CPU`资源使用情况，`CPU` 中面积图如果**充满色彩就表示该时间段 CPU 已达到极限**，颜色与统计面板中的 Summary 颜色数据表示一致

（1）白色：表示空闲时间

（2）灰色：表示其它事件花费的时间

（3）黄色：**表示 JavaScript 执行时间**

（4）紫色：表示**样式计算和布局（重排）时间**

（5）蓝色：表示**网络通信和 HTML 解析时间**

（6）绿色：表示**重绘时间**

（7）**红色：存在长任务（long task），页面卡顿**

视页面情况，每种颜色（任务）占比不一样。

## 2. NET

每条横杠表示一种资源。**深蓝色表示存在高优先级的资源请求的时间段**，**浅蓝色表示存在低优先级的资源请求**的时间段

## 3. HEAP

JS Heap，**JS堆内存使用情况**，如果曲线一直在增长，则说明可能存在内存泄露

# 4. 线程面板

## 1. Network

表示**服务器资源的加载情况。**

![](image_sUUfGa2EnK.png)

更推荐使用NetWork面板来看

![](image_tqifCnO3zD.png)

1. 在Waterfall中，**右侧离红线越远，说明请求开始的时间越晚（请求数量过多等原因）**
2. **蓝色或绿色越宽，**说明**内容下载或等待服务器响应时间越长（需后端优化）**
3. **灰色越宽，** 说明从重传开始到接收端正确响应的时间越长（**如果灰色过长，往往是丢包所致**）
4. **棕色越宽**，说明**从客户端开始尝试建立连接，到成功建立连接所需的时间越长**（**网络拥堵、服务器不可达等原因**）

除了Waterfall，还可以根据Size、Time列查看请求资源具体的大小和时间等信息

## 2. Frames

查看**每秒帧数**。将**鼠标悬停在其中一个绿色方块上会显示该帧的耗时和 FPS，**如出现**红色方块则表示出现掉帧**

![](image_2X13hi3jLT.png)

## 3. Timings

![](image_M3iIiIOngK.png)

1. FP（First Paint）：**首屏绘制，页面刚开始渲染的时间**
2. FCP（First ContentfulPaint）：**首屏内容绘制，首次绘制任何文本，图像**，非空白 canvas 或 SVG 的时间点
3. DCL（DOMContentLoaded）：**HTML 文档加载完成**
4. L（onload）：**页面所有资源加载完成**
5. LCP（Largest Contentful Paint ）：**最大内容绘制，页面上尺寸最大的元素绘制时间**

提示：加载顺序由页面决定，例如L可能在LCP之前，也可能在LCP之后

## 4. Main

记录了渲染进程中**主线程的执行记录，是我们分析具体函数耗时最常看的面板，**也是我们**常说的火焰图**

![](image_Olm4WwNopY.png)

首先，面板中会有很多的 Task，如果是**耗时长的 Task（超过50ms），其右上角会标红，**这个时候，我们可以选中标红的 Task。选中后，可以**看到哪些事件耗时了多少**，**点击压缩后的文件名，可以看到具体的代码**

![](image_PJXmecCUqI.png)

常见事件：

| Compile Code（黄色）           | **JavaScript代码正在被编译**  |
| -------------------------- | ---------------------- |
| Parse HTML **（蓝色**）        | Chrome执行**其HTML解析算法**  |
| Recalculate Style **（紫色）** | Chrome重**新计算了元素样式**    |
| Layout **（紫色）**            | **页面布局已被执行**           |
| **Paint（绿色）**              | **合成的图层被绘制到显示画面的一个区域** |

简单示例：

![](image_HKmmnbTUBk.png)

（1）在一个长任务Task中，**Parse HTML占据了较大的比**重，点击源文件，定位到的内容如下所示：

![](image_-Hw0HOYMI-.png)

（2）**Recalculate Style也占据了较大的比重**，点击源文件，定位到的内容如下所示：

![](image_j1IPcXKG25.png)

**读取offsetWidth属性会导致浏览器强制进行回流操作**。回流**操作会重新计算页面的布局，导致重新计算样式的时间变长**

## 5. GPU

可以直观看到**何时启动 GPU 加速**

## 6. Compositor

合成线程的执行记录，用来记录 html 绘制**阶段 (Paint)结束后的图层合成操作**

## 7. Raster

光栅化线程池，用来让 GPU 执行光栅化的任务

## 8. Memory

在勾选后，就会显示折线图，通过该图我们可以看到页**面中的内存使用的情况，比如 JS Heap(堆)，如果曲线一直在增长，则说明可能存在内存泄露。**

![](image_B9N6E7U5hk.png)

# 5. 统计面板

## 1. Summary

表示各指标时间占用统计报表，与总览区域里面的cpu使用区域颜色一致

![](image_yefF2u8mQf.png)

- 蓝色(Loading)：表示网络通信和 HTML 解析时间
- 黄色(Scripting)：表示 JavaScript 执行时间
- 紫色(Rendering)：表示样式计算和布局（重排）时间
- 绿色(Painting)：表示重绘时间
- 灰色(other)：表示其它事件花费的时间
- 白色(Idle)：表示空闲时间

## 2. Bottom-Up

可以看到各个事件消耗时间排序

![](image_evuQ6bMdIc.png)

这里有两列时间数据，**一是"Self Time"代表任务自身执行所消耗的时间，二是"Total Time"代表此任务及其调用的附属子任务一共消耗的时间。**

## 3. Call tree

可以看到**整个事件的调用栈。Call tree 使用比较少**，一般看Bottom-Up

## 4. Event Log

是按**顺序记录的事件日志**，常见的优化级别中一般用不到它

![](image_BwY0TqrLWA.png)

# 6. 示例

## 1. 性能分析

影响页面性能的因素有很多，比如网络请求，js执行时间，内存泄漏，页面的重排与重绘等等。这里以JS执行时间，以及如何使用performance面板排查为例。

首先，准备这样一段代码

```javascript 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>worker performance optimization</title>
  </head>
  <body>
    <script>
      function a() {
        let total = 0;
        for (let i = 0; i < 10 * 10000 * 10000; i++) {
          total += i;
        }
        console.log("a:", total);
      }

      a();
    </script>
  </body>
</html>

```


然后用无痕模式打开 chrome，无痕模式下没有插件，分析性能不会受插件影响。在performance面板中点击 reload 按钮进行性能分析。

![](image_Ri9BR0di47.png)

**飘红的Task即长任务，点击Task，可以在Bottom-Up中看到各个函数所耗费的时长，** 其中a函数耗费最久，点击右侧的a.html，可以定位到源码对应的位置

![](image_-rbijRkRM8.png)

这样我们就定位到了耗时长的函数，并进行改进。

## 2. 性能优化

使用浏览器的 web worker进行耗时任务的计算

新建worker.js

```javascript 
self.onmessage = (e) => {
  let total = 0;
  let num = e.data;
  for (let i = 0; i < num; i++) {
    total += i;
  }
  self.postMessage("worker返回值：" + total);
  self.close(); //发送完后关闭
};

```


修改a.html

```javascript 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>worker performance optimization</title>
  </head>
  <body>
    <script>
      function runWorker(url, num) {
        return new Promise((resolve, reject) => {
          const worker = new Worker(url);
          worker.postMessage(num);
          worker.onmessage = (e) => {
            resolve(e.data);
          };
          worker.onerror = reject; //错误处理
        });
      }

      function a() {
        //不能打开本机的文件系统，需使用网络资源
        runWorker("http://127.0.0.1:5501/worker.js", 10 * 10000 * 10000).then(
          (res) => {
            console.log("a:", res);
          }
        );
      }

      a();
    </script>
  </body>
</html>

```


安装VSCode插件Live Server，使用open with live Server打开a.html，并进行性能分析

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63b0e6f04f2443bea39014161aa8a2f7~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=325\&h=238\&s=6896\&e=png\&b=fafafa)

可以看到Main主线程中，长任务已经没有了，多了一个Worker线程，长任务在Worker线程中执行
