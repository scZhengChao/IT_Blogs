# nginx开发应用

## 目录

- [历史背景](#历史背景)
- [Nginx 优势](#Nginx-优势)
- [Nginx 主要应用场景](#Nginx-主要应用场景)
- [Nginx 配置文件和目录](#Nginx-配置文件和目录)
- [正向代理 Forward proxy](#正向代理-Forward-proxy)
- [反向代理 Reverse proxy](#反向代理-Reverse-proxy)
  - [Location 指令说明：](#Location-指令说明)
- [负载均衡 Load Balance](#负载均衡-Load-Balance)
  - [后端服务器状态](#后端服务器状态)
  - [分配方式](#分配方式)
- [动静分离](#动静分离)
- [高可用](#高可用)
  - [1.在两台 Nginx 服务器上安 Keepalived：](#1在两台-Nginx-服务器上安-Keepalived)
  - [2.修改主备服务器](#2修改主备服务器)
  - [3.在 /usr/local/src 目录下添加检测脚本 nginx\_check.sh：](#3在-usrlocalsrc-目录下添加检测脚本-nginx_checksh)
  - [4.启动两台服务器的 Nginx 和 Keepalived：](#4启动两台服务器的-Nginx-和-Keepalived)
  - [5.查看虚拟 IP 地址 IP a。](#5查看虚拟-IP-地址-IP-a)
- [原理解析](#原理解析)
  - [一个 Master 和多个 Worker 的好处?](#一个-Master-和多个-Worker-的好处)
  - [思考：](#思考)
  - [思考1：Nginx如何做到热部署？](#思考1Nginx如何做到热部署)
  - [思考2：Nginx如何做到高并发下的高效处理？](#思考2Nginx如何做到高并发下的高效处理)
  - [思考3：Nginx挂了怎么办？](#思考3Nginx挂了怎么办)
- [跨域](#跨域)
- [Gzip](#Gzip)
- [请求限制](#请求限制)
- [访问控制](#访问控制)
- [ab命令](#ab命令)
- [防盗链](#防盗链)
- [Nginx 缓存](#Nginx-缓存)

# 历史背景

互联网的全球化导致了互联网的数据量快速增长，加上在本世纪初摩尔定律在单核 CPU 上的失效，CPU 朝着多核方向发展，而 Apache 显然并没有做好多核架构的准备，它的一个进程同一时间只能处理一个连接，处理完一个请求后才能处理下一个，这无疑不能应对如今互联网上海量的用户。况且进程间切换的成本是非常高的。在这种背景下，Nginx 应运而生，可以轻松处理数百万、上千万的连接。

# Nginx 优势

- 高并发高性能
- 可扩展性好
- 高可靠性
- 热部署
- 开源许可证
- Nginx 是开源的轻量级 Web 服务器、反向代理服务器，以及负载均衡器和 HTTP 缓存器。其特点是高并发，高性能和低内存。
- Nginx 专为性能优化而开发，性能是其最重要的考量，实现上非常注重效率，能经受高负载的考验，最大能支持 50000 个并发连接数。
- Nginx 还支持热部署，它的使用特别容易，几乎可以做到 7x24 小时不间断运行。Nginx 的网站用户有：百度、淘宝、京东、腾讯、新浪、网易等。
- Nginx是一款轻量级的Web服务器、反向代理服务器，由于它的内存占用少（一个worker进程只占用10-12M内存），启动极快，高并发能力强，在互联网项目中广泛应用。

# Nginx 主要应用场景

- 静态资源服务，通过本地文件系统提供服务
- 反向代理服务、负载均衡
- API服务、权限控制，减少应用服务器压力

![  ](./assets/image/45c3eb059a06409cb19c325e4a114a8d_7kE1eTRnyA.png "  ")

# Nginx 配置文件和目录

通过 

rpm -ql nginx

 可以查看 Nginx 安装的配置文件和目录。

如图是我在某某云上安装的最新稳定版本的Nginx的配置文件及目录。

- /etc/nginx/nginx.conf 核心配置文件
- /etc/nginx/conf.d/default.conf 默认http服务器配置文件
- /etc/nginx/fastcgi\_params fastcgi配置
- /etc/nginx/scgi\_params scgi配置
- /etc/nginx/uwsgi\_params uwsgi配置
- /etc/nginx/koi-utf
- /etc/nginx/koi-win
- /etc/nginx/win-utf 这三个文件是编码映射文件，因为作者是俄国人
- /etc/nginx/mime.types 设置HTTP协议的Content-Type与扩展名对应关系的文件
- /usr/lib/systemd/system/nginx-debug.service
- /usr/lib/systemd/system/nginx.service
- /etc/sysconfig/nginx
- /etc/sysconfig/nginx-debug 这四个文件是用来配置守护进程管理的
- /etc/nginx/modules 基本共享库和内核模块
- /usr/share/doc/nginx-1.18.0 帮助文档
- /usr/share/doc/nginx-1.18.0/COPYRIGHT 版权声明
- /usr/share/man/man8/nginx.8.gz 手册
- /var/cache/nginx Nginx的缓存目录
- /var/log/nginx Nginx的日志目录
- /usr/sbin/nginx 可执行命令
- /usr/sbin/nginx-debug 调试执行可执行命令

关于 Nginx 的常用命令以及配置文件语法很容易就可以搜到，本文不作赘述，下面从 Nginx 的功能以及实际场景出发看一看各个场景下 Nginx 可以提供给我们哪些配置项。在此之前，我们先来明确两个概念：

# 正向代理 Forward proxy

一句话解释正向代理，正向代理的对象是客户端，服务器端看不到真正的客户端。

**正向代理就是代理服务器替客户端去访问目标服务器**

。例如vpn

实现效果：在浏览器输入 [www.google.com](http://www.google.com) , 浏览器跳转到 [www.google.com](http://www.google.com) 。

![  ](./assets/image/67384c04b062b7f8a1bcd1446fa1a948_F-cKtyhykJ.png "  ")

![  ](./assets/image/bc423cbe92af836f15c58a634a0d7ecf_d3MgdDvBLN.png "  ")

resolver 8.8.8.8 

\# 谷歌的域名解析地址

server {

 location / {

\# 当客户端请求我的时候，我会把请求转发给它

\# \$http\_host 要访问的主机名 \$request\_uri 请求路径

      proxy\_pass http\://

\$http\_host\$request\_uri

;

 }

}

# 反向代理 Reverse proxy

一句话解释反向代理，反向代理的对象是服务端，客户端看不到真正的服务端。

        客户端对代理服务器是无感知的，客户端不需要做任何配置，用户只请求反向代理服务器，反向代理服务器选择目标服务器，获取数据后再返回给客户端。

       反向代理服务器和目标服务器对外而言就是一个服务器，只是暴露的是代理服务器地址，而隐藏了真实服务器的 IP 地址。

![  ](./assets/image/877a4c8fa690ee1b231696cc26ae3867_oJplhs1QPt.png "  ")

![  ](./assets/image/25d9ef266bc80bcfbee09fa00592224b_caODKSSwgd.png "  ")

### Location 指令说明：

- \~：表示 uri 包含正则表达式，且区分大小写。
- \~ \*：表示 uri 包含正则表达式，且不区分大小写。
- \=：表示 uri 不含正则表达式，要求严格匹配。

# 负载均衡 Load Balance

当我们的网站需要解决高并发、海量数据问题时，就需要使用负载均衡来调度服务器。将请求合理的分发到应用服务器集群中的一台台服务器上。

![  ](./assets/image/d8c917d2cf2e3fa70fd89356a8d9e4f5_f_nhMFY2I2.png "  ")

Nginx 可以为我们提供负载均衡的能力，具体配置如下：

\# upstream 指定后端服务器地址

\# weight 设置权重

\# server 中会将 http\://webcanteen 的请求转发到 upstream 池中

upstream webcanteen {

    server 127.0.0.1:66 weight=10;

    server 127.0.0.1:77 weight=1;

    server 127.0.0.1:88 weight=1;

}

server {

    location / {

        proxy\_pass http\://webcanteen

    }

}

## 后端服务器状态

后端服务器支持以下的状态配置：

- down：当前服务器不参与负载均衡
- backup：当其他节点都无法使用时的备用服务器
- max\_fails：允许请求失败的次数，若到达就会休眠
- fail\_timeout：经过max\_fails次失败后，服务器的暂停时间，默认为10s
- max\_conns：限制每个服务器的最大接收连接数

upstream webcanteen {

 server 127.0.0.1:66 down;

 server 127.0.0.1:77 backup;

 server 127.0.0.1:88  max\_fails=3 fail\_timeout=10s;

 server 127.0.0.1:99 max\_conns=1000;

}

## 分配方式

- 轮询(默认），每个请求按照时间顺序轮流分配到不同的后端服务器，如果某台后端服务器宕机，Nginx 轮询列表会自动将它去除掉。
- weight(加权轮询)，轮询的加强版，weight 和访问几率成正比，主要用于后端服务器性能不均的场景。
- ip\_hash，每个请求按照访问 IP 的 hash 结果分配，这样每个访问可以固定访问一个后端服务器。
- url\_hash，按照访问 URL 的 hash 结果来分配请求，使得每个URL定向到同一个后端服务器上，主要应用于后端服务器为缓存时的场景。
- 自定义hash，基于任意关键字作为 hash key 实现 hash 算法的负载均衡
- fair，按照后端服务器的响应时间来分配请求，响应时间短则优先分配。

下面是我的一个关于代理配置的配置文件部分，仅供参考。

include mime.types; #文件扩展名与文件类型映射表

default\_type application/octet-stream; #默认文件类型，默认为text/plain

\#access\_log off; #取消服务日志

log\_format myFormat

'\$remote\_addr–\$remote\_user \[\$time\_local] \$request \$status \$body\_bytes\_sent \$http\_referer \$http\_user\_agent \$http\_x\_forwarded\_for'

; #自定义格式

access\_log log/access.log myFormat; #combined为日志格式的默认值

sendfile on; #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。

sendfile\_max\_chunk 100k; #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。

keepalive\_timeout

65

; #连接超时时间，默认为75s，可以在http，server，location块。

proxy\_connect\_timeout

1

; #nginx服务器与被代理的服务器建立连接的超时时间，默认60秒

proxy\_read\_timeout

1

; #nginx服务器想被代理服务器组发出read请求后，等待响应的超时间，默认为60秒。

proxy\_send\_timeout

1

; #nginx服务器想被代理服务器组发出write请求后，等待响应的超时间，默认为60秒。

proxy\_http\_version

1.0

; #Nginx服务器提供代理服务的http协议版本1.

0

，

1.1

，默认设置为1.0版本。

\#proxy\_method

get

; #支持客户端的请求方法。post/

get

；

proxy\_ignore\_client\_abort on; #客户端断网时，nginx服务器是否终端对被代理服务器的请求。默认为off。

proxy\_ignore\_headers

"Expires""Set-Cookie"

; #Nginx服务器不处理设置的http相应投中的头域，这里空格隔开可以设置多个。

proxy\_intercept\_errors on; #如果被代理服务器返回的状态码为400或者大于400，设置的error\_page配置起作用。默认为off。

proxy\_headers\_hash\_max\_size

1024

; #存放http报文头的哈希表容量上限，默认为512个字符。

proxy\_headers\_hash\_bucket\_size

128

; #nginx服务器申请存放http报文头的哈希表容量大小。默认为64个字符。

proxy\_next\_upstream timeout; #反向代理upstream中设置的服务器组，出现故障时，被代理服务器返回的状态值。error|timeout|invalid\_header|http\_500|http\_502|http\_503|http\_504|http\_404|off

\#proxy\_ssl\_session\_reuse on; 默认为on，如果我们在错误日志中发现“SSL3\_GET\_FINSHED:digest check failed”的情况时，可以将该指令设置为off。

# 动静分离

为了加快网站的解析速度，可以把静态页面和动态页面由不同的服务器来解析，加快解析速度，降低原来单个服务器的压力。

![  ](./assets/image/b784a3ba4a5e2a20a7508f7eb716c19d_uNhIZlgxXn.png "  ")

# 高可用

为了提高系统的可用性和容错能力，可以增加 Nginx 服务器的数量，当主服务器发生故障或宕机，备份服务器可以立即充当主服务器进行不间断工作。

![  ](./assets/image/6b920c97f2782c84cbe896dfc9f3c7b1_q6L-QUVaAi.png "  ")

一般情况下，通过 Nginx 主服务器访问后台目标服务集群，当主服务器挂掉后，自动切换至备份服务器，此时由备份服务器充当主服务器的角色，访问后端目标服务器。

实现效果：准备两台 Nginx 服务器，通过浏览器地址栏访问虚拟 IP 地址，把主服务器的 Nginx 停止，再次访问虚拟 IP 地址仍旧有效。

具体配置：

\# 安装

keepalived

yum

install

keepalived

-y

\# 检查版本

rpm

-q

-a

keepalived

keepalived-1

.3.5-16.el7.x86\_64

## 1.在两台 Nginx 服务器上安 Keepalived：

Keepalived 相当于一个路由，它通过一个脚本来检测当前服务器是否还活着，如果还活着则继续访问，否则就切换到另一台备份服务器。

## 2.修改主备服务器

        /etc/keepalived/keepalivec.conf 配置文件(可直接替换)，完成高可用主从配置。

     Keepalived 将 Nginx 服务器绑定到一个虚拟 IP，Nginx 高可用集群对外统一暴露这个虚拟 IP，客户端都是通过访问这个虚拟 IP 来访问 Nginx 服务器 。

global\_defs {

notification\_email {

acassen@

firewall.loc

failover@

firewall.loc

sysadmin@

firewall.loc

}&#x20;

notification\_email\_from\_Alexandre.

Cassen@

firewall.loc

smtp\_server

192.168.4.32

smtp\_connect\_timeout

30

router\_id LVS\_DEVEL # 在 /etc/hosts 文件中配置，通过它能访问到我们的主机&#x20;

}&#x20;

vrrp\_script\_chk\_http\_port {&#x20;

script

"/usr/local/src/nginx\_check.sh"

interval

2

\# 检测脚本执行的时间间隔

weight

2

\# 权重每次加

2

}&#x20;

vrrp\_instance VI\_1 {

interface

ens7f0

\# 网卡，需根据情况修改

state

MASTER

\# 备份服务器上将

MASTER

改为

BACKUP

virtual\_router\_id

51 # 主备机的

virtual\_router\_id

必须相同

priority

100 # 主备机取不同的优先级，主机值较大，备份机值较小

advert\_int

1 # 每隔多长时间（默认1

s

）发送一次心跳，检测服务器是否还活着

authentication

{

auth\_type PASS auth\_pass

1111

}&#x20;

virtual\_ipaddress {

192.168.1.100

\# VRRP H 虚拟地址，可以绑定多个

}&#x20;

}

字段说明如下：

router\_id：在 /etc/hosts 文件中配置，通过它能访问到我们的主机。

interval：设置脚本执行的间隔时间。

weight：当脚本执行失败即 Keepalived 或 Nginx 挂掉时，权重增加的值(可为负数)。

interface：输入 ifconfig 命令查看当前的网卡名是什么。

## **3.在 /usr/local/src 目录下添加检测脚本 nginx\_check.sh：**

\#

!/bin/bash

A=\`ps -C nginx -no-header |wc -l\`

if

\[

\$A

-eq 0 ];

then

/usr/

local

/nginx/sbin/nginx

sleep 2

if

\[ ps -C nginx -no-header |wc -l\` -eq 0 ];

then

killall keepalived

fi

fi

## **4.启动两台服务器的 Nginx 和 Keepalived：**

\#

启动 nginx

./nginx

\# 启动 keepalived

systemctl start keepalived.service

## **5.查看虚拟 IP 地址 IP a****。** ​

把主服务器 192.168.4.32 Nginx 和 Keepalived 停止，再访问虚拟 IP 查看高可用效果。

# **原理解析**

![  ](./assets/image/090f2d9eb3ad5800142a6c7d9f3804e8_FtL7QafHXv.png "  ")

Nginx 启动之后，在 Linux 系统中有两个进程，一个为 Master，一个为 Worker。

Master 作为管理员不参与任何工作，只负责给多个 Worker 分配不同的任务(Worker 一般有多个)。

ps-ef|grepnginx

root

20473102019

?

00:00:00 nginx:

masterprocess/usr/sbin/nginx

nginx

4628204730

Jan06?

00:00:00 nginx:

workerprocess

nginx

4629204730

Jan06?

00:00:00 nginx:

workerprocess

Worker 是如何工作的?客户端发送一个请求首先要经过 Master，管理员收到请求后会将请求通知Worker。

多个 Worker 以争抢的机制来抢夺任务，得到任务的 Worker 会将请求经由 Tomcat 等做请求转发、反向代理、访问数据库等(Nginx 本身是不直接支持 Java 的)。

![  ](./assets/image/894292a945bd56b4bd8a1b153750a675_zSWFCfV6cm.png "  ")

## **一个 Master 和多个 Worker 的好处?**

- 可以使用 nginx -s reload 进行热部署。
- 每个 Worker 是独立的进程，如果其中一个 Worker 出现问题，其他 Worker 是独立运行的，会继续争抢任务，实现客户端的请求过程，而不会造成服务中断。

          设置多少个 Worker 合适?Nginx 和 Redis 类似，都采用了 IO 多路复用机制，每个 Worker 都是一个独立的进程，

**每个进程里只有一个主线程。**

          通

**过异步非阻塞的方式来处理请求**

，每个 Worker 的线程可以把一个 CPU 的性能发挥到极致，因此，Worker 数和服务器的 CPU 数相等是最为适宜的。

## 思考：

- 发送一个请求，会占用 Worker 几个连接数?
- 有一个 Master 和 4 个 Worker，每个 Worker 支持的最大连接数为 1024，该系统支持的最大并发数是多少?

Master进程的作用：读取并验证配置文件nginx.conf；管理worker进程；

Worker进程的作用：每一个Worker进程都维护一个线程（避免线程切换），处理连接和请求；注意Worker进程的个数由配置文件决定，一般和CPU个数相关（有利于进程切换），配置几个就有几个Worker进程，上面的例子只有1个Worker进程。

## 思考1：Nginx如何做到热部署？

**所谓热部署，就是配置文件nginx.conf修改后，不需要stop Nginx，不需要中断请求，就能让配置文件生效！**

（nginx -s reload 重新加载/nginx -t检查配置/nginx -s stop）

通过上文我们已经知道worker进程负责处理具体的请求，那么如果想达到热部署的效果，可以想象：

方案一：修改配置文件nginx.conf后，主进程master负责推送给worker进程更新配置信息，worker进程收到信息后，更新进程内部的线程信息。

方案二：修改配置文件nginx.conf后，重新生成新的worker进程，当然会以新的配置进行处理，而且新的请求都必须交给新的worker进程，至于老worker进程，等把那些以前的请求处理完毕，kill掉即可。

**Nginx采用的就是方案二来达到热部署的！**

## 思考2：Nginx如何做到高并发下的高效处理？

       上文已经提及Nginx的worker进程个数与CPU绑定、worker进程内部包含一个线程高效回环处理请求，这的确有助于效率，但这是不够的。

         作为专业的程序员，我们可以开一下脑洞：BIO/NIO/AIO、异步/同步、阻塞/非阻塞...

          要同时处理那么多的请求，要知道，有的请求需要发生IO，可能需要很长时间，如果等着它，就会拖慢worker的处理速度。

**Nginx采用了Linux的epoll模型**

，epoll模型基于事件驱动机制，它可以监控多个事件是否准备完毕，如果OK，那么放入epoll队列中，这个过程是异步的。worker只需要从epoll队列循环处理即可。

## **思考3：Nginx挂了怎么办？**

Nginx既然作为入口网关，很重要，如果出现单点问题，显然是不可接受的。答案是：Keepalived+Nginx实现高可用。

Keepalived是一个高可用解决方案，主要是用来防止服务器单点发生故障，可以通过和Nginx配合来实现Web服务的高可用。（其实，Keepalived不仅仅可以和Nginx配合，还可以和很多其他服务配合）

Keepalived+Nginx实现高可用的思路：

第一：请求不要直接打到Nginx上，应该先通过Keepalived（这就是所谓虚拟IP，VIP）

第二：Keepalived应该能监控Nginx的生命状态（提供一个用户自定义的脚本，定期检查Nginx进程状态，进行权重变化,，从而实现Nginx故障切换）

![  ](./assets/image/c9e259e81c2cc99f948ef30d3ece4e6e_BNgEE_PTkI.png "  ")

**详见高可用**

# 跨域

跨域是前端工程师都会面临的场景，跨域的解决方案有很多。不过要知道在生产中，要么使用 CORS 、要么使用 Nginx 反向代理来解决跨域。在 Nginx 的配置文件中进行如下配置即可：

server {

    listen   80;

    server\_name   localhost; 

\# 用户访问 localhost，反向代理到 <http://webcanteen.com>

    location / {

        proxy\_pass <http://webcanteen.com>

    }

}

# Gzip

Gzip 是互联网上非常普遍的一种数据压缩格式，对于纯文本来说可以压缩到原大小的 40%，可以节省大量的带宽。不过需要注意的是，启用 Gzip 所需的 HTTP 最低版本是 1.1。

location \~ . \*. (jpg|png|gif)\$ {

    gzip off; 

\#关闭压缩

    root /data/www/images;

}

location \~ . \*. (html|js|css)\$ {

    gzip on; 

\#启用压缩

    gzip\_min\_length 1k; 

\# 超过1K的文件才压缩

    gzip\_http\_version 1.1; 

\# 启用gzip压缩所需的HTTP最低版本

    gzip\_comp\_level 9; 

\# 压缩级别，压缩比率越高，文件被压缩的体积越小

    gzip\_types text/css application/javascript; 

\# 进行压缩的文件类型

    root /data/www/html;

}

# 请求限制

对

**于大流量恶意的访问，会造成带宽的浪费，给服务器增加压力。往往对于同一 IP 的连接数以及并发数进行限制**

。

关于请求限制主要有两种类型：

- limit\_conn\_module 连接频率限制
- limit\_req\_module 请求频率限制

\# \$binary\_remote\_addr 远程IP地址 zone 区域名称 10m内存区域大小

limit\_conn\_zone 

\$binary\_remote\_addr

 zone=coon\_zone:10m;

server {

\# conn\_zone 设置对应的共享内存区域 1是限制的数量

 limit\_conn conn\_zone 1;

}

\# \$binary\_remote\_addr 远程IP地址 zone 区域名称 10m内存区域大小 rate 为请求频率 1s 一次

limit\_req\_zone 

\$binary\_remote\_addr

 zone=req\_zone:10m rate=1r/s;

server {

    location / {

\# 设置对应的共享内存区域 burst最大请求数阈值 nodelay不希望超过的请求被延迟

        limit\_req zone=req\_zone burst=5 nodelay;

    }

}

# 访问控制

关于访问控制主要有两种类型：

- -http\_access\_module 基于 IP 的访问控制
- -http\_auth\_basic\_module 基于用户的信任登陆

(基于用户的信任登陆不是很安全，本文不做配置介绍)以下是基于 IP 的访问控制：

server {

 location \~ ^/index.html {

\# 匹配 index.html 页面 除了 127.0.0.1 以外都可以访问

  deny 127.0.0.1;

  allow all;

 }

}

# ab命令

ab命令全称为：Apache bench，是 Apache 自带的压力测试工具，也可以测试 Nginx、IIS 等其他 Web 服务器。

- -n 总共的请求数
- -c 并发的请求数

ab -n 1000 -c 5000 <http://127.0.0.1/>

# 防盗链

防盗链的原理就是根据请求头中 referer 得到网页来源，从而实现访问控制。这样可以防止网站资源被非法盗用，从而保证信息安全，减少带宽损耗，减轻服务器压力。

location \~ . \*.(jpg|png|gif)\$ { 

\# 匹配防盗链资源的文件类型

\# 通过 valid\_referers 定义合法的地址白名单 \$invalid\_referer 不合法的返回403  

    valid\_referers none blocked 127.0.0.1;

if

 (

\$invalid\_referer

) {

return

 403;

    }

}

# **Nginx 缓存**

实现效果：在 3 天内，通过浏览器地址栏访问 <http://192.168.4.32/a.jpg，不会从服务器抓取资源，3> 天后(过期)则从服务器重新下载。

\# http 区域下添加缓存区配置

proxy\_cache\_path /tmp/nginx\_proxy\_cache levels=1 keys\_zone=cache\_one:512m inactive=60s max\_size=1000m;

\# server 区域下添加缓存配置

location \~ .(gif|jpg|png|htm|html|css|js)(. \*) {

proxy\_pass [http://192.168.4.32:5000；#如果没有缓存则转向请求](:5000；)

proxy\_redirect off;

proxy\_cache cache\_one;

proxy\_cache\_valid 200 1h; #对不同的 HTTP 状态码设置不同的缓存时间

proxy\_cache\_valid 500 1d;

proxy\_cache\_valid any 1m;

expires 3d;

}

      Expires 是给一个资源设定一个过期时间，通过 Expires 参数设置，可以使浏览器缓存过期时间之前的内容，减少与服务器之间的请求和流量。

         也就是说无需去服务端验证，直接通过浏览器自身确认是否过期即可，所以不会产生额外的流量。此种方法非常适合不经常变动的资源。
