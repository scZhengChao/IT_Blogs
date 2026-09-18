# graph

## 目录

- [启用图形元素之间的连接功能](#启用图形元素之间的连接功能)
- [禁用折叠](#禁用折叠)
- [内部cell 跟随 父cell 等比例缩放](#内部cell-跟随-父cell-等比例缩放)
- [编辑时按回车键不换行，而是完成输入](#编辑时按回车键不换行而是完成输入)

### 启用图形元素之间的连接功能

```javascript 
const graph = new mxGraph(container);
  graph.setConnectable(true);
```


### 禁用折叠

```javascript 
// 禁用折叠
  graph.foldingEnabled = false;
```


### 内部cell 跟随 父cell 等比例缩放

```typescript 
graph.recursiveResize = true;
```


### 编辑时按回车键不换行，而是完成输入

```javascript 
// 编辑时按回车键不换行，而是完成输入
mxGraph.setEnterStopsCellEditing(true);
```


[批量插入](批量插入.md "批量插入")

[graph.setSelectionCells(cells);](graph.setSelectionCells(cells)-.md "graph.setSelectionCells(cells);")

[connectionHandler 启动一个连接创建的操作](<connectionHandler 启动一个连接创建的操作.md> "connectionHandler 启动一个连接创建的操作")

[用于创建处理特定单元格（如节点、边）交互的处理程序对象](用于创建处理特定单元格（如节点、边）交互的处理程序对象.md "用于创建处理特定单元格（如节点、边）交互的处理程序对象")

[isValidConnection](isValidConnection.md "isValidConnection")

[对单元格样式进行后处理](对单元格样式进行后处理.md "对单元格样式进行后处理")

[cell和 mxGeometry](<cell和 mxGeometry.md> "cell和 mxGeometry")

[insertVertex和insertEdge](insertVertex和insertEdge.md "insertVertex和insertEdge")

[getCursorForCell](getCursorForCell.md "getCursorForCell")

[getDom](getDom.md "getDom")

[setStyle](IT/前端专题/可视化/流程图process插件/mxGraph/graph模块/graph/setStyle/setStyle.md "setStyle")

[graph.getGraphBounds](graph.getGraphBounds.md "graph.getGraphBounds")

[refresh](refresh.md "refresh")

[selectCellForEvent](selectCellForEvent.md "selectCellForEvent")

[getInitialCellForEvent](getInitialCellForEvent.md "getInitialCellForEvent")
