# :active

## 目录

- [CSS 如何在点击一个元素后保持 :active 的样式](#CSS-如何在点击一个元素后保持-active-的样式)
  - [使用伪元素 :active](#使用伪元素-active)

# CSS 如何在点击一个元素后保持 :active 的样式

在本文中，我们将介绍如何在点击一个元素后保持 :active 的样式。在CSS中，:active 伪类表示元素在被激活（点击或按下）时的样式。默认情况下，**当鼠标点击一个元素后，:active 样式会立即消失。然而，有时我们希望保持这个样式，以提供更好的用户体验。**

## 使用伪元素 :active

除了使用[JavaScript](https://deepinout.com/javascript/javascript-top-tutorials/1695982827_j_javascript-tutorial.html "JavaScript")，我们还可以尝试使用CSS的伪元素 :active 来实现保持 :active 样式。这种方法比较简单，只需在样式表中添加一个新的 :active 伪元素选择器，然后定义需要保持的样式即可。以下是使用该方法的示例：

```javascript 
<style>
.button {
  padding: 10px 20px;
  background-color: #ccc;
  cursor: pointer;
}

.button:active, .button:active::after {
  background-color: #ff0000;
  color: #fff;
}
</style>

```


在上面的示例中，我们为按钮添加了一个 :active 伪元素选择器，并定义了需要保持的样式规则。当鼠标点击按钮时，按钮背景颜色将变为红色，文本颜色将变为白色，并保持这个样式直到鼠标释放。

需要注意的是，使用伪元素 :active 只适用于元素的交互状态，并不适用于其他状态，如焦点状态或鼠标悬停状态。因此，如果我们希望在元素的其他状态下也保持同样的样式，我们仍然需要使用JavaScript或其他方法来实现。
