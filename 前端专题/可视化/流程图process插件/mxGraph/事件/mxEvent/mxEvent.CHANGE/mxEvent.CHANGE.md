# mxEvent.CHANGE

## 目录

- [各部分含义](#各部分含义)
- [使用场景](#使用场景)
- [示例代码](#示例代码)

在`mxGraph`中，`graph.getSelectionModel().addListener(mxEvent.CHANGE)`这行代码的作用是**监听图形中选择状态的变化事件**。下面将从各个部分的含义、使用场景、示例代码及代码解释几个方面详细介绍。

### 各部分含义

- **`graph.getSelectionModel()`**：
  - `graph`是`mxGraph`的实例，代表一个图形对象。
  - `getSelectionModel()`是`mxGraph`实例的一个方法，用于**获取当前图形的选择模型**（`mxSelectionModel`）。选择模型负责**管理图形中被选中的单元格（如节点、边等），它记录了哪些单元格处于选中状态。**
- **`addListener(mxEvent.CHANGE)`**：
  - `addListener`是`mxEventSource`类（`mxSelectionModel`继承自该类）的一个方法，用于为指定的事件添加监听器。
  - `mxEvent.CHANGE`是`mxGraph`预定义的一个事件常量，**表示选择状态发生改变的事件**。当图形中单元格的选择状态（如选中、取消选中）发生变化时，就会触发这个事件。

### 使用场景

- **同步数据**：当图形中单元格的选择状态改变时，可能需要将新的选择信息同步到后端数据库或者更新前端界面上的其他数据展示区域。
- **更新界面**：根据选择状态的变化，更新图形界面的显示，例如高亮显示选中的单元格、显示选中单元格的详细信息等。
- **执行操作**：在选择状态改变时执行特定的操作，如删除选中的单元格、复制选中的单元格等。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Selection Change Listener Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            // 添加选择状态改变事件监听器
            graph.getSelectionModel().addListener(mxEvent.CHANGE, function (sender, evt) {
                const cells = graph.getSelectionCells();
                console.log('Selected cells:');
                cells.forEach(function (cell) {
                    console.log(' - ', cell.value);
                });
            });

            graph.getModel().beginUpdate();
            try {
                const parent = graph.getDefaultParent();
                const vertex1 = graph.insertVertex(parent, null, 'Node 1', 20, 20, 80, 30);
                const vertex2 = graph.insertVertex(parent, null, 'Node 2', 200, 200, 80, 30);
            } finally {
                graph.getModel().endUpdate();
            }
        }
    </script>
</body>

</html>
```
