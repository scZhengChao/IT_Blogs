# getChildCount

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [返回值](#返回值)
- [使用场景](#使用场景)
- [示例代码](#示例代码)

在`mxGraph`库中，`model.getChildCount`是`mxGraphModel`类的一个方法，**主要用于获取指定父单元格（cell）下的子单元格数量**。下面从功能、参数、返回值、使用场景、示例代码等方面详细介绍这个方法。

### 功能概述

`model.getChildCount`方法的核心功能是统计指定父单元格的直接子单元格数量。在`mxGraph`的图形数据模型里，图形元素（如节点、边等）都以单元格的形式存在，并且这些单元格可以组织成树状结构，每个单元格可以有零个或多个子单元格。通过这个方法，你可以了解某个父单元格下有多少个直接子元素，这在进行图形布局、数据遍历等操作时非常有用。

### 参数

该方法通常接收一个参数：

- **`parent`**：类型为`mxCell`，表示要统计**子单元格数量的父单元格。这个父单元格可以是一个节点、一个分组或者其他类型的单元格，只要它可以包含子单元格即可。**

### 返回值

方法返回一个整数，表示指定父单元格下的直接子单元格数量。如果父单元格没有子单元格，则返回 0。

### 使用场景

- **图形布局**：在进行图形布局时，可能需要根据父单元格的子单元格数量来确定布局方式，例如平均分配空间、调整间距等。
- **数据遍历**：在遍历图形数据模型时，需要知道每个父单元格有多少子单元格，以便正确地遍历整个树状结构。
- **动态更新**：当图形发生动态变化，如添加或删除子单元格时，可以使用该方法来实时获取子单元格数量，从而更新相关的界面或数据。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>model.getChildCount Example</title>
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

                // 在父级下插入两个子节点
                const vertex1 = graph.insertVertex(parent, null, 'Vertex 1', 20, 20, 80, 30);
                const vertex2 = graph.insertVertex(parent, null, 'Vertex 2', 200, 200, 80, 30);

                // 获取父级的子单元格数量
                const childCount = model.getChildCount(parent);
                console.log('父级的子单元格数量:', childCount);

            } finally {
                // 结束更新模型
                model.endUpdate();
            }
        }
    </script>
</body>

</html>
```
