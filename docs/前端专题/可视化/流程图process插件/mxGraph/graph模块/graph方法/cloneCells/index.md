# cloneCells

## 目录

- [方法签名](#方法签名)
- [参数说明](#参数说明)
- [返回值](#返回值)
- [使用示例](#使用示例)
- [代码解释](#代码解释)
- [应用场景](#应用场景)

在`mxGraph`中，`cloneCells`是一个非常实用的方法，它主要用于克隆图中的单元格（`cell`），这些单元格可以是顶点、边等。下面将详细介绍`cloneCells`方法的相关信息，包括方法签名、参数、返回值、使用示例以及代码解释。

### 方法签名

```javascript 
graph.cloneCells(cells, includeChildren, target, parent, offset);
```


### 参数说明

- **`cells`**：
  - **类型**：`Array<mxCell>`。
  - **描述**：必需参数，是一个包含要克隆的单元格的数组。可以是单个单元格，也可以是多个单元格的集合。
- **`includeChildren`**：
  - **类型**：`Boolean`。
  - **描述**：可选参数，默认为`true`。如果设置为`true`，则会同时克隆单元格的所有子单元格；如果设置为`false`，则只克隆指定的单元格，不包含其子单元格。
- **`target`**：
  - **类型**：`mxCell`。
  - **描述**：可选参数，默认为`null`。指定克隆后的单元格的目标单元格，通常用于将克隆的单元格添加到特定的父单元格中。
- **`parent`**：
  - **类型**：`mxCell`。
  - **描述**：可选参数，默认为`null`。指定克隆后的单元格的父单元格。如果`target`参数不为`null`，则`parent`参数会被忽略。
- **`offset`**：
  - **类型**：`mxPoint`。
  - **描述**：可选参数，默认为`null`。指定克隆后的单元格相对于原始单元格的偏移量。可以通过设置`mxPoint`对象的`x`和`y`属性来指定水平和垂直方向的偏移量。

### 返回值

- **类型**：`Array<mxCell>`。
- **描述**：返回一个\*\*包含克隆后的单元格的数组，数组的顺序与传入的`cells`\*\***数组的顺序一致。**

### 使用示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>cloneCells Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px;"></div>
    <button id="cloneButton">Clone Cells</button>
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
                // 创建一个顶点
                var vertex = graph.insertVertex(parent, null, 'Vertex', 20, 20, 80, 30);
            } finally {
                // 结束编辑
                graph.getModel().endUpdate();
            }

            // 获取按钮元素
            var cloneButton = document.getElementById('cloneButton');
            // 为按钮添加点击事件监听器
            cloneButton.addEventListener('click', function () {
                // 克隆单元格
                graph.getModel().beginUpdate();
                try {
                    var cellsToClone = [vertex];
                    var offset = new mxPoint(100, 0);
                    var clonedCells = graph.cloneCells(cellsToClone, true, null, null, offset);
                    // 将克隆的单元格添加到图中
                    graph.addCells(clonedCells);
                } finally {
                    graph.getModel().endUpdate();
                }
            });
        });
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例和顶点**：创建`mxGraph`实例，并在图中创建一个顶点`vertex`。
2. **添加按钮并监听点击事件**：创建一个按钮，为其添加点击事件监听器。在点击事件处理函数中，执行以下操作：
   - 定义要克隆的单元格数组`cellsToClone`，这里只包含一个顶点`vertex`。
   - 创建一个`mxPoint`对象`offset`，指定克隆后的单元格相对于原始单元格的水平偏移量为 100 像素。
   - 调用`graph.cloneCells`方法克隆单元格，并将克隆后的单元格存储在`clonedCells`数组中。
   - 调用`graph.addCells`方法将克隆的单元格添加到图中。
3. **更新模型**：在修改图形元素前后，使用`graph.getModel().beginUpdate()`和`graph.getModel().endUpdate()`方法确保模型的更新操作被正确处理。

### 应用场景

- **复制元素**：在图形编辑过程中，用户可能需要复制某个元素或一组元素，使用`cloneCells`方法可以方便地实现元素的复制功能。
- **批量创建元素**：当需要创建多个相似的元素时，可以先创建一个模板元素，然后使用`cloneCells`方法批量克隆该元素，并根据需要调整克隆元素的位置和属性。
