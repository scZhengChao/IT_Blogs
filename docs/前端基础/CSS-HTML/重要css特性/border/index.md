# border

## 目录

- [boder 渐变](#boder-渐变)
- [boder-image](#boder-image)
- [boder-image 导致radius 失效](#boder-image-导致radius-失效)

## boder 渐变

[ css 设置border边框颜色渐变效果\_css border渐变\_普通网友的博客-CSDN博客 上下的九宫格执行水平方向的重复属性（拉伸或平铺），左右的格子执行垂直方向的重复属性（拉伸或平铺），而中间的那个格子则水平重复和垂直方向的重复都要执行。下图是起始点到10%的位置标蓝色，10%到30%蓝到白的渐变，30%到70%为白到橘的渐变，从70%到结束标记橘色。从上到下，从起始开始，透明向蓝色渐变到20%的位置，然后又向透明进行渐变到99%的位置，99%到结束是透明。创建线性渐变，需要设置一个 https://blog.csdn.net/m0\_67401270/article/details/126099021](https://blog.csdn.net/m0_67401270/article/details/126099021 " css 设置border边框颜色渐变效果_css border渐变_普通网友的博客-CSDN博客 上下的九宫格执行水平方向的重复属性（拉伸或平铺），左右的格子执行垂直方向的重复属性（拉伸或平铺），而中间的那个格子则水平重复和垂直方向的重复都要执行。下图是起始点到10%的位置标蓝色，10%到30%蓝到白的渐变，30%到70%为白到橘的渐变，从70%到结束标记橘色。从上到下，从起始开始，透明向蓝色渐变到20%的位置，然后又向透明进行渐变到99%的位置，99%到结束是透明。创建线性渐变，需要设置一个 https://blog.csdn.net/m0_67401270/article/details/126099021")

## boder-image

[ CSS border-image（边框图片） 对于元素的边框我们除了可以使用《 CSS边框 》一节中介绍的一些默认样式外，还可以通过 CSS3 中的 border-image 属性使用图像来作为元素的边框，以创建出丰富多彩边框效果。 border-imag http://c.biancheng.net/css3/border-image.html](http://c.biancheng.net/css3/border-image.html " CSS border-image（边框图片） 对于元素的边框我们除了可以使用《 CSS边框 》一节中介绍的一些默认样式外，还可以通过 CSS3 中的 border-image 属性使用图像来作为元素的边框，以创建出丰富多彩边框效果。 border-imag http://c.biancheng.net/css3/border-image.html")

```纯文本 
border-image:url() 上20 下20 左20 右20/边框的粗细20px stretch/repeat/round 边框图片
```


## boder-image 导致radius 失效

[ clip-path:解决设置border-image后border-radius不生效问题\_小白酱的头号黑粉的博客-CSDN博客 想使用css实现一个带圆角的渐变边框代码及结果如图：虽然设置了border-radius:10px但结果仍是直角，查阅文档后W3C给出的解释：A box's backgrounds, but not its border-image, are clipped to the appropriate curve (as determined by ‘background-clip’). Other e https://blog.csdn.net/weixin\_44198018/article/details/117954236](https://blog.csdn.net/weixin_44198018/article/details/117954236 " clip-path:解决设置border-image后border-radius不生效问题_小白酱的头号黑粉的博客-CSDN博客 想使用css实现一个带圆角的渐变边框代码及结果如图：虽然设置了border-radius:10px但结果仍是直角，查阅文档后W3C给出的解释：A box's backgrounds, but not its border-image, are clipped to the appropriate curve (as determined by ‘background-clip’). Other e https://blog.csdn.net/weixin_44198018/article/details/117954236")

[ border显示渐变色 1. 先说几个概念 1.1. border-image 指定作为div元素周围边框的图像 1.2. linear-gradient() 函数 linear-gradient(... https://www.jianshu.com/p/1ae1880e0cdb](https://www.jianshu.com/p/1ae1880e0cdb " border显示渐变色 1. 先说几个概念 1.1. border-image 指定作为div元素周围边框的图像 1.2. linear-gradient() 函数 linear-gradient(... https://www.jianshu.com/p/1ae1880e0cdb")

[使用边框绘制一个三角形](./使用边框绘制一个三角形/index.md "使用边框绘制一个三角形")

[border-image 导致圆角失效](<./border-image 导致圆角失效/index.md> "border-image 导致圆角失效")
