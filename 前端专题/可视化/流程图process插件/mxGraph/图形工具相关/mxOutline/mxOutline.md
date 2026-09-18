# mxOutline

## 目录

- [作用](#作用)
- [构造函数参数](#构造函数参数)
- [使用示例](#使用示例)
- [代码解释](#代码解释)
- [应用场景](#应用场景)

在`mxGraph`库中，`new mxOutline`用于创建一个**图形的缩略图（大纲视图）对象。缩略图能够为用户提供图形的全局概览，** 方便用户在处理大型复杂图形时快速定位和导航。以下将从作用、构造函数参数、使用示例、应用场景等方面详细介绍。

### 作用

`mxOutline`提供了一种直观的方式，让用户可以在一个小窗口中看到整个图形的全貌，同时可以通过在缩略图上进行交互操作（如点击、拖动）来控制主图形视图的显示区域，就像地图上的缩略图可以帮助用户快速定位到感兴趣的区域一样。这对于大型流程图、网络图等复杂图形的浏览和操作非常有用。

### 构造函数参数

`mxOutline`构造函数通常接收以下参数：

- **`graph`**：必需参数，类型为`mxGraph`，表示要为其创建缩略图的主图形对象。
- **`container`**：可选参数，类型为 HTML 元素（如`div`），用于容纳缩略图的容器。如果不提供该参数，`mxOutline`会创建一个默认的容器。

### 使用示例

以下是一个简单的示例代码，展示了如何使用`new mxOutline`创建图形的缩略图：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxOutline Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <!-- 主图形容器 -->
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <!-- 缩略图容器 -->
    <div id="outlineContainer" style="width: 200px; height: 150px; border: 1px solid gray;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            // 获取主图形容器
            const graphContainer = document.getElementById('graphContainer');
            // 创建 mxGraph 实例
            const graph = new mxGraph(graphContainer);

            // 开始更新图形模型
            graph.getModel().beginUpdate();
            try {
                // 获取默认父级单元格
                const parent = graph.getDefaultParent();
                // 插入一个顶点
                graph.insertVertex(parent, null, 'Node 1', 20, 20, 80, 30);
                // 插入另一个顶点
                graph.insertVertex(parent, null, 'Node 2', 200, 200, 80, 30);
                // 插入一条边连接两个顶点
                graph.insertEdge(parent, null, '', graph.getModel().getCell(0), graph.getModel().getCell(1));
            } finally {
                // 结束更新图形模型
                graph.getModel().endUpdate();
            }

            // 获取缩略图容器
            const outlineContainer = document.getElementById('outlineContainer');
            // 创建 mxOutline 实例
            new mxOutline(graph, outlineContainer);
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建主图形**：首先创建一个`mxGraph`实例，并将其关联到一个 HTML 容器上。然后在图形中插入两个顶点和一条边，构建一个简单的图形。
2. **创建缩略图**：获取用于显示缩略图的 HTML 容器，然后使用`new mxOutline(graph, outlineContainer)`创建缩略图对象，将主图形和缩略图容器关联起来。

### 应用场景

- **大型流程图**：当流程图包含大量的节点和边时，用户很难在主视图中看到整个图形的布局。缩略图可以帮助用户快速定位到感兴趣的部分，提高操作效率。
- **网络图**：在处理复杂的网络图（如社交网络、电力网络等）时，缩略图可以让用户快速了解网络的整体结构，方便进行全局的分析和导航。
- **地理信息系统（GIS）**：在 GIS 应用中，缩略图可以作为地图的小范围预览，用户可以通过缩略图快速定位到不同的地理区域。

通过`new mxOutline`，开发者可以为`mxGraph`图形添加缩略图功能，提升用户对复杂图形的浏览和操作体验。

分享

在mxGraph中，如何使用缩略图对象进行交互操作？

mxOutline对象有哪些事件和方法？

除了mxOutline，mxGraph还有哪些常用的类和方法？
