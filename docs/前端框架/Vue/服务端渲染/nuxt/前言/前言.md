# 前言

## 目录

- [Nuxt 是什么](#Nuxt-是什么)
- [Nuxt 的特点](#Nuxt-的特点)
  - [Vue 技术栈](#Vue-技术栈)
  - [约定式路由](#约定式路由)
  - [自动导包](#自动导包)
  - [渲染模式](#渲染模式)
  - [利于搜索引擎优化](#利于搜索引擎优化)
  - [服务器引擎](#服务器引擎)

## Nuxt 是什么

[**Nuxt**](https://link.juejin.cn?target=https://nuxt.com/ "Nuxt") 是一个能够**创建高性能和生产级的全栈** `Web` 应用框架。

在**数据双向绑定和组件化**方面，`Nuxt` 选择了 `Vue.js`；在**处理客户端导航方面**，`Nuxt` 选择了 `vue-router`；

在**支持开发热模块替换和生产环境打包**方面，`Nuxt` 支持 `webpack5` 和 `Vite`；在**兼容旧版本浏览器，支持最新**的 `JavaScript` 语法转移方面，`Nuxt` 使用 `esbuild`；

`Nuxt` 支持**开发环境服务器、服务端渲染和** `API` 接口开发；`Nuxt` 使用 `h3` 来实现部署的可移植性，如支持在 `Serverless`、 `Workers` 和 `Node.js` 环境中运行。

**由此可见，Nuxt 是一个直观的 Web 框架，一个全栈框架，能够提供前端和后端的能力。**

## Nuxt 的特点

如果你是初学者，建议直接学习最新版本的 Nuxt，也就是 [**Nuxt3**](https://link.juejin.cn?target=https://nuxt.com/ "Nuxt3") 版本。Nuxt3 的第一个稳定版本正式发布于 2022年11月16日。目前，Nuxt3 技术栈已经相对比较稳定，并且拥有丰富的社区生态，可以说现在是入手学习 Nuxt 的最佳时机。

### Vue 技术栈

Nuxt3 是基于 Vue3 + Vue Router + Vite + 服务引擎 Nitro 等技术栈，全程使用 Vue3 + Vite 开发，带来极致的开发体验。

### 约定式路由

约定式路由的言外之意就是目录结构即路由，Nuxt 路由基于 vue-router，在 `pages/` 目录中创建的每个页面，都会根据目录结构和文件名来自动生成路由。

### 自动导包

Nuxt 会自动导入辅助函数、组合式 API 和 Vue API，无需手动导入。Nuxt 本身基于规范的目录结构， Nuxt 还可以对自己的组件、 插件使用自动导入。

### 渲染模式

Nuxt 支持多种渲染模式，如 `SSR`、 `CSR`、 `SSG` 等。

### 利于搜索引擎优化

服务器端渲染模式，不但可以提高首屏渲染速度，还利于`SEO`。

### 服务器引擎

在开发环境中，`Nuxt` 使用 `Rollup` 和 `Node.js`。

在生产环境中，`Nuxt` 使用 `Nitro` 将应用程序和服务器构建到一个通用的 `.output` 目录中。其中，Nitro 服务引擎提供了跨平台部署的支持，包括 Node、 Deno、 Serverless、 Workers等平台上部署。
