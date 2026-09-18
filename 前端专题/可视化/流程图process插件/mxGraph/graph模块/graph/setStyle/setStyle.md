# setStyle

## 目录

- [方法功能](#方法功能)
- [参数](#参数)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`中，`graph.setStyle`方法主要用于设置单元格（如节点、边）的样式。下面从方法的功能、参数、使用场景、示例代码以及代码解释等方面进行详细介绍。

### 方法功能

`graph.setStyle`方法允许开发者动态地修改图形中某个单元格的样式。样式可以控制单元格的外观，例如颜色、边框、字体等，通过设置不同的样式，可以让图形中的元素呈现出不同的视觉效果。

### 参数

该方法通常接收两个参数：

- **`cell`**：类型为`mxCell`，表示要设置样式的单元格对象。可以是通过`graph.insertVertex`或`graph.insertEdge`等方法创建的顶点或边。
- **`style`**：类型为`string`，表示要应用到单元格的样式字符串。样式字符串是由一系列样式属性和值组成，不同属性之间用分号分隔。例如，`'fillColor=red;strokeColor=blue'`表示设置单元格的填充颜色为红色，边框颜色为蓝色。

### 使用场景

- **突出显示特定单元格**：当需要强调某些重要的节点或边时，可以通过设置特殊的样式来突出显示它们，比如将重要节点的填充颜色设置为醒目的颜色。
- **根据数据状态改变样式**：根据单元格关联的数据状态动态调整样式。例如，在流程图中，如果某个节点代表的任务已完成，可以将其边框颜色设置为绿色；如果未完成，则设置为红色。
- **实现主题切换**：在不同的主题下，为单元格应用不同的样式，以实现图形的主题切换功能。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>graph.setStyle Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            graph.getModel().beginUpdate();
            try {
                const parent = graph.getDefaultParent();
                // 插入一个顶点
                const vertex = graph.insertVertex(parent, null, 'Sample Node', 20, 20, 80, 30);

                // 设置顶点的样式
                const newStyle = 'fillColor=yellow;strokeColor=black;strokeWidth=2';
                graph.setStyle(vertex, newStyle);
            } finally {
                graph.getModel().endUpdate();
            }
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：创建一个`mxGraph`实例，并将其关联到 HTML 页面中的一个容器元素上。
2. **插入顶点**：使用`graph.insertVertex`方法插入一个顶点，该顶点的初始样式为默认样式。
3. **设置样式**：定义一个新的样式字符串`newStyle`，包含填充颜色、边框颜色和边框宽度等属性。然后使用`graph.setStyle`方法将这个新样式应用到之前插入的顶点上。
4. **更新模型**：在对图形模型进行修改（如插入顶点、设置样式）时，需要使用`graph.getModel().beginUpdate()`和`graph.getModel().endUpdate()`来包裹这些操作，以确保模型的一致性。

通过`graph.setStyle`方法，开发者可以灵活地控制图形中单元格的样式，从而实现多样化的视觉效果。
