# 网络

## 目录

- [ifconfig](#ifconfig)
- [host](#host)
  - [软件安装](#软件安装)
  - [基础用法](#基础用法)
- [ssh 连接远程服务器](#ssh-连接远程服务器)
  - [配置 ssh](#配置-ssh)
  - [免密登录](#免密登录)
    - [基于密钥验证原理](#基于密钥验证原理)
    - [具体实现步骤](#具体实现步骤)
- [wget](#wget)
  - [常用参数](#常用参数)

### ifconfig

查看 `ip` 网络相关信息，如果命令不存在的话， 执行命令 `yum install net-tools` 安装。

```bash 

[root@lion ~]# ifconfig

eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.31.24.78  netmask 255.255.240.0  broadcast 172.31.31.255        
        ether 00:16:3e:04:9c:cd  txqueuelen 1000  (Ethernet)        
        RX packets 1592318  bytes 183722250 (175.2 MiB)        
        RX errors 0  dropped 0  overruns 0  frame 0        
        TX packets 1539361  bytes 154044090 (146.9 MiB)        
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
        
lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0        
        loop  txqueuelen 1000  (Local Loopback)        
        RX packets 0  bytes 0 (0.0 B)        
        RX errors 0  dropped 0  overruns 0  frame 0        
        TX packets 0  bytes 0 (0.0 B)        
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

```


参数解析：

- `eth0` 对应有线连接（对应你的有线网卡），就是用网线来连接的上网。`eth` 是 `Ethernet` 的缩写，表示“以太网”。有些电脑可能同时有好几条网线连着，例如服务器，那么除了`eht0` ，你还会看到 `eth1` 、 `eth2` 等。
- `lo` 表示本地回环（ `Local Loopback` 的缩写，对应一个虚拟网卡）可以看到它的 `ip` 地址是 `127.0.0.1` 。每台电脑都应该有这个接口，因为它对应着“连向自己的链接”。这也是被称之为“本地回环”的原因。所有经由这个接口发送的东西都会回到你自己的电脑。看起来好像并没有什么用，但有时为了某些缘故，我们需要连接自己。例如用来测试一个网络程序，但又不想让局域网或外网的用户查看，只能在此台主机上运行和查看所有的网络接口。例如在我们启动一个前端工程时，在浏览器输入 `127.0.0.1:3000` 启动项目就能查看到自己的 `web` 网站，并且它只有你能看到。
- `wlan0` 表示无线局域网（上面案例并未展示）。

### host

`ip` 地址和主机名的互相转换。

#### 软件安装

```bash 

yum install bind-utils

```


#### 基础用法

```bash 
[root@lion ~]# host github.com
baidu.com has address 13.229.188.59

[root@lion ~]# host 13.229.188.59
59.188.229.13.in-addr.arpa domain name pointer ec2-13-229-188-59.ap-southeast-1.compute.amazonaws.com.

```


### ssh 连接远程服务器

通过非对称加密以及对称加密的方式（同 `HTTPS` 安全连接原理相似）连接到远端服务器。

```bash 
ssh 用户@ip:port
1、ssh root@172.20.10.1:22 # 端口号可以省略不写，默认是22端口
2、输入连接密码后就可以操作远端服务器了

```


#### 配置 ssh

`config` 文件可以配置 `ssh` ，方便批量管理多个 `ssh` 连接。

配置文件分为以下几种：

- 全局 `ssh` 服务端的配置：`/etc/ssh/sshd_config` ；
- 全局 `ssh` 客户端的配置：`/etc/ssh/ssh_config`（很少修改）；
- 当前用户 `ssh` 客户端的配置：`~/.ssh/config` 。

【服务端 `config` 文件的常用配置参数】

| 服务端 config 参数          | 作用                       |
| ---------------------- | ------------------------ |
| Port                   | sshd 服务端口号（默认是22）        |
| PermitRootLogin        | 是否允许以 root 用户身份登录（默认是可以） |
| PasswordAuthentication | 是否允许密码验证登录（默认是可以）        |
| PubkeyAuthentication   | 是否允许公钥验证登录（默认是可以）        |
| PermitEmptyPasswords   | 是否允许空密码登录（不安全，默认不可以）     |

\[注意] 修改完服务端配置文件需要重启服务 `systemctl restart sshd`

【客户端 `config` 文件的常用配置参数】

| 客户端 config 参数 | 作用             |
| ------------- | -------------- |
| Host          | 别名             |
| HostName      | 远程主机名（或 IP 地址） |
| Port          | 连接到远程主机的端口     |
| User          | 用户名            |

配置当前用户的 `config` ：

```bash 

# 创建config
vim ~/.ssh/config

# 填写一下内容
Host lion # 别名
  HostName 172.x.x.x # ip 地址  
  Port 22 # 端口  
  User root # 用户

```


这样配置完成后，下次登录时，可以这样登录 `ssh lion` 会自动识别为 `root` 用户。

\[注意] 这段配置不是在服务器上，而是你自己的机器上，它仅仅是设置了一个别名。

#### 免密登录

`ssh` 登录分两种，一种是基于口令（账号密码），另外一种是基于密钥的方式。

基于口令，就是每次登录输入账号和密码，显然这样做是比较麻烦的，今天主要学习如何基于密钥实现免密登录。

##### 基于密钥验证原理

客户机生成密钥对（公钥和私钥），把公钥上传到服务器，每次登录会与服务器的公钥进行比较，这种验证登录的方法更加安全，也被称为“公钥验证登录”。

##### 具体实现步骤

1、在客户机中生成密钥对（公钥和私钥） `ssh-keygen`（默认使用 RSA 非对称加密算法）

运行完 `ssh-keygen` 会在 `~/.ssh/` 目录下，生成两个文件：

- `id_rsa.pub` ：公钥
- `id_rsa` ：私钥

2、把客户机的公钥传送到服务

执行 `ssh-copy-id root@172.x.x.x`（`ssh-copy-id` 它会把客户机的公钥追加到服务器 `~/.ssh/authorized_keys` 的文件中）。

执行完成后，运行 `ssh root@172.x.x.x` 就可以实现免密登录服务器了。

配合上面设置好的别名，直接执行 `ssh lion` 就可以登录，是不是非常方便。

### wget

可以使我们直接从终端控制台下载文件，只需要给出文件的HTTP或FTP地址。

```bash 

wget [参数][URL地址]
wget http://www.minjieren.com/wordpress-3.1-zh_CN.zip

```


`wget` 非常稳定，如果是由于网络原因下载失败， `wget` 会不断尝试，直到整个文件下载完毕。

#### 常用参数

- `-c` 继续中断的下载。
