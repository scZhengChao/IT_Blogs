# @reduxjs/toolkit

## 目录

- [@reduxjs/toolkit使用](#reduxjstoolkit使用)
  - [基本使用](#基本使用)

`@reduxjs/toolkit`是`redux`的进阶版，旨在**简化状态管理的开发过程**。它不仅包含了`redux`的核心功能，还集成了一些最佳实践和工具，使得开发变得更加高效和便捷。

`@reduxjs/toolkit`和`redux`的对比：

1. 简化配置：`redux`需要手动设置`store`，以及包括使用`combineReducers`进行仓库模块化管理。`redux`需要手动配置中间件，例如`redux-thunk`或`redux-saga`，`@reduxjs/toolkit`只需几行代码即可创建`store`并自动配置`store`常用的中间件。
2. 更简单的`reducers`：`redux`需要手动定义`action`来完成数据的修改，且`reducers`通常需要返回新的状态对象。`@reduxjs/toolkit`可以同时定义初始状态、和`actions`，而且可以在`reducers`中直接修改状态对象，无需返回新对象。
3. 异步逻辑处理：`redux`需要使用中间件如`redux-thunk`或`redux-saga`来处理异步逻辑。编写异步逻辑时需要手动管理`action`类型和`dispatch`流程。`@reduxjs/toolkit`提供了可以轻松创建异步`thunk`。自动处理异步请求的生命周期，提供了标准化的`action`类型（如`pending`、`fulfilled`、`rejected`）。

## @reduxjs/toolkit使用

@reduxjs/toolkit基于redux，创建出来的仓库还是redux仓库，只不过创建方式简化了。

@reduxjs/toolkit使用步骤：

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a936a865ff414a228b77b93826900482~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pifXw==:q75.awebp?rk3s=f64ab15b\&x-expires=1748322926\&x-signature=M6WId4E6sRrvI0W4qXVKTXSQIok%3D)

安装 @reduxjs/toolkit

```bash 
npm install @reduxjs/toolkit
yarn add @reduxjs/toolkit

```


### 基本使用

[基本使用](IT/前端框架/React/react%20状态管理/redux系列/@reduxjs-toolkit/基本使用/基本使用.md "基本使用")

[@reduxjs/toolkit API介绍](<./@reduxjs-toolkit API介绍/index.md> "@reduxjs/toolkit API介绍")
