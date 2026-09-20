# getAllConnectionConstraints

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [返回值](#返回值)
- [使用场景](#使用场景)
- [代码解释](#代码解释)

在`mxGraph`中，`mxGraph.prototype.getAllConnectionConstraints`是一个原型方法，**用于获取所有单元格的连接约束信息**。以下将从功能概述、参数、返回值、使用场景、示例代码以及代码解释等方面详细介绍该方法。

### 功能概述

在`mxGraph`里，**连接约束用于定义单元格（如节点）之间如何进行连接**，比如规定边只能从节点的特定方向（如顶部、左侧等）连接出去，或者只能连接到节点的特定方向。`getAllConnectionConstraints`方法的主要功能是收集并返回图中所有单元格的连接约束信息，方便开发者了解和管理图形的连接规则。

### 参数

该方法**通常不接收任何参数。它会自动遍历图中所有单元格，并获取它们的连接约束信息。**

### 返回值

返回一个对象，\*\*该对象的键是单元格的 ID，值是对应单元格的连接约束数组。**每个连接约束是一个`mxConnectionConstraint`对象，**包含了连接的方向（如****`mxConstants.DIRECTION_NORTH`表示顶部）、偏移量等信息。\*\*示例返回值结构如下：

```json 
{
    "cellId1": [mxConnectionConstraint1, mxConnectionConstraint2, ...],
    "cellId2": [mxConnectionConstraint3, mxConnectionConstraint4, ...],
    // 其他单元格的连接约束信息
}
```


### 使用场景

- **图形连接规则管理**：当需要对整个图形的连接规则进行查看、修改或备份时，通过该方法可以获取所有单元格的连接约束信息，进而进行相应的操作。
- **自定义连接逻辑**：在实现自定义的连接逻辑时，需要了解图中各个单元格的连接约束，以便根据这些约束来控制边的连接行为。
- **数据验证和导出**：在进行数据验证或导出图形数据时，连接约束是重要的一部分信息。使用该方法可以方便地获取这些信息，确保数据的完整性和准确性。

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>getAllConnectionConstraints Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <button id="getConstraintsButton">Get All Connection Constraints</button>
    <pre id="output"></pre>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            graph.getModel().beginUpdate();
            try {
                const parent = graph.getDefaultParent();
                const node1 = graph.insertVertex(parent, null, 'Node 1', 20, 20, 80, 30);
                const node2 = graph.insertVertex(parent, null, 'Node 2', 200, 200, 80, 30);

                // 设置节点 1 的连接约束
                const constraint1 = new mxConnectionConstraint(new mxPoint(0, 0.5), true);
                graph.setConnectableSource(node1, [constraint1]);
                const constraint2 = new mxConnectionConstraint(new mxPoint(1, 0.5), true);
                graph.setConnectableTarget(node1, [constraint2]);
            } finally {
                graph.getModel().endUpdate();
            }

            const getConstraintsButton = document.getElementById('getConstraintsButton');
            const output = document.getElementById('output');
            getConstraintsButton.addEventListener('click', function () {
                const allConstraints = graph.getAllConnectionConstraints();
                output.textContent = JSON.stringify(allConstraints, null, 2);
            });
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例并插入节点**：创建一个`mxGraph`实例并关联到 HTML 容器上，然后插入两个节点。
2. **设置节点的连接约束**：为`Node 1`设置了连接源和连接目标的约束，规定边只能从节点的左侧中间位置连接出去，只能连接到节点的右侧中间位置。
3. **添加按钮并绑定事件**：在页面上添加一个按钮，用于触发获取所有连接约束的操作。
4. **获取并显示连接约束信息**：
   - 当用户点击按钮时，调用`graph.getAllConnectionConstraints()`方法获取所有单元格的连接约束信息。
   - 将获取到的信息以 JSON 格式显示在页面的`<pre>`元素中，方便查看。

通过`getAllConnectionConstraints`方法，开发者可以方便地获取`mxGraph`中所有单元格的连接约束信息，实现对图形连接规则的有效管理和控制。
