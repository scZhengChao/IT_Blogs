# invalidate

## 目录

- [参数解释](#参数解释)
- [功能概述](#功能概述)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)
- [注意事项](#注意事项)

`mxGraphView.prototype.invalidate`是`mxGraph`库中`mxGraphView`原型上的一个方法，**用于将指定单元格及其相关元素标记为需要重新计算布局和渲染**。下面为你详细介绍该方法的参数、功能、使用场景和示例。

### 参数解释

- **`cell`**：
  - 类型：`mxCell`。
  - 描述：这是一个必需参数，代表要标记为无效的单元格。`mxCell`是`mxGraph`中表示图形元素（如节点、边）的基本对象。
- **`recurse`**：
  - 类型：`boolean`。
  - 描述：可选参数，默认值为`true`。若设置为`true`，会递归地将指定单元格的所有子单元格也标记为无效；若为`false`，则仅标记指定的单元格。
- **`includeEdges`**：
  - 类型：`boolean`。
  - 描述：可选参数，默认值为`true`。若设置为`true`，除了标记单元格本身，还会将与该单元格相连的边也标记为无效；若为`false`，则只处理单元格，不处理相关的边。

### 功能概述

该方法的主要功能是通知`mxGraphView`视图，指定的**单元格及其可能的子单元格、相关边的布局或状态已经发生变化，需要在后续的渲染过程中重新计算它们的位置、大小等信息。不过，调用此方法并不会立即触发重新渲染，只是设置了一个标记**，真正的重新渲染通常在调用`validate`方法时进行。

### 使用场景

- **单元格属性变更**：当你修改了某个单元格的属性，如位置、大小、样式等，就可以调用`invalidate`方法，让视图知道该单元格需要重新布局和渲染。
- **图形结构改变**：在添加、删除单元格或者改变单元格之间的连接关系后，使用该方法确保视图能正确更新。
- **布局调整**：当手动调整布局或者应用新的布局算法后，调用此方法触发视图的重新计算。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxGraphView.prototype.invalidate Example</title>
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

            // 获取图形视图
            const view = graph.view;

            // 获取图形模型
            const model = graph.getModel();

            // 开始更新模型
            model.beginUpdate();
            try {
                // 获取默认父级
                const parent = graph.getDefaultParent();

                // 创建一个节点
                const vertex = graph.insertVertex(parent, null, 'Node', 20, 20, 80, 30);

                // 创建另一个节点
                const vertex2 = graph.insertVertex(parent, null, 'Node 2', 200, 200, 80, 30);

                // 创建一条边连接两个节点
                const edge = graph.insertEdge(parent, null, 'Edge', vertex, vertex2);

                // 修改第一个节点的位置
                vertex.geometry.x = 100;
                vertex.geometry.y = 100;

                // 标记第一个节点及其相关边为无效
                view.invalidate(vertex, true, true);

                // 触发视图的重新计算和渲染
                view.validate();

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

1. **创建图形和获取视图、模型**：创建`mxGraph`实例并关联到 HTML 容器，接着获取图形视图`view`和图形模型`model`。
2. **创建节点和边**：在模型更新的事务块内，创建两个节点和一条连接它们的边。
3. **修改节点属性**：修改第一个节点的位置属性。
4. **标记单元格无效**：调用`view.invalidate(vertex, true, true)`方法，将第一个节点及其相关边标记为无效，以便后续重新计算布局。
5. **触发重新计算和渲染**：调用`view.validate()`方法触发视图的重新计算和渲染，使修改后的节点位置能够在界面上显示出来。
6. **结束模型更新**：使用`model.endUpdate()`结束模型更新事务，确保图形界面更新。

### 注意事项

- **与**\*\*`validate`\*\***方法配合**：`invalidate`方法只是标记视图为无效状态，需要调用`validate`方法来实际触发重新计算和渲染。
- **性能考量**：频繁调用`invalidate`和`validate`方法可能会影响性能，特别是在处理大量单元格时，应尽量减少不必要的调用。
