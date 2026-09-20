# `connectionHandler`启动一个连接创建的操作

## 目录

- [代码整体含义](#代码整体含义)
- [代码各部分解释](#代码各部分解释)
  - [1.this.graph](#1thisgraph)
  - [2.connectionHandler](#2connectionHandler)
  - [3.start方法](#3start方法)
  - [4.this.state](#4thisstate)
  - [5.pt.x和pt.y](#5ptx和pty)
- [代码示例场景](#代码示例场景)
- [示例代码解释](#示例代码解释)

### 代码整体含义

这段代码`this.graph.connectionHandler.start(this.state, pt.x, pt.y);`通常是在`mxGraph`库的应用场景中使用的，其主要作用是启动一个连接创建的操作。下面对代码中的各个部分进行详细解释：

### 代码各部分解释

#### 1.`this.graph`

- `this.graph`一般是`mxGraph`类的一个实例对象。`mxGraph`是`mxGraph`库中用于表示和操作图形的核心类，它包含了图形的各种属性、方法以及管理图形元素（如节点、边等）的功能。

#### 2.`connectionHandler`

- `connectionHandler`是`mxGraph`中负责**处理连接操作的一个处理程序对象。在图形绘制和编辑的场景中，连接通常指的是在两个节点之间创建边（edge）的操作。** 这个处理程序会管理连接创建过程中的各种交互逻辑，比如鼠标事件的处理、连接的有效性验证等。

#### 3.`start`方法

- `start`是`connectionHandler`对象的一个方法，用于启动连接创建的过程。该方法通常会初始化连接创建所需的状态，并开始监听用户的操作（如鼠标拖动）来完成连接的创建。

#### 4.`this.state`

- `this.state`通常是一个`mxCellState`对象。在`mxGraph`中，`mxCellState`表示一个单元格（cell，如节点或边）在图形中的当前状态，包含了单元格的位置、大小、样式等信息。这里将`this.state`作为参数传递给`start`方法，意味着连接操作将从这个单元格开始。

#### 5.`pt.x`和`pt.y`

- `pt`一般是一个包含`x`和`y`属性的对象，表示一个点的坐标。`pt.x`和`pt.y`分别是该点的水平和垂直坐标。这两个坐标指定了连接操作开始的具体位置，通常是鼠标点击或开始拖动的位置。

### 代码示例场景

假设我们有一个`mxGraph`应用，用户可以通过点击一个节点并拖动鼠标来创建连接到其他节点的边。以下是一个简化的示例代码：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxGraph Connection Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            const parent = graph.getDefaultParent();
            graph.getModel().beginUpdate();
            try {
                const v1 = graph.insertVertex(parent, null, 'Node 1', 20, 20, 80, 30);
                const v2 = graph.insertVertex(parent, null, 'Node 2', 200, 20, 80, 30);

                graph.addListener(mxEvent.CLICK, function (sender, evt) {
                    const cell = evt.getProperty('cell');
                    if (cell) {
                        const state = graph.getView().getState(cell);
                        const point = mxUtils.convertPoint(graph.container, mxEvent.getClientX(evt.getProperty('event')), mxEvent.getClientY(evt.getProperty('event')));
                        graph.connectionHandler.start(state, point.x, point.y);
                    }
                });
            } finally {
                graph.getModel().endUpdate();
            }
        }
    </script>
</body>

</html>
```


### 示例代码解释

- 首先创建了一个`mxGraph`实例并添加了两个节点。
- 然后为图形添加了一个点击事件监听器。当用户点击一个节点时，会获取该节点的`mxCellState`对象以及点击的坐标。
- 最后调用`graph.connectionHandler.start`方法，从点击的节点开始启动连接创建操作。**用户可以通过拖动鼠标来完成连接到其他节点的边的创建。**

[connectionHandler.isConnectableCell](./isConnectableCell/index.md "connectionHandler.isConnectableCell")
