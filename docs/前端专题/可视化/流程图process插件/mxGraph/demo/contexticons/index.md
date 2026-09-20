# contexticons

![](./image/image_GxWrGpA4GG.png)

```html 
<!--根据以下官方例子进行修改-->
<!--https://github.com/jgraph/mxgraph/blob/master/javascript/examples/contexticons.html-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>active</title>
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

<!-- Sets the basepath for the library if not in same directory -->
<script>
const mxBasePath = '../static/mxgraph';
</script>

<!-- Loads and initializes the library -->
<script src="../mxClient.js"></script>
<script>
function mxVertexToolHandler(state) {
  mxVertexHandler.apply(this, arguments);
}

// 继承 mxVertexHandler
mxVertexToolHandler.prototype = new mxVertexHandler();
mxVertexToolHandler.prototype.constructor = mxVertexToolHandler;

mxVertexToolHandler.prototype.domNode = null;
mxVertexToolHandler.prototype.init = function () {
  mxVertexHandler.prototype.init.apply(this, arguments);
  const genArrow = (img) => {
    const arrow = mxUtils.createImage(img);
    arrow.setAttribute('title', 'Connect');
    arrow.style.cursor = 'pointer';
    arrow.style.position = 'absolute';
    arrow.style.width = '16px';
    arrow.style.height = '16px';
    // 监听节点的手势；拖拽；缩放，移动 
    mxEvent.addGestureListeners(arrow,
      // 绑定节点的上下文
      mxUtils.bind(this, function (evt) { 
         // 转换坐标
        const pt = mxUtils.convertPoint(this.graph.container,
          mxEvent.getClientX(evt), mxEvent.getClientY(evt));
          // 开启拖拽操作
        this.graph.connectionHandler.start(this.state, pt.x, pt.y);
        this.graph.isMouseDown = true;  // 标记鼠标按下事件
        this.graph.isMouseTrigger = mxEvent.isMouseEvent(evt);  // 标记鼠标事件
        mxEvent.consume(evt); // 阻止冒泡；阻止默认事件
      })
    );
    return arrow;
  }

  const arrows = {
    top: genArrow('images/arrow/arrow-top.png'),
    right: genArrow('images/arrow/arrow-right.png'),
    bottom: genArrow('images/arrow/arrow-bottom.png'),
    left: genArrow('images/arrow/arrow-left.png'),
  };

  this.arrows = arrows;
  Object.values(arrows).forEach(arrow => {
    this.graph.container.appendChild(arrow);  // 添加箭头
  });
  this.redrawTools();
};

mxVertexToolHandler.prototype.redraw = function () {
  mxVertexHandler.prototype.redraw.apply(this);
  this.redrawTools();
};

mxVertexToolHandler.prototype.redrawTools = function () {
  const offset = (node, left, top) => {
    node.style.left = (this.state.x + this.state.width + left) + 'px';
    node.style.top = (this.state.y + this.state.height + top) + 'px';
  };

  if (this.state != null && this.arrows != null) {
    const { arrows } = this; // 设置位置
    offset(arrows.top, -50, -50);
    offset(arrows.bottom, -50, 0);
    offset(arrows.left, -100, -20);
    offset(arrows.right, 0, -20);
  }
};

mxVertexToolHandler.prototype.destroy = function (sender, me) {
  mxVertexHandler.prototype.destroy.apply(this, arguments);
  if (this.arrows != null) {
    Object.values(this.arrows).forEach(arrow => {
      arrow.parentNode.removeChild(arrow); // 销毁箭头
    });
    this.arrows = null;
  }
};

function main(container) {
  mxEvent.disableContextMenu(container);
  const graph = new mxGraph(container);
  graph.setConnectable(true);
  
  // 创建节点或者边的处理对象
  graph.createHandler = function (state) {
    if (state != null && this.model.isVertex(state.cell)) {
      return new mxVertexToolHandler(state);
    }

    return mxGraph.prototype.createHandler.apply(this, arguments);
  };

  const parent = graph.getDefaultParent();
  graph.getModel().beginUpdate();
  try {
    graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
    graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
  } finally {
    graph.getModel().endUpdate();
  }
}
</script>
</html>

```
