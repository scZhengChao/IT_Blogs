# useRequest

## 目录

- [快速上手](#快速上手)
- [错误重试](#错误重试)
  - [API](#API)
    - [Options](#Options)
  - [备注](#备注)
- [SWR](#SWR)
  - [API](#API)
    - [Options](#Options)
    - [clearCache](#clearCache)
  - [备注](#备注)
- [节流](#节流)
  - [API](#API)
  - [备注](#备注)
- [轮询](#轮询)
  - [备注](#备注)
- [基础](#基础)
  - [Result](#Result)
  - [Options](#Options)
- [防抖](#防抖)
  - [Options](#Options)
  - [备注](#备注)

[ ahooks 3.0  https://ahooks.js.org/zh-CN/hooks/use-request/index](https://ahooks.js.org/zh-CN/hooks/use-request/index " ahooks 3.0  https://ahooks.js.org/zh-CN/hooks/use-request/index")

# 快速上手

`useRequest` 是一个强大的异步数据管理的 Hooks，**React 项目中的网络请求场景使用 ****`useRequest`**** 就够了。**

`useRequest` 通过插件式组织代码，核心代码极其简单，并且可以很方便的扩展出更高级的功能。目前已有能力包括：

- 自动请求/手动请求
- 轮询
- 防抖
- 节流
- 屏幕聚焦重新请求
- 错误重试
- loading delay
- SWR(stale-while-revalidate)
- 缓存

```react 
const { data, error, loading,run,runAsync,cancel } = useRequest(getUsername,{
  manual: true, //手动触发
  loadingDelay: 300, // 延迟 loading 变成 true 的时间，有效防止闪烁
  pollingInterval: 3000, // 每隔 3000ms 请求一次,同时你可以通过 cancel 来停止轮询，通过 run/runAsync 来启动轮询
  pollingErrorRetryCount: 3, // 轮询错误重试次数。设置为 -1，则无限次
  pollingWhenHidden:false, // 页面隐藏时，是否继续轮询。如果设置为 false，在页面隐藏时会暂时停止轮询
  ready: true, // 当其值为 false 时，请求永远都不会发出。
  defaultParams:'1', // 默认参数
  refreshDeps: [userId], // 它的值变化后，会重新触发请求
  refreshOnWindowFocus: true, // 浏览器窗口 refocus 和 revisible 时，会重新发起请求
  debounceWait: 300, // 如果频繁触发 run 或者 runAsync，则会以防抖策略进行请求
  throttleWait: 300, // 繁触发 run 或者 runAsync，则会以节流策略进行请求。
  cacheKey: 'cacheKey-demo', // 下次组件初始化时，如果有缓存数据，我们会优先返回缓存数据，然后在背后发送新请求，也就是 SWR 
  retryCount: 3, // 错误重试次数，则 useRequest 在失败后会进行重试
});

```


`run` 与 `runAsync` 的区别在于：

- `run` 是一个普通的同步函数，我们会自动捕获异常，你可以通过 `options.onError` 来处理异常时的行为。
- `runAsync` 是一个返回 `Promise` 的异步函数，如果使用 `runAsync` 来调用，则意味着你需要自己捕获异常。

```react 
runAsync().then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
})

```


# 错误重试

## API

### Options

| 参数            | 说明                                                                                                                       | 类型       | 默认值 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ | -------- | --- |
| retryCount    | 错误重试次数。如果设置为 `-1`，则无限次重试。                                                                                                | `number` | -   |
| retryInterval | \*   重试时间间隔，单位为毫秒。&#xA;\*   如果不设置，默认采用简易的指数退避算法，取 `1000 * 2 ** retryCount`，也就是第一次重试等待 2s，第二次重试等待 4s，以此类推，如果大于 30s，则取 30s | `number` | -   |

## 备注

- `options.retryCount`、`options.retryInterval` 支持动态变化。
- `cancel` 可以取消正在进行的重试行为。

# SWR

## API

```react 
interface CachedData<TData, TParams> {
  data: TData;
  params: TParams;
  time: number;
}

```


### Options

| 参数        | 说明                                                                                                                   | 类型                                | 默认值      |
| --------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------- | -------- |
| cacheKey  | 请求唯一标识。如果设置了 `cacheKey`，我们会启用缓存机制。同一个 `cacheKey` 的数据全局同步。                                                            | `string`                          | -        |
| cacheTime | \*   设置缓存数据回收时间。默认缓存数据 5 分钟后回收&#xA;\*   如果设置为 `-1`, 则表示缓存数据永不过期                                                      | `number`                          | `300000` |
| staleTime | \*   缓存数据保持新鲜时间。在该时间间隔内，认为数据是新鲜的，不会重新发请求&#xA;\*   如果设置为 `-1`，则表示数据永远新鲜                                               | `number`                          | `0`      |
| setCache  | \*   自定义设置缓存&#xA;\*   `setCache` 和 `getCache` 需要配套使用&#xA;\*   在自定义缓存模式下，`cacheTime` 和 `clearCache` 不会生效，请根据实际情况自行实现。 | `(data: CachedData) => void;`     | -        |
| getCache  | 自定义读取缓存                                                                                                              | `(params: TParams) => CachedData` | -        |

### clearCache

```react 
import { clearCache } from 'ahooks';

clearCache(cacheKey?: string | string[]);
```


1. 支持清空单个缓存，或一组缓存
2. 如果 `cacheKey` 为空，则清空所有缓存数据

## 备注

- 只有成功的请求数据才会缓存
- 缓存的数据包括 `data` 和 `params`

# 节流

## API

throttle 所有参数用法和效果同 [lodash.throttle](https://www.lodashjs.com/docs/lodash.throttle/ "lodash.throttle")

| 参数               | 说明                       | 类型        | 默认值    |
| ---------------- | ------------------------ | --------- | ------ |
| throttleWait     | 节流等待时间, 单位为毫秒，设置后，进入节流模式 | `number`  | -      |
| throttleLeading  | 在节流开始前执行调用               | `boolean` | `true` |
| throttleTrailing | 在节流结束后执行调用               | `boolean` | `true` |

## 备注

- `options.throttleWait`、`options.throttleLeading`、`options.throttleTrailing` 支持动态变化。
- `runAsync` 在真正执行时，会返回 `Promise`。在未被执行时，不会有任何返回。
- `cancel` 可以中止正在等待执行的函数。

# 轮询

## 备注

- `options.pollingInterval`、`options.pollingWhenHidden` 支持动态变化。
- 如果设置 `options.manual = true`，则初始化不会启动轮询，需要通过 `run/runAsync` 触发开始。
- 轮询原理是在每次请求完成后，等待 `pollingInterval` 时间，发起下一次请求。

# 基础

### Result

| 参数           | 说明                                                                  | 类型                                                                    |
| ------------ | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| data         | service 返回的数据                                                       | `TData` \| `undefined`                                                |
| error        | service 抛出的异常                                                       | `Error` \| `undefined`                                                |
| loading      | service 是否正在执行                                                      | `boolean`                                                             |
| params       | 当次执行的 service 的参数数组。比如你触发了 `run(1, 2, 3)`，则 params 等于 `[1, 2, 3]`   | `TParams` \| `[]`                                                     |
| run          | \*   手动触发 service 执行，参数会传递给 service&#xA;\*   异常自动处理，通过 `onError` 反馈 | `(...params: TParams) => void`                                        |
| runAsync     | 与 `run` 用法一致，但返回的是 Promise，需要自行处理异常。                                | `(...params: TParams) => Promise<TData>`                              |
| refresh      | 使用上一次的 params，重新调用 `run`                                            | `() => void`                                                          |
| refreshAsync | 使用上一次的 params，重新调用 `runAsync`                                       | `() => Promise<TData>`                                                |
| mutate       | 直接修改 `data`                                                         | `(data?: TData / ((oldData?: TData) => (TData / undefined))) => void` |
| cancel       | 忽略当前 Promise 的响应                                                    | `() => void`                                                          |

### Options

| 参数            | 说明                                                                                          | 类型                                                   | 默认值     |
| ------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------- |
| manual        | \*   默认 `false`。 即在初始化时自动执行 service。&#xA;\*   如果设置为 `true`，则需要手动调用 `run` 或 `runAsync` 触发执行。 | `boolean`                                            | `false` |
| defaultParams | 首次默认执行时，传递给 service 的参数                                                                     | `TParams`                                            | -       |
| onBefore      | service 执行前触发                                                                               | `(params: TParams) => void`                          | -       |
| onSuccess     | service resolve 时触发                                                                         | `(data: TData, params: TParams) => void`             | -       |
| onError       | service reject 时触发                                                                          | `(e: Error, params: TParams) => void`                | -       |
| onFinally     | service 执行完成时触发                                                                             | `(params: TParams, data?: TData, e?: Error) => void` | -       |

# 防抖

### Options

debounce 所有参数用法和效果同 [lodash.debounce](https://www.lodashjs.com/docs/lodash.debounce/ "lodash.debounce")

| 参数               | 说明                       | 类型        | 默认值     |
| ---------------- | ------------------------ | --------- | ------- |
| debounceWait     | 防抖等待时间, 单位为毫秒，设置后，进入防抖模式 | `number`  | -       |
| debounceLeading  | 在延迟开始前执行调用               | `boolean` | `false` |
| debounceTrailing | 在延迟结束后执行调用               | `boolean` | `true`  |
| debounceMaxWait  | 允许被延迟的最大值                | `number`  | -       |

## 备注

- `options.debounceWait`、`options.debounceLeading`、`options.debounceTrailing`、`options.debounceMaxWait` 支持动态变化。
- `runAsync` 在真正执行时，会返回 `Promise`。在未被执行时，不会有任何返回。
- `cancel` 可以中止正在等待执行的函数。
