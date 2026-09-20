# Performance

## 目录

- [memory](#memory)
  - [浏览器兼容性](#浏览器兼容性)

# memory

```javascript 
timingInfo = performance.memory
```


[jsHeapSizeLimit](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/memory#jsheapsizelimit "jsHeapSizeLimit")

上下文内可用堆的最大体积，以字节计算。

[totalJSHeapSize](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/memory#totaljsheapsize "totalJSHeapSize")

已分配的堆体积，以字节计算。

[usedJSHeapSize](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/memory#usedjsheapsize "usedJSHeapSize")

当前 JS 堆活跃段（segment）的体积，以字节计算。

## [浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/memory#浏览器兼容性 "浏览器兼容性")

[Report problems with this compatibility data on GitHub](<https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/memory\&metadata=\<!--+Do+not+make+changes+below+this+line+--\>&#xA;\<details\>&#xA;\<summary\>MDN+page+report+details\</summary\>&#xA;&#xA;*+Query:+`api.Performance.memory`&#xA;*+Report+started:+2024-10-29T12:41:11.127Z&#xA;&#xA;\</details\>\&title=api.Performance.memory+-+\<SUMMARIZE+THE+PROBLEM\>\&template=data-problem.yml> "Report problems with this compatibility data on GitHub")

|                                    | desktop           |                    |                    |                    |                    | mobile             |                     |                    |                    |                     |                    |                    | server             |                    |
| ---------------------------------- | ----------------- | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------- | ------------------ | ------------------ | ------------------- | ------------------ | ------------------ | ------------------ | ------------------ |
|                                    | Chrome            | Edge               | Firefox            | Opera              | Safari             | Chrome Android     | Firefox for Android | Opera Android      | Safari on iOS      | Samsung Internet    | WebView Android    | WebView on iOS     | Deno               | Node.js            |
| \\---                              | \\---             | \\---              | \\---              | \\---              | \\---              | \\---              | \\---               | \\---              | \\---              | \\---               | \\---              | \\---              | \\---              | \\---              |
| \`memory \` DeprecatedNon-standard | 7  Toggle history | 79  Toggle history | No  Toggle history | 15  Toggle history | No  Toggle history | 18  Toggle history | No  Toggle history  | 14  Toggle history | No  Toggle history | 1.0  Toggle history | 37  Toggle history | No  Toggle history | No  Toggle history | No  Toggle history |

[PerformanceObserver](<../../Observer Api/PerformanceObserver/index.md> "PerformanceObserver")

[性能分析](IT/前端专题/性能管理/性能分析/性能分析.md "性能分析")
