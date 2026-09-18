# 继承和重载

## 目录

- [继承mxGraph](#继承mxGraph)
  - [重载](#重载)
- [添加新的定义](#添加新的定义)
  - [面向对象编程](#面向对象编程)

# 继承mxGraph

为了继承`mxGraph`，我们定义如下构造函数(如果不懂的话，请仔细阅读上面的两篇参考文章，`JavaScript`里类就是构造函数！)：

```javascript 
function MyGraph(container)
{
   //调用父类的构造函数
   mxGraph.call(this, container);
}

//通过prototype继承mxGraph
MyGraph.prototype = new mxGraph();
MyGraph.prototype.constructor = MyGraph;

```


我们通常希望这个类**可以序列化成**`XML`，从而可以**保存到后端服务器**里(比如数据库里)，因此我们通常需要如下的代码：

```javascript 
var codec = mxCodecRegistry.getCodec(mxGraph);
codec.template = new MyGraph();
mxCodecRegistry.register(codec);

```


#### 重载

比如我们**可以重载**`mxGraph`的`isSelectable`方法，这个方法用来决定某个`cell`(后面会解释，cell就是点和边等)是否可以被选中。

```javascript 
MyGraph.prototype.isSelectable = function(cell)
{
   var selectable = mxGraph.prototype.isSelectable.apply(this, arguments);
   var geo = this.model.getGeometry(cell);
   return selectable &&(geo == null || !geo.relative);
}

```


我们可以首先调用父类的方法”`mxGraph.prototype.isSelectable.apply(this, arguments)`”，然后再加上我们的判断逻辑。不了解`this`和`arguments`关键词的读者可以参考[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this "这里")和[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments "这里")。

当然我们也可以不调用父类的方法，比如：

```javascript 
mxGraph.prototype.isSelectable = function(cell)
{
   var geo = this.model.getGeometry(cell);
   return selectable && (geo == null || !geo.relative);
}

```


# 添加新的定义

我们也可以定义添加新的函数，比如：

```javascript 
MyGraph.prototype.getXml = function()
{
   var enc = new mxCodec();
   return enc.encode(this.getModel());
}


```


上面的代码给MyGraph类添加了getXml函数，但是新加的函数只能被我们自己调用，不可能被mxGraph框架回调，而前面的isSelectable通常我们不会主动调用它，而是mxGraph框架在合适的时候回调这个函数，从而改变mxGraph选择的行为。

### 面向对象编程

mxGraph 框架是使用面向对象的方式进行编写的，该框架所有类带 mx 前缀。在接下来的例子你会看到很多这种形式的方法`重写(Overwrite)`。

```javascript 
const oldBar =  mxFoo.prototype.bar;
mxFoo.prototype.bar = function (...args)=> {
   // .....
    oldBar.apply(this,args);
    // .....
};
```
