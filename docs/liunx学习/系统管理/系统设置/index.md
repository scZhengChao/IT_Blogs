# 系统设置

## 目录

- [1. clear](#1-clear)
- [2. uptime](#2-uptime)
- [3. users](#3-users)
- [4. lsof](#4-lsof)
- [5. df](#5-df)
- [6. passwd](#6-passwd)
- [7. cal](#7-cal)

### 1. clear

clear 命令用于清除屏幕。

### 2. uptime

在linux中，uptime命令用来显示我们的系统运行了多少时间、当前登录的用户数，操作系统在过去的1、5、15分钟内的平均负载。

```bash 
uptime

22:52  up 10 days,  8:57, 2 users, load averages: 4.63 4.15 3.13

```


我们可以使用uptime来确定是服务器还是网络出了问题。例如如果网络应用程序运行，运行uptime来了解系统负载是否很高。如果负载不高，这个问题很有可能是由于网络引起的而非服务器。

可以使用 w 命令来代替 uptime。w 也提供关于当前系统登录用户和用户所进行工作的相关信息。

![](./assets/image/image_K9B-66TADw.webp)

### 3. users

users 命令用来显示系统当前登录的用户。

```bash 
users

mac
```


### 4. lsof

lsof 命令用于查看端口占用情况：

```bash 
lsof -i:3000
```


![](./assets/image/image_zP7btCX8P3.webp)

### 5. df

df 命令用于显示目前在 Linux 系统上的文件系统磁盘使用情况统计。

![](./assets/image/image_-P3wWMawj_.webp)

### 6. passwd

passwd 命令用来更改使用者的密码，需要根据提示输入一次旧密码和两次新密码。

![](./assets/image/image_EYHNoUquzJ.webp)

### 7. cal

cal 命令用于查看日历，默认只显示当前月份：

![](./assets/image/image_BYgIx-E4uB.webp)

可以使用`cal -y 2022`命令来显示某一年的日历：

![](./assets/image/image_BBo3Tzm3Ni.webp)

[防火墙操作](./防火墙操作/index.md "防火墙操作")

[设置静态IP](./设置静态IP/index.md "设置静态IP")
