# 怎样阻止函数被调用太快或者太多次？&#x20;

如果你有一个 `onClick` 或者 `onScroll` 这样的事件处理器，想要阻止回调被触发的太快，那么可以限制执行回调的速度，可以通过以下几种方式做到这点：&#x20;

- **节流**：基于时间的频率来进行抽样更改 (例如 [\_.throttle](https://lodash.com/docs#throttle "_.throttle"))
- **防抖：** 一段时间的不活动之后发布更改 (例如 [\_.debounce](https://lodash.com/docs#debounce "_.debounce"))
- `requestAnimationFrame` 节流：基于 `requestAnimationFrame` 的**抽样更改 (例如 **[**raf-schd**](https://react.docschina.org/docs/%5B%60raf-schd%60%5D\(https://github.com/alexreardon/raf-schd\) "raf-schd")**)**

注意：

&#x20;`_.debounce`、`_.throttle` 和 `raf-schd` 都提供了一个 \*\*cancel 方法来取消延迟回调。你需要在 ****`componentWillUnmount`**** 中调用该方法，\*\*或者对代码进行检查来保证在延迟函数有效期间内组件始终挂载。  [https://react.docschina.org/docs/faq-functions.html](https://react.docschina.org/docs/faq-functions.html "https://react.docschina.org/docs/faq-functions.html")
