# 引入子引用

## 目录

- [引入子应用](#引入子应用)
  - [路由绑定引入子应用](#路由绑定引入子应用)
  - [\<MicroApp /> 组件引入子应用](#MicroApp--组件引入子应用)
  - [\<MicroAppWithMemoHistory /> 组件引入子应用](#MicroAppWithMemoHistory--组件引入子应用)

### 引入子应用

在父应用中引入子应用，插件提供了三种不同实现的方式：

- 路由绑定引入子应用。
- `<MicroApp />` 组件引入子应用。
- `<MicroAppWithMemoHistory />` 组件引入子应用。

#### 路由绑定引入子应用

手动配置 `.umirc.ts` 文件中的 `routes` 项，通过路由的方式绑定子应用。何时使用：

- **子应用包含完整的路由切换逻辑时。**
- **父子应用路由相互关联时。**

现在，我们想要在 `/app1/project` 和 `/app2` 路由分别加载子应用 `app1` 和 `app2`，可以配置父应用的路由如下：

```javascript 
// .umirc.ts
export default {
  routes: [
    {
      path: '/',
      component: '@/layouts/index.tsx',
      routes: [
        {
          path: '/app1',
          component: '@/layouts/app-layout.tsx',
          routes: [
             // 配置微应用 app1 关联的路由
             {
               // 带上 * 通配符意味着将 /app1/project 下所有子路由都关联给微应用 app1
               path: '/project/*',
               microApp: 'app1',
             },
          ],
        },
        // 配置 app2 关联的路由
        {
          path: '/app2/*',
          microApp: 'app2',
        },
      ],
    },
  ],
};
```


配置好后，子应用的路由 `base` 会**在运行时被设置为主应用中配置的 path**。

例如，在上面的配置中，我们指定了 app1 关联的 path 为 `/app1/project`，假如 app1 里有一个路由配置为 `/user`，当我们想在父应用中访问 `/user` 对应的页面时，浏览器的 url 需要是 `base + /user`，即 `/app1/project/user` 路径，否则子应用会因为无法匹配到正确的路由而渲染空白或 404 页面。

`qiankun` 插件拓展了 Umi 原有的路由对象，新增了 `microApp` 字段，它的值为注册子应用的 `name`。切换到对应路由后，Umi 将会使用 `<MicroApp />` 组件渲染此子应用，并替换原来路由的 `component`。

拓展后的 Umi 路由对象 API [**可见此**](https://umijs.org/docs/max/micro-frontend#route "可见此")**。**

#### `<MicroApp />` 组件引入子应用

通过 `<MicroApp />` 组件加载（或卸载）子应用。何时使用：

- **子应用包含完整的路由切换逻辑时。**
- **父子应用路由相互关联时。**

现在，我们想在父应用的某个页面中引入子应用 `app1`，可以编写代码如下：

```javascript 
import { MicroApp } from 'umi';

export default function Page() {
  return <MicroApp name="app1" />;
}
```


使用该方式引入子应用时，**父子应用的路由将一一对应**。例如，\*\*当父应用路由为 ****`/some/page`**** 时，子应用路由同样为 ****`/some/page`****。\*\*切换子应用路由时，父应用将同步切换。

如果父应用的路由包含前缀，**可以通过配置** `base` **属性保证父子应用的路由正确对应**。例如，父应用路由为 `/prefix/router-path/some/page` 时，我们希望子应用的路由为 `/some/page`，可以修改代码如下：

```javascript 
import { MicroApp } from 'umi';

export default function Page() {
  return <MicroApp name="app1" base="/prefix/router-path" />;
}
```


#### `<MicroAppWithMemoHistory />` 组件引入子应用

通过 `<MicroAppWithMemoHistory />` 组件加载（或卸载）子应用。何时使用：

- **仅使用子应用的指定路由时。**
- **父子应用路由相互独立时。**

`<MicroAppWithMemoHistory />` 组件是 `<MicroApp />` 组件的变体，您需要**显式提供 ****`url`**** 属性作为子应用的路**由。当父应用的路由发生变化时，子应用的路由**不会改变**。

现在，我们想在父应用的某个组件内部引入 `app2` 子应用，子应用的路由为 `/some/page`，可以编写代码如下：

```javascript 
import { MicroAppWithMemoHistory } from 'umi';

export default function Page() {
  return <MicroAppWithMemoHistory name="app2" url="/some/page" />;
}
```
