# 删除

## 目录

- [deleteSubtree](#deleteSubtree)
  - [方法概述](#方法概述)
  - [参数](#参数)
  - [使用场景](#使用场景)
  - [示例代码](#示例代码)
  - [代码解释](#代码解释)
- [graph.removeCells](#graphremoveCells)
  - [功能概述](#功能概述)
  - [参数](#参数)
  - [返回值](#返回值)
  - [使用场景](#使用场景)
  - [示例代码](#示例代码)
  - [代码解释](#代码解释)

```javascript 
del() {
  if (!_.isEmpty(this.selectVertex)) {
    graph.deleteSubtree(this.selectVertex);
  } else {
    graph.removeCells([this.selectEdge]);
  }
},
```


# `deleteSubtree`

在`mxGraph`中，`graph.deleteSubtree`是一个用于删除图形中指定单元格及其子树的方法。下面从方法概述、参数、使用场景、示例代码以及代码解释几个方面详细介绍该方法。

### 方法概述

`graph.deleteSubtree`方法的主要作用是删除指定单元格及其所有子单元格（如果有的话）。在图形结构中，单元格可以有父子关系，形成一个树状结构。当调用这个方法时，它会递归地删除指定单元格及其所有后代单元格，同时也会删除与这些单元格相关的边。

### 参数

该方法通常接收一个参数：

- **`cell`**：类型为`mxCell`，表示要删除的根单元格。这个单元格及其所有子单元格都会被删除。

### 使用场景

- **数据清理**：当图形中某些部分的数据不再需要时，可以使用该方法删除这些部分的单元格及其子树，以清理图形并释放资源。
- **动态更新**：在图形的动态更新过程中，根据业务逻辑的变化，可能需要删除某些特定的单元格及其子结构。例如，在流程图中，当某个任务被取消时，删除与该任务相关的所有节点和边。
- **错误处理**：当发现图形中存在错误或不符合规则的部分时，可以使用该方法将其删除。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>graph.deleteSubtree Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <button id="deleteButton">Delete Subtree</button>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            graph.getModel().beginUpdate();
            try {
                const parent = graph.getDefaultParent();
                const rootNode = graph.insertVertex(parent, null, 'Root Node', 20, 20, 80, 30);
                const childNode1 = graph.insertVertex(parent, null, 'Child Node 1', 120, 20, 80, 30);
                const childNode2 = graph.insertVertex(parent, null, 'Child Node 2', 20, 120, 80, 30);
                graph.insertEdge(parent, null, '', rootNode, childNode1);
                graph.insertEdge(parent, null, '', rootNode, childNode2);
            } finally {
                graph.getModel().endUpdate();
            }

            const deleteButton = document.getElementById('deleteButton');
            deleteButton.addEventListener('click', function () {
                const rootCell = graph.getModel().getCell(0);
                if (rootCell) {
                    graph.getModel().beginUpdate();
                    try {
                        graph.deleteSubtree(rootCell);
                    } finally {
                        graph.getModel().endUpdate();
                    }
                }
            });
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例并插入单元格和边**：创建一个`mxGraph`实例并关联到 HTML 容器上，然后插入一个根节点和两个子节点，同时插入两条边将根节点与子节点连接起来。
2. **添加删除按钮**：在页面上添加一个按钮，用于触发删除子树的操作。
3. **删除子树**：当用户点击按钮时，通过`graph.getModel().getCell(0)`获取根单元格（这里假设根单元格的 ID 为 0）。如果根单元格存在，调用`graph.deleteSubtree`方法删除该单元格及其子树。在进行删除操作时，需要使用`graph.getModel().beginUpdate()`和`graph.getModel().endUpdate()`来包裹操作，以确保图形模型的一致性。

通过`graph.deleteSubtree`方法，开发者可以方便地删除图形中指定单元格及其子树，实现图形的动态更新和清理。

# graph.removeCells

在`mxGraph`中，`graph.removeCells`是一个非常实用的方法，用于从图形**中移除一个或多个单元格（包括节点和边）**。以下将从功能概述、参数、返回值、使用场景、示例代码及代码解释等方面对该方法进行详细介绍。

### 功能概述

`graph.removeCells`方法的主要功能是将指定的单元格从`mxGraph`的图形模型中移除 **。当移除单元格时，与之相关联的边（如果有的话）也会被自动移除，以确保图形的一致性。** 这个方法可以处理单个单元格的移除，也可以一次性移除多个单元格。

### 参数

该方法通常接收以下参数：

- **`cells`**：类型为`Array<mxCell>`或`mxCell`，表示要移除的单元格。可以传入一个包含多个`mxCell`对象的数组，也可以直接传入单个`mxCell`对象。
- **`removeDependents`**：类型为`boolean`，可选参数，默认值为`true`。如果设置为`true`，在移除单元格时，会同时移除依赖于这些单元格的其他单元格（例如，移除一个节点时，会移除连接到该节点的所有边）；如果设置为`false`，则只会移除指定的单元格，而不会处理依赖关系。
- **`includeEdges`**：类型为`boolean`，可选参数，默认值为`true`。如果设置为`true`，会同时移除与指定单元格相关联的边；如果设置为`false`，则只移除单元格本身，保留相关的边。

### 返回值

该方法返回一个包含已移除单元格的数组，方便开发者后续处理或记录移除的单元格信息。

### 使用场景

- **数据清理**：当图形中存在一些不再需要的单元格时，使用该方法可以快速清理这些单元格，使图形更加简洁。
- **动态更新**：在图形的动态更新过程中，根据业务逻辑的变化，可能需要移除某些特定的单元格。例如，在流程图中，当某个任务完成后，移除与之相关的节点和边。
- **撤销操作**：在实现撤销功能时，可以使用该方法移除之前添加的单元格。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>graph.removeCells Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <button id="removeButton">Remove Cells</button>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            graph.getModel().beginUpdate();
            try {
                const parent = graph.getDefaultParent();
                const node1 = graph.insertVertex(parent, null, 'Node 1', 20, 20, 80, 30);
                const node2 = graph.insertVertex(parent, null, 'Node 2', 200, 200, 80, 30);
                const edge = graph.insertEdge(parent, null, '', node1, node2);
            } finally {
                graph.getModel().endUpdate();
            }

            const removeButton = document.getElementById('removeButton');
            removeButton.addEventListener('click', function () {
                graph.getModel().beginUpdate();
                try {
                    const cellsToRemove = [graph.getModel().getCell(0), graph.getModel().getCell(1)];
                    const removedCells = graph.removeCells(cellsToRemove);
                    console.log('Removed cells:', removedCells);
                } finally {
                    graph.getModel().endUpdate();
                }
            });
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例并插入单元格**：创建一个`mxGraph`实例并关联到 HTML 容器上，然后插入两个节点和一条连接它们的边。
2. **添加移除按钮**：在页面上添加一个按钮，用于触发移除单元格的操作。
3. **移除单元格**：当用户点击按钮时，通过`graph.getModel().getCell`方法获取要移除的单元格，将它们存储在一个数组中。然后调用`graph.removeCells`方法移除这些单元格，并将返回的已移除单元格数组输出到控制台。在进行移除操作时，需要使用`graph.getModel().beginUpdate()`和`graph.getModel().endUpdate()`来包裹操作，以确保图形模型的一致性。

通过`graph.removeCells`方法，开发者可以方便地从`mxGraph`中移除指定的单元格，实现图形的动态更新和清理。
