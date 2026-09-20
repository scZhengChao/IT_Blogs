# dragHtml

![](./image/image_ZjHhywtg18.png)

> 拖拽生成节点

```html 

<!--根据以下官方例子进行修改-->
<!--https://github.com/jgraph/mxgraph/blob/master/javascript/examples/dragsource.html-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>drag</title>
    <style>
    html, body {
        height: 100%;
    }

    #graphContainer {
        position: relative;
        overflow: hidden;
        width: 500px;
        height: 500px;
        background: url('./images/grid.gif');
        cursor: default;
    }
    </style>
</head>

<body onload="main(document.getElementById('graphContainer'))">
<div id="graphContainer"></div>
</body>

<!-- Sets the basepath for the library if not in same directory -->
<script>
const mxBasePath = '../static/mxgraph';
</script>

<!-- Loads and initializes the library -->
<script src="../mxClient.js"></script>
<script>
function main(container) {
  const graph = new mxGraph(container);

  const parent = graph.getDefaultParent();
  graph.getModel().beginUpdate();
  try {
    const v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
    const v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
    const e1 = graph.insertEdge(parent, null, '30%', v1, v2);
  } finally {
    graph.getModel().endUpdate();
  }

  // 判断drop是否有效
  const dropGraph = function (evt) {
    const x = mxEvent.getClientX(evt);
    const y = mxEvent.getClientY(evt);
    // 获取 x,y 所在的元素 
    // document.elementFromPoint(x, y) 并不是 mxGraph 特有的方法，它是浏览器 Document 对象提供的一个标准方法。
    // 方法用于返回当前文档中位于指定坐标 (x, y) 处的最顶层元素
    const elt = document.elementFromPoint(x, y);
    // 如果鼠标落在graph容器
    // 其作用是判断一个节点是否是另一个节点的祖先节点。
    // graph.container 是 mxGraph 实例的容器元素，通常是一个 HTML 元素，mxGraph 绘制的图形就显示在这个容器内。
    // elt 是要检查的目标元素。
    if (mxUtils.isAncestorNode(graph.container, elt)) {
      return graph;
    }
    console.log('sasf')
    // 鼠标落在其他地方
    return null;
  };

  // drop成功后新建一个节点
  const dropSuccessCb = function (graph, evt, target, x, y) {
    const cell = new mxCell('Test', new mxGeometry(0, 0, 120, 40));
    cell.vertex = true;
    // 批量插入
    const cells = graph.importCells([cell], x, y, target);
    if (cells != null && cells.length > 0) {
    // 设置为选中
      graph.setSelectionCells(cells);
    }
  };

  // 插入节点方法2
  // const dropSuccessCb = function (graph, evt, target, x, y) {
  //   const cell = new mxCell('Test', new mxGeometry(x, y, 120, 40));
  //   cell.vertex = true;
  //   const parent = graph.getDefaultParent();
  //   graph.addCell(cell, parent);
  //   graph.setSelectionCell(cell);
  // };


  // Creates a DOM node that acts as the drag source
  var img = mxUtils.createImage('./images/other/pika.jpg');
  img.style.width = '48px';
  img.style.height = '48px';
  document.body.appendChild(img);

  // Creates the element that is being for the actual preview.
  var dragElt = document.createElement('div');
  dragElt.style.border = 'dashed black 1px';
  dragElt.style.width = '120px';
  dragElt.style.height = '40px';

// 使html 可拖拽
  var ds = mxUtils.makeDraggable(img, dropGraph, dropSuccessCb, dragElt, null, null, graph.autoscroll, true);
  // Restores original drag icon while outside of graph
  ds.createDragElement = mxDragSource.prototype.createDragElement;
}
</script>
</html>

```
