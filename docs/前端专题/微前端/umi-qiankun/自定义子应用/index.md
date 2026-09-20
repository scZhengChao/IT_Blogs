# 自定义子应用

## 目录

- [子应用加载动画](#子应用加载动画)
  - [基于 antd 的加载动画](#基于-antd-的加载动画)
  - [自定义加载动画](#自定义加载动画)
- [子应用错误捕获](#子应用错误捕获)
  - [基于 antd 的错误捕获组件](#基于-antd-的错误捕获组件)
  - [自定义错误捕获组件](#自定义错误捕获组件)

当**启用子应用加载动画或错误捕获能力**时，子应用接受一个额外的样式类 `wrapperClassName`，渲染的结果如下所示：

```javascript 
<div style={{ position: 'relative' }} className={wrapperClassName}>
  <MicroAppLoader loading={loading} />
  <ErrorBoundary error={e} />
  <MicroApp className={className} />
</div>
```


### 子应用加载动画

启用此能力后，当子应用正在加载时，会自动显示加载动画。当子应用挂载完成变成 `MOUNTED` 状态时，加载状态结束，显示子应用内容。

#### 基于 antd 的加载动画

当您使用 antd 作为项目组件库时，可以向子应用传入 `autoSetLoading` 属性以开启子应用加载动画，插件将会自动调用 antd 的 [\<Spin />](https://ant.design/components/spin-cn/ "<Spin />")[ 组件](https://ant.design/components/spin-cn/ " 组件")作为加载组件。

如果通过路由的模式引入子应用，可以配置如下：

```javascript 
// .umirc.ts
export default {
  routes: [
    {
      path: '/app1',
      microApp: 'app1',
       microAppProps: {
        autoSetLoading: true,
      },
     },
  ],
};
```


如果通过组件的模式引入子应用，直接将 `autoSetLoading` 作为参数传入即可

```javascript 
import { MicroApp } from 'umi';

export default function Page() {
  return <MicroApp name="app1"  autoSetLoading  />;
}
```


#### 自定义加载动画

如果您没有使用 antd 作为项目组件库，或希**望覆盖默认的加载动画样式时**，可以设置一个自定义的加载组件 `loader` 作为子应用的加载动画。

通过**路由的模式引入的子应用**，只支持在运行时配置，代码如下：

```javascript 
// .app.tsx
import CustomLoader from 'src/components/CustomLoader';

export const qiankun = () => ({
  routes: [
    {
      path: '/app1',
      microApp: 'app1',
       microAppProps: {
        loader: (loading) => <CustomLoader loading={loading} />,
      }, 
    },
  ],
});
```


通过组件的模式引入子应用，直接将 `loader` 作为参数传入即可：

```javascript 
import CustomLoader from '@/components/CustomLoader';
import { MicroApp } from 'umi';

export default function Page() {
  return (
    <MicroApp
      name="app1"
      loader={(loading) => <CustomLoader loading={loading} />}
    />
  );
}
```


其中，`loading` 为 `boolean` 类型参数，为 `true` 时表示仍在加载状态，为 `false` 时表示加载状态已结束。

如果项目中希望多个子应用使用统一的自定义加载动画，可以通过在主应用配置 `defaultLoader` 来完成

```javascript 
// .umirc.ts
qiankun: {
  master: {
    defaultLoader: '@/defaultLoader',
  },
},
```


其中，`defaultLoader` 为文件路径，统一约定放在 [src 目录](https://umijs.org/docs/guides/directory-structure#src-目录 "src 目录") 下，在 umi 中 `@` 即代表 `src` 目录。

`defaultLoader` 跟上述 `loader` 的实现一致，接收一个 `loading` 为 `boolean` 类型的参数。

```javascript 
// defaultLoader.tsx
import { Spin } from 'antd';

export default function (loading: boolean) {
  return <Spin spinning={loading} />;
}
```


注意：`loader` 的优先级高于 `defaultLoader`。

### 子应用错误捕获

启用此能力后，当子应用加载出现异常时，会自动显示错误信息。

#### 基于 antd 的错误捕获组件

当您使用 antd 作为项目组件库时，可以向子应用传入 `autoCaptureError` 属性以开启子应用错误捕获能力，插件将会自动调用 antd 的 [\<Result />](https://ant.design/components/result-cn/ "<Result />")[ 组件](https://ant.design/components/result-cn/ " 组件")作为错误捕获组件。

如（文案语言会自动读取 umi locale 配置切换）：

![](./assets/image/image_quYaIwflJq.png)

如果通过路由的模式引入子应用，可以配置如下：

```javascript 
// .umirc.ts
export default {
  routes: [
    {
      path: '/app1',
      microApp: 'app1',
      microAppProps: {
        autoCaptureError: true,
      },
    },
  ],
};
```


如果**通过组件的模式引入**子应用，直接将 `autoCaptureError` 作为参数传入即可：

```javascript 
import { MicroApp } from 'umi';

export default function Page() {
  return <MicroApp name="app1" autoCaptureError />;
}
```


#### 自定义错误捕获组件

如果您没有使用 antd 作为项目组件库，或希望覆盖默认的错误捕获组件样式时，可以设置一个自定义的组件 `errorBoundary` 作为子应用的错误捕获组件。

通过路由的模式引入的子应用，只支持在运行时配置，代码如下：

```javascript 
// .app.tsx
import CustomErrorBoundary from '@/components/CustomErrorBoundary';

export const qiankun = () => ({
  routes: [
    {
      path: '/app1',
      microApp: 'app1',
       microAppProps: {
        errorBoundary: (error) => <CustomErrorBoundary error={error} />,
      },
     },
  ],
});
```


通过组件的模式引入子应用，将 `errorBoundary` 作为参数传入即可：

```javascript 
import CustomErrorBoundary from '@/components/CustomErrorBoundary';
import { MicroApp } from 'umi';

export default function Page() {
  return (
    <MicroApp
      name="app1"
       errorBoundary={(error) => <CustomErrorBoundary error={error} />} 
    />
  );
}
```


其中，`error` 为 `Error` 类型参数。

如果项目中希望多个子应用使用统一的自定义错误捕获组件，可以通过在主应用配置 `defaultErrorBoundary` 来完成

```javascript 
// .umirc.ts
qiankun: {
  master: {
    defaultErrorBoundary: '@/defaultErrorBoundary',
  },
},
```


其中，`defaultErrorBoundary` 为文件路径，统一约定放在 [src 目录](https://umijs.org/docs/guides/directory-structure#src-目录 "src 目录") 下，在 umi 中 `@` 即代表 `src` 目录。

`defaultErrorBoundary` 跟上述 `errorBoundary` 的实现一致，接收一个 `error` 为 `Error` 类型的参数。

```javascript 
// defaultErrorBoundary.tsx
export default function (error: Error) {
  return <div>{error?.message}</div>;
}
```


注意：`errorBoundary` 的优先级高于 `defaultErrorBoundary`。
