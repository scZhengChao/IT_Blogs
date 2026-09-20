# mxEffects

## 目录

- [1. 获取 mxEffects 文件](#1-获取-mxEffects-文件)
- [2. 引入 mxEffects 的几种方式](#2-引入-mxEffects-的几种方式)
  - [方法一：直接通过 script 标签引入（最简单）](#方法一直接通过-script-标签引入最简单)
  - [方法二：使用 ES6 模块导入（现代前端项目）](#方法二使用-ES6-模块导入现代前端项目)
  - [方法三：动态加载（按需加载）](#方法三动态加载按需加载)
- [3. 使用 mxEffects 的完整示例](#3-使用-mxEffects-的完整示例)
- [4. mxEffects 常用 API](#4-mxEffects-常用-API)
- [5. 常见问题解决](#5-常见问题解决)

`mxEffects`是 mxGraph 的一个扩展模块，提供了各种动画效果。以下是引入和使用 mxEffects 的完整方法：

## 1. 获取 mxEffects 文件

首先需要确保你有`mxEffects.js`文件，它通常包含在 mxGraph 的完整发行包中（在`examples/js/mxEffects.js`路径下）。

## 2. 引入 mxEffects 的几种方式

### 方法一：直接通过 script 标签引入（最简单）

```html 
<!-- 先引入 mxGraph 核心库 -->
<script src="path/to/mxClient.js"></script>
<!-- 然后引入 mxEffects -->
<script src="path/to/mxEffects.js"></script>
```


### 方法二：使用 ES6 模块导入（现代前端项目）

```typescript 
// 先导入 mxGraph 核心
import * as mxgraph from 'mxgraph';
const { mxEffects } = mxgraph;

// 或者如果 mxEffects 是单独文件
import { mxEffects } from './path/to/mxEffects.js';
```


### 方法三：动态加载（按需加载）

```javascript 
function loadMxEffects(callback) {
    const script = document.createElement('script');
    script.src = 'path/to/mxEffects.js';
    script.onload = callback;
    document.head.appendChild(script);
}

// 使用
loadMxEffects(() => {
    // 这里可以使用 mxEffects 了
    mxEffects.fadeOut(...);
});
```


## 3. 使用 mxEffects 的完整示例

```typescript 
// 1. 确保已引入 mxEffects.js

// 2. 创建图形
const container = document.getElementById('graphContainer');
const graph = new mxGraph(container);

// 3. 添加一个顶点
const parent = graph.getDefaultParent();
const cell = graph.insertVertex(parent, null, '动画测试', 
    100, 100, 80, 30, 'fillColor=#FF5733');

// 4. 使用 mxEffects 实现动画
function animateCell() {
    // 高亮效果
    mxEffects.highlight(graph, cell, '#FFFF00', 1000);
    
    // 3秒后淡出并删除
    setTimeout(() => {
        mxEffects.fadeOut(cell, 1000, true, () => {
            graph.getModel().beginUpdate();
            try {
                graph.removeCells([cell]);
            } finally {
                graph.getModel().endUpdate();
            }
        });
    }, 3000);
}

// 执行动画
animateCell();
```


## 4. mxEffects 常用 API

```javascript 
// 淡入效果
mxEffects.fadeIn(cell, duration, fadeOpacity, callback);

// 淡出效果
mxEffects.fadeOut(cell, duration, remove, callback);

// 高亮效果（颜色变化）
mxEffects.highlight(graph, cell, highlightColor, duration);

// 缩放动画
mxEffects.scale(cell, scale, duration, callback);

// 移动动画
mxEffects.move(cell, dx, dy, duration, callback);
```


## 5. 常见问题解决

**问题1**：`mxEffects is not defined`

解决方案：

- 确保在 mxClient.js 之后加载 mxEffects.js
- 检查文件路径是否正确

**问题2**：动画不工作

解决方案：

- **确保 graph 容器有正确的 CSS 尺寸**
- **检查 cell 是否已正确添加到图形中**
- **尝试减小动画持续时间测试**

**问题3**：在 React/Vue 中使用问题

解决方案：

```javascript 
// 在组件加载完成后初始化
useEffect(() => {
    // 动态加载 mxEffects
    const script = document.createElement('script');
    script.src = '/path/to/mxEffects.js';
    document.body.appendChild(script);
    
    return () => {
        // 组件卸载时清理
        document.body.removeChild(script);
    };
}, []);
```
