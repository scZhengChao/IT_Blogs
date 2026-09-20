# getChildAt

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
- [返回值](#返回值)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`库中，`model.getChildAt`是`mxGraphModel`类里的一个方法，其作用是获取指定父单元格下特定索引位置的子单元格。下面从功能、参数、返回值、使用场景、示例代码等方面详细介绍该方法。

### 功能概述

`model.getChildAt`方法主要用于在图形数据模型里，**从指定的父单元格中根据索引获取对应的子单元格**。在`mxGraph`中，图形元素以单元格的形式存在，这些单元格会组织成树状结构，每个父单元格可能包含多个子单元格，该方法能让你按索引精确访问这些子单元格。

### 参数

该方法一般接收两个参数：

- **`parent`**：类型为`mxCell`，代表要从中获取子单元格的父单元格。此父单元格可以是节点、分组或者其他能包含子单元格的类型。
- **`index`**：类型为`number`，表示要获取的子单元格在父单元格的子单元格列表中的索引。索引从 0 开始计数。

### 返回值

若指定索引位置存在子单元格，方法会返回对应的`mxCell`对象；若索引超出了子单元格列表的范围，通常会返回`null`。

### 使用场景

- **图形遍历**：在遍历图形数据模型时，可能需要按顺序访问每个父单元格的子单元格，此时可以使用该方法按索引逐个获取子单元格。
- **动态操作**：当需要对特定位置的子单元格进行操作（如修改属性、删除等）时，可以先使用该方法获取到目标子单元格，再进行相应操作。
- **布局调整**：在进行图形布局时，可能需要根据子单元格的顺序和位置来调整布局，使用该方法可以准确获取每个子单元格。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>model.getChildAt Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
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

                // 在父级下插入三个子节点
                const vertex1 = graph.insertVertex(parent, null, 'Vertex 1', 20, 20, 80, 30);
                const vertex2 = graph.insertVertex(parent, null, 'Vertex 2', 200, 200, 80, 30);
                const vertex3 = graph.insertVertex(parent, null, 'Vertex 3', 300, 300, 80, 30);

                // 获取父级下索引为 1 的子单元格
                const childAtIndex1 = model.getChildAt(parent, 1);
                if (childAtIndex1) {
                    console.log('索引为 1 的子单元格的值:', childAtIndex1.value);
                } else {
                    console.log('未找到指定索引的子单元格');
                }

            } finally {
                // 结束更新模型
                model.endUpdate();
            }
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建图形和模型对象**：创建`mxGraph`实例并关联到 HTML 容器，通过`graph.getModel()`获取图形模型。
2. **插入子节点**：在模型更新的事务块内，使用`graph.insertVertex`方法在默认父级下插入三个子节点。
3. **获取特定索引的子单元格**：调用`model.getChildAt(parent, 1)`方法获取默认父级下索引为 1 的子单元格，并检查是否获取成功。若成功获取，打印该子单元格的值；若未获取到，打印提示信息。
4. **结束模型更新**：使用`model.endUpdate()`结束模型更新事务，确保图形界面更新。

借助`model.getChildAt`方法，你能依据索引准确获取指定父单元格下的子单元格，为图形的操作和管理提供便利。
