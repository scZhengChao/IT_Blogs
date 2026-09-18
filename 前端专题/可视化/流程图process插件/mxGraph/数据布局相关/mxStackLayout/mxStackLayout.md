# mxStackLayout

## 目录

- [功能概述](#功能概述)
- [使用步骤](#使用步骤)
- [示例代码](#示例代码)
- [代码解释](#代码解释)
- [应用场景](#应用场景)

`mxStackLayout`是`mxGraph`库中用于**对图形元素进行堆叠布局的类。**堆叠布局意味着将**多个图形元素按照一定的方向（水平或垂直）依次排列，类似于堆叠物品**。以下从功能、使用步骤、示例代码、代码解释和应用场景等方面详细介绍。

### 功能概述

`mxStackLayout`能让你方便地**对图中的一组顶点进行布局，使其按照水平或垂直方向依次排列，并且可以设置元素之间的间距。**

### 使用步骤

1. **创建**\*\*`mxGraph`\*\***实例**：首先需要创建一个`mxGraph`对象来承载图形元素。
2. **创建要布局的顶点**：在图中创建需要进行堆叠布局的顶点。
3. **创建**\*\*`mxStackLayout`\*\***实例**：指定布局的方向（水平或垂直）和元素之间的间距。
4. **应用布局**：调用布局对象的`execute`方法，传入要布局的父容器，将布局应用到指定的元素上。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxStackLayout Example</title>
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

            // 获取默认父单元格
            var parent = graph.getDefaultParent();

            // 开始编辑
            graph.getModel().beginUpdate();
            try {
                // 创建三个顶点
                var vertex1 = graph.insertVertex(parent, null, 'Vertex 1', 20, 20, 80, 30);
                var vertex2 = graph.insertVertex(parent, null, 'Vertex 2', 20, 20, 80, 30);
                var vertex3 = graph.insertVertex(parent, null, 'Vertex 3', 20, 20, 80, 30);

                // 创建 mxStackLayout 实例，设置为垂直布局，间距为 10
                var layout = new mxStackLayout(graph, false, 10);

                // 应用布局
                layout.execute(parent);
            } finally {
                // 结束编辑
                graph.getModel().endUpdate();
            }
        });
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：使用`mxGraph`构造函数创建一个图形实例，并指定其显示容器。
2. **创建顶点**：使用`graph.insertVertex`方法创建三个顶点。
3. **创建**\*\*`mxStackLayout`\*\***实例**：
   - `new mxStackLayout(graph, false, 10)`：第一个参数是`mxGraph`实例；第二个参数`false`表示垂直布局（如果为`true`则表示水平布局）；第三个参数`10`表示元素之间的间距为 10 个像素。
4. **应用布局**：调用`layout.execute(parent)`方法，将布局应用到`parent`容器中的所有子元素上。
5. **更新模型**：在修改图形元素前后，使用`graph.getModel().beginUpdate()`和`graph.getModel().endUpdate()`方法确保模型的更新操作被正确处理。

### 应用场景

- **流程图**：在流程图中，可能需要将多个步骤或节点按照垂直或水平方向依次排列，使用`mxStackLayout`可以方便地实现这种布局。
- **菜单或列表**：在设计图形化的菜单或列表时，可以使用堆叠布局将菜单项或列表项依次排列。
- **数据可视化**：在数据可视化中，需要将多个数据元素（如柱状图、饼图等）按照一定的方向排列，`mxStackLayout`可以帮助实现这样的布局。
