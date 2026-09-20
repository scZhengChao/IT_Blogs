# CSS动画

[   https://juejin.cn/post/7289767547329839159?searchId=2024122517172134A7DD1B3836868985D7](https://juejin.cn/post/7289767547329839159?searchId=2024122517172134A7DD1B3836868985D7 "   https://juejin.cn/post/7289767547329839159?searchId=2024122517172134A7DD1B3836868985D7")

目前浏览器实现动画的方式有如下两种，本篇将主要讲解第二种 **`CSS 动画`**。

- **`JS 动画`**
  - **setTimeout** / **setInterval** / **requestAnimationFrame** &#x20;

    我们最常用的是 `setTimeout` 和 `setInterval` 这两个API。但是这两个 API 设定的时间会因为浏览器当前工作负载而有所偏差，而且无法与浏览器的绘制帧保持同步。所以才有了 **与浏览器的绘制帧同步** 的原生 API `requestAnimationFrame`，以取代 `setTimeout` 和 `setInterval` 实现动画。
  - **Web Animations API** &#x20;

    浏览器动画引擎 API，通过 JavaScript 操作。这些 API 被设计成 `CSS Transition` 和 `CSS Animation` 的接口，很容易通过 JS 的方式实现 CSS 动画，它是对动画化的支持最有效的方式之一。

    感兴趣的朋友，可以看我这篇文章 [《讲一讲 JavaScript 动画 Web Animations API》](https://juejin.cn/post/7290823345780654136 "《讲一讲 JavaScript 动画 Web Animations API》")
- **`CSS 动画`**\*\* (本篇主题)\*\* ​
  - **CSS Transition** &#x20;

    CSS 过渡，属于**补间动画**，即设置关键帧的初始状态，然后在另一个关键帧改变这个状态，比如大小、颜色、透明度等，浏览器将自动根据二者之间帧的值创建的动画。
  - **CSS Animation** &#x20;

    CSS 动画，可以理解是 `CSS Transition` 的加强版，它既可以实现 **补间动画** 的动画效果，也可以使其以 **逐帧动画** 的方式进行绘制。

[keyframes  animation](<./keyframes  animation/index.md> "keyframes  animation")

[transition](./transition/index.md "transition")

[常见动画](./常见动画/index.md "常见动画")

[cubic-bezier](./cubic-bezier/index.md "cubic-bezier")

[transform   2D/3D](<./transform   2D-3D/index.md> "transform   2D/3D")
