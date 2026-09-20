# createEdge

## 目录

- [功能概述](#功能概述)
- [方法签名](#方法签名)
- [参数说明](#参数说明)
- [返回值](#返回值)
- [使用示例](#使用示例)
- [代码解释](#代码解释)
- [应用场景](#应用场景)

在`mxGraph`库中，`graph.createEdge`是一个用于创建边（`Edge`）对象的重要方法。边在图形中用于表示两个节点（顶点）之间的连接关系。以下将从方法的功能、参数、返回值、使用示例和应用场景等方面详细介绍。

### 功能概述

`graph.createEdge`方法的主要功能是创建一个新的边对象，但并不将其添加到图形中。创建的边对象可以在后续操作中被添加到图形里，同时可以对其进行样式设置、设置源顶点和目标顶点等操作。

### 方法签名

```javascript 
graph.createEdge(parent, id, value, source, target, style);
```


### 参数说明

- **`parent`**：
  - **类型**：`mxCell`。
  - **描述**：必需参数，代表新创建的边的父单元格。通常是图形的默认父单元格，用于组织和管理图形元素。
- **`id`**：
  - **类型**：`String`。
  - **描述**：可选参数，为边指定一个唯一的标识符。如果传入`null`或不提供该参数，`mxGraph`会自动生成一个唯一的 ID。
- **`value`**：
  - **类型**：`Object`。
  - **描述**：可选参数，是与边关联的值，可以是任意对象，通常用于存储边的相关信息，如标签文本等。
- **`source`**：
  - **类型**：`mxCell`。
  - **描述**：必需参数，指定边的源顶点（起始顶点），即边从哪个顶点开始。
- **`target`**：
  - **类型**：`mxCell`。
  - **描述**：必需参数，指定边的目标顶点（结束顶点），即边连接到哪个顶点。
- **`style`**：
  - **类型**：`String`。
  - **描述**：可选参数，用于设置边的样式。样式是一个字符串，包含一系列的键值对，用于定义边的外观和行为，例如线条颜色、箭头样式等。

### 返回值

- **类型**：`mxCell`。
- **描述**：返回一个新创建的`mxCell`对象，代表创建的边。

### 使用示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxGraph createEdge Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px;"></div>
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

                // 创建边
                var edge = graph.createEdge(parent, null, 'Edge Label', vertex1, vertex2, 'strokeColor=red');

                // 将边添加到图形中
                graph.addCell(edge);
            } finally {
                // 结束编辑
                graph.getModel().endUpdate();
            }
        });
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：使用`mxGraph`构造函数创建一个图形实例，并指定其显示容器。
2. **创建顶点**：通过`graph.insertVertex`方法创建两个顶点`vertex1`和`vertex2`。
3. **创建边**：调用`graph.createEdge`方法创建一个边对象，设置父单元格为`parent`，边的标签为`'Edge Label'`，源顶点为`vertex1`，目标顶点为`vertex2`，并设置边的线条颜色为红色。
4. **添加边到图形**：使用`graph.addCell`方法将创建的边添加到图形中。
5. **结束编辑**：调用`graph.getModel().endUpdate()`结束编辑操作，触发图形的更新。

### 应用场景

- **动态图形构建**：在需要动态创建和修改图形结构的场景中，可以使用`graph.createEdge`方法根据用户操作或数据变化实时创建边，然后将其添加到图形中。
- **数据可视化**：在数据可视化应用中，根据数据之间的关系创建相应的边，以展示数据的关联结构。例如，在社交网络可视化中，用边表示用户之间的关系。
