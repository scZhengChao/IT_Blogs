Maven 简介

## 目录

- [Maven 作用：](#Maven-作用)
- [Maven 模型：](#Maven-模型)

Apache Maven 是一个**项目管理和构建工具**，它基于  ，通过一小段描述信息来管理项目的构建、报告和文档\*&#x20;

- 官网：[http://maven.apache.org/](http://maven.apache.org/ "http://maven.apache.org/")

# Maven 作用：

- Maven是专门用于**管理和构建Java项目的工具**，它的主要功能有：
  - 提供了一套标准化的项目结构
  - 提供了一套标准化的构建流程（编译，测试，打包，发布……）
  - 提供了一套依赖管理机制

![](./assets/image/image_kSw3P1NicN.png)

# Maven 模型：

- 项目对象模型 (Project Object Model)
- 依赖管理模型(Dependency)
- 插件(Plugin)

![](./assets/image/image_0p2aGMdNIA.png)

![](./assets/image/image_FdM_K8r3D2.png)

- 仓库分类：
  - 本地仓库：自己计算机上的一个目录
  - 中央仓库：由Maven团队维护的全球唯一的仓库
    - 地址：[https://repo1.maven.org/maven2/](https://repo1.maven.org/maven2/ "https://repo1.maven.org/maven2/")
  - 远程仓库(私服)：一般由公司团队搭建的私有仓库
- 当项目中使用坐标引入对应依赖jar包后，首先会查找本地仓库中是否有对应的jar包：
  - 如果有，则在项目直接引用;
  - 如果没有，则去中央仓库中下载对应的jar包到本地仓库。
- 还可以搭建远程仓库，将来jar包的查找顺序则变为：
  - 本地仓库 → 远程仓库 → 中央仓库
