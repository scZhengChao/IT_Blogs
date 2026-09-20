# asap

内部基于`Promise`实现（`Node`端采用`process.nextTick`），他会使用可用的最快的异步传输机制，如果不支持`Promise`或`process.nextTick`或者`Web Worker`的 `MessageChannel`也可能会调用`setTimeout`方式进行调度。
