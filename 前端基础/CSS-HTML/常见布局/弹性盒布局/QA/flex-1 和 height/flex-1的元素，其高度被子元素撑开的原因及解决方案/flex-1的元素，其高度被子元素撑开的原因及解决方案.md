# flex-1的元素，其高度被子元素撑开的原因及解决方案

## 目录

- [先说结论](#先说结论)
- [原因分析](#原因分析)
  - [为什么会content list的高度会撑开其父容器?](#为什么会content-list的高度会撑开其父容器)
- [问题原因
  ](#问题原因)
  - [解决方法 min-height: 0](#解决方法-min-height-0)
  - [height: 0](#height-0)

## 先说结论

推荐的解决方案：

1. 设置`min-height: 0`，而不是设置`height: 0`。
2. 设置`overflow: visible`(只要不是`auto`就行）。

## 原因分析

### 为什么会content list的高度会撑开其父容器?

原因： `flex`主轴上的`min-height/width`是`auto`。普通的元素是`0px`（[mdn链接](https://link.juejin.cn/?target=https://www.w3.org/TR/css-flexbox-1/#min-size-auto "mdn链接")

关于`min-height: auto`的计算：([mdn链接](https://link.juejin.cn/?target=https://drafts.csswg.org/css-sizing-3/#width-height-keywords "mdn链接")

简而言之就是，默认解析为0，除非当前布局容器另有计算规则

[ 父元素flex:1 高度却被子元素撑开的问题\_flex布局高度撑开-CSDN博客 文章浏览阅读3.3k次，点赞17次，收藏27次。文章讲述了在父元素使用flex布局且子元素高度不固定时，如何让子元素超出部分在父元素区域内产生滚动条。解决方案包括设置\`min-height:0\`和\`height:0\`，问题原因是MDN中的\`min-size\`属性会导致父元素高度变大，影响滚动条的显示。 https://blog.csdn.net/Supposelll/article/details/135910303](https://blog.csdn.net/Supposelll/article/details/135910303 " 父元素flex:1 高度却被子元素撑开的问题_flex布局高度撑开-CSDN博客 文章浏览阅读3.3k次，点赞17次，收藏27次。文章讲述了在父元素使用flex布局且子元素高度不固定时，如何让子元素超出部分在父元素区域内产生滚动条。解决方案包括设置`min-height:0`和`height:0`，问题原因是MDN中的`min-size`属性会导致父元素高度变大，影响滚动条的显示。 https://blog.csdn.net/Supposelll/article/details/135910303")

问题原因

MDN Flex min-size
对于`flex`容器而言，其默认的`min-width`和`min-height`都是`auto`，会在**实际的高度和用户设置的高度二者之间选择最小值** 。在上述情况下，并没有设置`min-height`，所以`min-height`会取实际的高度，即子元素的高度，所以父元素的高度其实也增加了。
对于子元素而言，父元素的高度就是其自身的高度，那么也不会触发滚动条。
所以并不是**设置的flex:1;无效，而是父元素的min-height增大导致了此问题**

### 解决方法 min-height: 0

给父元素设置 `min-height: 0;`

### height: 0

给父元素设置height: 0;也同样可以解决这个问题。其原因在于，在高度计算中，会取min-height和height中较小的那个。父元素设置了height: 0;之后，父元素的高度成了0，父元素的flex: 1; 使其占满整个可用空间，而子元素的高度超出了这个控件，所以产生了滚动条。
