# flex

## 目录

- [使用Flexbox布局](#使用Flexbox布局)

# **使用Flexbox布局**

一般来说，使用flexDirection、alignItems和 justifyContent三个样式属性就已经能满足大多数布局需求

        1.Flex Direction

    在组件的style中指定flexDirection可以决定布局的主轴。子元素是应该沿着水平轴(row)方向排列，还是沿着竖直轴(column)方向排列呢？**默认值是竖直轴(column)方向。**

       2.Justify Content

    在组件的 style 中指定justifyContent可以决定其子元素沿着主轴的排列方式。子元素是应该靠近主轴的起始端还是末尾段分布呢？亦或应该均匀分布？对应的这些可选项有：flex-start、center、flex-end、space-around、space-between以及space-evenly。(around 和 evently 的区别 round 值的是元素的左右间隔一样的大小，而evently指的是元素之间的间隔一样大小)

        3.Align Items

在组件的 style 中指定alignItems可以决定其子元素沿着次轴（与主轴垂直的轴，比如若主轴方向为row，则次轴方向为column）的排列方式。子元素是应该靠近次轴的起始端还是末尾段分布呢？亦或应该均匀分布？对应的这些可选项有：flex-start、center、flex-end以及stretch。注意：要使stretch选项生效的话，子元素在次轴方向上不能有固定的尺寸。以下面的代码为例：只有将子元素样式中的width: 50去掉之后，alignItems: 'stretch'才能生效。
