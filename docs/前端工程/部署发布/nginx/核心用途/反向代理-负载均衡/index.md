# 反向代理-负载均衡

## 目录

- [Nginx请求分发原理](#Nginx请求分发原理)

```nginx 
upstream nginx_boot{  
   # 30s内检查心跳发送两次包，未回复就代表该机器宕机，请求分发权重比为1:2  
   server 192.168.0.000:8080 weight=100 max_fails=2 fail_timeout=30s;   
   server 192.168.0.000:8090 weight=200 max_fails=2 fail_timeout=30s;  
   # 这里的IP请配置成你WEB服务所在的机器IP  
}  
  
server {  
    location / {  
        root   html;  
        # 配置一下index的地址，最后加上index.ftl。  
        index  index.html index.htm index.jsp index.ftl;  
        proxy_set_header Host $host;  
        proxy_set_header X-Real-IP $remote_addr;  
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
        # 请求交给名为nginx_boot的upstream上  
        proxy_pass http://nginx_boot;  
    }  
}  

```


最终来看看效果：

![](https://mmbiz.qpic.cn/mmbiz_gif/6mychickmupWISYmibEgTX2swLX1yFa5Iyl5KTic8niaricRU97kUicZRiaVB0HiaayHJM88icO9tXCuKSDfOhSAUYGibhEg/640?wx_fmt=gif\&wxfrom=5\&wx_lazy=1\&random=0.9301894676259901\&tp=webp)

负载均衡效果-动图演示

因为配置了请求分发的权重，`8080、8090`的权重比为`2:1`，因此请求会根据权重比均摊到每台机器，也就是`8080`一次、`8090`两次、`8080`一次......

#### Nginx请求分发原理

客户端发出的请求`192.168.12.129`最终会转变为：`http://192.168.12.129:80/`，然后再向目标`IP`发起请求，流程如下：

![](./assets/image/image_Sn4jBl1LMY.png)

- 由于`Nginx`监听了`192.168.12.129`的`80`端口，所以最终该请求会找到`Nginx`进程；
- `Nginx`首先会根据配置的`location`规则进行匹配，根据客户端的请求路径`/`，会定位到`location /{}`规则；
- 然后根据该`location`中配置的`proxy_pass`会再找到名为`nginx_boot`的`upstream`；
- 最后根据`upstream`中的配置信息，将请求转发到运行`WEB`服务的机器处理，由于配置了多个`WEB`服务，且配置了权重值，因此`Nginx`会依次根据权重比分发请求。
