# x-sendfile 大文件下载鉴权

```nginx 
大文件下载鉴权：internal; 

 Nginx 利用 X-Accel-Redirect response.setHeader 控制文件下载 
location / {
    proxy_redirect off;
    proxy_set_header Host  $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://backend;            
}

location /file/ {
     internal; 
    alias /usr/local/;
}
 设置成 "internal" 属性是用来禁止浏览器直接访问的,只信任后台返回的 "X-Accel-Redirect"。 
<%
     String filename = request.getParameter("filename"); 
     response.setHeader("Content-Disposition", "attachment;filename="+filename); 
     response.setHeader("Content-Type", "application/octet-stream"); 
     response.setHeader("X-Accel-Redirect", "/file/"+filename); 
%>
请求到nginx后会发给Tomcat，先判断是否可以下载，若可以下载设置X-Accel-Redirect回给nginx，nginx重新定位到物理文件进行下载。
html
 <a href="<%=path%>/redis_test/testResponse?id=1&filename=5.zip">下载</a> 
后台
String filename = getPara("filename");
    String id = getPara("id");
    if(id.equals("1"))
    {
          getResponse().setHeader("Content-Type", "application/octet-stream"); 
          getResponse().setHeader("Content-Disposition", "attachment;filename="+ URLEncoder.encode("中文名.zip", "UTF-8")); 
          getResponse().setHeader("X-Accel-Redirect", "/file/"+filename); 
            
     }
  renderNull();


又名  在nginx中x-sendfile解决方案 
很多时候用户需要从网站下载文件，如果文件是可以通过 一个固定链接公开获取的，那么我们只需将文件存放到 webroot下的目录里就好。
但大多数情况下，我们需要做权限控制，例如下载 PDF 账单，又例如下载网盘里的档案。 这时，我们通常借助于脚本代码来实现，
而这无疑会增加服务器的负担。
后台读流返回给前台：
<?php
  // 用户身份认证，若验证失败跳转
  authenticate();
  // 获取需要下载的文件，若文件不存在跳转
  $file= determine_file();
  // 读取文件内容
  $content=file_get_contents($file);
  // 发送合适的 HTTP 头
  header("Content-type: application/octet-stream");
  header('Content-Disposition: attachment; filename="'. basename($file) .'"');
  header("Content-Length: ".filesize($file));
  echo$content; // 或者 readfile($file);
?>
 一、这样做有什么问题？ 
    这样做意味着我们的程序需要将文件内容从磁盘经过一 个固定的 buffer 去循环读取到内存，再发送给前端 web 服务器，最后才到达用户。
    当需要下载的文件很大的时候，这种方式将消耗大量内存，甚至引发 php 进程超时或崩溃。 Cache 也很头疼，更不用说中断重连的情况了。
一个理想的解决方式应该是，由 php 程序进行权限检查等逻辑判断，一切通过后， 让前台的 web 服务器直接将文件发送给用户——像 
Nginx 这样的前台更善于处理静态文件。 这样一来 php 脚本就不会被 I/O 阻塞了。
二、什么是 X-Sendfile？
     X-Sendfile 是一种将文件下载请求由后端应用转交给前端 web 服务器处理的机制，它可以消除后端程序既要读文件又要处理发送的压力，
    从而显著提高服务器效率，特别是处理大文件下载的情形下。 
     X-Sendfile 通过一个特定的 HTTP header 来实现：在 X-Sendfile 头中指定一个文件的地址来通告前端 web 服务器。
    当 web 服务器检测到后端发送的这个 header 后，它将忽略后端的其他输出，而使用自身的组件（包括 缓存头 和 断点重连 等优化）
    机制将文件发送给用户。 
    不过，在使用 X-Sendfile 之 前，我们必须明白这并不是一个标准特性，在默认情况下它是被大多数 web 服务器禁用的。
    而不同的 web 服务器的实现也不一样，包括规定了不同的 X-Sendfile 头格式。如果配置失当，用户可能下载到 0 字节的文件 
     使用 X-Sendfile 将允许下载非 web 目录中的文件（例如/root/），即使文件在 .htaccess 保护下禁止访问，也会被下载 。

```


| SENDFILE 头           | **使用的 WEB 器**                   |
| -------------------- | ------------------------------- |
| X-Sendfile           | Apache, Lighttpd v1.5, Cherokee |
| X-LIGHTTPD-send-file | Lighttpd v1.4                   |
| X-Accel-Redirect     | Nginx, Cherokee                 |

使用**X-****SendFile 的缺点是你失去了对文件传输机制的控制**。例如如果你希望在完成文件下载后执行某些操作，比如只**允许用户下载文件一次，这个 X-Sendfile 是没法做到的，因为后台的 php 脚本并不知道下载是否成功**。
