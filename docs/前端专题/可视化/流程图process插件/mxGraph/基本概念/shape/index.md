# shape

## 目录

- [1. 矩形（rectangle）](#1-矩形rectangle)
- [2. 椭圆（ellipse）](#2-椭圆ellipse)
- [3. 圆角矩形（rounded）](#3-圆角矩形rounded)
- [4. 菱形（diamond）](#4-菱形diamond)
- [5. 三角形（triangle）](#5-三角形triangle)
- [6. 平行四边形（parallelogram）](#6-平行四边形parallelogram)
- [7. 六边形（hexagon）](#7-六边形hexagon)
- [8. 八边形（octagon）](#8-八边形octagon)
- [9. 云形（cloud）](#9-云形cloud)
- [10. 圆柱（cylinder）](#10-圆柱cylinder)
- [示例代码整合](#示例代码整合)

在`mxGraph`中，`shape`用于定义图形元素（顶点）的外观形状。`mxGraph`提供了多种内置的`shape`类型，以下是一些常见的`shape`及其介绍：

### 1. 矩形（`rectangle`）

- **描述**：这是最基本的形状，用于创建矩形的图形元素，通常用于表示流程中的步骤、节点等。
- **示例代码**

```javascript 
var vertex = graph.insertVertex(parent, null, 'Rectangle', 20, 20, 80, 30, 'shape=rectangle');
```


### 2. 椭圆（`ellipse`）

- **描述**：用于创建椭圆形的图形元素，可用于表示开始、结束等特殊节点。
- **示例代码**

```javascript 
var vertex = graph.insertVertex(parent, null, 'Ellipse', 120, 20, 80, 30, 'shape=ellipse');
```


### 3. 圆角矩形（`rounded`）

- **描述**：是矩形的一种变体，四个角为圆角，使图形看起来更加柔和。
- **示例代码**

```javascript 
var vertex = graph.insertVertex(parent, null, 'Rounded Rectangle', 220, 20, 80, 30, 'shape=rounded');
```


### 4. 菱形（`diamond`）

- **描述**：通常用于表示决策节点，在流程图中用于判断条件。
- **示例代码**

```javascript 
var vertex = graph.insertVertex(parent, null, 'Diamond', 320, 20, 80, 80, 'shape=diamond');
```


### 5. 三角形（`triangle`）

- **描述**：可以用来表示特定的流程方向或特殊的节点类型。
- **示例代码**

```javascript 
var vertex = graph.insertVertex(parent, null, 'Triangle', 420, 20, 80, 80, 'shape=triangle');
```


### 6. 平行四边形（`parallelogram`）

- **描述**：常用于表示输入输出节点，在流程图中表示数据的流入或流出。
- **示例代码**

```javascript 
var vertex = graph.insertVertex(parent, null, 'Parallelogram', 20, 120, 80, 30, 'shape=parallelogram');
```


### 7. 六边形（`hexagon`）

- **描述**：可用于表示一些特殊的节点或具有特定含义的元素。
- **示例代码**

```javascript 
var vertex = graph.insertVertex(parent, null, 'Hexagon', 120, 120, 80, 80, 'shape=hexagon');
```


### 8. 八边形（`octagon`）

- **描述**：相对较少使用，但在一些特殊的图形设计中可能会用到。
- **示例代码**

```javascript 
var vertex = graph.insertVertex(parent, null, 'Octagon', 220, 120, 80, 80, 'shape=octagon');
```


### 9. 云形（`cloud`）

- **描述**：通常用于表示外部实体或不确定的数据源。
- **示例代码**

```javascript 
var vertex = graph.insertVertex(parent, null, 'Cloud', 320, 120, 80, 80, 'shape=cloud');
```


### 10. 圆柱（`cylinder`）

- **描述**：常用于数据库或存储相关的节点。
- **示例代码**

```javascript 
var vertex = graph.insertVertex(parent, null, 'Cylinder', 420, 120, 80, 80, 'shape=cylinder');
```


### 示例代码整合

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxGraph Shapes Example</title>
    <script type="text/javascript" src="mxClient.js"></script>
</head>

<body>
    <div id="graphContainer" style="width: 600px; height: 400px;"></div>
    <script type="text/javascript">
        mxLoadResources = false;
        mxBasePath = '.';
        mxClient.link('js/mxClient.js', function () {
            var container = document.getElementById('graphContainer');
            var graph = new mxGraph(container);
            var parent = graph.getDefaultParent();

            graph.getModel().beginUpdate();
            try {
                var shapes = [
                    { name: 'rectangle', x: 20, y: 20 },
                    { name: 'ellipse', x: 120, y: 20 },
                    { name: 'rounded', x: 220, y: 20 },
                    { name: 'diamond', x: 320, y: 20 },
                    { name: 'triangle', x: 420, y: 20 },
                    { name: 'parallelogram', x: 20, y: 120 },
                    { name: 'hexagon', x: 120, y: 120 },
                    { name: 'octagon', x: 220, y: 120 },
                    { name: 'cloud', x: 320, y: 120 },
                    { name: 'cylinder', x: 420, y: 120 }
                ];

                shapes.forEach(shape => {
                    graph.insertVertex(parent, null, shape.name, shape.x, shape.y, 80, 80, `shape=${shape.name}`);
                });
            } finally {
                graph.getModel().endUpdate();
            }
        });
    </script>
</body>

</html>
```
