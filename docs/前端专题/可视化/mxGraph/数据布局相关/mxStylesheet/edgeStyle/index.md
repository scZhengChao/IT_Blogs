# edgeStyle

## 目录

- [1.orthogonalEdgeStyle](#1orthogonalEdgeStyle)
- [2.elbowEdgeStyle](#2elbowEdgeStyle)
- [3.entityRelationEdgeStyle](#3entityRelationEdgeStyle)
- [4.curveEdgeStyle](#4curveEdgeStyle)
- [5.loopEdgeStyle](#5loopEdgeStyle)
- [6.topToBottomEdgeStyle](#6topToBottomEdgeStyle)
- [7.sideToSideEdgeStyle](#7sideToSideEdgeStyle)
- [自定义连接线样式edgeStyle](#自定义连接线样式edgeStyle)
  - [实现思路](#实现思路)
  - [示例代码](#示例代码)
  - [代码解释](#代码解释)
  - [注意事项](#注意事项)

在`mxGraph`中，`edgeStyle`用于定义边的连接和显示方式，以下是一些常见的`edgeStyle`类型及其介绍：

### 1.`orthogonalEdgeStyle`

- **描述**：该样式会使边**以正交（直角）的方式连接顶点**，只使用水平和垂直的线段，形成直角拐弯，避免出现斜向的线条，让图形布局更加规整、清晰，常用于流程图、组织结构图等场景。
- **示例代码**：

```javascript 
var style = 'edgeStyle=orthogonalEdgeStyle;';
var edge = graph.insertEdge(parent, null, 'Edge', vertex1, vertex2, style);
```


### 2.`elbowEdgeStyle`

- **描述**：此样式会让边在**连接顶点时形成一个或多个肘形**（通常是 90 度或 180 度的弯折），可用于简单的连接关系展示，能使边的走向更加清晰。
- **示例代码**：

```javascript 
var style = 'edgeStyle=elbowEdgeStyle;';
var edge = graph.insertEdge(parent, null, 'Edge', vertex1, vertex2, style);
```


### 3.`entityRelationEdgeStyle`

- **描述**：主要用于**实体关系图（ER 图）中，** 这种样式通常会显示出边的起点和终点的特殊标记，以表示实体之间的关系，如一对一、一对多、多对多等关系。
- **示例代码**：

```javascript 
var style = 'edgeStyle=entityRelationEdgeStyle;';
var edge = graph.insertEdge(parent, null, 'Edge', vertex1, vertex2, style);
```


### 4.`curveEdgeStyle`

- **描述**：使用此样式的边会**以曲线的形式连接顶点**，适用于需要展示更平滑连接效果的场景，使图形看起来更加柔和、美观。
- **示例代码**：

```javascript 
var style = 'edgeStyle=curveEdgeStyle;';
var edge = graph.insertEdge(parent, null, 'Edge', vertex1, vertex2, style);
```


### 5.`loopEdgeStyle`

- **描述**：专门用于**处理自环边（即边的源顶点和目标顶点是同一个顶点）**，它会以一种特定的方式绘制自环，通常是在顶点周围形成一个环形。
- **示例代码**：

```javascript 
var style = 'edgeStyle=loopEdgeStyle;';
var edge = graph.insertEdge(parent, null, 'Edge', vertex, vertex, style);
```


### 6.`topToBottomEdgeStyle`

- **描述**：强制边从**源顶点的顶部连接到目标顶点的底部，** 常用于需要固定边连接方向的场景，例如树形结构的图形中。
- **示例代码**：

```javascript 
var style = 'edgeStyle=topToBottomEdgeStyle;';
var edge = graph.insertEdge(parent, null, 'Edge', vertex1, vertex2, style);
```


### 7.`sideToSideEdgeStyle`

- **描述**：使边从**源顶点的一侧连接到目标顶点的一侧**，具体的连接方向可以根据顶点的位置自动调整，可用于展示水平方向的连接关系。
- **示例代码**：

```javascript 
var style = 'edgeStyle=sideToSideEdgeStyle;';
var edge = graph.insertEdge(parent, null, 'Edge', vertex1, vertex2, style);
```


## 自定义连接线样式edgeStyle

`mxEdgeStyle`中定义了线的各种样式:`Loop`、`ElbowConnector`、`SideToSide`等,可以通过一下方式定义连接样式:

```javascript 
mxEdgeStyle.MyStyle = function (state,source,target,points,result) {
  if (source != null && target != null ) {
    let pt = new mxPoint(target.getCenterX(), source.getCenterY())
    if(mxUtils.contains(source,pt.x,pt.y)) {
         pt.y = source.y+source.height
       }
    result.push(pt)
  }
}
```


定义好样式后,需要注册到`mxStyleRegistry`

```javascript 
mxStyleRegistry.putValue('myEdgeStyle', mxEdgeStyle.MyStyle)
```


最后使用mxGraphModel的setStyle方法将样式设置到指定的线上:

```javascript 
let e1 = graph.insertEdge(parent,null,'连线',v1,v2)
graph.getModel().setStyle(e1,"edgeStyle=myEdgeStyle")
```


也可以直接修改连接线的样式:

```javascript 
let style = graph.getStyleSheet().getDefaultEdgeStyle().
style[mxConstants.STYLE_EDGE]= mxEdgeStyle.MyStyle;
```


### 实现思路

自定义`edgeStyle`主要有两个关键步骤：一是创建自定义的边样式函数，二是将这个自定义函数应用到边的样式中。

### 示例代码

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Custom Edge Style in mxGraph</title>
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
                // 创建两个顶点
                var vertex1 = graph.insertVertex(parent, null, 'Vertex 1', 20, 20, 80, 30);
                var vertex2 = graph.insertVertex(parent, null, 'Vertex 2', 200, 20, 80, 30);

                // 自定义边样式函数
                function customEdgeStyle(state, source, target, points) {
                    // 创建一个新的点数组来存储边的路径
                    var newPoints = [];

                    // 添加源点
                    newPoints.push(new mxPoint(source.getCenterX(), source.getCenterY()));

                    // 添加自定义的中间点
                    var midX = (source.getCenterX() + target.getCenterX()) / 2;
                    var midY1 = source.getCenterY() + 50;
                    var midY2 = target.getCenterY() + 50;
                    newPoints.push(new mxPoint(midX, midY1));
                    newPoints.push(new mxPoint(midX, midY2));

                    // 添加目标点
                    newPoints.push(new mxPoint(target.getCenterX(), target.getCenterY()));

                    return newPoints;
                }

                // 注册自定义边样式
                mxEdgeStyle.customEdgeStyle = customEdgeStyle;

                // 定义边的样式，使用自定义边样式
                var edgeStyle = 'edgeStyle=customEdgeStyle;';

                // 创建边并应用自定义样式
                var edge = graph.insertEdge(parent, null, 'Edge', vertex1, vertex2, edgeStyle);
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

1. **创建**\*\*`mxGraph`\*\***实例和顶点**：创建`mxGraph`实例，并在图中创建两个顶点`vertex1`和`vertex2`。
2. **定义自定义边样式函数**：
   - `customEdgeStyle`函数接收四个参数：`state`（边的状态对象）、`source`（源顶点的状态对象）、`target`（目标顶点的状态对象）和`points`（原始的点数组）。
   - 在函数内部，创建一个新的点数组`newPoints`，并按照自定义的逻辑添加点。这里添加了源点、两个自定义的中间点和目标点，形成一个特定的边路径。
   - 最后返回新的点数组。
3. **注册自定义边样式**：通过`mxEdgeStyle.customEdgeStyle = customEdgeStyle;`将自定义的边样式函数注册到`mxEdgeStyle`对象中。
4. **定义边的样式并创建边**：
   - 定义边的样式字符串`edgeStyle`，使用`edgeStyle=customEdgeStyle;`来指定使用自定义的边样式。
   - 使用`graph.insertEdge`方法创建边，并将自定义样式应用到边上。
5. **更新模型**：在修改图形元素前后，使用`graph.getModel().beginUpdate()`和`graph.getModel().endUpdate()`方法确保模型的更新操作被正确处理。

### 注意事项

- **函数参数**：自定义边样式函数的参数是固定的，需要按照`state`、`source`、`target`、`points`的顺序接收。
- **返回值**：函数必须返回一个包含`mxPoint`对象的数组，表示边的路径。
- **性能考虑**：复杂的自定义边样式函数可能会影响图形的渲染性能，尽量避免在函数中进行复杂的计算。
