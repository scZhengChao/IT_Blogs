# :has

## 目录

- [:has](#has)
  - [使用 :has 作为父选择器](#使用-has-作为父选择器)
  - [进一步使用组合器](#进一步使用组合器)
  - [与其他伪类组合](#与其他伪类组合)
  - [结论](#结论)
- [:has ](#has-)
  - [:has 伪类选择器](#has-伪类选择器)
    - [:has() 父选择器 -- 嵌套结构的父元素选择](#has-父选择器----嵌套结构的父元素选择)
    - [:has() 父选择器 -- 同级结构的兄元素选择](#has-父选择器----同级结构的兄元素选择)
    - [:has() 兼容性，给时间一点时间](#has-兼容性给时间一点时间)
    - [兼容性](#兼容性)

# :has

```sass (scss)  
/* 这里我们选择任何包含 `h1` 的具有 `post` 类的元素 */
.post:has(h1) {
  background-color: teal;
}


```


## 使用 `:has` 作为父选择器

将 `:has` 作为父选择器可以简化许多情况。以下是一些可能的示例：

- 在应用的某些页面上，你可能想要更改 `body` 元素的全局字体大小或背景颜色。在引入 `:has` 伪类之前，我们通常需要通过后端根据页面类型切换某些 HTML 类。然而，通过父选择器，现在可以轻松实现：

```sass (scss)  
body:has(.container.legal-mentions) {
  font-size: 80%;
}

```


- 在博客文章列表中，如果文章包含图片，我们希望这些文章的边距发生变化：

```sass (scss)  
.post:has(img) {
  margin-left: 0;
}

```


这本身就非常强大，但是在使用 *组合器* 时，我们可以做得更多。

## 进一步使用组合器

> 组合器以一种使它们彼此和文档中内容位置之间关系更有用的方式组合其他选择器。—— MDN\[1]

我们可以在 `has` 中使用 **子代组合器** `>`，以确保我们选择的是直接子元素。例如，要选择具有 `hr` 元素作为直接子元素的 `div` 元素，可以使用选择器 `div:has(>hr)`。

我们可以使用 **相邻兄弟组合器** `+` 来选择紧跟在另一个元素后面的元素。例如，要选择一个标题后面跟着一个副标题，可以使用 `title:has(+.subtitle)`。

## 与其他伪类组合

当在子元素上悬停时，改变容器的样式，牛吧？

我们可以把 `has` 与 `hover` 结合使用来实现这一点。例如，如果我们希望在容器中的任何链接 hover 时都有边框，可以使用以下代码：

```sass (scss)  
.container:has(a:hover) {
  border: 2px solid pink;
}

```


## 结论

`:has` 伪类是 CSS 选择器工具中的一个强大补充。它允许你根据元素内容选择元素，从而简化了许多情况，使你的代码更易于维护。通过使用组合器，你可以进一步细化选择并实现更高级的效果。

***

# :has&#x20;

## :has 伪类选择器

OK。最后到所有逻辑选择器里面最重磅的 `:has` 出场了。它之所以重要是因为它的诞生，填补了在之前 CSS 选择器中，没有核心意义上真正的**父选择器**的空缺。

`:has` 伪类接受一个选择器组作为参数，该参数相对于该元素的 [:scope](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:scope ":scope") 至少匹配一个元素。

实际看个例子：

```sass (scss)  
<div>
    <p>div -- p</p>
</div>
<div>
    <p class="g-test-has">div -- p.has</p>
</div>
<div>
    <p>div -- p</p>
</div>
```


```sass (scss)  
div:has(.g-test-has) {
    border: 1px solid #000;
} 
```


我们通过 `div:has(.g-test-has)` 选择器，意思是，选择 div 下存在 class 为 `.g-test-has` 的 div 元素。

注意，这里选择的不是 `:has()` 内包裹**的选择器选中的元素，而是使用 ****`:has()`**** 伪类的宿主元素。**

效果如下：

![](https://user-images.githubusercontent.com/8554143/166624323-537e1adf-c709-4327-b931-69d386295efc.png)

可以看到，由于第二个 div 下存在 class 为 `.g-test-has` 的元素，因此第二个 div 被加上了 border。

### :has() 父选择器 -- 嵌套结构的父元素选择

我们再通过几个 DEMO 加深下印象。`:has()` 内还可以写的更为复杂一点。

```sass (scss)  
<div>
    <span>div span</span>
</div>

<div>
    <ul>
        <li>
            <h2><span>div ul li h2 span</span></h2>
        </li>
    </ul>
</div>

<div>
    <h2><span>div h2 span</span></h2>
</div>
```


```sass (scss)  
div:has(>h2>span) {
    margin-left: 24px;
    border: 1px solid #000;
}
```


这里，要求准确选择 div 下直接子元素是 h2，且 h2 下直接子元素有 span 的 div 元素。注意，选择的最上层使用 :has() 的父元素 div。结果如下：

![](https://user-images.githubusercontent.com/8554143/166625227-838ace9f-56a8-4941-abde-1a3502e80e8e.png)

这里体现的是**嵌套结构，精确寻找对应的父元素**。

### :has() 父选择器 -- 同级结构的兄元素选择

还有一种情况，在之前也比较难处理，同级结构的兄元素选择。

看这个 DEMO：

```sass (scss)  
<div class="has-test">div + p</div>
<p>p</p>

<div class="has-test">div + h1</div>
<h1>h1</h1>

<div class="has-test">div + h2</div>
<h2>h2</h2>

<div class="has-test">div + ul</div>
<ul>ul</ul>
```


我们想找到兄弟层级关系中，后面接了 \<h2> 元素的 .has-test 元素，可以这样写：

```sass (scss)  
.has-test:has(+ h2) {
    margin-left: 24px;
    border: 1px solid #000;
}
```


效果如下：

![](https://user-images.githubusercontent.com/8554143/166625624-6b33af1e-1f36-41cd-80a5-d5b143f62bc0.png)

这里体现的是**兄弟结构，精确寻找对应的前置兄元素**。

这样，一直以来，CSS 没有实现的父选择器，借由 `:has()` 开始，也能够做到了。这个选择器，能够极大程度的提升开发体验，解决之前需要比较多 JavaScript 代码才能够完成的事。

上述 DEMO 汇总，你可以戳这里 [CodePen Demo -- :has Demo](https://codepen.io/Chokcoco/pen/poaJjwm "CodePen Demo -- :has Demo")

### :has() 兼容性，给时间一点时间

比较可惜的是，`:has()` 在最近的 [Selectors Level 4](https://drafts.csswg.org/selectors/#relational "Selectors Level 4") 规范中被确定，目前的兼容性还比较惨淡，截止至 2022-05-04，Safari 和 最新版的 Chrome（V101，可通过开启 **Experimental Web Platform features** 体验）

> Chrome 下开启该特性需要，1. 浏览器 URL 框输入 chrome://flags，2. 开启 #enable-experimental-web-platform-features

耐心等待，给给时间一点时间，这么好的选择器马上就能大规模应用了。

### 兼容性

还是有一些浏览器不支持

![](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdgsN6RRsD6lbibXacWucKDu63jMXHib9Kqqfk5VTbU8kUmFtlawTuKuwu5CClRo2eibunj0nxQJChgmQ/640?wx_fmt=png\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

[图片是可以显隐](图片是可以显隐.md "图片是可以显隐")

[组合使用](组合使用.md "组合使用")
