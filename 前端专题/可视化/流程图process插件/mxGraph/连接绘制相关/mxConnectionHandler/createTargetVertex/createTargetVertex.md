# createTargetVertex

## 目录

- [功能概述](#功能概述)
- [方法签名](#方法签名)
- [参数说明](#参数说明)
- [返回值](#返回值)
- [使用示例](#使用示例)
- [代码解释](#代码解释)
- [应用场景](#应用场景)

在`mxGraph`里，`mxConnectionHandler`是用来处理连接操作的类，而`createTargetVertex`是`mxConnectionHandler`中的一个方法，此方法用于在**连接操作时动态创建目标顶点。** 下面会从方法的功能、参数、返回值、使用示例和应用场景等方面详细介绍。

### 功能概述

`mxConnectionHandler.createTargetVertex`方法主要用于在**用户进行连接操作（例如从一个顶点拖动鼠标到另一个位置创建边）时，若目标位置没有合适的顶点，就可以使用该方法创建一个新的目标顶点，并且完成边的连接。**

### 方法签名

```javascript 
mxConnectionHandler.prototype.createTargetVertex = function(evt, source)
```


### 参数说明

- **`evt`**：
  - **类型**：`Event`。
  - **描述**：必需参数，代表触发连接操作的事件对象，像鼠标拖动结束事件等，借助这个事件可以获取鼠标的位置等信息，以确定新顶点的创建位置。
- **`source`**：
  - **类型**：`mxCell`。
  - **描述**：必需参数，是连接操作的源顶点，也就是边的起始顶点。

### 返回值

- **类型**：`mxCell`。
- **描述**：返回新创建的目标顶点对应的`mxCell`对象。

### 使用示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxConnectionHandler.createTargetVertex Example</title>
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
                // 创建一个源顶点
                var sourceVertex = graph.insertVertex(parent, null, 'Source Vertex', 20, 20, 80, 30);
            } finally {
                // 结束编辑
                graph.getModel().endUpdate();
            }

            // 获取 mxConnectionHandler 实例
            var connectionHandler = graph.getConnectionHandler();

            // 重写 createTargetVertex 方法（可选，用于自定义创建逻辑）
            connectionHandler.createTargetVertex = function (evt, source) {
                var newVertex = this.graph.insertVertex(
                    this.graph.getDefaultParent(),
                    null,
                    'New Target Vertex',
                    evt.clientX,
                    evt.clientY,
                    80,
                    30
                );
                return newVertex;
            };
        });
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例和源顶点**：先创建`mxGraph`实例，然后在图中创建一个源顶点。
2. **获取**\*\*`mxConnectionHandler`\*\***实例**：通过`graph.getConnectionHandler()`方法获取当前图的连接处理程序实例。
3. **重写**\*\*`createTargetVertex`方法（可选） \*\*：可以重写该方法来实现自定义的目标顶点创建逻辑。在这个示例里，新顶点的标签是`'New Target Vertex'`，位置由鼠标事件的`clientX`和`clientY`确定。

### 应用场景

- **流程图绘制**：在绘制流程图时，用户可能需要从一个已有的流程节点连接到一个新的节点，这时可以使用该方法动态创建新节点。
- **网络拓扑图构建**：在构建网络拓扑图时，当用户从一个设备节点连接到一个新的位置时，可以动态创建新的设备节点。
