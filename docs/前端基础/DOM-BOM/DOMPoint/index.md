# DOMPoint

## 目录

- [语法](#语法)
- [可选参数](#可选参数)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
  - [二维点示例](#二维点示例)
  - [三维点示例](#三维点示例)
- [兼容性](#兼容性)
- [结合mxGraph的示例](#结合mxGraph的示例)

DOMPoint

`DOMPoint`是一个用于表示二维或**三维空间中一个点的对象，它属于 DOM（文档对象模型）几何 API 的一部分**。在 JavaScript 里，你可以使用`new DOMPoint(x, y)`来创建一个二维的点对象，这里的`x`和`y`分别代表点在二维平面上的横坐标和纵坐标。下面从语法、使用场景、示例代码等方面详细介绍。

### 语法

```javascript 
const point = new DOMPoint(x, y);
```


- **`x`**：必需参数，是一个数值类型的值，代表点在二维平面上的`x`坐标。
- **`y`**：必需参数，是一个数值类型的值，代表点在二维平面上的`y`坐标。

### 可选参数

在创建三维点时，还可以传入`z`和`w`参数：

```javascript 
const point3D = new DOMPoint(x, y, z, w);
```


- **`z`**：可选参数，代表三维空间中的`z`坐标，默认值为`0`。
- **`w`**：可选参数，代表齐次坐标，默认值为`1`。

### 使用场景

- **图形处理**：在进行图形绘制、变换（如平移、旋转、缩放）时，`DOMPoint`可用于表示图**形上的各个关键点，方便进行计算和操作。**
- **碰撞检测**：在游戏开发或者交互界面设计中，**需要判断两个图形是否发生碰撞**，`DOMPoint`可以用来表示图形的顶点或中心点，辅助进行碰撞检测。
- **动画效果**：在实现动画效果时，`DOMPoint`可以表示元素在不同时刻的位置，通过**不断更新点的坐标来实现元素的移动**。

### 示例代码

#### 二维点示例

```javascript 
// 创建一个二维点
const point = new DOMPoint(100, 200);

// 访问点的坐标
console.log('点的 x 坐标:', point.x); 
console.log('点的 y 坐标:', point.y); 

// 对坐标进行修改
point.x = 150;
point.y = 250;
console.log('修改后的 x 坐标:', point.x); 
console.log('修改后的 y 坐标:', point.y); 
```


#### 三维点示例

```javascript 
// 创建一个三维点
const point3D = new DOMPoint(100, 200, 300);

// 访问点的坐标
console.log('点的 x 坐标:', point3D.x); 
console.log('点的 y 坐标:', point3D.y); 
console.log('点的 z 坐标:', point3D.z); 

// 对坐标进行修改
point3D.z = 350;
console.log('修改后的 z 坐标:', point3D.z); 
```


### 兼容性

`DOMPoint`对象在现代浏览器中得到了广泛支持，但在一些旧版本的浏览器中可能不被支持。在使用时，建议进行兼容性检查或者使用垫片（polyfill）来确保代码的兼容性。

### 结合`mxGraph`的示例

在`mxGraph`中，`DOMPoint`可以用于**处理图形元素的位置和变换。** 例如，在计算图形元素的平移时，可以使用`DOMPoint`来表示平移的偏移量。

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOMPoint in mxGraph Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
    <style>
        #graphContainer {
            width: 600px;
            height: 400px;
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <div id="graphContainer"></div>
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
                const vertex = graph.insertVertex(parent, null, 'Node', 20, 20, 80, 30);

                // 创建一个平移偏移量的 DOMPoint
                const translation = new DOMPoint(50, 50);

                // 应用平移
                vertex.geometry.x += translation.x;
                vertex.geometry.y += translation.y;

            } finally {
                // 结束更新模型
                model.endUpdate();
            }
        }
    </script>
</body>

</html>
```
