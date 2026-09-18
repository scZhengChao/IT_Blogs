# contains

## 目录

- [功能概述](#功能概述)
- [参数](#参数)
  - [元素包含检查](#元素包含检查)
  - [点包含检查](#点包含检查)
- [返回值](#返回值)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
  - [元素包含检查示例](#元素包含检查示例)
- [代码解释](#代码解释)
  - [元素包含检查代码解释](#元素包含检查代码解释)
  - [点包含检查代码解释](#点包含检查代码解释)

在`mxGraph`库中，`mxUtils.contains`是一个实用的工具方法，主要用于判断一个元素是否包含另一个元素，或者一个点是否在某个元素的范围内。下面从功能概述、参数、返回值、使用场景、示例代码等方面详细介绍该方法。

### 功能概述

`mxUtils.contains`方法可以执行两种类型的检查：

1. **元素包含检查**：判断一个 DOM 元素是否包含另一个 DOM 元素，即检查一个元素是否是另一个元素的子元素。
2. **点包含检查**：判断一个点（由`x`和`y`坐标表示）是否在一个矩形区域（由`x`、`y`、`width`和`height`定义）内。

### 参数

根据不同的使用场景，`mxUtils.contains`方法接收不同的参数：

#### 元素包含检查

- **`parent`**：类型为`HTMLElement`，表示父元素。
- **`child`**：类型为`HTMLElement`，表示要检查的子元素。

#### 点包含检查

- **`x`**：类型为`number`，表示矩形区域的左上角`x`坐标。
- **`y`**：类型为`number`，表示矩形区域的左上角`y`坐标。
- **`width`**：类型为`number`，表示矩形区域的宽度。
- **`height`**：类型为`number`，表示矩形区域的高度。
- **`px`**：类型为`number`，表示要检查的点的`x`坐标。
- **`py`**：类型为`number`，表示要检查的点的`y`坐标。

### 返回值

如果满足包含条件，则返回`true`；否则返回`false`。

### 使用场景

- **元素包含检查**：在处理 DOM 元素的交互时，可能需要判断一个元素是否是另一个元素的子元素，以便进行相应的操作。例如，当用户点击某个元素时，需要判断该元素是否在某个特定的容器内。
- **点包含检查**：在图形绘制和交互中，经常需要判断一个点是否在某个图形元素的范围内。例如，当用户点击图形时，需要判断点击的位置是否在某个节点或边的范围内。

### 示例代码

#### 元素包含检查示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxUtils.contains Element Example</title>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="parentDiv" style="width: 200px; height: 200px; border: 1px solid black;">
        <div id="childDiv" style="width: 50px; height: 50px; background-color: red;"></div>
    </div>
    <script type="text/javascript">
        if (typeof (mxClient) !== 'undefined') {
            const parentDiv = document.getElementById('parentDiv');
            const childDiv = document.getElementById('childDiv');

            const isContained = mxUtils.contains(parentDiv, childDiv);
            console.log('childDiv 是否在 parentDiv 内:', isContained);
        }
    </script>
</body>

</html>
```


### 代码解释

#### 元素包含检查代码解释

1. **获取 DOM 元素**：通过`document.getElementById`方法获取父元素和子元素。
2. **调用**\*\*`mxUtils.contains`\*\***方法**：传入父元素和子元素，判断子元素是否在父元素内。
3. **打印结果**：将判断结果打印到控制台。

#### 点包含检查代码解释

1. **创建图形和模型对象**：创建`mxGraph`实例并关联到 HTML 容器，通过`graph.getModel()`获取图形模型。
2. **创建节点**：在模型更新的事务块内，使用`graph.insertVertex`方法创建一个节点。
3. **获取节点的边界框**：调用`graph.getCellBounds`方法获取节点的边界框信息。
4. **模拟点击点**：定义一个点击点的`x`和`y`坐标。
5. **调用**\*\*`mxUtils.contains`\*\***方法**：传入节点的边界框信息和点击点的坐标，判断点击点是否在节点内。
6. **打印结果**：将判断结果打印到控制台。
7. **结束模型更新**：使用`model.endUpdate()`结束模型更新事务，确保图形界面更新。

通过`mxUtils.contains`方法，你可以方便地进行元素包含检查和点包含检查，为图形的交互和处理提供支持。
