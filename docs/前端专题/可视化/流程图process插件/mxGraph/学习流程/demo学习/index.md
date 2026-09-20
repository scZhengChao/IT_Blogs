# demo学习

mxgraph 官方提供的示例都在[javascript/examples](https://link.juejin.cn/?target=https://github.com/jgraph/mxgraph/tree/master/javascript/examples "javascript/examples")目录下，合计有 88 个，可以双击`javascript/index.html`打开示例索引文档。虽然有如此多的示例代码，但每一个示例都没有足够的细节说明；官方也没有提供一个由浅入深的学习流程，为此我简单总结了一份阅读顺序：

1. helloworld.html，虽然是很基础的入门示例，但完整演示了 mxgraph 框架的使用流程。
2. 通过 shape.html 学习如何**自定义图元**；通过 stencils.html 学习如何**以 xml 格式定义图元样式**。
3. 通过 events.html 学习如**何监听 mxgraph 实例对象的事件**，完整的事件列表可参考`javascript/docs/jsapi/index.html`文档。
4. 通过 layers.html 学习**图形分层的概念**，分层功能有助于管理图形元素，大多数图形引擎都会有类似的功能设计。
5. 通过 groups.html 学习**图形元素的分组合并**，分组功能能将复数的图形在逻辑上合并为**一个**元素，是另一种维度的管理方法。
6. 通过 stylesheet.html 学习**如何定义图形样式**。
7. 通过 images.html 学习如何在 mxgraph 中**嵌入自定义图案。**
8. 通过 markers.html 学习**如何修改连接线的样式**。
9. 通过 labels.html、secondlabel.html 学习如何为**图形添加说明文字**；通过 indicators.html 学习如何为父级图元增加指示器；通过 htmllabel.html 学习如果以 label 形式嵌入 html 内容。
10. 通过 anchors.html、control.html 学习如何为**图形组件添加交互功能。**
11. 通过 graphlayout.html、autolayout.html、boundary.html 学习 mxgraph **的布局功能**；之后还可通过 hierarchicallayout.html、swimlanes.html 学习更复杂的布局逻辑。
12. 通过 codec.html、jsondata.html 学习如何执行**数据模型的编解码功能**，以及 fileio.html 学习如何实现图形内容**的持久化与还原。**
13. 通过 dragsource.html、drop.html 学习如何**实现图形拖拽操作**，以及 handles.html 学习更复杂的交互功能。

精度以上事例，结合`javascript/docs/jsapi/index.html`文档相信读者会对 mxgraph 有一个更高维度的认知。
