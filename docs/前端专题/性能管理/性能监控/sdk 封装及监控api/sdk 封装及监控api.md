# sdk 封装及监控api

[rollup-monitor-sdk.zip](rollup-monitor-sdk_y4Hr9byIdP.zip "rollup-monitor-sdk.zip")

```纯文本 
     此项目 rollup打包  es6语法, 完全拆分 别人开源项目, 并非最终版, 并非直接使用, 第一次试水, 具有参考价值. 不许使用babel   开源地址:` https://github.com/a597873885/webfunny_monitor    webfunny_monitor
```


```纯文本 
 performance  api： 
 * 重定向次数：performance.navigation.redirectCount 
 * 重定向耗时: redirectEnd - redirectStart 
 * DNS 解析耗时: domainLookupEnd - domainLookupStart 
 * TCP 连接耗时: connectEnd - connectStart 
 * SSL 安全连接耗时: connectEnd - secureConnectionStart 
 * 网络请求耗时 (TTFB): responseStart - requestStart 
 * 数据传输耗时: responseEnd - responseStart 
 * DOM 解析耗时: domInteractive - responseEnd 
 * 资源加载耗时: loadEventStart - domContentLoadedEventEnd 
 * 首包时间: responseStart - domainLookupStart 
 * 白屏时间: responseEnd - fetchStart 
 * 首次可交互时间: domInteractive - fetchStart 
 * DOM Ready 时间: domContentLoadEventEnd - fetchStart 
 * 页面完全加载时间: loadEventStart - fetchStart 
 * http 头部大小：transferSize - encodedBodySize 
 
 let p = window.performance.getEntries(); 
 重定向次数：performance.navigation.redirectCount 
 JS 资源数量: p.filter(ele => ele.initiatorType === "script").length 
 CSS 资源数量：p.filter(ele => ele.initiatorType === "css").length 
 AJAX 请求数量：p.filter(ele => ele.initiatorType === "xmlhttprequest").length 
 IMG 资源数量：p.filter(ele => ele.initiatorType === "img").length 
 总资源数量: window.performance.getEntriesByType("resource").length 
 
 不重复的耗时时段区分： 
 * 重定向耗时: redirectEnd - redirectStart 
 * DNS 解析耗时: domainLookupEnd - domainLookupStart 
 * TCP 连接耗时: connectEnd - connectStart 
 * SSL 安全连接耗时: connectEnd - secureConnectionStart 
 * 网络请求耗时 (TTFB): responseStart - requestStart 
 * HTML 下载耗时：responseEnd - responseStart 
 * DOM 解析耗时: domInteractive - responseEnd 
 * 资源加载耗时: loadEventStart - domContentLoadedEventEnd 
 
 其他组合分析： 
 * 白屏时间: domLoading - fetchStart 
 * 粗略首屏时间: loadEventEnd - fetchStart 或者 domInteractive - fetchStart 
 * DOM Ready 时间: domContentLoadEventEnd - fetchStart 
 * 页面完全加载时间: loadEventStart - fetchStart 
 
 
 
 js总加载耗时: 
 const p = window.performance.getEntries(); 
 let jsR = p.filter(ele => ele.initiatorType === "script"); 
 Math.max(...jsR.map((ele) => ele.responseEnd)) - Math.min(...jsR.map((ele) => ele.startTime)); 
 
 
 CSS 总加载耗时: 
 const p = window.performance.getEntries(); 
 let cssR = p.filter(ele => ele.initiatorType === "css"); 
 Math.max(...cssR.map((ele) => ele.responseEnd)) - Math.min(...cssR.map((ele) => ele.startTime)); 
 
 首屏 时间： 
 方法之一： 利用MutationObserver 接口提供了监视对 DOM 树所做更改的能力，是 DOM3 Events 规范的一部分。 
 方法：在首屏内容模块插入一个 div，利用 Mutation Observer API 监听该 div 的 dom 事件，判断该 div 的高度是否大于 0 或者大于指定值，如果大于了，就表示主要内容已经渲染出来，可计算首屏时间。 
 
 异常上报： 
 * 1） js error 监听 window.onerror 事件 
 * 2 ）promise reject 的异常 监听 unhandledrejection 事件 和 rejectionhandled 
 * 3）资源加载失败 window.addEventListener('error') 
 * 4）网络请求失败 重写 window.XMLHttpRequest 和 window.fetch 捕获请求错误 
 * 5）iframe 异常 window.frames[0].onerror 
 * 6）window.console.error
```


![  ](640_EfJNYo_h1j.jpg "  ")
