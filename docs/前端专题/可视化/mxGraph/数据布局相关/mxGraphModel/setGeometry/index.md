# setGeometry

## 目录

- [方法概述](#方法概述)
- [方法签名](#方法签名)
- [参数说明](#参数说明)
- [使用示例](#使用示例)
- [代码解释](#代码解释)
- [应用场景](#应用场景)

在`mxGraph`中，`model.setGeometry`方法用于设置图形元素（如顶点、边）的几何信息。下面从方法概述、参数、使用示例和应用场景等方面详细介绍。

### 方法概述

`model`是`mxGraph`中的模型对象，负责管理图形元素的数据，而`setGeometry`方法允许**你修改图形元素的几何属性**，**像位置、大小、形状等。通过调用该方法，可以动态地调整图形元素在图中的布局。**

### 方法签名

```javascript 
model.setGeometry(cell, geometry);
```


### 参数说明

- **`cell`**：
  - **类型**：`mxCell`。
  - **描述**：必需参数，代表要设置几何信息的图形元素，这个元素可以是顶点、边等。
- **`geometry`**：
  - **类型**：`mxGeometry`。
  - **描述**：必需参数，是一个`mxGeometry`对象，包含了图形元素的几何信息，例如位置（`x`和`y`坐标）、大小（宽度和高度）等。

### 使用示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>model.setGeometry Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px;"></div>
    <button id="moveVertexButton">Move Vertex</button>
    <script type="text/javascript">
        mxLoadResources = false;
        mxBasePath = '.';
        mxClient.link('js/mxClient.js', function () {
            // 创建 mxGraph 实例
            var container = document.getElementById('graphContainer');
            var graph = new mxGraph(container);

            // 获取模型对象
            var model = graph.getModel();

            // 获取默认父单元格
            var parent = graph.getDefaultParent();

            // 开始编辑
            model.beginUpdate();
            try {
                // 创建一个顶点
                var vertex = graph.insertVertex(parent, null, 'Vertex', 20, 20, 80, 30);

                // 获取按钮元素
                var moveVertexButton = document.getElementById('moveVertexButton');
                // 为按钮添加点击事件监听器
                moveVertexButton.addEventListener('click', function () {
                    // 创建新的几何信息对象
                    var newGeometry = new mxGeometry(150, 20, 80, 30);
                    // 设置顶点的几何信息
                    model.setGeometry(vertex, newGeometry);
                });
            } finally {
                // 结束编辑
                model.endUpdate();
            }
        });
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例和获取模型对象**：创建`mxGraph`实例，然后通过`graph.getModel()`方法获取模型对象。
2. **创建顶点**：使用`graph.insertVertex`方法创建一个顶点。
3. **添加按钮并监听点击事件**：创建一个按钮，为其添加点击事件监听器。在点击事件处理函数中，执行以下操作：
   - 创建一个新的`mxGeometry`对象`newGeometry`，设置顶点的新位置（`x`坐标为 150，`y`坐标为 20）和大小（宽度为 80，高度为 30）。
   - 调用`model.setGeometry`方法，将新的几何信息应用到顶点上。
4. **更新模型**：在修改几何信息前后，使用`model.beginUpdate()`和`model.endUpdate()`方法来确保模型的更新操作被正确处理。

### 应用场景

- **图形布局调整**：在需要动态调整图形元素位置和大小时，可以使用该方法。例如，在流程图中根据用户输入或数据变化，移动节点的位置。
- **动画效果实现**：通过逐步改变图形元素的几何信息，可以实现动画效果，如节点的移动、缩放等。
- **响应式设计**：在不同的屏幕尺寸或用户交互下，调整图形元素的布局，以适应不同的显示需求。
