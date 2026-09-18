# 备份

## 目录

- [scp](#scp)
- [rsync](#rsync)
  - [软件安装](#软件安装)
  - [基础用法](#基础用法)
  - [常用参数](#常用参数)

### scp

它是 `Secure Copy` 的缩写，表示安全拷贝。`scp` 可以使我们通过网络，把文件从一台电脑拷贝到另一台电脑。

`scp` 是基于 `ssh` 的原理来运作的， `ssh` 会在两台通过网络连接的电脑之间创建一条安全通信的管道， `scp` 就利用这条管道安全地拷贝文件。

```bash 
scp source_file destination_file # source_file 表示源文件，destination_file 表示目标文件

```


其中 `source_file` 和 `destination_file` 都可以这样表示：`user@ip:file_name` ， `user` 是登录名， `ip` 是域名或 `ip` 地址。`file_name` 是文件路径。

```bash 
scp file.txt root@192.168.1.5:/root # 表示把我的电脑中当前文件夹下的 file.txt 文件拷贝到远程电脑
scp root@192.168.1.5:/root/file.txt file.txt # 表示把远程电脑上的 file.txt 文件拷贝到本机

```


### rsync

`rsync` 命令主要用于远程同步文件。它可以同步两个目录，不管它们是否处于同一台电脑。它应该是最常用于“增量备份”的命令了。它就是智能版的 `scp` 命令。

#### 软件安装

```bash 

yum install rsync

```


#### 基础用法

```bash 

rsync -arv Images/ backups/ # 将Images 目录下的所有文件备份到 backups 目录下

rsync -arv Images/ root@192.x.x.x:backups/ # 同步到服务器的backups目录下


```


#### 常用参数

- `-a` 保留文件的所有信息，包括权限，修改日期等；
- `-r` 递归调用，表示子目录的所有文件也都包括；
- `-v` 冗余模式，输出详细操作信息。

默认地， `rsync` 在同步时并不会删除目标目录的文件，例如你在源目录中删除一个文件，但是用 `rsync` 同步时，它并不会删除同步目录中的相同文件。如果向删除也可以这么做：`rsync -arv --delete Images/ backups/` 。
