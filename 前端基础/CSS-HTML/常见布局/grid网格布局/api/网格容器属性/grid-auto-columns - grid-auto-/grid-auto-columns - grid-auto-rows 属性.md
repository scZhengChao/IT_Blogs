# grid-auto-columns / grid-auto-rows 属性

网格布局中，当网格中的网格项多于单元格时，或者当网格项位于显式网格之外时，比如网格只有3列，但是某一个项目指定在第5列，这些情况下就会创建隐式网格，以便放置项目。

grid-auto-columns属性和grid-auto-rows属性用来设置浏览器自动创建的隐式网格的列宽和行高。它们的写法与grid-template-columns和grid-template-rows完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

示例：

```typescript 
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Grid 布局</title>
  <style>
    .container{
      display: grid;
      grid-template-columns: 100px 100px 100px;
      grid-template-rows: 100px 100px 100px;
      grid-auto-rows: 50px; 
                    }
  .item {
      font-size: 2em;
      text-align: center;
      background: lightblue;
      border: 1px solid #fff;
                    }
  .item-8 {
    background-color: #d0e4a9;
      grid-row-start: 4;
      grid-column-start: 2;
                    }
    .item-9 {
      background-color: #4dc7ec;
      grid-row-start: 5;
      grid-column-start: 3;
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
  <div class="item item-8">8</div>
  <div class="item item-9">9</div>
</div>
</body>
</html>
```


页面效果：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8949c24a9f1483396fafdaf73776dce~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

由于8号项目和9号项目超出了显式网格的行数，因此我们可以通过grid-auto-rows定义其网格项的行高。那么我们再给网格容器添加 grid-auto-columns: 50px; 能不能使得其列宽也只有50px呢？答案是不能，这是因为8号和9号项目的列数并没有超出显式网格，如果我们需要定义隐式网格的列宽 看如下示例：

```typescript 
.container{
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    grid-auto-columns: 50px; 
}
.item-8 {
    background-color: #d0e4a9;
    grid-row-start: 3;
    grid-column-start: 4;
}
.item-9 {
    background-color: #4dc7ec;
    grid-row-start: 3;
    grid-column-start: 5;
}

```


页面效果：

![](image_OLvg1sd0cU.png)

我们可以发现4号项目和5号项目也发生了改变，想要了解原因需要了解隐式网格的定义：

如果网格项的数量多于网格单元格，或者网格项位于显式网格外部，则网格容器会通过向网格添加网格线自动生成网格轨道，显式网格与这些额外的隐式轨道和网格线一起形成所谓的隐式网格（更多关于隐式网格可以查看[显式网格和隐式网格之间的区别](https://link.juejin.cn?target=https://www.html.cn/archives/10327 "显式网格和隐式网格之间的区别")）。

我们再来看上面两个示例，两个网格项放置在显式网格之外，导致创建隐式网格线条和网格轨道，grid-auto-columns 属性和 grid-auto-rows 属性设置了隐式网格的列宽和行高，所有网格项目在默认情况下在隐式网格中按照“先行后列”的顺序进行排列，因此呈现出了上面两个示例的页面效果。

补充：grid-auto-columns，grid-auto-rows，和 grid-auto-flow 属性都属于隐形网格属性，grid-auto-flow 属性也可以定义隐形网格中网格项的自动布局方式。
