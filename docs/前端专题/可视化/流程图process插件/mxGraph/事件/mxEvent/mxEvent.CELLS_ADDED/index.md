# mxEvent.CELLS\_ADDED

## 目录

- [事件概述](#事件概述)
- [使用场景](#使用场景)
- [使用示例](#使用示例)

在`mxGraph`中，`mxEvent.CELLS_ADDED`是一个重要的事件常量，用于表示在图形中添加单元格（如顶点、边等）时触发的事件。下面将从事件概述、使用场景、使用示例以及代码解释等方面详细介绍该事件。

### 事件概述

当在`mxGraph`**实例中添加一个或多个单元格**时，会触发`mxEvent.CELLS_ADDED`事件。开发者可以监听这个事件，以便在单元格添加操作完成后执行特定的逻辑，比如更新相关数据、设置单元格样式、进行布局调整等。

### 使用场景

- **数据同步**：在添加单元格后，将新单元格的信息同步到后端数据库或其他数据存储中，确保数据的一致性。
- **样式设置**：为新添加的单元格应用特定的样式，例如设置默认的颜色、边框等，使图形保持统一的视觉风格。
- **布局调整**：当新的单元格添加到图形中时，可能需要重新计算图形的布局，以确保所有单元格都能合理地显示在视图中。

### 使用示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxEvent.CELLS_ADDED Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            // 添加 CELLS_ADDED 事件监听器
            graph.addListener(mxEvent.CELLS_ADDED, function (sender, evt) {
                const cells = evt.getProperty('cells');
                console.log(`Number of cells added: ${cells.length}`);
                cells.forEach(function (cell) {
                    console.log(`Added cell with ID: ${cell.getId()}`);
                    // 为新添加的单元格设置样式
                    const style = graph.getCellStyle(cell);
                    style.fillColor = 'lightblue';
                    graph.getModel().setStyle(cell, style);
                });
            });

            graph.getModel().beginUpdate();
            try {
                const parent = graph.getDefaultParent();
                // 添加一个顶点
                const vertex = graph.insertVertex(parent, null, 'New Node', 20, 20, 80, 30);
                // 添加一条边
                const source = graph.insertVertex(parent, null, 'Source Node', 100, 100, 80, 30);
                const target = graph.insertVertex(parent, null, 'Target Node', 200, 200, 80, 30);
                const edge = graph.insertEdge(parent, null, '', source, target);
            } finally {
                graph.getModel().endUpdate();
            }
        }
    </script>
</body>

</html>
```
