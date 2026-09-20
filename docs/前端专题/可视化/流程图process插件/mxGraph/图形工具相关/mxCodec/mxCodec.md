# mxCodec

## 目录

- [功能概述](#功能概述)
- [构造函数参数](#构造函数参数)
- [使用场景](#使用场景)
- [示例代码](#示例代码)

在`mxGraph`中，`new mxCodec`用于创建一个`mxCodec`对象。`mxCodec`是一个非常重要的类，**主要用于实现图形数据的序列化和反序列化，也就是将图形数据转换为 XML 格式（序列化）以及将 XML 格式的数据恢复为图形（反序列化）**。以下从功能概述、构造函数参数、使用场景、示例代码以及代码解释等方面详细介绍。

### 功能概述

`mxCodec`类提供了一套机制，能够将`mxGraph`中的图形元素 \*\*（如节点、边）及其相关属性（如位置、样式等）转换为 XML 格式的字符串，方便进行数据的存储和传输。同时，它也可以将 XML 格式的字符串解析并还原为`mxGraph`\*\***中的图形元素，实现图形数据的恢复。**

### 构造函数参数

`mxCodec`构造函数可以接收一个可选参数：

- **`ownerDocument`**：类型为`Document`，可选。**它指定了用于创建 XML 元素的文档对象。**如果不提供该参数**，默认会使用当前的文档对象。**

### 使用场景

- **数据持久化**：将用户在`mxGraph`中绘制的图形保存到本地文件或数据库时，使用`mxCodec`可以将图形数据转换为 XML 格式，方便存储和后续恢复。
- **数据共享**：在不同的用户或系统之间共享图形数据时，将图形数据以 XML 格式传输，接收方可以使用`mxCodec`进行反序列化，恢复出原始的图形。
- **撤销和重做操作**：在实现撤销和重做功能时，可以将每次操作后的图形状态以 XML 格式保存下来，需要撤销或重做时，通过反序列化恢复相应的状态。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxCodec Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <button id="saveButton">Save Graph as XML</button>
    <button id="loadButton">Load Graph from XML</button>
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

            const saveButton = document.getElementById('saveButton');
            saveButton.addEventListener('click', function () {
                const codec = new mxCodec();
                 const node = codec.encode(graph.getModel());
                const xml = mxUtils.getXml(node);
                 console.log('Saved XML:', xml);
            });

            const loadButton = document.getElementById('loadButton');
            loadButton.addEventListener('click', function () {
                const savedXml = '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" value="Node 1" style="shape=rectangle;fillColor=lightblue;strokeColor=black;" vertex="1" parent="1"><mxGeometry x="20" y="20" width="80" height="30" as="geometry"/></mxCell><mxCell id="3" value="Node 2" style="shape=rectangle;fillColor=lightgreen;strokeColor=black;" vertex="1" parent="1"><mxGeometry x="200" y="200" width="80" height="30" as="geometry"/></mxCell><mxCell id="4" value="" style="edgeStyle=orthogonalEdgeStyle;strokeColor=black;" edge="1" parent="1" source="2" target="3"><mxGeometry relative="1" as="geometry"><mxPoint x="100" y="100" as="sourcePoint"/><mxPoint x="150" y="150" as="targetPoint"/></mxGeometry></mxCell></root></mxGraphModel>';
                 const xmlDoc = mxUtils.parseXml(savedXml);
                const codec = new mxCodec(xmlDoc);
                  codec.decode(xmlDoc.documentElement, graph.getModel());
                 graph.refresh();
            });
        }
    </script>
</body>

</html>
```


[dec.decode](dec.decode.md "dec.decode")
