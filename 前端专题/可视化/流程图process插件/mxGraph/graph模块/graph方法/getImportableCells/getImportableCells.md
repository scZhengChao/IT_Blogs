# getImportableCells

## 目录

- [方法功能](#方法功能)
- [方法签名](#方法签名)
- [参数说明](#参数说明)
- [返回值](#返回值)
- [示例代码](#示例代码)
- [代码解释](#代码解释)
- [使用场景](#使用场景)

在`mxGraph`库中，`graph.getImportableCells`是一个重要的方法，它主要用于获取可以导入到当前图中的单元格集合。下面为你详细介绍该方法的相关信息。

### 方法功能

`getImportableCells`方法的主要作用是从**给定的单元格集合中筛选出那些可以被成功导入到当前**`mxGraph`**实例中的单元格。在进行图形的复制、粘贴或者从外部数据源导入图形时，需要先确定哪些单元格是可以被导入的，** 这个方法就可以帮助完成这样的筛选工作。

### 方法签名

```javascript 
graph.getImportableCells(cells);
```


### 参数说明

- **`cells`**：
  - **类型**：`Array`或单个`mxCell`对象。
  - **描述**：这是一个必需的参数，代表要检查是否可导入的单元格集合。可以传入一个包含多个`mxCell`对象的数组，也可以传入单个`mxCell`对象。

### 返回值

该方法会返回一个数组，数组中包含了所有可以导入到当前图中的单元格。如果没有可导入的单元格，将返回一个空数组。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxGraph getImportableCells Example</title>
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
                // 创建一些单元格
                var cell1 = new mxCell('Cell 1', new mxGeometry(20, 20, 80, 30), 'shape=rectangle');
                cell1.setVertex(true);
                var cell2 = new mxCell('Cell 2', new mxGeometry(120, 20, 80, 30), 'shape=rectangle');
                cell2.setVertex(true);

                var allCells = [cell1, cell2];

                // 获取可导入的单元格
                var importableCells = graph.getImportableCells(allCells);

                console.log('Importable cells:', importableCells);

                // 导入可导入的单元格
                graph.addCells(importableCells, parent);
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
2. **创建单元格**：使用`mxCell`构造函数创建两个单元格对象，并设置它们的属性，如标签、几何位置和样式。
3. **获取可导入的单元格**：将创建好的单元格存储在一个数组中，然后调用`graph.getImportableCells`方法获取可以导入到当前图中的单元格。
4. **导入可导入的单元格**：使用`graph.addCells`方法将可导入的单元格添加到图中。

### 使用场景

- **复制粘贴操作**：在实现图形的复制粘贴功能时，先使用`getImportableCells`方法筛选出可粘贴的单元格，然后再将这些单元格添加到目标图中。
- **数据导入**：当从外部数据源（如文件、数据库等）导入图形数据时，使用该方法确保只有有效的单元格被导入到当前图中。
