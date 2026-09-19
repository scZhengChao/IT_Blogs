# Dockerfile语法

构建自定义的镜像时，并不需要一个个文件去拷贝，打包。

**我们只需要告诉Docker，我们的镜像的组成**，需要哪些BaseImage、需要拷贝什么文件、需要安装什么依赖、启动脚本是什么，将来Docker会帮助我们构建镜像。

而描述**上述信息的文件就是Dockerfile文件**。

**Dockerfile**就是**一个文本文件**，其中包含一个个的**指令(Instruction)**，用指令来说明要执行什么操作来构建镜像。**每一个指令都会形成一层Layer。**

![](image_M5LSEXDtBb.png)

更新详细语法说明，请参考官网文档：[https://docs.docker.com/engine/reference/builder](https://docs.docker.com/engine/reference/builder "https://docs.docker.com/engine/reference/builder")
