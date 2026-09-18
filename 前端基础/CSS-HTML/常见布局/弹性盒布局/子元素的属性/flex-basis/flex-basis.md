# flex-basis

## 目录

- [语法](#语法)
  - [取值](#取值)

[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS "CSS") 属性 **`flex-basis`** 指定了 flex 元素在主轴方向上的初始大小。如果不使用 [box-sizing](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing "box-sizing") 改变盒模型的话，那么这个属性就决定了 flex 元素的内容盒（content-box）的尺寸。

**备注：** 当一个元素同时被设置了`flex-basis` (除值为 `auto` 外) 和 `width` (或者在 `flex-direction: column` 情况下设置了`height`) , `flex-basis` 具有更高的优先级。

# 语法

```css 
/* 指定<'width'> */
flex-basis: 10em;
flex-basis: 3px;
flex-basis: auto;

/* 固有的尺寸关键词 */
flex-basis: fill;
flex-basis: max-content;
flex-basis: min-content;
flex-basis: fit-content;

/* 在 flex item 内容上的自动尺寸 */
flex-basis: content;

/* 全局数值 */
flex-basis: inherit;
flex-basis: initial;
flex-basis: unset;

```


这个 `flex-basis` 属性 被指定为关键词 [content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis#content "content") 或者 [<'width'>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis#<'width'> "<'width'>").

### [取值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis#取值 "取值")

[<'width'>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis#width "<'width'>")

width 值可以是 [\<length>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length "<length>"); 该值也可以是一个相对于其父弹性盒容器主轴尺寸的[百分数](https://developer.mozilla.org/zh-CN/docs/Web/CSS/percentage "百分数") 。负值是不被允许的。默认为 `auto`。

[content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis#content "content")

基于 flex 的元素的内容自动调整大小。

> **备注：** 由于最初规范中没有包括这个值，在一些早期的浏览器实现的 flex 布局中，content 值无效，可以利用设置 ([width](https://drafts.csswg.org/css2/visudet.html#propdef-width "width") 或 [height](https://drafts.csswg.org/css2/visudet.html#propdef-height "height")) 为 auto 达到同样的效果。

**备注：** **简史**

- 最初，"flex-basis:auto" 的含义是 "参照我的`width`和`height`属性".
- 在此之后，"flex-basis:auto" 的含义变成了自动尺寸，而 "main-size" 变成了 "参照我的`width`和`height`属性"。实际执行于 [bug 1032922](https://bugzilla.mozilla.org/show_bug.cgi?id=1032922 "bug 1032922").
- 然后呢，这个更改又在 [bug 1093316](https://bugzilla.mozilla.org/show_bug.cgi?id=1093316 "bug 1093316") 中被撤销了，所以 "auto" 变回了原来的含义; 而一个新的关键字 'content' 变成了自动尺寸。 ([Firefox bug 1105111](https://bugzil.la/1105111 "Firefox bug 1105111") 包括了增加这个关键字).
