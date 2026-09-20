# `全局样式`

第一种是设置`全局样式`。[mxStylesheet](https://link.segmentfault.com/?enc=cftUyboNmQ/Zbwo1FK9LQQ==.zlbWVM6DsiwzD3KuNzV5NQga1DywGcFycSuQAXn2+THkpKzUC8ucrgstsn+9zDZz01qRy8Y61Cu4LEo6TOsvqNgExQSfHvpGIoLiDVfhiKZegruK6jMG2DWR2u5yk6M1PQXNYNAuFV+rYGcm5/qggA== "mxStylesheet")类用于管理图形样式，通过[graph.getStylesheet()](https://link.segmentfault.com/?enc=DKQZC05Eny5WB9ifQQKNng==.Na4astzPtJcC97hhvXC2lqr8sJM7q+p+/vYCS5RGu5LkS1VhAjXg8ODxWp2RfAbG36tJpO2pALqjAhXuo73Sj/yrjN6gbN1YzqcabLDS5Dj76ouN+08Qtd9XZE0Okt5g "graph.getStylesheet()")可以获取当前图形的`mxStylesheet`对象。`mxStylesheet`对象的`styles`属性也是一个对象，该对象默认情况下包含两个对象`defaultVertexStyle、defaultEdgeStyle`，**修改这两个对象里的样式属性**`对所有线条/节点都生效`。

```javascript 
// 全局样式
const setDefaultEdgeStyle = (graph) => {
  const style = graph.getStylesheet().getDefaultEdgeStyle();
  Object.assign(style, {
    [mxConstants.STYLE_ROUNDED]: true, // 设置线条拐弯处为圆角
    [mxConstants.STYLE_STROKEWIDTH]: '3',
    [mxConstants.STYLE_STROKECOLOR]: '#333333',
    [mxConstants.STYLE_EDGE]: mxConstants.EDGESTYLE_ORTHOGONAL,// 设置折线
    [mxConstants.STYLE_FONTCOLOR]: '#33333',
    [mxConstants.STYLE_LABEL_BACKGROUNDCOLOR]: '#ffa94d',
  });

  graph.connectionHandler.createEdgeState = function () {
    const edge = this.createEdge();
    return new mxCellState(graph.view, edge, graph.getCellStyle(edge));
  };
};

// 自定义命名样式
const putVertexStyle = (graph) => {
  const myVertexStyle = {
    [mxConstants.STYLE_STROKECOLOR]: 'none',
    [mxConstants.STYLE_ROUNDED]: true,
  };
  graph.getStylesheet().putCellStyle('myVertex', myVertexStyle);
};

function main(container) {
  // 禁用鼠标右键
  mxEvent.disableContextMenu(container);
  const graph = new mxGraph(container);
  graph.setConnectable(true);

  setDefaultEdgeStyle(graph);
  putVertexStyle(graph);

  const parent = graph.getDefaultParent();
  graph.getModel().beginUpdate();
  try {
    const v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30, 'myVertex;fontSize=20;');
    const v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
    const e1 = graph.insertEdge(parent, null, '30%', v1, v2);
  } finally {
    graph.getModel().endUpdate();
  }
}
```
