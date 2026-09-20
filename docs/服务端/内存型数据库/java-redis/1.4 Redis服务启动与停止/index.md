# 1.4 Redis服务启动与停止

## 目录

- [redis启动客户端](#redis启动客户端)
- [停止redis](#停止redis)
- [2）Windows系统中启动和停止Redis了解](#2Windows系统中启动和停止Redis了解)

1）Linux系统中启动和停止Redis 掌握
redis启动服务器
启动redis有两种方式：

【1】前端模式启动(不使用这种模式)

直接运行bin/redis-server以前端模式启动，前端模式启动的缺点是启动完成后，不能再进行其他操作，如果要操作必须使用ctrl+c，同时redis-server程序结束，不推荐使用此方法。

```bash 
./redis-server
```


![](./image/image_C8hTl4Yqgc.png)

使用CTRL+ C 停止前端模式

【2】后端模式启动(推荐使用)

1.修改redis.conf配置文件，修改daemonize yes 以后端模式启动。

daemonize：后台运行

```bash 
vim redis.conf

```


![](./image/image_Zg-UYktdWJ.png)

![](./image/image_siQdnP5ki5.png)

保存并退出。

2.启动时，指定配置文件

```bash 
cd /usr/local/soft/redis/bin
 ./redis-server redis.conf

```


![](./image/image_rAu8Xfaq5G.png)

3.查看启动的后台进程

```bash 
ps-aux | grep redis
```


![](./image/image_ynW99jLJHG.png)

##### redis启动客户端

1. 进入redis/bin目录,启动"redis-cli"

```bash 
./redis-cli
```


![](./image/image_TaASHScTmc.png)

##### 停止redis

**在客户端向Redis发送shutdown命令**

方法：在Redis客户端里面输入shutdown

![](./image/image_f5u8KoN1bv.png)

**注意：上述已经将redis服务关闭了，如果希望演示下面的远程访问redis必须先启动redis服务。**

```bash 
./redis-server redis.conf
```


![](./image/image_yJ9-vwuRqH.png)

#### **2）Windows系统中启动和停止Redis**了解

Windows系统中启动Redis，直接双击redis-server.exe即可启动Redis服务，redis服务默认端口号为6379

![](./image/image_mSQVQpaLfc.png)

如果双击无法启动redis,那么就打开dos窗口输入如下命令启动:

![](./image/image_sPV6x9bbGm.png)

\==Ctrl + C==停止Redis服务

双击==redis-cli.exe==即可启动Redis客户端，默认连接的是本地的Redis服务，而且不需要认证即可连接成功。

![](./image/image_8jqRgK6lBq.png)

退出客户端可以输入==exit==或者==quit==命令。
