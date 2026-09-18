# filter滤镜

## 目录

- [filter 支持的属性](#filter-支持的属性)
- [案例](#案例)
  - [blur](#blur)
  - [brightness](#brightness)
  - [contrast](#contrast)
  - [drop-shadow](#drop-shadow)
  - [grayscale](#grayscale)
  - [hue-rotate](#hue-rotate)
  - [invert](#invert)
- [实现对话框及对话框的不规则投影](#实现对话框及对话框的不规则投影)
- [模糊效果](#模糊效果)

很牛逼的一个css 属性

## filter 支持的属性

借用了一下 MDN 上的例子，`filter` 一共支持以下这些属性：

```css 
filter: blur(5px);
filter: brightness(0.4);
filter: contrast(200%);
filter: drop-shadow(16px 16px 20px blue);
filter: grayscale(50%);
filter: hue-rotate(90deg);
filter: invert(75%);
filter: opacity(25%);
filter: saturate(30%);
filter: sepia(60%);
```


这些属性既可以**单独用**，也可以**组合使用**，例如：

```css 
filter: contrast(175%) brightness(3%);
```


## 案例

本文就介绍一些神奇的案例吧，大概率不会讲清楚每个属性的原理，因为我也不是很清楚

### blur

`blur` 属性平时用的还是挺多的，主要是做**高斯模糊**的，最近几年特别火的毛玻璃效果就可以通过这个实现：

```css 
<style>
  .blur {
    width: 400px;
    height: 400px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.5);
    position: relative;
  }
  
  .blur::before {
    content: "";
    position: absolute;
    inset: 0 0 0 0;
    background: inherit;
    filter: blur(10px);
  }
</style>

<div class="blur"/> 这里要加一个背景色

```


效果如下：

![](image_XLn60XMGyJ.png)

### brightness

`brightness` 属性是用来**修改亮度**的。值可以是百分比，也可以是数值（`0.5 = 50%`），默认值是 `1`，但不能是负数。当值越接近 `0`，画面越黑，当等于 `0` 时，整个画面几乎就成纯黑的了；值理论上可以趋于无限大，当大到一定值时，画面就几乎成纯白了

能用来干啥呢？有一个非常常见的效果想必大家都看过：

![](image_LZi0U3kYnI.png)

不知道你们当时看到这个效果时，脑海里有没有想过该如何实现？哈哈，其实一个属性就够了！

```html 
<style>
.brightness {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  cursor: pointer;
  background: #333;
  font-size: 45px;
}

.brightness:hover .icon {
  filter: brightness(1.3);
}
</style>

<div class="brightness">
  <img src="apple.png" class="icon"/>
</div>
```


### contrast

`contrast` 可以用来**调整图像的对比度**，这个词有些专业，设计师是经常接触的，用简单易懂的话来讲，**`对比度`**`  = 图像中  `**`最白的色值`**`  /  `**`最黑的色值`**，按照这个公式又可以理解为：

- 对比度越**大**，白色越**强**(亮)、黑色越**弱**(暗)，图像越**白**；
- 对比度越**小**，白色越**弱**(暗)、黑色越**强**(白)，图像越**黑**；

`contrast()` 的值可以写百分比，也可以写数值（`0.5 = 50%`），默认值是 `1`，该值可以无限大，那样画面就会更亮，但不能为负数

简单了解了概念，实战一下看看效果：

![](image_yjrctd7Ar8.png)

**可以看到，值大于 0 且小于 1 时，画面被蒙上了灰色的蒙层；值大于 1 时，画面中很多光亮元素更亮了，而很多暗黑元素就更黑了**

这个属性看起来没啥用，既不能让图像更有画面感，又不能让图像更精致，是吧？我也这么觉得！但要知道 `contrast` 和 `brightness` 两个属性跟 UI 设计是强相关的，这让我想到了 PS 里的一个图像调整，我切换到英文版的 PS 给大家看看：

可以看到随便调整了一些属性，图片大小大约减少了 `1M`

**那能否再恢复成原来图片的效果和质量呢？**

在控制台微调属性：

```html 
filter: brightness(1.2) contrast(1.7);
```


![](image_pSSfsZSHL9.png)

可以看到几乎是没啥差别，而且肉眼看上去图像的损耗我觉得也是可接受范围内的，反而觉得还比原图更有画面感，可能这就是对比度的魔力吧！

这仅仅是降低了一点点对比度的效果，图片体积下降了 `25%` 左右，先不讨论到底能够极致优化多少图片的大小，但至少 `25%` 的优化空间已经很 nice 了

另外上文提到了 filter 的有些属性组合使用会有奇效，其中就包括 `contrast`，它和 `blur` 一起用就能实现本文开头提到的 **穿墙效果**

```html 
<style>
body {
  width: 100vw;
  background-color: black;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 100px;
  height: 100px;
  border: 4px solid aquamarine;
  background-color: #222;
  overflow: hidden;
  border-radius: 50%;
  font-size: 36px;
  filter: blur(6px) contrast(6); /* 主要靠这行代码 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  width: 1em;
  height: 1em;
  transform: translate(0px, 0px);
  background-color: aquamarine;
  animation: move 2s linear infinite;
}

@keyframes move {
  from {
    transform: translateX(-100px);
  }

  to {
    transform: translateX(100px);
  }
}
</style>

<div class="container">
  <div class="box"></div>
</div>
```


这样就实现了：

![](image_NnFw5RwvHI.png)

再次感叹 CSS 牛逼

### drop-shadow

`drop-shadow` 能够给**图像设置阴影效果，**使用方式其实跟 `box-shadow` 一样，区别就是：`drop-shadow` 能够**识别图像中的透明元素，给图像内容的每个边打上引用；**`box-shadow` 只能给元素整个轮廓加阴影效果。用一张图来展示它俩的区别：

![](image_OSdKJ-VkwQ.png)

### grayscale

国内但凡遇上一些社会性的天灾人祸，影响比较大的，很多**网站都会将页面置灰，表示哀悼**。那时候有很多人在分析 "网页置灰" 这个功能该如何实现，其实用 filter 的 `grayscale` 实现是最简单快速的了

咱们随便找个网页，就拿网易云举例吧，先看正常页面的效果：

![](image_FyxSDowXa5.png)

我们给它的 `body` 加上置灰属性：

```html 
body {
  filter: grayscale(1);
}
```


页面置灰的效果就完成了

![](image_j_t1ouPMSK.png)

### hue-rotate

`hue-rotate` 用于调整元素的色相，色相的概念可以在 HSL 中看到，即：

- H：色相
- S：饱和度
- L：亮度

那改变色相就如下图的过程一样：

![](image_JI6vkGpUrC.png)

`hue-rotate` 的值的单位是角度（`deg`），每 `360deg` 一个变换周期

这有啥用呢？直播间的点赞，狂按时会有很多的漂浮物出来，比如：

![](image_xOrB_n7G4-.png)

我们可以通过修改 `filter: hue-rotate(0deg)` 的值来**改变每个爱心的颜色**

这里我又想到了另外一个 CSS 属性，那就是 `counter-reset`，用其初始化一个计数器，然后用 `counter` 函数拿到当前计数赋值给 `hue-rotate`，这样是不是就能实现颜色自动变化了？（当然了我还没实验过，只是在写这篇文章时的一些想法）

### invert

`invert` 是用来**翻转图像的**，其实我也无法很好地解释什么叫翻转图像，不过可以借另一个例子来给大家解释

![](image_eEYGHTMLGO.png)

图中左侧是抖音最近很火的热成像特效，可以把拍到的东西都以热成像的效果呈现出来，右侧是我们加了 `filter: invert(1)` 实现的效果，差不多可以看清热成像之前的样子是如何的

所以，相信大家都知道了，`invert` 跟我们手机里的 **颜色翻转** 的功能是一模一样的，给大家演示一下

# 实现对话框及对话框的不规则投影

知识点：filter和伪元素

![  ](5b5d07d55cddce1d9d30dde9812b41ca_qcge4TAaka.png "  ")

```typescript 
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          name="viewport">
    <meta content="ie=edge" http-equiv="X-UA-Compatible">
    <title>Document</title>
    <style>
        .odd-shadow {
            margin-left: auto;
            margin-right: auto;
            width: 200px;
            height: 80px;
            border-radius: 8px;
            color: #fff;
            font-size: 24px;
            text-align: center;
            line-height: 80px;
            background: #06c;
            filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, .8))
        }
        .odd-shadow::before {
            content: '';
            position: absolute;
            display: block;
            margin-left: -20px;
            transform: translateY(20px);
            width: 0;
            height: 0;
            border: 10px solid transparent;
            border-right-color: #06c;
        }

    </style>
    </style>
</head>
<body>
<div class="odd-shadow">哎呦，猪先森</div>
</body>
<script>

</script>
</html>

```


# 模糊效果

![  ](e60b21323a06a04bf680b229e93a8b46_inad-nFI9h.png "  ")

```typescript 
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          name="viewport">
    <meta content="ie=edge" http-equiv="X-UA-Compatible">
    <title>Document</title>
    <style>
        div{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            filter:blur(20px);
            background: #6F74E2;
            margin: 50px auto;
        }

    </style>
    </style>
</head>
<body>
<div ></div>
</body>
<script>

</script>
</html>

```


[drop-shadow](drop-shadow.md "drop-shadow")
