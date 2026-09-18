# 初识Homebrew

## 目录

- [一、Homebrew是什么 ](#一Homebrew是什么-)
  - [1.1 组成部分](#11-组成部分)
  - [1.2 核心概念](#12-核心概念)

官网

> **官网：**[**https://brew.sh/**](https://brew.sh/ "https://brew.sh/")

[ Homebrew The Missing Package Manager for macOS (or Linux). https://brew.sh/index\_zh-cn](https://brew.sh/index_zh-cn " Homebrew The Missing Package Manager for macOS (or Linux). https://brew.sh/index_zh-cn")

对于习惯了使用命令来完成一切的程序员来说，安装软件这种小事，自然是能够用命令解决，就不用图形界面选择。但是在`Linux`中，我们有`yum`、`apt`、`dnf`、`pkg`等命令来完成软件的安装，`macOS`却并未为我们提供一个好用的包管理器，帮助我们更好的使用`macOS`。

# 一、Homebrew是什么&#x20;

`Homebrew`是一款`Mac OS`平台下的**软件包管理工具**，拥有**安装、卸载、更新、查看、搜索**等很多实用的功能。简单的一条指令，就可以实现包管理，而不用你关心各种依赖和文件路径的情况，十分方便快捷。&#x20;

援引[官方](https://links.jianshu.com/go?to=http%3A%2F%2Fbrew.sh%2F "官方")的一句话：又提示缺少套件啦？别担心，`Homebrew` 随时守候。`Homebrew` —— OS X 不可或缺的套件管理器&#x20;

`Homebrew`由开发者 Max Howell 开发，并基于 BSD 开源，是一个非常方便的包管理器工具。在早期，`Homebrew`仅有`macOS`的版本，后续随着用户的增多，`Homebrew`还提供了`Linux`的版本，帮助开发者在Linux同样使用`Homebrew`来配置环境。

#### 1.1 组成部分

`Homebrew`是一款包管理工具，目前支持`macOS`和`linux`系统。主要有四个部分组成:`brew`、`homebrew-core`、`homebrew-cask`、`homebrew-bottles`。

| 名称                    | 说明                     |
| --------------------- | ---------------------- |
| **brew**​             | Homebrew 源代码仓库         |
| **homebrew-core**​    | Homebrew 核心源           |
| **homebrew-cask**​    | 提供 macOS 应用和大型二进制文件的安装 |
| **homebrew-bottles**​ | 预编译二进制软件包              |

#### 1.2 核心概念

在正式介绍`Homebrew`的使用之前，我先为你介绍一下`Homebrew`中的一些核心的概念，了解这些概念，就可以帮助你更好的去使用`Homebrew`。

| 词汇                | 含义                                                  |
| ----------------- | --------------------------------------------------- |
| **formula (e)** ​ | 安装包的描述文件，formulae 为复数                               |
| **cellar**​       | 安装好后所在的目录                                           |
| **keg**​          | 具体某个包所在的目录，keg 是 cellar 的子目录                        |
| **bottle**​       | 预先编译好的包，不需要现场下载编译源码，速度会快很多；官方库中的包大多都是通过 bottle 方式安装 |
| **tap**​          | 下载源，可以类比于 Linux 下的包管理器 repository                   |
| **cask**​         | 安装 macOS native 应用的扩展，你也可以理解为有图形化界面的应用。             |
| **bundle**​       | 描述 Homebrew 依赖的扩展                                   |

其中，最关键的是`tap`、`cask`，我们在后续会经常用到。
