# 设置静态IP

我们目前安装的`Linux`操作系统，安装完毕之后并没有配置IP地址，**默认IP地址是动态获取的**，那如果我们使用该Linux服务器部署项目，IP动态获取的话，也就意味着，IP地址可能会发生变动，那我们访问项目的话就会非常繁琐，所以作为服务器，我们一般还需要把`IP`地址设置为静态的。

1\). 设置静态IP

设置静态`ip`，我们就需要修改 `/etc/sysconfig/network-scripts/ifcfg-ens33` 配置文件，内容如下：

```bash 
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
IPADDR="192.168.200.128"        # 设置的静态IP地址
NETMASK="255.255.255.0"         # 子网掩码
GATEWAY="192.168.200.2"         # 网关地址
DNS1="192.168.200.2"            # DNS服务器
DNS2="8.8.8.8"
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
UUID=afd0baa3-8bf4-4e26-8d20-5bc426b75fd6
DEVICE=ens33
ONBOOT=yes
ZONE=public

```


![](./assets/image/image_rPxC_sLQDC.png)

```bash 
BOOTPROTO=static
IPADDR="192.168.200.128"        # 设置的静态IP地址
NETMASK="255.255.255.0"         # 子网掩码
GATEWAY="192.168.200.2"         # 网关地址
DNS1="192.168.200.2"            # DNS服务器

BOOTPROTO=static
IPADDR="192.168.200.128"        
NETMASK="255.255.255.0"         
GATEWAY="192.168.200.2"         
DNS1="192.168.200.2"

```


上述我们所设置的网段为`200`，并不是随意指定的，需要和我们虚拟机中的**虚拟网络编辑器中的NAT模式配置的网关保持一致。**

![](./assets/image/image_Qn27QufxKl.png)

2\). 重启网络服务

ip地址修改完毕之后，**需要重启网络服务，** 执行如下指令：

```bash 
systemctl restart network
或者service network restart

```


![](./assets/image/image_7jhGNH2Idg.png)

\==注意：重启完网络服务后ip地址已经发生了改变，此时FinalShell已经连接不上Linux系统，需要创建一个新连接才能连接到Linux。==

再次连接上Linux之后，我们再次查看IP地址，就可以看到我们所设置的静态IP：

![](./assets/image/image_fcB0k9xGCj.png)
