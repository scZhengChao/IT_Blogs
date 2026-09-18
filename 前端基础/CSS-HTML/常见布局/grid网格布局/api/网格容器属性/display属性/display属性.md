# display属性

将元素定义为网格容器，并为其内容建立新的网格格式上下文。

属性值：

- grid: 生成块级网格
- inline-grid: 生成内联网格
- subgrid: 生成一个**继承其父级网格容器的行和列的大小**的网格容器，它是其父级网格容器的一个子项

注意：设为网格布局以后，容器子元素（项目）的`float、display: inline-block、display: table-cell、vertical-align 和 column-*` 等设置都将失效。
