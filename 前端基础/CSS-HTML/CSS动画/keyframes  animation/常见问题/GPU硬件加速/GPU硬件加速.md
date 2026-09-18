# GPU硬件加速

```css 
.tran {  
    -webkit-transform: translate3d(200px,200px,200px)
   rotate3d(200px,200px,200px,-120deg)
   scale3d(0.5, 0.5, 0.5);}

```


可是在一些情况下，我们并不需要对元素应用3D变换的效果，那怎么办呢？这时候我们可以使用个小技巧“欺骗”浏览器来开启硬件加速。

```css 
.tran {  
-webkit-transform: translateZ(0);  
-moz-transform: translateZ(0);  
-ms-transform: translateZ(0);  
-o-transform: translateZ(0);  
transform: translateZ(0);   /* Other transform properties here */}
```


当我们使用CSS transforms 或者 animations时可能会有页面闪烁的效果，下面的代码可以修复此情况：

```css 
.tran {  
-webkit-backface-visibility: hidden;  
-moz-backface-visibility: hidden;  
-ms-backface-visibility: hidden; 
backface-visibility: hidden;  
-webkit-perspective: 1000;  
-moz-perspective: 1000;  
-ms-perspective: 1000;  
perspective: 1000;   /* Other transform properties here */}
```
