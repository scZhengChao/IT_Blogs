# scrollRectToVisible

## 目录

- [功能概述](#功能概述)
- [使用场景](#使用场景)
- [方法参数](#方法参数)
- [示例代码](#示例代码)
- [代码解释](#代码解释)
- [注意事项](#注意事项)

`mxGraph.scrollRectToVisible`是 mxGraph 库中的一个方法，用于将**指定的矩形区域滚动到视图中可见的位置**。下面从功能、使用场景、参数、示例代码和注意事项几个方面详细介绍。

### 功能概述

在 mxGraph 里，当图形的尺寸超出了容器的可视区域时，用户可能无法直接看到图形的某些部分。`scrollRectToVisible`方法可以**帮助自动调整图形的滚动位置，使得指定的矩形区域能够完整或部分地显示在容器的可视范围内。**

### 使用场景

- **聚焦特定区域**：当你需要用户关注图形中的某个特定部分时，比如在大型流程图中定位到某个关键节点及其周边的连接关系，可以使用该方法将包含这些元素的矩形区域滚动到可见位置。
- **操作后自动定位**：在进行一些操作（如点击某个按钮显示特定子图）后，自动将相关的图形区域滚动到可视范围，提升用户体验。

### 方法参数

`scrollRectToVisible`方法通常接受一个`mxRectangle`对象作为参数，`mxRectangle`是 mxGraph 中表示矩形区域的类，包含四个属性：

- `x`：矩形左上角的 x 坐标。
- `y`：矩形左上角的 y 坐标。
- `width`：矩形的宽度。
- `height`：矩形的高度。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxGraph scrollRectToVisible Example</title>
    <!-- 引入 mxGraph 库 -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 400px; height: 300px; border: 1px solid #ccc; overflow: auto;"></div>
    <button id="scrollButton">滚动到指定区域</button>
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
            // 插入一个较大的顶点
            var vertex = graph.insertVertex(parent, null, 'Large Vertex', 200, 200, 300, 200);
        } finally {
            // 结束更新图模型
            graph.getModel().endUpdate();
        }

        // 获取按钮元素
        var scrollButton = document.getElementById('scrollButton');

        // 点击按钮时的事件处理函数
        scrollButton.addEventListener('click', function () {
            // 创建一个矩形区域
            var rect = new mxRectangle(250, 250, 100, 100);

            // 调用 scrollRectToVisible 方法
            graph.scrollRectToVisible(rect);
        });
    </script>
</body>

</html>
```


### 代码解释

1. **引入 mxGraph 库**：通过`<script>`标签引入 mxGraph 库。
2. **创建 mxGraph 实例**：使用`mxGraph`构造函数创建一个图形对象，并将其绑定到指定的容器元素上。
3. **插入图形元素**：使用`insertVertex`方法插入一个较大的顶点，确保其部分区域超出容器的可视范围。
4. **添加按钮事件处理函数**：为按钮添加点击事件处理函数，在函数内部创建一个`mxRectangle`对象表示要滚动到可见区域的矩形，然后调用`graph.scrollRectToVisible(rect)`方法将该矩形区域滚动到可视范围。

### 注意事项

- **滚动容器设置**：确保图形容器设置了合适的`overflow`属性（如`overflow: auto`或`overflow: scroll`），这样才能实现滚动效果。
- **坐标和尺寸的准确性**：传入的`mxRectangle`对象的坐标和尺寸要准确反映你想要滚动到的区域，否则可能无法达到预期的效果。
