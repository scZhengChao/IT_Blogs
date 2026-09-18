# `命名样式`

## 目录

- [命名样式](#命名样式)

第二种是`命名样式`。先创建一个样式对象，然后使用[mxStylesheet.putCellStyle](https://link.segmentfault.com/?enc=m6jxJdimbybIovvtShaKvg==.t9+l/92prnsVwCE/X0Hi6poPjpUjz9KIeo6I7/jLpdby4N1TkCxxBh7U5uA9TOdJKa4SdYCvhVk0SWs/V0WGhnrLaK+zlzQwgueENUZqDl9ytxSg4Gtf7K2JzRdJpHAPqOyO7BtldNykxjWpFApm0w== "mxStylesheet.putCellStyle")方法为`mxStylesheet.styles`添加该样式对象并命名。在添加 Cell 的时候，将样式写在参数中。格式如下

```stylus 
[stylename;|key=value;]

```


分号前可以跟命名样式名称或者一个样式的 key、value 对。

`ROUNDED`是一个内置的命名样式，对节点设置有圆角效果，对边设置则边的拐弯处为圆角。

# `命名样式`

比如在上图中，有一个`defaultVertex`样式，`它是默认的点`的样式；而`defaultEdge`是`默认边的样式`。当然**一个样式也可以同时应用于点和边**。除了`defaultVertex`和`defaultEdge`等系统预先定义的样式，**我们也可以自己定义样式：**

```javascript 
var style = new Object();
style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
style[mxConstants.STYLE_OPACITY] = 50;
style[mxConstants.STYLE_FONTCOLOR]= '#774400';
graph.getStylesheet().putCellStyle('ROUNDED',style);

```


比如上面的代码就定义了名为`ROUNDED`的样式，定义之后我们就可以在**创建节点或者边的时候使用这个自定义样式**：

```javascript 
var v1 = graph.insertVertex(parent, null, 'Hello', 20, 20, 80, 30, 'ROUNDED');

```


当然我们也可以使用这个样式，但是**又修改部分具体的样式，我们需要用分号(;)来加入具体样式：**

```javascript 
var v1 = graph.insertVertex(parent, null, 'Hello',  20, 20, 80, 30, 'ROUNDED;strokeColor=red;fillColor=green');
```


我们也可以不使用任何样式而直接指定具体样式：

```javascript 
var v1 = graph.insertVertex(parent, null, 'Hello', 20, 20, 80, 30, ';strokeColor=red;fillColor=green');

```


因此上面的代码**指定画笔的颜色是红色而填充的颜色是绿色**，除此之外没有任何样式。
