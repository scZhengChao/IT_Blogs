# Redux 与 RxJS 状态管理的区别？

Redux 是基于 Flux 架构的实现，是典型的单向数据流体现：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d49e9e193a36465883a7d3c210720565~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

单向数据流特点如下：

1. Single Source of Truth：单一 Store，类似前端数据库
2. Every state change must dispatch action：每次 State 更改一定有对应的 Action
3. Reducer must be pure function：Reducer 操作数据时必须返回新的数据，而不能对元数据进行突变
4. Every component state is a slice of Store：即某个组件的状态是 Store 这个全局状态的一个切片

而 RxJS 则是 for Component 的，一份 UI 对应一份 Service 的分形架构：

![](./assets/image/image_bTwcMrycLE.png)

上述架构的主要有如下几点特点：

1. 组件与数据流融为整体，与外部数据流隔离，甚至将数据处理也融合在了数据流管道中，便于调试
2. 便于组件复用，因为数据流是组件的一部分，不具有传染性
3. 可以挂载在全局 Store 中，这样可以在全局可以在局部进行调试，较为灵活

当然也有将 RxJS 整合进 Redux 去使用：[redux-observable](https://link.juejin.cn?target=https://github.com/redux-observable/redux-observable "redux-observable")，它的数据流架构图如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35d77d83eabc4ead9513b57c12d20858~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

这个库**主要是用于替代 redux-saga/redux-thunk 等，用于 Redux 中异步 Action 的处理，** 因为是 Redux 的 Middleware，**所以数据流仍然是单向数据流**，这种情况下，针对事件、WebSocket 等非一次性单向的异步情况，很难与 Redux 单向数据流进行整合。

![](./assets/image/image_kY8lh_mYv5.png)
