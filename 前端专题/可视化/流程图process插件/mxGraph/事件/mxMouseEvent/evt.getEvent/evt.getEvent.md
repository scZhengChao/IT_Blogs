# evt.getEvent

## 目录

- [方法作用](#方法作用)
- [方法参数](#方法参数)
- [返回值](#返回值)
- [使用示例](#使用示例)
- [代码解释](#代码解释)
- [应用场景](#应用场景)

在`mxGraph`库的使用场景中，`evt.getEvent()`是一个常用的方法，**它主要用于从**\*\*`mxGraph`自定义的事件对象里获取底层的原生 DOM 事件对象。\*\*下面从方法的作用、参数、返回值、使用示例以及应用场景等方面进行详细介绍。

### 方法作用

在`mxGraph`中，当处理鼠标或键盘等交互事件时，**传递给事件处理函数的参数**\*\*`evt`****是****`mxGraph`****封装后的事件对象**。这个封装对象包含了一些与图形交互相关的额外信息，如事件发生位置在图形坐标系中的坐标等。而**`evt.getEvent()`\*\***方法的作用就是提取出底层的原生 DOM 事件对象**，这样开发者就可以使用原生 DOM 事件对象的属性和方法，实现更细致的交互处理。

### 方法参数

`evt.getEvent()`方法不接收任何参数。这里的`evt`是`mxGraph`事件处理函数中的事件对象，通常在`graph.addMouseListener`、`graph.addKeyListener`等事件监听方法的回调函数中作为参数传入。

### 返回值

该方法返回一个原生的 DOM 事件对象，具体的类型取决于触发的事件类型。例如，如果是鼠标点击事件，返回的就是`MouseEvent`对象；如果是键盘按键事件，返回的就是`KeyboardEvent`对象。通过这个原生事件对象，开发者可以访问诸如`event.button`（鼠标点击的按键）、`event.key`（按下的键盘按键）等属性。

### 使用示例

以下是一个简单的示例，展示了如何使用`evt.getEvent()`方法来处理鼠标点击事件：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>evt.getEvent() Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            // 获取图形容器
            const container = document.getElementById('graphContainer');
            // 创建 mxGraph 实例
            const graph = new mxGraph(container);

            // 添加鼠标点击事件监听器
            graph.addMouseListener({
                mouseDown: function (sender, evt) {
                    // 获取原生 DOM 事件对象
                    const nativeEvent = evt.getEvent();
                    // 检查是否是鼠标左键点击
                    if (nativeEvent.button === 0) {
                        console.log('Left mouse button clicked.');
                    }
                },
                mouseMove: function () { },
                mouseUp: function () { }
            });

            // 开始更新图形模型
            graph.getModel().beginUpdate();
            try {
                // 获取默认父级单元格
                const parent = graph.getDefaultParent();
                // 插入一个顶点
                graph.insertVertex(parent, null, 'Node', 20, 20, 80, 30);
            } finally {
                // 结束更新图形模型
                graph.getModel().endUpdate();
            }
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：创建一个`mxGraph`实例，并将其关联到 HTML 页面中的一个容器元素上。
2. **添加鼠标事件监听器**：使用`graph.addMouseListener`方法添加一个鼠标事件监听器，监听鼠标按下事件。在`mouseDown`回调函数中，使用`evt.getEvent()`方法获取原生 DOM 事件对象。
3. **处理原生事件**：通过检查原生事件对象的`button`属性，判断是否是鼠标左键点击，并将结果输出到控制台。
4. **插入顶点**：在图形中插入一个顶点，方便用户进行鼠标点击交互测试。

### 应用场景

- **精确的鼠标交互处理**：通过获取原生鼠标事件对象，可以判断用户点击的是鼠标的哪个按键（左键、右键或中键），从而实现不同的交互逻辑，如左键选择元素、右键弹出菜单等。
- **键盘事件处理**：对于键盘事件，通过原生键盘事件对象可以获取用户按下的具体按键，实现快捷键功能，如按下`Ctrl+C`进行复制操作。
- **事件传播控制**：原生事件对象提供了`stopPropagation()`和`preventDefault()`等方法，开发者可以使用这些方法来控制事件的传播和默认行为，例如阻止鼠标点击事件冒泡到父元素。

通过`evt.getEvent()`方法，开发者可以在`mxGraph`中利用原生 DOM 事件对象的强大功能，实现更加灵活和复杂的交互效果。
