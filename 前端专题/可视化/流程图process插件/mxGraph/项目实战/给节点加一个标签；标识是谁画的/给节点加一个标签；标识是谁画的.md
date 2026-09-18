# 给节点加一个标签；标识是谁画的

## 目录

- [原理分析](#原理分析)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`中，`getCellBounds`方法返回的坐标通常是相对于图形视图的坐标，如果你需要将这些坐标转换为图形的实际坐标，需要考虑视图的缩放比例（`scale`）和平移量（`translate`）。下面为你详细介绍转换的原理和示例代码。

### 原理分析

`mxGraph`的视图可以进行缩放和平移操作，这会影响`getCellBounds`返回的坐标。因此，要将这些坐标转换为图形的实际坐标，需要进行以下计算：

- **实际**\*\*`x`\*\***坐标**：`实际 x 坐标 = (视图 x 坐标 / 缩放比例) - 视图平移的 x 坐标`
- **实际**\*\*`y`\*\***坐标**：`实际 y 坐标 = (视图 y 坐标 / 缩放比例) - 视图平移的 y 坐标`

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Convert Bounds Coordinates to Graph Coordinates</title>
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

                // 获取节点的边界框
                const bounds = graph.getCellBounds(vertex);

                // 获取视图的缩放比例和平移量
                const scale = graph.view.scale;
                const translate = graph.view.translate;

                // 计算图形的实际坐标
                const graphX = (bounds.x / scale) - translate.x;
                const graphY = (bounds.y / scale) - translate.y;

                console.log(`视图坐标: (${bounds.x}, ${bounds.y})`);
                console.log(`图形实际坐标: (${graphX}, ${graphY})`);

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
3. **获取节点的边界框**：调用`graph.getCellBounds(vertex)`方法获取节点的边界框信息。
4. **获取视图的缩放比例和平移量**：通过`graph.view.scale`获取视图的缩放比例，通过`graph.view.translate`获取视图的平移量。
5. **计算图形的实际坐标**：根据上述公式计算节点的实际`x`和`y`坐标。
6. **打印信息**：将视图坐标和图形实际坐标打印到控制台。
7. **结束模型更新**：使用`model.endUpdate()`结束模型更新事务，确保图形界面更新。

通过这种方式，你可以将`getCellBounds`获取的视图坐标转换为图形的实际坐标。
