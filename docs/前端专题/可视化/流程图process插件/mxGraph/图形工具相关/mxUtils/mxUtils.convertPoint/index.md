# mxUtils.convertPoint

## 目录

- [方法功能概述](#方法功能概述)
- [方法参数](#方法参数)
- [方法返回值](#方法返回值)
- [代码示例](#代码示例)
- [代码解释](#代码解释)
- [使用场景](#使用场景)

在`mxGraph`中，`mxUtils.convertPoint`是一个非常实用的工具方法，主要用于将一个点的坐标从一个坐标系转换到另一个坐标系。下面为你详细介绍该方法的相关信息。

### 方法功能概述

在图形绘制和交互的场景中，经常会涉及到不同坐标系之间的转换。例如 **，鼠标事件返回的坐标通常是相对于浏览器视口的**，而在`mxGraph`中，**图形元素的位置是相对于图形容器**的。`mxUtils.convertPoint`方法可以帮助我们**将鼠标事件的坐标转换为图形容器内的坐标，从而准确地定位和操作图形元素。**

### 方法参数

`mxUtils.convertPoint`方法的语法如下：

```javascript 
mxUtils.convertPoint(target, x, y);
```


- **`target`**：必需参数，是一个 HTML 元素对象。该元素代表目标坐标系的容器，通常是`mxGraph`的图形容器元素。方法会将传入的坐标转换为相对于这个目标元素的坐标。
- **`x`**：必需参数，是一个数字类型的值，表示要转换的点的水平坐标。
- **`y`**：必需参数，是一个数字类型的值，表示要转换的点的垂直坐标。

### 方法返回值

该方法返回一个包含`x`和`y`属性的对象，这两个属性分别表示转换后的点在目标坐标系中的水平和垂直坐标。

### 代码示例

以下是一个简单的示例，展示了如何使用`mxUtils.convertPoint`方法将鼠标点击的坐标转换为图形容器内的坐标：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxUtils.convertPoint Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black; margin: 20px;">
    </div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            // 获取图形容器
            const container = document.getElementById('graphContainer');
            // 创建 mxGraph 实例
            const graph = new mxGraph(container);

            // 为图形容器添加点击事件监听器
            container.addEventListener('click', function (event) {
                // 获取鼠标点击的原始坐标（相对于浏览器视口）
                const clientX = event.clientX;
                const clientY = event.clientY;

                // 使用 mxUtils.convertPoint 方法将坐标转换为相对于图形容器的坐标
                const convertedPoint = mxUtils.convertPoint(container, clientX, clientY);

                // 打印转换后的坐标
                console.log('Converted coordinates:', convertedPoint.x, convertedPoint.y);

                // 在转换后的位置插入一个顶点
                const parent = graph.getDefaultParent();
                graph.getModel().beginUpdate();
                try {
                    graph.insertVertex(parent, null, 'Clicked Node', convertedPoint.x, convertedPoint.y, 80, 30);
                } finally {
                    graph.getModel().endUpdate();
                }
            });
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：首先创建了一个`mxGraph`实例，并将其关联到一个 HTML 容器上。
2. **添加点击事件监听器**：为图形容器添加了一个点击事件监听器，当用户点击图形容器时，会触发该事件。
3. **获取鼠标点击的原始坐标**：在事件处理函数中，使用`event.clientX`和`event.clientY`获取鼠标点击的原始坐标，这些坐标是相对于浏览器视口的。
4. **坐标转换**：调用`mxUtils.convertPoint(container, clientX, clientY)`方法，将原始坐标转换为相对于图形容器的坐标。
5. **使用转换后的坐标**：将转换后的坐标打印到控制台，并在该位置插入一个顶点，从而实现根据鼠标点击位置在图形容器内添加图形元素的功能。

### 使用场景

- **图形交互**：在处理鼠标点击、拖动等交互事件时，将鼠标事件的坐标转换为图形容器内的坐标，以便准确地定位和操作图形元素。
- **图形布局**：在进行图形布局计算时，可能需要将不同元素的坐标统一到同一个坐标系中，`mxUtils.convertPoint`方法可以帮助完成这种坐标转换。
