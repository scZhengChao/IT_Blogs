# 数据卷

在之前的nginx案例中，修改nginx的html页面时，需要进入nginx内部。并且因为没有编辑器，修改文件也很麻烦。

这就是因为容器与数据（容器内文件）耦合带来的后果。

![](./assets/image/image_tCL6RYQxst.png)

要解决这个问题，必须将数据与容器解耦，这就要用到数据卷了。

[volumes](./volumes/index.md "volumes")

[什么是数据卷](./什么是数据卷/index.md "什么是数据卷")

[数据集操作命令](./数据集操作命令/index.md "数据集操作命令")

[创建和查看数据卷](./创建和查看数据卷/index.md "创建和查看数据卷")

[挂载数据卷](./挂载数据卷/index.md "挂载数据卷")

[陷阱](IT/docker/数据卷/陷阱/陷阱.md "陷阱")
