# 导出图片

mxGraph 导出图片的思路是先在前端导出图形的 xml 及计算图形的宽高，然后将 xml、宽、高，这有三项数据发送给服务端，服务端也使用 mxGraph 提供的 API 将 xml 转换成图片。服务端如果是使用 Java 可以参考官方这个[例子](https://link.segmentfault.com/?enc=Ot7IHr9SKm4tdaa/9kd1jg==.wz3MMK5W+lFLP/ymbUzBuqzFamQC690voDky1TDkE5mXd558PTvC2Hu9W/dVbVyWxc0OkAQrMc7f0wrDDbWA/CEKcmBUsky9wK94ddm4qK9Ba+XMHrlDl+6a9lI0LE4a "例子")，下面主要介绍前端需要做的工作。

导出图片可以使用[mxImageExport](https://link.segmentfault.com/?enc=vmNTgh2coaHQ+TCb+OVxBg==.i/jb+Wi4+ZiRga3XNfGghrlecKKH4eQw2oj7bEl3wVWdjcyhSKImYwNpZ1rT+exATu9uCMZ3dF0KW5btS+eLiBRHiRmqyjLtVz1fQlu+iAYxvhmUL4kz8lpKWO+Oa905RqyCUVREdkG6ZSN4NkC6mA== "mxImageExport")类，该类的文档有一段可以直接拿来使用的代码。

```javascript 
// ...
var xmlCanvas = new mxXmlCanvas2D(root);
var imgExport = new mxImageExport();
imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);

var bounds = graph.getGraphBounds();
var w = Math.ceil(bounds.x + bounds.width);
var h = Math.ceil(bounds.y + bounds.height);

var xml = mxUtils.getXml(root);
// ...
```


但这段代码会**将整块画布截图，而不是以最左上角的元素及最右下角的元素作为边界截图**。如果你有以元素作为边界的需求，则需要调用[xmlCanvas.translate](https://link.segmentfault.com/?enc=u+GHK7A4aMylaEHDQMxwrQ==.z4dTp8M3ZF1a0244lmcKT1LxT7XE+MrofwWbTRy0YStwbHn8Id99Jpb4yNuMSHX7zXhnFZVXPsT+2II2bGXJlWqsVBd6lQtZf411W0OnkE313/sJnSNycGQh8UOx6CID8Xi4ajUwQ/b76cWQjHXbgQ== "xmlCanvas.translate")调整裁图边界。

```javascript 
//.....
var xmlCanvas = new mxXmlCanvas2D(root);
xmlCanvas.translate(
      Math.floor((border / scale - bounds.x) / scale),
      Math.floor((border / scale - bounds.y) / scale),
    );
//.....
```


完整截图代码可以参考本项目[Graph](https://link.segmentfault.com/?enc=pq5nNt91I0rRFpRr/jkDhw==.BkJBqUM4BgraCJcKhz9HIm8BzXOpCzEItPnshzLAkeoEoGm/KMxqrjZb3RuvD9yKBMec81oGQ6xxThyw20RQaM5v2alr5Pm//ttXEjSJp18= "Graph")类的 exportPicXML 方法。

```typescript 
exportPicXML() {
    const xmlDoc = mxUtils.createXmlDocument();
    const root = xmlDoc.createElement('output');
    xmlDoc.appendChild(root);

    const { scale } = this.view;
    // 这个项目画布边宽为0，可以自行进行调整
    const border = 0;

    const bounds = this.getGraphBounds();
    const xmlCanvas = new mxXmlCanvas2D(root);
    xmlCanvas.translate(
      Math.floor((border / scale - bounds.x) / scale),
      Math.floor((border / scale - bounds.y) / scale),
    );
    xmlCanvas.scale(1);

    const imgExport = new mxImageExport();
    imgExport.drawState(this.getView().getState(this.model.root), xmlCanvas);

    const w = Math.ceil(bounds.width * scale / scale + 2 * border);
    const h = Math.ceil(bounds.height * scale / scale + 2 * border);

    const xml = mxUtils.getPrettyXml(root);

    return {
      xml,
      w,
      h,
    };
  }
```


如果节点像**我的项目一样使用到图片，而导出来的图片的节点没有图片。** 可以从两个方向排查问题，**先检查发送的 xml 里的图片路径是否是可访问的，如下面是项目“导出图片”功能打印的 xml 里的一个图片标签。**

```xml 
<image x="484" y="123" w="72" h="72" src="http://localhost:7777/static/images/ele/ele-005.png" aspect="0" flipH="0" flipV="0"/>
```


要保证`http://localhost:7777/static/images/ele/ele-005.png`是可访问的。**如果图片路径没问题再检查一下使用的图片**格式，本来我在公司项目中节点内使用的图片是 svg 格式，导出图片失败，可能是 mxGraph 不支持这个格式，后来换成 png 之后问题就解决了。

还有就是如果导出的图片里的节点的某些颜色跟设置的有差异，**那可能是设置样式时写了3位数的颜色像**\*\*`#fff`，颜色一定要使用完整的6位，否则导出图片会有问题。\*\*​
