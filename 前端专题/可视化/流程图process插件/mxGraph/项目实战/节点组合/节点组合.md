# 节点组合

组合节点后默认情况下，父节点是可折叠的，要关闭折叠功能需要将`foldingEnabled`设为`false`。

```javascript 
graph.foldingEnabled = false;

```


如果希望在改变父节点尺寸时，子节点与父节点等比例缩放，需要开启`recursiveResize`。

```javascript 
graph.recursiveResize = true;

```


下面是这个例子最重要的两段代码。

```javascript 
/**
 * Redirects start drag to parent.
 */
const getInitialCellForEvent = mxGraphHandler.prototype.getInitialCellForEvent;
mxGraphHandler.prototype.getInitialCellForEvent = function (me) {
  let cell = getInitialCellForEvent.apply(this, arguments);
  if (this.graph.isPart(cell)) {
    cell = this.graph.getModel().getParent(cell);
  }
  return cell;
};

// Redirects selection to parent
graph.selectCellForEvent = function (cell) {
  if (this.isPart(cell)) {
    mxGraph.prototype.selectCellForEvent.call(this, this.model.getParent(cell));
    return;
  }

  mxGraph.prototype.selectCellForEvent.apply(this, arguments);
};
```


这两个方法`重写(Overwrite)`了原方法，思路都是判断如果该**节点是子节点则替换成父节点去执行剩下的逻辑**。

[getInitialCellForEvent](https://link.segmentfault.com/?enc=ThHD6VpuPb7rRZ7Gt4Ryiw==.4eGuU0vTs27FVr0D472U1kiQW8+yz2wMu6O1lMsam4gxjMx625OjNt8S9CGrQYUeMibZoYi5O32C1rFzi+nt8U3W96V/bpBXHbWyqzzYXmexqYFS+/hoahyapjosjJWbdOUVd3sDzz/ylf1zszI1p4OtTb80IKTkLmLDK1ST3us= "getInitialCellForEvent")在鼠标按下(mousedown事件，不是click事件)时触发，如果注释掉这段代码，不使用父节点替换，当发生拖拽时子节点会被单独拖拽，不会与父节点联动。使用父节点替换后，原本子节点应该被拖拽，现在变成了父节点被拖拽，实现联动效果。

[selectCellForEvent](https://link.segmentfault.com/?enc=LS+dZ0eKGMk6JbRJKklB7w==.szz1AIUb1I6XjIQuyCKioQhkM/PL3ys5OrRkdVzNn1rWBMCY3d4sVUtNwQPZPyeIxQMI6Ct3kz/jwueS+vdFZJTqEnRZooFj1i45JpOhNL9nQ8UW9nqg8FU0exQtDpfgw9u+W4VujOGUdnd3MmaBxQ== "selectCellForEvent")其实是`getInitialCellForEvent`内部调用的一个方法。这个方法的**作用是将 cell 设置为**`selectionCell`，设置后可通过[mxGraph.getSelectionCell](https://link.segmentfault.com/?enc=DxPaVSbJgOKGPBHl7PTH6w==.Lr54fTh258qiwuLxsU+DJlpgsQcAVGq6R/zVSMQOOM9u7/feBE+jnYRAm6f8/iB8Y7Bo/um0Enz6VSAYiawn6RxUIRGiQgzqwd2CGEiCZoDnm4M2WruHMor5WkyypklnRrvOPiqz6YgLxcij8GeAIg== "mxGraph.getSelectionCell")可获取得该节点。与`getInitialCellForEvent`同理，如果不使用父节点替换，则`mxGraph.getSelectionCell`获取到的会是子节点。项目实战我们会使用到`mxGraph.getSelectionCell`这个接口。

```html 
<!--根据以下官方例子进行修改-->
<!--https://github.com/jgraph/mxgraph/blob/master/javascript/examples/constituent.html-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Consistuent example for mxGraph</title>
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
function main(container) {
  // 禁用鼠标右键
  mxEvent.disableContextMenu(container);
  const graph = new mxGraph(container);


  graph.isPart = function (cell) {
    const state = this.view.getState(cell);
    const style = (state != null) ? state.style : this.getCellStyle(cell);
    return style['constituent'] == '1';
  };

  /**
   * Redirects start drag to parent.
   */
  const getInitialCellForEvent = mxGraphHandler.prototype.getInitialCellForEvent;
  mxGraphHandler.prototype.getInitialCellForEvent = function (me) {
    let cell = getInitialCellForEvent.apply(this, arguments);
    if (this.graph.isPart(cell)) {
      cell = this.graph.getModel().getParent(cell);
    }
    return cell;
  };

  // Redirects selection to parent
  graph.selectCellForEvent = function (cell) {
    if (this.isPart(cell)) {
      mxGraph.prototype.selectCellForEvent.call(this, this.model.getParent(cell));
      return;
    }

    mxGraph.prototype.selectCellForEvent.apply(this, arguments);
  };

  // Creates the graph inside the given container
  // 禁用折叠
  graph.foldingEnabled = false;
  // 内部cell 跟随 父cell 等比例缩放
  graph.recursiveResize = true;

  graph.addListener(mxEvent.CLICK, function (sender, evt) {
    console.log(arguments);
  });

  const parent = graph.getDefaultParent();
  graph.getModel().beginUpdate();
  try {
    const v1 = graph.insertVertex(parent, null, '', 20, 20, 120, 70);
    const v2 = graph.insertVertex(v1, null, 'Constituent', 20, 20, 80, 30, 'constituent=1;');
  } finally {
    graph.getModel().endUpdate();
  }
}
</script>
</html>

```
