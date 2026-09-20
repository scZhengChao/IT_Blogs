# mxGraphModel

## 目录

- [mxGraphModel](#mxGraphModel)
- [Model 编程模型](#Model编程模型)
  - [Container](#Container)
  - [Vertex 和 Edge](#Vertex-和-Edge)
  - [parent](#parent)

#### mxGraphModel

`mxGraphModel`里**真正的存放图的数据**，但是我们通常并不直接操作`mxGraphModel`，而是通过`mxGraph`的函数间接操作`mxGraphModel`。

现在介绍一下 Model 这个概念，Model 是当前图形的数据结构化表示。[**mxGraphModel**](https://link.segmentfault.com/?enc=Bahk+H03zvRG8AlpKOUYzg==.kFdXkt0ra0d8EnbD1RYjmf+hurtKFagKIXvi6iWXU1k8czgwdr0Hdpw0ld78UqKEG5ZekBSKQuLk4UQwcqOcSkLN4FINYDEcdx0eKGBcFl0= "mxGraphModel")**封装了 Model 的相关操作**。

你可以启动项目，画一个这样的图，然后点击输出XML。为了保的 xml 与下面的一致，需要先拖出智爷，再拖出超级皮卡丘，最后连接边。

![](./assets/image/image_mXWZmUdUTq.png)

控制台应该输出这样一份 xml

```xml 
<mxGraphModel>
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>
    <mxCell id="4" value="Hello" style="node;image=/static/images/ele/ele-005.png" vertex="1" data="{&quot;id&quot;:1,&quot;element&quot;:{&quot;id&quot;:1,&quot;icon&quot;:&quot;ele-005.png&quot;,&quot;title&quot;:&quot;智爷&quot;},&quot;normalType&quot;:&quot;water.png&quot;}" parent="1">
      <mxGeometry x="380" y="230" width="100" height="135" as="geometry"/>
    </mxCell>
    ........
  </root>
</mxGraphModel>
```


每**一个 mxCell 节点都有 parent 属性指向父节点**。我们对 value="Hello" 这个 mxCell 节点手动格式化。

```xml 
<mxCell 
    id="4" 
    value="Hello" 
    style="node;image=/static/images/ele/ele-005.png" 
    vertex="1" 
    data="{&quot;id&quot;:1,&quot;element&quot;:{&quot;id&quot;:1,&quot;icon&quot;:&quot;ele-005.png&quot;,&quot;title&quot;:&quot;智爷&quot;},&quot;normalType&quot;:&quot;water.png&quot;}" 
    parent="1">
  <mxGeometry 
    x="380" 
    y="230" 
    width="100" 
    height="135" as="geometry"/>
</mxCell>
```


**data 值是原对象经 JSON.stringify 得到的，经转义后就变成了上面的样子**。控制台还打印了一个 mxGraphModel 对象，对比上面的 xml 与 下图的节点对象，可以发现它们只是同一个 `Model` 的不同表现形式，`xml` 正是将[**mxGraph.model**](https://link.segmentfault.com/?enc=vbDMzbljKRonGdft/hqfWQ==.GUORAB30Wttk9m4o9lWQvqg76L00znfQLyhwKwzpEc27sVoNiQkati4Gjdsgawmu/62gGlrRfLaQZZttS968bayFQS0NIsBaIjwrhp4beqhhWxgpnj6AjwgnE6k77GZn "mxGraph.model")格式化而成的。

![](./assets/image/image_k8fM3DzJN4.png)

# Model 编程模型

`mxcell` 在 `mxGraphModel` 中实现了定义图模型的元素。

![](./assets/image/image_QwReEq7x9I.png)

图模型有以下属性（包含关系）：

1. **根节点包含各个层，各个层的父节点都是根节点。**
2. 层中可**包含 graph 图模型的元素：节点、连线组。**
3. 组中**可递归的包含 graph 图模型的元素。**
4. graph 图的结构和信息都**存储在 cell 和用户对象中。（又名业务对象）**

**用一个根节点和默认的层来创建一个新的 graph 模型：**

```javascript 
var root = new mxCell();
root.insert(new mxCell());
var model = new mxGraphModel(root);
```


### Container

mxGraph渲染容器. 应该将一个DOM对象作为参数实例化 mxGraph:

```javascript 
var graph = new mxGraph(document.getElementById('graphContainer'));
```


### Vertex 和 Edge

mxGraph是个图形编辑库,图形实际是有两个元素组成:节点(Vertex)和边(Edge).

mxGraph中新增节点和边最常用的方式:

```javascript 
var v1 = graph.insertVertex(root, null,'Hello,', 20, 20, 80, 30);
var v2 = graph.insertVertex(root, null,'World!', 200, 150, 80, 30);
var e1 = graph.insertEdge(root, null, '', v1, v2);
```


### parent

mxGraph容器内的内容是个树形结构,树的顶点就是通过容器获取的根节点:

```javascript 
var graph = new mxGraph(container);
var root = graph.getDefaultParent();
```


**每个节点和边都应该有个父元素. 而节点(Vertex)是可以作为其他节点的父元素**
