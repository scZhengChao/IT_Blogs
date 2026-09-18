# 绝对定位

## 目录

- [ top ， right ， bottom ， left](#-top--right--bottom--left)

## &#x20;`top` ， `right` ， `bottom` ， `left`

在处理定位元素时，你通常会编写如下代码：

```css 
.some-element {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

```


这可以通过使用 `inset` 属性来简化：

```css 
.some-element {
    position: absolute;
    inset: 0;
}

```


或者，如果你对 `top` 、 `right` 、 `bottom` 和 `left` 有不同的值，你可以按照如下的顺序分别设置它们： `inset: -10px 0px -10px 0px` 。`这种简写方式与margin` 的工作方式相同。
