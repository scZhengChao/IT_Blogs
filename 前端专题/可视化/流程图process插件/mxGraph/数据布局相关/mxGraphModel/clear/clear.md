# clear

## 目录

- [功能概述](#功能概述)
- [方法调用](#方法调用)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`中，`mxGraphModel.clear`是`mxGraphModel`类的一个重要方法，主要用于**清除图模型中的所有单元格（包括节点和边）以及相关的数据**。下面从功能概述、方法调用、使用场景、示例代码以及代码解释等方面详细介绍。

### 功能概述

`mxGraphModel.clear`方法的核心功能是将图**模型中的所有单元格和关联数据全部移除，使图模型恢复到初始的空状态。**这在需要**重置图形、重新绘制图形或者清理旧数据以加载新数据时非常**有用。

### 方法调用

`clear`方法的调用形式如下：

```javascript 
graphModel.clear();
```


其中，`graphModel`是`mxGraphModel`的一个实例，通常可以通过`mxGraph`实例的`getModel`方法获取，即`graph.getModel()`。

### 使用场景

- **重置图形**：当用户需要重置图形界面，清除之前绘制的所有元素，重新开始绘制时，可以调用`clear`方法。
- **数据更新**：在动态更新图形数据时，可能需要先清除旧的图形元素，再根据新的数据重新绘制图形。
- **资源释放**：在某些情况下，为了释放内存资源，需要清除不再使用的图形数据。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxGraphModel.clear Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <button id="clearButton">Clear Graph</button>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            // 获取图形模型
            const graphModel = graph.getModel();

            // 开始更新模型
            graphModel.beginUpdate();
            try {
                const parent = graph.getDefaultParent();
                // 插入一个节点
                const node = graph.insertVertex(parent, null, 'Node', 20, 20, 80, 30);
                // 插入另一个节点
                const anotherNode = graph.insertVertex(parent, null, 'Another Node', 200, 200, 80, 30);
                // 插入一条边
                const edge = graph.insertEdge(parent, null, 'Edge', node, anotherNode);
            } finally {
                // 结束更新模型
                graphModel.endUpdate();
            }

            const clearButton = document.getElementById('clearButton');
            clearButton.addEventListener('click', function () {
                // 开始更新模型
                graphModel.beginUpdate();
                try {
                    // 清除图模型
                    graphModel.clear();
                } finally {
                    // 结束更新模型
                    graphModel.endUpdate();
                }
            });
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例并插入元素**：创建一个`mxGraph`实例并关联到 HTML 容器上，然后插入两个节点和一条边。
2. **获取**\*\*`mxGraphModel`\*\***实例**：通过`graph.getModel()`方法获取当前`mxGraph`实例所使用的`mxGraphModel`对象。
3. **添加清除按钮并绑定事件**：在页面上添加一个按钮，当用户点击该按钮时，调用`graphModel.clear()`方法清除图模型中的所有元素。
4. **更新模型**：在清除操作前后，使用`graphModel.beginUpdate()`和`graphModel.endUpdate()`包裹操作，确保模型的更新操作是原子性的，避免出现不一致的情况。

通过调用`mxGraphModel.clear`方法，可以方便地清除图模型中的所有元素，为后续的操作做好准备。
