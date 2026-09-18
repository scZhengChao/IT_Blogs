# :is

## 目录

- [支持多层层叠连用](#支持多层层叠连用)
- [不支持伪元素](#不支持伪元素)
- [:is 选择器的优先级](#is-选择器的优先级)
- [:is 的别名 :matches() 与 :any()](#is-的别名-matches-与-any)
- [兼容性](#兼容性)

`:is()` CSS伪类函数将选择器列表作为参数，并选择该列表中任意一个选择器可以选择的元素。

在之前，对于多个不同父容器的同个子元素的一些共性样式设置，可能会出现如下 CSS 代码：

```sass (scss)  
header p:hover,
main p:hover,
footer p:hover {
  color: red;
  cursor: pointer;
}
```


而如今有了 `:is()` 伪类，上述代码可以改写成：

```sass (scss)  
:is(header, main, footer) p:hover {
   color: red;
  cursor: pointer;
}
```


它并没有实现某种选择器的新功能，更像是一种语法糖，类似于 JavaScript ES6 中的 Class() 语法，只是**对原有功能的重新封装设计，实现了更容易的表达一个操作的语法，简化了某些复杂代码的写法。**

> **语法糖(syntactic sugar)**是指编程语言中可以**更容易的表达一个操作的语法**，它可以**使程序员更加容易去使用这门语言**，操作可以变得更加清晰、方便，或者更加符合程序员的编程习惯。用比较通俗易懂的方式去理解就是，**在之前的某个语法的基础上改变了一种写法，实现的功能相同，但是写法不同了**，主要是**为了让开发人员在使用过程中更方便易懂**。

### 支持多层层叠连用

再来看看这种情况，原本的 CSS 代码如下：

```sass (scss)  
<div><i>div i</i></div>
<p><i>p i</i></p>
<div><span>div span</span></div>
<p><span>p span</span></p>
<h1><span>h1 span</span></h1>
<h1><i>h1 i</i></h1>
```


如果要将上述 HTML 中，`<div>` 和 `<p>` 下的 `<span>` 和 `<i>` 的 color 设置为 red，正常的 CSS 可能是这样：

```sass (scss)  
div span,
div i,
p span,
p i {
    color: red;
}
```


有了 `:is()` 后，代码可以简化为：

```sass (scss)  
:is(div, p) :is(span, i) {
    color: red;
}
```


结果如下：

![](https://user-images.githubusercontent.com/8554143/165517904-b13cac4f-5294-40ef-8271-eff6e8663e50.png)

这里，也支持 `:is()` 的层叠连用。通过 `:is(div, p) :is(span, i)` 的排列组合，可以组合出上述 4 行的选择器，达到同样的效果。

当然，这个例子比较简单，看不出 `:is()` 的威力。下面这个例子就比较明显，这么一大段 CSS 选择器代码：

```sass (scss)  
ol ol ul,     ol ul ul,     ol menu ul,     ol dir ul,
ol ol menu,   ol ul menu,   ol menu menu,   ol dir menu,
ol ol dir,    ol ul dir,    ol menu dir,    ol dir dir,
ul ol ul,     ul ul ul,     ul menu ul,     ul dir ul,
ul ol menu,   ul ul menu,   ul menu menu,   ul dir menu,
ul ol dir,    ul ul dir,    ul menu dir,    ul dir dir,
menu ol ul,   menu ul ul,   menu menu ul,   menu dir ul,
menu ol menu, menu ul menu, menu menu menu, menu dir menu,
menu ol dir,  menu ul dir,  menu menu dir,  menu dir dir,
dir ol ul,    dir ul ul,    dir menu ul,    dir dir ul,
dir ol menu,  dir ul menu,  dir menu menu,  dir dir menu,
dir ol dir,   dir ul dir,   dir menu dir,   dir dir dir {
  list-style-type: square;
}
```


可以利用 `:is()` 优化为：

```sass (scss)  
:is(ol, ul, menu, dir) :is(ol, ul, menu, dir) :is(ul, menu, dir) {
  list-style-type: square;
}
```


### 不支持伪元素

有个特例，不能用 `:is()` 来选取 `::before` 和 `::after` 两个伪元素。譬如：

> 注意，仅仅是不支持伪元素。伪类，譬如 `:focus`、`:hover` 是支持的。

```sass (scss)  
div p::before,
div p::after {
    content: "";
    //...
}
```


不能写成：

```sass (scss)  
div p:is(::before, ::after) {
    content: "";
    //...
}
```


### `:is` 选择器的优先级

看这样一种有意思的情况：

```sass (scss)  
<div>
    <p class="test-class" id="test-id">where & is test</p>
</div>
<div>
    <p class="test-class">where & is test</p>
</div>
```


我们给带有 `.test-class` 的元素，设置一个默认的颜色：

```sass (scss)  
div .test-class {
    color: red;
}
```


如果，这个时候，我们引入 `:is()` 进行匹配：

```sass (scss)  
div :is(p) {
    color: blue;
}
```


此时，由于 `div :is(p)` 可以看成 `div p`，优先级是没有 `div .test-class` 高的，因此，被选中的文本的颜色是不会发生变化的。

但是，如果，我们在 `:is()` 选择器中，加上一个 `#test-id`，情况就不一样了。

```sass (scss)  
div :is(p, #text-id) {
    color: blue;
}
```


按照理解，如果把上述选择器拆分，上述代码可以拆分成：

```sass (scss)  
div p {
    color: blue;
}
div #text-id {
    color: blue;
}
```


那么，我们有理由猜想，带有 `#text-id` 的 `<p>` 元素由于有了更高优先级的选择器，颜色将会变成 `blue`，而另外一个 `div p` 由于优先级不够高的问题，导致第一段文本依旧是 `green`。

但是，这里，神奇的是，两段文本都变成了 `blue`：

![](https://user-images.githubusercontent.com/8554143/166408378-5c207583-11df-43a3-aa4a-b4f331d6616e.png)

这是由于，`:is()` 的**优先级是由它的选择器列表中优先级最高的选择器决定的。我们不能把它们割裂开来看。**

对于 `div :is(p, #text-id)`，`is:()` 内部有一个 id 选择器，因此，被该条规则匹配中的元素，全部都会应用 `div #id` 这一级别的选择器优先级。这里非常重要，再强调一下，对于 `:is()` 选择器的优先级，我们不能把它们割裂开来看，它们是一个整体，优先级取决于**选择器列表中优先级最高的选择器**。

### :is 的别名 :matches() 与 :any()

`:is()` 是最新的规范命名，在之前，有过有同样功能的选择，分别是：

```sass (scss)  
:is(div, p) span {}
// 等同于
:-webkit-any(div, p) span {}
:-moz-any(div, p) span {}
:matches(div, p) span {}
```


当然，下面 3 个都已经废弃，不建议再继续使用。而到今天（2022-04-27）`:is()` 的兼容性已经非常不错了，不需要兼容 IE 系列的话可以考虑开始用起来（配合 `autoprefixer`），看看 [CanIUse](https://caniuse.com/?search=:matches "CanIUse")：

### 兼容性

全绿\~

![](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdgsN6RRsD6lbibXacWucKDu67komgr49sE7TCOcPRDo7Ttsz12sD6k5qSRMr6IN0HTvoTzU7m7MQ0w/640?wx_fmt=png\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

image.png
