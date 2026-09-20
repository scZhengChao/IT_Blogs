# mxRectangle

## 目录

- [类的作用](#类的作用)
- [构造函数参数](#构造函数参数)
- [常用属性和方法](#常用属性和方法)
  - [常用属性](#常用属性)
  - [常用方法](#常用方法)
- [使用示例](#使用示例)
- [代码解释](#代码解释)

在`mxGraph`库中，`new mxRectangle`用于创建**一个矩形对象**。`mxRectangle`类表示一个二维平面上的矩形，**在图形绘制、布局计算、碰撞检测等场景中有着广泛的应用**。下面将从类的作用、构造函数参数、常用属性和方法、使用示例等方面详细介绍。

### 类的作用

`mxRectangle`类封装了矩形的基本属性，如**位置（左上角坐标）和大小（宽度和高度**），通过创建`mxRectangle`对象，开发者可以方便地对矩形进行操作和管理，例如计算**矩形的面积、判断点是否在矩形内、进行矩形的平移和缩放等。**

### 构造函数参数

`mxRectangle`类的构造函数可以接收不同数量的参数，常见的调用方式如下：

- **`new mxRectangle()`**：创建一个左上角坐标为`(0, 0)`，宽度和高度都为`0`的矩形。
- **`new mxRectangle(x, y)`**：创建一个左上角坐标为`(x, y)`，宽度和高度都为`0`的矩形。
- **`new mxRectangle(x, y, width, height)`**：创建一个左上角坐标为`(x, y)`，宽度为`width`，高度为`height`的矩形。

### 常用属性和方法

#### 常用属性

- **`x`**：矩形左上角的 x 坐标。
- **`y`**：矩形左上角的 y 坐标。
- **`width`**：矩形的宽度。
- **`height`**：矩形的高度。

#### 常用方法

- **`clone()`**：创建并返回当前矩形的一个副本。
- **`getCenterX()`**：返回矩形中心点的 x 坐标。
- **`getCenterY()`**：返回矩形中心点的 y 坐标。
- **`contains(x, y)`**：判断指定的点`(x, y)`是否在矩形内部。
- **`intersects(rect)`**：判断当前矩形与另一个矩形`rect`是否相交。

### 使用示例

以下是一些使用`new mxRectangle`创建矩形对象并进行操作的示例代码：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxRectangle Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            // 创建一个矩形对象
            const rect = new mxRectangle(10, 20, 100, 50);

            // 输出矩形的属性
            console.log('Rectangle properties:');
            console.log('  X:', rect.x);
            console.log('  Y:', rect.y);
            console.log('  Width:', rect.width);
            console.log('  Height:', rect.height);

            // 获取矩形的中心点坐标
            const centerX = rect.getCenterX();
            const centerY = rect.getCenterY();
            console.log('Center point:', centerX, centerY);

            // 判断点是否在矩形内
            const isInside = rect.contains(20, 30);
            console.log('Point (20, 30) is inside the rectangle:', isInside);

            // 创建另一个矩形
            const rect2 = new mxRectangle(50, 60, 80, 40);
            // 判断两个矩形是否相交
            const isIntersecting = rect.intersects(rect2);
            console.log('The two rectangles are intersecting:', isIntersecting);
        }
    </script>
</body>

</html>
```


### 代码解释

1. **创建矩形对象**：使用`new mxRectangle(10, 20, 100, 50)`创建一个左上角坐标为`(10, 20)`，宽度为`100`，高度为`50`的矩形对象。
2. **输出矩形属性**：通过访问矩形对象的`x`、`y`、`width`和`height`属性，输出矩形的位置和大小信息。
3. **获取中心点坐标**：使用`getCenterX()`和`getCenterY()`方法获取矩形的中心点坐标，并输出结果。
4. **判断点是否在矩形内**：使用`contains()`方法判断点`(20, 30)`是否在矩形内部，并输出判断结果。
5. **判断矩形是否相交**：创建另一个矩形对象`rect2`，使用`intersects()`方法判断两个矩形是否相交，并输出判断结果。

通过`new mxRectangle`创建矩形对象，结合其提供的属性和方法，开发者可以方便地处理与矩形相关的各种操作，为图形的绘制和布局提供支持。

[grow](./grow/index.md "grow")
