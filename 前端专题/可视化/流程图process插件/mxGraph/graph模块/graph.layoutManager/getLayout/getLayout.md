# getLayout

## 目录

- [方法功能](#方法功能)
- [方法签名](#方法签名)
- [参数说明](#参数说明)
- [返回值](#返回值)
- [示例代码](#示例代码)
- [代码解释](#代码解释)
- [应用场景](#应用场景)

在`mxGraph`库中，`graph.layoutManager.getLayout`是用于获取与**特定单元格关联的布局对象**的方法。下面从方法功能、参数、返回值、使用示例以及应用场景等方面详细介绍。

### 方法功能

`mxGraph`中的布局管理器（`mxLayoutManager`）**负责管理和应用各种布局算法到图形中的单元格上**。`graph.layoutManager.getLayout`方法**允许开发者根据给定的单元格获取与之关联的布局对象。通过这个布局对象，开发者可以进一步控制该单元格及其子单元格的布局方式**，例如修改布局参数、重新应用布局等。

### 方法签名

```javascript 
graph.layoutManager.getLayout(cell);
```


### 参数说明

- **`cell`**：
  - **类型**：`mxCell`。
  - **描述**：必需参数，**代表要获取关联布局的单元格**。`mxCell`是`mxGraph`中表示图形元素（如顶点、边、群组等）的基本单元。

### 返回值

- **类型**：`mxGraphLayout`或`null`。
- **描述**：如果指定的单元格有与之关联的布局对象，则返回该布局对象；如果没有关联的布局，则返回`null`。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxGraph layoutManager.getLayout Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px;"></div>
    <button id="getLayoutButton">Get Layout</button>

    <script type="text/javascript">
        mxLoadResources = false;
        mxBasePath = '.';
        mxClient.link('js/mxClient.js', function () {
            // 创建 mxGraph 实例
            var container = document.getElementById('graphContainer');
            var graph = new mxGraph(container);

            // 获取布局管理器
            var layoutManager = graph.getLayoutManager();

            // 获取默认父单元格
            var parent = graph.getDefaultParent();

            // 开始编辑
            graph.getModel().beginUpdate();
            try {
                // 创建一个群组单元格
                var group = graph.insertVertex(parent, null, 'Group', 20, 20, 200, 200);

                // 创建一些子顶点
                var vertex1 = graph.insertVertex(group, null, 'Vertex 1', 20, 20, 80, 30);
                var vertex2 = graph.insertVertex(group, null, 'Vertex 2', 120, 20, 80, 30);

                // 创建一个树形布局并应用到群组单元格
                 var treeLayout = new mxTreeLayout(graph);
                layoutManager.setLayout(group, treeLayout);
             } finally {
                // 结束编辑
                graph.getModel().endUpdate();
            }

            // 获取按钮元素
            var getLayoutButton = document.getElementById('getLayoutButton');
            // 为按钮添加点击事件监听器
            getLayoutButton.addEventListener('click', function () {
                // 获取群组单元格的布局对象
                var layout = layoutManager.getLayout(group);
                if (layout) {
                    console.log('Layout type:', layout.constructor.name);
                } else {
                    console.log('No layout associated with the cell.');
                }
            });
        });
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：通过`mxGraph`构造函数创建一个图实例，并指定其显示容器。
2. **获取布局管理器**：使用`graph.getLayoutManager()`方法获取当前图的布局管理器。
3. **创建单元格并应用布局**：创建一个群组单元格`group`以及一些子顶点，然后创建一个树形布局`treeLayout`并使用`layoutManager.setLayout`方法将其应用到`group`单元格上。
4. **添加按钮并监听点击事件**：创建一个按钮，为其添加点击事件监听器。在点击事件处理函数中，调用`layoutManager.getLayout`方法获取`group`单元格的布局对象，并根据结果输出相应信息。

### 应用场景

- **动态布局调整**：在图形编辑过程中，可能需要根据用户的操作动态调整某个单元格的布局。通过`getLayout`方法获取布局对象后，可以修改布局的参数（如间距、方向等），然后重新应用布局。
- **布局管理和维护**：当需要对图形中的多个单元格的布局进行管理和维护时，可以使用该方法遍历单元格，获取每个单元格的布局对象，进行统一的调整或检查。
