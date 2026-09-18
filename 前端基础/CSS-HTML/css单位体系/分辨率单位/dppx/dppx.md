# dppx

dppx 全称为 dots per pixel，**表示每像素（px）包含点的数量**。由于CSS px的固定比率为1:96，**因此1dppx相当于96dpi。** 它对应于由图像分辨率定义的CSS中显示的图像的默认分辨率。

```javascript 
@media screen and (min-resolution: 2dppx) { ... }
@media screen and (min-resolution: 1dppx) and (max-resolution: 1.9dppx) { ... }
```
