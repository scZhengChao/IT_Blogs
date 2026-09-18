# grow

## 目录

- [功能概述](#功能概述)
- [使用场景](#使用场景)
- [方法参数](#方法参数)
- [示例代码](#示例代码)
- [代码解释](#代码解释)
- [注意事项](#注意事项)

`mxRectangle`是 mxGraph 库中用于表示矩形区域的类，`grow`方法是该类的一个实例方法 **，主要用于调整矩形的大小**。下面从功能、使用场景、参数、示例代码和注意事项几个方面详细介绍。

### 功能概述

`grow`方法的主要功能是对`mxRectangle`对象所**表示的矩形区域进行扩展或收缩。它会根据传入的参数，在矩形的四周均匀地增加或减少一定的像素值，从而改变矩形的宽度和高度**，同时相应地调整矩形左上角的坐标。

### 使用场景

- **图形布局调整**：在进行图形布局时，有时需要为图形元素预留一定的边距，或者对已有的布局进行微调。使用`grow`方法可以方便地扩展或收缩矩形区域，以满足布局需求。
- **选中效果增强**：当用户选中一个图形元素时，为了突出显示选中状态，可以使用`grow`方法稍微扩大矩形区域，然后在扩大后的区域绘制选中效果（如边框、阴影等）。

### 方法参数

`grow`方法接受一个参数：

- `d`：一个数值，表示要在矩形的四周均匀增加或减少的像素值 \*\*。如果`d`****为正数，则矩形会扩大；如果****`d`\*\***为负数，则矩形会收缩。**

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxRectangle grow Example</title>
    <!-- 引入 mxGraph 库 -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <script type="text/javascript">
        // 创建一个 mxRectangle 对象
        var rect = new mxRectangle(10, 10, 100, 50);

        // 输出原始矩形的信息
        console.log('原始矩形:');
        console.log('x:', rect.x);
        console.log('y:', rect.y);
        console.log('width:', rect.width);
        console.log('height:', rect.height);

        // 调用 grow 方法扩大矩形
        rect.grow(20);

        // 输出扩大后矩形的信息
        console.log('扩大后的矩形:');
        console.log('x:', rect.x);
        console.log('y:', rect.y);
        console.log('width:', rect.width);
        console.log('height:', rect.height);

        // 调用 grow 方法收缩矩形
        rect.grow(-10);

        // 输出收缩后矩形的信息
        console.log('收缩后的矩形:');
        console.log('x:', rect.x);
        console.log('y:', rect.y);
        console.log('width:', rect.width);
        console.log('height:', rect.height);
    </script>
</body>

</html>
```


### 代码解释

1. **引入 mxGraph 库**：通过`<script>`标签引入 mxGraph 库。
2. **创建**\*\*`mxRectangle`\*\***对象**：使用`new mxRectangle(x, y, width, height)`构造函数创建一个矩形对象，这里的`x`和`y`表示矩形左上角的坐标，`width`和`height`表示矩形的宽度和高度。
3. **输出原始矩形信息**：将原始矩形的坐标和尺寸信息输出到控制台。
4. **调用**\*\*`grow`\*\***方法扩大矩形**：调用`rect.grow(20)`方法，将矩形在四周均匀扩大 20 像素，然后输出扩大后矩形的信息。
5. **调用**\*\*`grow`\*\***方法收缩矩形**：调用`rect.grow(-10)`方法，将矩形在四周均匀收缩 10 像素，然后输出收缩后矩形的信息。

### 注意事项

- **边界问题**：当传入的`d`为负数且绝对值较大时，可能会导致矩形的宽度或高度变为负数，这在实际应用中可能没有意义，需要根据具体情况进行处理。
- **对象引用**：`grow`方法会直接修改调用它的`mxRectangle`对象本身，而不是返回一个新的对象。因此，在使用时要注意避免意外修改原始对象。
