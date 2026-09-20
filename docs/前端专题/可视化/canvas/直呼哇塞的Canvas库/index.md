# 直呼哇塞的Canvas库

## 目录

- [图形处理库](#图形处理库)
  - [Konva](#Konva)
  - [fabric.js](#fabricjs)
- [图像编辑](#图像编辑)
  - [miniPaint](#miniPaint)
  - [DarkroomJS](#DarkroomJS)
  - [fabric-brush](#fabric-brush)
  - [fabricjs-image-editor-origin](#fabricjs-image-editor-origin)
  - [react-sketch](#react-sketch)
  - [glitch-canvas](#glitch-canvas)
  - [animockup](#animockup)
- [物理引擎](#物理引擎)
  - [matter.js](#matterjs)
- [流程图/组织图/图编辑等](#流程图组织图图编辑等)
  - [gojs](#gojs)
  - [butterfly](#butterfly)
  - [wireflow](#wireflow)
  - [flowy](#flowy)
  - [Workflow Designer](#Workflow-Designer)
  - [web-pdm](#web-pdm)
  - [X-Flowchart-Vue](#X-Flowchart-Vue)
  - [OrgChart](#OrgChart)
  - [welabx-g6](#welabx-g6)
- [全景图/AR/VR](#全景图ARVR)
  - [Pannellum](#Pannellum)
  - [Panolens.js](#Panolensjs)
  - [JS-Cloudimage-360-View](#JS-Cloudimage-360-View)
  - [A-Frame](#A-Frame)
- [3D库](#3D库)
  - [three.js](#threejs)
  - [zdog](#zdog)
  - [seen.js](#seenjs)
  - [Oimo.js](#Oimojs)
  - [phoria.js](#phoriajs)

## 图形处理库

图形绘制是Canvas中最基本的内容，但是Canvas本身提供的api比较基础，开发起来低效。而且也缺少完整的事件系统、区域监测、缓存等等。下面让我们来看几款高效的图形处理库吧。

### Konva

简介：`Konva`是一个 HTML5 Canvas JavaScript 框架, 通过扩展 Canvas 的 2D Context 让桌面端和移动端Canvas支持交互性，使其支持高性能动画、过渡、节点嵌套、分层、过滤、缓存、事件处理等等。Konva传送门\[3]

除上述之外，文档相对友好，但也仅仅是相对于同类库的文档友好那么一滴滴，社区有维护一个中文文档。

![](./image/image_iLq_0xbNud.png)

![](./image/image_3Na9BDbxQ0.png)

### fabric.js

简介：**Fabric.js**是一个可以轻松处理 HTML5 Canvas元素的框架，使得Canvas元素支持**交互式对象模型**，同时也是一个**SVG-to-Canvas**和**Canvas-to-SVG**的解析器 fabric.js传送门\[4]

fabricjs是和konva同类型但是比konva更老牌的一个的Canvas库，目前github上Star数

## 图像编辑

市面上图像编辑的软件有很多，像大家所熟知的`PS、sketch、axure、激萌、剪映`等等。那么如果我们想开发类似的软件，有没有可以使用的库或者参考的开源软件呢？

### miniPaint

简介：miniPaint\[8] \[在线演示\[9]] - 在线版的PS。PS这款软件大家都不陌生，web版本的如何呢？请看下图：

![](./image/image_Jw7nCLRuaC.png)

### DarkroomJS

简介：DarkroomJS\[10] \[在线演示\[11]] - 基于Fabricjs的浏览器端可扩展的图像编辑工具

![](./image/image_9NrAGn9l7u.png)

### fabric-brush

简介：fabric-brush\[12] \[在线演示\[13]] - 基于Fabric.js的Canvas笔刷工具

![](./image/image_iyq3CExGSP.png)

### fabricjs-image-editor-origin

简介：fabricjs-image-editor-origin\[14] \[在线演示\[15]] - Fabricjs图像编辑器

![](./image/image_s7oZXkZGQj.png)

### react-sketch

简介：react-sketch\[16] \[在线演示\[17]] - 基于React、Fabricjs的素描应用

![](./image/image_xIf6aso6q-.png)

### glitch-canvas

简介：glitch-canvas\[18] \[在线演示\[19]] - 给画布元素添加故障效果

![](./image/image_6cOP2tJn33.png)

### animockup

简介：animockup\[20] \[在线演示\[21]] - 在浏览器中创建动画模型，并导出为视频或动画GIF

![](./image/image_e4FJnZ1J34.png)

## 物理引擎

物理引擎使用质量、速度、摩擦力和空气阻力等变量，模拟了一个近似真实的物理系统，为刚性物体赋予真实的物理效果，比如重力、旋转和碰撞等效果，让物体的行为表现的更加趋向真实。例如，守望先锋的英雄在跳起时，系统所设置的重力参数就决定了他能跳多高，下落时的速度有多快，子弹的飞行轨迹等等。

### matter.js

简介：**matter.js**是一个用于 Web 的 JavaScript 2D 物理引擎库 matter.js传送门\[24]

matter.js\[25]相较于老牌的 Box2D 引擎库更为轻量级（压缩版仅有 87 KB），并且在性能和功能方面也不逊色。

![](./image/image_Y3Dmys1eBE.png)

![](./image/image_oIN7nLEOmo.png)

## 流程图/组织图/图编辑等

工业软件开发，一直是软件领域复杂而又重要的一环。其对技术人的要求要是更高的，下面看看有哪些可以辅助我们快速开发的库或者参考的场景吧。

### gojs

简介：**gojs**是一款可以非常方便的开发交互式流程图、组织结构图、设计工具、规划工具、可视化语言的JavaScript图表库。gojs.js传送门\[28]

- GoJS用自定义模板和布局组件简化了节点、链接和分组。
- 给用户交互提供了许多先进的功能，如拖拽、复制、粘贴、文本编辑、工具提示、上下文菜单、自动布局、模板、数据绑定和模型、事务状态和撤销管理、调色板、概述、事件处理程序、命令和自定义操作的扩展工具系统。

![](./image/image_z-GzMD4fko.png)

文档中提供了大量的demo\[29]可供参考，基本对于常见的图编辑程序做到了全覆盖。

![](./image/image_HMDuqNU1u_.png)

### butterfly

简介：butterfly\[30] \[在线演示\[31]] 一个基于JS的数据驱动的节点式编排组件库，同时适用于React/Vue2组件。

- 丰富的DEMO，开箱即用
- 全方位管理画布，开发者只需要更专注定制化的需求
- 利用DOM/REACT/VUE来定制元素；灵活性，可塑性，拓展性优秀
- 提供了中文文档，这点对英文不好的小伙伴很Nice

![](./image/image_eUoutZZNWV.png)

### wireflow

简介：wireflow\[32] \[在线演示\[33]] 用户流程图实时协作工具。

- Wireflow 有超过 100 种自定义构建图形/卡可供使用，涵盖了大多数 Web 元素、交互和使用案例。
- Wireflow 考虑到了协作。您可以邀请您的同事和他们一起实时设计下一个项目的用户流程。
- 它具有内置的实时聊天功能，让您能够与您的队友进行交流，并且在您实时协作时仍然在同一个应用程序中。

![](./image/image_Ls_n0RChE1.png)

### flowy

简介：Flowy\[34] \[在线演示\[35]] - 用于创建流程图的最小javascript库。使创建具有流程图功能的 WebApp 成为一项非常简单的任务。通可以在几分钟内构建自动化软件、思维导图工具或简单的编程平台。

- 响应式拖放、自动捕捉、自动滚动
- 块重排、删除块、自动块居中
- 条件捕捉、条件块移除、无依赖项

![](./image/image_ZfVXMcJ3UN.png)

### Workflow Designer

简介：Workflow Designer\[36] \[在线示例\[37]] - 基于G6和React的可视化流程编辑器。

![](./image/image_64_uv4ZfIO.png)

### web-pdm

简介：web-pdm\[38] \[在线示例\[39]] - 用G6做的ER图工具，最终目标是想做成在线版的powerdesigner.

![](./image/image_u8YQm7FhrO.png)

### X-Flowchart-Vue

简介：X-Flowchart-Vue\[40] \[在线演示\[41]] - 基于G6和Vue的可视化图形编辑器。

![](./image/image_CoAeb1AKm3.png)

### OrgChart

简介：OrgChart\[42] \[在线演示\[43]] - 简单直接的组织图插件

![](./image/image_7qjedHHNNo.png)

### welabx-g6

简介：welabx-g6\[44] \[在线示例\[45]] - 基于G6和Vue的流程图编辑器。

![](./image/image_mDEZQA2IxN.png)

## 全景图/AR/VR

5g的普及、虚拟现实/增强现实落地、元宇宙的火热......似乎让Canvas再度推上了技术的顶峰。下面让我来看看开发这些场景常见的Canvas库吧。

### Pannellum

简介：Pannellum\[48] \[在线演示\[49]] - 轻量、免费、开源的web全景查看器。

![](./image/image_6URFe6jfqQ.png)

### Panolens.js

简介：Panolens.js\[50] \[在线演示\[51]] - Panolens.js基于Three.JS，主要研究领域是全景、虚拟现实和潜在的增强现实。

### JS-Cloudimage-360-View

简介：JS-Cloudimage-360-View\[52] \[在线演示\[53]] 一个简单的、交互式的资源，可以用来提供您的产品的虚拟游览。

![](./image/image_Bi26O6nXwu.png)

### A-Frame

简介：A-Frame\[54] \[在线演示\[55]] A-Frame 除了帮助您构建 360 度媒体播放器外，它还提供了许多附加功能。其他功能可帮助您增强网站的虚拟现实体验。

![](./image/image_d5cUYE0dsj.png)

## 3D库

### three.js

简介：three.js\[58] \[在线演示\[59]] - 创建易于使用、轻量级、跨浏览器的通用3d js库。three.js就不多介绍了，大家想必都很熟悉。

![](./image/image_7DNrmkylzW.png)

![](./image/image_depM44y9Jy.png)

### zdog

简介：zdog\[60] \[在线演示\[61]] - 基于canvas和SVG设计师友好的伪3D引擎

![](./image/image_KulTdmlpjU.png)

### seen.js

简介：seen\[62] \[在线演示\[63]] - 使用SVG或Canvas渲染3D场景。

![](./image/image_H8U_DhWuD2.png)

### Oimo.js

简介：Oimo.js\[64] \[在线演示\[65]] - 轻量级的JS 3D物理引擎。

![](./image/image_yG8nzEQz_H.png)

### phoria.js

简介：phoria.js\[66] \[在线演示\[67]] - 用于在 HTML5 画布 2D 渲染器上进行简单 3D 图形和可视化的 JavaScript 库。它不使用 WebGL。适用于所有 HTML5 浏览器，包括桌面、iOS 和 Android。

![](./image/image_8DIrJIEiv-.png)
