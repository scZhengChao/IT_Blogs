# isSplitTarget

## 目录

- [方法功能](#方法功能)
- [方法签名](#方法签名)
- [参数说明](#参数说明)
- [返回值](#返回值)
- [示例代码](#示例代码)

在`mxGraph`库中，`graph.isSplitTarget`是一个用于**判断某个单元格是否可以作为分割目标的**方法。下面从方法功能、参数、返回值、使用示例和应用场景等方面详细介绍。

### 方法功能

在图形编辑场景中，分割操作通常指的是**将一条边分割成两条边，并在分割点处插入一个新的顶点**。`graph.isSplitTarget`方法的主要作用就是判断一个给定的单元格是否适合作为这种分割操作的目标。

### 方法签名

```javascript 
graph.isSplitTarget(cell, edge, source, target);
```


### 参数说明

- **`cell`**：
  - **类型**：`mxCell`。
  - **描述**：必需参数，代表要检查是否可作为分割目标的单元格。通常是一个顶点或者边。
- **`edge`**：
  - **类型**：`mxCell`。
  - **描述**：必需参数，是要进行分割操作的边。
- **`source`**：
  - **类型**：`mxCell`。
  - **描述**：必需参数，是`edge`的源顶点，即边的起始点。
- **`target`**：
  - **类型**：`mxCell`。
  - **描述**：必需参数，是`edge`的目标顶点，即边的结束点。

### 返回值

- **类型**：`Boolean`。
- **描述**：如果`cell`可以作为`edge`的分割目标，则返回`true`；否则返回`false`。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxGraph isSplitTarget Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px;"></div>
    <button id="checkSplitTargetButton">Check Split Target</button>

    <script type="text/javascript">
        mxLoadResources = false;
        mxBasePath = '.';
        mxClient.link('js/mxClient.js', function () {
            // 创建 mxGraph 实例
            var container = document.getElementById('graphContainer');
            var graph = new mxGraph(container);

            // 获取默认父单元格
            var parent = graph.getDefaultParent();

            // 开始编辑
            graph.getModel().beginUpdate();
            try {
                // 创建两个顶点
                var vertex1 = graph.insertVertex(parent, null, 'Vertex 1', 20, 20, 80, 30);
                var vertex2 = graph.insertVertex(parent, null, 'Vertex 2', 200, 20, 80, 30);

                // 创建一条边连接两个顶点
                var edge = graph.insertEdge(parent, null, 'Edge', vertex1, vertex2);

                // 创建一个可能的分割目标顶点
                var potentialSplitTarget = graph.insertVertex(parent, null, 'Potential Split Target', 120, 20, 20, 20);
            } finally {
                // 结束编辑
                graph.getModel().endUpdate();
            }

            // 获取按钮元素
            var checkSplitTargetButton = document.getElementById('checkSplitTargetButton');
            // 为按钮添加点击事件监听器
            checkSplitTargetButton.addEventListener('click', function () {
                // 检查潜在分割目标是否可作为分割目标
                var isSplitTarget = graph.isSplitTarget(potentialSplitTarget, edge, vertex1, vertex2);
                console.log('Is split target:', isSplitTarget);
            });
        });
    </script>
</body>

</html>
```
