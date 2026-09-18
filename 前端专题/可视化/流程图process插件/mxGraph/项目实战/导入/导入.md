# 导入

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [返回值](#返回值)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
  - [代码解释](#代码解释)

```javascript 
const file = evt.target.files[0];
const reader = new FileReader();
reader.onload = (e) => {
  const txt = e.target.result;
  graph.importModelXML(txt);
};
reader.readAsText(file);
```


在`mxGraph`里，`importModelXML`是一个用于将 XML 格式的数据导入到`mxGraph`模型中的方法。下面从功能概述、参数、返回值、使用场景、示例代码及代码解释等方面进行详细介绍。

### 功能概述

`importModelXML`方法的主要功能是将包含图形模型信息的 XML 数据解析并导入到`mxGraph`实例中，从而在图形界面上显示出对应的图形。XML 数据可以包含节点、边的信息，以及它们的位置、样式等属性，通过这个方法可以方便地实现图形的导入和恢复。

### 参数

该方法通常接收一个参数：

- **`xml`**：类型为`string`或者`Document`，表示要导入的 XML 数据。如果是字符串类型，需要是符合`mxGraph`模型 XML 格式的字符串；如果是`Document`类型，则是已经解析好的 XML 文档对象。

### 返回值

该方法返回一个`mxCell`对象，它代表导入的 XML 数据所对应的根单元格。通过这个根单元格，可以进一步访问和操作导入的图形元素。

### 使用场景

- **数据恢复**：当需要从保存的 XML 文件中恢复之前绘制的图形时，可以使用`importModelXML`方法将 XML 数据重新导入到`mxGraph`中。
- **数据共享**：在不同的系统或用户之间共享图形数据时，可以将图形以 XML 格式导出，然后在其他地方使用`importModelXML`方法导入。
- **模板加载**：预先定义一些图形模板，以 XML 格式保存，在需要时使用该方法将模板导入到图形中，快速创建相似的图形结构。

# 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>importModelXML Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <button id="importButton">Import XML</button>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            const importButton = document.getElementById('importButton');
            importButton.addEventListener('click', function () {
                // 示例 XML 数据
                const xmlData = `
<mxGraphModel>
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>
    <mxCell id="2" value="Node 1" style="shape=rectangle;fillColor=lightblue;strokeColor=black;" vertex="1" parent="1">
      <mxGeometry x="20" y="20" width="80" height="30" as="geometry"/>
    </mxCell>
    <mxCell id="3" value="Node 2" style="shape=rectangle;fillColor=lightgreen;strokeColor=black;" vertex="1" parent="1">
      <mxGeometry x="200" y="200" width="80" height="30" as="geometry"/>
    </mxCell>
    <mxCell id="4" value="" style="edgeStyle=orthogonalEdgeStyle;strokeColor=black;" edge="1" parent="1" source="2" target="3">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="100" y="100" as="sourcePoint"/>
        <mxPoint x="150" y="150" as="targetPoint"/>
      </mxGeometry>
    </mxCell>
  </root>
</mxGraphModel>
                `;

                const xmlDoc = mxUtils.parseXml(xmlData);
                const rootCell = graph.getModel().importModelXML(xmlDoc);
                graph.refresh();
            });
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：创建一个`mxGraph`实例并关联到 HTML 页面的容器元素上。
2. **添加导入按钮**：在页面上添加一个按钮，用于触发导入操作。
3. **定义示例 XML 数据**：定义一个包含节点和边信息的 XML 字符串。
4. **解析 XML 数据**：使用`mxUtils.parseXml`方法将 XML 字符串解析为`Document`对象。
5. **导入 XML 数据**：调用`graph.getModel().importModelXML`方法将解析后的 XML 文档导入到`mxGraph`模型中，返回根单元格。
6. **刷新图形**：调用`graph.refresh()`方法刷新图形界面，使导入的图形显示出来。

通过`importModelXML`方法，可以方便地将 XML 格式的图形数据导入到`mxGraph`中，实现图形的快速恢复和共享。
