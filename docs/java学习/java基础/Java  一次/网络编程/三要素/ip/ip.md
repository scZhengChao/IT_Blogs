# ip

## 目录

- [ipv4](#ipv4)
- [IPv6](#IPv6)
- [常用命令：](#常用命令)
- [InetAddress](#InetAddress)

IP：全称”`互联网协议地址`”，也称IP地址。是分配**给上网设备的数字标签**。常见的IP分类为：ipv4和ipv6

简单来说 : 就是设**备在网络中的唯一标识** , 想要连接哪一台电脑 , 就找到此电脑在网络中的ip地址

# ipv4

&#x20; &#x20;

> IP地址常见分类 : ipv4和ipv6

![](image_AYCKehAG4h.png)

# IPv6

IPv6：由于互联网的不断发展，**IP地址的需求量愈来愈大**，而IPv4的模式下IP的总数是有限的。&#x20;                采用128位地址长度，16位一组,一共分成8组。

![](image_GkrZ7K0BZt.png)

# 常用命令：

`ipconfig`：查看本机IP地址
`ping IP`地址：检查网络是否连通

特殊IP地址：
`127.0.0.1`：是回送地址也称本地回环地址，可以代表本机的IP地址，一般用来测试使用

# InetAddress

- 为了方便我们对IP地址的获取和操作，Java提供了一个类`InetAddress` 供我们使用
- `InetAddress`：此类表示Internet协议（IP）地址

![](image_4cMeWLQqrQ.png)
