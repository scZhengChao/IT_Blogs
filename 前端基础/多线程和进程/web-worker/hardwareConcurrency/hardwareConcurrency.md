# hardwareConcurrency

## 目录

- [值](#值)
- [示例](#示例)
- [浏览器兼容性](#浏览器兼容性)

**`navigator.hardwareConcurrency`** 只读属性返回用户计算机上可用于运行线程的逻辑处理器数量。

## [值](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/hardwareConcurrency#值 "值")

一个介于 1 和用户代理可能使用的逻辑处理器数量之间的数字。

现代计算机的 CPU 中有多个物理处理器核心（通常是两个或四个核心），但每个物理核心通常也能够使用先进的调度技术同时运行多个线程。例如，四核 CPU 可能提供八个**逻辑处理器核心**。逻辑处理器核心数量可以用来衡量能够有效同时运行的线程数量，而无需进行上下文切换。

但是，**浏览器可能会选择报告更低的逻辑核心数量**，以便更准确地表示**可以同时运行**的 [Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker "Worker") 数量，因此不要将其视为用**户系统中核心数量的绝对测量值。**

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/hardwareConcurrency#示例 "示例")

在这个示例中，**为浏览器报告的每个逻辑处理**器创建一个 [Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker "Worker")，并创建一个记录，其中包括对**新 Worker 的引用以及一个指示**是否正在使用该 `worker` 的布尔值；这些**对象被存储在一个数组中**，以便以后使用。这样就创建了**一个可用于稍后处理请求的 Worker 池。**

```javascript 
let workerList = [];

for (let i = 0; i < window.navigator.hardwareConcurrency; i++) {
  let newWorker = {
    worker: new Worker("cpuworker.js"),
    inUse: false,
  };
  workerList.push(newWorker);
}

```


## [浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/hardwareConcurrency#浏览器兼容性 "浏览器兼容性")

[Report problems with this compatibility data on GitHub](<https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/hardwareConcurrency\&metadata=\<!--+Do+not+make+changes+below+this+line+--\>&#xA;\<details\>&#xA;\<summary\>MDN+page+report+details\</summary\>&#xA;&#xA;*+Query:+`api.Navigator.hardwareConcurrency`&#xA;*+Report+started:+2024-09-26T12:58:20.103Z&#xA;&#xA;\</details\>\&title=api.Navigator.hardwareConcurrency+-+\<SUMMARIZE+THE+PROBLEM\>\&template=data-problem.yml> "Report problems with this compatibility data on GitHub")

|                       | desktop                    |                            |                            |                            |                                     | mobile                     |                            |                            |                                     |                             |                            |                                     | server                       |
| --------------------- | -------------------------- | -------------------------- | -------------------------- | -------------------------- | ----------------------------------- | -------------------------- | -------------------------- | -------------------------- | ----------------------------------- | --------------------------- | -------------------------- | ----------------------------------- | ---------------------------- |
|                       | Chrome                     | Edge                       | Firefox                    | Opera                      | Safari                              | Chrome Android             | Firefox for Android        | Opera Android              | Safari on iOS                       | Samsung Internet            | WebView Android            | WebView on iOS                      | Deno                         |
| `hardwareConcurrency` | 37&#xA;&#xA;Toggle history | 15&#xA;&#xA;Toggle history | 48&#xA;&#xA;Toggle history | 24&#xA;&#xA;Toggle history | 10.1 – 10.1&#xA;&#xA;Toggle history | 37&#xA;&#xA;Toggle history | 48&#xA;&#xA;Toggle history | 24&#xA;&#xA;Toggle history | 10.3 – 10.3&#xA;&#xA;Toggle history | 3.0&#xA;&#xA;Toggle history | 37&#xA;&#xA;Toggle history | 10.3 – 10.3&#xA;&#xA;Toggle history | 1.13&#xA;&#xA;Toggle history |
