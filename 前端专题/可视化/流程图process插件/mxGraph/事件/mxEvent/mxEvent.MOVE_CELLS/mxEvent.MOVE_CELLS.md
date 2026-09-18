# mxEvent.MOVE\_CELLS

## 目录

- [事件概述](#事件概述)
- [使用场景](#使用场景)
- [使用示例](#使用示例)
- [代码解释](#代码解释)

在`mxGraph`中，`mxEvent.MOVE_CELLS`是一个预定义的事件常量，用于表示单元格（如节点、边等）在图形中被移动时触发的事件。下面从事件概述、使用场景、使用示例、代码解释等方面进行详细介绍。

### 事件概述

当用户在`mxGraph`的**图形界面中拖动一个或多个单元格，使其位置发生改变时** **，** 就会触发`mxEvent.MOVE_CELLS`事件。开发者可以监听这个事件，在单元格移动操作完成后执行特定的逻辑，例如更新相关数据、重新计算布局、进行动画效果展示等。

### 使用场景

- **数据同步**：当单元格位置改变后，将新的位置信息同步到后端数据库或其他数据存储中，确保数据的一致性。
- **布局调整**：在单元格移动后，可能需要重新计算整个图形的布局，以保证图形的美观和合理性。
- **动画效果**：可以为单元格的移动添加动画效果，增强用户体验。例如，在单元格移动时显示移动轨迹或过渡动画。
- **碰撞检测**：检查移动后的单元格是否与其他单元格发生碰撞，如果发生碰撞，可以采取相应的处理措施，如阻止移动或调整位置。

### 使用示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxEvent.MOVE_CELLS Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            // 添加 MOVE_CELLS 事件监听器
            graph.addListener(mxEvent.MOVE_CELLS, function (sender, evt) {
                const cells = evt.getProperty('cells');
                const deltas = evt.getProperty('deltas');
                console.log(`Number of cells moved: ${cells.length}`);
                cells.forEach((cell, index) => {
                    const delta = deltas[index];
                    console.log(`Cell with ID ${cell.getId()} moved by (${delta.dx}, ${delta.dy})`);
                    // 这里可以添加其他处理逻辑，如数据同步
                });
            });

            graph.getModel().beginUpdate();
            try {
                const parent = graph.getDefaultParent();
                // 插入一个顶点
                const vertex = graph.insertVertex(parent, null, 'Movable Node', 20, 20, 80, 30);
            } finally {
                graph.getModel().endUpdate();
            }
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：创建一个`mxGraph`实例，并将其关联到 HTML 页面中的一个容器元素上。
2. **添加事件监听器**：使用`graph.addListener`方法监听`mxEvent.MOVE_CELLS`事件。当该事件触发时，会执行回调函数。在回调函数中，通过`evt.getProperty('cells')`获取被移动的单元格数组，通过`evt.getProperty('deltas')`获取每个单元格的移动偏移量数组。然后遍历单元格数组，输出每个单元格的 ID 以及其移动的偏移量。
3. **插入顶点**：在图形中插入一个顶点，用户可以拖动该顶点，从而触发`mxEvent.MOVE_CELLS`事件。

通过监听`mxEvent.MOVE_CELLS`事件，开发者可以在单元格移动操作完成后及时执行自定义的逻辑，实现更丰富的图形交互和数据处理功能。
