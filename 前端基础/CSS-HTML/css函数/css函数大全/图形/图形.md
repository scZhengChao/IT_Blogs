# 图形

## 目录

- [circle()](#circle)
- [ellipse()](#ellipse)
- [inset()](#inset)
- [polygon()](#polygon)
- [path()](#path)

### circle()

`circle()` 函数用于定义一个**圆形区域**，并可以用于多种 CSS 属性中，如`shape-outside`或`clip-path`。这个函数允许指定一个圆形的半径和位置，以创建特定的布局或剪裁效果。

- 在`shape-outside`属性中，`circle()`函数定义了一个围绕元素内容的圆形路径，使得文本或其他内容可以环绕在这个圆形的外部流动。这对于创建独特的文本布局和视觉效果非常有用。
- 在`clip-path`属性中，`circle()`函数则用于剪裁元素的内容，只显示圆形区域内的部分。这可以用于创建圆形头像、圆形图标等效果。

`circle()`函数的语法如下：

```javascript 
circle( [ <length> | <percentage> ]? [ at <position> ]? )
```


- `<length>`或`<percentage>`参数定义了圆形的半径。如果省略，浏览器会提供一个默认值。
- `at <position>`参数是可选的，用于指定圆形的位置。如果省略，圆形将居中于元素。

例如，可以使用以下代码来创建一个半径为`100px`，位置在`(50px, 50px)`的圆形：

```javascript 
shape-outside: circle(100px at 50px 50px);

```


或者，如果想要创建一个半径为50%的圆形，使其始终与元素的大小相匹配，可以这样写：

```javascript 
clip-path: circle(50%);

```


### ellipse()

`ellipse()` 函数用于定义一个椭圆形区域。与`circle()`函数类似，`ellipse()`函数也可以用于多种CSS属性中，如`shape-outside`或`clip-path`，以创建特定的布局或剪裁效果。

- 在`shape-outside`属性中，`ellipse()`函数定义了一个围绕元素内容的椭圆形路径，使得文本或其他内容可以环绕在这个椭圆形的外部流动。这对于创建独特的文本布局和视觉效果非常有用，特别是在需要文本环绕非圆形区域时。
- 在`clip-path`属性中，`ellipse()`函数则用于剪裁元素的内容，只显示椭圆形区域内的部分。这可以用于创建椭圆形头像、椭圆形图像裁剪等效果。

`ellipse()`函数的语法通常如下：

```javascript 
ellipse( [ <length> | <percentage> ]{2} [ at <position> ]? )

```


- `<length>`或`<percentage>`参数定义了椭圆的水平和垂直半径。可以提供两个值来分别指定椭圆的宽度和高度。
- `at <position>`参数是可选的，用于指定椭圆形的位置。如果省略，椭圆形将居中于元素。

例如，以下代码创建了一个水平半径为100px，垂直半径为50px，位置在(50px, 50px)的椭圆形：

```javascript 
shape-outside: ellipse(100px 50px at 50px 50px);
```


或者，如果想要创建一个与元素大小成比例的椭圆形，可以使用百分比值：

```javascript 
clip-path: ellipse(50% 75%);

```


这将创建一个宽度为元素宽度50%，高度为元素高度75%的椭圆形剪裁。

### inset()

`inset()` 函数用于定义图形剪裁区域的函数，主要在`clip-path`属性中使用。它允许创建一个矩形或带有圆角的矩形剪裁区域，该区域定义了元素内容应该显示的部分。

`inset()`函数的语法如下：

```javascript 
inset( [ <length> | <percentage> ]{1,4} [ round <border-radius> ]? )

```


- `[ <length> | <percentage> ]{1,4}`：这个参数指定了矩形边框的偏移量。可以提供1到4个值，分别代表上、右、下、左四个方向的偏移。如果只给出一个值，则所有四个方向都将使用这个值。如果给出两个值，第一个值将用于上下偏移，第二个值将用于左右偏移。如果给出三个值，它们将分别用于上、左右、下的偏移。如果给出四个值，它们将分别用于上、右、下、左的偏移。这些值可以是长度单位（如px、em等）或百分比。
- `round <border-radius>`：这是一个可选参数，用于指定矩形的圆角半径。可以提供一个或多个值来定义不同角的圆角大小。这些值遵循与CSS的`border-radius`属性相同的语法和规则。

```javascript 
/* 创建一个从边框向内偏移10px的矩形剪裁区域 */  
clip-path: inset(10px);  
  
/* 创建一个从顶部边框向内偏移20px，从右侧和左侧边框向内偏移30px，从底部边框向内偏移40px的矩形剪裁区域 */  
clip-path: inset(20px 30px 40px);  
  
/* 创建一个从顶部边框向内偏移10%，从右侧和左侧边框向内偏移20%，从底部边框向内偏移30%，并带有50px圆角的矩形剪裁区域 */  
clip-path: inset(10% 20% 30% round 50px);  
  
/* 创建一个带有四个不同圆角的矩形剪裁区域 */  
clip-path: inset(20px round 10px 20px 30px 40px);

```


注意，`inset()`函数在clip-path属性中使用时，将创建一个内部剪裁效果，只显示矩形区域内的内容，而矩形外部的内容将被剪裁掉。

### polygon()

`polygon()` 函数用于定义一个由直线段组成的多边形剪裁区域。这个函数通常在`clip-path`属性中使用，以剪裁图像或文本，只显示多边形区域内的部分。

`polygon()`函数的语法如下：

```javascript 
polygon( [ <fill-rule> || <length-percentage>{2,n} ] )

```


- `<fill-rule>`：可选参数，用于定义当路径自相交时如何填充多边形。它可以是`nonzero`（默认值）或`evenodd`。
- `<length-percentage>{2,n}`：这个参数是必需的，它定义了多边形的每个顶点的坐标。每个顶点由两个值表示，分别是X和Y坐标。可以提供至少两个顶点来定义一个简单的多边形，每个顶点对由空格分隔。

以下是一些使用`polygon()`函数的例子：

```javascript 
/* 定义一个三角形剪裁区域 */  
clip-path: polygon(50% 0%, 0% 100%, 100% 100%);  
  
/* 定义一个四边形（矩形）剪裁区域 */  
clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);  
  
/* 定义一个五边形剪裁区域 */  
clip-path: polygon(0% 0%, 25% 100%, 50% 0%, 75% 100%, 100% 0%);  
  
/* 使用 fill-rule */  
clip-path: polygon(nonzero, 50% 0%, 0% 100%, 100% 100%);

```


这里，每个多边形的顶点坐标都是相对于元素自身的宽度和高度的百分比。可以使用绝对长度单位（如px, em等）代替百分比，但这通常不常见。

注意，`polygon()`函数定义的顶点顺序很重要，它决定了多边形的形状和方向。

### path()

`path()`函数与`clip-path`属性结合使用，用于定义图形剪裁区域。该函数允许指定一个SVG路径来定义剪裁的形状。通过`path()`函数，可以使用SVG路径语法来创建复杂的剪裁区域，从而实现更精确的图像或文本剪裁效果。

`path()`函数的语法如下：

```javascript 
clip-path: path(<svg-path-data>);

```


其中`<svg-path-data>`是一个SVG路径数据字符串，它描述了剪裁区域的形状。这个字符串可以使用SVG路径命令和参数来定义，例如`M（moveto）`、`L（lineto）`、`C（curveto）`等。

以下是一个使用`path()`函数剪裁图像的例子：

```javascript 
.clipped-image {  
  clip-path: path('M0,0 L1,0 L1,1 L0,1 Z');  
}

```


这里，`path('M0,0 L1,0 L1,1 L0,1 Z')`定义了一个矩形剪裁区域。这个路径从点`(0,0)`开始，沿直线到`(1,0)`，然后到`(1,1)`，再到`(0,1)`，最后关闭路径（Z表示回到起始点）。
