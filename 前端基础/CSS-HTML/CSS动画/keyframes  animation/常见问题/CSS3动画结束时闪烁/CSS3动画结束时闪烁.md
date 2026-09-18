# CSS3动画结束时闪烁

## 目录

- [CSS3动画结束时闪烁](#CSS3动画结束时闪烁)
- [首次渲染CSS3动画时闪烁BUG  ](#首次渲染CSS3动画时闪烁BUG--)

#### CSS3动画结束时闪烁

如果你没有特别规定动画结束后的状态的话，**动画在结束后都会直接跳回到动画未执行时候的原始状态，可参考animation-fill-mode属性。**

#### 首次渲染CSS3动画时闪烁BUG &#x20;

部分webkit内核手机浏览器在使用transform:translate属性时，会出现闪烁现象，解决方案大致有如下几种：

```css 
-webkit-backface-visibility:hidden; //隐藏转换的元素的背面
-webkit-transform-style: preserve-3d; //使被转换的元素的子元素保留其 3D 转换
-webkit-transform:translate3d(0,0,0); //开启GPU硬件加速模式，使用GPU代替CPU渲染动画（在安卓系统中有时会有莫名其妙的BUG，建议慎重）
```
