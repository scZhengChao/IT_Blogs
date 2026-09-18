# addWaypointForEvent

## 目录

- [方法概述](#方法概述)
- [方法签名](#方法签名)
- [参数说明](#参数说明)
- [使用示例](#使用示例)
- [代码解释](#代码解释)
- [应用场景](#应用场景)

在`mxGraph`中，`mxConnectionHandler.addWaypointForEvent`方法主要用于在边的连接操作过程中，**根据事件（通常是鼠标事件）来添加路径点（waypoint）。路径点可让边以自定义的弯曲或折线形式连接源顶点和目标顶点**，而非默认的直线连接。以下从方法概述、参数、使用示例、应用场景等方面详细介绍。

### 方法概述

`mxConnectionHandler`是`mxGraph`中处理连接操作的类，`addWaypointForEvent`方法允许在用户进行连接操作时，通过鼠标点击等事件在边的路径上添加路径点，从而自定义边的形状。

### 方法签名

```javascript 
mxConnectionHandler.prototype.addWaypointForEvent = function(evt, index)
```


### 参数说明

- **`evt`**：
  - **类型**：`Event`。
  - **描述**：必需参数，代表触发**添加路径点操作的事件对象，通常是鼠标事件**，如`mousedown`、`click`等。通过该事件可以获取鼠标点击的位置等信息，用于确定路径点的位置。
- **`index`**：
  - **类型**：`Number`。
  - **描述**：可选参数，指定路径点要插入**的索引位置。如果不提供该参数**，路径点通常会添加到边的路径点列表的末尾

### 使用示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxConnectionHandler.addWaypointForEvent Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px;"></div>
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

            // 获取 mxConnectionHandler 实例
            var connectionHandler = graph.getConnectionHandler();

            // 监听鼠标点击事件，添加路径点
            graph.addListener(mxEvent.CLICK, function (sender, evtObj) {
                var evt = evtObj.getProperty('event');
                var cell = graph.getCellAt(evt.clientX, evt.clientY);
                if (cell && graph.getModel().isEdge(cell)) {
                    var edgeState = graph.getView().getState(cell);
                    // 调用 addWaypointForEvent 方法添加路径点
                    connectionHandler.addWaypointForEvent(evt, -1);
                }
            });
        });
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例和顶点、边**：创建`mxGraph`实例，然后创建两个顶点和一条连接它们的边。
2. **获取**\*\*`mxConnectionHandler`\*\***实例**：通过`graph.getConnectionHandler()`方法获取连接处理程序实例。
3. **监听鼠标点击事件**：使用`graph.addListener`监听鼠标点击事件，当点击到边时，获取边的状态对象，并调用`connectionHandler.addWaypointForEvent`方法添加路径点。

### 应用场景

- **自定义边的形状**：在绘制流程图、网络图等图形时，用户可能需要边以非直线的形式连接顶点，通过添加路径点可以实现边的自定义弯曲或折线形状。
- **交互性图形编辑**：在图形编辑工具中，允许用户通过鼠标点击等交互方式动态调整边的形状，增强用户的操作体验。
