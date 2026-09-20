初识Docker

## 目录

- [操作系统结构](#操作系统结构)
- [Docker如何解决不同系统环境的问题？  ](#Docker如何解决不同系统环境的问题)
- [Docker原理  ](#Docker原理)

![](./assets/image/image_bzKuZNcS2K.png)

![](./assets/image/image_Gz_IZmfiP9.png)

Docker如何解决依赖的兼容问题的？

- 将应用的Libs（函数库）、Deps（依赖）、配置与应用一起打包
- 将每个应用放到一个隔离容器去运行，避免互相干扰

# 操作系统结构

![](./assets/image/image_oEWccJns7-.png)

![](./assets/image/image_xZumBMEwE2.png)

Docker如何解决不同系统环境的问题？

![](./assets/image/image_8xRRm7xWJS.png)

Docker如何解决不同系统环境的问题？

- Docker将**用户程序**与所需要**调用的系统(比如Ubuntu)函数库**一起打包
- Docker运行到**不同操作系统**时，直接**基于打包的库函数**，借助**于操作系统的Linux内核来**运行

Docker原理

![](./assets/image/image_SKWzO31XuM.png)

Docker如何解决大型项目依赖关系复杂，不同组件依赖的兼容性问题？

- Docker允许开发**中将应用、依赖、函数库**、**配置**一起打包，形成可移植镜像
- Docker应用运行在容器中，**使用沙箱机制，相互隔离**

Docker如何解决开发、测试、生产环境有差异的问题

- Docker镜像中包含**完整运行环境，包括系统函数库**，**仅依赖系统的Linux内核，**因此可以**在任意Linux操作系统上运行**
