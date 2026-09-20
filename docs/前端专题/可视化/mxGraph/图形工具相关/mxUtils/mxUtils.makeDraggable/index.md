# `mxUtils.makeDraggable`

## 目录

- [设置为可拖动的](#设置为可拖动的)
  - [方法概述](#方法概述)
  - [方法语法](#方法语法)
  - [参数说明](#参数说明)
  - [案例](#案例)

# 设置为可拖动的

在`mxGraph`中，`makeDraggable`方法通常用于将一个 HTML 元素设置为可拖动的，并且可以将其与`mxGraph`进行交互，比如将拖动的元素添加到图中。下面详细介绍该方法的各个参数以及使用示例。

### 方法概述

`makeDraggable`方法允许开发者将**任意 HTML 元素转换为可拖动的对象**，当拖动该元素到`mxGraph`上时，可以触发特定的操作，如**创建新的单元格等。**

### 方法语法

```javascript 
makeDraggable: function(element, graphF, funct, dragElement, dx, dy, autoscroll,
      scalePreview, highlightDropTargets, getDropTarget)
```


### 参数说明

- **`element`**：
  - **类型**：`HTMLElement`
  - **描述**：要设置为可拖动的 HTML 元素，例如一个`<div>`或`<img>`元素。
- **`graphF`**：
  - **类型**：`Function`
  - **描述**：一个返回`mxGraph`实例的函数。**当拖动操作发生时，通过调用这个函数来获取要与之交互的**\*\*`mxGraph`\*\***对象。**
- **`funct`**：
  - **类型**：`Function`
  - **描述**：当元素被拖动到`mxGraph`上并释放时调用的回调函数。该函数接收多个参数，通常包括`graph`（`mxGraph`实例）、`evt`（鼠标事件对象）和`target`（拖动**目标单元格**，如果有的话），开发者可以在这个函数中定义具体的操作，如创建新的单元格。
- **`dragElement`**：
  - **类型**：`HTMLElement`，可选
  - **描述**：拖动时显示的元素。如果未提供，则默认使用`element`本身。这个元素会跟随鼠标移动，给用户直观的拖动反馈。
- **`dx`**：
  - **类型**：`number`，可选
  - **描述**：拖动元素相对于鼠标指针的水平偏移量，默认值为 0。
- **`dy`**：
  - **类型**：`number`，可选
  - **描述**：拖动元素相对于鼠标指针的垂直偏移量，默认值为 0。
- **`autoscroll`**：
  - **类型**：`boolean`，可选
  - **描述**：是否启用自动滚动功能。当拖动元素靠近图形容器的边缘时，图形容器会自动滚动，方便用户将元素拖动到图的其他区域。默认值为`true`。
- **`scalePreview`**：
  - **类型**：`boolean`，可选
  - **描述**：拖动预览元素是否根据图的缩放比例进行缩放。默认值为`false`。
- **`highlightDropTargets`**：
  - **类型**：`boolean`，可选
  - **描述**：是否高亮显示有效的放置目标（如可接收拖动元素的单元格）。默认值为`true`。
- **`getDropTarget`**：
  - **类型**：`Function`，可选
  - **描述**：一个用于获取放置目标单元格的函数。该函数接收`graph`（`mxGraph`实例）、`x`（鼠标的 x 坐标）和`y`（鼠标的 y 坐标）作为参数，返回一个`mxCell`对象，表示拖动元素可以放置的目标单元格。如果未提供该函数，`mxGraph`会使用默认的逻辑来确定放置目标。

### 案例

[dragHtml](../../../demo/dragHtml/index.md "dragHtml")

```javascript 
const makeDraggable = (sourceEles) => {
  const dropValidate = function (evt) {
    const x = mxEvent.getClientX(evt);
    const y = mxEvent.getClientY(evt);
    // 获取 x,y 所在的元素
    const elt = document.elementFromPoint(x, y);
    // 如果鼠标落在graph容器
    if (mxUtils.isAncestorNode(graph.container, elt)) {
      return graph;
    }
    // 鼠标落在其他地方
    return null;
  };

  // drop成功后新建一个节点
  const dropSuccessCb = function (_graph, evt, target, x, y) {
    insertVertex(this.element, target, x, y);
  };

  Array.from(sourceEles).forEach((ele) => {
    const dragElt = document.createElement('img');
    dragElt.setAttribute('src', ele.getAttribute('src'));
    dragElt.setAttribute('style', 'width:120px;height:120px;');

    mxUtils.makeDraggable(ele, dropValidate, dropSuccessCb, dragElt,
      null, null, null, true);
  });
};
```
