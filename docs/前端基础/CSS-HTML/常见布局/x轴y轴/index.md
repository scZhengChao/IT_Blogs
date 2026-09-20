# x轴y轴

## 目录

- [两个span水平对齐](#两个span水平对齐)
- [x轴居中](#x轴居中)

# 两个span水平对齐

```css 
 span { 
  vertical-align: middle;
}
```


# x轴居中

可能，你已经知道如何使用 `display: flex;` 和 `display: grid;` 来居中元素。然而，另一种不太受欢迎的在x轴上居中元素的方法是使用 `text-align` CSS属性。这个属性在居中文本时就能直接使用。要想在DOM中也居中其他元素，子元素需要有一个 `inline` 的显示。它可以是 `inline-block` 或任何其他内联...

```css 
div.parent {
    text-align: center;
}

div.child {
    display: inline-block;
}

```
