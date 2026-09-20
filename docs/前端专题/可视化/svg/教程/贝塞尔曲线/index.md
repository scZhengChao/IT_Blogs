# 贝塞尔曲线

## 目录

- [线性贝塞尔曲线](#线性贝塞尔曲线)
- [二阶贝塞尔曲线](#二阶贝塞尔曲线)
- [三阶贝塞尔曲线](#三阶贝塞尔曲线)

> Bézier curve(贝塞尔曲线)是应用于二维图形应用程序的数学曲线。 曲线定义：起始点、终止点（也称锚点）、控制点。通过调整控制点，贝塞尔曲线的形状会发生变化。

### 线性贝塞尔曲线

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83a69c84a9ff452bb1e307076b42582c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

从图上可以看到 P0 P1  t 的范围是\[0,1],  在P0 和P1两个点的线段之间的所有的点都满足这个变化。

数学公式

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1007c309bb1f4088a8eb6038073b0fd2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

由于这个是线性变化，所以满足我们的数学公式**y= kx + b**， 其中k 代表的是斜率，因为P1和P0都是向量， 所以向量的相减的数学意义其实是两个点之间的斜率。

### 二阶贝塞尔曲线

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0b2d98ede0b4980972ecb6b0ac764fa~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

数学公式：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d31ec06681e45d69ac4f799b505ac48~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

首先我们要明白一个道理，**n阶的贝塞尔曲线对应的是n-1个控制点**，二阶贝塞尔曲线是怎么画出这么平滑的曲线的呢？ 是这样的我在 P0P1线段上找一点A **然后以相同比例**在P1P2找一个B，我**连接AB这条直线，我再去直线上找一个点C同样以相同比例**。这样不断重复上面的过程，就是图中这个动画这个结果。 我在去画图用公式给大家推导一下， 学知识一定要知道为什么。

![](./assets/image/image_fnUtZ12E-0.png)

其实就是不断降为降阶的问题。

### 三阶贝塞尔曲线

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43250b18960840d3af55b22bbd3f0610~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

三阶贝塞尔曲线对应的是两个控制点，也是不断地去找比例相同的点，然后不断降低阶级，知道最后方程 只有4个参数。

通用公式如下图：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8aaf71a7158449c984bcb878d6999266~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

复习完贝塞尔曲线这样我们就可以开心地画曲线了。
