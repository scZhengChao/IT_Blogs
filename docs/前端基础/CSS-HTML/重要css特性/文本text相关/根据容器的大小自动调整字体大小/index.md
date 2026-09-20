# 根据容器的大小自动调整字体大小

## 目录

- [关于container-type](#关于container-type)
  - [mdn解释：](#mdn解释)
- [语法](#语法)
- [对内联维度和块维度的解释](#对内联维度和块维度的解释)
- [兼容性](#兼容性)

[ 响应式文字大小：CSS 根据容器的大小自动调整字体大小\_css 文字放大缩小过渡自然-CSDN博客 文章浏览阅读4.7k次，点赞33次，收藏25次。通过CSS属性 container-type 和 cqw cqh单位 实现响应式的调整字体的大小\_css 文字放大缩小过渡自然 https://blog.csdn.net/hongying\_18/article/details/134743075](https://blog.csdn.net/hongying_18/article/details/134743075 " 响应式文字大小：CSS 根据容器的大小自动调整字体大小_css 文字放大缩小过渡自然-CSDN博客 文章浏览阅读4.7k次，点赞33次，收藏25次。通过CSS属性 container-type 和 cqw cqh单位 实现响应式的调整字体的大小_css 文字放大缩小过渡自然 https://blog.csdn.net/hongying_18/article/details/134743075")

在编写页面时，我们经常需要适应[不同的](https://so.csdn.net/so/search?q=不同的\&spm=1001.2101.3001.7020 "不同的")屏幕尺寸，这导致容器的大小会发生变化。有时候，我们希望容器内的文字大小也能够自动调整。幸运的是，有一个属性可以帮助解决这个问题。

container-t`ype` 查询容器的大小 &#x20;
`cqw cqh `根据容器的大小调整文字的大小

```html 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div {
            width: 500px;
            height: 500px;
            resize: both; /* 设置容器可以在水平和垂直方向上调整大小。 */
            overflow: hidden;
            padding: 20px;
            background-color: #35dc54;
            container-type: size; /* 容器查询属性*/
        }
        p {
            font-size: 5cqw;
            text-align: center;
        }
    </style>
</head>
<body>
    <div>
        <p>Hello,Wrod!!!!</p>
    </div>
</body>
</html>

```


`container-type` 有三个常用值 分别是`normal` `size` `inline-size`

其中最为常用的是

- `inline-size` 他的作用大致可以理解为 监听盒子的横向轴 如果横向轴的长度发生变化就会被监听到从而间接使页面发生改变
- `size` 就是无论横向还是纵向 都可以监听到

`cqw`相对单位
相对单位有很多 比如`vm vh % `等 那cqw是相对于谁的呢？
cqw会**查询这个容器的宽度进行百分比的计算** 这点有点类似于% 但是于%不同\*\*的是 文字大小是不支持%的 也就是说 font-size: 5%; \*\*这样写的话是不生效的

与之一块的还有`cqh` 通过**是高度进行计算**

简单了解一下 容器查询和 `cqw`单位 这也就不难分析出
如果是 `container-type`的值是 `inline-size`的话 那么就只有`cqw`会生效 `cqh`也不是不能用 而是如果高度发生变化的话 这个监听器是监听不到的所以里面文字的大小不会发生改变
而如果是size的话就无所谓了 无论是宽度和高度变化 都可以查询到 这就取决于你是用cqw还是cqh了

当然 这篇文章的标题是控制文字的大小改变
如果你问：可不可以改变子盒子的大小呢？
答：当然可以，不但可以而且效果与%一模一样，所以 你为什么不用%呢。

### 关于`container-type`

#### mdn解释：

使用container-type CSS属性可以将**元素设置为容器大小查询的查询容器**。container-type用于定义容器查询中**使用的大小约束类型**。

&#x20;      大小包含（size containment）是指元素无法从其内容中获取大小信息的能力被关闭，这在容器查询中非常重要，以避免陷入无限循环。如果不关闭这个能力，容器查询中的CSS规则可能会改变内容的大小，进而导致查询结果为false，从而改变父元素的大小。而这又可能会影响内容的大小，使查询结果再次变为true，如此循环往复，形成无限循环。
&#x20;       为了避免这种情况发生，容器的**大小必须明确地设置或通过上下文来确定**。例如，块级元素、弹性容器和网格容器可以根据其父元素的宽度自动延伸至完整宽度。如果没有明确的或上下文的大小可用，具有大小包含的元素将会折叠，即不显示内容。

# 语法

```typescript 
/* Keyword values */
container-type: normal;/* 默认值。元素不是容器大小查询的查询容器，但仍然可以是容器样式查询的查询容器。 */
container-type: size;/* 将元素建立为容器大小查询的查询容器。容器大小查询可以应用布局约束、样式约束和大小约束。 */
container-type: inline-size;/* 将元素建立为容器的内联维度查询的查询容器。容器的内联维度查询可以应用布局、样式和内联大小约束。 */
/* Global Values */
container-type: inherit;/* 继承父元素的 container-type 属性值。 */
container-type: initial;/* 将 container-type 属性重置为默认值 normal。 */
container-type: revert;/* 恢复 container-type 属性的初始值或继承值。 */
container-type: revert-layer;/* 在CSS层叠上下文的范围内，恢复 container-type 属性的初始值或继承值。 */
container-type: unset;/* 将 container-type 属性重置为其自然值，如果没有自然值，则重置为初始值。 */


```


值：

[size](https://developer.mozilla.org/en-US/docs/Web/CSS/container-type#size "size")

**在内联和块维度上为容器**大小查询建立一个查询容器。将**布局约束、样式约束和大小约束**应用于容器。  大小约束应用于元素的内联和块方向。可以独立计算元素的大小，忽略子元素。

`inline-size`

在容器的内联轴上建立一个维度查询的查询容器。将布局、样式和内联大小约束应用于元素。 &#x20;
内联大小约束应用于元素。可以独立计算元素的内联大小，忽略子元素。

[normal](https://developer.mozilla.org/en-US/docs/Web/CSS/container-type#normal "normal")

该元素不是任何容器大小查询的查询容器，但仍然是容器样式查询的查询容器。

# 对内联维度和**块维度**的解释

用于描述元素在页面布局中的不同方向的概念。

- **内联维度是元素在水平方向上的尺寸**，通常是指元素的宽度。
- **块维度是元素在垂直方向上的尺寸**，通常是指元素的高度。
- 在页面布局中，元素可以同时具有内联和块维度，用于确定元素在页面中的位置和大小。通过理解和使用这两个概念，可以更准确地控制元素在页面中的布局。

# 兼容性

这个属性再开发的过程中是完全兼容所有的浏览器的 所以不需要有兼容性方面的顾虑
下面是MDN平台的原图

![](./assets/image/image_wUqIz2-0DP.png)
