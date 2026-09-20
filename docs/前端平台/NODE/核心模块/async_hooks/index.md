# async\_hooks

## 目录

- [介绍](#介绍)
- [资料](#资料)

[ async\_hooks/context 异步上下文 | Node.js v22 文档  https://nodejs.cn/api/v22/async\_context.html#%E7%B1%BBasynclocalstorage](https://nodejs.cn/api/v22/async_context.html#%E7%B1%BBasynclocalstorage " async_hooks/context 异步上下文 | Node.js v22 文档  https://nodejs.cn/api/v22/async_context.html#%E7%B1%BBasynclocalstorage")

### 介绍

这些类用于关联状态并在整个回调和 promise 链中传播它。它们允许**在 Web 请求的整个生命周期或任何其他异步持续时间内存储数据**。它类似于其他语言中的线程本地存储。

`AsyncLocalStorage` 和 `AsyncResource` 类是 `node:async_hooks` 模块的一部分：

```javascript 
const { AsyncLocalStorage, AsyncResource } = require('node:async_hooks');
```


[AsyncLocalStorage](./AsyncLocalStorage/index.md "AsyncLocalStorage")

[AsyncResource](./AsyncResource/index.md "AsyncResource")

# 资料

[   https://juejin.cn/post/7328390254997028916?searchId=202512011912438FF1CFD2B156A992716D](https://juejin.cn/post/7328390254997028916?searchId=202512011912438FF1CFD2B156A992716D "   https://juejin.cn/post/7328390254997028916?searchId=202512011912438FF1CFD2B156A992716D")
