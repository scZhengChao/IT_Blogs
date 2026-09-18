# 权限

## 目录

- [@umijs/plugin-access](#umijsplugin-access)
  - [启用方式](#启用方式)
  - [介绍](#介绍)
- [@umijs/plugin-initial-state](#umijsplugin-initial-state)
  - [启用方式](#启用方式)
  - [介绍](#介绍)
  - [配置](#配置)
    - [运行时配置](#运行时配置)
      - [getInitialState](#getInitialState)
  - [API](#API)
    - [useModel](#useModel)
      - [initialState](#initialState)
      - [loading](#loading)
      - [error](#error)
      - [refresh](#refresh)
      - [setInitialState](#setInitialState)

# @umijs/plugin-access

[ @umijs/plugin-access  https://v3.umijs.org/zh-CN/plugins/plugin-access](https://v3.umijs.org/zh-CN/plugins/plugin-access " @umijs/plugin-access  https://v3.umijs.org/zh-CN/plugins/plugin-access")

## 启用方式

有 `src/access.ts` 时启用。

## 介绍

我们约定了 `src/access.ts` 为我们的权限定义文件，该文件需要默认导出一个方法，导出的方法会在项目初始化时被执行。该方法需要返回一个对象，对象的每一个值就对应定义了一条权限。如下所示：

```typescript 
// src/access.ts
export default function(initialState) {
  const { userId, role } = initialState;
 
  return {
    canReadFoo: true,
    canUpdateFoo: role === 'admin',
    canDeleteFoo: foo => {
      return foo.ownerId === userId;
    },
  };
}
```


其中 `initialState` 是通过初始化状态插件 `@umijs/plugin-initial-state` 提供的数据，你可以使用该数据来初始化你的用户权限。

# @umijs/plugin-initial-state

[ @umijs/plugin-initial-state  https://v3.umijs.org/zh-CN/plugins/plugin-initial-state](https://v3.umijs.org/zh-CN/plugins/plugin-initial-state " @umijs/plugin-initial-state  https://v3.umijs.org/zh-CN/plugins/plugin-initial-state")

约定一个地方**生产和消费初始化数据**。

## 启用方式

有 `src/app.ts` 并且导出 `getInitialState` 方法时启用。

## 介绍

本插件不可直接使用，必须搭配 `@umijs/plugin-model` 一起使用。

## 配置

当前插件只有一个运行时配置。

### 运行时配置

#### getInitialState

- Type: `() => Promise<any>`

该配置是一个 **async 的 function。会在整个应用最开始执行**，返回值会\*\*作为全局共享的数据。Layout 插件、Access 插件以及用户都可以通过 ****`useModel('@@initialState')`**** \*\*直接获取到这份数据。

```typescript 
// src/app.ts
export async function getInitialState() {
  const data = await fetchXXX();
  return data;
}
```


## API

### useModel

配合 [useModel](https://v3.umijs.org/zh-CN/plugins/plugin-model "useModel") 获取初始值：

```typescript 

import { useModel } from 'umi';

export default () => {
  const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState');
  return <>{initialState}</>
};

```


#### initialState

- Type: `any`
- Default: `undefined`

运行时配置中，getInitialState 的返回值。

#### loading

- Type: `boolean`
- Default: `true`

getInitialState 是否处于 loading 状态，在首次获取到初始状态前，页面其他部分的渲染都会被阻止。loading 可用于判断 refresh 是否在进行中。

#### error

- Type: `Error`
- Default: `undefined`

当运行时配置中，getInitialState throw Error 时，会将错误储存在 error 中。

#### refresh

- Type: `() => void`

**重新执行 getInitialState 方法，并获取新数据。**

#### setInitialState

- Type: `(state: any) => void`

手动设置 initialState 的值，手动设置完毕会将 loading 置为 false.

`initialState` 从 `@umijs/plugin-initial-state` 插件中获取，需要搭配一起使用。

通常该插件会配置 `@umijs/plugin-layout` 和 `@umijs/plugin-access` 插件一起使用，和 Layout 插件一起使用的时候返回的数据要符合 Layout 的要求。
