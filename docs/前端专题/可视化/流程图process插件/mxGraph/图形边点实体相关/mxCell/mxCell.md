# mxCell

## 目录

- [相关概念](#相关概念)
- [方法作用](#方法作用)
- [方法签名](#方法签名)
- [参数说明](#参数说明)
- [使用示例](#使用示例)
- [代码解释](#代码解释)
- [应用场景](#应用场景)

在`mxGraph`库中，`edgeState.cell.geometry.setTerminalPoint`用于设置边（`Edge`）的端点位置。下面将从相关概念、方法作用、参数、使用示例和应用场景等方面详细介绍。

### 相关概念

- **`edgeState`**：`mxCellState`类型的对象，它代表了边（`mxCell`）在图形视图中的状态信息，包含了边的位置、样式等与视图相关的属性。
- **`edgeState.cell`**：指向边对应的`mxCell`对象，`mxCell`是`mxGraph`中表示图形元素（如顶点、边）的基础数据结构。
- **`edgeState.cell.geometry`**：`mxGeometry`类型的对象，它存储了边的几何信息，例如边的端点位置、相对位置、大小等。

### 方法作用

`setTerminalPoint`方法的主要作用是**设置边的端点（源端点或目标端点）的位置**。通过该方法，**可以动态地改变边的连接位置，从而实现图形结构的调整。**

### 方法签名

```typescript 
edgeState.cell.geometry.setTerminalPoint(point, isSource);
```


### 参数说明

- **`point`**：
  - **类型**：`mxPoint`。
  - **描述**：必需参数，代表要设置的端点的新位置。`mxPoint`对象包含`x`和`y`属性，分别表示该点的横坐标和纵坐标。
- **`isSource`**：
  - **类型**：`Boolean`。
  - **描述**：必需参数，用于指定要设置的端点是源端点（`true`）还是目标端点（`false`）。

### 使用示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>setTerminalPoint Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px;"></div>
    <button id="changeEndpointButton">Change Edge Endpoint</button>
    <script type="text/javascript">
        mxLoadResources = false;
        mxBasePath = '.';
        mxClient.link('js/mxClient.js', function () {
            // 创建 mxGraph 实例
            var container = document.getElementById('graphContainer');
            var graph = new mxGraph(container);

            // 获取默认父单元格
            var parent = graph.getDefaultParent();

            // 开始编辑
            graph.getModel().beginUpdate();
            try {
                // 创建两个顶点
                var vertex1 = graph.insertVertex(parent, null, 'Vertex 1', 20, 20, 80, 30);
                var vertex2 = graph.insertVertex(parent, null, 'Vertex 2', 200, 20, 80, 30);

                // 创建一条边
                var edge = graph.insertEdge(parent, null, 'Edge', vertex1, vertex2);
            } finally {
                // 结束编辑
                graph.getModel().endUpdate();
            }

            // 获取按钮元素
            var changeEndpointButton = document.getElementById('changeEndpointButton');
            // 为按钮添加点击事件监听器
            changeEndpointButton.addEventListener('click', function () {
                // 获取边的状态对象
                var view = graph.getView();
                var edgeState = view.getState(edge);

                // 创建一个新的端点位置
                var newEndpoint = new mxPoint(300, 20);

                // 设置边的目标端点位置
                graph.getModel().beginUpdate();
                try {
                    edgeState.cell.geometry.setTerminalPoint(newEndpoint, false);
                    // 刷新视图
                    view.invalidate(edgeState.cell);
                } finally {
                    graph.getModel().endUpdate();
                }
            });
        });
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例和顶点、边**：创建`mxGraph`实例，然后创建两个顶点和一条连接它们的边。
2. **添加按钮并监听点击事件**：创建一个按钮，为其添加点击事件监听器。在点击事件处理函数中，执行以下操作：
   - 获取边的状态对象`edgeState`。
   - 创建一个新的端点位置`newEndpoint`。
   - 调用`setTerminalPoint`方法将边的目标端点位置设置为`newEndpoint`。
   - 调用`view.invalidate`方法刷新视图，使更改生效。

### 应用场景

- **图形动态调整**：在需要动态改变图形结构的场景中，例如根据用户输入或数据变化调整边的连接关系，可以使用该方法来设置边的端点位置。
- **动画效果**：在实现图形动画效果时，通过逐步改变边的端点位置，可以实现边的动态连接和断开效果。

[获取cell的坐标](获取cell的坐标.md "获取cell的坐标")
