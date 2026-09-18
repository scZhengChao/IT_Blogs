# :target

## 目录

- [使用 :target 伪类](#使用-target-伪类)

在本文中，我们将介绍如何在点击一个元素后保持 :active 的样式。在CSS中，:active 伪类表示元素在被激活（点击或按下）时的样式。默认情况下，当鼠标点击一个元素后，:active 样式会立即消失。然而，有时我们希望保持这个样式，以提供更好的用户体验。

## 使用 :target 伪类

除了 :active 和伪元素 :active，还可以尝试使用 :target 伪类来实现保持 :active 样式的效果。:target 伪类用于选择当前活动的锚点元素，当点击使用锚点链接到特定元素时，该元素就成为 :target 元素。我们可以利用这个特性来保持 :active 样式。以下是使用该方法的示例：

```javascript 
<style>
.button {
  padding: 10px 20px;
  background-color: #ccc;
  cursor: pointer;
}

#button:target {
  background-color: #ff0000;
  color: #fff;
}
</style>

<button id="button" class="button">Click me!</button>

```


在上述示例中，我们为按钮添加了一个 id 属性，并在样式表中使用了 :target 伪类选择器，定义了需要保持的样式规则。当点击按钮并使用锚点链接到该按钮时，按钮的背景颜色将变为红色，文本颜色将变为白色，并保持这个样式，直到切换目标到其他元素。

请注意，\*\*使用 :target 伪类方法的局限是，**它仅适用于通过锚点链接到特定元素的情况，并且**需要在URL中添加锚点。\*\*因此，如果我们希望在点击按钮后保持 :active 样式，我们需要确保按钮的锚点被正确设置。
