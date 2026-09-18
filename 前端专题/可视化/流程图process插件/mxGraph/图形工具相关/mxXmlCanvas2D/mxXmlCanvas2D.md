# mxXmlCanvas2D

## 目录

- [功能概述](#功能概述)
- [构造函数参数](#构造函数参数)
- [使用场景](#使用场景)
- [示例代码](#示例代码)

在`mxGraph`中，`new mxXmlCanvas2D`用于创建一个基于 XML 的二维画布对象，这个对象可以将**图形元素以 XML 的形式进行渲染和表示**。下面从功能概述、构造函数参数、使用场景、示例代码以及代码解释等方面详细介绍。

### 功能概述

`mxXmlCanvas2D`是`mxGraph`里用于生成 XML 格式图形表示的画布类。它继承自`mxAbstractCanvas2D`，可以处理各种绘图操作，如绘制矩形、圆形、线条等，并将这些操作转换为对应的 XML 元素。通过使用`mxXmlCanvas2D`，可以将图形以结构化的 XML 数据保存下来，方便后续的存储、传输和处理。

### 构造函数参数

`mxXmlCanvas2D`的构造函数通常接收一个可选的参数：

- **`root`**：类型为`Element`或`Document`，可选。**它是 XML 文档的根元素，如果提供了这个参数，生成的 XML 元素会被添加到该根元素下；如果不提供，会自动创建一个新的根元素。**

### 使用场景

- **数据保存与恢复**：将绘制的图形以 XML 格式保存到文件或数据库中，后续可以根据这些 XML 数据重新绘制图形，实现图形的持久化存储和恢复。
- **数据交换**：在不同的系统或模块之间交换图形数据时，XML 是一种通用且易于解析的格式，使用`mxXmlCanvas2D`可以方便地将图形转换为 XML 进行传输。
- **打印和导出**：在需要将图形导出为特定格式（如 SVG 等基于 XML 的格式）时，可以利用`mxXmlCanvas2D`生成的 XML 数据进行进一步的转换和处理。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxXmlCanvas2D Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <button id="generateXmlButton">Generate XML</button>
    <pre id="xmlOutput"></pre>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const generateXmlButton = document.getElementById('generateXmlButton');
            const xmlOutput = document.getElementById('xmlOutput');

            generateXmlButton.addEventListener('click', function () {
                // 创建一个新的 XML 画布对象
                const xmlCanvas = new mxXmlCanvas2D();

                // 开始绘制操作
                xmlCanvas.begin();

                // 绘制一个矩形
                xmlCanvas.setFillColor('lightblue');
                xmlCanvas.setStrokeColor('black');
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


1. **HTML 结构**：创建一个按钮用于触发生成 XML 的操作，以及一个`<pre>`元素用于显示生成的 XML 数据。
2. **创建**\*\*`mxXmlCanvas2D`\*\***对象**：在按钮的点击事件处理函数中，使用`new mxXmlCanvas2D()`创建一个新的 XML 画布对象。
3. **绘制图形**：
   - 调用`xmlCanvas.begin()`开始绘制操作。
   - 设置填充颜色和边框颜色，然后使用`xmlCanvas.rect()`方法绘制一个矩形，并调用`xmlCanvas.fillAndStroke()`填充并绘制边框。
   - 调用`xmlCanvas.end()`结束绘制操作。
4. **获取并显示 XML 数据**：使用`xmlCanvas.getXml()`方法获取生成的 XML 数据，再使用`mxUtils.getPrettyXml()`方法将 XML 数据格式化，最后将其显示在页面上。

通过`mxXmlCanvas2D`，可以方便地将图形绘制操作转换为 XML 数据，实现图形的结构化存储和处理。

[xmlCanvas.translate](xmlCanvas.translate.md "xmlCanvas.translate")

[xmlCanvas.scale](xmlCanvas.scale.md "xmlCanvas.scale")
