# graph.addMouseListener

## 目录

- [方法作用](#方法作用)
- [方法参数](#方法参数)
- [使用示例](#使用示例)
- [代码解释](#代码解释)
- [常见应用场景](#常见应用场景)

在`mxGraph`中，`graph.addMouseListener`是一个非常重要的方法，用于为**图形添加鼠标事件监听器，从而实现与用户鼠标交互相关的功能**。下面从方法作用、参数、使用示例、常见应用场景几个方面详细介绍该方法。

### 方法作用

`graph.addMouseListener`方法允许开发者捕获用户在`mxGraph`图形区域内的**鼠标操作，如鼠标按下、鼠标移动、鼠标释放**等事件，并针对这些事件执行相应的自定义逻辑。通过监听鼠标事件，开发者可以实现诸如节点选择、拖动、绘制图形等交互功能。

### 方法参数

`graph.addMouseListener`方法接收一个包含三个回调函数的对象作为参数，这三个回调函数分别对应鼠标的不同操作：

- **`mouseDown`**：当鼠标在图形区域内按下时触发该回调函数。它接收三个参数：
  - **`sender`**：**触发事件的对象，通常是**\*\*`mxGraph`\*\***实例本身。**
  - **`evt`**：事件对象，**包含了鼠标事件的详细信息，如鼠标位置、按下的按键等。**
- **`mouseMove`**：当鼠标在图形区域内移动时触发该回调函数。其参数与`mouseDown`相同。
- **`mouseUp`**：当鼠标在图形区域内释放时触发该回调函数。参数同样与`mouseDown`一致。

### 使用示例

以下是一个简单的示例，展示了如何使用`graph.addMouseListener`方法来实现鼠标点击节点并输出节点信息的功能：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxGraph addMouseListener Example</title>
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
            } finally {
                // 结束更新图形模型
                graph.getModel().endUpdate();
            }

            // 添加鼠标事件监听器
            graph.addMouseListener({
                mouseDown: function (sender, evt) {
                    const cell = graph.getCellAt(evt.getGraphX(), evt.getGraphY());
                    if (cell) {
                        console.log('Mouse down on cell:', cell.value);
                    }
                },
                mouseMove: function (sender, evt) {
                    // 可在此添加鼠标移动时的逻辑
                },
                mouseUp: function (sender, evt) {
                    // 可在此添加鼠标释放时的逻辑
                }
            });
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例并插入顶点**：首先创建一个`mxGraph`实例，并将其关联到一个 HTML 容器上。然后在图形中插入一个顶点。
2. **添加鼠标事件监听器**：使用`graph.addMouseListener`方法添加一个鼠标事件监听器，该监听器包含三个回调函数。
3. \*\*`mouseDown`\*\***回调函数**：在`mouseDown`回调函数中，通过`graph.getCellAt`方法获取鼠标点击位置的单元格。如果存在单元格，则输出该单元格的值。
4. \*\*`mouseMove`****和****`mouseUp`\*\***回调函数**：这两个回调函数目前为空，你可以根据需要在其中添加鼠标移动和鼠标释放时的逻辑。

### 常见应用场景

- **节点选择**：通过监听鼠标点击事件，实现节点的选择和取消选择功能。
- **节点拖动**：监听鼠标按下、移动和释放事件，实现节点的拖动操作。
- **图形绘制**：根据鼠标的移动和点击事件，在图形区域内绘制新的图形元素。

通过`graph.addMouseListener`方法，开发者可以灵活地处理用户的鼠标交互，为`mxGraph`应用添加丰富的交互功能。
