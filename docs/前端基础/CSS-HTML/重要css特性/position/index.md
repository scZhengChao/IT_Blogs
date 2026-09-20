# position

## 目录

- [static 定位](#static-定位)
- [fixed 定位](#fixed-定位)
- [relative 定位](#relative-定位)
- [absolute 定位](#absolute-定位)
- [sticky 定位](#sticky-定位)
- [重叠的元素](#重叠的元素)

position 属性指定了元素的定位类型。

position 属性的五个值：

- [**static**](https://www.runoob.com/css/css-positioning.html#position-static "static")
- [**relative**](https://www.runoob.com/css/css-positioning.html#position-relative "relative")
- [**fixed**](https://www.runoob.com/css/css-positioning.html#position-fixed "fixed")
- [**absolute**](https://www.runoob.com/css/css-positioning.html#position-absolute "absolute")
- [**sticky**](https://www.runoob.com/css/css-positioning.html#position-sticky "sticky")

元素可以使用的顶部，底部，左侧和右侧属性定位。然而，这些属性无法工作，除非是先设定position属性。他们也有不同的工作方式，这取决于定位方法。

***

## static 定位

该关键字指定元素**使用正常的布局行为**，即元素在**文档常规流中当前的布局位置**。此时 `top`, `right`, `bottom`, `left` 和 `z-index` 属性无效。

```javascript 
div.static {
    position: static;
    border: 3px solid #73AD21;
}
```


## fixed 定位

元素的位置\*\*相对于浏览器窗口是固定位置。\*\***并不是父元素**

即使窗口是滚动的它也不会移动：

元素会被**移出正常文档流**，**并不为元素预留空间，**而是通过指定元素相**对于屏幕视口（viewport）的位置来指定元素位置**。元素的位置在屏幕**滚动时不会改变**。**打印时，元素会出现在的每页的固定位置**。`fixed` **属性会创建新的层叠上下文*****当元素祖先的 ******`transform`******、******`perspective`******、******`filter`***\*\*\* 或 ******`backdrop-filter`****** 属性非 ******`none`****** 时，容器由视口改为该祖先。\*\*\*

```javascript 
p.pos_fixed
{
    position:fixed;
    top:30px;
    right:5px;
}
```


**注意：** Fixed 定位在 IE7 和 IE8 下需要描述 !DOCTYPE 才能支持。

Fixed定位使元素的位置与文档流无关，因此不占据空间。

Fixed定位的元素和其他元素重叠。

## relative 定位

该关键字下，元素**先放置在未添加定位时的位置**，**再在不改变页面布局的前提下调整元素位置**（因此会在此元素**未添加定位时所在位置留下空白**）。`position:relative 对 table-*-group, table-row, table-column, table-cell, table-caption` 元素无效。

```javascript 
h2.pos_left
{
    position:relative;
    left:-20px;
}
h2.pos_right
{
    position:relative;
    left:20px;
}
```


**移动相对定位元素，但它原本所占的空间不会改变。**

```javascript 
h2.pos_top
{
    position:relative;
    top:-50px;
}
```


**相对定位元素经常被用来作为绝对定位元素的容器块。**

## absolute 定位

元素会被**移出正常文档流**，**并不为元素预留空间**，通过指定元素相对于**最近的非 static 定位祖先元素**的偏移，来确定元素位置。绝对定位的元素可以设置外边距（`margins`），**且不会与其他边距合并。**

绝对定位的元素的位置相对于最近的已定位父元素，**如果元素没有已定位的父元素**，那么它的位置相对于\<html>:

```javascript 
h2
{
    position:absolute;
    left:100px;
    top:150px;
}
```


`absolute` 定位使元素的位置与文档流无关，因此不占据空间。

`absolute` 定位的元素和其他元素重叠。

> **注意：改元素会随着relative 元素的的滚动而滚动；**

## sticky 定位

sticky 英文字面意思是粘，粘贴，所以可以把它称之为粘性定位。

position: sticky; 基于用户的滚动位置来定位。

粘性定位的元素是依赖于用户的滚动，在 **position:relative** 与 **position:fixed** 定位之间切换。

它的行为就像 **position:relative;** 而当页面滚动超出目标区域时，它的表现就像 **position:fixed;**，它会固定在目标位置。

元素定位表现为在**跨越特定阈值前为相对定位**，**之后为固定定位**。

这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

**注意:** Internet Explorer, Edge 15 及更早 IE 版本不支持 sticky 定位。 Safari 需要使用 -webkit- prefix (查看以下实例)。

元素根据**正常文档流进行定位**，然后相对它的\_**最近滚动祖先**\_（nearest scrolling ancestor）和 [containing block](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Containing_block "containing block")（**最近块级祖先** nearest block-level ancestor），包括 **table-related 元素**，基于 `top`、`right`、`bottom` 和 `left` 的值进行偏移。偏移值不会影响任何其他元素的位置。 该值**总是创建一个新的**[**层叠上下文**](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context "层叠上下文")（stacking context）。注意，一个 `sticky` 元素会“**固定**”在离它最近的一个拥有“**滚动机制**”的祖先上（***当该祖先的 ******`overflow`****** 是 ******`hidden`******、******`scroll`******、******`auto`***\*\*\* 或 ******`overlay`******时\*\* \*），即便这个祖先不是最近的真实可滚动祖先。这有效地抑制了任何“sticky”行为（详情见[Github issue on W3C CSSWG](https://github.com/w3c/csswg-drafts/issues/865 "Github issue on W3C CSSWG")）。

```javascript 
div.sticky {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    background-color: green;
    border: 2px solid #4CAF50;
}
```


## 重叠的元素

元素的定位与文档流无关，所以它们可以覆盖页面上的其它元素

z-index属性指定了一个元素的堆叠顺序（哪个元素应该放在前面，或后面）

一个元素可以有正数或负数的堆叠顺序：

```javascript 
img
{
    position:absolute;
    left:0px;
    top:0px;
    z-index:-1;
}
```


具有更高堆叠顺序的元素总是在较低的堆叠顺序元素的前面。

注意： 如果两个定位元素重叠，没有指定z - index，最后定位在HTML代码中的元素将被显示在最前面。

[堆叠上下文（isolation: isolate）](<./堆叠上下文（isolation- isolate）/index.md> "堆叠上下文（isolation: isolate）")
