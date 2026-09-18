# shape

## 目录

- [用途](#用途)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`里，`mxCellState`代表着单元格（`mxCell`）在视图中的状态，其中包含了**单元格的位置、大小、样式等信息。**`mxCellState.shape`是用来渲染单元格的形状对象，而`mxCellState.shape.node`则是该形状对象对应的 DOM 节点。`mxCellState.shape.node.firstChild`指的是这个 DOM 节点的第一个子节点。下面详细介绍它的用途、使用场景和示例代码。

### 用途

`mxCellState.shape.node.firstChild`能够让你直接访问渲染单元格的 DOM 结构里的第一个子节点。借助操作这个子节点，你可以对单元格的外观和行为进行更细致的控制。例如，你可以修改子节点的样式、内容或者添加事件监听器。

### 使用场景

- **自定义样式**：当你想要对单元格的某个特定部分应用自定义样式时，可以通过操作第一个子节点来实现。
- **动态内容更新**：若需要动态更新单元格内的内容，可直接修改第一个子节点的文本或者子元素。
- **交互处理**：在处理单元格的交互事件时，能够为第一个子节点添加事件监听器，以实现特定的交互效果。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxCellState Shape Node First Child Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
    <style>
        #graphContainer {
            width: 600px;
            height: 400px;
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <div id="graphContainer"></div>
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

                // 强制刷新视图以确保状态对象更新
                graph.view.validate();

                // 获取节点的状态
                const state = graph.view.getState(vertex);

                if (state && state.shape && state.shape.node) {
                    // 获取第一个子节点
                    const firstChild = state.shape.node.firstChild;

                    if (firstChild) {
                        // 修改第一个子节点的样式
                        firstChild.style.color = 'red';
                        firstChild.style.fontWeight = 'bold';

                        // 添加事件监听器
                        firstChild.addEventListener('click', function () {
                            console.log('点击了节点的第一个子节点');
                        });
                    }
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
2. **创建节点**：在模型更新的事务块内，使用`graph.insertVertex`方法创建一个节点。
3. **强制刷新视图**：调用`graph.view.validate()`方法强制刷新视图，保证状态对象得到更新。
4. **获取节点的状态**：使用`graph.view.getState(vertex)`方法获取节点的状态对象。
5. **获取第一个子节点**：检查状态对象、形状对象和 DOM 节点是否存在，若存在则获取第一个子节点。
6. **修改样式和添加事件监听器**：对第一个子节点的样式进行修改，并添加点击事件监听器。
7. **结束模型更新**：使用`model.endUpdate()`结束模型更新事务，确保图形界面更新。

通过`mxCellState.shape.node.firstChild`，你可以直接操作单元格渲染后的 DOM 结构，从而实现更灵活的样式和交互效果。
