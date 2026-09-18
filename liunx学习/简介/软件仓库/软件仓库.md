# 软件仓库

## 目录

- [yum 常用命令](#yum-常用命令)
- [切换 CentOS 软件源](#切换-CentOS-软件源)

`Linux` 下软件是以包的形式存在，一个**软件包其实就是软件的所有文件的压缩包**，**是二进制的形式**，包含了安装软件的所有指令。`Red Hat` 家族的软件包后缀名一般为 `.rpm` ，`Debian` 家族的软件包后缀是 `.deb` 。

`Linux` 的包都存在一个仓库，叫做软件仓库，它可以使用 `yum` 来管理软件包， `yum` 是 `CentOS` 中**默认的包管理工具，** 适用于 `Red Hat` 一族。可以理解成 `Node.js` 的 `npm` 。

### yum 常用命令

- `yum update | yum upgrade` 更新软件包
- `yum search xxx` 搜索相应的软件包
- `yum install xxx` 安装软件包
- `yum remove xxx` 删除软件包

### 切换 CentOS 软件源

有时候 `CentOS` 默认的 `yum` 源不一定是国内镜像，导致 `yum` 在线安装及更新速度不是很理想。这时候需要将 `yum` 源设置为国内镜像站点。国内主要开源的镜像站点是网易和阿里云。

1、首先备份系统自带 `yum` 源配置文件 `mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup`

2、下载阿里云的 `yum` 源配置文件到 `/etc/yum.repos.d/CentOS7`

```bash 
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

```


3、生成缓存

```bash 
yum makecache

```
