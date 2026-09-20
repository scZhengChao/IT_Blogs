# 四种内联盒子

1. 在CSS中有四种内联盒子，分别是`containing box`,`inline boxes`,`line box`,`content area`。分别如下：

(1)**containing box**: 外层盒子模型,包含了其他的boxes

(2)**line boxes**: 由一个一个的inline boxes组成 **，一行即为一个line box**，单个line box的高度由其包含的所有inline boxes中，高度最大的那个决定（由`line-height`起作用，后面解释），而一个一个的line box的高度就堆叠成了containing box的高度。

(3)**inline boxes**: **不会成块显示，而是并排显示在一行的boxes**，如`span`,`a`,`em`等标签以及匿名inline boxes（即不含把标签的裸露的文字）。

(4)**content area**: **围绕文字看不见的box，其大小与font-size有关，其高度可以认为鼠标选中文字时背景色的高度(后面解释)。**
以下为几种boxes的关系(图片中，粉红色为鼠标选中的文字部分)

```html 
<div>
 这里是一个div，里面包含了独立的文字，
 <span>span标签</span>
 <em>em标签</em>，
 以及其他的一些文字。
</div>

```


![](./image/image_d026nvVv5W.png)

理解四种box非常重要，平时的使用浮动，定位，父级高度自动撑开等表现都是与boxes的作用有很大的关系。
