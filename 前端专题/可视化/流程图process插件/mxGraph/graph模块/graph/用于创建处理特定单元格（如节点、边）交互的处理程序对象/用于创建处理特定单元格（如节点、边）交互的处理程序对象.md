# **用于创建处理特定单元格（如节点、边）交互的处理程序对象**

## 目录

- [方法概述](#方法概述)
- [方法参数](#方法参数)
- [返回值](#返回值)
- [常见使用场景](#常见使用场景)
  - [1. 自定义交互逻辑](#1-自定义交互逻辑)
  - [2. 调试和分析](#2-调试和分析)
- [方法的默认实现](#方法的默认实现)

在`mxGraph`库中，`graph.createHandler`方法是一个**用于创建处理特定单元格（如节点、边）交互的处理程序对象的方法**。以下为你详细介绍其相关信息：

### 方法概述

`graph`是`mxGraph`类的实例，代表一个图形对象。`createHandler`方法根据传入的单元格状态（`mxCellState`）对象创建对应的处理程序，这个处理**程序会负责处理该单元格的各种交互操作，例如拖动、调整大小、连接等**。

### 方法参数

该方法通常接收一个`mxCellState`对象作为参数，这个对象描述了一个单元**格在图形中的当前状态，包含了单元格的位置、大小、样式等信息。示例代码如下：**

```typescript 
const cellState = graph.getView().getState(cell); 
// cell 是 mxCell 对象，代表图形中的一个节点或边
const handler = graph.createHandler(cellState);
```


### 返回值

`createHandler`方法返回一个处理程序对象，**不同类型的单元格可能会返回不同类型的处理程序。**例如，对于顶点（节点），通常会**返回**\*\*`mxVertexHandler`****实例；对于边，可能会返回****`mxEdgeHandler`\*\***实例**。这些处理程序对象包含了处理相应单元格交互的具体逻辑。

```javascript 
graph.createHandler = function (state) {
    if (state != null && this.model.isVertex(state.cell)) {
      return new mxVertexToolHandler(state);
    }

    return mxGraph.prototype.createHandler.apply(this, arguments);
  };
```


### 常见使用场景

#### 1. 自定义交互逻辑

你可以通过**重写处理程序对象**的方法来实现自定义的交互逻辑。例如，当用户拖动节点时，执行一些额外的操作。示例代码如下：

```javascript 
const cell = graph.insertVertex(graph.getDefaultParent(), null, 'Node', 20, 20, 80, 30);
const cellState = graph.getView().getState(cell);
const handler = graph.createHandler(cellState);

// 重写拖动开始的方法
if (handler instanceof mxVertexHandler) {
    const originalStart = handler.start;
    handler.start = function (x, y, dx, dy) {
        console.log('Drag started on the vertex');
        originalStart.call(this, x, y, dx, dy);
    };
}
```


#### 2. 调试和分析

在开发和调试过程中，你可以使用`createHandler`方法来获取处理程序对象，然后查看其属性和方法，了解`mxGraph`内部是如何处理单元格交互的。

### 方法的默认实现

`mxGraph`类中`createHandler`方法的默认实现会根据单元格的类型和状态创建合适的处理程序。以下是简化的伪代码示例：

```javascript 
mxGraph.prototype.createHandler = function (state) {
    if (state.cell.isEdge()) {
        return new mxEdgeHandler(this, state);
    } else {
        return new mxVertexHandler(this, state);
    }
};
```


这个默认实现会根据单元格是边还是顶点，分别创建`mxEdgeHandler`或`mxVertexHandler`处理程序。

综上所述，`graph.createHandler`方法是`mxGraph`中用于管理单元格交互的重要方法，它为开发者提供了自定义和扩展图形交互功能的途径。
