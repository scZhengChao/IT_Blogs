# mxImageExport

## 目录

- [功能概述](#功能概述)
- [构造函数参数](#构造函数参数)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`里，`new mxImageExport`用于创建一个`mxImageExport`对象，该对象可将`mxGraph`**中的图形导出为图像**。下面从功能概述、构造函数参数、使用场景、示例代码以及代码解释等方面详细介绍。

### 功能概述

`mxImageExport`是`mxGraph`提供的一个用于图像导出的类。它能够把`mxGraph`中**绘制的图形元素（包括节点、边等）转换为图像数据，支持多种图像格式**，如 PNG、JPEG 等。借助这个类，开发者可以方便地将图形保存为图像文件，用于打印、分享或者存档。

### 构造函数参数

`mxImageExport`构造函数通常不接收任何参数。其定义如下：

```javascript 
const imageExport = new mxImageExport();
```


创建实例后，可使用该实例的方法来完成图像导出操作。

### 使用场景

- **图形保存**：用户在`mxGraph`中绘制了复杂的流程图、组织结构图等图形后，需要将其保存为图像文件，方便后续查看和使用。
- **打印输出**：在需要将图形打印出来时，可先将图形导出为图像，再通过打印工具进行打印。
- **数据分享**：将图形以图像的形式分享给其他用户或系统，便于信息的传播和交流。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxImageExport Example</title>
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
                const imageExport = new mxImageExport();
                const bounds = graph.getGraphBounds();
                const scale = graph.view.scale;
                const dx = -graph.view.translate.x;
                const dy = -graph.view.translate.y;

                const xmlDoc = mxUtils.createXmlDocument();
                const root = xmlDoc.createElement('output');
                xmlDoc.appendChild(root);

                imageExport.drawState(graph.getView().getState(graph.model.root), root, scale, dx, dy);

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
   - 获取图形的边界框、缩放比例以及平移量。
   - 创建一个 XML 文档，并添加一个根元素。
   - 调用`imageExport.drawState`方法将**图形状态绘制到 XML 根**元素中。
   - 将 XML 数据转换为 Base64 编码的 SVG 图像数据。
   - 创建一个`<img>`元素并设置其`src`属性为 SVG 图像数据。
   - 创建一个`<a>`元素，设置其`href`属性为图像数据，`download`属性为文件名，然后模拟点击该元素，实现图像的下载。

通过`mxImageExport`对象，开发者可以方便地将`mxGraph`中的图形导出为图像文件。

[imgExport.drawState](imgExport.drawState.md "imgExport.drawState")
