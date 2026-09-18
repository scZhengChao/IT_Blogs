# 导出xml

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [返回值](#返回值)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
  - [代码解释](#代码解释)

```javascript 
import FileSaver from 'file-saver';

exportFile() {
  const xml = graph.exportModelXML();
  const blob = new Blob([xml], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, "pocket_monster.xml");
},
```


在`mxGraph`中，`graph.exportModelXML`方法用于将当前`mxGraph`实例中的图形模型数据导出为 XML 格式。以下将详细介绍该方法的相关信息。

### 功能概述

`graph.exportModelXML`方法的核心功能是把`mxGraph`中所包含的图形元素（如节点、边）及其相关属性（如位置、样式等）转换为 XML 字符串。这个 XML 字符串可以用于保存图形数据，以便后续恢复图形，也可以用于在不同系统之间共享图形信息。

### 参数

该方法通常不接收任何参数。它直接对调用它的`mxGraph`实例中的图形模型进行操作。

### 返回值

返回一个`string`类型的 XML 字符串，该字符串包含了当前`mxGraph`中所有图形元素的详细信息，如节点的位置、标签、样式，边的连接关系、样式等。

### 使用场景

- **数据保存**：用户在`mxGraph`中绘制了复杂的图形后，通过调用`exportModelXML`方法将图形数据保存为 XML 文件，方便后续再次打开时恢复图形。
- **数据共享**：在多个用户或系统之间共享图形时，可以将图形数据以 XML 格式导出，接收方再使用相应的导入方法（如`importModelXML`）将其导入到自己的`mxGraph`中。
- **数据备份**：定期对`mxGraph`中的图形数据进行备份，以防止数据丢失。

# 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>graph.exportModelXML Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <button id="exportButton">Export to XML</button>
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
                const xmlData = graph.exportModelXML();
                console.log('Exported XML data:', xmlData);

                // 以下代码可将 XML 数据保存为文件
                const blob = new Blob([xmlData], { type: 'text/xml' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'graph_data.xml';
                a.click();
                URL.revokeObjectURL(url);
            });
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例并添加图形元素**：创建一个`mxGraph`实例并关联到 HTML 容器上，然后插入两个节点和一条连接它们的边。
2. **添加导出按钮**：在页面上添加一个按钮，用于触发导出操作。
3. **导出 XML 数据**：当用户点击按钮时，调用`graph.exportModelXML`方法将图形模型数据导出为 XML 字符串，并将其输出到控制台。
4. **保存为文件**：使用`Blob`对象将 XML 字符串转换为二进制数据，创建一个临时的 URL，然后创建一个`<a>`元素并模拟点击操作，将 XML 数据保存为`graph_data.xml`文件。最后，释放临时 URL 以避免内存泄漏。

通过`graph.exportModelXML`方法，开发者可以方便地将`mxGraph`中的图形数据导出为 XML 格式，实现数据的保存、共享和备份等功能。
