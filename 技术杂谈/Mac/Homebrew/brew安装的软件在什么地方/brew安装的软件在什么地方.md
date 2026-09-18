# brew安装的软件在什么地方

## 目录

- [一、Homebrew的概述](#一Homebrew的概述)
- [二、Homebrew安装软件的位置](#二Homebrew安装软件的位置)
  - [brew安装软件后：](#brew安装软件后)
  - [homebrew路径转化原理：](#homebrew路径转化原理)

## 一、Homebrew的概述

`Homebrew`是`macOS`上的一款包管理器，它能够让用户以命令行的方式轻松安装、更新和卸载软件包。`Homebrew`是免费、开源的，并且非常容易使用。在安装`Homebrew`之后，用户可以通过简单的命令轻松安装各种软件包。`Homebrew`是`macOS`上最受欢迎的包管理器之一，它具有以下特点：

- **自动解决依赖关系**
- **支持二进制安装，避免了编译时长**
- **易于定制**
- **包括超过20000个软件包**

## 二、Homebrew安装软件的位置

### brew安装软件后：

> 1.配置文件在/usr/local/etc中
> 2.安装文件在/usr/local/Cellar中
> 3.二进制可执行程序的[软连接](https://so.csdn.net/so/search?q=软连接\&spm=1001.2101.3001.7020 "软连接")在/usr/local/bin中

### homebrew路径转化原理：

> 1、通过brew install安装应用最先是放在/opt/homebrew/Cellar/目录下。 &#x20;
> 2、有些应用会自动创建软链接放在/usr/bin或者/usr/sbin，同时也会将整个文件夹放在/usr/local

查找在homebrew安装软件的路径，以[opencv](https://so.csdn.net/so/search?q=opencv\&spm=1001.2101.3001.7020 "opencv")为例：

```javascript 
brew list opencv

```
