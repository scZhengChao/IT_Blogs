# isCellLocked

## 目录

- [方法功能](#方法功能)
- [方法签名](#方法签名)
- [参数说明](#参数说明)
- [返回值](#返回值)
- [示例代码](#示例代码)
- [代码解释](#代码解释)
- [常见应用场景](#常见应用场景)

在`mxGraph`库中，`graph.isCellLocked`是一个用于检查指定**单元格是否被锁定的方法。下面**从方法功能、参数、返回值、使用示例以及常见应用场景等方面进行详细介绍。

### 方法功能

在`mxGraph`中，单元格（`mxCell`）可以被**设置为锁定状态。当单元格被锁定时，它的一些操作（如移动、调整大小、删除等）会受到限制。** \*\*`graph.isCellLocked`\*\***方法的主要功能就是判断一个给定的单元格是否处于锁定状态**，从而帮助开发者决定是否允许对该单元格进行特定操作。

### 方法签名

```javascript 
graph.isCellLocked(cell);
```


### 参数说明

- **`cell`**：
  - **类型**：`mxCell`。
  - **描述**：必需参数，代表要检查的单元格对象。`mxCell`是`mxGraph`中表示图形元素（如顶点、边等）的基本单元。

### 返回值

- **类型**：`Boolean`。
- **描述**：如果指定的单元格被锁定，返回`true`；否则返回`false`。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxGraph isCellLocked Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px;"></div>
    <button id="checkLockButton">Check Cell Lock Status</button>

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
                var vertex = graph.insertVertex(parent, null, 'Locked Vertex', 20, 20, 80, 30);
                // 锁定该顶点
                graph.getModel().setCellLocked(vertex, true);

                // 创建另一个顶点，不锁定
                var unlockedVertex = graph.insertVertex(parent, null, 'Unlocked Vertex', 200, 20, 80, 30);
            } finally {
                // 结束编辑
                graph.getModel().endUpdate();
            }

            // 获取按钮元素
            var checkLockButton = document.getElementById('checkLockButton');
            // 为按钮添加点击事件监听器
            checkLockButton.addEventListener('click', function () {
                // 检查锁定顶点的锁定状态
                var isVertexLocked = graph.isCellLocked(vertex);
                // 检查未锁定顶点的锁定状态
                var isUnlockedVertexLocked = graph.isCellLocked(unlockedVertex);

                console.log('Locked Vertex is locked:', isVertexLocked);
                console.log('Unlocked Vertex is locked:', isUnlockedVertexLocked);
            });
        });
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：通过`mxGraph`构造函数创建一个图实例，并指定其显示容器。
2. **创建顶点并设置锁定状态**：创建两个顶点，其中一个顶点使用`graph.getModel().setCellLocked`方法将其锁定，另一个顶点不进行锁定操作。
3. **添加按钮并监听点击事件**：创建一个按钮，为其添加点击事件监听器。在点击事件处理函数中，使用`graph.isCellLocked`方法分别检查锁定顶点和未锁定顶点的锁定状态，并将结果打印到控制台。

### 常见应用场景

- **权限控制**：在多人协作的图形编辑环境中，可以根据用户的权限对某些单元格进行锁定，使用`graph.isCellLocked`方法检查单元格的锁定状态，限制没有权限的用户对这些单元格进行操作。
- **防止误操作**：对于一些重要的图形元素，可以将其锁定，避免用户不小心对其进行移动、删除等操作。在进行操作之前，先使用该方法检查单元格的锁定状态，确保操作的安全性。
