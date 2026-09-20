# path

## 目录

- [L](#L)
- [ l](#-l)
- [Z](#Z)
- [H 和 h](#H-和-h)
- [V 和 v](#V-和-v)

其实在`SVG`里 \*\*，所有基本图形都是`<path>`\*\***的简写**。所有描述轮廓的数据都放在`d`属性里，`d`是`data`的简写。

`d`属性又包括以下主要的关键字（注意大小写！）：

- M: 起始点坐标，`moveto`的意思。每个路径都必须以`M`开始。`M`传入`x`和`y`坐标，用逗号或者空格隔开。
- `L`: 轮廓坐标，`lineto`的意思。`L`是跟在`M`后面的。它也是可以传入一个或多个坐标。大写的`L`是一个**绝对位置**。
- l: 这是小写`L`，和`L`的作用差不多，但`l`是一个**相对位置**。
- `H`: 和上一个点的Y坐标相等，是`horizontal lineto`的意思。它是一个**绝对位置**。
- `h`: 和`H`差不多，但`h`使用的是**相对定位**。
- `V`: 和上一个点的X坐标相等，是`vertical lineto`的意思。它是一个**绝对位置**。
- `v`: 这是一个小写的`v`，和大写`V`的差不多，但小写`v`是一个相对定位。
- `Z`: 关闭当前路径，`closepath`的意思。它会绘制一条直线回到当前子路径的起点。

### L

如果全是使用大写`L`来描述每个点的位置，那可以把`L`也去掉，直接写点集。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c873affc630a4e4d98519b4265b06f6a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```html 
<svg width="300" height="300" style="border: 1px solid red;">
  <path
    d="M 10 10 50 40 100 10"
    stroke="blue"
    fill="none"
  >
  </path>
</svg>

```


上面的`d="M 10 10 50 40 100 10"`等同于`d="M 10 10 L 50 40 L 100 10"`。

### &#x20;l

使用`L`的小写方式`l`可以实现相对位置写法。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8a0a789bbca4434b4eb5ae821f86efc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```svg 
<svg width="300" height="300" style="border: 1px solid red;">
  <path
    d="M 10 10 l 50 40 l 100 10 Z"
    stroke="blue"
    fill="none"
  >
  </path>
</svg>

```


上面的代码中，`d="M 10 10 l 50 40 l 100 10 Z"`等同于`d="M 10 10 L 60 50 L 160 60 Z"`。

`l`里的参数会与前一个点的`x`和`y`进行相加，得到一个新的坐标。

### Z

在`d`的数据集里，使用`Z`可以闭合路径。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/700d0f6142c047a18f699566d40505f2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```svg 
<svg width="300" height="300" style="border: 1px solid red;">
  <path
    d="M 10 10 L 50 40 L 100 10 Z"
    stroke="blue"
    fill="none"
  >
  </path>
</svg>

```


### H 和 h

`H`后面只需传入`X坐标`即可，它的`Y坐标`与前一个点相同。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d4327d8999a4392b02fe126f052796c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```svg 
<svg width="300" height="300" style="border: 1px solid red;">
  <path
    d="M 10 10 H 100"
    stroke="blue"
    fill="none"
  >
  </path>
</svg>

```


上面的代码中，`d="M 10 10 H 100"`等同于`d="M 10 10 L 100 10"`

而`h`和`H`的作用差不多，只不过传入的数据会和前一个点的`X坐标`相加，形成一个新的点，这就是相对位置。

![](image_0b6Z9mop_z.png)

```svg 
<svg width="300" height="300" style="border: 1px solid red;">
  <path
    d="M 10 10 h 100"
    stroke="blue"
    fill="none"
  >
  </path>
</svg>

```


### V 和 v

`V`后面只需传入`Y坐标`即可，它的`X坐标`与前一个点相同。

![](image_IlGKvrTVN9.png)

```svg 
<svg width="300" height="300" style="border: 1px solid red;">
  <path
    d="M 10 10 V 100"
    stroke="blue"
    fill="none"
  >
  </path>
</svg>

```


`v`和`V`的作用差不多，小写`v`是一个相对位置。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a69323f368a4a67a52869c17f05ce60~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```svg 
<svg width="300" height="300" style="border: 1px solid red;">
  <path
    d="M 10 10 v 100"
    stroke="blue"
    fill="none"
  >
  </path>
</svg>

```
