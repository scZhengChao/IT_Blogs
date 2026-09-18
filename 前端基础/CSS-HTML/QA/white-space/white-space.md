# white-space

## 目录

- [值](#值)
  - [normal](#normal)
  - [nowrap](#nowrap)
  - [pre](#pre)
  - [pre-wrap](#pre-wrap)
  - [pre-line](#pre-line)

CSS **`white-space`** 属性用于**设置如何处理元素**内的[空白字符](https://developer.mozilla.org/zh-CN/docs/Glossary/Whitespace "空白字符")。

这个属性指定了两件事：

- **空白字符是否**[**合并**](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#合并空白字符 "合并")**，以及如何合并。**
- **是否换行，以及如何换行。**

### [值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#值 "值")

`white-space` 属性可以被指定为从下面的值列表中选择的单个关键字，或者是表示 [white-space-collapse](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space-collapse "white-space-collapse") 和 [text-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap "text-wrap") 属性的简写的两个值。

##### [normal](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#normal "normal")

**连续的空白符会被**[**合并**](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#合并空白字符 "合并")**。**源码中的**换行符会被当作空白符来**处理。并根据填充行框盒子的需要来换行。

##### [nowrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#nowrap "nowrap")

和 `normal` 一样[合并](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#合并空白字符 "合并")空白符，**但阻止源码中的文本换行。**

##### [pre](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#pre "pre")

**连续的空白符会被保**留。仅在遇到**换行符或 **[**\<br>**](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/br "<br>")** 元素**时才会换行。

##### [pre-wrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#pre-wrap "pre-wrap")

连续的**空白符会被保留**。在遇到**换行符或 **[**\<br>**](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/br "<br>")** 元素**时，或者根据填充行框盒子的需要换行。

##### [pre-line](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#pre-line "pre-line")

连续的**空白符会被**[**合并**](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space#合并空白字符 "合并")**。**在遇**到换行符或 **[**\<br>**](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/br "<br>")** 元素**时，或者根据填充行框盒子的需要换行。
