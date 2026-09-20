# setDisconnectOnMove

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [使用场景](#使用场景)
- [示例代码](#示例代码)

在`mxGraph`中，`setDisconnectOnMove`是`mxGraph`类的一个方法，**用于设置在移动单元格（如节点）时是否断开与之相连的边**。以下从功能概述、参数、使用场景、示例代码以及代码解释等方面详细介绍该方法。

### 功能概述

`setDisconnectOnMove`方法的主要功能\*\*是控制当用户移动`mxGraph`中的单元格（通常是节点）时，与之相连的边是否会自动断开。\*\*当设置为允许断开时，移动节点会使连接该节点的边与节点分离；当设置为不允许断开时，移动节点时边会跟随节点一起移动，保持连接状态。

### 参数

该方法接收一个参数：

- **`disconnect`**：类型为`boolean`，表示是否允许在移动单元格时断开相连的边。`true`表示允许断开，`false`表示不允许断开，边会跟随单元格一起移动。

### 使用场景

- **自由布局调整**：在一些需要自由调整图形布局的场景中，可能希望在移动节点时断开与之相连的边，以便更灵活地重新连接边到其他节点。例如，在绘制流程图时，用户可能需要重新组织节点的位置和连接关系，此时设置允许断开边可以方便操作。
- **保持结构完整性**：在某些情况下，需要保证图形的结构完整性，即节点移动时边不能断开。比如，在展示组织结构图时，节点之间的关系是固定的，移动节点时边应该跟随移动，以保持组织架构的正确性。
- **不同操作模式切换**：根据用户的不同操作需求，动态地切换是否允许断开边。例如，在编辑模式下允许断开边以方便调整，在查看模式下禁止断开边以保持图形的稳定性。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>setDisconnectOnMove Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <button id="enableDisconnectButton">Enable Disconnect on Move</button>
    <button id="disableDisconnectButton">Disable Disconnect on Move</button>
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

            const enableDisconnectButton = document.getElementById('enableDisconnectButton');
            enableDisconnectButton.addEventListener('click', function () {
                graph.setDisconnectOnMove(true);
            });

            const disableDisconnectButton = document.getElementById('disableDisconnectButton');
            disableDisconnectButton.addEventListener('click', function () {
                graph.setDisconnectOnMove(false);
            });
        }
    </script>
</body>

</html>
```
