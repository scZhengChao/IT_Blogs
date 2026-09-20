# isValidConnection

## 目录

- [方法作用](#方法作用)
- [方法参数](#方法参数)
- [方法返回值](#方法返回值)
- [使用示例](#使用示例)
- [代码解释](#代码解释)
- [常见应用场景](#常见应用场景)

在`mxGraph`中，`mxGraph.prototype.isValidConnection`是一个用于验证边（连接）是否可以在两个单元格（节点）之间创建的重要方法。下面将从方法的作用、参数、返回值、使用示例以及常见应用场景等方面进行详细介绍。

### 方法作用

在图的绘制和编辑过程中，有时需要**对边的连接规则进行限制，例如某些节点之间不允许连接，或者连接需要满足特定的条件。**`isValidConnection`方法就是用来检查从一个源单元格到一个目标单元格的连接是否合法。通过重写这个方法 **，开发者可以自定义连接规则，确保图形的结构符合业务需求。**

### 方法参数

该方法通常接收两个参数：

- **`source`**：类型为`mxCell`，表示连接的源单元格，即边的起始节点。
- **`target`**：类型为`mxCell`，表示连接的目标单元格，即边的终止节点。

### 方法返回值

方法返回一个布尔值：

- 如果从`source`到`target`的连接是合法的，返回`true`。
- 如果从`source`到`target`的连接不合法，返回`false`。

### 使用示例

以下是一个简单的示例，展示了如何重写`isValidConnection`方法来限制某些节点之间的连接：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxGraph isValidConnection Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            // 重写 isValidConnection 方法
            graph.isValidConnection = function (source, target) {
                // 假设 ID 为 'node1' 的节点不能连接到 ID 为 'node2' 的节点
                if (source.getId() === 'node1' && target.getId() === 'node2') {
                    return false;
                }
                // 其他情况允许连接
                return true;
            };

            graph.getModel().beginUpdate();
            try {
                const parent = graph.getDefaultParent();
                const node1 = graph.insertVertex(parent, 'node1', 'Node 1', 20, 20, 80, 30);
                const node2 = graph.insertVertex(parent, 'node2', 'Node 2', 200, 200, 80, 30);
                const node3 = graph.insertVertex(parent, 'node3', 'Node 3', 300, 20, 80, 30);

                // 尝试创建合法连接
                graph.insertEdge(parent, null, '', node1, node3);

                // 尝试创建非法连接
                try {
                    graph.insertEdge(parent, null, '', node1, node2);
                } catch (e) {
                    console.log('Invalid connection attempted:', e.message);
                }
            } finally {
                graph.getModel().endUpdate();
            }
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：创建一个`mxGraph`实例，并将其关联到一个 HTML 容器上。
2. **重写**\*\*`isValidConnection`\*\***方法**：在这个重写的方法中，检查源节点的 ID 是否为`'node1'`且目标节点的 ID 是否为`'node2'`，如果是，则返回`false`表示连接不合法；否则返回`true`表示连接合法。
3. **插入节点和边**：插入三个节点，并尝试创建一个合法连接和一个非法连接。当尝试创建非法连接时，`mxGraph`会抛出异常，通过捕获该异常可以得知连接不合法。

### 常见应用场景

- **业务规则限制**：在流程图、组织结构图等场景中，根据业务规则限制某些节点之间的连接。例如，在审批流程中，某个审批节点不能直接连接到最终批准节点，需要经过中间的审核节点。
- **数据模型约束**：在数据关系图中，根据数据模型的约束限制节点之间的连接。例如，在数据库表关系图中，外键约束可能限制某些表之间的连接方向。
- **图形布局优化**：为了使图形布局更加合理，限制某些节点之间的连接，避免出现交叉或混乱的情况。

通过重写`mxGraph.prototype.isValidConnection`方法，开发者可以灵活地定义边的连接规则，确保图形的结构符合业务需求和设计要求。
