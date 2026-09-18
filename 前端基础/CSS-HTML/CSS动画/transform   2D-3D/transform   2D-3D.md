# transform   2D/3D

## 目录

- [Api](#Api)

transform 可以让过渡元素产生一些常规的 2D 动画效果，例如旋转，位移，缩放，扭曲......等等，以及 3D 的立体效果。

# Api

> **（特别注意不会引起滚动条的变化；即不会触发scroll事件）**

- transform:  translate/rotate/scale/skew  平移/旋转/缩放/扭曲
- transition:  all/width/height/attr 10s   delay  ease/linear
- transiform-origin:基点(x,y)   center/left/top/right     2d变化相当于posiiton:relative;形变魂不变
- backface-visibility本意就是对设置进行转换的元素的背面在面对用户时是否可见。 &#x20;
  - backface-visibility:<'visible'>(显示) | <'hidden'>(隐藏)

[语法](IT/前端基础/CSS-HTML/CSS动画/transform%20%20%202D-3D/语法/语法.md "语法")
