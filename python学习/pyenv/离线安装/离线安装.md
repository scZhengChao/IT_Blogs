# 离线安装

## 目录

- [1.问题描述：](#1问题描述)
- [2.安装配置](#2安装配置)

[   https://www.cnblogs.com/Sungeek/p/10036033.html](https://www.cnblogs.com/Sungeek/p/10036033.html "   https://www.cnblogs.com/Sungeek/p/10036033.html")

> 在浏览器打开链接 比在控制台打开 要快

## 1.问题描述：

可能是国内的网络原因，在线用pyenv安装python老是定住没反应

```javascript 
[root@zabbix ~]# pyenv install 3.6.2
Downloading Python-3.6.2.tar.xz...
-> https://www.python.org/ftp/python/3.6.2/Python-3.6.2.tar.xz

```


## 2.安装配置

安装前需要在pyenv目录下创建cache文件夹，没有的情况

```javascript 
[root@zabbix ~]# cd ~/.pyenv/
[root@zabbix .pyenv]# mkdir cache

```


下载离线包利用wget，需要进入cache目录下

```javascript 
[root@zabbix cache]# wget https://www.python.org/ftp/python/3.6.2/Python-3.6.2.tar.xz
--2018-11-29 08:50:25--  https://www.python.org/ftp/python/3.6.2/Python-3.6.2.tar.xz
Resolving www.python.org (www.python.org)... 151.101.108.223, 2a04:4e42:36::223
Connecting to www.python.org (www.python.org)|151.101.108.223|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 16907204 (16M) [application/octet-stream]
Saving to: ‘Python-3.6.2.tar.xz’

100% [========================================================>] 16,907,204  61.3KB/s  eta 76s

```


然后查看目录下有没有python的tar包

```javascript 
[root@zabbix cache]# ls
Python-3.6.2.tar.xz

```


查看到已经下载成功以后再用pyenv安装python

```javascript 

```


最后查看是否安装成功

```javascript 
[root@zabbix ~]# pyenv versions
* system (set by /root/.pyenv/version)
  3.6.2

```
