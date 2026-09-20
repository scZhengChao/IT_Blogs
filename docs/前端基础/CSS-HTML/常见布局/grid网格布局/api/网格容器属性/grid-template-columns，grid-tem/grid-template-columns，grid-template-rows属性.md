# grid-template-columns，grid-template-rows属性

## 目录

- [2.1、网格线的名称](#21网格线的名称)
- [2.2、repeat()](#22repeat)
- [2.3、auto关键字](#23auto关键字)
- [2.4、auto-fill 关键字](#24auto-fill-关键字)
- [2.5、fr关键字](#25fr关键字)
- [2.6、minmax( ，)](#26minmax-)

容器指定了网格布局以后，接着就要定义网格轨道，即划分行和列。grid-template-columns属性定义每一列的列宽，grid-template-rows属性定义每一行的行高。

用法：

```typescript 
grid-template-columns: <track-size> ... | <line-name> <track-size> ... ;

grid-template-rows: <track-size> ... | <line-name> <track-size> ... ;
```


属性值：

- track-size: 网格轨道大小，可以使用css长度，百分比或用分数（用fr单位）。
- line-name: （可选）使用方括号来指定网格线名字，方便以后的引用，网格布局允许同一根网格线有多个名字。

#### 2.1、网格线的名称

如果没有直接指定网格线的名称网格线会**自动分配正数和负数名称**。示例：

```typescript 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="gbk"/>
  <meta name="viewport" content="width=device-width"/>
  <title>Grid 网格布局</title>
  <style type="text/css">
     .container {
        margin: 20px;
        display: grid;
        grid-template-columns: 50px 50px 50px;
        grid-template-rows: 50px 50px 50px;
     }
     .item { 
        text-align: center;
        border: 1px solid gray;
     }
  </style>
</head>
<body>
  <div class="container">
     <div class="item">1</div>
     <div class="item">2</div>
     <div class="item">3</div>
     <div class="item">4</div>
     <div class="item">5</div>
     <div class="item">6</div>
     <div class="item">7</div>
     <div class="item">8</div>
     <div class="item">9</div>
  </div>
</body>
</html>
```


页面效果：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7c0f8de1a1046e7bee4023afeb7f3e2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

网格线名称如上图所示。

我们也可以直接给网格线定义名字，示例：

```typescript 
.container{
    display:grid;
    grid-template-columns: [col1-start] 50px [col1-end col2-start] 50px [col2-end col3-start] 50px [col3-end];
    grid-template-rows: [row1-start] 50px [row1-end row2-start] 50px [row2-end row3-start] 50px [row3-end] ;
}

```


其中有的网格线就不止一个名字，例如\[col1-end col2-start]。

#### 2.2、repeat()

有时候，重复写同样的值非常麻烦，尤其网格很多时。这时，可以使用repeat()函数，简化重复的值。

用法：

```typescript 
repeat (m , n)
```


参数： m: 重复的次数 n: 重复的值

上面的示例代码用repeat方法可以改写成：

```typescript 
.container {
  display: grid;
  grid-template-columns: repeat(3, 50px);
  grid-template-rows: repeat(3, 50px);
}

```


repeat()重复某种模式也是可以的，示例：

```typescript 
.container {
  display: grid;
  grid-template-columns: repeat(2, 100px 20px 80px);
}

```


页面效果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22a9a8c0fcdb4786825c1b33e595cfa5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

#### 2.3、auto关键字

当你设置行或列大小为auto时，浏览器为自动为网格分配空间，示例：

```typescript 
.container {  
  display: grid;
    grid-template-columns: 50px auto 50px;
    grid-template-rows: 50px auto 50px;
}  
```


页面效果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5728f1aa1414338bcab39640bbd6b72~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

可以清晰地看到第二列的宽度基本上等于该列单元格的最大宽度，除非单元格内容设置了min-width且值大于最大宽度。

第二行的高度表现出了“包裹性”，即由内部文本或子元素决定高度。

#### 2.4、auto-fill 关键字

有时，**单元格的大小是固定的，但是容器的大小不确定**。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用auto-fill关键字表示自动填充。

```typescript 
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
}
```


页面效果：

在浏览器窗口缩放的情况下：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/546313305ccf47b4b44522e263276bac~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

在浏览器窗口全屏的情况下：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f533da7f94448888aed65ef1f99ca45~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

如上图所示，每列宽度150px，浏览器会自动填充，直到容器不能放置更多的列。

#### 2.5、fr关键字

为了方便表示比例关系，网格布局提供了fr关键字（fraction 的缩写，意为"片段"），我们可以将每个fr视为一个小单元，fr 单元允许我们用等分网格容器剩余可用空间来设置 网格轨道(Grid Track) 的大小 。

示例：

```typescript 
.container {
  display: grid;
  grid-template-columns:  150px 1fr 2fr;
 }
```


页面效果：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d2a34b017944745923ebb845936460d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

从上图我们可以看出第一列的宽度为150px，第二列和第三列以1：2的比例均分了剩余空间。

#### 2.6、minmax( ，)

minmax()函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。 示例：

```typescript 
.container {
  display: grid;
  grid-template-columns: 1fr 1fr  minmax(10px, 50px); 
}
```


页面效果：&#x20;

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d33321f8019c4decbea487e3069113d1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

如上图所示，第三列的宽度最小不小于10px，最大不超过50px。
