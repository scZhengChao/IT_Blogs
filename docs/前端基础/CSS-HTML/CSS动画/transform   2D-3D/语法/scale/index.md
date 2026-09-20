# scale

```css 
transform:scale(2);
  - X方向缩放:transform:  scaleX(sx); 
  - Y方向缩放:transform:  scaleY(sy);
  - 二维缩放 :transform:  scale(sx[, sy]);  (如果sy 未指定，默认认为和sx的值相同)  
 
  要缩小请设0.01～0.99之间的值，要放大请设超过1的值。
  例如缩小一倍可以transform: scale(.5);
      放大一倍可以transform: scale(2);
 
 如果只想X轴缩放，可以用scaleX(.5)相当于scale(.5, 1)。
 同理只想Y轴缩放，可以用scaleY(.5)相当于scale(1, .5)
 
 正值:缩放的程度
 负值:不推荐使用（有旋转效果）
 单值时表示只X轴,Y轴上缩放粒度一样，如transform: scale(2);等价于transform: scale(2,2);


```
