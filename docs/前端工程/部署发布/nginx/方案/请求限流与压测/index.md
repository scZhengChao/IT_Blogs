# Nginx防止大流量攻击，限制流量访问（limit\_req\_zone模块）以及进行网站压力测试

## 目录

- [一、限流的几种算法](#一限流的几种算法)
  - [  (一）、计数器算法](#--一计数器算法)
  - [（二）、漏桶算法](#二漏桶算法)
  - [（三）、令牌桶算法](#三令牌桶算法)
- [二、 limit\_req\_zone 参数配置](#二-limit_req_zone-参数配置)
- [三、limit\_conn\_module 参数配置](#三limit_conn_module-参数配置)

## 一、限流的几种算法

### &#x20; (一）、计数器算法

采用计数器实现限流有点简单粗暴，一般我们会限制一秒钟之内能够通过的请求数，比如限流 qps（每秒查询率）为100，算法的实现思路就是从第一个请求进来开始计时，在接下去的1s内，每来一个请求，就把计数加1，如果累加的数字达到了100，那么后续的请求就会被全部拒绝。等到1s结束后，把计数恢复成0，重新开始计数。
这种实现方式，有一个明显的弊端：如果在单位时间1s内的前10ms，已经通过了100个请求，那后面的990ms，只能眼巴巴的把请求拒绝，我们把这种现象称为“突刺现象”。

### （二）、漏桶算法

为了消除"突刺现象"，可以采用漏桶算法实现限流，漏桶算法这个名字就很形象，算法内部有一个容器，类似生活用到的漏斗，当请求进来时，相当于水倒入漏斗，然后从下端小口慢慢匀速的流出。不管上面流量多大，下面流出的速度始终保持不变。
不管服务调用方多么不稳定，通过漏桶算法进行限流，每10毫秒处理一次请求。因为处理的速度是固定的，请求进来的速度是未知的，可能突然进来很多请求，没来得及处理的请求就先放在桶里，既然是个桶，肯定是有容量上限，如果桶满了，那么新进来的请求就丢弃。

简单理解为：

- 水（请求）从上方倒入水桶，从水桶下方流出（被处理）；
- 来不及流出的水存在水桶中（缓冲），以固定速率流出；
- 水桶满后水溢出（丢弃）。
- 这个算法的核心是：缓存请求、匀速处理、多余的请求直接丢弃。
- 相比漏桶算法，令牌桶算法不同之处在于它不但有一只“桶”，还有个队列，这个桶是用来存放令牌的，队列才是用来存放请求的。

### （三）、令牌桶算法

从某种意义上讲，令牌桶算法是对漏桶算法的一种改进，漏桶算法能够限制请求调用的速率，而令牌桶算法能够在限制调用的平均速率的同时还允许一定程度的突发调用。

在令牌桶算法中，存在一个桶，用来存放固定数量的令牌。算法中存在一种机制，以一定的速率往桶中放令牌。每次请求调用需要先获取令牌，只有拿到令牌，才有机会继续执行，否则就只能选择等待可用的令牌、或者直接拒绝。
放令牌这个动作是持续不断的进行，如果桶中令牌数达到上限，就丢弃令牌，所以就存在这种情况，桶中一直有大量的可用令牌，这时进来的请求就可以直接拿到令牌执行，比如设置 qps（每秒查询率）为100，那么限流器初始化完成一秒后，桶中就已经有100个令牌了，这时服务还没完全启动好，等启动完成对外提供服务时，该限流器可以抵挡瞬时的100个请求。所以，只有桶中没有令牌时，请求才会进行等待，最后相当于以一定的速率执行。

**简单理解为：**

- 令牌以固定速率产生，并缓存到令牌桶中；
- 令牌桶放满时，多余的令牌被丢弃；
- 请求要消耗等比例的令牌才能被处理；
- 令牌不够时，请求被缓存或者被拒绝

## 二、 limit\_req\_zone 参数配置

```nginx 
http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    #限流模块配置
     limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s;

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;

 第一个参数：$binary_remote_addr 表示通过remote_addr这个标识来做限制，“binary_”的目的是缩写内存占用量，
          是限制同一客户端ip地址。
第二个参数：zone=one:10m 表示生成一个大小为10M，名字为one的内存区域，用来存储访问的频次信息。
第三个参数：rate=1r/s 表示允许相同标识的客户端的访问频次，这里限制的是每秒1次，还可以有比如30r/m的。
 
------------------------------------------------------------------------------------------------------

server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            limit_req zone=one burst=3 nodelay;
      limit_req_status 598;
            root   html;
            index  index.html index.htm;
        }

 第一个参数：zone=one 设置使用哪个配置区域来做限制，与上面limit_req_zone 里的 one 对应。
第二个参数：burst=3，重点说明一下这个配置，burst爆发的意思，这个配置的意思是设置一个大小为3的缓冲区当有大量请
          求（爆发）过来时，超过了访问频次限制的请求可以先放到这个缓冲区内。
第三个参数：nodelay，如果设置，超过访问频次而且缓冲区也满了的时候就会直接返回503，如果没有设置，则所有请求会等待排队。
第四个参数：limit_req_status为自定义返回值，当流量被拒绝后返回598
```


## 三、limit\_conn\_module 参数配置

这个模块用来限制单个IP的请求数。并非所有的连接都被计数。只有在服务器处理了请求并且已经读取了整个请求头时，连接才被计数。

```nginx 
limit_conn_zone $binary_remote_addr zone=addr:10m;

server {
    location /download/ {
        limit_conn addr 1;
    }

```


一次只允许每个IP地址一个连接。

```nginx 
limit_conn_zone $binary_remote_addr zone=perip:10m;
limit_conn_zone $server_name zone=perserver:10m;

server {
    ...
    limit_conn perip 10;
    limit_conn perserver 100;
}

```


可以配置多个limit\_conn指令。例如，以上配置将限制每个客户端IP连接到服务器的数量，同时限制连接到虚拟服务器的总数。

```nginx 
limit_conn_zone $binary_remote_addr zone=addr:10m;

```


这里，客户端IP地址作为关键。请注意，不是\$ remote\_addr，而是使用\$ binary\_remote\_addr变量。

&#x20;\$ remote\_addr变量的大小可以从7到15个字节不等。存储的状态在32位平台上占用32或64字节的内存，在64位平台上总是占用64字节。对于IPv4地址，\$ binary\_remote\_addr变量的大小始终为4个字节，对于IPv6地址则为16个字节。存储状态在32位平台上始终占用32或64个字节，在64位平台上占用64个字节。一个兆字节的区域可以保持大约32000个32字节的状态或大约16000个64字节的状态。如果区域存储耗尽，服务器会将错误返回给所有其他请求。

```nginx 
Syntax: limit_conn_log_level info | notice | warn | error;
Default:    
limit_conn_log_level error;     #当服务器限制连接数时，设置所需的日志记录级别。
Context:    http, server, location

```


```nginx 
Syntax: limit_conn_status code;
Default:    
limit_conn_status 503;      #设置拒绝请求的返回值。
Context:    http, server, location

```
