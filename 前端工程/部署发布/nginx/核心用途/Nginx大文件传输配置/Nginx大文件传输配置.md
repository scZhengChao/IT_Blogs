# Nginx大文件传输配置

在某些业务场景中需要传输一些大文件，但大文件传输时往往都会会出现一些`Bug`，比如**文件超出限制、文件传输过程中请求超时**等，那么此时就可以在`Nginx`稍微做一些配置，先来了解一些关于大文件传输时可能会用的配置项：

![](https://mmbiz.qpic.cn/mmbiz_png/eQPyBffYbucU3YYnB5Fvfaw8O67WQqDzAUiao0GE11PaBDF9ftibg2lgicPSlGDELa1Xt4KGTn8Hto4iaHZ6SVCGpA/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1\&random=0.18181060480881706\&tp=webp)

在传输大文件时，`client_max_body_size`、`client_header_timeout`、`proxy_read_timeout`、`proxy_send_timeout`这四个参数值都可以根据自己项目的实际情况来配置。

❝

上述配置**仅是作为代理层需要配置的**，因为**最终客户端传输文件还是直接与后端进行交互**，这里只是把作为网关层的`Nginx`配置调高一点，**调到能够“容纳大文件”传输的程度。当然**，`Nginx`中也可以作为文件服务器使用，但需要用到一个专门的第三方模块`nginx-upload-module`，如果项目中文件上传的作用处不多，那么建议可以通过`Nginx`搭建，毕竟可以节省一台文件服务器资源。但如若文件上传/下载较为频繁，**那么还是建议额外搭建文件服务器，并将上传/下载功能交由后端处理。**

❞
