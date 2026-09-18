# dec.decode

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [返回值](#返回值)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`中，`dec.decode`指的是`mxCodec`类实例的`decode`方法，它主要\*\*用于将 XML 数据反序列化为`mxGraph`中的图形模型。\*\*以下从功能概述、参数、返回值、使用场景、示例代码以及代码解释等方面详细介绍该方法。

### 功能概述

`decode`方法的核心功能\*\*是把 XML 格式的数据解析并转换为`mxGraph`能够理解和展示的图形模型。\*\*当你将图形数据以 XML 格式保存（例如通过`mxCodec`的`encode`方法）后，后续需要重新加载这些图形时，就可以使用`decode`方法将 XML 数据恢复到`mxGraph`中。

### 参数

`decode`方法通常接收两个参数：

- **`node`**：类型为`Element`或`Document`，表示**要解析的 XML 节点或文档。一般是 XML 文档的根元素，** 它包含了图形模型的所有信息。
- **`into`**：类型为`mxGraphModel`，**表示要将解析后的数据加载到的目标图形模型**。通常传入`graph.getModel()`来\*\*获取当前`mxGraph`\*\***的模型对象。**

### 返回值

该方法没有返回值。它直接将解析后的图形数据加载到传入的`mxGraphModel`对象中，更新图形模型的状态。

### 使用场景

- **数据恢复**：当用户需要重新加载之前保存的图形时，使用`decode`方法将保存的 XML 数据恢复到`mxGraph`中，实现图形的还原。
- **数据共享**：在不同的系统或用户之间共享图形数据时，接收方可以使用`decode`方法将接收到的 XML 数据转换为自己的`mxGraph`图形。
- **模板加载**：预先定义一些图形模板并保存为 XML 文件，在需要使用这些模板时，通过`decode`方法将模板数据加载到`mxGraph`中。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dec.decode Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <button id="loadButton">Load Graph from XML</button>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            const loadButton = document.getElementById('loadButton');
            loadButton.addEventListener('click', function () {
                // 示例 XML 数据
                const xmlData = '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" value="Node 1" style="shape=rectangle;fillColor=lightblue;strokeColor=black;" vertex="1" parent="1"><mxGeometry x="20" y="20" width="80" height="30" as="geometry"/></mxCell><mxCell id="3" value="Node 2" style="shape=rectangle;fillColor=lightgreen;strokeColor=black;" vertex="1" parent="1"><mxGeometry x="200" y="200" width="80" height="30" as="geometry"/></mxCell><mxCell id="4" value="" style="edgeStyle=orthogonalEdgeStyle;strokeColor=black;" edge="1" parent="1" source="2" target="3"><mxGeometry relative="1" as="geometry"><mxPoint x="100" y="100" as="sourcePoint"/><mxPoint x="150" y="150" as="targetPoint"/></mxGeometry></mxCell></root></mxGraphModel>';
                const xmlDoc = mxUtils.parseXml(xmlData);

                const dec = new mxCodec(xmlDoc);
                dec.decode(xmlDoc.documentElement, graph.getModel());
                graph.refresh();
            });
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：创建一个`mxGraph`实例并关联到 HTML 容器上。
2. **添加加载按钮**：在页面上添加一个按钮，用于触发从 XML 加载图形的操作。
3. **定义示例 XML 数据**：定义一个包含图形信息的 XML 字符串。
4. **解析 XML 数据**：使用`mxUtils.parseXml`方法将 XML 字符串解析为`Document`对象。
5. **创建**\*\*`mxCodec`\*\***实例并解码**：创建一个`mxCodec`对象，并传入解析后的`Document`对象。调用`dec.decode(xmlDoc.documentElement, graph.getModel())`方法将 XML 数据解码并加载到`mxGraph`的模型中。
6. **刷新图形界面**：调用`graph.refresh()`方法刷新图形界面，使加载的图形显示出来。

通过`decode`方法，可以方便地将 XML 格式的图形数据恢复到`mxGraph`中，实现图形的重新加载和展示。
