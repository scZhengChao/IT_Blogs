# 使用边框绘制一个三角形

在某些情况下，例如在工具提示中**添加箭头指针时，** 如果你只需要简单的三角形，那么加载图片可能会过度。

仅使用CSS，您就可以通过边框创建一个三角形。

&#x20;        这是一个相当老的技巧。理想情况下，你会在一个**宽度和高度都为零的元素上设置边框**。所有的边框颜色都是透明的，除了那个将形成箭头的边框。例如，要创建一个向上指的箭头，底部边框是有颜色的，而左边和右边是透明的。无需包括顶部边框。边框的宽度决定了箭头的大小。

```css 
.upwards-arrow {
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;

    border-bottom: 20px solid crimson;
}

```
