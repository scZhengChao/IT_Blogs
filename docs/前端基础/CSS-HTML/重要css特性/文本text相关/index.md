# 文本text相关

## 目录

- [文字高度上下存在留白](#文字高度上下存在留白)
  - [解决方法](#解决方法)
  - [3. 关于 line-height 属性的拓展知识](#3-关于-line-height-属性的拓展知识)
- [输入强制大写](#输入强制大写)
- [下划线](#下划线)
  - [语法](#语法)

# 文字高度上下存在留白

们使用CSS为字体设置：font-size 后，发现高度会比正常UI设计的要高一些，字体的上下存在一部分留白区域占位置。 &#x20;
如图所示：

```css 
.test{
  font-size: 24px;
}

```


![](./assets/image/image_bJk6VTItGN.png)

#### 解决方法

**原因：** 字体有默认[行高](https://so.csdn.net/so/search?q=行高\&spm=1001.2101.3001.7020 "行高")。

- 方法一：给它设置 line-height 为 1；

```css 
.test{
  font-size: 24px;
  line-height: 1;
}

```


- 方法二：给它设置 line-height 等于它的 font-size；

```css 
.test{
  font-size: 24px;
  line-height: 24px;
}

```


**效果：**

![](https://img-blog.csdnimg.cn/56dcd6bec1b64e6f8debae0f40cdd764.png#pic_center)

#### 3. 关于 line-height 属性的拓展知识

**定义：** line-height 属性设置行间的距离（行高）。
**注意：** 不允许使用负值。

**说明：**
该属性会影响行框的布局。
在应用到\*\*一个块级元素时，它定义了该元素中基线之间的最小距离而不是最大距离。
****`line-height `****与****` font-size`**** 的计算值之差（在 ****`CSS`**** 中成为“行间距”）分为两半，分别加到一个文本行内容的顶部和底部。
\*\*可以包含这些内容的最小框就是行框。

原始数字值指定了一个缩放因子，后代元素会继承这个缩放因子而不是计算值。

# 输入强制大写

大写/小写

```css 
/*作用在input上就可以了*/
text-transfrom: uppercase;
/*每个单词第一个字母大写*/
text-transfrom: capitalize;

text-transform:none/capitalize/uppercase/lowercase/inherit 

```


# 下划线

```css 
/*下划线*/
text-decoration:none/underline/overline/line-through 
```


[ text-align - CSS：层叠样式表 | MDNMDN Web DocsMDN logoMozilla logo text-align CSS 属性设置块元素或者单元格框的行内内容的水平对齐。这意味着其效果和 vertical-align 类似，但是是水平方向的。 https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align " text-align - CSS：层叠样式表 | MDNMDN Web DocsMDN logoMozilla logo text-align CSS 属性设置块元素或者单元格框的行内内容的水平对齐。这意味着其效果和 vertical-align 类似，但是是水平方向的。 https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align")

`text-align` [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS "CSS") 属性设置块元素或者单元**格框的行内内容的水平对齐**。这意味着其效果和 [vertical-align](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align "vertical-align") 类似，但是是**水平方向的。**

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align#语法 "语法")

```javascript 
/* 关键字值 */
text-align: start;
text-align: end;
text-align: left;
text-align: right;
text-align: center;
text-align: justify;
text-align: justify-all;
text-align: match-parent;

/* 在表格列内基于字符的对齐 */
text-align: ".";
text-align: "." center;

/* 块对齐值（非标准语法） */
text-align: -moz-center;
text-align: -webkit-center;

/* 全局值 */
text-align: inherit;
text-align: initial;
text-align: revert;
text-align: revert-layer;
text-align: unset;

```


[line-height](./line-height/index.md "line-height")

[vertical-align](./vertical-align/index.md "vertical-align")

[不定行截断](./不定行截断/index.md "不定行截断")

[禁止文本选中](./禁止文本选中/index.md "禁止文本选中")

[文字颜色自动适配背景色](./文字颜色自动适配背景色/index.md "文字颜色自动适配背景色")

[自定义字体](./自定义字体/index.md "自定义字体")

[容器宽高固定，字数不定，请问如何使字体大小自适应容器大小](./容器宽高固定，字数不定，请问如何使字体大小自适应容器大小/index.md "容器宽高固定，字数不定，请问如何使字体大小自适应容器大小")

[根据容器的大小自动调整字体大小](./根据容器的大小自动调整字体大小/index.md "根据容器的大小自动调整字体大小")

[field-sizing](./field-sizing/index.md "field-sizing")
