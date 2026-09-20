# mxConnectionConstraint

## 目录

- [功能概述](#功能概述)
- [构造函数参数](#构造函数参数)
- [使用场景](#使用场景)
- [代码解释](#代码解释)

在`mxGraph`中，`new mxConnectionConstraint`用于创建一个`mxConnectionConstraint`对象，该对象**主要用于定义图形元素（如节点）在连接操作时的约束条件**。下面从功能概述、构造函数参数、使用场景、示例代码以及代码解释等方面详细介绍。

### 功能概述

`mxConnectionConstraint`对象**用于控制边（如连接线）与图形元素（通常是节点）之间的连接方式和位置。它可以规定边只能从图形元素的特定方向（如顶部、左侧）连接到图形元素上，或者只能连接到图形元素的特定位置，从而确保图形的连接具有规范性和逻辑性。**

### 构造函数参数

`mxConnectionConstraint`构造函数接收以下参数：

- **`point`**：类型为`mxPoint`，可选参数。`mxPoin`\*\*`t`\*\***对象表示连接点相对于图形元素边界的位置**。其`x`和`y`值是归一化的坐标，范围从 0 到 1。例如，`(0, 0)`表示图形的左上角，`(1, 1)`表示图形的右下角，`(0.5, 0)`表示图形顶部的中间位置。如果不传入该参数，默认为`null`。
- **`perimeter`**：类型为`boolean`，可选参数。指示连接点是**否位于图形元素的周长**上。如果为`true`，连接点将沿着图形的边界定位；如果为`false`，连接点将位于图形内部。默认值为`true`。
- **`name`**：类型为`string`，可**选参数。为连接约束指定一个名称**，方便后续引用和管理。默认值为`null`。

### 使用场景

- **规范图形连接**：在绘制复杂的流程图、组织结构图等图形时，为了保证图形的规范性和可读性，需要对边与节点的连接方式进行限制。例如，规定在流程图中，边只能从节点的顶部进入，从底部出去，通过`mxConnectionConstraint`可以实现这样的约束。
- **自定义图形交互**：在实现自定义的图形交互逻辑时，可能需要根据不同的图形元素和业务需求，定制连接约束。比如，对于某些特殊形状的节点，只允许从特定的部位进行连接，以满足特定的业务规则。
- **提高用户体验**：合理的连接约束可以引导用户进行正确的操作，减少用户的错误连接，提高用户在绘制和编辑图形时的效率和体验。

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxConnectionConstraint Example</title>
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

                // 设置节点的连接约束
                graph.setConnectableSource(node, [topConstraint]);
                graph.setConnectableTarget(node, [bottomConstraint]);

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
   - `const topConstraint = new mxConnectionConstraint(new mxPoint(0.5, 0), true);`：创建一个连接约束，表示边可以从节点顶部的中间位置连接出去。`new mxPoint(0.5, 0)`确定了连接点的位置，`true`表示连接点位于图形的周长上。
   - `const bottomConstraint = new mxConnectionConstraint(new mxPoint(0.5, 1), true);`：创建一个连接约束，表示边可以连接到节点底部的中间位置。
3. **设置节点的连接约束**：
   - `graph.setConnectableSource(node, [topConstraint]);`：设置节点作为连接源时的约束，即边只能从节点顶部中间位置连接出去。
   - `graph.setConnectableTarget(node, [bottomConstraint]);`：设置节点作为连接目标时的约束，即边只能连接到节点底部中间位置。

通过`new mxConnectionConstraint`创建连接约束对象，并将其应用到图形元素上，可以灵活地控制图形的连接方式，满足不同的业务需求和设计要求。
