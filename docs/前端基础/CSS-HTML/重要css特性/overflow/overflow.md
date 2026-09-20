# overflow

## 目录

- [值](#值)
  - [visible](#visible)
  - [hidden](#hidden)
  - [clip](#clip)
  - [scroll](#scroll)
  - [auto](#auto)
- [描述](#描述)

**`overflow`** 是 [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS "CSS") 的[简写属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Shorthand_properties "简写属性")，其设置了**元素溢出时所需的行为**——即当元素的内容太大而无法适应它的[区块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context "区块格式化上下文")时。

### [值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow#值 "值")

##### [visible](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow#visible "visible")

内容**不能被裁减并且可能渲染到边距盒（padding）的外部。**

##### [hidden](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow#hidden "hidden")

如果需要，内容**将被裁减以适应边距**（padding）盒。不提供滚动条，也不支持允许用户滚动（例如通过拖拽或者使用滚轮）。内容\_可以\_以编程的方式滚动（例如，通过设置 [scrollLeft](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollLeft "scrollLeft") 等属性的值或 [scrollTo()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTo "scrollTo()") 方法）, 因此该元素仍然是一个滚动的容器。

##### [clip](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow#clip "clip")

类似于 `hidden`，内容将以元素的边距（padding）盒进行裁剪。`clip` 和 `hidden` **之间的区别是** `clip`关键**字禁止所有滚动，包括以编程方式的滚动。** 该盒子不是一个滚动的容器，并且不会启动新的格式化上下文。如果你希望开启一个新的格式化上下文，你可以使用[display: flow-root](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display#flow-root "display: flow-root") 来这样做。

##### [scroll](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow#scroll "scroll")

如果需要，内容将被**裁减以适应边距（padding）盒。**无论是否实际裁剪了任何内容**，浏览器总是显示滚动条**，以防止滚动条在内容改变时出现或者消失。打印机可能会打印溢出的内容。

##### [auto](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow#auto "auto")

取决于[**用户代理**](https://developer.mozilla.org/zh-CN/docs/Glossary/User_agent "用户代理")。如果内容适应边距（padding）盒，它看起来与 `visible` 相同，但是**仍然建立了一个新的块级格式化上下文**。如果内容溢出，则浏览器提供滚动条。

## [描述](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow#描述 "描述")

`overflow` 选项包括裁减、显示滚动条，或者显示从容器流向周围区域的内容。

指定 `visible`（默认）或 `clip` 以外的值，**会创建一个新的**[**区块格式化上下文**](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context "区块格式化上下文")。由于技术原因，这是必要的——如果浮动包含滚动元素，它将在每个滚动步骤后强制重新包装内容，从而导致一个缓慢的滚动体验。

为使 `overflow` 具有效果，**块级水平的容器必须有一个设定的高度**（`height` 或 `max-height`）或 `white-space` 设置为 `nowrap`。

设置一个轴为 `visible`（默认值），而设置另一个轴为\_不同的\_值时，`visible` 的行为会像 `auto` 一样。

JavaScript 的 [Element.scrollTop](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTop "Element.scrollTop") 属性可用于滚动 HTML 元素，即使当 `overflow` 设置为 `hidden` 时

[让overflow限制padding之内显示](让overflow限制padding之内显示.md "让overflow限制padding之内显示")
