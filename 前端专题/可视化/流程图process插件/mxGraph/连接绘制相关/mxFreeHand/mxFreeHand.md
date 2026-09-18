# mxFreeHand

## 目录

- [具体用途](#具体用途)
- [工作原理](#工作原理)
- [使用场景](#使用场景)
- [代码示例](#代码示例)
- [代码解释](#代码解释)

`mxFreeHand`类是 mxGraph 库中的一部分，它主要用于实现自由手绘功能。以下从具体用途、工作原理、使用场景、代码示例几个方面详细介绍：

### 具体用途

- **自由绘图**：允许用户在 mxGraph 中以自由手绘的方式绘制图形。用户可以像使用画笔一样，通过鼠标或触摸设备在画布上自由绘制线条、形状等，为图形编辑和设计提供了更加灵活的方式。
- **增强交互性**：丰富了用户与图形界面的交互方式，适用于需要用户自由表达创意、进行草图绘制或标注的场景。

### 工作原理

`mxFreeHand`类会监听鼠标或触摸事件（如鼠标按下、移动、释放），当用户按下鼠标或触摸屏幕开始绘制时，它会记录下起始点；在鼠标或手指移动过程中，持续记录路径上的点，并根据这些点动态绘制线条；当用户释放鼠标或手指时，完成一次自由手绘操作，绘制的线条会作为一个图形元素添加到 mxGraph 中。

### 使用场景

- **创意设计**：在一些需要用户自由发挥创意的设计工具中，如流程图设计、原型设计等，用户可以使用自由手绘功能快速勾勒出大致的图形和思路。
- **标注和注释**：在查看和分析图形时，用户可以使用自由手绘功能对特定区域进行标注、注释或标记重点。
- **教学和演示**：在教学或演示场景中，教师或演讲者可以使用自由手绘功能在图形上进行实时标注和讲解，增强教学效果。

### 代码示例

以下是一个简单的 HTML 示例，展示了如何在 mxGraph 中使用`mxFreeHand`类实现自由手绘功能：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxFreeHand Example</title>
    <!-- 引入 mxGraph 库 -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer"></div>
    <button id="enableFreeHandButton">启用自由手绘</button>
    <button id="disableFreeHandButton">禁用自由手绘</button>
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
            // 插入一个示例顶点
            var vertex = graph.insertVertex(parent, null, 'Example Vertex', 20, 20, 80, 30);
        } finally {
            // 结束更新图模型
            graph.getModel().endUpdate();
        }

        // 创建 mxFreeHand 实例
        var freeHand = new mxFreeHand(graph);

        // 获取按钮元素
        var enableFreeHandButton = document.getElementById('enableFreeHandButton');
        var disableFreeHandButton = document.getElementById('disableFreeHandButton');

        // 点击启用自由手绘按钮时的事件处理函数
        enableFreeHandButton.addEventListener('click', function () {
            freeHand.setEnabled(true);
        });

        // 点击禁用自由手绘按钮时的事件处理函数
        disableFreeHandButton.addEventListener('click', function () {
            freeHand.setEnabled(false);
        });
    </script>
</body>

</html>
```


### 代码解释

1. **引入 mxGraph 库**：通过`<script>`标签引入 mxGraph 库。
2. **创建 mxGraph 实例**：使用`mxGraph`构造函数创建一个图形对象，并将其绑定到指定的容器元素上。
3. **插入示例图形元素**：使用`insertVertex`方法在图中插入一个示例顶点。
4. **创建**\*\*`mxFreeHand`\*\***实例**：创建`mxFreeHand`类的实例，并将`graph`对象作为参数传入。
5. **添加按钮事件处理函数**：为 “启用自由手绘” 和 “禁用自由手绘” 按钮添加点击事件处理函数，分别调用`freeHand.setEnabled(true)`和`freeHand.setEnabled(false)`来启用或禁用自由手绘功能。

通过上述示例，你可以在 mxGraph 中实现自由手绘功能，让用户能够自由地在图形界面上绘制线条和形状。
