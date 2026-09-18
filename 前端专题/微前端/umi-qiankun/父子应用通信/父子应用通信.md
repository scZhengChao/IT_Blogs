# 父子应用通信

## 目录

- [基于 useModel() 的通信](#基于-useModel-的通信)
  - [主应用透传数据](#主应用透传数据)
  - [子应用消费数据](#子应用消费数据)
- [基于配置的通信](#基于配置的通信)

父子应用间的通信有两种实现的方法：

- 基于 `useModel()` 的通信。这是 Umi **推荐**的解决方案。
- 基于配置的通信。

### 基于 `useModel()` 的通信

该通信方式基于 [数据流](https://github.com/umijs/umi/blob/master/packages/plugins/src/model.ts "数据流") 插件，此插件已经内置于 `@umi/max` 解决方案当中。

该通信方式需要子应用**基于 Umi 开发**且**引入了该数据流插件**。

关于此插件的详细介绍可见[数据流指南](https://umijs.org/docs/max/data-flow "数据流指南")。

#### 主应用透传数据

如果通过**路由的模式引入子应用**，则需要在父应用的 `src/app.ts` 里导出一个名为 `useQiankunStateForSlave()` 的函数，该函数的返回值将传递给子应用：

```javascript 
// src/app.ts
export function useQiankunStateForSlave() {
  const [globalState, setGlobalState] = useState<any>({
    slogan: 'Hello MicroFrontend',
  });

  return {
    globalState,
    setGlobalState,
  };
}
```


如果通过**组件的模式引入子应用**，直接**将数据以组件参数的形式传递给子应用**即可：

```javascript 
import { useState } from 'react';
import { MicroApp } from 'umi';

export default function Page() {
  const [globalState, setGlobalState] = useState<any>({
    slogan: 'Hello MicroFrontend',
  });

  return (
    <MicroApp
      name="app1"
      globalState={globalState}
      setGlobalState={setGlobalState}
    />
  );
}
```


#### 子应用消费数据

**子应用会自动生成一个全局的 Model**，其命名空间为 `@@qiankunStateFromMaster`。通过 `useModel()` 方法，**允许子应用在任意组件中获取并消费父应用透传的数据**，如下所示：

```javascript 
import { useModel } from 'umi';

export default function Page() {
  const masterProps = useModel('@@qiankunStateFromMaster');
  return <div>{JSON.stringify(masterProps)}</div>;
}
```


或者可以通过高阶方法 `connectMaster()` 来获取并消费父应用透传的数据，如下所示：

```javascript 
import { connectMaster } from 'umi';

function MyPage(props) {
  return <div>{JSON.stringify(props)}</div>;
}

export default connectMaster(MyPage);
```


子应用也可以在**生命周期钩子中**能够获取并消费得到的 `props` 属性，根据需求[实现对应的生命周期钩子](https://umijs.org/docs/max/micro-frontend#子应用配置生命周期钩子 "实现对应的生命周期钩子")即可。

**特别的，当**父应用使用 `<MicroApp />` 或 `<MicroAppWithMemoHistory />` 组件的方式引入子应用时，会额外向子应用传递一个 `setLoading()` 方法，允许子应用在合适的时机执行，标记子应用加载为完成状态：

```javascript 
const masterProps = useModel('@@qiankunStateFromMaster');
masterProps.setLoading(false);

// 或者
function MyPage(props) {
  props.setLoading(false);
}
connectMaster(MyPage);
```


当子应用挂载完成变成 `MOUNTED` 状态时，会自动标记为完成状态。

### 基于配置的通信

在配置父应用[注册子应用](https://umijs.org/docs/max/micro-frontend#配置父应用 "注册子应用")时，可以传入 `props` 属性，将数据传递给子应用。

例如，修改父应用 `src/app.ts` 的 `qiankun` 导出方法如下：

```javascript 
// src/app.ts
export const qiankun = {
  apps: [
    {
      name: 'app1',
      entry: '//localhost:7001',
       props: {
        accountOnClick: (event) => console.log(event),
        accountName: 'Alex',
        accountAge: 21,
      }, 
    },
  ],
};
```


子应用在生命周期钩子中能够获取并消费得到的 props 属性，根据需求实现对应的生命周期钩子即可。
