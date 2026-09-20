# Hello World

## 目录

- [引入mxGraph](#引入mxGraph)
- [浏览器兼容性检查](#浏览器兼容性检查)
- [Container](#Container)
- [Graph对象的定义](#Graph对象的定义)
- [添加点和边](#添加点和边)

#### 引入mxGraph

在HMTL的head部分加入如下代码：

```html 
<script type="text/javascript">
  mxBasePath = 'javascript/src';
</script>
<script type="text/javascript" src="javascript/src/js/mxClient.js"></script>

```


引入mxGraph和别的库不同的地方是需要知道mxBasePath，也就是前面我们说的src目录的路径。

#### 浏览器兼容性检查

使用mxGraph前我们首先需要检查用户的浏览器是否支持，代码如下：

```javascript 
<script type="text/javascript";>
function main(container)
{
  // 检查浏览器是否支持 
  if (!mxClient.isBrowserSupported())
  {
    // 如果不支持显示错误信息
    mxUtils.error('Browser is not supported!', 200, false);
  }
  ...


```


#### Container

我们需要在某个Element里显示mxGraph，通常当然是放到一个DIV里。我们在HTML的BODY里定义一个DIV，然后在构造mxGraph的时候通过getElementById找到它并传入。

```html 
<body onload="main(document.getElementById('graphContainer'))">

   <!-- Creates a container for the graph with a grid wallpaper -->
   <div id="graphContainer"
      style="overflow:hidden;width:321px;height:241px;background:url('editors/images/grid.gif')">
   </div>
</body>

```


我们在div里指定的样式是div的宽度、高度以及overflow:hidden(这可以去掉滚动条)，另外作为流程图的编辑，我们通常在使用网格的背景(每个网格10px)，这样便于对齐，另外这样看起来更加专业一点。除此之外，其它的所有与图相关的样式都是在mxGraph里通过后面介绍的样式来修改。

#### Graph对象的定义

```javascript 
var model = new mxGraphModel();
var graph = new mxGraph(container, model);

```


container就是我们前面定义的DIV，我们也可以不自己构造mxGraphModel，这样也是可以的：

```javascript 
var graph = new mxGraph(container);

```


#### 添加点和边

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


所有的修改都需要在beginUpdate和endUpdate之间，而且一旦调用了beginUpdate，就一定要调用endUpdate，所以这里的代码把endUpdate放到finally里以确保它一定会被调用。而beginUpdate一定不能放到try里面，否则如果beginUpdate抛出异常，也会调用endUpdate，这是不行的！

最终的效果如下图所示：

![](https://fancyerii.github.io/img/mxgraph/hello_world.png)
