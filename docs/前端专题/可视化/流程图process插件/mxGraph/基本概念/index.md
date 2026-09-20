# 基本概念

## 目录

- [Graphs](#Graphs)
  - [mxGraph](#mxGraph)
  - [mxGraphModel](#mxGraphModel)
  - [mxStylesheet](#mxStylesheet)
    - [给cell定义一个新的style](#给cell定义一个新的style)
  - [mxGraphView](#mxGraphView)
  - [mxCellRenderer](#mxCellRenderer)
- [Event](#Event)
  - [原生DOM事件监听](#原生DOM事件监听)
  - [mxEventSource中触发mxEventObjects](#mxEventSource中触发mxEventObjects)
  - [mxGraph中触发mxMouseEvent](#mxGraph中触发mxMouseEvent)
- [mx事件](#mx事件)
- [常用方法](#常用方法)
  - [Style的使用](#Style的使用)
  - [画布缩放](#画布缩放)
  - [拖拽连线](#拖拽连线)
  - [设置Vertex上的连接点,设置连接点图标](#设置Vertex上的连接点设置连接点图标)
  - [vertex和edge 编辑](#vertex和edge-编辑)
  - [设置vertex展示内容](#设置vertex展示内容)
  - [快速清空画布](#快速清空画布)
  - [获取画布连接线信息](#获取画布连接线信息)
- [Swimlane节点](#Swimlane节点)
  - [设置Swimlane全局可以链接](#设置Swimlane全局可以链接)
- [展开/折叠节点](#展开折叠节点)

[  mxGraph开发手册 · Fynn's Blog  mxGraph开发手册 https://fynn90.github.io/2020/05/23/mxGraph%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/](https://fynn90.github.io/2020/05/23/mxGraph%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/ "  mxGraph开发手册 · Fynn's Blog  mxGraph开发手册 https://fynn90.github.io/2020/05/23/mxGraph%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97/")

## Graphs

初始化`new mxGraph(DOM)`将得到mxGraph.以mxGraph为核心,提供对图(Graph)各种(图形,样式,图的缩放等)操作的API.通过mxGraph可以获取到其他API对象.

![](https://jgraph.github.io/mxgraph/docs/images/graph.png)

```javascript 
var node = document.getElementById('id-of-graph-container');
var graph = new mxGraph(node);
```


### [mxGraph](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraph-js.html "mxGraph")

`mxGraph`可以直接操作 图形的方法.例如:

- 新增一个节点 -[insertVertex](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraph-js.html#mxGraph.insertVertex "insertVertex")
- 新增一个连接线 -[insertEdge](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraph-js.html#mxGraph.insertEdge "insertEdge")
- 从图形移除一个节点,连接线也一起移除 -[removeCells](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraph-js.html#mxGraph.removeCells "removeCells")
- 修改cell(节点、连接线)大小 -[resizeCell](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraph-js.html#mxGraph.resizeCell "resizeCell")
- 设置图形背景图片 -[setBackgroundImage](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraph-js.html#mxGraph.setBackgroundImage "setBackgroundImage")

⚠️对图形的操作或获取图形的信息都可以在 mxGraph进行.

### [mxGraphModel](https://jgraph.github.io/mxgraph/docs/js-api/files/model/mxGraphModel-js.html "mxGraphModel")

获取`mxGraphModal`通过`mxGraph.getModel()`

图形**的数据信息实际上都保存在**`mxGraphModel`中, 而图形两个展示元素\*\* 节点(vertex)和连接线(edge)信息是保存在\*\*[**mxCell**](https://jgraph.github.io/mxgraph/docs/js-api/files/model/mxCell-js.html "mxCell")**中.**

`mxGraph`和`mxGraphModal`、`mxCell`**关系如下图:**

![](./assets/image/image_07jPtgvk3D.png)

`mxGraph.insertVertex`创建**一个节点的方法,实际上是调用**`mxCell`实现的.

mxGraph**中对图形(节点、连接线)操作的方法调用时序图如下:**

![](https://jgraph.github.io/mxgraph/docs/js-api/images/images/callgraph.png)

对节点和连接线的操作都可以在`mxGraphModel`中进行.

![](https://jgraph.github.io/mxgraph/docs/images/model.png)

⚠️[mxGeometry](https://jgraph.github.io/mxgraph/docs/js-api/files/model/mxGeometry-js.html "mxGeometry")描述节点或连接线的位置和大小信息

### [mxStylesheet](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxStylesheet-js.html "mxStylesheet")

`mxStylesheet`定义了cell(节点、连接线)的样式.它**实际上是个Object对象,key是字符串,value是个数组.** 默认存在两个值`defaultVertex`和`defaultEdge`.

![](./assets/image/image_vewYrVoH7B.png)

图形**上可修改的样式种类**,**都定义在**[**mxConstants**](https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxConstants-js.html "mxConstants")\*\*中,****`STYLE_`**** 开头的字符串是各种样式定义字符串。\*\*一些样式应用到节点上，一些适用于节点，一些适用于连线，一些都适用。

`mxStylesheet`获取通过`graph.getStylesheet()`.

#### 给cell定义一个新的style

```javascript 
var style = new Object();
style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
style[mxConstants.STYLE_OPACITY] = 50;
style[mxConstants.STYLE_FONTCOLOR]= '#774400';
graph.getStylesheet().putCellStyle('ROUNDED',style);
```


[putCellStyle](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxStylesheet-js.html#mxStylesheet.putCellStyle "putCellStyle")在`mxStylesheet`中保存一个新的样式类型

在cell上使用**一个新的style**

```javascript 
var v1 = graph.insertVertex(parent, null, 'Hello', 20, 20, 80, 30, 'ROUNDED');
```


cell上使用一个新的style,**但重写部分样式**

```javascript 
var v1 = graph.insertVertex(parent, null, 'Hello',  20, 20, 80, 30, 'ROUNDED;strokeColor=red;fillColor=green');
```


创建一个**没有使用默认样式的**`cell`

```javascript 
var v1 = graph.insertVertex(parent, null, 'Hello', 20, 20, 80, 30, ';strokeColor=red;fillColor=green');
```


创建一个**使用默认样式,但重写部分样式**

```javascript 
var v1 = graph.insertVertex(parent, null, 'Hello', 20, 20, 80, 30, 'defaultVertex;fillColor=blue');
```


### [mxGraphView](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraphView-js.html "mxGraphView")

`mxGraphView`控制着图`view`上的**几何信息和图形的状态信息**.通过`mxGraphView`可以监听到图的缩放或移动信息.

获取`mxGraphView`方式:`mxGraph.getview()`

### [mxCellRenderer](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxCellRenderer-js.html "mxCellRenderer")

`mxCellRenderer`是cell(图形)的渲染器,一般用来创建、重新绘制、销毁cell的形状或标签.

## Event

`mxGraph`中有三种类型的事件:

- 原生DOM事件.
- [mxEventSource](https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxEventSource-js.html "mxEventSource")中触发[mxEventObjects](https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxEventObject-js.html "mxEventObjects")
- [mxGraph](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraph-js.html "mxGraph")中触发[mxMouseEvent](https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxMouseEvent-js.html "mxMouseEvent")

mxGraph中[mxGraphModel](https://jgraph.github.io/mxgraph/docs/js-api/files/model/mxGraphModel-js.html#mxGraphModel "mxGraphModel")`,`[mxGraph](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraph-js.html#mxGraph "mxGraph")`,`[mxGraphView](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraphView-js.html#mxGraphView "mxGraphView")`,`[mxEditor](https://jgraph.github.io/mxgraph/docs/js-api/files/editor/mxEditor-js.html#mxEditor "mxEditor")`,`[mxCellOverlay](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxCellOverlay-js.html#mxCellOverlay "mxCellOverlay")`,`[mxToolbar](https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxToolbar-js.html#mxToolbar "mxToolbar")`,`[mxWindow](https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxWindow-js.html#mxWindow "mxWindow")`继承于mxEventSource.`

### 原生DOM事件监听

```javascript 
mxEvent.addListener(DOM,eventType,mxUtils.bind(this, function (evt) {}))
```


### mxEventSource中触发mxEventObjects

```javascript 
graph.addListener(mxEvent.MOVE_CELLS, function (sender,evt) {})
```


### mxGraph中触发mxMouseEvent

```javascript 
this.graph.addMouseListener({
  mouseDown: mxUtils.bind(this, function (sender, me) {}),
  mouseMove: mxUtils.bind(this, function (sender, me) {}),
  mouseUp: mxUtils.bind(this, function (sender, me) {}),
});
```


## mx事件

```javascript 
// 如果有注册单击事件,则调用
graph.addListener(mxEvent.CLICK, (_graph: any, evt: any) => {
  var cell = evt.getProperty("cell");
  if (!!cell && EventCell._oneClickFn) {
    EventCell._oneClickFn.apply(graph, [cell, _graph]);
  }
});
// 双击事件 监听
// cell.value.id 等于你注册时的id
graph.addListener(mxEvent.DOUBLE_CLICK, (_graph: any, evt: any) => {
  var cell = evt.getProperty("cell");
  if (!!cell && EventCell._doubleClickFn) {
    EventCell._doubleClickFn.apply(graph, [cell, _graph]);
  }
});
// cell 选中事件
graph
  .getSelectionModel()
  .addListener(mxEvent.CHANGE, (sender: any, evt: any) => {
    let cells = sender.cells || [];
    let properties = evt.properties;
  // 失焦点事件
    if (
      properties &&
      properties.added &&
      properties.added.length &&
      EventCell._blurCellFn
    ) {
      let adds = properties.added; // added 取消selected cells
      for (let cell of adds) {
        EventCell._currentCell = "";
        EventCell._blurCellFn!.apply(sender.graph, [cell, sender.graph]);
      }
    }
  // 焦点事件
    if (EventCell._focusCellFn) {
      for (let cell of cells) {
        EventCell._currentCell = cell;
        EventCell._currentGraph = sender.graph;
        EventCell._focusCellFn!.apply(sender.graph, [cell, sender.graph]);
      }
    }
  });
```


## 常用方法

### Style的使用

```javascript 
  var style = {};
        // 克隆一个object
        style = mxUtils.clone(style);
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;  // 不设置这个属性 背景图片不出来
        // 边框颜色
        style[mxConstants.STYLE_STROKECOLOR] = '#999999';
        // 边框大小
        style[mxConstants.STYLE_STROKEWIDTH] = 10;
        // 字体颜色
        style[mxConstants.STYLE_FONTCOLOR] = '#FFFF00';
        // 文字水平方式
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        // 文字垂直对齐
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_BOTTOM;
        // 字体大小
        style[mxConstants.STYLE_FONTSIZE] = 30;
        // 底图水平对齐
        style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_CENTER;
        // 底图垂直对齐
        style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_CENTER;
        // 图片路径
        //style[mxConstants.STYLE_IMAGE] = 'images/icons48/gear.png';
        style[mxConstants.STYLE_IMAGE] = 'http://imgstatic.baidu.com/img/image/shouye/qizhi0822.jpg';
        // 背景图片宽 
        style[mxConstants.STYLE_IMAGE_WIDTH] = 150;
        // 背景图片高
        style[mxConstants.STYLE_IMAGE_HEIGHT] = 200;
        // 上间距设置
        // 即使下边定义了全局设置，但这里单独设置上边间距仍单独有效
        style[mxConstants.STYLE_SPACING_TOP] = 30;
        // 四边间距设置
        style[mxConstants.STYLE_SPACING] = 10;
        // 设置 Vertex 展开/折叠 按钮不展示
        style[mxConstants.STYLE_FOLDABLE] = 0;
        // 把定义好的样式object push到stylesheet
        graph.getStylesheet().putCellStyle("style1", style);
        //样式使用
       var v1 = graph.insertVertex(parent, null, "text1", 50, 50, 200, 200, "style1");
       
       // 动态设置style
graph.setCellStyle(mxUtils.trim("selectCell"), [cell]);
```


### 画布缩放

```javascript 
// 居中缩放
graph.centerZoom = true;
// 放大按钮
document.body.appendChild(mxUtils.button('放大 +', function(evt){
    graph.zoomIn();    
}));
// 缩小按钮
document.body.appendChild(mxUtils.button('缩小 -', function(evt){
    graph.zoomOut();    
}));
// 还原按钮
document.body.appendChild(mxUtils.button('还原 #', function(evt){
    graph.zoomActual();
    graph.zoomFactor = 1.2;
    input.value = 1.2;
}));
var input = document.createElement("input");
input.type = "text";
input.value = graph.zoomFactor;
input.addEventListener("blur", function(){
    graph.zoomFactor = parseFloat(this.value, 10);                
});
document.body.appendChild(input);
```


### 拖拽连线

```typescript 
// 开启拖拽选择
new mxRubberband(graph); 
// 开启可以拖拽建立关系
graph.setConnectable(true);
// 开启方块上的文字编辑功能
graph.setCellsEditable(false);
// 启用对齐线帮助定位
mxGraphHandler.prototype.guidesEnabled = true;        // 选择基本元素开启
graph.setEnabled(true);
// 不允许有 没有相同连节点的 连接线
graph.setAllowDanglingEdges(false);
//是否可以移动连线，重新连接其他cell
graph.setCellsLocked(false);
// 可否重复连接
graph.setMultigraph(false);
```


### 设置Vertex上的连接点,设置连接点图标

```typescript 
/**
 * 设定节点上的 连接点
*/
graph.getAllConnectionConstraints = function(terminal: any) {
  if (terminal && graph.model.isVertex(terminal.cell)) {
    return [
      new mxConnectionConstraint(new mxPoint(0, 0.5), true),
      new mxConnectionConstraint(new mxPoint(1, 0.5), true)
    ];
  }
  return null;
};

(mxConstraintHandler as any).prototype.pointImage = new mxImage(
    "./point.gif",
    6,
    6
  );

// 选择cell
graph.setSelectionCell(newCell);
```


### vertex和edge 编辑

```typescript 
// 用来判断是否可以编辑 节点和连接线  Edges are not editable
 graph.isCellEditable = function(cell: any) {
   return false;
 };
 // 控制edge
graph.addEdge = function(edge, parent, source, target, index) {
   // Finds the primary key child of the target table
   // 创建新的目标字段
   let newTargetField = fieldCell(
     createUniqueId(),
     `${source.value.code}`,
     DataItemType.String
   );
   // 创建新的目标字段 数据模型
   addNewDataItem(
     DataItemType.String,
     source.value.code,
     source.value.name,
     newTargetField.value.mxcellId,
     target.value.mxcellId,
     false,
     false,
     source.value.mxcellId
   );
   // 创建新的源字段
   let newSourceField = fieldCell(
     createUniqueId(),
     `parentId`,
     DataItemType.String
   );
   // 创建新的源字段 数据模型
   addNewDataItem(
     DataItemType.String,
     `parentId`,
     "外键",
     newSourceField.value.mxcellId,
     source.value.mxcellId,
     true,
     false
   );
   let model = graph.getModel();
   let newTargetCell: any = null;
   let newSourceCell: any = null;
   model.beginUpdate();
   try {
     newTargetCell = target.insert(newTargetField, target.children.length - 1);
     newSourceCell = source.insert(newSourceField, 1);
   } finally {
     model.endUpdate();
   }
   GraphModel.buildConnection(target, source);
   setTimeout(() => {
     graph.setSelectionCell(newSourceCell);
     graph.setSelectionCell(newTargetCell);
   });
   return mxGraph.prototype.addEdge.apply(this, [
     edge,
     parent,
     newSourceCell,
     newTargetCell,
     index
   ]);
 };
```


### 设置vertex展示内容

```typescript 
graph.convertValueToString = function(cell: any) {
   if (cell.value != null && cell.value.name != null) {
     return cell.value.name;
   }
   return mxGraph.prototype.convertValueToString.apply(this, arguments as any);
 };
 graph.getLabel = function(cell: any) {
   if (this.isHtmlLabel(cell)) {
     var label = "";
     if (cell.value.type in diffLabel) {
       return diffLabel[cell.value.type](cell.value);
     }
   }
   return mxGraph.prototype.getLabel.apply(this, arguments as any);
 };
```


### 快速清空画布

```javascript 
function clearGraphCell(graph) {
  if (!graph) {
    return;
  }
  graph.removeCells(graph.getChildVertices(graph.getDefaultParent()));
}
```


### 获取画布连接线信息

```javascript 
function getGraphEdgeCell(graph) {
  let parentCell = graph.getDefaultParent();
  let edgeCells = graph.getChildEdges(parentCell);
  return edgeCells;
}
```


## Swimlane节点

### 设置Swimlane全局可以链接

在mxgraph中`mxGraph.prototype.**hitsSwimlaneContent`是用来判断,鼠标是否在swimlane内容中.

如果鼠标在swimlane内容上则它会返回true.

在鼠标选中拖拉连接线时会触发`mxEdgeHandler.prototype.createMarker`方法,这里面会校验处理.

```javascript 
// swimlane 默认 全局可以选中连接
mxGraph.prototype.hitsSwimlaneContent = function(swimlane, x, y) {
  return false;
};
```


## 展开/折叠节点

```javascript 
graph.isCellFoldable = function (cell) {
  return true
}
// 设置mxcell可折叠
```


[mxGraphModel](IT/前端专题/可视化/流程图process插件/mxGraph/基本概念/mxGraphModel/mxGraphModel.md "mxGraphModel")

[shape](IT/前端专题/可视化/流程图process插件/mxGraph/基本概念/shape/shape.md "shape")
