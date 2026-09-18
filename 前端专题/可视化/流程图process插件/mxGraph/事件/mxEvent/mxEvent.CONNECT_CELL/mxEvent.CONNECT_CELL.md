# mxEvent.CONNECT\_CELL

## 目录

- [事件概述](#事件概述)
- [使用场景](#使用场景)
- [使用示例](#使用示例)

在`mxGraph`中，`mxEvent.CONNECT_CELL`是一个预定义的事件常量，它代表的是在图中**连接两个单元格（通常是节点）时触发**的事件。下面从事件概述、使用场景、使用示例以及代码解释几个方面来详细介绍这个事件。

### 事件概述

当在`mxGraph`里创建一条边（连接）将两个单元格连接起来时，就会触发`mxEvent.CONNECT_CELL`事件。这个事件允许开发者在连接操作发生时执行特定的逻辑，比如**验证连接的合法性、更新相关数据或者执行一些额外的可视化操作等。**

### 使用场景

- **连接验证**：在实际业务中，可能存在一些规则限制某些节点之间不能进行连接。通过监听`mxEvent.CONNECT_CELL`事件，可以在连接操作发生时进行验证，如果不符合规则，阻止连接的创建。
- **数据更新**：当两个节点连接起来后，可能需要更新相关的数据模型，例如在数据库中记录这个连接关系，或者更新图表中的统计信息。
- **可视化效果**：可以在连接创建时添加一些特殊的可视化效果，比如动画、提示信息等，增强用户体验。

### 使用示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxEvent.CONNECT_CELL Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            // 添加 CONNECT_CELL 事件监听器
            graph.addListener(mxEvent.CONNECT_CELL, function (sender, evt) {
                const edge = evt.getProperty('cell');
                const source = edge.getTerminal(true);
                const target = edge.getTerminal(false);
                console.log(`A new connection has been created between '${source.getValue()}' and '${target.getValue()}'`);

                // 这里可以添加其他处理逻辑，例如数据验证或更新
            });

            graph.getModel().beginUpdate();
            try {
                const parent = graph.getDefaultParent();
                const node1 = graph.insertVertex(parent, null, 'Node 1', 20, 20, 80, 30);
                const node2 = graph.insertVertex(parent, null, 'Node 2', 200, 200, 80, 30);

                // 创建连接
                const edge = graph.insertEdge(parent, null, '', node1, node2);
            } finally {
                graph.getModel().endUpdate();
            }
        }
    </script>
</body>

</html>
```
