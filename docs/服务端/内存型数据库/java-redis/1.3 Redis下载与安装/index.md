# 1.3 Redis下载与安装

## 目录

- [1.3 Redis下载与安装](#13-Redis下载与安装)
  - [1.3.1 Redis下载](#131-Redis下载)
  - [1.3.2 Redis安装](#132-Redis安装)
    - [1）在Linux中安装Redis](#1在Linux中安装Redis)
      - [安装过程介绍](#安装过程介绍)
      - [redis安装](#redis安装)
    - [2）在Windows中安装Redis](#2在Windows中安装Redis)

### 1.3 Redis下载与安装

#### 1.3.1 Redis下载

Redis安装包分为windows版和Linux版：

- Windows版下载地址：[https://github.com/microsoftarchive/redis/releases](https://github.com/microsoftarchive/redis/releases "https://github.com/microsoftarchive/redis/releases")
- Linux版下载地址：[https://download.redis.io/releases/](https://download.redis.io/releases/ "https://download.redis.io/releases/")

下载后得到下面安装包：

![](./image/image_i2u8UDbaHN.png)

说明:

> **Redis官网只提供了linux版本，没有windows版本。windows版本由微软公司开发，不稳定，实际开发中我们一般都是使用linux版本。**

#### 1.3.2 Redis安装

##### **1）在Linux中安装Redis**

###### 安装过程介绍

1. 安装编译环境并且编译
2. 安装redis
3. 设置成后台运行
4. 打开防火墙6379端口号
5. 设置IP地址的bind(知道即可，今天课程不做过多要求，后续会使用)

###### redis安装

**1.先查看下是否安装了gcc-c++**

redis是C语言开发，安装redis需要先将官网下载的源码进行编译，编译依赖gcc环境。如果没有gcc环境，需要安装gcc。

```bash 
rpm -q gcc-c++

```


![](./image/image_n8vLBKtNSt.png)

如果出现如上所示说明已经安装了。**如果没有安装则执行下面命令进行安装即可。**

```bash 
yum-y install gcc-c++
```


&#x20;安装过程信息如下，大约需要下载39M。

![](./image/image_nBI5TZkBRn.png)

**2.上传"redis"到Linux系统/soft目录下**

![](./image/image_BOzq-7k-la.png)

**3.进入soft目录,将"redis-4.0.0.tar.gz"解压到当前目录**

```bash 
cd /usr/local/soft 
tar -zxvf redis-4.0.0.tar.gz
```


![](./image/image_uNFXFEyHNQ.png)

解压好之后会出现redis-4.0.0目录

![](./image/image_FDihiuCC8z.png)

切换到redis-4.0.0目录下查看内容，下面内容是redis的源码。

![](./image/image_LPmXGWRlO6.png)

**4.进入redis-4.0.0目录，使用make命令对上述源码在c语言的环境下进行编译redis 。make会调用gcc-c++编译redis源码，只有编译之后才可以进行安装。**

```text 
make

```


![](./image/image_Qc6ILNp34Y.png)

如下信息代表编译成功

![](./image/image_JLUuH_5wkx.png)

**5.在redis-4.0.0目录中，使用以下命令，将redis安装到/usr/local/soft/redis指定的目录下**

```bash 
makePREFIX=/usr/local/soft/redisinstall
```


![](./image/image_7_Rqhxn7DX.png)

​ 安装成功后在/usr/local/redis/bin目录下可以看到如下结构。

![](./image/image_Bt-xQWsvye.png)

**6.复制redis.conf配置文件到/usr/local/soft/redis/bin**

说明：要从刚解压的目录下复制过来。

```bash 
cd/usr/local/soft/redis-4.0.0/
```


![](./image/image_8PaXMwFRuu.png)

![](./image/image_qDmTAC2lFr.png)

![](./image/image_exVyGAAW71.png)

安装后重点文件说明：

> /usr/local/soft/redis/bin/redis-server：Redis服务启动脚本
>
> /usr/local/soft/redis/bin/redis-cli：Redis客户端脚本
>
> /usr/local/soft/redis/bin/redis.conf：Redis配置文件

##### **2）在Windows中安装Redis**

Redis的Windows版属于绿色软件，直接解压即可使用，解压后目录结构如下：

![](./image/image_vRZRkRy1RF.png)
