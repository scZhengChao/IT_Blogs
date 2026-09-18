# :not

## 目录

- [MDN 的错误例子？一个有意思的现象](#MDN-的错误例子一个有意思的现象)
- [:not 的优先级问题](#not-的优先级问题)
- [:not( \*) 问题](#not-问题)
- [:not() 不能嵌套 :not()](#not-不能嵌套-not)
- [:not() 实战解析](#not-实战解析)
- [:not 兼容性](#not-兼容性)

下面我们介绍一下非常有用的 `:not` 伪类选择器。

`:not` 伪类选择器用来**匹配不符合一组选择器的元素**。由于它的作用是**防止特定的元素被选中，它也被称为反选伪类（** negation pseudo-class）。

举个例子，HTML 结构如下：

```sass (scss)  
<div class="a">div.a</div>
<div class="b">div.b</div>
<div class="c">div.c</div>
<div class="d">div.d</div>
```


```sass (scss)  
div:not(.b) {
    color: red;
}
```


`div:not(.b)` 它可以选择除了 class 为 `.b` 元素之外的所有 div 元素：

![](https://user-images.githubusercontent.com/8554143/166439894-351bc903-7363-4205-8d3e-1f5277dab471.png)

### MDN 的错误例子？一个有意思的现象

有趣的是，在 MDN 介绍 `:not` 的页面，有这样一个例子：

```sass (scss)  
/* Selects any element that is NOT a paragraph */
:not(p) {
  color: blue;
}
```


意思是，`:not(p)` 可以选择任何不是 `<p>` 标签的元素。然而，上面的 CSS 选择器，在如下的 HTML 结构，实测的结果不太对劲。

```sass (scss)  
<p>p</p>
<div>div</div>
<span>span</span>
<h1>h1</h1>
```


结果如下：

![](https://user-images.githubusercontent.com/8554143/166440504-46e53581-001d-4c57-8785-144cc4b939e1.png)

意思是，`:not(p)` 仍然可以选中 `<p>` 元素。我尝试了多个浏览器，得到的效果都是一致的。

[CodePen Demo -- :not pesudo demo](https://codepen.io/Chokcoco/pen/KKZbWjy "CodePen Demo -- :not pesudo demo")

这是为什么呢？这是由于 `:not(p)` 同样能够选中 `<body>`，那么 `<body>` 的 color 即变成了 `blue`，由于 `color` 是一个可继承属性，`<p>` 标签继承了 `<body>` 的 color 属性，导致看到的 `<p>` 也是蓝色。

我们把它**改成一个不可继承的属性**，试试看：

```sass (scss)  
/* Selects any element that is NOT a paragraph */
:not(p) {
  border: 1px solid;
}
```


![](https://user-images.githubusercontent.com/8554143/166445089-24bc55bc-94b4-4c8e-a7d1-18efd32dffc3.png)

OK，这次 `<p>` 没有边框体现，没有问题！实际使用的时候，需要注意这一层继承的问题！

### :not 的优先级问题

下面是一些使用 `:not` 需要注意的问题。

`:not`、`:is`、`:where` 这几个伪类不像其它伪类，它不会增加选择器的优先级。它的优先级即为**它参数选择器的优先级。**

并且，在 [CSS Selectors Level 3](https://www.w3.org/TR/selectors-3/ "CSS Selectors Level 3")，`:not()` 内只支持单个选择器，而从 [CSS Selectors Level 4](https://www.w3.org/TR/selectors-4/ "CSS Selectors Level 4") 开始，`:not()` 内部支持多个选择器，像是这样：

```sass (scss)  
/* CSS Selectors Level 3，:not 内部如果有多个值需要分开 */
p:not(:first-of-type):not(.special) {
}
/* CSS Selectors Level 4 支持使用逗号分隔*/
p:not(:first-of-type, .special) {
}
```


与 :is() 类似，:not() 选择器本身不会影响选择器的优先级，它的优先级是由它**的选择器列表中优先级最高的选择器决定的。**

### :not( \*) 问题

使用 `:not(*)` 将匹配任何非元素的元素，因此这个规则将永远不会被应用。

相当于一段没有任何意义的代码。

### :not() 不能嵌套 :not()

禁止套娃。`:not` 伪类不允许嵌套，这意味着 `:not(:not(...))` 是无效的。

### :not() 实战解析

那么，:not() 有什么特别有意思的应用场景呢？我这里列举一个。

在 [W3 CSS selectors-4 规范](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo "W3 CSS selectors-4 规范") 中，新增了一个非常有意思的 `:focus-visible` 伪类。

`:focus-visible` 这个选择器可以有效地根据用户的输入方式(鼠标 vs 键盘)展示不同形式的焦点。

有了这个伪类，就可以做到，当用户使用鼠标操作可聚焦元素时，不展示 `:focus` 样式或者让其表现较弱，而当用户使用键盘操作焦点时，利用 `:focus-visible`，让可获焦元素获得一个较强的表现样式。

看个简单的 Demo：

```sass (scss)  
<button>Test 1</button>
```


```sass (scss)  
button:active {
  background: #eee;
}
button:focus {
  outline: 2px solid red;
}
```


使用鼠标点击：

可以看到，使用鼠标点击的时候，触发了元素的 `:active` 伪类，也触发了 `:focus`伪类，不太美观。但是如果设置了 `outline: none` 又会使键盘用户的体验非常糟糕。因为当键盘用户使用 Tab 尝试切换焦点的时候，会因为 `outline: none` 而无所适从。

因此，可以使用 `:focus-visible` 伪类改造一下：

```sass (scss)  
button:active {
  background: #eee;
}
button:focus {
  outline: 2px solid red;
}
button:focus:not(:focus-visible) {
  outline: none;
}
```


看看效果，分别是在鼠标点击 Button 和使用键盘控制焦点点击 Button：

[CodePen Demo -- :focus-visible example](https://codepen.io/Chokcoco/pen/abBbPrE "CodePen Demo -- :focus-visible example")

可以看到，使用鼠标点击，不会触发 `:foucs`，只有当键盘操作聚焦元素，使用 Tab 切换焦点时，`outline: 2px solid red` 这段代码才会生效。

这样，我们就既保证了正常用户的点击体验，也保证了无法使用鼠标的用户的焦点管理体验，在可访问性方面下了功夫。

值得注意的是，这里为什么使用了 `button:focus:not(:focus-visible)` 这么绕的写法而不是直接这样写呢：

```sass (scss)  
button:focus {
  outline: unset;
}
button:focus-visible {
  outline: 2px solid red;
}
```


解释一下，`button:focus:not(:focus-visible)` 的意思是，**button 元素触发 focus 状态，并且不是通过 focus-visible 触发**，理解过来就是在支持 `:focus-visible` 的浏览器，通过鼠标激活 `:focus` 的 button 元素，这种情况下，不需要设置 `outline`。

为的是兼容不支持 `:focus-visible` 的浏览器，当 `:focus-visible` **不兼容时**，还是需要有 `:focus` 伪类的存在。

因此，这里借助 `:not()` 伪类，巧妙的实现了一个实用效果的方案降级。

> 这里有点绕，需要好好理解理解。

### :not 兼容性

经历了 CSS Selectors Level 3 & CSS Selectors Level 4 两个版本，到今天（2020-05-04），除去 IE 系列，`:not` 的兼容性已经非常之好了：
