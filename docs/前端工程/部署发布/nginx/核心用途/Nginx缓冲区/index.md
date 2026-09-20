# Nginx缓冲区

先来思考一个问题，接入`Nginx`的项目一般请求流程为：“客户端→`Nginx`→服务端”，在这个过程中存在两个连接：“客户端→`Nginx`、`Nginx`→服务端”，那么两个不同的连接速度不一致，就会影响用户的体验（**比如浏览器的加载速度跟不上服务端的响应速度）。**

其实也就类似电脑的内存跟不上`CPU`速度，所以对于用户造成的体验感极差，因此在`CPU`**设计时都会加入三级高速缓冲区，**用于缓解`CPU`和内存速率不一致的矛盾。在`Nginx`也同样存在缓冲区的机制，主要目的就在于：**「「****用来解决两个连接之间速度不匹配造成的问题」****」** ，有了缓冲后，\*\*`Nginx`代理可暂存后端的响应，然后按需供给数据给客户端。\*\*先来看看一些关于缓冲区的配置项：

- `proxy_buffering`：是否启用缓冲机制，默认为`on`关闭状态。
- `client_body_buffer_size`：设置缓冲客户端请求数据的内存大小。
- `proxy_buffers`：为每个请求/连接设置缓冲区的数量和大小，默认`4 4k/8k`。
- `proxy_buffer_size`：设置用于存储响应头的缓冲区大小。
- `proxy_busy_buffers_size`：在后端数据没有完全接收完成时，`Nginx`可以将`busy`状态的缓冲返回给客户端，该参数用来设置`busy`状态的`buffer`具体有多大，默认为`proxy_buffer_size*2`。
- `proxy_temp_path`：当内存缓冲区存满时，可以将数据临时存放到磁盘，该参数是设置存储缓冲数据的目录。
- `path`是临时目录的路径。
- 语法：`proxy_temp_path path;` path是临时目录的路径
- `proxy_temp_file_write_size`：设置每次写数据到临时文件的大小限制。
- `proxy_max_temp_file_size`：设置临时的缓冲目录中允许存储的最大容量。
- 非缓冲参数项：
- `proxy_connect_timeout`：设置与后端服务器建立连接时的超时时间。
- `proxy_read_timeout`：设置从后端服务器读取响应数据的超时时间。
- `proxy_send_timeout`：设置向后端服务器传输请求数据的超时时间。

具体的`nginx.conf`配置如下：

```nginx 
http{  
    proxy_connect_timeout 10;  
    proxy_read_timeout 120;  
    proxy_send_timeout 10;  
    proxy_buffering on;  
    client_body_buffer_size 512k;  
    proxy_buffers 4 64k;  
    proxy_buffer_size 16k;  
    proxy_busy_buffers_size 128k;  
    proxy_temp_file_write_size 128k;  
    proxy_temp_path /soft/nginx/temp_buffer;  
}  
```


上述的缓冲区参数，是基于每个请求分配的空间，而并不是所有请求的共享空间。当然，具体的参数值还需要根据业务去决定，要综合考虑机器的内存以及每个请求的平均数据大小

❝

最后提一嘴：使用缓冲也可以减少即时传输带来的带宽消耗。

❞
