# [mxGraphModel](https://jgraph.github.io/mxgraph/docs/js-api/files/model/mxGraphModel-js.html "mxGraphModel")

## 目录

- [mxGraph与mxGraphModel的关系](#mxGraph与mxGraphModel的关系)
- [getModel()方法的作用](#getModel方法的作用)

### `mxGraph`与`mxGraphModel`的关系

- `mxGraph`是`mxGraph`库中用于创建和管理图形的核心类，负责处理图形的绘制、交互、布局等操作。
- `mxGraphModel`则是用于表示图形数据模型的类，它存储了图中所有的单元格（如节点、边）及其属性和关系。`mxGraph`通过`mxGraphModel`来管理和操作图形的数据。

### `getModel()`方法的作用

`mxGraph.getModel()`方法的主要作用是获取当前`mxGraph`实例所使用的`mxGraphModel`对象。借助这个方法，你能够直接访问和操作图形的数据模型，例如添加、删除、修改单元格，监听模型的变化等。

获取`mxGraphModal`通过`mxGraph.getModel()`

图形**的数据信息实际上都保存在**`mxGraphModel`中, 而图形两个展示元素\*\* 节点(vertex)和连接线(edge)信息是保存在\*\*[**mxCell**](https://jgraph.github.io/mxgraph/docs/js-api/files/model/mxCell-js.html "mxCell")**中.**

`mxGraph`和`mxGraphModal`、`mxCell`**关系如下图:**

![](./assets/image/image_Hod2Ia0tX6.png)

[setGeometry](./setGeometry/index.md "setGeometry")

[clear](./clear/index.md "clear")

[getChildCount](./getChildCount/index.md "getChildCount")

[getChildAt](./getChildAt/index.md "getChildAt")

[getCell](./getCell/index.md "getCell")

[add](./add/index.md "add")
