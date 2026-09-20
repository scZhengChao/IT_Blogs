# 角度单位

CSS中的角度单位有四个：deg、grad、rad、turn。这些角度单位都是CSS3中新增的单位。它们的换算关系如下

```javascript 
90deg = 100grad = 0.25turn ≈ 1.570796326794897rad
```


一般这些角度单位用于元素的旋转操作，包括2D旋转、3D旋转等。

- 当旋转值为正值时，元素会顺时针旋转。
- 当旋转值为负值时，元素会逆时针旋转。

通常情况下，一个完整的旋转就是360度。所以，所有的角度都在0-360度之间。但是，超出这个范围的值也是允许的，只不过都会归到0-360度之间。比如，顺时针旋转420度（450deg）、逆时针旋转270度（-270deg）、顺时针旋转90度（90deg）都是一样的效果，都会归为90deg。但是当使用动画时，这些角度值就非常重要了。

CSS的旋转主要依赖于 transform 属性中的 rotate() 、rotate3d、 skew() 等方法。只需给它们传递旋转的角度即可。

除了旋转会使用角度之外，线性渐变也会经常使用角度值：

```javascript 
background: linear-gradient(45deg, #000, #fff);
```


[deg](./deg/index.md "deg")

[grad](./grad/index.md "grad")

[rad](./rad/index.md "rad")

[turn](./turn/index.md "turn")
