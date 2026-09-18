# createSVGPoint

## 目录

- [方法概述](#方法概述)
- [语法](#语法)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
  - [1. 创建SVGPoint对象并设置坐标](#1-创建SVGPoint对象并设置坐标)
  - [2. 坐标转换示例](#2-坐标转换示例)
- [注意事项](#注意事项)

`createSVGPoint`是 SVG 文档对象提供的一个方法，用于创建一个`SVGPoint`对象。`SVGPoint`对象**代表二维平面上的一个点，在 SVG 图形的变换、坐标计算、事件处理等场景中非常有用。** 下面从方法概述、语法、使用场景、示例代码等方面详细介绍。

### 方法概述

`createSVGPoint`方法由`SVGSVGElement`或`SVGElement`对象调用，它会返回一个新的`SVGPoint`对象，**该对象初始时其**\*\*`x`****和****`y`\*\***坐标都为 0，但可以通过赋值操作来修改这些坐标。**

### 语法

```javascript 
const point = svgElement.createSVGPoint();
```


- \*\*`svgElement`****：可以是****`SVGSVGElement`****（即****`<svg>`\*\***元素）或其他 SVG 元素。**
- \*\*`point`****：返回的****`SVGPoint`****对象，具有****`x`****和****`y`\*\***属性，分别表示点的横坐标和纵坐标。**

### 使用场景

- **坐标转换**：在 SVG 中，不同的元素可能有不同的坐标系，使用`SVGPoint`对象可以方便地在不同坐标系之间进行坐标转换。例如，将鼠标事件的屏幕坐标转换为 SVG 元素的本地坐标。
- **图形变换**：在进行图形的平移、旋转、缩放等变换时，`SVGPoint`对象可以用来表示变换的起始点、终止点或变换的中心点。
- **碰撞检测**：在判断两个 SVG 图形是否发生碰撞时，可以使用`SVGPoint`对象来表示图形的关键点，从而进行碰撞检测。

### 示例代码

#### 1. 创建`SVGPoint`对象并设置坐标

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create SVGPoint Example</title>
</head>

<body>
    <svg id="mySvg" width="200" height="200">
        <rect x="50" y="50" width="100" height="100" fill="blue" />
    </svg>
    <script>
        const svg = document.getElementById('mySvg');
        // 创建一个 SVGPoint 对象
        const point = svg.createSVGPoint();
        // 设置点的坐标
        point.x = 100;
        point.y = 100;
        console.log(`点的坐标: (${point.x}, ${point.y})`);
    </script>
</body>

</html>
```


在这个示例中，首先获取了 SVG 元素，然后调用`createSVGPoint`方法创建了一个`SVGPoint`对象，并设置了该点的坐标，最后将坐标信息输出到控制台。

#### 2. 坐标转换示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SVGPoint Coordinate Transformation Example</title>
</head>

<body>
    <svg id="mySvg" width="200" height="200">
        <rect x="50" y="50" width="100" height="100" fill="blue" />
    </svg>
    <script>
        const svg = document.getElementById('mySvg');
        const rect = svg.querySelector('rect');

        // 创建一个 SVGPoint 对象表示鼠标点击的屏幕坐标
        const screenPoint = svg.createSVGPoint();
        screenPoint.x = 150;
        screenPoint.y = 150;

        // 获取矩形元素的坐标系转换矩阵
        const matrix = rect.getScreenCTM().inverse();

        // 将屏幕坐标转换为矩形元素的本地坐标
        const localPoint = screenPoint.matrixTransform(matrix);

        console.log(`屏幕坐标: (${screenPoint.x}, ${screenPoint.y})`);
        console.log(`矩形元素的本地坐标: (${localPoint.x}, ${localPoint.y})`);
    </script>
</body>

</html>
```


在这个示例中，创建了一个`SVGPoint`对象表示鼠标点击的屏幕坐标，然后获取了矩形元素的坐标系转换矩阵，通过`matrixTransform`**方法将屏幕坐标转换为矩形元素的本地坐标，并将结果输出到控制台。**

### 注意事项

- **坐标系统**：要注意`SVGPoint`对象的坐标是相对于其所在的 SVG 元素的坐标系的，在进行坐标转换时需要考虑不同元素的坐标系差异。
- **兼容性**：`createSVGPoint`方法在现代浏览器中得到了广泛支持，但在一些旧版本的浏览器中可能存在兼容性问题，使用时需要进行兼容性检查。
