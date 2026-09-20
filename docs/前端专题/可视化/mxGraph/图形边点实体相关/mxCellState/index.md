# mxCellState

## 目录

- [基本概念](#基本概念)
- [主要属性](#主要属性)
  - [1. 关联信息](#1-关联信息)
  - [2. 位置和大小](#2-位置和大小)
  - [3. 样式信息](#3-样式信息)
  - [4. 边相关（针对边类型的mxCell）](#4-边相关针对边类型的mxCell)
- [创建和获取](#创建和获取)
- [构造函数签名](#构造函数签名)
- [参数说明](#参数说明)
- [手动创建示例](#手动创建示例)
- [代码解释](#代码解释)
- [注意事项](#注意事项)

`mxCellState`是`mxGraph`库中的一个核心类，它\*\*主要用于存储和管理`mxCell`\*\***在图形视图中的状态信息**。以下将从多个方面详细介绍`mxCellState`。

### 基本概念

在`mxGraph`里，`mxCell`是用于**表示图形元素（像顶点、边等）的基础数据对象**，而`mxCellState`则代表这些`mxCell`在当前**视图下的具体状态。它会根据视图的设置（如缩放比例、平移情况等）动态计算并保存单元格的位置、大小、样式等信息**。这对于图形的渲染、交互以及布局等操作都至关重要。

### 主要属性

#### 1. 关联信息

- **`cell`**：
  - **类型**：`mxCell`
  - **描述**：指向该状态所对应的`mxCell`对象，通过它可以获取单元格的原始数据，如标签、属性等。
- **`view`**：
  - **类型**：`mxGraphView`
  - **描述**：表示该状态所属的视图对象。借助视图对象，能够获取当前视图的相关参数，例如缩放比例、平移量等，从而影响单元格状态的计算。

#### 2. 位置和大小

- **`x`****、****`y`**：
  - **类型**：`Number`
  - **描述**：分别代表单元格在视图中的横坐标和纵坐标，是经过视图变换（如缩放、平移）后的实际位置。
- **`width`****、****`height`**：
  - **类型**：`Number`
  - **描述**：分别表示单元格在视图中的宽度和高度，同样是经过视图变换后的实际尺寸。

#### 3. 样式信息

- **`style`**：
  - **类型**：`Object`
  - **描述**：存储了单元格的样式信息，是一个键值对对象。其中包含了诸如线条颜色（`strokeColor`）、填充颜色（`fillColor`）、字体样式等属性，用于定义单元格的外观。

#### 4. 边相关（针对边类型的`mxCell`）

- **`absolutePoints`**：
  - **类型**：`Array`
  - **描述**：对于边类型的单元格，该属性存储了边的绝对坐标点数组。这些点按照顺序连接起来，定义了边的具体路径。
- **`source`****、****`target`**：
  - **类型**：`mxCellState`
  - **描述**：分别指向边的源顶点和目标顶点的状态对象，通过它们可以获取源顶点和目标顶点的状态信息。

### 创建和获取

`mxCellState`对象一般由`mxGraphView`**自动创建和管理，开发者通常不需要手动创建**。可以通过`mxGraphView`的`getState`**方法来获取某个**\*\*`mxCell`的状态对象，\*\*示例如下：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>mxCellState Example</title>
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
                // 创建一个顶点
                var vertex = graph.insertVertex(parent, null, 'Sample Vertex', 50, 50, 100, 50);

                // 获取视图对象
                var view = graph.getView();

                // 获取顶点的状态对象
                var vertexState = view.getState(vertex);

                if (vertexState) {
                    console.log('Vertex State Information:');
                    console.log('Cell ID:', vertexState.cell.id);
                    console.log('Position: (' + vertexState.x + ', ' + vertexState.y + ')');
                    console.log('Size: (' + vertexState.width + ', ' + vertexState.height + ')');
                    console.log('Style:', vertexState.style);
                }
            } finally {
                // 结束编辑
                graph.getModel().endUpdate();
            }
        });
    </script>
</body>

</html>
```


### 构造函数签名

```javascript 
new mxCellState(view, cell, style);
```


### 参数说明

- **`view`**：
  - **类型**：`mxGraphView`
  - **描述**：必需参数，代表该状态所属的图形视图对象。`mxGraphView`负责管理图形的渲染和布局，通过它可以获取视图的相关信息，如缩放比例、平移量等，这些信息会影响单元格状态的计算。
- **`cell`**：
  - **类型**：`mxCell`
  - **描述**：必需参数，指向该状态对应的`mxCell`对象。`mxCell`是图形元素（如顶点、边）的基础数据表示，包含了元素的标签、属性等信息。
- **`style`**：
  - **类型**：`Object`
  - **描述**：可选参数，是一个包含样式信息的对象。样式信息用于定义单元格的外观，如线条颜色、填充颜色、字体样式等。如果不提供该参数，会使用`cell`对象的默认样式。

### 手动创建示例

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Manually Create mxCellState Example</title>
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
                // 创建一个顶点
                var vertex = graph.insertVertex(parent, null, 'Sample Vertex', 50, 50, 100, 50);

                // 获取视图对象
                var view = graph.getView();

                // 手动创建 mxCellState 实例
                var vertexStyle = {
                    fillColor: 'lightblue',
                    strokeColor: 'blue'
                };
                var vertexState = new mxCellState(view, vertex, vertexStyle);

                // 打印状态信息
                console.log('Manually created vertex state:');
                console.log('Cell ID:', vertexState.cell.id);
                console.log('Style:', vertexState.style);
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

1. **创建**\*\*`mxGraph`\*\***实例**：使用`mxGraph`构造函数创建一个图形实例，并指定其显示容器。
2. **创建顶点**：通过`graph.insertVertex`方法创建一个顶点`vertex`。
3. **获取视图对象**：使用`graph.getView()`方法获取当前图形的视图对象`view`。
4. **手动创建**\*\*`mxCellState`\*\***实例**：使用`new mxCellState`构造函数，传入视图对象`view`、顶点对象`vertex`和自定义的样式对象`vertexStyle`，创建一个`mxCellState`实例`vertexState`。
5. **打印状态信息**：打印出手动创建的`mxCellState`实例的相关信息，如对应的单元格 ID 和样式信息。

### 注意事项

- **自动管理优先**：在实际开发中，通常建议使用`mxGraphView`的`getState`方法来获取单元格的状态对象，因为`mxGraphView`会自动处理状态对象的创建、更新和销毁，确保状态信息与图形视图保持一致。
- **状态更新**：手动创建的`mxCellState`实例不会自动更新，需要开发者手动处理状态的更新逻辑，以保证状态信息的准确性。例如，当视图的缩放比例或平移量发生变化时，需要手动更新状态对象的位置和大小信息。

[shape](./shape/index.md "shape")
