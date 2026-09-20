# setAllowDanglingEdges

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`中，`setAllowDanglingEdges`是一个用于**控制是否允许出现悬空边的方法**。下面将从功能概述、参数、使用场景、示例代码以及代码解释等方面详细介绍该方法。

### 功能概述

**悬空边指的是没有正确连接到节点的边，即边的一端或两端没有与有效的节点相连**。`setAllowDanglingEdges`方法的主要作用是设置在`mxGraph`中是否允许存在这样的悬空边。当允许时，**用户可以创建或操作没有完全连接到节点的边；当不允许时，系统会阻止创建悬空边，并且在操作过程中保证边始终与节点正确连接。**

### 参数

该方法接收一个参数：

- **`allow`**：类型为`boolean`。当`allow`为`true`时，表示允许在图形中存在悬空边；当`allow`为`false`时，则禁止出现悬空边。

### 使用场景

- **灵活绘图需求**：在某些情况下，用户可能需要临时创建一些未完全连接的边来辅助绘图或进行初步的设计构思。例如，在绘制复杂流程图时，先大致勾勒出边的走向，后续再完善连接关系，此时可以将`allow`设置为`true`，允许悬空边的存在。
- **数据完整性要求**：对于一些对图形数据完整性要求较高的场景，如数据库关系图、组织结构图等，不允许出现悬空边，因为这可能会导致数据关系的混乱。此时应将`allow`设置为`false`，确保边始终与节点正确连接。
- **交互控制**：根据用户的不同操作阶段或权限，动态地调整是否允许悬空边。例如，在编辑模式下允许用户临时创建悬空边，而在保存或提交图形数据时，将其设置为不允许，以保证最终数据的正确性。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>setAllowDanglingEdges Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <button id="allowDanglingButton">Allow Dangling Edges</button>
    <button id="disallowDanglingButton">Disallow Dangling Edges</button>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            graph.getModel().beginUpdate();
            try {
                const parent = graph.getDefaultParent();
                const node1 = graph.insertVertex(parent, null, 'Node 1', 20, 20, 80, 30);
                const node2 = graph.insertVertex(parent, null, 'Node 2', 200, 200, 80, 30);
            } finally {
                graph.getModel().endUpdate();
            }

            const allowDanglingButton = document.getElementById('allowDanglingButton');
            allowDanglingButton.addEventListener('click', function () {
                graph.setAllowDanglingEdges(true);
            });

            const disallowDanglingButton = document.getElementById('disallowDanglingButton');
            disallowDanglingButton.addEventListener('click', function () {
                graph.setAllowDanglingEdges(false);
            });
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例并插入节点**：创建一个`mxGraph`实例并关联到 HTML 容器上，然后插入两个节点。
2. **添加按钮并绑定事件**：在页面上添加两个按钮，分别用于允许和禁止悬空边的存在。
   - 当点击 “Allow Dangling Edges” 按钮时，调用`graph.setAllowDanglingEdges(true)`方法，设置允许图形中存在悬空边。
   - 当点击 “Disallow Dangling Edges” 按钮时，调用`graph.setAllowDanglingEdges(false)`方法，设置禁止图形中出现悬空边。

通过`setAllowDanglingEdges`方法，开发者可以根据具体需求灵活控制`mxGraph`中悬空边的存在情况，以满足不同的业务场景和用户交互要求。
