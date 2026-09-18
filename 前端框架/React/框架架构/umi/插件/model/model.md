# model

## 目录

- [@umijs/plugin-model](#umijsplugin-model)
- [数据源](#数据源)

# [@umijs/plugin-model](https://v3.umijs.org/zh-CN/plugins/plugin-model "@umijs/plugin-model")

[ @umijs/plugin-model  https://v3.umijs.org/zh-CN/plugins/plugin-model](https://v3.umijs.org/zh-CN/plugins/plugin-model " @umijs/plugin-model  https://v3.umijs.org/zh-CN/plugins/plugin-model")

一种基于 `hooks` 范式的简易数据管理方案（部分场景可以取代 `dva`），通常用于**中台项目的全局共享数据**。

我们都知道自定义 `hooks` 是逻辑复用的利器，但我们也知道它不能复用状态，就和 `react` 内置的 `hooks` 一样，每次调用产生的状态都是相互隔离、无关的。那么，在业务开发中，如果我们需要提取的逻辑和状态都希望能够在多个组件中『共享』，就像其他数据流管理工具（`dva`, `mobx`）一样，`@umijs/plugin-model` 就是一个不错的选择。

> 注意在umi 中的引入；不能从umi中直接引入

```react tsx 
import { useModel } from '@@/plugin-model/useModel';
```


# 数据源

modal的所有数据源

```typescript 
import { UmiContext } from '@@/plugin-model/helpers/constant';
useContext(UmiContext )
```
