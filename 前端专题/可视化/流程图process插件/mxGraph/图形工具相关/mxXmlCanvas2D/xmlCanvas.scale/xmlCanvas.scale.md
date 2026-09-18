# xmlCanvas.scale

## 目录

- [方法功能](#方法功能)
- [参数](#参数)
- [使用场景](#使用场景)
- [对xmlCanvas.scale(1)的分析](#对xmlCanvasscale1的分析)
- [代码解释](#代码解释)

在`mxGraph`中，`xmlCanvas.scale(1)`是`mxXmlCanvas2D`对象的一个方法调用，`scale`方法用于对画布进行缩放变换。下面详细介绍`scale`方法的相关信息，包括功能、参数、使用场景、对`xmlCanvas.scale(1)`的具体分析以及示例代码。

### 方法功能

`scale`方法的主要功能是对当前`xmlCanvas`画布的坐标系进行缩放操作。缩放操作会影响后续在该画布上绘制的所有图形元素的大小。通过调整缩放比例，可以将图形放大或缩小显示。

### 参数

`scale`方法通常可以接收一个或两个参数：

- **单参数形式**：`scale(s)`
  - **`s`**：类型为`number`，表示在`x`轴和`y`轴方向上的统一缩放比例。例如，`s`为 2 时，图形会在`x`轴和`y`轴方向上都放大为原来的 2 倍；`s`为 0.5 时，图形会缩小为原来的一半。
- **双参数形式**：`scale(sx, sy)`
  - **`sx`**：类型为`number`，表示在`x`轴方向上的缩放比例。
  - **`sy`**：类型为`number`，表示在`y`轴方向上的缩放比例。使用双参数形式可以实现不同方向上的非均匀缩放。

### 使用场景

- **图形放大缩小**：在需要对图形进行整体放大或缩小展示时，可以使用`scale`方法。例如，在查看详细图形时放大，在查看整体布局时缩小。
- **图形变形**：通过设置不同的`sx`和`sy`值，可以实现图形的拉伸或压缩效果，从而改变图形的形状。
- **适配不同尺寸**：当需要将图形适配到不同大小的显示区域时，可以通过缩放操作调整图形的大小。

### 对`xmlCanvas.scale(1)`的分析

`xmlCanvas.scale(1)`调用中，传入的缩放比例为 1。这意味着在`x`轴和`y`轴方向上的缩放比例都是 1，即不进行任何缩放操作。图形会按照原始的大小进行绘制，调用这个方法本身不会改变图形的外观，但在某些情况下，可能是为了重置之前设置的缩放效果，或者是在代码逻辑中预留后续可能的缩放调整。

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>xmlCanvas.scale Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <button id="drawButton">Draw with Scaling</button>
    <pre id="xmlOutput"></pre>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const drawButton = document.getElementById('drawButton');
            const xmlOutput = document.getElementById('xmlOutput');

            drawButton.addEventListener('click', function () {
                // 创建一个新的 XML 画布对象
                const xmlCanvas = new mxXmlCanvas2D();

                // 开始绘制操作
                xmlCanvas.begin();

                // 先进行放大缩放
                xmlCanvas.scale(2);

                // 绘制一个矩形
                xmlCanvas.setFillColor('lightblue');
                xmlCanvas.setStrokeColor('black');
                xmlCanvas.rect(20, 20, 100, 50);
                xmlCanvas.fillAndStroke();

                // 重置缩放为原始大小
                xmlCanvas.scale(0.5);

                // 再绘制一个矩形，此时恢复原始大小
                xmlCanvas.translate(250, 0);
                xmlCanvas.rect(20, 20, 100, 50);
                xmlCanvas.fillAndStroke();

                // 结束绘制操作
                xmlCanvas.end();

                // 获取生成的 XML 数据
                const xmlData = xmlCanvas.getXml();

                // 将 XML 数据显示在页面上
                xmlOutput.textContent = mxUtils.getPrettyXml(xmlData);
            });
        }
    </script>
</body>

</html>
```


### 代码解释

1. **HTML 结构**：创建一个按钮用于触发绘制操作，以及一个`<pre>`元素用于显示生成的 XML 数据。
2. **创建**\*\*`mxXmlCanvas2D`\*\***对象**：在按钮的点击事件处理函数中，使用`new mxXmlCanvas2D()`创建一个新的 XML 画布对象。
3. **缩放并绘制图形**：
   - 调用`xmlCanvas.scale(2)`将画布在`x`轴和`y`轴方向上都放大为原来的 2 倍，然后绘制一个矩形。
   - 调用`xmlCanvas.scale(0.5)`进行反向缩放，将画布恢复到原始大小，再绘制一个矩形。
4. **结束绘制并显示 XML 数据**：调用`xmlCanvas.end()`结束绘制操作，使用`xmlCanvas.getXml()`方法获取生成的 XML 数据，再使用`mxUtils.getPrettyXml()`方法将 XML 数据格式化，最后将其显示在页面上。

通过`scale`方法，可以方便地对画布上的图形进行缩放操作，实现不同的视觉效果。
