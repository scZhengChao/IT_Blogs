# `getCellBounds`

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [返回值](#返回值)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`库中，`getCellBounds`是一个重要的方法，主要用于获取指定单元格（`cell`）的边界框信息。下面从功能概述、参数、返回值、使用场景、示例代码等方面详细介绍该方法。

### 功能概述

`getCellBounds`方法的核心功能是计算并返回指定单元格在图形中的边界框。边界框是一个矩形区域，它能够完全包围单元格所代表的图形元素，通过边界框可以确定单元格的位置和大小。

### 参数

该方法通常接收一个参数：

- **`cell`**：类型为`mxCell`，表示要获取边界框的单元格对象。这个单元格可以是节点（`vertex`）、边（`edge`）或者其他类型的图形元素。

### 返回值

方法返回一个`mxRectangle`对象，该对象包含以下属性：

- \*\*`x`****：边界框左上角的****`x`\*\***坐标。**
- \*\*`y`****：边界框左上角的****`y`\*\***坐标。**
- **`width`：边界框的宽度。**
- **`height`：边界框的高度。**

### 使用场景

- **图形布局**：在进行图形布局时，需要知道每个单元格的位置和大小，以便合理安排它们的相对位置。通过`getCellBounds`方法可以获取这些信息，从而实现精确的布局。
- **碰撞检测**：在某些情况下，需要判断两个单元格是否发生重叠，这就需要比较它们的边界框。通过`getCellBounds`方法获取单元格的边界框，然后进行比较。
- **动画效果**：在实现图形的动画效果时，可能需要根据单元格的位置和大小来确定动画的起始和结束位置。`getCellBounds`方法可以提供这些必要的信息。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>getCellBounds Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            // 获取图形模型
            const model = graph.getModel();

            // 开始更新模型
            model.beginUpdate();
            try {
                // 获取默认父级
                const parent = graph.getDefaultParent();

                // 创建一个节点
                const vertex = graph.insertVertex(parent, null, 'Node', 20, 20, 80, 30);

                // 获取节点的边界框
                const bounds = graph.getCellBounds(vertex);

                // 打印边界框信息
                console.log(`边界框位置: (${bounds.x}, ${bounds.y})`);
                console.log(`边界框大小: 宽 ${bounds.width}, 高 ${bounds.height}`);

            } finally {
                // 结束更新模型
                model.endUpdate();
            }
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建图形和模型对象**：创建`mxGraph`实例并关联到 HTML 容器，通过`graph.getModel()`获取图形模型。
2. **创建节点**：在模型更新的事务块内，使用`graph.insertVertex`方法创建一个节点。
3. **获取节点的边界框**：调用`graph.getCellBounds(vertex)`方法获取节点的边界框信息。
4. **打印边界框信息**：将边界框的位置和大小信息打印到控制台。
5. **结束模型更新**：使用`model.endUpdate()`结束模型更新事务，确保图形界面更新。

通过`getCellBounds`方法，可以方便地获取单元格的边界框信息，为图形的布局、碰撞检测和动画效果等操作提供基础。
