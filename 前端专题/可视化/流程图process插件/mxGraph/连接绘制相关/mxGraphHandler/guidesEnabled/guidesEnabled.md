# guidesEnabled

## 目录

- [功能概述](#功能概述)
- [使用方式](#使用方式)

在`mxGraph`里，`guidesEnabled`并不是一个方法，而是`mxGraph`**类中的一个属性，用于控制是否启用对齐辅助线功能。** 下面从功能概述、使用方式、使用场景、示例代码以及代码解释等方面详细介绍。

### 功能概述

对齐辅助线（guides）**是一种帮助用户在绘制和调整图形元素时进行对齐操作的视觉辅助工具。当**\*\*`guidesEnabled`****属性设置为****`true`****时，在移动或调整节点、边等图形元素的位置时，****`mxGraph`会自动显示辅助线，提示用户将元素与其他元素的边界、中心或网格对齐，从而使图形布局更加整齐、规范。\*\*当设置为`false`时，对齐辅助线功能将被禁用。

### 使用方式

可以通过直接设置`mxGraph`实例的`guidesEnabled`属性来启用或禁用对齐辅助线功能，示例代码如下：

```javascript 
// 创建 mxGraph 实例
const graph = new mxGraph(container);

// 启用对齐辅助线功能
graph.guidesEnabled = true;

// 禁用对齐辅助线功能
graph.guidesEnabled = false;
```
