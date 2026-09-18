# 鼠标穿透pointer-events

**需求：将一张照片盖到一个div上面，但同时下面div上面的点击事件不受影响。**

这样就需要用到 CSS 的鼠标穿透属性：[pointer-events](https://so.csdn.net/so/search?q=pointer-events\&spm=1001.2101.3001.7020 "pointer-events")`: none`，下面主要对pointer-events属性的值做一个简单的介绍。

**pointer-event的所有属性值:**

```css 
pointer-events: 
  auto |。
  none |。
  visiblePainted |。
  visibleFill |。
  visibleStroke |。
  visible |。
  painted |。
  fill |。
  stroke |。
  all |。
  inherit |。
  initial |。
  unset;

```


`pointer-events`属性**定义元素是否对**[**鼠标事件**](https://so.csdn.net/so/search?q=鼠标事件\&spm=1001.2101.3001.7020 "鼠标事件")**做出反应**，从通用角度来说，只有以下4个值可用，剩余不多做说明，只适用于SVG（可缩放矢量）内容。

pointer-event的通用属性值:

`pointer-events: auto | none | inherit | initial | unset`;

1. pointer-events: auto; 默认值，元素对鼠标事件正常反应。
2. pointer-events: none; **元素不会成为鼠标事件的target，能够实现点击穿透的效果**。
   1. 例如：想给登录页面加个水印，我们一个div块，**设置水印图片作为**背景图片定位到原登录页面登录模块的上面，并给这个div块设置这个属性，用户点击登录时可以穿透这个div块，点击到原本的登录页面，这样就不会影响原有的登录功能及登陆样式。
3. pointer-events: inherit; 从其父元素继承此属性。
4. pointer-events: initial; `initial`是一个关键字，会**将pointer-events属性重置为最原始的值**，

先看一下官方文档解释：

`initial` 关键字用于**将 CSS 属性设置为其默认值。initial 关键字可用于任何 CSS 属性和任何 HTML 元素。**
