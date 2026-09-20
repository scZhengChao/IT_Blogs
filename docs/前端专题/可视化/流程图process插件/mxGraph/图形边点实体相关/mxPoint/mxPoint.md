# mxPoint

## 目录

- [功能概述](#功能概述)
- [构造函数](#构造函数)
- [属性和方法](#属性和方法)
  - [属性](#属性)
  - [方法](#方法)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
- [代码解释](#代码解释)

在`mxGraph`中，`mxPoint`是一个用于**表示二维平面上点的坐标的**类。下面从功能概述、构造函数、属性和方法、使用场景、示例代码以及代码解释等方面详细介绍。

### 功能概述

`mxPoint`类主要用于在`mxGraph`中表示**图形元素的位置、偏移量等二维坐标信息**。例如，**在定义图形的连接约束、指定图形的移动方向和距离、设置图形的锚点位置等场景中，都会用到**\*\*`mxPoint`\*\***对象来精确描述点的位置。**

### 构造函数

`mxPoint`类有以下几种常见的构造函数调用方式：

- **`new mxPoint()`**：创建一个坐标为`(0, 0)`的点对象。
- **`new mxPoint(x, y)`**：创建一个坐标为`(x, y)`的点对象，其中`x`和`y`是数值类型的参数，表示点在二维平面上的横、纵坐标。

### 属性和方法

#### 属性

- **`x`**：表示点的横坐标。
- **`y`**：表示点的纵坐标。

#### 方法

- **`clone()`**：返回当前`mxPoint`对象的一个副本。
- **`equals(point)`**：用于比较当前`mxPoint`对象与另一个`mxPoint`对象是否相等。如果两个点的`x`和`y`坐标都相同，则返回`true`，否则返回`false`。
- **`add(point)`**：将当前点的坐标与另一个`mxPoint`对象的坐标相加，返回一个新的`mxPoint`对象。
- **`subtract(point)`**：将当前点的坐标减去另一个`mxPoint`对象的坐标，返回一个新的`mxPoint`对象。

### 使用场景

- **图形定位**：在创建和移动图形元素（如节点、边）时，使用`mxPoint`对象来指定图形的位置。例如，在插入一个节点时，可以通过`mxPoint`对象指定节点的左上角坐标。
- **连接约束**：在定义图形元素的连接约束时，使用`mxPoint`对象来指定连接点相对于图形边界的位置。例如，规定边只能从节点的顶部中间位置连接出去，就可以使用`mxPoint(0.5, 0)`来表示该位置。
- **图形变换**：在进行图形的平移、旋转等变换操作时，使用`mxPoint`对象来表示变换的偏移量或旋转中心的位置。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxPoint Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px; border: 1px solid black;"></div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const container = document.getElementById('graphContainer');
            const graph = new mxGraph(container);

            graph.getModel().beginUpdate();
            try {
                const parent = graph.getDefaultParent();

                // 创建一个 mxPoint 对象表示节点的位置
                const position = new mxPoint(50, 50);

                // 插入一个节点，使用 mxPoint 指定位置
                const node = graph.insertVertex(parent, null, 'Node', position.x, position.y, 80, 30);

                // 创建一个连接约束，使用 mxPoint 指定连接点位置
                const constraint = new mxConnectionConstraint(new mxPoint(0.5, 0), true);
                graph.setConnectableSource(node, [constraint]);

            } finally {
                graph.getModel().endUpdate();
            }
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建**\*\*`mxGraph`\*\***实例**：创建一个`mxGraph`实例并关联到 HTML 容器上。
2. **创建**\*\*`mxPoint`\*\***对象用于图形定位**：
   - `const position = new mxPoint(50, 50);`：创建一个`mxPoint`对象，表示节点的左上角坐标为`(50, 50)`。
   - `const node = graph.insertVertex(parent, null, 'Node', position.x, position.y, 80, 30);`：插入一个节点，使用`mxPoint`对象的`x`和`y`属性指定节点的位置。
3. **创建**\*\*`mxPoint`\*\***对象用于连接约束**：
   - `const constraint = new mxConnectionConstraint(new mxPoint(0.5, 0), true);`：创建一个连接约束，使用`mxPoint(0.5, 0)`表示连接点位于节点顶部的中间位置。
   - `graph.setConnectableSource(node, [constraint]);`：设置节点作为连接源时的约束，即边只能从节点顶部中间位置连接出去。

通过`mxPoint`类，可以方便地在`mxGraph`中处理和表示二维平面上的点坐标，实现图形元素的精确定位和连接约束设置。
