# Nginx跨域配置

## 目录

- [跨域问题产生的原因](#跨域问题产生的原因)
- [Nginx解决跨域问题](#Nginx解决跨域问题)

跨域问题在之前的单体架构开发中，其实是比较少见的问题，除非是需要接入第三方`SDK`时，才需要处理此问题。但随着现在前后端分离、分布式架构的流行，跨域问题也成为了每个开发必须要懂得解决的一个问题。

#### 跨域问题产生的原因

产生跨域问题的主要原因就在于 **「同源策略」** ，为了保证用户信息安全，防止恶意网站窃取数据，同源策略是必须的，否则`cookie`可以共享。由于`http`无状态协议通常会借助`cookie`来实现有状态的信息记录，例如用户的身份/密码等，因此一旦`cookie`被共享，那么会导致用户的身份信息被盗取。

同源策略主要是指三点相同，**「「协议+域名+端口」」** **相同的两个请求，则可以被看做是同源的，但如果其中任意一点存在不同，则代表是两个不同源的请求，同源策略会限制了不同源之间的资源交互。**

#### Nginx解决跨域问题

弄明白了跨域问题的产生原因，接下来看看`Nginx`中又该如何解决跨域呢？其实比较简单，在`nginx.conf`中稍微添加一点配置即可：

```nginx 
location / {  
    # 允许跨域的请求，可以自定义变量$http_origin，*表示所有  
    add_header 'Access-Control-Allow-Origin' *;  
    # 允许携带cookie请求  
    add_header 'Access-Control-Allow-Credentials' 'true';  
    # 允许跨域请求的方法：GET,POST,OPTIONS,PUT  
    add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT';  
    # 允许请求时携带的头部信息，*表示所有  
    add_header 'Access-Control-Allow-Headers' *;  
    # 允许发送按段获取资源的请求  
    add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';  
    # 一定要有！！！否则Post请求无法进行跨域！  
    # 在发送Post跨域请求前，会以Options方式发送预检请求，服务器接受时才会正式请求  
    if ($request_method = 'OPTIONS') {  
        add_header 'Access-Control-Max-Age' 1728000;  
        add_header 'Content-Type' 'text/plain; charset=utf-8';  
        add_header 'Content-Length' 0;  
        # 对于Options方式的请求返回204，表示接受跨域请求  
        return 204;  
    }  
}  
```


❝

但如果后端是采用分布式架构开发的，有时候RPC调用也需要解决跨域问题，不然也同样会出现无法跨域请求的异常，因此可以在你的后端项目中，通过继承`HandlerInterceptorAdapter`类、实现`WebMvcConfigurer`接口、添加`@CrossOrgin`注解的方式实现接口之间的跨域配置。

❞
