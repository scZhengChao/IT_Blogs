# imgExport.drawState

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`中，`imgExport.drawState`是`mxImageExport`类的一个重要方法，用于将`mxGraph`的**图形状态绘制到指定的 XML 元素中**，以便后续导出为图像。以下从功能概述、参数、使用场景、示例代码及代码解释几个方面详细介绍。

### 功能概述

`drawState`方法的主要功能是将`mxGraph`中**特定单元格状态（通常是整个图形的根单元格状态）的图形信息绘制到一个 XML 元素里。这个 XML 元素可以进一步转换为图像数据**，**从而实现图形的导出功能。该方法会遍历图形中的所有节点和边，将它们的样式、位置等信息转换为 XML 格式的描述。**

### 参数

`drawState`方法通常接收以下几个参数：

- **`state`**：类型为`mxCellState`，**表示要绘制的单元格状态。一般传**入`graph.getView().getState(graph.model.root)`来获取整个图形的根单元格状态，这样可以绘制出整个图形。
- **`node`**：类型为`Element`，**是一个 XML 元素，用于存储绘制的图形信息**。通常会先创建一个 XML 文档，然后创建一个根元素，将其作为该参数传入。
- **`scale`**：类型为`number`，表示绘制时的缩放比例。可以使用`graph.view.scale`获取当前图形的缩放比例，确保导出的图像与当前显示的图形比例一致。
- **`dx`**：类型为`number`，表示在`x`轴方向上的平移量。一般使用`-graph.view.translate.x`来获取，用于处理图形的平移。
- **`dy`**：类型为`number`，表示在`y`轴方向上的平移量。通常使用`-graph.view.translate.y`来获取。

### 使用场景

- **图像导出**：当需要将`mxGraph`中的图形导出为图像（如 PNG、JPEG 等）时，`drawState`方法是关键步骤，它将图形信息转换为可用于生成图像的 XML 数据。
- **数据备份与分享**：将图形状态以 XML 格式保存下来，方便后续恢复图形或与其他系统进行数据分享。
- **打印功能**：在实现图形打印功能时，可以先使用`drawState`方法将图形转换为 XML 数据，再进一步处理为适合打印的格式。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>imgExport.drawState Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <button id="exportButton">Export to Image</button>
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

            const exportButton = document.getElementById('exportButton');
            exportButton.addEventListener('click', function () {
                const imgExport = new mxImageExport();
                const state = graph.getView().getState(graph.model.root);
                const scale = graph.view.scale;
                const dx = -graph.view.translate.x;
                const dy = -graph.view.translate.y;

                const xmlDoc = mxUtils.createXmlDocument();
                const root = xmlDoc.createElement('output');
                xmlDoc.appendChild(root);

                imgExport.drawState(state, root, scale, dx, dy);

                 const xml = mxUtils.getXml(root);
                const img = new Image();
                img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(xml)));

                 const a = document.createElement('a');
                a.href = img.src;
                a.download = 'graph_image.png';
                a.click();
            });
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例并插入图形元素**：创建一个`mxGraph`实例并关联到 HTML 容器上，然后插入两个节点和一条连接它们的边。
2. **添加导出按钮**：在页面上添加一个按钮，用于触发图像导出操作。
3. **导出图像**：
   - 当用户点击按钮时，创建一个`mxImageExport`对象。
   - 获取整个图形的根单元格状态、缩放比例以及`x`、`y`方向的平移量。
   - 创建一个 XML 文档，并添加一个根元素。
   - 调用`imgExport.drawState`方法，将图形状态绘制到 XML 根元素中。
   - 将 XML 数据转换为 Base64 编码的 SVG 图像数据。
   - 创建一个`<img>`元素并设置其`src`属性为 SVG 图像数据。
   - 创建一个`<a>`元素，设置其`href`属性为图像数据，`download`属性为文件名，然后模拟点击该元素，实现图像的下载。

通过`imgExport.drawState`方法，开发者可以方便地将`mxGraph`中的图形信息转换为 XML 数据，进而实现图像的导出。
