# shadow

## 目录

- [shadow](#shadow)
  - [语法](#语法)

[ box-shadow - CSS：层叠样式表 | MDNMDN Web DocsMDN logoMozilla logo CSS box-shadow 属性用于在元素的框架上添加阴影效果。你可以在同一个元素上设置多个阴影效果，并用逗号将他们分隔开。该属性可设置的值包括阴影的 X 轴偏移量、Y 轴偏移量、模糊半径、扩散半径和颜色。 https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow " box-shadow - CSS：层叠样式表 | MDNMDN Web DocsMDN logoMozilla logo CSS box-shadow 属性用于在元素的框架上添加阴影效果。你可以在同一个元素上设置多个阴影效果，并用逗号将他们分隔开。该属性可设置的值包括阴影的 X 轴偏移量、Y 轴偏移量、模糊半径、扩散半径和颜色。 https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow")

# shadow

```css 
box-shadow: x y 模糊层度px  模糊尺寸 颜色 inset
text-shadow: x  y  模糊层度px 颜色; 文字阴影

```


## 语法

box-shadow: *h-shadow v-shadow blur spread color* inset;

**注意：** boxShadow 属性把一个或多个下拉阴影添加到框上。该属性是一个用逗号分隔阴影的列表，每个阴影由 2-4 个长度值、一个可选的颜色值和一个可选的 inset 关键字来规定。省略长度的值是 0。

| 值          | 说明                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------ |
| *h-shadow* | 必需的。水平阴影的位置。允许负值                                                                           |
| *v-shadow* | 必需的。垂直阴影的位置。允许负值                                                                           |
| *blur*     | 可选。模糊距离                                                                                    |
| *spread*   | 可选。阴影的大小                                                                                   |
| *color*    | 可选。阴影的颜色。在[CSS颜色值](https://www.runoob.com/cssref/css_colors_legal.aspx "CSS颜色值")寻找颜色值的完整列表 |
| inset      | 可选。从外层的阴影（开始时）改变阴影内侧阴影                                                                     |

mask 属性允许使用者通过遮罩或者裁切特定区域的图片的方式来隐藏一个元素的部分或者全部可见区域。

mask-origin属性性质上和background-origin类似，但是mask-origin支持的属性值要多一点，主要是多了个SVG元素的mask-origin支持。
