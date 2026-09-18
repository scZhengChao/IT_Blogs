# setSelectEnabled

## 目录

- [方法作用](#方法作用)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)
- [注意事项](#注意事项)

`mxGraphHandler.setSelectEnabled`是 mxGraph 库中用于**控制图形元素选择功能是否启用的方法**。下面从方法的作用、使用场景、示例代码以及注意事项几个方面详细介绍。

### 方法作用

`mxGraphHandler`是 mxGraph 中负责处理用户交互操作（如选择、移动、调整大小等）的类。`setSelectEnabled`方法允许你**动态地开启或关闭图形元素的选择功能**。当选择功能启用时，**用户可以通过鼠标点击或使用橡皮筋选择（****`mxRubberband`****）来选中图形元素；当选择功能禁用时，用户无法选中任何图形元素。**

### 使用场景

- **特定操作限制**：在某些情况下，你可能希望限制用户的操作，例如在进行批量数据导入或系统初始化时，为了避免用户误操作选中图形元素，可以暂时禁用选择功能。
- **自定义交互逻辑**：根据业务需求，你可能需要在特定条件下动态地启用或禁用选择功能，以实现自定义的交互逻辑。

### 示例代码

以下是一个简单的 HTML 示例，展示了如何使用`mxGraphHandler.setSelectEnabled`方法：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxGraphHandler.setSelectEnabled Example</title>
    <!-- 引入 mxGraph 库 -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer"></div>
    <button id="enableSelectButton">启用选择</button>
    <button id="disableSelectButton">禁用选择</button>
    <script type="text/javascript">
        // 获取容器元素
        var container = document.getElementById('graphContainer');

        // 创建 mxGraph 实例
        var graph = new mxGraph(container);

        // 获取默认父节点
        var parent = graph.getDefaultParent();

        // 开始更新图模型
        graph.getModel().beginUpdate();
        try {
            // 插入一个顶点
            var vertex = graph.insertVertex(parent, null, 'Vertex', 20, 20, 80, 30);
        } finally {
            // 结束更新图模型
            graph.getModel().endUpdate();
        }

        // 获取图形处理程序
        var graphHandler = graph.getGraphHandler();

        // 获取按钮元素
        var enableSelectButton = document.getElementById('enableSelectButton');
        var disableSelectButton = document.getElementById('disableSelectButton');

        // 点击启用选择按钮时的事件处理函数
        enableSelectButton.addEventListener('click', function () {
            graphHandler.setSelectEnabled(true);
        });

        // 点击禁用选择按钮时的事件处理函数
        disableSelectButton.addEventListener('click', function () {
            graphHandler.setSelectEnabled(false);
        });
    </script>
</body>

</html>
```


### 代码解释

1. **引入 mxGraph 库**：通过`<script>`标签引入 mxGraph 库。
2. **创建 mxGraph 实例**：使用`mxGraph`构造函数创建一个图形对象，并将其绑定到指定的容器元素上。
3. **插入图形元素**：使用`insertVertex`方法在图中插入一个顶点。
4. **获取图形处理程序**：使用`graph.getGraphHandler()`方法获取`mxGraphHandler`实例。
5. **添加按钮事件处理函数**：为 “启用选择” 和 “禁用选择” 按钮添加点击事件处理函数，分别调用`graphHandler.setSelectEnabled(true)`和`graphHandler.setSelectEnabled(false)`来启用或禁用选择功能。

### 注意事项

- **影响范围**：`setSelectEnabled`方法会影响整个图形的选择功能，而不是特定的图形元素。如果你只想禁用某些特定元素的选择功能，可以考虑使用自定义的事件处理逻辑。
- **与其他交互功能的关系**：禁用选择功能不会影响其他交互功能（如移动、调整大小等），如果你需要同时禁用其他交互功能，可以考虑使用`mxGraph.setEnabled`方法。
