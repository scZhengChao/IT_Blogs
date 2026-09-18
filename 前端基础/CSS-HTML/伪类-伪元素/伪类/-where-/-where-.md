# :where&#x20;

## 目录

- [:is 和 :where 的区别](#is-和-where-的区别)
- [组合、嵌套](#组合嵌套)
- [兼容性](#兼容性)

了解了 `:is` 后，我们可以再来看看 `:where`，它们两个有着非常强的关联性。`:where` 同样是将选择器列表作为其参数，并选择可以由该列表中的选择器之一选择的任何元素。

还是这个例子：

```sass (scss)  
:where(header, main, footer) p:hover {
  color: red;
  cursor: pointer;
}
```


上述的代码使用了 `:where`，可以近似的看为：

```sass (scss)  
header p:hover,
main p:hover,
footer p:hover {
  color: red;
  cursor: pointer;
}
```


这就有意思了，这不是和上面说的 `:is` 一样了么？

那么它们的区别在什么地方呢？

### `:is` 和 `:where` 的区别

首先，从语法上，`:is` 和 `:where` 是一模一样的。它们的核心区别点在于 **优先级**。

来看这样一个例子：

```sass (scss)  
<div>
    <p>where & is test</p>
</div>
```


CSS 代码如下：

```sass (scss)  
:is(div) p {
    color: red;
}
:where(div) p {
    color: green;
}
```


正常按我们的理解而言，`:is(div) p` 和 `:where(div) p` 都可以转化为 `div p`，由于 `:where(div) p` 后定义，所以文字的颜色，应该是 `green` 绿色，但是，实际的颜色表现为 `color: red` 红色：

![](https://user-images.githubusercontent.com/8554143/166405646-1f3c0880-c6bc-4ade-9461-0c27c03f0a05.png)

这是因为，`:where()` 和 `:is()` 的不同之处在于，`:where()` 的优先级**总是为 0** ，但是 `:is()` 的优先级是由它的选择器列表中**优先级最高的选择器决定的。**

上述的例子还不是特别明显，我们再稍微改造下：

```sass (scss)  
<div id="container">
    <p>where & is test</p>
</div>
```


我们给 div 添加上一个 id 属性，改造上述 CSS 代码：

```sass (scss)  
:is(div) p {
    color: red;
}
:where(#container) p {
    color: green;
}
```


即便如此，由于 `:where(#container)` 的优先级为 0，因此文字的颜色，依旧为红色 red。`:where()` 的优先级**总是为 0** 这一点在使用的过程中需要牢记。

### 组合、嵌套

CSS 选择器的一个非常大的特点就在于组合嵌套。`:is` 和 `:where` 也不例外，因此，它们也可以互相组合嵌套使用，下述的 CSS 选择器都是合理的：

```sass (scss)  
/* 组合*/
:is(h1,h2) :where(.test-a, .test-b) {
  text-transform: uppercase;
}
/* 嵌套*/
.title:where(h1, h2, :is(.header, .footer)) {
  font-weight: bold;
}
```


这里简单总结下，`:is` 和 `:where` 都是非常好的分组逻辑选择器，唯一的区别在于`:where()` 的优先级**总是为 0**，而`:is()` 的优先级是由它的选择器列表中优先级最高的选择器决定的。

### 兼容性

全绿\~

![](https://mmbiz.qpic.cn/mmbiz_png/TZL4BdZpLdgsN6RRsD6lbibXacWucKDu6ofwhO1qqslUYdU6lCfWEIxO1Ac3gJQKn9wDwianKWt7dRjuyxibianLuQ/640?wx_fmt=png\&tp=webp\&wxfrom=5\&wx_lazy=1\&wx_co=1)

[组合/叠加](组合-叠加.md "组合/叠加")
