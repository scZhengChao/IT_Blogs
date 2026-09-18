# setCellsBendable

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [使用场景](#使用场景)

在`mxGraph`里，`setCellsBendable`是用于**设置图形中单元格（通常是边）是否可弯曲的方法**。下面从功能概述、参数、使用场景、示例代码以及代码解释等方面详细介绍。

### 功能概述

`setCellsBendable`方法的主要功能是控制指定单元格（一般是边元素）是否允许用户对其进行弯曲操作。当边可弯曲时，用户可以通过鼠标拖动边的控制点来改变边的形状，使其呈现出折线、弧线等不同的弯曲效果；若设置为不可弯曲，边将保持初始的直线或预设形状，用户无法对其进行弯曲调整。

### 参数

该方法接收两个参数：

- **`cells`**：类型可以是`Array<mxCell>`、`mxCell`或者`null`。若传入一个`mxCell`数组，这些指定的单元格会应用设置；若传入单个`mxCell`对象，仅该单元格应用设置；若传入`null`，则表示对图中所有单元格应用设置。
- **`bendable`**：类型为`boolean`，用于指定单元格是否可弯曲。`true`表示允许弯曲，`false`表示不允许弯曲。

### 使用场景

- **规范图形样式**：在绘制一些具有固定格式要求的图形时，比如流程图、组织结构图等，为了保证图形的规范性和一致性，可能不希望用户随意弯曲边。此时可以将所有边设置为不可弯曲。
- **部分元素特殊处理**：对于图形中的某些边，可能由于设计需求或业务逻辑，不希望其被弯曲。例如，一些代表固定关系的边，将这些特定的边单独设置为不可弯曲。
- **交互控制**：根据用户的操作权限或者不同的交互阶段，动态地控制边是否可弯曲。例如，在编辑模式下允许边弯曲，在查看模式下禁止边弯曲。

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>setCellsBendable Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <button id="enableBendButton">Enable Bend</button>
    <button id="disableBendButton">Disable Bend</button>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            graph.getModel().beginUpdate();
            try {
                const parent = graph.getDefaultParent();
                const node1 = graph.insertVertex(parent, null, 'Node 1', 20, 20, 80, 30);
                const node2 = graph.insertVertex(parent, null, 'Node 2', 200, 200, 80, 30);
                const edge = graph.insertEdge(parent, null, '', node1, node2);
            } finally {
                graph.getModel().endUpdate();
            }

            const enableBendButton = document.getElementById('enableBendButton');
            enableBendButton.addEventListener('click', function () {
                graph.setCellsBendable(null, true);
            });

            const disableBendButton = document.getElementById('disableBendButton');
            disableBendButton.addEventListener('click', function () {
                graph.setCellsBendable(null, false);
            });
        }
    </script>
</body>

</html>
```
