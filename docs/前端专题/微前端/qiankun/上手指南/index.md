# 上手指南

## 目录

- [前言](#前言)
- [关于qiankun](#关于qiankun)
  - [微前端](#微前端)
  - [qiankun](#qiankun)
  - [应用场景](#应用场景)
- [搭建环境](#搭建环境)
- [主应用中挂载子应用](#主应用中挂载子应用)
  - [1，在src文件夹下，新建 public-path.js 文件](#1在src文件夹下新建public-pathjs文件)
  - [2.修改webpack配置](#2修改webpack配置)
  - [4.解决静态资源不显示的问题](#4解决静态资源不显示的问题)
- [主应用和子应用之间通信](#主应用和子应用之间通信)

微前端qiankun简易上手指南

## 前言

本文主要介绍了微前端 `qiankun` 环境的搭建，以及如何在主应用中挂载子应用，主应用和子应用之间通信，如何在子应用中接入路由。详细的整理，各种配置文件。分别介绍了 `React` 和 `Vue` 子应用的挂载方法。

如果，之前从未接触过微前端，这应该是个不错的上手项目。项目demo我已经放在 `gitee` 上面。

🚀[Gitee地址](https://link.juejin.cn?target=https://gitee.com/OrzR3/qiankun-demo "Gitee地址")

那么，先从什么是微前端 qiankun 说起。

## 关于qiankun

### 微前端

> 微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略。
>
> 微前端借鉴了微服务的架构理念，将一个庞大的前端应用拆分为多个独立灵活的小型应用，每个应用都可以独立开发、独立运行、独立部署，再将这些小型应用联合为一个完整的应用。微前端既可以将多个项目融合为一，又可以减少项目之间的耦合，提升项目扩展性，相比一整块的前端仓库，微前端架构下的前端仓库倾向于更小更灵活。

### qiankun

`qiankun` 是一个基于 `single-spa` 的微前端实现库。

🚀 [qiankun 官网地址](https://link.juejin.cn?target=https://qiankun.umijs.org/zh "qiankun 官网地址")

### 应用场景

1.项目的迁移，老项目的改造，更新主要的技术栈

2.公司的小伙伴儿比较多，用啥的都有

## 搭建环境

我使用的node版本：14.8.0

分别创建三个应用，将 qiankun-base 作为主应用

```javascript 
npm create react-app qiankun-base --template typescript

npm create react-app qiankun-micro-app1 --template typescript

npm create react-app qiankun-micro-app2 --template typescript


```


相关配置，在每个应用的文件夹，根目录的中新建 .env 文件。

配置不同的端口号。

```javascript 
// qiankun-base应用
PORT=3010
// qiankun-micro-app1应用
PORT=3011
//qiankun-micro-app2应用
PORT=3012

```


快速上手之前，先看一下官网的 [快速上手](https://link.juejin.cn/?target=https://qiankun.umijs.org/zh/guide/getting-started "快速上手")

在主应用  qiankun-base 安装 qiankun

```javascript 
npm i qiankun -S

```


在主应用 qiankun-base 的入口文件 index.ts 中注册微应用

```javascript 

import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'micro-app1', // app name registered
    entry: '//localhost:3011',
    container: '#micro-app1',
    activeRule: '/micro-app1',
  },
  {
    name: 'micro-app2',
    entry: '//localhost:3012',
    container: '#micro-app2',
    activeRule: '/micro-app2',
  },
]);

start();

```


当微应用信息注册完之后，一旦浏览器的 url 发生变化，便会自动触发 qiankun 的匹配逻辑。

所有 activeRule 规则匹配上的微应用就会被插入到指定的 container 中，同时依次调用微应用暴露出的生命周期钩子。

然后，在主应用中，修改App.tsx，加入 container 容器。

```javascript 

import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="micro-app1"></div>
      <div id="micro-app2"></div>
    </div>
  );
}

export default App;

```


## 主应用中挂载子应用

**微应用不需要额外安装任何其他依赖即可接入 qiankun 主应用。**

React 微应用，相关配置：

### 1，在src文件夹下，新建 public-path.js 文件

```javascript 
if (window.__POWERED_BY_QIANKUN__) {
// eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

```


### 2.修改webpack配置

**①安装 react-app-rewired**

```javascript 
npm install react-app-rewired --save

```


**②在 package.json 文件中，修改启动脚本。**

```javascript 
"scripts": {
    "start": "react-app-rewired start",
},
```


安装react-app-rewired 后，可以重写webpack的配置信息。

**③在微应用根目录下，新建 config-overrides.js 文件。**

```javascript 
const { name } = require('./package');

module.exports = {
  webpack: (config) => {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.jsonpFunction = `webpackJsonp_${name}`;
    config.output.globalObject = 'window';

    return config;
  },
  devServer: (_) => {
    const config = _;
    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;
    config.hot = false;
    config.watchContentBase = false;
    config.liveReload = false;

    return config;
  },
}

```


**④修改微应用的入口文件 index.tsx**

```javascript 
// @ts-ignore
function render(props) {
  const { container } = props;
// @ts-ignore
  ReactDOM.render(<App />, container ? container.querySelector('#root') : document.querySelector('#root'));
}
// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}
// @ts-ignore
export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}
// @ts-ignore
export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}
// @ts-ignore
export async function unmount(props) {
  const { container } = props;
// @ts-ignore
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}

```


**⑤为了方便区分，修改 qiankun-micro-app1 微应用中的 App.tsx 文件。**

```javascript 

import React from "react";
import "./App.css";

function App() {
  return <div className="App">qiankun-micro-app1</div>;
}

export default App;

```


**⑥启动主应用，和两个子应用。**

通过主应用配置的 activeRule 匹配到指定的 container 中，成功展示出子应用。

[http://localhost:3010/micro-app1](https://link.juejin.cn?target=http://localhost:3010/micro-app1 "http://localhost:3010/micro-app1")

页面展示：

qiankun-micro-app1

[http://localhost:3010/micro-app2](https://link.juejin.cn?target=http://localhost:3010/micro-app2 "http://localhost:3010/micro-app2")

**页面有个图片没有展示出来，接下来就解决这个问题。**

![](./assets/image/image_ade-Oy7HBQ.png)

### 4.解决静态资源不显示的问题

在微应用src文件夹的 index.tsx 入口文件中，导入之前配置的 public-path.js 文件

```javascript 
import './public-path';

```


刷新页面，成功展示图片

[http://localhost:3010/micro-app2](https://link.juejin.cn/?target=http://localhost:3010/micro-app2 "http://localhost:3010/micro-app2")

![](./assets/image/image_evbToaYSuZ.png)

打开控制台在 Elements 元素，可以看到：

```javascript 
<img src="http://localhost:3012/static/media/logo.svg" class="App-logo" alt="logo">

```


导入 public-path.js 文件之后，图片路径变成了完整的url路径：

[http://localhost:3012/static/media/logo.svg](https://link.juejin.cn/?target=http://localhost:3012/static/media/logo.svg "http://localhost:3012/static/media/logo.svg")

## 主应用和子应用之间通信

主应用和子应用之间，**可能公用一些参数，如何实现传参呢**？

修改主应用 qiankun-base 的配置，在 index.tsx 文件中，加入 props 参数。

```javascript 
registerMicroApps([
  {
    name: "micro-app1", // app name registered
    entry: "//localhost:3011",
    container: "#micro-app1",
    activeRule: "/micro-app1",
    props: {
      niceBody: "malena",
      age: 32
    }
  },
  {
    name: "micro-app2",
    entry: "//localhost:3012",
    container: "#micro-app2",
    activeRule: "/micro-app2",
    props: {
      niceBody: "malena",
      age: 32
    }
  }
]);

```


子应用 qiankun-micro-app1 的入口文件 index.tsx 中，在 mount 方法中，可以获取的主应用传递的props 参数。

```javascript 

// @ts-ignore
export async function mount(props) {
  console.log('[react16] props from main framework', props);
  // render(props);
  // @ts-ignore
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });
  // @ts-ignore
  // props.setGlobalState(state);
}

```


如果主应用中参数，发生改变。微应用中，也能接收到改变。

譬如，设置一个定时器，2秒后将state数据中的age从32改为34

主应用 入口文件 index.tsx

```javascript 
import { initGlobalState, MicroAppStateActions } from 'qiankun';

const state = {
  name: 'malena morgan'
}

// 初始化 state
const actions: MicroAppStateActions = initGlobalState(state);

actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});

setTimeout(() => {
  actions.setGlobalState({ ...state, age: 34});
}, 2000);
actions.offGlobalStateChange();


```


微应用 入口文件 index.tsx

```javascript 
// @ts-ignore
export async function mount(props) {
  console.log('[react16] props from main framework', props);
  // render(props);
  // @ts-ignore
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });
}

```


如果在微应用中，改变 state 的值，主应用中也能拿到

```javascript 
// @ts-ignore
export async function mount(props) {
  console.log('[react16] props from main framework', props);
  // render(props);
  // @ts-ignore
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
      // @ts-ignore
    setTimeout(() => {
      props.setGlobalState({...state, age: 36})
    }, 2000);
  });
}

```
