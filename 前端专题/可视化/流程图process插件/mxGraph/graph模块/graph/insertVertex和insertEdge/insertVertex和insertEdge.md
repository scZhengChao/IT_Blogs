# insertVertex和insertEdge

## 目录

- [例子](#例子)

```javascript 
mxGraph.prototype.insertVertex = function(parent, id, value,
                                          x, y, width, height, style, relative) {

  // 设置 Cell 尺寸及位置信息
  var geometry = new mxGeometry(x, y, width, height);
  geometry.relative = (relative != null) ? relative : false;

  // 创建一个 Cell
  var vertex = new mxCell(value, geometry, style);
  // ...
  // 标识这个 Cell 是一个节点
  vertex.setVertex(true);
  // ...

  // 在画布上添加这个 Cell
  return this.addCell(vertex, parent);
};
```


上面是**经简化后的**[insertVertex](https://link.segmentfault.com/?enc=hDwkCqc3Mr+8xxFh8XeifA==.2HK4NPnGH40LZ7uquwrv6OVok/Eu13AiL3rwbZnywHj2dD1zBuAV9KvLV0Q05sKOhsOCsxRK7TSCHuulysIDUDv2vG4tinRe4trWhMWJYs0+Sjw2g83Ux8p3ido8PxB6 "insertVertex")方法。 **insertVertex 做了三件事，**先是**设置几何信息，然后创建一个节点，最后将这个节点添加到画布**。[**insertEdge**](https://link.segmentfault.com/?enc=TWa+tf6zSKMqkcPCyysl/g==.+c2fx9VHou1/1guDh3vYo3YWq8Q0qf/p2PtEF3N1grDOnZRHZ2Vb5O/loPDpf6ATrTSeB0G+Bq23O2ZPf6EPA7d4KpilcSrtXXkrukTR6P/XsbB4et0OJuZEvhXioEr7 "insertEdge")**与 insertVertex 类似**，**中间过程会调用**\*\*`vertex.setEdge(true)`****将****`Cell`****标记为边。**从这里我们也可以**得知无论****`节点`****还是****`边`****在 mxGraph 中都是由**[**mxCell**](https://link.segmentfault.com/?enc=G6NFOaq4uX6mhMwKTkVnNQ==.gLSogQdviOcl4P4++a8gU5QlxCqNGCa+AUR1zDqCTU4fnOz/CkJ/TLLatk2MnO4b6uMWHoFndAOWnw1cYngh5nEUP7tBcLHEq7wk/+CiZCWE3fG1HxZfk7UkqvPJSWh4 "mxCell")**类表示，**只是在**该类内部标识当前****`Cell`****是****`节点`****还是****`边`。\*\*​

要在图中插入点，我们可以使用mxGraph.insertVertex(parent, id, value, x, y, width, height, style，relative)。这个函数的参数如下：

- parent 所有的节点都有parent，从而构成一棵树。我们通常使用graph.getDefaultParent()作为parent。
- id 点的id，需要唯一，如果null，mxGraph会自动帮我们生成唯一的id。
- value UserObject。我们可以把业务逻辑的对象存放在这里
- x, y, width, height 左上的坐标以及宽和高
- style 后文会详细介绍
- relative；表示绝对定位还是相对定位

关于`UserObject`这里再做一下简单的解释。对于`mxGraph`来说，数据包括两部分：用于显示的数据和`UserObject`。显示的数据包括**点的大小、位置等”样式”**，而`UserObject`是**用于存放业务逻辑对象。**

**插入边需要**调用`mxGraph.insertEdge(parent, id, value, source, target, style)` ，parent、id和style的含义和`insertVetex`相同，而：

- source表示边的起点
- target表示边的终点

```javascript 
// 得到默认的parent用于插入cell。这通常是root的第一个孩子。
var parent = graph.getDefaultParent();
        
// 开始事务
model.beginUpdate();
try
{
  var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
  var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
  var e1 = graph.insertEdge(parent, null, '', v1, v2);
}
finally
{
  // 提交事务
  model.endUpdate();
}

```


### 例子

```javascript 
function main(container) {
  // 禁用鼠标右键
  mxEvent.disableContextMenu(container);
  const graph = new mxGraph(container);
  // 开启区域选择
  new mxRubberband(graph);
  const parent = graph.getDefaultParent();
  graph.getModel().beginUpdate();
  try {
    // 相对画布定位
    graph.insertVertex(parent, null, 'A', 50, 20, 80, 30);
    // 相对父级定位
    const v_1 = graph.insertVertex(parent, null, 'B', 170, 20, 100, 200);
    const v_2 = graph.insertVertex(v_1, null, 'C', 0.5, 1, 80, 30, '', true);
    // 线条label定位
    const v1 = graph.insertVertex(parent, null, 'Hello,', 320, 20, 80, 30);
    const v2 = graph.insertVertex(parent, null, 'World!', 500, 150, 80, 30);
    const e1 = graph.insertEdge(parent, null, '30%', v1, v2);
    // relative position，以线条中点为中心
    e1.geometry.x = 1; // [-1,1] 调整 label 沿连接线的位置
    e1.geometry.y = 100; // 调整label 在正交线上的距离
    const v3 = graph.insertVertex(parent, null, 'Hello,', 320, 320, 80, 30);
    const v4 = graph.insertVertex(parent, null, 'World!', 500, 450, 80, 30);
    const e2 = graph.insertEdge(parent, null, '30%', v3, v4);
    // relative 必须为 true，false 无效
    e2.geometry.relative = false;
    e2.geometry.x = 1;
    e2.geometry.y = 400;
  } finally {
    graph.getModel().endUpdate();
  }
}
```
