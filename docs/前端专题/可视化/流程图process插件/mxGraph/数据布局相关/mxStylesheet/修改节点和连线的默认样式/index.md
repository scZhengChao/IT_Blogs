# 修改节点和连线的默认样式

&#x20; cell 的样式由样式表（`mxStylesheet`的实例）来决定。样式表**规定了样式名称到样式之间的映射关系。** 一个样式是一个键的数组。那些键对应所用 cell 的值。值在 mxConstants 中定义，可以是字符串和数字、javascript 对象、函数等 。 修改节点和连线的默认样式：

```javascript 
var vertexStyle = graph.getStylesheet().getDefaultVertexStyle();
vertexStyle[mxConstants.ROUNDED] = true;
var edgeStyle = graph.getStylesheet().getDefaultEdgeStyle();
edgeStyle[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;
```
