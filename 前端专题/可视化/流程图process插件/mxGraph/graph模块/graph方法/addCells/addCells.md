# addCells

## 目录

- [方法功能](#方法功能)
- [方法签名](#方法签名)
- [参数说明](#参数说明)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`库中，`graph.addCells`是一个非常重要的方法，用于向图（`mxGraph`实例）中添加一个或多个单元格（`mxCell`对象）。下面从多个方面详细介绍这个方法。

### 方法功能

`graph.addCells`方法的主要功能**是将指定的单元格添加到图中，并触发相应的视图更新**，使得新添加的单元格能够显示在图的界面上。它支持批量添加单元格，提高了添加多个元素时的效率。

### 方法签名

```javascript 
graph.addCells(cells, target, index, clone);
```


### 参数说明

- **`cells`**：
  - **类型**：`Array`或单个`mxCell`对象。
  - **描述**：这是一个必需的参数，用于指定要添加到图中的单元格。可以是一个包含多个`mxCell`对象的数组，也可以是单个`mxCell`对象。
- **`target`**：
  - **类型**：`mxCell`。
  - **描述**：可选参数，指定新单元格要添加到的目标父单元格。如果未提供该参数，则使用图的默认父单元格。
- **`index`**：
  - **类型**：`Number`。
  - **描述**：可选参数，指定新单元格在目标父单元格中的插入位置索引。如果未提供该参数，则将单元格添加到父单元格的末尾。
- **`clone`**：
  - **类型**：`Boolean`。
  - **描述**：可选参数，默认为`false`。如果设置为`true`，则会对传入的单元格进行克隆操作，将克隆后的单元格添加到图中，而不是原始的单元格。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxGraph addCells Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
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
                // 创建两个单元格
                var cell1 = new mxCell('Cell 1', new mxGeometry(20, 20, 80, 30), 'shape=rectangle');
                cell1.setVertex(true);
                var cell2 = new mxCell('Cell 2', new mxGeometry(120, 20, 80, 30), 'shape=rectangle');
                cell2.setVertex(true);

                // 批量添加单元格
                var cellsToAdd = [cell1, cell2];
                graph.addCells(cellsToAdd, parent);
            } finally {
                // 结束编辑
                graph.getModel().endUpdate();
            }
        });
    </script>
</head>

<body>
    <!-- 图表容器 -->
    <div id="graphContainer" style="width: 600px; height: 400px;"></div>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：通过`mxGraph`构造函数创建一个图实例，并指定其显示容器。
2. **获取默认父单元格**：使用`graph.getDefaultParent()`方法获取图的默认父单元格，后续添加的单元格将被添加到这个父单元格中。
3. **创建单元格**：使用`mxCell`构造函数创建两个单元格对象，并设置它们的属性，如标签、几何位置和样式。
4. **批量添加单元格**：将创建好的单元格存储在一个数组中，然后调用`graph.addCells`方法将这些单元格添加到图中。
5. **结束编辑**：使用`graph.getModel().endUpdate()`方法结束编辑操作，触发视图更新，使新添加的单元格显示在图中。

通过`graph.addCells`方法，你可以方便地向`mxGraph`中添加一个或多个单元格，实现图形的动态构建。
