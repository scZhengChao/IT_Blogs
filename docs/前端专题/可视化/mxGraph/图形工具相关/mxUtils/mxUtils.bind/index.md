# mxUtils.bind

## 目录

- [mxUtils.bind方法的作用和原理](#mxUtilsbind方法的作用和原理)
- [mxVertexHandler](#mxVertexHandler)
  - [代码解释](#代码解释)
  - [总结](#总结)

在`mxGraph`中，`mxUtils.bind`是一个实用方法 **，它用于创建一个绑定了特定上下文**（`this`值）的函数。

### `mxUtils.bind`方法的作用和原理

`mxUtils.bind`方法的主要作用是固定函数调用时的`this`值，避免在不同的调用上下文中`this`指向发生变化而导致的问题。它的基本语法如下：

```javascript 
mxUtils.bind(obj, funct, ...args);
```


- **`obj`**：指定函数调用时`this`的指向对象。
- **`funct`**：要绑定的函数。
- **`...args`**：可选参数，是传递给函数的参数。

# mxVertexHandler

`mxVertexHandler`是`mxGraph`里用于处理**顶点（节点）交互的类，比如顶点的拖动、调整大小等操作**。

`mxGraph`中，`mxVertexHandler`负责处理顶点的各种交互行为。当**需要在特定的上下文环境中调**用`mxVertexHandler`的方法时，就可以使用`mxUtils.bind`来确保`this`指向正确的`mxVertexHandler`实例。

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxUtils.bind with mxVertexHandler</title>
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

            // 开始更新图形模型
            graph.getModel().beginUpdate();
            try {
                // 获取默认父级单元格
                const parent = graph.getDefaultParent();
                // 插入一个顶点
                const vertex = graph.insertVertex(parent, null, 'Node', 20, 20, 80, 30);

                // 创建 mxVertexHandler 实例
                const vertexHandler = new mxVertexHandler(graph, vertex);

                // 定义一个需要绑定上下文的函数
                const handleClick = function () {
                    // 在这个函数中，this 应该指向 vertexHandler
                    console.log('Vertex clicked:', this.state.cell.value);
                };

                // 使用 mxUtils.bind 绑定上下文
                const boundHandleClick = mxUtils.bind(vertexHandler, handleClick);

                // 模拟点击事件，调用绑定后的函数
                boundHandleClick();
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

1. **创建**\*\*`mxGraph`\*\***实例和顶点**：首先创建了一个`mxGraph`实例，并在图形中插入了一个顶点。
2. **创建**\*\*`mxVertexHandler`\*\***实例**：针对插入的顶点创建了一个`mxVertexHandler`实例，用于处理该顶点的交互。
3. **定义处理函数**：定义了一个`handleClick`函数，在这个函数中希望`this`指向`vertexHandler`实例。
4. **使用**\*\*`mxUtils.bind`\*\***绑定上下文**：调用`mxUtils.bind(vertexHandler, handleClick)`方法，将`handleClick`函数的`this`值绑定为`vertexHandler`实例，返回一个绑定后的新函数`boundHandleClick`。
5. **调用绑定后的函数**：模拟点击事件，调用`boundHandleClick`函数，此时函数内部的`this`就会正确地指向`vertexHandler`实例。

### 总结

通过`mxUtils.bind`方法结合`mxVertexHandler`，可以确保在处理顶点交互的函数中`this`指向正确的对象，避免因`this`指向问题导致的错误，从而更方便地实现顶点的交互逻辑。

graph.createHandler
