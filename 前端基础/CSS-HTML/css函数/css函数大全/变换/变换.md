# 变换

## 目录

- [scale()、scaleX()、scaleY()、scaleZ()、scale3d()](#scalescaleXscaleYscaleZscale3d)
- [rotate()、rotateX()、rotateY()、rotateZ()、rotate3d()](#rotaterotateXrotateYrotateZrotate3d)
- [translate()、translatex()、translatey()、translateZ()、translate3d()](#translatetranslatextranslateytranslateZtranslate3d)
- [skew()、skewX()、skewY()](#skewskewXskewY)
- [perspective()](#perspective)
- [matrix()、matrix3d()](#matrixmatrix3d)

### scale()、scaleX()、scaleY()、scaleZ()、scale3d()

`scale()`、`scaleX()`、`scaleY()` 和 `scale3d()` 是 CSS3 中的**缩放函数**，用于调整元素的大小。这些函数可以单独或组合使用，以实现元素在二维或三维空间中的缩放效果。

`scale()` 函数用于同时调整元素在水平和垂直方向上的大小。它接受两个参数，第一个参数表示水平缩放比例，第二个参数表示垂直缩放比例。如果只提供一个参数，那么第二个参数默认与第一个参数相同，实现等比例缩放。

```javascript 
transform: scale(2); /* 元素在水平和垂直方向上放大两倍 */  
transform: scale(1.5, 0.5); /* 元素在水平方向上放大1.5倍，垂直方向上缩小到一半 */

```


`scaleX()` 函数仅用于调整元素在 X 轴上的大小。它接受一个参数，表示水平缩放比例。

```javascript 
transform: scaleX(2); /* 元素在水平方向上放大两倍 */

```


scaleY() 函数仅用于调整元素在 Y 轴上的大小。它接受一个参数，表示垂直缩放比例。

```javascript 
transform: scaleY(0.5); /* 元素在垂直方向上缩小到一半 */
```


`scaleZ()` 函数仅用于调整元素在 Z 轴上的大小。它接受一个参数，表示在 Z 轴缩放比例。

```javascript 
transform: scaleZ(0.5); /* 元素在Z轴上缩小到一半 */

```


`scale3d()` 函数用于在三维空间中调整元素的大小。它接受三个参数，分别表示在X轴、Y轴和Z轴上的缩放比例。

```javascript 
transform: scale3d(1, 2, 0.5); /* 元素在X轴上不变，Y轴上放大两倍，Z轴上缩小到一半 */

```


注意：当使用多个变换函数时，它们应该通过空格分隔，并按特定的顺序应用（例如，先应用 `scale()`，然后是 `rotate()` 等）。

### rotate()、rotateX()、rotateY()、rotateZ()、rotate3d()

`rotate()`、`rotateX()`、`rotateY()`、`rotateZ()`、`rotate3d()` 是 CSS3 中的**旋转函数**，用于调整元素在二维或三维空间中的旋转角度。这些函数可以作为 `transform` 属性的值来使用，以实现元素的旋转效果。

`rotate()` 函数用于在二维空间中旋转元素。它接受一个参数，表示旋转的角度（以度或弧度为单位）。旋转是相对于元素的中心点进行的，并且按照顺时针方向进行。

```javascript 
transform: rotate(45deg); /* 元素顺时针旋转 45 度 */

```


`rotateX()` 函数用于在三维空间中绕 X 轴旋转元素。它接受一个参数，表示旋转的角度。正值表示元素按照顺时针方向旋转，负值表示逆时针方向旋转。

```javascript 
transform: rotateX(90deg); /* 元素绕 X 轴顺时针旋转 90 度 */

```


rotateY() 函数用于在三维空间中绕 Y 轴旋转元素。它的参数和用法与 rotateX() 相同，只是旋转轴是 Y 轴。

```javascript 
transform: rotateY(-45deg); /* 元素绕 Y 轴逆时针旋转 45 度 */

```


`rotateZ()` 函数用于在三维空间中绕 Z 轴旋转元素。它的参数和用法与 `rotateX()` 和 `rotateY()` 相同，只是旋转轴是 Z 轴。在二维空间中，`rotateZ()`的效果与 `rotate()` 相同。

```javascript 
transform: rotateZ(180deg); /* 元素绕 Z 轴旋转 180 度 */

```


`rotate3d()` 函数用于在三维空间中沿任意向量旋转元素。它接受四个参数，分别表示旋转向量的 X、Y、Z 分量以及旋转的角度。通过指定不同的向量分量，可以实现沿任意方向的旋转。

```javascript 
transform: rotate3d(1, 0, 0, 60deg); /* 元素沿 X 轴方向旋转 60 度 */

```


### translate()、translatex()、translatey()、translateZ()、translate3d()

`translate()`、`translatex()`、`translatey()`、`translateZ()`、`translate3d()` 是 CSS3 中的**平移函数**，用于在二维或三维空间中移动元素的位置。这些函数可以作为 `transform` 属性的值来使用，以实现元素的平移效果。

`translate()` 函数用于在二维空间中移动元素。它接受两个参数，第一个参数表示在 X 轴上的移动距离，第二个参数表示在 Y 轴上的移动距离。如果只提供一个参数，那么第二个参数默认值为 0，表示只在 X 轴上移动。

```javascript 
transform: translate(50px, 100px); /* 元素在 X 轴上移动 50px，在 Y 轴上移动 100px */

```


`translateX()` 函数仅用于在水平方向（X轴）上移动元素。它接受一个参数，表示在 X 轴上的移动距离。

```javascript 
transform: translateX(30px); /* 元素在 X 轴上移动 30px */

```


`translateY()` 函数仅用于在垂直方向（Y轴）上移动元素。它接受一个参数，表示在 Y 轴上的移动距离。

```javascript 
transform: translateY(-50px); /* 元素在 Y 轴上向上移动 50px */

```


`translateZ()` 函数用于在三维空间的 Z 轴上移动元素。它接受一个参数，表示在 Z 轴上的移动距离。在二维渲染中，`translateZ()` 通常不会产生可见的效果，但它可以影响 3D 变换和其他 3D CSS 属性。

```javascript 
transform: translateZ(20px); /* 元素在 Z 轴上移动 20px（在 2D 渲染中通常不可见） */

```


`translate3d()` 函数用于在三维空间中同时移动元素在 X、Y 和 Z 轴上的位置。它接受三个参数，分别表示在 X、Y、Z 轴上的移动距离。

```javascript 
transform: translate3d(10px, 20px, 30px); /* 元素在 X 轴上移动 10px，Y 轴上移动 20px，Z 轴上移动 30px */

```


注意：在进行 3D 变换时，`translateZ()` 和 `translate3d()` 会影响元素的层叠上下文，可能会改变元素的层叠顺序。

### skew()、skewX()、skewY()

`skew()`、`skewX()` 和 `skewY()` 是 CSS3 中的**倾斜函数**，用于在二维空间中对元素进行倾斜变换。这些函数可以作为 trans\`\`form 属性的值来使用，以实现元素的倾斜效果。

`skew()` 函数允许在一个声明中同时指定 X 轴和 Y 轴的倾斜角度。它接受两个参数，第一个参数对应 X 轴的倾斜角度，第二个参数对应 Y 轴的倾斜角度。如果第二个参数未提供，则默认值为 0。

```javascript 
transform: skew(30deg, 20deg); /* 元素在 X 轴上倾斜 30 度，在 Y 轴上倾斜 20 度 */

```


`skewX()` 函数仅用于在水平方向（X 轴）上倾斜元素。它接受一个参数，表示元素在 X 轴上的倾斜角度。

```javascript 
transform: skewX(45deg); /* 元素在 X 轴上倾斜 45 度 */

```


`skewY()` 函数仅用于在垂直方向（Y 轴）上倾斜元素。它接受一个参数，表示元素在 Y 轴上的倾斜角度。

```javascript 
transform: skewY(-30deg); /* 元素在 Y 轴上倾斜 -30 度（即向上倾斜） */

```


### perspective()

`perspective()` 用于设置 3D 变换元素的透视效果。`perspective()` 函数必须与 `transform` 属性一起使用，以在元素上创建一种视觉上的深度感。

`perspective()` 函数接受一个长度值作为参数，这个值表示观察者与 `z=0` 平面之间的距离。这个距离定义了 3D 变换的透视效果。

```javascript 
.element {  
  transform: perspective(500px) rotateX(45deg);  
}

```


在这个例子中，`.element` 将被应用一个透视效果，观察者似乎位于距离 z=0 平面 500px 的地方，并且元素还绕 X 轴旋转了 45 度。

透视效果让元素在 z 轴上的变换看起来更加自然。离观察者较近的元素会显得更大，而离观察者较远的元素则会显得更小。这模仿了我们在现实世界中观察物体时的透视效果。

注意：在处理多个 3D 变换元素时，需要谨慎使用 `perspective()` 函数，因为每个元素上的透视效果是独立的。如果需要在一个容器内对多个元素应用透视效果，**通常最佳做法是在容器元素上设置透视效果，而不是在每个子元素上分别设置**。

### matrix()、matrix3d()

`matrix()` 和 `matrix3d()` 是 CSS3 中 `transform` 属性的两个函数值，它们允许通过矩阵来定义元素的 2D 和 3D 变换。

`matrix()` 函数用于定义 2D 变换矩阵。它接受六个参数，这些参数表示一个 3x3 的变换矩阵（但实际上只用到了六个值，因为最后一行总是 \[0, 0, 1]）。这个矩阵用于计算元素的最终位置。

**matrix(n1, n2, n3, n4, n5, n6)** 中的参数意义如下：

- n1 和 n4 控制缩放和倾斜（`scaleX` 和 `scaleY`）。
- n2 和 n3 控制倾斜（`skewX` 和 `skewY`）。
- n5 和 n6 控制平移（`translateX` 和 `translateY`）。

实际上，这个矩阵可以看作是以下形式的简写：

```javascript 
| n1 n2 0 |  
| n3 n4 0 |  
| n5 n6 1 |
```


`matrix3d()` 函数用于定义 3D 变换矩阵。它接受 16 个参数，这些参数表示一个 4x4 的变换矩阵。这个矩阵用于计算元素在三维空间中的最终位置和方向。

**matrix3d(n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12, n13, n14, n15, n16)** 中的参数意义较为复杂，但大致可以划分为以下几类：

- 前四个参数（n1-n4）通常与 X 轴相关。
- 接下来的四个参数（n5-n8）通常与 Y 轴相关。
- 再接下来的四个参数（n9-n12）通常与 Z 轴相关（包括透视效果）。
- 最后四个参数（n13-n16）控制平移（`translateX`, `translateY`, `translateZ`）和透视因子。

实际上，这个矩阵可以看作是以下形式的简写：

```javascript 
| n1  n2  n3  n4 |  
| n5  n6  n7  n8 |  
| n9 n10 n11 n12 |  
|n13 n14 n15 n16 |

```


其中，最后一列（n13, n14, n15, n16）主要用于平移变换和透视效果。

注意：

- `matrix()` 和 `matrix3d()` 允许更精细的控制元素变换，但它们也比较复杂，不容易直观地理解。
- 这两个函数通常用于高级的动画效果和复杂的布局情况。
- 当使用 `matrix()` 或 `matrix3d()` 时，需要确保你提供的参数能正确地形成一个有效的变换矩阵。
- 与其他 `transform` 函数值一样，`matrix()` 和 `matrix3d()` 的效果不会触发页面的重新布局，也不会影响其他元素（除了被变换的元素本身及其子元素）。

如果只是想进行简单的 2D 或 3D 变换，使用更高级的 `translate(),` `rotate()`, `scale()`, `skew()` 等函数可能更容易理解和实现。但是，对于复杂的变换或组合变换，`matrix()` 和 `matrix3d()` 提供了更强大的功能。
