# setValue

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [返回值](#返回值)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`库中，`model.setValue`方法用于设置单元格（`mxCell`）的值。**单元格的值通常代表节点的标签文本、边的标签等显示信息，该方法可帮助你动态修改图形元素的展示内容。** 下面从功能、参数、返回值、使用场景、示例代码等方面详细介绍。

### 功能概述

`model.setValue`方法的主要功能是**更新指定单元格的值，在图形界面上，这会直接改变对应元素的显示文本。当你**需要动态修改图形中节点或边的标签时，就可以使用该方法。

### 参数

该方法通常接收两个参数：

- **`cell`**：类型为`mxCell`，表示要设置**值的单元格对象。这个单元格可以是节点**、边等任意`mxGraph`中的图形元素。
- **`value`**：类型通常为`string`或其他合适的数据类型（取决于实际需求），表示要为单元格设置的新值。

### 返回值

方法返回**设置值之前单元格的旧值。**

### 使用场景

- **数据更新**：当图形关联的数据发生变化时，需要更新图形元素的显示内容。例如，在一个流程图中，节点代表某个任务，任务的名称发生了改变，就可以使用该方法更新节点的标签。
- **用户交互**：在用户进行编辑操作时，如双击节点修改其名称，此时可以调用该方法将用户输入的新名称设置为节点的值。
- **动态演示**：在制作图形的动态演示时，需要按顺序更新节点或边的标签，以展示不同的状态或信息。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>model.setValue Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <button id="updateButton">Update Node Value</button>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            // 获取图形模型
            const model = graph.getModel();

            // 开始更新模型
            model.beginUpdate();
            try {
                // 获取默认父级
                const parent = graph.getDefaultParent();

                // 创建一个节点
                const vertex = graph.insertVertex(parent, null, 'Initial Value', 20, 20, 80, 30);

                // 结束更新模型
                model.endUpdate();

                // 为按钮添加点击事件监听器
                const updateButton = document.getElementById('updateButton');
                updateButton.addEventListener('click', function () {
                    // 开始更新模型
                    model.beginUpdate();
                    try {
                        // 设置节点的新值
                        const oldValue = model.setValue(vertex, 'New Value');
                        console.log('旧值:', oldValue);
                    } finally {
                        // 结束更新模型
                        model.endUpdate();
                    }
                });
            } catch (e) {
                console.error('Error:', e);
            }
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建图形和模型对象**：创建`mxGraph`实例并关联到 HTML 容器，通过`graph.getModel()`获取图形模型。
2. **创建节点**：在模型更新的事务块内，使用`graph.insertVertex`方法创建一个节点，并设置其初始值为`Initial Value`。
3. **添加按钮并绑定事件**：在页面上添加一个按钮，为其添加点击事件监听器。当按钮被点击时，进入新的模型更新事务块。
4. **设置节点的新值**：调用`model.setValue(vertex, 'New Value')`方法将节点的值更新为`New Value`，并将旧值打印到控制台。
5. **结束模型更新**：每次模型操作完成后，使用`model.endUpdate()`结束更新事务，确保图形界面正确更新。
