# 序列化和反序列化

为了把本地的`JavaScript`对象**保存到服务器或者从服务器恢复**到JavaScript对象，我们需要**序列化和反序列化**。mxGraph还是使用古董级的XML的方案。

我们可以使用下面的代码把整个图(包括图的样式和UserObject)都**序列化成XML**，这样我们可以通过Ajax请求把它保存到服务器上：

```javascript 
var encoder = new mxCodec();
    var result = encoder.encode(graph.getModel());
    var xmlString = mxUtils.getXml(result);

```


保存到服务器后我们随时可以再把它取下来，然后**反序列化重新加载Graph**：

```javascript 
var doc = mxUtils.parseXml(xmlString);
    var codec = new mxCodec(doc);
    codec.decode(doc.documentElement, graph.getModel());

```
