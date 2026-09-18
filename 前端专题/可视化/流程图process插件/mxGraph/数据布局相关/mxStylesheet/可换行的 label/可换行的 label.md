# 可换行的 label

## 目录

- [可换行的 label](#可换行的-label)
- [demo](#demo)

#### 可换行的 label

```typescript 
const titleVertex = graph.insertVertex(nodeRootVertex, null, title,
      0.1, 0.65, 80, 16,
      'constituent=1;whiteSpace=wrap;strokeColor=none;fillColor=none;fontColor=#e6a23c',
      true);
```


对于**非输入的文本内容，默认情况下即便文本超出容器宽度也是不会换行的**。我们项目中宽度为 80 的 titleVertex 正是这样一个例子。

![](image__Xhw1baPTl.png)

要设置换行需要做两件事，第一是通过**这行代码**[**mxGraph.setHtmlLabels(true)**](https://link.segmentfault.com/?enc=jHWQz9skYS17nkjYwVYHyw==.PMl4v37D767YxZYX5R7uy82PY+A16ZsNsceA+rTIfRuXXhB3o3MhFxmBRWlpJbWl1b4Nunn6gp0hGUJUAEk8K90pGV6FRN1YqoJycheDD0O8Idg7/o11xREts8y6y/42 "mxGraph.setHtmlLabels(true)")**，**使用 html 渲染文本(mxGraph 默认使用 svg的text 标签渲染文本)。第二是像上面的 titleVertex 的样式设置一样，**添加一句**[**whiteSpace=wrap**](https://link.segmentfault.com/?enc=IvddyWSWRUwNUHl0f1A0tw==.thF11kf4rHnlwt5182TMTwyeaGoN3MNEENcdaZAeb0VY2Ditd61Rb47VhM9xNe+ZMxH90yLVl7hMAMqqVvbAuzX/yrtcgAY4OaMNMoqdzoNdz3Z8PZG45i17HRWvwER9eN9+VssiiWhoxEeHLq+uvA== "whiteSpace=wrap")**。**

![](image_ueSlYthfef.png)

# demo

```javascript 
var graph = new mxGraph(container);
 
// 渲染的时候使用html标签
graph.setHtmlLabels(true);
 
// 在渲染线edge的时候 禁止使用页面内编辑
graph.isCellEditable = function(cell){
  return !this.model.isEdge(cell);
};
 
var parent = graph.getDefaultParent();
 
graph.getModel().beginUpdate();
try{
  var v1 = graph.insertVertex(parent, null, 'Cum Caesar vidisset, portum plenum esse, iuxta navigavit.',
      20, 20, 100, 70, 'whiteSpace=wrap;');
  var v2 = graph.insertVertex(parent, null, 'Cum Caesar vidisset, portum plenum esse, iuxta navigavit.',
      220, 150, 80, 70, 'whiteSpace=wrap;');
  var e1 = graph.insertEdge(parent, null, 'Cum Caesar vidisset, portum plenum esse, iuxta navigavit.',
      v1, v2, 'whiteSpace=wrap;');
  e1.geometry.width = 100;
} finally {
  graph.getModel().endUpdate();
}

```
