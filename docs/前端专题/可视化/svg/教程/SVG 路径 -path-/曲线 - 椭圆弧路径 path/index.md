# 曲线 - 椭圆弧路径 path

## 目录

- [什么是椭圆弧？](#什么是椭圆弧)
- [椭圆弧公式](#椭圆弧公式)
- [弧线](#弧线)
- [A](#A)
- [A命令，画椭圆弧](#A命令画椭圆弧)
  - [例：](#例)

### 什么是椭圆弧？

前面讲到的`直线路径 path`是比较好理解的，它把所有点都用直线连接起来即可。只要确定2个点就可以画出一根线段。

但如果只用两个点，可以产生无数条曲线。所以需要添加更多的参数来确定如何绘制一条曲线。而在种种方法中，我认为**椭圆弧曲线**是最简单的。

**椭圆弧曲线**，顾名思义就是和椭圆有关的。如果在椭圆上选择两个点，就可以截取2条曲线。

![](./image/image_SWnP_0yL4S.png)

比如这样，红线处就将椭圆截取成2段弧线。

### 椭圆弧公式

在`SVG`中可以使用`path`配合`A属性`绘制椭圆弧。

```html 
A(rx, ry, xr, laf, sf, x, y)

```


- `rx`: 椭圆X轴半径
- `ry`: 椭圆Y轴半径
- `xr`: 椭圆旋转角度
- `laf`: 是否选择弧长较长的那一段。0: 短边（小于180度）; 1: 长边（大于等于180度）
- `sf`: 是否顺时针绘制。0: 逆时针; 1: 顺时针
- `x`: 终点X轴坐标
- `y`: 终点Y轴坐标

上面的公式中并没有开始点，**开始点是由**\*\*`M`\*\***决定的**。

也就是说，**确定2个点，再确定椭圆半径，就可画出2个椭圆**

![](./image/image_IST10B1Jo5.png)

通过开始点和结束点裁切，可以得到4条弧线，也就是说2个点可以确定2个相同旋转角度的椭圆的位置，可以切出4条弧线。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b92e39f6d36e473e97365a9e2e281b3b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```svg 
<svg width="400" height="400" style="border: 1px solid red;">
  <!-- 红 -->
  <path
    d="M 125 75 A 100 50 0 0 0 225 125"
    stroke="red"
    fill="none"
  />

  <!-- 黄 -->
  <path
    d="M 125 75 A 100 50 0 0 1 225 125"
    stroke="yellow"
    fill="none"
  />

  <!-- 蓝 -->
  <path
    d="M 125 75 A 100 50 0 1 0 225 125"
    stroke="blue"
    fill="none"
  />

  <!-- 绿 -->
  <path
    d="M 125 75 A 100 50 0 1 1 225 125"
    stroke="green"
    fill="none"
  />
</svg>

```


绘制弧线是比较抽象的，通常我是不会手动绘制的，我会使用**Illustrator**绘制，然后生成`SVG`来使用。

### 弧线

svg 为了方便我们画椭圆弧，也提供了A 参数。

# A

```svg 
 A rx ry x-axis-rotation large-arc-flag sweep-flag x y

```


椭圆弧顾名思义有长轴和短轴， OK rx, ry 就表示长轴半径 和短轴半径  x-axis-rotation 顾名思义就是x轴旋转角度， 这个怎么去理解呢。

![](./image/image_6OB0XrLwKO.png)

![](./image/image_Qs9cyk3Icr.png)

上面两张图我代码的改动其实就是角度变化。代码如下

```svg 

<path d ='    M 10 315    L 110 215    A 30 50 -45 0 1 162.55 162.45    L 172.55 152.45'stroke='black'fill='green' > </path>


```


- large-arc-flag决定弧线是大于还是小于180度，0表示小角度弧，1表示大角度弧。
- sweep-flag表示弧线的方向，0表示从起点到终点沿逆时针画弧，1表示从起点到终点沿顺时针画弧。下面的例子展示了这种情况:

![](./image/image_5Q6U7Aq-8Q.png)

```svg 
<path d="M80 80 A 45 45, 0, 0, 0, 125 125" fill="green"/><path d="M230 80 A 45 45, 0, 1, 0, 275 125" fill="red"/>

```


这里我将椭圆的长轴半径和短轴半径相等， 这时候画出来的其实是一个圆弧。两个唯一的区别就是一个优弧一个劣弧。 并且是同一方向的。 如果需要改变方向就用到sweep-flag， 将它设置为1。然后我在调整下位位置将他们合二为一。

![](./image/image_ByzpWyVhTi.png)

```svg 
<path d="M230 80 A 45 45, 0, 0, 1, 275 125" fill="green"/><path d="M230 80 A 45 45, 0, 1, 0, 275 125" fill="red"/>

```


A 最后一个参数表示弧线的终点。&#x20;

# A命令，画椭圆弧

A后面跟的参数有点多，分别是：

1.x轴半径（可以写比例，写比例时默认用符合条件的最小值，参数4就没有意义了）

2.y轴半径（可以写比例，写比例时默认用符合条件的最小值，参数4就没有意义了）

3.x轴旋转度数（顺时针方向为正）

在前面三个参数确定的情况下，满足当前点到指定点(X,Y)位置条件的圆弧总是有四条，如图：

![](https://i-blog.csdnimg.cn/blog_migrate/090462cfadffc867200ee8e7186db157.png)

4.优弧还是劣弧（0或1，0表示劣弧，1表示优弧） 排除一半。（忘了椭圆是不是和圆一样有优弧和劣弧的概念，反正就是长度短的一条路径和长度长的一条路径）

5.弧线方向（0或1，0表示从起点到终点沿逆时针画弧，1表示从起点到终点沿顺时针画弧）再排除一半，只剩唯一一条。

6.终点x

7.终点y

一口气看这么多参数确实不好记，参照下面的例子可以帮助你更好的理解。

### 例：

1.x轴半径和y轴半径的比是1：2，不旋转，从起点逆时针画弧，终点为起点右侧100距离。

```svg 
<path d="M 50 650 a 1 2 0 0 0 100 0" stroke="blue" stroke-width="5" fill="none"/>
```


![](./image/image_UFXH0q8oXm.png)

2.顺时针旋转30°

```svg 
<path d="M 170 650 a 1 2 30 0 0 100 0" stroke="blue" stroke-width="5" fill="none"/>
```


![](./image/image_0R0Fo8nj9p.png)

3.优弧和劣弧

下面的优弧和劣弧都是按逆时针画的

优弧

```svg 
<path d="M 300 650 a 70 100 0 1 0 100 0" stroke="blue" stroke-width="5" fill="none"/>
```


劣弧

```svg 
<path d="M 450 650 a 70 100 0 0 0 100 0" stroke="blue" stroke-width="5" fill="none"/>
```


![](./image/image_mVzQ0WxToQ.png)

4.顺时针画弧

```svg 
<path d="M 600 650 a 1 2 0 0 1 100 0" stroke="blue" stroke-width="5" fill="none"/>
```


![](./image/image_-ZeP6swo9V.png)
