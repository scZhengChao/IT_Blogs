# mobx-utils

## 目录

- [ 安装和导入问题](#-安装和导入问题)
- [fromPromise](#fromPromise)
- [queueProcessor](#queueProcessor)
  - [参数](#参数)
  - [示例](#示例)
  - [chunkProcessor](#chunkProcessor)
    - [参数](#参数)
    - [示例](#示例)

[ GitHub - mobxjs/mobx-utils: Utility functions and common patterns for MobX Utility functions and common patterns for MobX. Contribute to mobxjs/mobx-utils development by creating an account on GitHub. https://github.com/mobxjs/mobx-utils](https://github.com/mobxjs/mobx-utils " GitHub - mobxjs/mobx-utils: Utility functions and common patterns for MobX Utility functions and common patterns for MobX. Contribute to mobxjs/mobx-utils development by creating an account on GitHub. https://github.com/mobxjs/mobx-utils")

# &#x20;安装和导入问题

**问题描述**：新手在安装和导入 MobX-Utils 时可能会遇到依赖冲突或导入错误的问题。

**解决步骤**：

1. **安装 MobX-Utils**：
   - 使用 npm 安装：`npm install mobx-utils --save`
   - 使用 yarn 安装：`yarn add mobx-utils`
2. **检查依赖版本**：

- 确保 MobX 和 MobX-Utils 的版本兼容。可以在 `package.json` 中指定版本，例如：

```json 
"dependencies": {
  "mobx": "^6.0.0",
  "mobx-utils": "^6.0.0"
}
```


# fromPromise

```typescript 

import { fromPromise } from 'mobx-utils';
 
const fetchResult = fromPromise(fetch("http://someurl"));
 
// 在React组件中使用
const MyComponent = observer(({ fetchResult }) => {
  switch(fetchResult.state) {
    case "pending": return <div>Loading...</div>;
    case "rejected": return <div>Ooops... {fetchResult.value}</div>;
    case "fulfilled": return <div>Gotcha: {fetchResult.value}</div>;
  }
});


const promise = fromPromise(fetchData());
promise.case({
  pending: () => <div>Loading...</div>,
  fulfilled: (value) => <div>{value}</div>,
  rejected: (error) => <div>Error: {error.message}</div>
});

```


# queueProcessor

`queueProcessor`获取一个可观察数组，对其进行观察，并对`processor` 添加到可观察数组的每个项目调用一次，可选择取消操作

### 参数

- `observableArray` \*\*[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array "Array") \<T>\*\*要跟踪的可观察数组实例
- `processor`
- `debounce` \*\*[数字](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number "数字")\*\*可选去抖时间（毫秒）。去抖时间为 0 时，处理器将同步运行（可选，默认`0`）

### 示例

```typescript 
const pendingNotifications = observable([])
const stop = queueProcessor(pendingNotifications, msg => {
  // show Desktop notification
  new Notification(msg);
})

// usage:
pendingNotifications.push("test!")
```


返回**IDisposer**停止处理器

## chunkProcessor

`chunkProcessor`接受一个可观察数组，观察它并调用`processor` 一次，将一组项目添加到可观察数组中，可选择取消操作。最大块大小可以通过数字来限制。这允许将较大的块拆分为较小的块，或（在取消抖动时）将较小的块和/或单个项目组合成合理的工作块。

### 参数

- `observableArray` \*\*[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array "Array") \<T>\*\*要跟踪的可观察数组实例
- `processor`
- `debounce` \*\*[数字](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number "数字")\*\*可选去抖时间（毫秒）。去抖时间为 0 时，处理器将同步运行（可选，默认`0`）
- `maxChunkSize` \*\*[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number "number")\*\*可选不调用完整数组，而是调用较小的块。如果为 0，它将处理完整数组。（可选，默认`0`）

### 示例

```typescript 
const trackedActions = observable([])
const stop = chunkProcessor(trackedActions, chunkOfMax10Items => {
  sendTrackedActionsToServer(chunkOfMax10Items);
}, 100, 10)

// usage:
trackedActions.push("scrolled")
trackedActions.push("hoveredButton")
// when both pushes happen within 100ms, there will be only one call to server
```


返回**IDisposer**停止处理器
