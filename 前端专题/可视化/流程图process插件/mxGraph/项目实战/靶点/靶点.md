# 靶点

将鼠标悬浮中 A 节点中心，待节点高亮时连接到 B 节点的一个靶点上

![](https://segmentfault.com/img/remote/1460000044675073)

![](https://segmentfault.com/img/remote/1460000044675074)

然后将 A 节点拖拽到 B 节点右边

![](https://segmentfault.com/img/remote/1460000044675075)

可以看到如果从图形中心拖出线条，这时边的出口值`exit`为空，只有入口值`entry`。如果拖动节点 mxGraph 会智能地调整线条出口方向。如节点\*\* A 的连接靶点原来是在右边，节点拖动到节点 B 右边后靶点也跟着发生了变化，跑到了左边，而节点 B 的连接靶点一直没变。\*\*

这次将**鼠标悬浮到 A 节点的一个靶点，待靶点高亮时连接到 B 节点的一个靶点上**

![](https://segmentfault.com/img/remote/1460000044675076)

![](https://segmentfault.com/img/remote/1460000044675077)

然后将 A 节点拖拽到 B 节点右边

![](https://segmentfault.com/img/remote/1460000044675078)

可以看到这次所有值都有了，连接后拖动节点 A，连接靶点的位置也固定不变，mxGraph 不像第一个例子一样调整连接靶点位置。之所以产生这样的差异是因为第一个例子的边是从节点中心拖出的，并没有出口靶点的信息，而第二个例子则是明确地从一个靶点中拖出一条边。

```html 
<!--根据以下官方例子进行修改-->
<!--https://github.com/jgraph/mxgraph/blob/master/javascript/examples/anchors.html-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Anchors example for mxGraph</title>
    <style>
    html, body {
        height: 100%;
    }

    #graphContainer {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        background: url('./images/grid.gif');
        cursor: default;
    }
    </style>
</head>

<body onload="main(document.getElementById('graphContainer'))">
<div id="graphContainer"></div>
</body>

<script>
const mxBasePath = '../static/mxgraph';
</script>

<!-- Loads and initializes the library -->
<script src="../mxClient.js"></script>
<script>
// Overridden to define per-shape connection points
// 重写以定义每个形状的连接点
mxGraph.prototype.getAllConnectionConstraints = function (terminal, source) {
  if (terminal != null && terminal.shape != null) {
    if (terminal.shape.stencil != null) {
      if (terminal.shape.stencil != null) {
        return terminal.shape.stencil.constraints;
      }
    } else if (terminal.shape.constraints != null) {
      return terminal.shape.constraints;
    }
  }

  return null;
};
// 定义靶点
mxShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.25, 0), true),
  new mxConnectionConstraint(new mxPoint(0.5, 0), true),
  new mxConnectionConstraint(new mxPoint(0.75, 0), true),
  new mxConnectionConstraint(new mxPoint(0, 0.25), true),
  new mxConnectionConstraint(new mxPoint(0, 0.5), true),
  new mxConnectionConstraint(new mxPoint(0, 0.75), true),
  new mxConnectionConstraint(new mxPoint(1, 0.25), true),
  new mxConnectionConstraint(new mxPoint(1, 0.5), true),
  new mxConnectionConstraint(new mxPoint(1, 0.75), true),
  new mxConnectionConstraint(new mxPoint(0.25, 1), true),
  new mxConnectionConstraint(new mxPoint(0.5, 1), true),
  new mxConnectionConstraint(new mxPoint(0.75, 1), true)];

function main(container) {
  const graph = new mxGraph(container);
  graph.setConnectable(true);
  graph.setAllowDanglingEdges(false);
  const parent = graph.getDefaultParent();
  graph.getModel().beginUpdate();
  try {
    graph.insertVertex(parent, null, 'A', 20, 20, 80, 80);
    graph.insertVertex(parent, null, 'B', 200, 150, 80, 80);
  } finally {
    graph.getModel().endUpdate();
  }

  const alertAnchor = (sender, evt) => {

    const edge = evt.properties.cells[0];
    alert(edge.style);
  };

  // 初次连接边
  graph.addListener(mxEvent.ADD_CELLS, (...args) => {
      console.log('初次连接边')
    setTimeout(() => {
      // 初次连接边无法获取 靶点坐标，异步处理后可获取
      alertAnchor(...args)
    }, 0);
  });
  // 二次连接边
  graph.addListener(mxEvent.CONNECT_CELL, (...rest)=>{
      console.log('二次连接边')
      alertAnchor(...rest)
  });
}
</script>
</html>

```
