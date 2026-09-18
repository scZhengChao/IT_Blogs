# setTerminalPoint

## 目录

- [方法概述](#方法概述)
- [方法签名](#方法签名)
- [参数说明](#参数说明)
- [使用示例](#使用示例)
- [代码解释](#代码解释)
- [应用场景](#应用场景)

在`mxGraph`中，`geo`通常代表`mxGeometry`对象，`setTerminalPoint`方法用于设置边（`Edge`）**的端点（源端点或目标端点）的位置**。下面为你详细介绍该方法的相关信息，包括方法概述、参数、使用示例、代码解释以及应用场景。

### 方法概述

`setTerminalPoint`方法主要**用于动态改变边的连接位置。** 在图形编辑过程中，可能需要根据用户的操作或数据的变化来调整边的端点位置，该方法可以帮助你实现这一需求。

### 方法签名

```javascript 
geo.setTerminalPoint(point, isSource);
```


### 参数说明

- **`point`**：
  - **类型**：`mxPoint`。
  - **描述**：必需参数，代表要设置的端点的新位置。`mxPoint`对象包含`x`和`y`属性，分别表示该点的横坐标和纵坐标。
- **`isSource`**：
  - **类型**：`Boolean`。
  - **描述**：必需参数，用于指定要设置**的端点是源端点（****`true`****）还是目标端点**（`false`）。

### 使用示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>geo.setTerminalPoint Example</title>
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
                // 获取边的几何信息
                var geo = graph.getModel().getGeometry(edge);

                // 创建一个新的端点位置
                var newEndpoint = new mxPoint(300, 20);

                // 设置边的目标端点位置
                graph.getModel().beginUpdate();
                try {
                    geo.setTerminalPoint(newEndpoint, false);
                    // 刷新视图
                    graph.refresh();
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
   - 使用`graph.getModel().getGeometry(edge)`方法获取边的几何信息`geo`。
   - 创建一个新的端点位置`newEndpoint`，这里将其`x`坐标设置为 300，`y`坐标设置为 20。
   - 调用`geo.setTerminalPoint(newEndpoint, false)`方法将边的目标端点位置设置为`newEndpoint`。
   - 调用`graph.refresh()`方法刷新视图，使更改生效。
3. **更新模型**：在修改几何信息前后，使用`graph.getModel().beginUpdate()`和`graph.getModel().endUpdate()`方法确保模型的更新操作被正确处理。

### 应用场景

- **图形动态调整**：在需要动态改变图形结构的场景中，例如根据用户输入或数据变化调整边的连接关系，可以使用该方法来设置边的端点位置。
- **动画效果**：在实现图形动画效果时，通过逐步改变边的端点位置，可以实现边的动态连接和断开效果。
