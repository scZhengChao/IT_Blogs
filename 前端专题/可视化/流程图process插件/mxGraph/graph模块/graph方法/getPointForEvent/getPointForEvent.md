# getPointForEvent

## 目录

- [方法功能](#方法功能)
- [调用方式](#调用方式)
- [参数说明](#参数说明)
- [返回值](#返回值)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`库中，`getPointForEvent`方法通常用于将**事件对象（如鼠标事件）中的坐标转换为图形视图中的实际坐标点**。下面详细介绍该方法的相关信息。

### 方法功能

在处理图形交互时，鼠标事件（如点击、拖动等）返回的坐标**是相对于浏览器窗口或者事件触发元素的**。而在`mxGraph`中，我们往往需要将**这些坐标转换为图形视图中的实际坐标**，以便准确地定位和操作图形元素。`getPointForEvent`**方法就是用来完成这个坐标转换任务的。**

### 调用方式

在`mxGraph`里，该方法一般通过`mxGraph`实例或者`mxGraphView`实例来调用。以下是一个常见的调用示例：

```javascript 
// 获取图形视图对象
var view = graph.getView();
// 假设 evt 是鼠标事件对象
var point = view.getPointForEvent(evt);
```


### 参数说明

- **`evt`**：
  - **类型**：`Event`。
  - **描述**：必需参数，代表鼠标事件对象，例如`mousedown`、`mousemove`等事件触发时传递的事件对象。

### 返回值

- **类型**：`mxPoint`。
- **描述**：返回一个`mxPoint`对象，该对象包含`x`和`y`属性，分别**表示转换后的图形视图中的横坐标和纵坐标。**

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>getPointForEvent Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px;"></div>
    <script type="text/javascript">
        mxLoadResources = false;
        mxBasePath = '.';
        mxClient.link('js/mxClient.js', function () {
            // 创建 mxGraph 实例
            var container = document.getElementById('graphContainer');
            var graph = new mxGraph(container);

            // 获取图形视图对象
            var view = graph.getView();

            // 监听图形容器的鼠标点击事件
            mxEvent.addListener(graph.container, 'click', function (evt) {
                // 将鼠标事件的坐标转换为图形视图中的坐标
                var point = view.getPointForEvent(evt);

                console.log('Clicked at graph coordinates: (' + point.x + ', ' + point.y + ')');
            });
        });
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：使用`mxGraph`构造函数创建一个图形实例，并指定其显示容器。
2. **获取图形视图对象**：通过`graph.getView()`方法获取当前图形的视图对象。
3. **监听鼠标点击事件**：使用`mxEvent.addListener`方法监听图形容器的鼠标点击事件。
4. **坐标转换**：在事件处理函数中，调用`view.getPointForEvent(evt)`方法将鼠标事件的坐标转换为图形视图中的坐标，并将结果存储在`point`对象中。
5. **输出结果**：将转换后的坐标信息打印到控制台。
