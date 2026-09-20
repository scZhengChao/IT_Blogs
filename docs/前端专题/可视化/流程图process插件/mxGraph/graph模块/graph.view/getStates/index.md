# getStates

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [返回值](#返回值)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`中，`graph.view.getStates`方法是一个非常实用的方法，它主要**用于获取当前视图中所有单元格**（`cell`）的状态对象（`mxCellState`）集合。下面从**功能概述、参数、返回值、使用场景、示例代码等方面详细介绍该方法。**

### 功能概述

`graph.view.getStates`方法的核心功能是返回一个**包含当前视图中所有单元格状态对象的集合**。单元格状态对象`mxCellState`包含了单元格在**视图中的各种信息，如位置、大小、样式等，这些信息对于图形的渲染、布局和交互非常重要**。通过获取这些状态对象，你可以对图形的显示和行为进行更细致的控制和分析。

### 参数

该方法通常不接收任何参数。

### 返回值

方法返回一个对象，该对象的属性是单元格的 ID，值是对应的`mxCellState`对象。可以通过遍历这个对象来访问每个单元格的状态信息。

### 使用场景

- **图形布局分析**：在进行图形布局优化时，需要了解每个单元格在视图中的位置和大小，以便合理调整它们的相对位置。通过`getStates`方法可以获取这些信息，从而实现更精确的布局。
- **交互处理**：在处理图形的交互事件（如鼠标点击、拖动等）时，可能需要根据单元格的状态信息来判断事件的目标和处理逻辑。例如，判断鼠标点击的位置是否在某个单元格内。
- **动画效果实现**：在实现图形的动画效果时，需要知道每个单元格的初始状态和目标状态，通过`getStates`方法可以获取初始状态信息，为动画的计算和执行提供基础。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>graph.view.getStates Example</title>
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

                // 创建两个节点
                const vertex1 = graph.insertVertex(parent, null, 'Vertex 1', 20, 20, 80, 30);
                const vertex2 = graph.insertVertex(parent, null, 'Vertex 2', 200, 200, 80, 30);

                // 创建一条边连接两个节点
                const edge = graph.insertEdge(parent, null, 'Edge', vertex1, vertex2);

                // 获取所有单元格的状态
                const states = graph.view.getStates();

                // 遍历状态对象
                for (const cellId in states) {
                    const state = states[cellId];
                    const cell = state.cell;
                    const x = state.x;
                    const y = state.y;
                    const width = state.width;
                    const height = state.height;

                    console.log(`单元格 ID: ${cellId}`);
                    console.log(`单元格标签: ${cell.value}`);
                    console.log(`位置: (${x}, ${y})`);
                    console.log(`大小: 宽 ${width}, 高 ${height}`);
                    console.log('----------------------');
                }

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
2. **创建节点和边**：在模型更新的事务块内，使用`graph.insertVertex`方法创建两个节点，再使用`graph.insertEdge`方法创建一条边连接这两个节点。
3. **获取所有单元格的状态**：调用`graph.view.getStates()`方法获取当前视图中所有单元格的状态对象集合。
4. **遍历状态对象**：使用`for...in`循环遍历状态对象，获取每个单元格的 ID、标签、位置和大小信息，并将这些信息打印到控制台。
5. **结束模型更新**：使用`model.endUpdate()`结束模型更新事务，确保图形界面更新。

通过`graph.view.getStates`方法，你可以方便地获取当前视图中所有单元格的状态信息，为图形的布局、交互和动画效果等操作提供支持。
