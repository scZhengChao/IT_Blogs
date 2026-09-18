# Nginx配置SLL证书

随着越来越多的网站接入`HTTPS`，因此`Nginx`中仅配置`HTTP`还不够，往往还需要监听`443`端口的请求，`HTTPS`为了确保通信安全，所以服务端需配置对应的数字证书，当项目使用`Nginx`作为网关时，那么证书在`Nginx`中也需要配置，接下来简单聊一下关于`SSL`证书配置过程：

①先去CA机构或从云控制台中申请对应的`SSL`证书，审核通过后下载`Nginx`版本的证书。

②下载数字证书后，完整的文件总共有三个：`.crt、.key、.pem`：

- `.crt`：数字证书文件，`.crt`是`.pem`的拓展文件，因此有些人下载后可能没有。
- `.key`：服务器的私钥文件，及非对称加密的私钥，用于解密公钥传输的数据。
- `.pem`：`Base64-encoded`编码格式的源证书文本文件，可自行根需求修改拓展名。

③在`Nginx`目录下新建`certificate`目录，并将下载好的证书/私钥等文件上传至该目录。

④最后修改一下`nginx.conf`文件即可，如下：

```nginx 
# ----------HTTPS配置-----------  
server {  
    # 监听HTTPS默认的443端口  
    listen 443;  
    # 配置自己项目的域名  
    server_name www.xxx.com;  
    # 打开SSL加密传输  
    ssl on;  
    # 输入域名后，首页文件所在的目录  
    root html;  
    # 配置首页的文件名  
    index index.html index.htm index.jsp index.ftl;  
    # 配置自己下载的数字证书  
    ssl_certificate  certificate/xxx.pem;  
    # 配置自己下载的服务器私钥  
    ssl_certificate_key certificate/xxx.key;  
    # 停止通信时，加密会话的有效期，在该时间段内不需要重新交换密钥  
    ssl_session_timeout 5m;  
    # TLS握手时，服务器采用的密码套件  
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;  
    # 服务器支持的TLS版本  
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;  
    # 开启由服务器决定采用的密码套件  
    ssl_prefer_server_ciphers on;  
  
    location / {  
        ....  
    }  
}  

# ---------HTTP请求转HTTPS-------------  
server {  
    # 监听HTTP默认的80端口  
    listen 80;  
    # 如果80端口出现访问该域名的请求  
    server_name www.xxx.com;  
    # 将请求改写为HTTPS（这里写你配置了HTTPS的域名）  
    rewrite ^(.*)$ https://www.xxx.com;  
}  

  

```


OK\~，根据如上配置了`Nginx`后，你的网站即可通过`https://`的方式访问，并且当客户端使用`http://`的方式访问时，会自动将其改写为`HTTPS`请求。
