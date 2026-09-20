# API

## 目录

- [MasterOptions](#MasterOptions)
- [SlaveOptions](#SlaveOptions)
- [App](#App)
- [Route](#Route)
- [MicroAppProps](#MicroAppProps)

### MasterOptions

| 属性                     | 必填 | 说明                                 | 类型                                                                                                                        | 默认值         |
| ---------------------- | -- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `enable`               | 否  | 启用 Qiankun 微应用插件，设置为 `false` 时为不启用 | `boolean`                                                                                                                 | `undefined` |
| `apps`                 | 是  | 微应用配置                              | [App\[\]](https://umijs.org/docs/max/micro-frontend#app "App\[]")                                                         | `undefined` |
| `routes`               | 否  | 微应用运行时的路由                          | [Route\[\]](https://umijs.org/docs/max/micro-frontend#route "Route\[]")                                                   | `undefined` |
| `defaultErrorBoundary` | 否  | 子应用默认的错误捕获组件，值为文件路径                | `string`                                                                                                                  | -           |
| `defaultLoader`        | 否  | 子应用默认的加载动画，值为文件路径                  | `string`                                                                                                                  | -           |
| `sandbox`              | 否  | 是否开启沙箱模式                           | `boolean \| { strictStyleIsolation: boolean, experimentalStyleIsolation: boolean }`                                       | `true`      |
| `prefetch`             | 否  | 是否启用微应用预加载                         | `boolean \| 'all' \| string[] \| (( apps: RegistrableApp[] ) => { criticalAppNames: string[]; minorAppsName: string[] })` | `true`      |

关于沙箱和预加载的介绍可见[此页面](https://qiankun.umijs.org/zh/api/#startopts "此页面")。

### SlaveOptions

| 属性       | 必填 | 说明                                 | 类型        | 默认值         |
| -------- | -- | ---------------------------------- | --------- | ----------- |
| `enable` | 否  | 启用 Qiankun 微应用插件，设置为 `false` 时为不启用 | `boolean` | `undefined` |

### App

| 属性            | 必填 | 说明                                                                                                 | 类型        | 默认值                                |
| ------------- | -- | -------------------------------------------------------------------------------------------------- | --------- | ---------------------------------- |
| `name`        | 是  | 微应用的名称                                                                                             | `string`  |                                    |
| `entry`       | 是  | 微应用的 HTML 地址                                                                                       | `string`  | `{ script: string[], styles: [] }` |
| `credentials` | 否  | 拉取微应用时同时拉取 Cookies，详见[此介绍](https://qiankun.umijs.org/zh/faq#如何解决拉取微应用-entry-时-cookie-未携带的问题 "此介绍") | `boolean` | `false`                            |
| `props`       | 否  | 父应用传递给微应用的数据，详见[父子应用通信章节](https://umijs.org/docs/max/micro-frontend#父子应用通信 "父子应用通信章节")             | `object`  | `{}`                               |

### Route

| 属性              | 必填 | 说明       | 类型                                                                                       | 默认值  |
| --------------- | -- | -------- | ---------------------------------------------------------------------------------------- | ---- |
| `path`          | 是  | 路由 PATH  | `string`                                                                                 |      |
| `microApp`      | 是  | 关联的微应用名称 | `string`                                                                                 |      |
| `microAppProps` | 否  | 微应用的配置   | [MicroAppProps](https://umijs.org/docs/max/micro-frontend#microappprops "MicroAppProps") | `{}` |

### MicroAppProps

| 属性                 | 必填 | 说明                                          | 类型                                | 默认值         |
| ------------------ | -- | ------------------------------------------- | --------------------------------- | ----------- |
| `autoSetLoading`   | 否  | 自动设置微应用的加载状态                                | `boolean`                         | `false`     |
| `loader`           | 否  | 自定义的微应用加载状态组件                               | `(loading) => React.ReactNode`    | `undefined` |
| `autoCaptureError` | 否  | 自动设置微应用的错误捕获                                | `boolean`                         | `false`     |
| `errorBoundary`    | 否  | 自定义的微应用错误捕获组件                               | `(error: any) => React.ReactNode` | `undefined` |
| `className`        | 否  | 微应用的样式类                                     | `string`                          | `undefined` |
| `wrapperClassName` | 否  | 包裹微应用加载组件、错误捕获组件和微应用的样式类，仅在启用加载组件或错误捕获组件时有效 | `string`                          | `undefined` |
