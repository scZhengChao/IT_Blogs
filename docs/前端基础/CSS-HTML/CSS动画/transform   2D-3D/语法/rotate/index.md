# rotate

- rotate(angle)定义2D旋转 ——原点为基点 &#x20;
- rotateX(angle)X ——X轴为基点 &#x20;
- rotateY(angle)Y ——Y轴为基点 &#x20;
- transform: rotate3d(x,y,z,angle)定义3d旋转 ——（x,y,z）为基点 +旋转角度

> 注：x/y/z 取0,1之间的数值，代表元素围绕x/y/z轴的旋转的矢量值，0表示x/y/z轴方向不旋转，1反之，+/-表示方向。

![](./assets/image/image_w5wFTcdrVm.webp)

```css 
transform: rotate(angle);   
    - 正值:顺时针旋转  rotate(360deg)
    - 负值:逆时针旋转  rotate(-360deg)
    - 只能设单值。正数表示顺时针旋转，负数表示逆时针旋转

transform: rotate(0.5turn);

rotate3d(x,y,z,angle)
前三个分别为是否绕x，y，z旋转，1为是，0为否


```
