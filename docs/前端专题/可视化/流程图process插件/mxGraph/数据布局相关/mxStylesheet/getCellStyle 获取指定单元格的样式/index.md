# `getCellStyle`获取指定单元格的样式

在`mxGraph`中，`mxStylesheet.prototype.getCellStyle`是`mxStylesheet`原型对象上的一个重要方法，**用于获取指定单元格的样式**。以下将从方法的作用、参数、返回值、实现原理、使用示例等方面进行详细介绍。

### 方法作用

`getCellStyle`方法的主要作用是根据**传入的样式名称和单元格**，从样式表中查找并**返回该单元格对应的样式对象**。样式对象是一个包含了各种样式属性（如形状、颜色、边框等）的键值对集合，这些属性将决定单元格在图形中的外观和行为。

### 方法参数

该方法通常接收两个参数：

- **`style`**：这是一个字符串类型的参数，表示样式的名称。在`mxGraph`中，样式可以通过名称来定义和引用，例如`"defaultVertex"`或`"customStyle"`等。
- **`cell`**：这是一个`mxCell`类型的对象，表示要获取样式的单元格。单元格可以是图形中的节点（顶点）、边等元素。

### 方法返回值

方法返回一个**包含样式属性的对象，该对象是一个键值对的集合，其中键表示样式属性的名称，值表示该属性的具体值。** 例如：

```json 
{
    "shape": "rectangle",
    "fillColor": "lightblue",
    "strokeColor": "black",
    "strokeWidth": 1
}
```


### 实现原理

`getCellStyle`方法的实现通常会按照以下步骤进行：

1. 检查传入的`style`参数是否为`null`或空字符串。如果是，则使用默认样式。
2. 从样式表中查找与`style`名称匹配的样式定义。
3. 如果找到匹配的样式定义，将其属性复制到一个新的对象中。
4. 处理样式的继承关系。样式可以通过继承其他样式来复用属性 **，因此需要递归地合并父样式的属性。**
5. 应用可能的动态样式调整，例如根据单元格的属性或其他条件修改某些样式属性的值。
6. 返回最终的样式对象。

### 使用示例

以下是一个简单的示例，展示了如何使用`getCellStyle`方法：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxGraph getCellStyle Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            // 获取图形容器
            const container = document.getElementById('graphContainer');
            // 创建 mxGraph 实例
            const graph = new mxGraph(container);

            // 获取样式表
            const stylesheet = graph.getStylesheet();

            // 定义一个自定义样式
            const customStyle = {
                "shape": "ellipse",
                "fillColor": "yellow",
                "strokeColor": "red",
                "strokeWidth": 2
            };
            stylesheet.putCellStyle("customStyle", customStyle);

            // 开始更新图形模型
            graph.getModel().beginUpdate();
            try {
                // 获取默认父级单元格
                const parent = graph.getDefaultParent();
                // 插入一个顶点，并应用自定义样式
                const vertex = graph.insertVertex(parent, null, 'Node', 20, 20, 80, 30, "customStyle");

                // 获取该顶点的样式
                const cellStyle = stylesheet.getCellStyle("customStyle", vertex);
                console.log('Cell style:', cellStyle);
            } finally {
                // 结束更新图形模型
                graph.getModel().endUpdate();
            }
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：首先创建一个`mxGraph`实例，并将其关联到一个 HTML 容器上。
2. **定义自定义样式**：通过`getStylesheet`方法获取样式表对象，然后定义一个自定义样式`customStyle`，并使用`putCellStyle`方法将其添加到样式表中。
3. **插入顶点并应用样式**：在图形中插入一个顶点，并将自定义样式名称`"customStyle"`作为参数传递给`insertVertex`方法，以应用该样式。
4. **获取单元格样式**：使用`getCellStyle`方法，传入样式名称和顶点对象，获取该顶点的样式对象，并将其打印到控制台。

通过这种方式，你可以方便地获取和使用`mxGraph`中单元格的样式。
