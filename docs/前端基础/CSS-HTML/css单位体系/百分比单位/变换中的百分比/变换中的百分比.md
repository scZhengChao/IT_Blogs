# 变换中的百分比

CSS 中的 transform 属性中的 translate 和 transform-origin 值也可以设置百分比。

- translateX() 根据**容器的 width 计算。**
- translateY() 根据**容器的 height 计算。**
- transform-origin 中横坐标（ x ）相对于容器的 width 计算；纵坐标（ y ）相对于容器的 height 计算。

注意，在 translate 还有一个\*\* z 轴的函数 translateZ() 。它是不接受百分比为单位的值。\*\*
