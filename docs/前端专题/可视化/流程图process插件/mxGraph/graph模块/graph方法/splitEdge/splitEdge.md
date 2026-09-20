# splitEdge

## 目录

- [方法概述](#方法概述)
- [方法签名](#方法签名)
- [参数说明](#参数说明)
- [使用示例](#使用示例)
  - [代码解释](#代码解释)
  - [应用场景](#应用场景)

在`mxGraph`里，`graph.splitEdge`方法用于**将一条边拆分成两条边，并且会在拆分点处插入一个新的顶点**。以下从方法概述、参数、使用示例、代码解释以及应用场景几个方面详细介绍。

### 方法概述

`graph.splitEdge`方法允许你在**已有边的某个位置插入一个新的顶点，从而把这条边拆分成两条新的边**。这个操作在图形编辑、流程图绘制等场景中非常有用，比如在流程图中添加一个新的步骤节点。

### 方法签名

```javascript 
graph.splitEdge(edge, vertices, point, parent);
```


### 参数说明

- **`edge`**：
  - **类型**：`mxCell`。
  - **描述**：必需参数，代表要拆分的边。这是一个`mxCell`对象，可通过`graph.getModel().getCell`等方法获取。
- **`vertices`**：
  - **类型**：`Array<mxCell>`。
  - **描述**：必需参数，是一个包含要插入的顶点的数组。通常这个数组只包含一个顶点，但在某些情况下也可以包含多个顶点。
- **`point`**：
  - **类型**：`mxPoint`。
  - **描述**：必需参数，指定拆分点的位置。`mxPoint`对象包含`x`和`y`属性，分别表示该点的横坐标和纵坐标。
- **`parent`**：
  - **类型**：`mxCell`。
  - **描述**：可选参数，默认为`null`。指定新插入的顶点和拆分后的边的父单元格。如果为`null`，则使用图的默认父单元格。

# 使用示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>graph.splitEdge Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px;"></div>
    <button id="splitEdgeButton">Split Edge</button>
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
            var splitEdgeButton = document.getElementById('splitEdgeButton');
            // 为按钮添加点击事件监听器
            splitEdgeButton.addEventListener('click', function () {
                // 创建一个新的顶点
                var newVertex = graph.insertVertex(parent, null, 'New Vertex', 110, 20, 30, 30);

                // 定义拆分点
                var splitPoint = new mxPoint(110, 20);

                // 拆分边
                graph.getModel().beginUpdate();
                try {
                    graph.splitEdge(edge, [newVertex], splitPoint, null);
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

1. **创建**\*\*`mxGraph`\*\***实例和顶点、边**：创建`mxGraph`实例，然后创建两个顶点`vertex1`和`vertex2`，并在它们之间创建一条边`edge`。
2. **添加按钮并监听点击事件**：创建一个按钮，为其添加点击事件监听器。在点击事件处理函数中，执行以下操作：
   - 创建一个新的顶点`newVertex`，作为拆分点处要插入的顶点。
   - 创建一个`mxPoint`对象`splitPoint`，指定拆分点的位置。
   - 调用`graph.splitEdge`方法，将边`edge`在`splitPoint`处拆分，并插入新顶点`newVertex`。
3. **更新模型**：在修改图形元素前后，使用`graph.getModel().beginUpdate()`和`graph.getModel().endUpdate()`方法确保模型的更新操作被正确处理。

### 应用场景

- **流程图编辑**：在流程图中，如果需要在已有的流程步骤之间添加一个新的步骤，可以使用`graph.splitEdge`方法将表示流程的边拆分，并插入新的步骤节点。
- **网络拓扑图修改**：在网络拓扑图中，当需要在已有的网络连接中添加一个新的设备节点时，可以使用该方法拆分连接边并插入新节点。
