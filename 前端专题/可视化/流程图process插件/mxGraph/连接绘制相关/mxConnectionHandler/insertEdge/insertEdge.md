# insertEdge

## 目录

- [方法功能](#方法功能)
- [方法签名](#方法签名)
- [参数说明](#参数说明)
- [使用示例](#使用示例)
- [代码解释](#代码解释)
- [应用场景](#应用场景)

在`mxGraph`中，`mxConnectionHandler`是处理连接操作的核心类，`insertEdge`方法是其中**用于创建边**（`Edge`）的关键方法。下面从方法的功能、参数、使用示例、代码解释以及应用场景几个方面详细介绍。

### 方法功能

`mxConnectionHandler.insertEdge`方法的主要功能\*\*是在用户进行连接操作（例如从一个顶点拖动鼠标到另一个顶点）时，创建一条连接源顶点和目标顶点的边。**这个方法会**处理边的插入逻辑，包括样式设置、事件绑定等，\*\*确保边能够正确地显示在图中并与顶点连接。

### 方法签名

```javascript 
mxConnectionHandler.prototype.insertEdge = function(parent, id, value, source, target, style)
```


### 参数说明

- **`parent`**：
  - **类型**：`mxCell`。
  - **描述**：必需参数，代表新创建的边的父单元格，通常是图形的默认父单元格。
- **`id`**：
  - **类型**：`String`。
  - **描述**：可选参数，是新边的唯一标识符。如果传入`null`，`mxGraph`会自动生成一个唯一的 ID。
- **`value`**：
  - **类型**：`Object`。
  - **描述**：可选参数，是边携带的数据值，可以是字符串、对象等。这个值通常会显示在边的标签上。
- **`source`**：
  - **类型**：`mxCell`。
  - **描述**：必需参数，代表边的源顶点，即边的起始点。
- **`target`**：
  - **类型**：`mxCell`。
  - **描述**：必需参数，代表边的目标顶点，即边的终止点。
- **`style`**：
  - **类型**：`String`。
  - **描述**：可选参数，是边的样式字符串，用于定义边的外观，如线条颜色、箭头样式等。

### 使用示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxConnectionHandler.insertEdge Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px;"></div>
    <button id="createEdgeButton">Create Edge</button>
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
            } finally {
                // 结束编辑
                graph.getModel().endUpdate();
            }

            // 获取 mxConnectionHandler 实例
            var connectionHandler = graph.getConnectionHandler();

            // 获取按钮元素
            var createEdgeButton = document.getElementById('createEdgeButton');
            // 为按钮添加点击事件监听器
            createEdgeButton.addEventListener('click', function () {
                // 定义边的样式
                var edgeStyle = 'strokeColor=blue;endArrow=classic';

                // 调用 insertEdge 方法创建边
                graph.getModel().beginUpdate();
                try {
                    var edge = connectionHandler.insertEdge(parent, null, 'Edge Label', vertex1, vertex2, edgeStyle);
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

1. **创建**\*\*`mxGraph`\*\***实例和顶点**：创建`mxGraph`实例，并在图中创建两个顶点`vertex1`和`vertex2`。
2. **获取**\*\*`mxConnectionHandler`\*\***实例**：通过`graph.getConnectionHandler()`方法获取当前图的连接处理程序实例。
3. **添加按钮并监听点击事件**：创建一个按钮，为其添加点击事件监听器。在点击事件处理函数中，执行以下操作：
   - 定义边的样式字符串`edgeStyle`，设置线条颜色为蓝色，箭头样式为经典样式。
   - 调用`connectionHandler.insertEdge`方法创建一条连接`vertex1`和`vertex2`的边，并设置边的标签为`'Edge Label'`。
   - 在修改图形元素前后，使用`graph.getModel().beginUpdate()`和`graph.getModel().endUpdate()`方法确保模型的更新操作被正确处理。

### 应用场景

- **流程图绘制**：在绘制流程图时，用户可以通过鼠标拖动操作从一个流程节点连接到另一个节点，`mxConnectionHandler.insertEdge`方法会自动创建连接这两个节点的边，方便用户快速构建流程图。
- **网络拓扑图构建**：在构建网络拓扑图时，用户可以通过连接设备节点来表示网络连接关系，该方法可以帮助用户创建表示连接关系的边。
- **组织结构图设计**：在设计组织结构图时，用户可以通过连接不同的职位节点来表示上下级关系，使用该方法可以轻松创建表示这些关系的边。

分享
