# 过渡效果

> ease : Ease (or Function or String)

\*\*过渡效果的速度曲线，概念有点类似于 \*\***`animation-timing-function`**

Tips: `TweenLite`中包含了基本缓动：`Power0`、`Power1`、`Power2`、`Power3`、`Power4`、`Linear`、Quad、Cubic、Quart、Quint、Strong，他们每个都含有.easeIn、.easeOut、.easeInOut参数（对于线性动画，请使用Power0.easeNone）。 &#x20;

而TweenMax在此基础上还另外增加了特殊缓动：Elastic、Back、Bounce、SlowMo、SteppedEase、RoughEase、Circ、Expo、Sine。 &#x20;

如果想在TweenLite中使用特殊缓动则需要加载缓动类easing/EasePack.min.js

```typescript 
import {TweenMax} from 'gsap'
import {Bounce} from 'gsap'    //Bounce模块也要额外引入

new TweenMax.to('.box',3,{
  x:600,
  ease:Bounce.easeIn     //设置动画曲线，感觉有点抽搐的感觉，哈哈哈
})
```


![](https://upload-images.jianshu.io/upload_images/15263556-e6273f124f5cb617.image?imageMogr2/auto-orient/strip|imageView2/2/w/938/format/webp)
