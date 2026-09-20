# 导出图片

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
