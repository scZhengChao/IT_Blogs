# createPreviewShape

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [返回值](#返回值)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`库中，`mxGraphHandler.prototype.createPreviewShape`是一个非常重要的方法，它主要**用于在进行图形元素（如节点、边）的拖动操作时，创建一个用于预览的形状。** 下面从功能概述、参数、返回值、使用场景、示例代码及代码解释等方面详细介绍这个方法。

### 功能概述

当用户在`mxGraph`的图形界面**中拖动一个单元格（节点或边）时，为了给用户提供直观的反馈，通常会显示一个预览形状，** 这个形状会跟随鼠标移动，让用户知道拖动后的大致位置和外观。`mxGraphHandler.prototype.createPreviewShape`方法的作用就是创建这个预览形状对象。

### 参数

该方法通常不接收任何参数。不过，它会依赖`mxGraphHandler`实例内部的一些属性，例如当前正在拖动的单元格、图形的样式信息等，来确定预览形状的具体特征。

### 返回值

此方法返回一个`mxShape`对象，它代表**了拖动操作时显示的预览形状**。`mxShape`是`mxGraph`中用于表示图形形状的基类，不同类型的预览形状（如矩形、椭圆形等）可能是`mxShape`的不同子类实例。

### 使用场景

- **提升用户体验**：在用户拖动图形元素时，实时显示预览形状可以让用户更清晰地看到拖动的效果，从而更准确地定位元素的最终位置，避免不必要的误操作。
- **模拟操作效果**：在进行复杂的布局调整或连接操作时，预览形状可以帮助用户提前看到操作的结果，提高操作的效率和准确性。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxGraphHandler.prototype.createPreviewShape Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            // 重写 createPreviewShape 方法
            mxGraphHandler.prototype.createPreviewShape = function () {
                // 获取当前拖动的单元格
                const cell = this.currentCell;
                if (cell) {
                    // 获取单元格的边界框
                    const bounds = this.graph.getCellBounds(cell);
                    // 创建一个矩形预览形状
                    const shape = new mxRectangleShape(
                        bounds,
                        'lightblue',  // 填充颜色
                        'black',      // 边框颜色
                        1             // 边框宽度
                    );
                    // 设置预览形状的透明度
                    shape.opacity = 50;
                    return shape;
                }
                return null;
            };

            graph.getModel().beginUpdate();
            try {
                const parent = graph.getDefaultParent();
                // 插入一个顶点
                const vertex = graph.insertVertex(parent, null, 'Draggable Node', 20, 20, 100, 50);
            } finally {
                graph.getModel().endUpdate();
            }
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：创建一个`mxGraph`实例，并将其关联到 HTML 页面中的一个容器元素上。
2. **重写**\*\*`createPreviewShape`\*\***方法**：通过修改`mxGraphHandler.prototype.createPreviewShape`来定制预览形状的创建逻辑。
   - 首先获取当前正在拖动的单元格`cell`。
   - 然后使用`graph.getCellBounds`方法获取该单元格的边界框`bounds`。
   - 接着创建一个`mxRectangleShape`对象作为预览形状，设置其填充颜色为`lightblue`，边框颜色为`black`，边框宽度为`1`。
   - 最后设置预览形状的透明度为`50`，并返回该形状对象。
3. **插入顶点**：在图形中插入一个顶点，当用户拖动这个顶点时，就会使用我们重写的`createPreviewShape`方法创建预览形状。

通过重写`mxGraphHandler.prototype.createPreviewShape`方法，开发者可以根据需求定制拖动操作时的预览形状，增强用户的交互体验。
