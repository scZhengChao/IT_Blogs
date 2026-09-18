# getTerminal

## 目录

- [方法功能](#方法功能)
- [方法签名](#方法签名)
- [参数说明](#参数说明)
- [返回值](#返回值)
- [示例代码](#示例代码)
- [代码解释](#代码解释)
- [使用场景](#使用场景)

在`mxGraph`库中，`graph.model.getTerminal`是一个用于获取单元格终端（连接点）的方法。下面将从方法的功能、参数、返回值、使用示例以及使用场景等方面详细介绍。

### 方法功能

`graph.model.getTerminal`方法主要用于**获取指定单元格的源终端（起始连接点）或目标终端（结束连接点**）。在`mxGraph`中，图形元素（如顶点和边）之间可以通过连接来表示关系，而这些连接的起始点和结束点就被称为终端。

### 方法签名

```javascript 
graph.model.getTerminal(cell, source);
```


### 参数说明

- **`cell`**：
  - **类型**：`mxCell`。
  - **描述**：必需参数，代表要获取终端的单元格对象。通常这个单元格是一条边（`mxEdge`），因为边才有起始和结束的连接点。
- **`source`**：
  - **类型**：`Boolean`。
  - **描述**：必需参数，用于指定是获取源终端（起始连接点）还是目标终端（结束连接点）。如果值为`true`，则获取源终端；如果值为`false`，则获取目标终端。

### 返回值

该方法返回一个`mxCell`对象，表示指定单元格的源终端或目标终端。如果该单元格没有对应的终端，则返回`null`。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxGraph getTerminal Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
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

                // 创建一条边连接两个顶点
                var edge = graph.insertEdge(parent, null, 'Edge', vertex1, vertex2);

                // 获取边的源终端
                var sourceTerminal = graph.model.getTerminal(edge, true);
                console.log('Source terminal:', sourceTerminal.value);

                // 获取边的目标终端
                var targetTerminal = graph.model.getTerminal(edge, false);
                console.log('Target terminal:', targetTerminal.value);
            } finally {
                // 结束编辑
                graph.getModel().endUpdate();
            }
        });
    </script>
</head>

<body>
    <!-- 图表容器 -->
    <div id="graphContainer" style="width: 600px; height: 400px;"></div>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：通过`mxGraph`构造函数创建一个图实例，并指定其显示容器。
2. **创建顶点和边**：使用`graph.insertVertex`方法创建两个顶点，然后使用`graph.insertEdge`方法创建一条边，将两个顶点连接起来。
3. **获取终端**：调用`graph.model.getTerminal`方法，分别传入`true`和`false`来获取边的源终端和目标终端，并将终端的标签值打印到控制台。
4. **结束编辑**：使用`graph.getModel().endUpdate()`方法结束编辑操作，触发视图更新。

### 使用场景

- **图形分析**：在进行图形的拓扑结构分析时，需要知道边的起始和结束顶点，以便了解图形中元素之间的连接关系。
- **数据处理**：当需要根据边的连接信息进行数据处理时，例如计算路径、查找连通分量等，可以使用该方法获取边的终端信息。
