# 1.5 安装lrzsz(主要是练习是Yum安装软件)

lrzsz 是用于在Linux系统中文件上传下载的软件。大家可能会存在疑问，我们用finalShell图形化界面就可以很方便的完成上传下载，为什么还要使用这个软件来完成上传下载呢？实际上是这样的，Linux的远程连接工具有很多，而finalShell只是其中的一种，而还有很多的远程连接工具并没有上传下载的功能，这个时候就需要依赖于lrzsz这个软件了。**最主要的是我们这里想通过Yum方式来安装lrzsz。让大家熟悉使用Yum如何安装软件。**

对于lrzsz的安装，我们需要通过第三种软件安装方式yum来进行安装。这里，我们先对yum做一个简单介绍。

yum（全称为 `Yellow dog Updater, Modified`）能够从**指定的服务器自动下载包并且安装**，可以**自动处理依赖关系**，**一次安装所有依赖的软件包，无须繁琐地一次次下载、安装。**

| **yum \[参数] \[命令] <安装包>** ​ | **说明**​            |
| --------------------------- | ------------------ |
| **参数：-y**​                  | 在软件安装过程中所有的提示回答yes |
| **命令：install**​             | 安装指定的软件            |
| **命令：remove**​              | 删除指定的安装包           |
| **命令：list**​                | 搜索指定的安装包           |

安装lrzsz的步骤如下:

1\). 搜索lrzsz安装包

```bash 
yum list lrzsz

```


![](./assets/image/image_X--0ZGH2lM.png)

**2). 在线安装lrzsz**

```bash 
yum install lrzsz.x86_64
```


![](./assets/image/image_Sh8DTD2JGT.png)

**3). 测试**

在命令行中输入 rz , 就会自动打开一个文件选择的窗口，然后选择要上传的文件。

![](./assets/image/image_vDarNenhJm.png)

将linux的文件下载到window系统中(默认下载到windows桌面上)的命令是：sz

![](./assets/image/image_jDtl0SDbtv.png)

**yum拓展知识:**

1\). 如果在不更改软件来源的情况下，是需要联网才能使用yum的，那么我们安装的软件是从哪儿下载的呢，这里就涉及到一个概念：\*\* yum源。\*\*

2\). 我们可以通过一个指令，来检查当前的yum源

![](./assets/image/image_DnwSAegIOn.png)

从图中，我们可以看到我们安装的 CentOS7 采用的是南京邮电大学的yum源。

3\). 网络 yum 源配置文件位于 /etc/yum.repos.d/ 目录下，文件扩展名为" \*.repo"

![](./assets/image/image_lbwqcHMQky.png)

可以看到，该目录下有 7 个 yum 配置文件，通常情况下 CentOS-Base.repo 文件生效。

4\). 添加阿里云yum源

A. 先通过`yum install wget`,安装wget命令

说明：wget表示上网下载。安装之前先去下载。

B. 备份默认的的yum源，执行指令 ：

切换目录: cd /etc/yum.repos.d/

创建备份目录: mkdir bak

移动现有的yum源文件到bak: mv \*.repo bak/

C. 下载阿里云的yum源

wget -O /etc/yum.repos.d/CentOS-Base.repo[http://mirrors.aliyun.com/repo/Centos-7.repo](http://mirrors.aliyun.com/repo/Centos-7.repo "http://mirrors.aliyun.com/repo/Centos-7.repo")

说明：这里的-O表示将阿里云的资源下载到/etc/yum.repos.d/CentOS-Base.repo文件中即表示下载的指定文件。

D. 执行命令，重新生成cache

yum clean all

说明：清除YUM缓存

yum makecache

说明：是将服务器上的软件包信息存放到本地缓存,以提高 搜索 安装软件的速度

E. 再次查看yum源

![](./assets/image/image_rASa4oW_64.png)

> 之后，我们通过yum指令安装软件，就是从阿里云下载的。
