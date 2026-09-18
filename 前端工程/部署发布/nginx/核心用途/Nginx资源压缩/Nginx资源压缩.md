# Nginx资源压缩

建立在动静分离的基础之上，如果一个静态资源的`Size`越小，那么自然传输速度会更快，同时也会更节省带宽，因此我们在部署项目时，也可以通过`Nginx`对于静态资源实现压缩传输，一方面可以节省带宽资源，第二方面也可以加快响应速度并提升系统整体吞吐。

在`Nginx`也提供了三个支持资源压缩的模块`ngx_http_gzip_module、ngx_http_gzip_static_module、ngx_http_gunzip_module`，其中`ngx_http_gzip_module`**属于内置模块，代表着可以直接使用该模块下的一些压缩指令**，后续的资源压缩操作都基于该模块，先来看看压缩配置的一些参数/指令：

![](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbucU3YYnB5Fvfaw8O67WQqDzyCLM3FTm8y89vAz6EI7chmlDL7eMejYTbKeq8Ny7J8t3hLyFZn9kLA/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1\&random=0.8791584355679971\&tp=webp)

了解了`Nginx`中的基本压缩配置后，接下来可以在`Nginx`中简单配置一下：

```nginx 
http{
    # 开启压缩机制
    gzip on;
    # 指定会被压缩的文件类型(也可自己配置其他类型)
    gzip_types text/plain application/javascript text/css application/xml text/javascript image/jpeg image/gif image/png;
    # 设置压缩级别，越高资源消耗越大，但压缩效果越好
    gzip_comp_level 5;
    # 在头部中添加Vary: Accept-Encoding（建议开启）
    gzip_vary on;
    # 处理压缩请求的缓冲区数量和大小
    gzip_buffers 16 8k;
    # 对于不支持压缩功能的客户端请求不开启压缩机制
    gzip_disable "MSIE [1-6]\."; # 低版本的IE浏览器不支持压缩
    # 设置压缩响应所支持的HTTP最低版本
    gzip_http_version 1.1;
    # 设置触发压缩的最小阈值
    gzip_min_length 2k;
    # 关闭对后端服务器的响应结果进行压缩
    gzip_proxied off;
}

```


在上述的压缩配置中，最后一个`gzip_proxied`选项，可以根据系统的实际情况决定，总共存在多种选项：

- `off`：关闭`Nginx`对后台服务器的响应结果进行压缩。
- `expired`：如果响应头中包含`Expires`信息，则开启压缩。
- `no-cache`：如果响应头中包含`Cache-Control:no-cache`信息，则开启压缩。
- `no-store`：如果响应头中包含`Cache-Control:no-store`信息，则开启压缩。
- `private`：如果响应头中包含`Cache-Control:private`信息，则开启压缩。
- `no_last_modified`：如果响应头中不包含`Last-Modified`信息，则开启压缩。
- `no_etag`：如果响应头中不包含`ETag`信息，则开启压缩。
- `auth`：如果响应头中包含`Authorization`信息，则开启压缩。
- `any`：无条件对后端的响应结果开启压缩机制。

OK\~，简单修改好了`Nginx`的压缩配置后，可以在原本的`index`页面中引入一个`jquery-3.6.0.js`文件：

```nginx 
<script type="text/javascript" src="jquery-3.6.0.js"></script>  

```


分别来对比下压缩前后的区别：

![](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbucU3YYnB5Fvfaw8O67WQqDzMLcrkZPLPOZ01uvKv24aNz6JK57qZBpsa3TX62VSbG8YIRvRQ8gdSg/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1\&random=0.22532256988013089\&tp=webp)

从图中可以很明显看出，未开启压缩机制前访问时，`js`文件的原始大小为`230K`，当配置好压缩后再重启`Nginx`，会发现文件大小从`230KB→69KB`，效果立竿见影！

❝

注意点：①对于图片、视频类型的数据，会默认开启压缩机制，因此一般无需再次开启压缩。②对于`.js`文件而言，需要指定压缩类型为`application/javascript`，而并非`text/javascript、application/x-javascript`。

❞
