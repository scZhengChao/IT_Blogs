# setTerminal

## 目录

- [功能概述](#功能概述)
- [参数：](#参数)
- [返回值](#返回值)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`库中，`model.setTerminal`方法主要用于**设置边（edge）的起始点（源终端）或结束点（目标终端**）。边在图形中用于连接两个节点，而该方法能改变边所连接的节点，从而调整图形的拓扑结构。以下从功能、参数、返回值、使用场景、示例代码等方面详细介绍该方法。

### 功能概述

`model.setTerminal`方法的核心功能是修改边的连接关系，即改变边的起始节点或结束节点。在图形的编辑和动态调整过程中，可能需要重新连接边，此时就可以使用该方法。

### 参数：

该方法通常接收三个参数：

- **`edge`**：类型为`mxCell`，表示要**修改连接关系的边单元格。**
- **`terminal`**：类型为`mxCell`，表示要设置为边**的起始点或结束点的节点单元格。如果**传入`null`，则表示移除该边的起始点或结束点。
- **`isSource`**：类型为`boolean`，用于指定`terminal`是作为边的起始点（`true`）还是结束点（`false`）。

### 返回值

方法返回传入的`edge`对象，即修改连接关系后的边单元格。

### 使用场景

- **图形编辑**：用户在图形编辑器中拖动边的端点，重新连接到其他节点时，就可以调用该方法更新边的连接关系。
- **动态布局**：在图形的布局调整过程中，可能需要根据算法重新连接边，以达到更好的布局效果。
- **数据更新**：当图形的数据发生变化，例如节点的添加、删除或移动时，可能需要更新边的连接关系。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>model.setTerminal Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            // 获取图形模型
            const model = graph.getModel();

            // 开始更新模型
            model.beginUpdate();
            try {
                // 获取默认父级
                const parent = graph.getDefaultParent();

                // 创建两个节点
                const vertex1 = graph.insertVertex(parent, null, 'Vertex 1', 20, 20, 80, 30);
                const vertex2 = graph.insertVertex(parent, null, 'Vertex 2', 200, 200, 80, 30);
                const vertex3 = graph.insertVertex(parent, null, 'Vertex 3', 300, 300, 80, 30);

                // 创建一条边连接 vertex1 和 vertex2
                const edge = graph.insertEdge(parent, null, 'Edge', vertex1, vertex2);

                // 将边的结束点从 vertex2 改为 vertex3
                model.setTerminal(edge, vertex3, false);

            } finally {
                // 结束更新模型
                model.endUpdate();
            }
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建图形和模型对象**：创建`mxGraph`实例并关联到 HTML 容器，通过`graph.getModel()`获取图形模型。
2. **创建节点和边**：在模型更新的事务块内，使用`graph.insertVertex`方法创建三个节点，然后使用`graph.insertEdge`方法创建一条边，连接`vertex1`和`vertex2`。
3. **修改边的连接关系**：调用`model.setTerminal(edge, vertex3, false)`方法，将边的结束点从`vertex2`改为`vertex3`。
4. **结束模型更新**：使用`model.endUpdate()`结束模型更新事务，确保图形界面更新。

通过`model.setTerminal`方法，可以方便地修改边的连接关系，实现图形拓扑结构的动态调整。
