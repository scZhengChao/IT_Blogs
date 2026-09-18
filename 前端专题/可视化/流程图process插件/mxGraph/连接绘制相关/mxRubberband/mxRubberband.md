# mxRubberband

## 目录

- [用途](#用途)
- [工作原理](#工作原理)
- [使用示例](#使用示例)
- [代码解释](#代码解释)

`mxRubberband`是 mxGraph 库中的一个类，主要用于在图形界面中实现橡皮筋选择（Rubber Band Selection）功能。下面详细介绍其用途、工作原理及使用示例。

### 用途

- **多选操作**：在图形编辑场景里，用户常常需要一次性选中多个图形元素。`mxRubberband`类允许用户通过鼠标拖动绘制一个矩形框，处于这个矩形框内的所有图形元素都会被选中，从而方便用户对这些元素进行统一操作，比如移动、删除、修改样式等。
- **提升用户体验**：橡皮筋选择是一种直观且高效的多选方式，用户只需拖动鼠标就能快速选中多个元素，避免了逐个点击元素的繁琐操作，大大提升了操作效率和用户体验。

### 工作原理

当用户按下鼠标左键并开始拖动时，`mxRubberband`会在鼠标起始位置和当前位置之间绘制一个半透明的矩形框。随着鼠标的移动，矩形框的大小和位置会实时更新。当用户松开鼠标左键时，`mxRubberband`会检查哪些图形元素完全或部分位于这个矩形框内，并将这些元素添加到当前的选中集合中。

### 使用示例

以下是一个简单的 HTML 示例，展示了如何在 mxGraph 中使用`mxRubberband`类：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxRubberband Example</title>
    <!-- 引入 mxGraph 库 -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer"></div>
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
            var vertex1 = graph.insertVertex(parent, null, 'Vertex 1', 20, 20, 80, 30);
            // 插入另一个顶点
            var vertex2 = graph.insertVertex(parent, null, 'Vertex 2', 120, 120, 80, 30);
        } finally {
            // 结束更新图模型
            graph.getModel().endUpdate();
        }

        // 创建并启用橡皮筋选择功能
        new mxRubberband(graph);
    </script>
</body>

</html>
```


### 代码解释

1. **引入 mxGraph 库**：通过`<script>`标签引入 mxGraph 库。
2. **创建 mxGraph 实例**：使用`mxGraph`构造函数创建一个图形对象，并将其绑定到指定的容器元素上。
3. **插入图形元素**：使用`insertVertex`方法在图中插入两个顶点。
4. **启用橡皮筋选择功能**：创建`mxRubberband`类的实例，并将`graph`对象作为参数传入，这样就启用了橡皮筋选择功能。用户可以在图形界面中按下鼠标左键并拖动，通过绘制矩形框来选择多个图形元素。

通过上述示例，你可以看到`mxRubberband`类为 mxGraph 提供了便捷的多选操作方式，提升了用户与图形交互的效率。
