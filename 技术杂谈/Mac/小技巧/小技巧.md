# 小技巧

## 目录

- [解压 rar 文件](#解压-rar-文件)
- [mac连接到远程服务器](#mac连接到远程服务器)
- [m1 提升文件已损坏解决方案](#m1-提升文件已损坏解决方案)
  - [“xxx”已损坏，无法打开。你应该推出磁盘映像。](#xxx已损坏无法打开你应该推出磁盘映像)

# 解压 rar 文件

bandizip.&#x20;

# mac连接到远程服务器

[ 从 Mac 连接到 Windows 电脑 将 Mac 连接到您网络上的 Windows 电脑和服务器。 https://support.apple.com/zh-cn/guide/mac-help/mchlp1660/mac](https://support.apple.com/zh-cn/guide/mac-help/mchlp1660/mac " 从 Mac 连接到 Windows 电脑 将 Mac 连接到您网络上的 Windows 电脑和服务器。 https://support.apple.com/zh-cn/guide/mac-help/mchlp1660/mac")

[   https://www.jianshu.com/p/b305c8f99e2a](https://www.jianshu.com/p/b305c8f99e2a "   https://www.jianshu.com/p/b305c8f99e2a")

# m1 提升文件已损坏解决方案

首先我们打开终端输入命令：

```javascript 

```


然后回车，继续输入密码（密码输入时是不可见的），然后回车。

接着打开【系统偏好设置】，选择【安全性与隐私】，选择【通用】，可以看到【任何来源】已经选定。

## “xxx”已损坏，无法打开。你应该推出磁盘映像。

1、这个问题是禁用 Gatekeeper 功能或绕过 Quarantine 功能（通常该过程称为 Dequarantine 或 de-quarantine），则无法启动损坏的应用程序。

```javascript 
sudo xattr -r -d com.apple.quarantine 
```


**先不要按回车！先不要按回车！先不要按回车！先不要按回车！**

然后打开 **“访达”（Finder）** 进入**“应用程序”** 目录，找到该软件图标，将图标拖到刚才的终端窗口里面，即可

3、输入完成命令后输入密码，密码看不到，盲打，输入完成以后回车！
