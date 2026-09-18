# 子应用生命周期

## 目录

- [父应用配置生命周期钩子](#父应用配置生命周期钩子)
- [子应用配置生命周期钩子](#子应用配置生命周期钩子)

Qiankun 在 single-spa 的基础上实现了一些额外的生命钩子。按照微应用的生命周期顺序，Qiankun 支持的完整的生命钩子列表如下：

- `beforeLoad`，微应用**开始获取前**调用。最初，微应用为 `NOT_LOADED` 状态。
- [load](https://single-spa.js.org/docs/building-applications/#load "load")，微应用**获取完成时**调用。开始获取微应用时，微应用变成 `LOADING_SOURCE_CODE` 状态。若获取成功，微应用变成 `NOT_BOOTSTRAPPED` 状态；若获取失败，微应用变成 `LOAD_ERROR` 状态。
- [bootstrap](https://single-spa.js.org/docs/building-applications/#bootstrap "bootstrap")，微应用**初始化完成时**调用。开始初始化微应用时，微应用变成 `BOOTSTRAPPING` 状态。初始化完成时，微应用变成 `NOT_MOUNTED` 状态。
- `beforeMount`，微应用每次**开始挂载前**调用。
- [mount](https://single-spa.js.org/docs/building-applications/#mount "mount")，微应用每次**开始挂载时**调用。微应用变成 `MOUNTING` 状态。
- `afterMount`，微应用每次**挂载完成时**调用。微应用变成 `MOUNTED` 状态。
- `beforeUnmount`，微应用每次**开始卸载前**调用。
- [unmount](https://single-spa.js.org/docs/building-applications/#unmount "unmount")，微应用每次**开始卸载时**调用。微应用变成 `UNMOUNTING` 状态。
- `afterUnmount`，微应用每次**卸载完成时**调用。微应用变成 `NOT_MOUNTED` 状态。
- [unload](https://single-spa.js.org/docs/building-applications/#unload "unload")，微应用**卸载完成时**调用。微应用变成 `NOT_LOADED` 状态。

此外，还存在一个特殊的生命钩子 `update`，仅在使用 `<MicroApp />` 或 `<MicroAppWithMemoHistory />` 组件引入微应用时生效：状态为 `MOUNTED` 的微应用**手动刷新时**调用。开始更新时，微应用变成 `UPDATING` 状态；更新完成时，微应用变成 `MOUNTED` 状态。

您可以像这样手动刷新子应用：

```javascript 
import { useRef } from 'react';
import { MicroApp } from 'umi';

export default function Page() {
  const microAppRef = useRef();

  // 执行此方法时，更新子应用
  const updateMicroApp = () => {
    microAppRef.current?.update();
  };

  return <MicroApp name="app1" ref={microAppRef} />;
}
```


当您需要在子应用的生命周期里添加一些自定义的逻辑时 **，既可以在父应用中进行全局配置，也可以在子应用中进行单独配置。**

### 父应用配置生命周期钩子

在父应用的 `src/app.ts` 中导出 `qiankun` 对象进行全局配置，所有的子应用都将实现这些生命周期钩子：

```javascript 
// src/app.ts
export const qiankun = {
  lifeCycles: {
    // 所有子应用在挂载完成时，打印 props 信息
    async afterMount(props) {
      console.log(props);
    },
  },
};
```


### 子应用配置生命周期钩子

在子应用的 `src/app.ts` 中导出 `qiankun` 对象，实现生命周期钩子。子应用运行时仅支持配置 `bootstrap`、`mount` 和 `unmount` 钩子：

```javascript 
// src/app.ts
export const qiankun = {
  // 应用加载之前
  async bootstrap(props) {
    console.log('app1 bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props) {
    console.log('app1 mount', props);
  },
  // 应用卸载之后触发
  async unmount(props) {
    console.log('app1 unmount', props);
  },
};
```
