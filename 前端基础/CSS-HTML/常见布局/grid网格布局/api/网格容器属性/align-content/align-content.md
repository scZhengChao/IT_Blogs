# align-content

定义整个内容区域在容器里面的垂直对齐方式（上中下）

属性值：

- start：将网格对齐到 网格容器(grid container) 的顶部起始边缘（顶部对齐）
- end：将网格对齐到 网格容器 的底部结束边缘（底部对齐）
- center：将网格对齐到 网格容器 的垂直中间位置（垂直居中对齐）
- stretch：调整 网格项(grid items) 的高度，允许该网格填充满整个 网格容器 的高度
- space-around：在每个网格项之间放置一个均匀的空间，上下两端放置一半的空间
- space-between：在每个网格项之间放置一个均匀的空间，上下两端没有空间
- space-evenly：在每个网格项目之间放置一个均匀的空间，上下两端放置一个均匀的空间

align-content 属性基本与 justify-content 属性基本一致，主要区别在于 align-content 属性定义的是整个内容区域在容器里面的垂直方向对齐方式，需要注意只有当网格项目的高度未指定时 `align-content: stretch` 的页面效果才是内容区域在垂直方向铺满网格容器，否则页面效果跟 `align-content: start` 一致。
