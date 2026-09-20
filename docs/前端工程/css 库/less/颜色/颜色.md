# 颜色

[&#x20;
&#x20; Less 函数 | Less.js 中文文档 - Less 中文网
&#x20;Less 扩充了 CSS 语言，增加了诸如变量、混合（mixin）、运算、函数等功能。 Less 既可以运行在服务器端（Node.js 和 Rhino 平台）也可以运行在客户端（浏览器）。 https://less.bootcss.com/functions/#color-operation-functions-lighten](https://less.bootcss.com/functions/#color-operation-functions-lighten "&#x20;
&#x20; Less 函数 | Less.js 中文文档 - Less 中文网
&#x20;Less 扩充了 CSS 语言，增加了诸如变量、混合（mixin）、运算、函数等功能。 Less 既可以运行在服务器端（Node.js 和 Rhino 平台）也可以运行在客户端（浏览器）。 https://less.bootcss.com/functions/#color-operation-functions-lighten")

LESS提供了许多有用的操作功能，以不同的方式改变和操作颜色，并采用相同单位的参数。 LESS支持一些颜色操作功能，如下表所示:

| 指令         | 描述                     |
| ---------- | ---------------------- |
| saturate   | 它改变元素中颜色的强度或饱和度。       |
| desaturate | 它降低了元素中颜色的强度或饱和度。      |
| lighten    | 它增加了元素中颜色的亮度。          |
| darken     | 它改变元素中颜色的强度或饱和度。       |
| fadein     | 它增加了所选元素的不透明度。         |
| fadeout    | 它减少所选元素的不透明度。          |
| fade       | 它用于设置所选元素的颜色的透明度。      |
| spin       | 它用于旋转所选元素的颜色的角度。       |
| mix        | 它将两种颜色与不透明度混合。         |
| tint       | 它将颜色与白色混合，同时减少颜色的比例。   |
| shade      | 它将颜色与黑色混合，因为您减少了颜色的比例。 |
| greyscale  | 它从所选元素中的颜色中丢弃饱和度。      |
| contrast   | 它设置元素中颜色的对比度。          |

```vue 
.active-link{
  background: fadeout(darken(@color-theme, 20%), 60%);
}
.ant-table-cell {
  border-right:1px solid darken(#f0f0f0,10%)!important;
}

```
