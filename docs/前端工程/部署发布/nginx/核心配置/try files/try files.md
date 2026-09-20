# try files

```nginx title="location / {
            try_files $uri $uri/ /index.html;
}"
location / {
            try_files $uri $uri/ /index.html;
}
```


当用户请求 http\://localhost/example 时，这里的 \$uri 就是 /example。

try\_files **会到硬盘里尝试找这个文件**。如果存在名为 /\$root/example（其中 \$root 是项目代码安装目录）的文件，就直接把这个文件的内容发送给用户。

显然，目录中没有叫 example 的文件。
然后就看 \$uri/，**增加了一个 /，也就是看有没有名为 /\$root/example/ 的目录**。

又找不到，就会 fall back 到 try\_files 的**最后一个选项 /index.php，发起一个内部 “子请求”**，也就是相当于 nginx 发起一个 HTTP 请求到 http\://localhost/index.php。

```nginx 
loaction / {
    try_files $uri @apache
}
loaction @apache{
    proxy_pass http://127.0.0.1:88
    include aproxy.conf
}

```


`try_files`方法让Ngxin尝试访问后面得`$uri`链接，并进根据@apache配置进行内部重定向。
当然`try_files`也可以以错误代码赋值，如`try_files /index.php = 404 @apache`，则表示当尝试访问得文件返回404时，根据@apache配置项进行重定向。

**try\_file会导致前面配置的 add\_header 直接丢失：**
try\_files匹配后，会直接进入匹配的location中的配置，我们在这里配置的都会被丢弃；也就是说我们要把这一段配置到 /mobile.html 中去：

```nginx 
# root /path/project/dist
location ^~ / {
  access_log off;
  expires 30d;
}

location ^~ /mobile/ {
  add_header Cache-Control no-cache;
  try_files $uri$args /mobile.html;
}
try_file会导致前面配置的 add_header 直接丢失
location = /mobile.html {
  add_header Cache-Control no-cache;
}

location ^~ /mobile/ {
  try_files $uri$args /mobile.html;
}
```
