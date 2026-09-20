# drop

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [调用时机](#调用时机)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`库中，`mxDragSource.drop`方法是与拖放操作相关的一个重要方法，下面将从功能概述、参数、调用时机、使用场景、示例代码以及代码解释等方面详细介绍该方法。

### 功能概述

`mxDragSource.drop`方法主要**用于处理拖放操作结束时的逻辑**，当用户将一个可拖动的元素（由`mxDragSource`管理）拖放到目标位置后，调用此**方法来完成相应的放置操作**，例如在图中插入新的节点或边等。

### 参数

`drop`方法通常接收以下几个参数：

- **`evt`**：类型为`MouseEvent`或`TouchEvent`，这是触发拖放结束的事件对象，包含了诸如鼠标位置、触摸点位置等信息，可用于确定放置的具体位置。
- **`target`**：类型为`mxCell`或`null`，表示拖放操作的目标单元格。如果拖放到了一个单元格上，`target`就是该单元格；如果拖放到了空白区域，`target`可能为`null`。
- **`x`**：类型为`number`，表示拖放结束时鼠标或触摸点的 x 坐标，以图形容器的坐标系为基准。
- **`y`**：类型为`number`，表示拖放结束时鼠标或触摸点的 y 坐标，同样以图形容器的坐标系为基准。

### 调用时机

`drop`方法一般在拖放操作结束时被调用，具体来说，**当用户释放鼠标按钮（对于鼠标拖放）或抬起手指（对于触摸拖放）时，** \*\*`mxDragSource`****会触发****`drop`\*\***方法来处理放置逻辑。**

### 使用场景

- **节点添加**：在图形编辑应用中，用户可能从一个工具箱中拖动一个节点图标到图中，当拖放结束时，调用`drop`方法在图中创建一个新的节点。
- **元素重组**：允许用户通过拖放操作将一个节点从一个父节点移动到另一个父节点，`drop`方法可以处理节点的重新定位和父节点的更新。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxDragSource.drop Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <div id="dragSource" draggable="true">Drag Me</div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            // 创建 mxDragSource
            const dragSource = new mxDragSource(document.getElementById('dragSource'), function (graph, evt, target, x, y) {
                // 开始更新模型
                graph.getModel().beginUpdate();
                try {
                    const parent = graph.getDefaultParent();
                    // 在拖放位置插入一个新节点
                    graph.insertVertex(parent, null, 'New Node', x, y, 80, 30);
                } finally {
                    // 结束更新模型
                    graph.getModel().endUpdate();
                }
            });

            // 监听拖放事件并调用 drop 方法（通常由 mxGraph 内部机制处理）
            dragSource.addDropHandler(function (graph, evt, target, x, y) {
                dragSource.drop(evt, target, x, y);
            });
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：创建一个`mxGraph`实例并关联到 HTML 容器上。
2. **创建**\*\*`mxDragSource`\*\*：创建一个`mxDragSource`对象，将一个可拖动的 HTML 元素（`dragSource`）与之关联，并传入一个回调函数。这个回调函数会在`drop`方法被调用时执行，用于处理放置逻辑。
3. **定义放置逻辑**：在回调函数中，开始更新图模型，然后在拖放的位置（由`x`和`y`坐标指定）插入一个新的节点，最后结束模型更新。
4. **监听拖放事件**：通过`addDropHandler`方法监听拖放结束事件，并在事件处理函数中调用`drop`方法，触发放置逻辑的执行。

通过`mxDragSource.drop`方法，可以方便地实现图形元素的拖放操作，增强用户与图形的交互性。
