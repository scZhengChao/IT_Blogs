# 基于 React18 Streaming SSR 的页面性能优化实践

## 目录

- [作者介绍](#作者介绍)
- [一、背景](#一背景)
- [二、性能指标](#二性能指标)
- [三、渲染方式](#三渲染方式)
  - [1、React CSR](#1React-CSR)
  - [2、React SSR](#2React-SSR)
    - [React SSR 存在的主要问题](#React-SSR-存在的主要问题)
  - [3. React18 Streaming SSR](#3-React18-Streaming-SSR)
    - [处理过程](#处理过程)

# 作者介绍

**姜宇赫：** 去哪儿网前端开发工程师，目前主要负责大前端中心服务平台前端开发工作以及 web 端页面性能优化。

# 一、背景

页面运行性能和用户体验的好坏，直接影响着用户操作的费力度，最终可能影响收益。

因此我们一直很关注用户体验，提高页面性能，使得用户在访问页面时，更流畅，更稳定，更便捷，从而提高业务转化率。

目前去哪儿衡量 web 页面性能的指标主要是 TTI、FCP 和首屏时间。**其中 TTI 是与用户体验相关最重要的指标。** 本文将着重讲述 React 各种渲染模式下 TTI 的时序分析及 React18 Streaming SSR 所带来的性能优化。

# **二、性能指标**

我们先来看一下 TTI、FCP 和首屏相关指标的定义：FCP：浏览器首次绘制出页面内容（文本、图像和 svg 等）的时间。首屏：用户开始访问页面到浏览器首屏内容渲染完成的时间。TTI：用户开始访问页面到可以与页面进行交互的时间。

# **三、渲染方式**

目前去哪儿网 web 端的技术栈以 React 为主，接下来主要通过渲染时序图介绍三种渲染模式 React CSR（客户端渲染）、React SSR（服务端渲染）和 React18 Streaming SSR（流式服务端渲染）下页面渲染过程性能分析及 React18 Streaming SSR 的性能优化实践。

## **1、React CSR**

在 React 中使用的最常见的模式就是客户端渲染，服务端返回静态的HTML， HTML中包含必要 `<script>` 和 `<link>` 标签及一个空的 div ，然后下载执行 JS，由 React 渲染树并生成所有 DOM 节点。页面内容生成渲染及获取数据全面在浏览器进行。

- 时序图

我们来看下 React CSR 的处理时序图，本文以去哪儿APP中的机票改签申请页为例，图中时长数据为线上监控的 P90 时长。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d42d0f03a654526a0939e5b1fc1237c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

1. 请求服务端，服务端根据路由返回对应的静态 html。
2. 2\.  浏览器解析 html，下载执行 css和 js。
3. css 和 js 处理完成后，页面首次渲染（FCP），通常是 Loading 动画或骨架屏。然后在 componentDidMount 中调用后端接口获取数据。
4. 后端接口返回数据后再次渲染页面，渲染完成后显示页面信息并可交互， CSR 模式下首屏和 TTI 的时间是一样的。主要缺点是首屏渲染较慢，需要等待 JS 的下载执行和后端接口返回。并且页面内容生成和网络请求都是在浏览器内进行，受设备性能和网速影响较大。

## **2、React SSR**

React SSR 在服务端生成 HTML ，客户端进行水合处理，可以减少用户白屏的等待时长。在常见的一体化 React 开发框架中都是支持 SSR 的，比如 Nextjs 和 Remix 等。

- 处理过程

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e852364b7b414edaaaafe5121fe9eff0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

首先在服务端获取数据，然后使用 renderToString 将 React 组件生成 HTML 返回到浏览器。浏览器收到返回后解析 HTML ，能够在 JS 下载执行完成前渲染 HTML，此时页面还不能交互（图2灰色代表不可交互）。在 JS 下载执行完成后进行执行 Hydrate，之后页面可交互（图3绿色代表可交互）。

- &#x20;时序图

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53b7a20d061f4180ab80b746532cc725~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

1. 服务端收到请求后，调用后端接口请求数据，接口返回后通过 renderToString 生成 HTML，返回到浏览器。
2. 浏览器解析 HTML，下载执行 CSS和 JS。
3. CSS 解析完成后可显示页面内容（FCP 和首屏），减少白屏时长，此时页面还不能交互。
4. JS 下载完成后，执行 hydrate，页面可交互（TTI）。

相比于 CSR，后端接口由服务端调用，**网络环境（内网）稳定，并且调用接口时机比 CSR 有提前，不需要等 JS 的下载和执行，浏览**器接收到 HTML 后等待 CSS 下载解析完成后即可开始首屏渲染，相比 CSR 有较多提升。TTI 需要等待 JS 的下载和执行，相比于 CSR 提升不明显。TTI 相比 CSR 提升了170ms。

### React SSR 存在的主要问题

1.服务端需要等待后端接口返回后才能生成 HTML 返回到浏览器。如果页面存在多个模块，每个模块依赖单独的接口，依然要等所有接口返回才能返回 HTML。

2.与第1点类似，**浏览器需要等待服务端处理完所有的模块后生成并返回 HTML 后才能下载 JS，然后执行才能 hydrate。**

3.需要等待页面上所有的**组件 hydrate 之后页面才可交互，即使不在首屏的组件。**

接下来看看 React18 Streaming SSR 是如何解决以上问题的。

## **3. React18 Streaming SSR**

Streaming SSR 是 React18 新支持的功能。**支持在服务端渲染时将应用拆分成多个模块，每个模块可以独立完成在普通的 SSR 中看到的处理过程，流式返回到浏览器。**

我们全新打造的 React 一体化开发框架 q-metajs，基于 React18 开发，支持约定式路由和自定义路由，使用 webpack5 构建，支持各种渲染方式（CSR、SSR和Streaming SSR）。

相比 Nextjs 和 Remix 等开源框架，根据我们平时的开发习惯做了开发体验优化（比如集成 Mobx 等），更符合我们目前的开发习惯，最重要的是**支持 React18 Streaming SSR**。

#### 处理过程

React 18 弃用了 renderToNodeStream，增加了新的流式返回 API **renderToPipeableStream，通过 Suspense 支持服务端流式渲染和客户端选择性水合（selective hydrate）**。React18 Streaming SSR 处理过程如下图所示。

![](<../assets/基于 React18 Streaming SSR 的页面性能/image/image_skidnWJ1ji.png>)

页面分为4个模块，**假设 Comments 模块依赖独立接口，并接口较慢，那么可以将 Comments 组件放在 React.Suspense 里（图1）。**

**服务端不用等待 Comments 组件接口返回可先渲染其他 React 组件生成 HTML 返回到浏览器。** 可以通过 Suspense 的 fallback 指定占位元素。浏览器收到返回后即可开始解析 HTML，下载 CSS 和 JS，渲染 Comments 之外的模块（图2）。

JS 下载完成后执行 hydrate，已渲染的模块可以交互（图3）。

当 Comments 接口返回后，服务端会返回 Comments 组件对应的 HTML 片段和将 HTML 片段渲染到页面上的 JS 方法（图4），类似 bigpipe 的处理。

浏览器执行 script 标签内的 JS 代码，将 Comments 模块对应的 HTML 片段渲染到页面上，此时 Comments 模块还不可交互（图5）。

然后执行 React 的 selective hydrate，Comments 模块可交互（图6）。
