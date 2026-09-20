# setMoveEnabled

## 目录

- [方法功能](#方法功能)
- [使用场景](#使用场景)
- [代码示例](#代码示例)
- [代码解释](#代码解释)
- [注意事项](#注意事项)

`mxGraphHandler.setMoveEnabled`是 mxGraph 库中的一个重要方法，其**主要作用是控制图形元素的移动功能是否可用**。下面将从方法功能、使用场景、代码示例和注意事项几个方面详细介绍。

### 方法功能

`mxGraphHandler`类在 mxGraph 里主要**负责处理用户与图形元素的交互操作，像选择、移动、调整大小**等。`setMoveEnabled`方法**可以动态地开启或者关闭图形元素的移动功能**。当移动功能开启时，用户能够通过鼠标拖动图形元素到新的位置；而当移动功能关闭时，用户无法拖动图形元素。

### 使用场景

- **数据展示阶段限制操作**：在数据展示或者演示阶段，为避免用户误操作移动图形元素，破坏布局，你可以暂时关闭移动功能。
- **特定状态下的交互控制**：根据业务需求，在某些特定状态下（如元素处于锁定状态），需要限制元素移动，就可以利用该方法禁用移动功能。

### 代码示例

下面是一个简单的 HTML 示例，展示了如何使用`mxGraphHandler.setMoveEnabled`方法：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxGraphHandler.setMoveEnabled Example</title>
    <!-- 引入 mxGraph 库 -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer"></div>
    <button id="enableMoveButton">启用移动</button>
    <button id="disableMoveButton">禁用移动</button>
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
        var enableMoveButton = document.getElementById('enableMoveButton');
        var disableMoveButton = document.getElementById('disableMoveButton');

        // 点击启用移动按钮时的事件处理函数
        enableMoveButton.addEventListener('click', function () {
            graphHandler.setMoveEnabled(true);
        });

        // 点击禁用移动按钮时的事件处理函数
        disableMoveButton.addEventListener('click', function () {
            graphHandler.setMoveEnabled(false);
        });
    </script>
</body>

</html>
```


### 代码解释

1. **引入 mxGraph 库**：借助`<script>`标签引入 mxGraph 库。
2. **创建 mxGraph 实例**：使用`mxGraph`构造函数创建图形对象，并将其绑定到指定的容器元素上。
3. **插入图形元素**：运用`insertVertex`方法在图中插入一个顶点。
4. **获取图形处理程序**：通过`graph.getGraphHandler()`方法获取`mxGraphHandler`实例。
5. **添加按钮事件处理函数**：为 “启用移动” 和 “禁用移动” 按钮添加点击事件处理函数，分别调用`graphHandler.setMoveEnabled(true)`和`graphHandler.setMoveEnabled(false)`来开启或关闭移动功能。

### 注意事项

- **影响范围**：`setMoveEnabled`方法会对整个图形的移动功能产生影响，而非特定的图形元素。若只想禁用某些特定元素的移动功能，可考虑采用自定义的事件处理逻辑。
- **与其他交互功能的关系**：禁用移动功能不会影响其他交互功能（如选择、调整大小等），若需同时禁用其他交互功能，可考虑使用`mxGraph.setEnabled`方法。
