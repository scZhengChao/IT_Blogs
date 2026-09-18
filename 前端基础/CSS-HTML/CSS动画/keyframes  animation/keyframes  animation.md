# keyframes  animation

CSS Animation 才算是真正意义上的 CSS3 动画，它具备了对 **关键帧和循环次数** 的自定义能力。与 CSS Transition 相比较，有如下 CSS 过渡 所不具备的特性：

1. CSS Animation 在实现像 CSS Transition **补间动画** 效果时，还可以在起始帧和结束帧之间自定义中间帧，使得动画更加平滑过渡的同时，对动画有了更好的控制和自定义能力。
2. CSS Animation 通过 `animation-timing-function: steps()` 属性实现了 CSS Transition 无法具备的 **逐帧动画** 效果
3. CSS Animation 只要定义了结束帧 (即 `@keyframes` 中的 `to`)，在首屏渲染时，它默认会以指定元素在动画开始时刻的样式作为起始关键帧，并结合 `to` 定义的结束关键帧和指定元素的 `animation` 其他参数来完成补间动画的计算和动画帧的绘制。

[语法](IT/前端基础/CSS-HTML/CSS动画/keyframes%20%20animation/语法/语法.md "语法")

[案例 ](案例-.md "案例 ")

[高级使用](IT/前端基础/CSS-HTML/CSS动画/keyframes%20%20animation/高级使用/高级使用.md "高级使用")

[常见问题](IT/前端基础/CSS-HTML/CSS动画/keyframes%20%20animation/常见问题/常见问题.md "常见问题")
