# mxEvent.LABEL\_CHANGED

## 目录

- [事件概述](#事件概述)
- [使用场景](#使用场景)
- [使用示例](#使用示例)

在`mxGraph`库中，`mxEvent.LABEL_CHANGED`是一个预定义的事件常量，用于表示单元格标签发生改变的事件。下面从事件概述、使用场景、使用示例、代码解释等方面详细介绍。

### 事件概述

在`mxGraph`里，**单元格（如节点、边等）可以有标签，标签通常是显示在单元格上的文本内容**。当这些标签的内容被修改时，就会触发`mxEvent.LABEL_CHANGED`事件。开发者可以监听这个事件，以便在标签改变时执行相应的操作，比如更新数据、同步显示等。

### 使用场景

- **数据同步**：当用户修改了单元格的标签后，需要将新的标签内容同步到后端数据库或者其他数据存储中。
- **界面更新**：标签改变后，可能需要更新与该单元格相关的其他界面元素，比如更新统计信息、调整布局等。
- **验证和提示**：对用户输入的新标签内容进行验证，如果不符合规则，可以给出提示信息。

### 使用示例

```html 

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxEvent.LABEL_CHANGED Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            // 添加 LABEL_CHANGED 事件监听器
            graph.addListener(mxEvent.LABEL_CHANGED, function (sender, evt) {
                const cell = evt.getProperty('cell');
                const oldValue = evt.getProperty('previous');
                const newValue = cell.getValue();
                console.log(`Label of cell with ID ${cell.getId()} changed from '${oldValue}' to '${newValue}'`);
                // 这里可以添加其他处理逻辑，比如数据同步
            });

            graph.getModel().beginUpdate();
            try {
                const parent = graph.getDefaultParent();
                const vertex = graph.insertVertex(parent, null, 'Initial Label', 20, 20, 80, 30);
            } finally {
                graph.getModel().endUpdate();
            }

            // 模拟标签修改
            setTimeout(() => {
                graph.getModel().beginUpdate();
                try {
                    const vertex = graph.getModel().getCell(0);
                    graph.getModel().setValue(vertex, 'New Label');
                } finally {
                    graph.getModel().endUpdate();
                }
            }, 2000);
        }
    </script>
</body>

</html>

```
