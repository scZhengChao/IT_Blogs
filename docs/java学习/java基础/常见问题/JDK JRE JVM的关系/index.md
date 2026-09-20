# JDK JRE JVM的关系

## 目录

- [什么是JRE](#什么是JRE)
- [什么是JDK](#什么是JDK)
- [为什么JDK中包含一个JRE](#为什么JDK中包含一个JRE)

## 什么是JRE

- 包括Java虚拟机(JVM Java Virtual Machine)和Java程序所需的核心类库等，如果想**要运行一个开发好的Java程序** **，** 计算机中只需要安装JRE即可。
- JRE:JVM+类库。&#x20;

## 什么是JDK

- JDK是提供给Java开发人员使用的，其中包含\*\*了****java的开发工具，也包括了JRE****。\*\*所以安装了JDK，就不用在单独安装JRE了。
- 其中的开发工具：
  - \*\*编译工具(javac.exe) \*\*
  - \*\*打包工具(jar.exe)等 \*\*
  - **运行 （java.exe）**
- JDK:JRE+JAVA的开发工具。

## 为什么JDK中包含一个JRE

- 为什么JDK中包含一个JRE呢？
  - 其一，开发完的程序，总需要运行一下看看效果。
  - 其二，也是最重要的，JDK中的开发工具其实都是java语言编写的应用程序，为了方便使用才打包成exe文件，如果没有JRE，那么这些工具是运行不了的

![](./assets/image/image_xJGI_x08Cs.png)

![](./assets/image/image__j6MeqBzXN.png)
