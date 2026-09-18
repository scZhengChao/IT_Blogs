# add

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [返回值](#返回值)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`库中，推测你想说的是`model.add`（这里的`model`一般指`mxGraphModel`实例），`model.add`方法用于向图形模型**中添加一个新的单元格（cell），可以是节点（vertex）、边（edge）等**。以下从功能、参数、返回值、使用场景、示例代码等方面详细介绍该方法。

### 功能概述

`model.add`方法的核心功能是将**一个新的单元格添加到指定的父单元格中，同时更新图形模型的数据结构**。添加单元格后，`mxGraph`会根据新的模型数据重新渲染图形，使新添加的单元格显示在图形界面上。

### 参数

该方法通常接收三个参数：

- **`parent`**：类型为`mxCell`，表示要**添加新单元格的父单元格**。这个父单元格可以是图形的根节点、分组节点等，它定义了新单元格在图形层次结构中的位置。
- **`cell`**：类型为`mxCell`，是要添加到**图形模型中的新单元格对象**。可以是通过`mxCell`构造函数创建的节点、边等单元格实例。
- **`index`**：类型为`number`，可选参数。表示新单元格在父单元格的子单元**格列表中的插入位置。如果不指定该参数**，默认将新单元格添加到子单元格列表的末尾。

### 返回值

方法返回添加到图形模型中的单元格对象，即传入的`cell`参数。

### 使用场景

- **动态创建图形**：在程序运行过程中，根据用户的操作或业务逻辑动态创建新的节点、边等图形元素，并将它们添加到图形中。
- **图形数据加载**：从外部数据源（如 JSON 文件、数据库等）加载图形数据时，需要将解析后得到的单元格对象添加到图形模型中。
- **图形编辑**：在用户进行图形编辑操作（如添加节点、连接边等）时，使用该方法将新创建的单元格添加到图形中。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>model.add Example</title>
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

                // 创建一个新的节点单元格
                const newVertex = new mxCell('New Vertex', new mxGeometry(20, 20, 80, 30), 'shape=rectangle');
                newVertex.setVertex(true);

                // 将新节点添加到图形模型中
                const addedCell = model.add(parent, newVertex);

                console.log('添加的单元格:', addedCell);

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
2. **创建新的节点单元格**：使用`mxCell`构造函数创建一个新的节点单元格`newVertex`，并设置其标签文本、几何信息和样式。然后调用`setVertex(true)`方法将其标记为节点。
3. **添加单元格到图形模型**：调用`model.add(parent, newVertex)`方法将新节点添加到默认父级中，并将返回的单元格对象存储在`addedCell`变量中。
4. **打印添加的单元格信息**：将添加的单元格信息打印到控制台。
5. **结束模型更新**：使用`model.endUpdate()`结束模型更新事务，确保图形界面更新。

通过`model.add`方法，可以方便地向图形模型中添加新的单元格，实现图形的动态创建和编辑。
