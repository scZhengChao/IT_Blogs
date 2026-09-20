# graph.view\.getState

## 目录

- [方法作用](#方法作用)
- [方法参数](#方法参数)
- [方法返回值](#方法返回值)
- [使用示例](#使用示例)
- [代码解释](#代码解释)
- [应用场景](#应用场景)

在`mxGraph`库中，`graph.view.getState`是一个**用于获取单元格（****`mxCell`****）在图形视图中的状态**（`mxCellState`）的重要方法。下面从方法的作用、参数、返回值、使用示例以及应用场景几个方面进行详细介绍。

### 方法作用

在`mxGraph`里，`mxCell`代表图形中的**一个元素，如节点、边**等，而`mxCellState`则描述了**这个单元格在当前视图中的具体状态，包含了单元格的位置、大小、样式以及与之关联的视觉信息**等。`graph.view.getState`方法就是用来**获取指定单元格对应的状态对象，借助这个状态对象，开发者能够获取和操作单元格在视图中的各种属性。**

### 方法参数

该方法接收一个参数：

- **`cell`**：这是一个`mxCell`类型的对象，表示要获取状态的目标单元格。可以是通过`graph.insertVertex`、`graph.insertEdge`等方法创建的单元格，或者是从图形模型中获取的单元格。

### 方法返回值

如果指定的单元格在当前视图中有对应的状态信息，`graph.view.getState`方法会返回一个`mxCellState`对象。这个对象包含了以下一些重要的属性：

- \*\*`cell`****：指向对应的****`mxCell`\*\***对象。**
- **`x`****和****`y`：单元格在视图中的左上角坐标。**
- **`width`****和****`height`：单元格的宽度和高度。**
- **`style`：应用于该单元格的样式对象。**

如果指定的单元格没有对应的状态信息（例如单元格不在当前视图范围内），则返回`null`。

### 使用示例

以下是一个简单的示例，展示了如何使用`graph.view.getState`方法获取单元格的状态信息：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxGraph graph.view.getState Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            // 获取图形容器
            const container = document.getElementById('graphContainer');
            // 创建 mxGraph 实例
            const graph = new mxGraph(container);

            // 开始更新图形模型
            graph.getModel().beginUpdate();
            try {
                // 获取默认父级单元格
                const parent = graph.getDefaultParent();
                // 插入一个顶点
                const vertex = graph.insertVertex(parent, null, 'Node 1', 20, 20, 80, 30);

                // 获取该顶点的状态
                const vertexState = graph.view.getState(vertex);
                if (vertexState) {
                    console.log('Vertex state:');
                    console.log('  X:', vertexState.x);
                    console.log('  Y:', vertexState.y);
                    console.log('  Width:', vertexState.width);
                    console.log('  Height:', vertexState.height);
                    console.log('  Style:', vertexState.style);
                } else {
                    console.log('Vertex state not found.');
                }
            } finally {
                // 结束更新图形模型
                graph.getModel().endUpdate();
            }
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例并插入顶点**：首先创建一个`mxGraph`实例，并将其关联到一个 HTML 容器上。然后在图形中插入一个顶点。
2. **获取顶点的状态**：使用`graph.view.getState`方法，传入顶点对象，获取该顶点的状态对象。
3. **输出状态信息**：如果成功获取到状态对象，则输出该顶点的坐标、宽度、高度和样式等信息；否则，输出提示信息。

### 应用场景

- **图形布局计算**：在进行图形布局调整时，通过获取单元格的状态信息，可以精确计算单元格的位置和大小，从而实现合理的布局。
- **交互处理**：在处理鼠标事件、拖动操作等交互时，需要根据单元格的状态信息来判断鼠标是否在单元格范围内，或者更新单元格的位置和样式。
- **样式应用**：根据单元格的状态信息，可以动态地应用不同的样式，例如根据单元格的位置或属性改变其颜色、边框等样式。

通过`graph.view.getState`方法，开发者可以方便地获取和操作单元格在视图中的状态信息，为实现复杂的图形交互和布局功能提供了有力支持。
