# updateEdgeParent

## 目录

- [功能](#功能)
- [可能的参数](#可能的参数)
- [可能的参数](#可能的参数)
- [示例代码](#示例代码)
- [代码解释](#代码解释)
- [注意事项](#注意事项)

#### 功能

`graph.model`通常代表的是`mxGraphModel`实例，它是`mxGraph`中用于管理图形数据模型的核心对象。`graph.model.updateEdgeParent`方法则是专门**用来更新边的父级元素的操作接口**。调用这个方法时，会更新边**在数据模型中的父级信息，同时也会触发图形界面的相应更新，保证图形的显示与数据模型一致。**

#### 可能的参数

一般来说，`updateEdgeParent`方法可能会接收以下参数：

- **`edge`**：要更新父级的边对象。
- **`newParent`**：边要移动到的新的父级元素。
- **`index`**：可选参数，用于指定边在新父级元素中的位置索引。

#### 可能的参数

一般来说，`updateEdgeParent`方法可能会接收以下参数：

- **`edge`**：要更新父级的边对象。
- **`newParent`**：边要移动到的新的父级元素。
- **`index`**：可选参数，用于指定边在新父级元素中的位置索引。

#### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxGraph updateEdgeParent Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
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

                // 创建两个节点
                const vertex1 = graph.insertVertex(parent, null, 'Vertex 1', 20, 20, 80, 30);
                const vertex2 = graph.insertVertex(parent, null, 'Vertex 2', 200, 200, 80, 30);

                // 创建一条边连接两个节点
                const edge = graph.insertEdge(parent, null, 'Edge', vertex1, vertex2);

                // 模拟新的父级元素
                const newParent = graph.getDefaultParent();

                // 更新边的父级
                model.updateEdgeParent(edge, newParent);

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
2. **插入节点和边**：在模型更新的事务块内，插入两个节点和一条连接它们的边。
3. **模拟新的父级元素**：这里简单地将默认父级作为新的父级元素，实际应用中可以根据需求创建或指定其他父级。
4. **更新边的父级**：调用`model.updateEdgeParent(edge, newParent)`方法将边的父级更新为新的父级元素。
5. **结束模型更新**：使用`model.endUpdate()`结束模型更新事务，确保图形界面更新。

### 注意事项

- **事务处理**：在调用`updateEdgeParent`方法前后，通常需要使用`model.beginUpdate()`和`model.endUpdate()`来包裹操作，以保证数据模型的一致性和图形界面的正确更新。
- **图形重绘**：更新边的父级后，`mxGraph`会自动处理图形的重绘，但在复杂场景下，可能需要手动触发某些布局或渲染操作。

通过`updateEdgeParent`方法，可以灵活地调整图形的结构，满足不同的业务需求。
