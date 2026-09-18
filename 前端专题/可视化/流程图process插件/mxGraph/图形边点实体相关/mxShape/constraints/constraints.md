# `constraints`

## 目录

- [功能概述](#功能概述)
- [属性含义](#属性含义)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`中，`mxShape.prototype.constraints`与图形**元素的连接约束相关**。下面从功能概述、属性含义、使用场景、示例代码以及代码解释几个方面详细介绍。

### 功能概述

`mxShape`是`mxGraph`中用于表示图形形状的基类，`mxShape.prototype.constraints`是该原型上的一个属性，**它主要用于定义图形形状在连接操作时的约束条件。连接约束可以控制边（如连接线）与图形形状（如节点）之间的连接方式和位置，** 例如规定边只能从图形的特定方向（如顶部、左侧）连接到图形上，或者只能连接到图形的特定位置。

### 属性含义

`constraints`**属性是一个数组，数组中的每个元素是一个**\*\*`mxConnectionConstraint`****对象。****`mxConnectionConstraint`\*\***对象包含了以下主要信息：**

- **`point`**：类型为`mxPoint`，表示连接**点相对于图形形状边界的位置**。`mxPoint`的`x`和`y`值是归一化的坐标，范围从 0 到 1，例如`(0, 0)`表示图形的左上角，`(1, 1)`表示图形的右下角。
- **`perimeter`**：类型为`boolean`，指示**连接点是否位于图形的周长上。如果为`true`****，连接点将沿着图形的边界定位；如果为****`false`，连接点将位于图形内部。**

### 使用场景

- **规范图形连接**：在绘制复杂的流程图、组织结构图等图形时，为了保证图形的规范性和可读性，需要对边与节点的连接方式进行限制。通过设置`constraints`属性，可以确保边只能从特定的方向或位置连接到节点上，使图形更加整齐和易于理解。
- **自定义图形交互**：在实现自定义的图形交互逻辑时，可能需要根据不同的图形形状和业务需求，定制连接约束。例如，对于某些特殊形状的节点，只允许从特定的部位进行连接，以满足特定的业务规则。
- **提高用户体验**：合理的连接约束可以引导用户进行正确的操作，减少用户的错误连接，提高用户在绘制和编辑图形时的效率和体验。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxShape Constraints Example</title>
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

                // 设置节点形状的连接约束
                const shape = graph.getView().getState(node).shape;
                shape.constraints = [topConstraint, bottomConstraint];

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
2. **创建连接约束**：创建了两个`mxConnectionConstraint`对象，分别表示节点顶部中间和底部中间的连接点。`new mxPoint(0.5, 0)`表示顶部中间位置，`new mxPoint(0.5, 1)`表示底部中间位置，`true`表示连接点位于图形的周长上。
3. **设置节点形状的连接约束**：通过`graph.getView().getState(node).shape`获取节点的形状对象，然后将创建的连接约束数组赋值给`shape.constraints`属性。这样，边就只能从节点的顶部中间和底部中间位置进行连接。

通过设置`mxShape.prototype.constraints`属性，可以灵活地控制图形形状的连接约束，满足不同的图形绘制和交互需求。
