# xmlCanvas.translate

## 目录

- [方法功能](#方法功能)
- [参数](#参数)
- [使用场景](#使用场景)
- [示例代码](#示例代码)

在`mxGraph`中，`xmlCanvas.translate`是`mxXmlCanvas2D`对象的一个方法，用于**对画布进行平移变换**。下面从方法功能、参数、使用场景、示例代码及代码解释等方面详细介绍。

### 方法功能

`xmlCanvas.translate`方法的主要功能是将**当前画布的坐标系进行平移**。在图形绘制中，坐标系的平移操作可以改变后续绘制图形的起始位置。当调用该方法后，后续所有绘制操作的坐标都会相对于平移后的坐标系进行定位。

### 参数

该方法接收两个参数：

- **`dx`**：类型为`number`，表示在`x`轴方向上的平移量。正值表示向右平移，负值表示向左平移。
- **`dy`**：类型为`number`，表示在`y`轴方向上的平移量。正值表示向下平移，负值表示向上平移。

### 使用场景

- **图形布局调整**：当需要将一组图形整体移动到新的位置时，可以使用`translate`方法平移画布，然后在平移后的坐标系下绘制图形，从而实现图形的整体移动。
- **分层绘制**：在绘制复杂图形时，可能需要将不同层次的图形绘制在不同的位置。通过平移画布，可以方便地控制每层图形的起始位置，使图形布局更加清晰。
- **动画效果**：在实现动画效果时，例如图形的移动动画，可以通过不断改变平移量，实现图形在画布上的移动。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>xmlCanvas.translate Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <button id="drawButton">Draw with Translation</button>
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

                 // 平移画布
                xmlCanvas.translate(50, 50); 

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
