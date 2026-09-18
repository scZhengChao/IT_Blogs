# setConnectableSource

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`中，`graph.setConnectableSource`是一个**用于设置图形元素（通常是节点）作为连接源的约束条件**的方法。下面从功能概述、参数、使用场景、示例代码以及代码解释等方面详细介绍该方法。

### 功能概述

在`mxGraph`里，连接操作**涉及到连接源（即边开始的节点）和连接目标（即边结束的节点**）。`graph.setConnectableSource`方法的主要作用是定义某个单元格（通常是节点）作为连接源时的规则，也就是控制从该节点可以向哪些方向、以何种方式引出边。通过设置连接源约束，可以规范图形的连接方式，使图形更加整齐和符合业务逻辑。

### 参数

该方法接收两个参数：

- **`cell`**：类型为`mxCell`，**表示要设置连接源约束的单元格，通常是一个节点。这个单元格就是边可以从其引出的起始节点。**
- **`constraints`**：类型为`Array<mxConnectionConstraint>`或`null`。它是一个包含`mxConnectionConstraint`对象的数组，每个`mxConnectionConstraint`对象定义了一个连接约束条件，如连接点的位置、是否在周长上等。如果传入`null`，则表示移除该节点的连接源约束，即允许从该节点的任意位置引出边。

### 使用场景

- **规范图形布局**：在绘制复杂的流程图、组织结构图等图形时，为了保证图形的规范性和可读性，需要对边的引出方向和位置进行限制。例如，规定在流程图中，节点只能从顶部或底部引出边，使用`graph.setConnectableSource`可以实现这样的约束。
- **业务逻辑约束**：根据业务需求，某些节点可能只能向特定类型的节点引出边。通过设置连接源约束，可以确保图形的连接符合业务逻辑。比如，在一个审批流程中，只有审批通过的节点才能向下一个审批节点引出边。
- **提高用户体验**：合理的连接源约束可以引导用户进行正确的操作，减少用户的错误连接，提高用户在绘制和编辑图形时的效率和体验。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>setConnectableSource Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            graph.getModel().beginUpdate();
            try {
                const parent = graph.getDefaultParent();
                const node = graph.insertVertex(parent, null, 'Node', 20, 20, 80, 30);

                // 创建连接约束
                const topConstraint = new mxConnectionConstraint(new mxPoint(0.5, 0), true);
                const bottomConstraint = new mxConnectionConstraint(new mxPoint(0.5, 1), true);

                // 设置节点的连接源约束
                graph.setConnectableSource(node, [topConstraint, bottomConstraint]);

            } finally {
                graph.getModel().endUpdate();
            }
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例并插入节点**：创建一个`mxGraph`实例并关联到 HTML 容器上，然后插入一个节点。
2. **创建连接约束**：
   - `const topConstraint = new mxConnectionConstraint(new mxPoint(0.5, 0), true);`：创建一个连接约束，表示边可以从节点顶部的中间位置引出。`new mxPoint(0.5, 0)`确定了连接点的位置，`true`表示连接点位于图形的周长上。
   - `const bottomConstraint = new mxConnectionConstraint(new mxPoint(0.5, 1), true);`：创建一个连接约束，表示边可以从节点底部的中间位置引出。
3. **设置节点的连接源约束**：
   - `graph.setConnectableSource(node, [topConstraint, bottomConstraint]);`：将创建的连接约束数组应用到节点上，设置该节点作为连接源时的约束条件，即边只能从节点的顶部中间或底部中间位置引出。

通过`graph.setConnectableSource`方法，可以灵活地控制图形元素作为连接源时的连接规则，满足不同的业务需求和设计要求。
