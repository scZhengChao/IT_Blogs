# echo

## 目录

- [1.nginx 的echo模块的介绍
  ](#1nginx-的echo模块的介绍)
- [2.nginx的echo安装](#2nginx的echo安装)
- [3.nginx的echo使用测试](#3nginx的echo使用测试)
- [配置时注意
  ](#配置时注意)

* nginx echo 输出 检查配置正确性
* 我们有用到变量去控制该域名是否允许访问，在配置过程中，其实变量的值一直是我们想象的，无法确认具体步骤的变量值，因此我希望能在每个步骤中将变量的值打印出来，这是nginx 的echo模块粉墨登场。

1.nginx 的echo模块的介绍

&#x20;    echo模块式国人编写的`nginx`的第三方模块，下载官方`nginx`后**需要再下载echo模块**，并且配合`nginx`编译安装，安装此模块后可以在nginx的`url`访问中可以通过`echo`命令**输出字符到用户的浏览器中**，**可用于检测nginx的可访问性**，检测`nginx`的配置的正确性（这是当前我需要用的nginx的主要功能），**可用于打印你希望了解的http代理相关http参数**，总之在\*\*调试配置nginx环节，echo命令非常有用。
\*\***详情见：**

[Nginx 的 Echo 模块 —— echo-nginx-module - OSCHINA - 中文开源技术交流社区 Nginx 有个 echo 模块可以用来输出一些简单的信息，例如：   location /hello {    echo "hello, world!";  }  location /hello {    echo -n "hello, "    echo "world!";  }  location /timed\_hello {... https://www.oschina.net/question/12\_45735](https://www.oschina.net/question/12_45735 "Nginx 的 Echo 模块 —— echo-nginx-module - OSCHINA - 中文开源技术交流社区 Nginx 有个 echo 模块可以用来输出一些简单的信息，例如：   location /hello {    echo \"hello, world!\";  }  location /hello {    echo -n \"hello, \"    echo \"world!\";  }  location /timed_hello {... https://www.oschina.net/question/12_45735")

# 2.nginx的echo安装

&#x20;安装第三方模块的时候不能使用`rpm`以及`yum`方式安装nginx，如果以前用以上方式安装过nginx的话，请先卸载掉。
&#x20;    2.1 我们下载nginx的源码包（`http://nginx.org/download/nginx-1.2.7.tar.gz`）以及echo模块的源码包（`https://github.com/agentzh/echo-nginx-module/tags`）选择最新版本
&#x20;  2.2 分别解压`nginx`源码包以及`echo`模块源码包，例如此处我解压的路径为：`nginx`的路径：`/opt/nginx-source` ;`echo`模块的路径:`/opt/nginx-echo-source`
&#x20;  2.3 命令`cd`进入`nginx`源码路径，此处:cd /`opt/nginx-source` ;
&#x20;   2.4 配置`nginx`编译文件，执行编译配置命令：`./configure --prefix=/opt/nginx --add-module=/opt/nginx-echo-source`
配置时屏幕会输出日志，检查配置过程中是否有error，如果有请自行修复，一般是缺少类库，缺少啥类库，就下载安装什么类库
&#x20;  2.5 编译nginx，在nginx源码目录中执行命令： `make`
&#x20;  2.6 编译安装nginx，在nginx 源码目录中执行命令：`make install`

# 3.nginx的echo使用测试

```nginx title="配置nginx的配置文件"

server {
        listen       8083;
        server_name  _;
        access_log      /var/log/nginx/cn-camm.server.access.log main;

        set $tag "0";

        if ( $host !~ ^appbuilder.vicp.cc$ ){
                 set $tag "$tag,1";
        }

         if ( $host !~ ^localhost$ ){
                set $tag "$tag,2";
        }
        if ( $tag ~ ^0,1,2$ ){
                return 403;
        }

        location / {
          echo "can act?";
          if ($host != '192.168.1.250' ) {
                  echo "not equal 250";
          #       return 403;
          }
          echo "asdfasdf";
#               proxy_pass      http://cncamm;
#                proxy_set_header Host $host:8083;
        }

   }


```


配置时注意

1.`echo`命令**只能放在url请求中**，如果放在url请求外，会报错 如果报\[emerg]: "echo" directive is not allowed here in  ，请检查echo放置的位置
2.一次url请求，echo 只能打印一行，如果有逻辑判断，且判断成功，则echo会执行判断成功里边的echo，否则执行最后一句echo（此处不一定正确，在测试中发现是此现象）
3.如果`echo`后边有配置`return` 或者配置 `proxy_pass`，则echo的**输出会被覆盖，** 即浏览器无法看到`echo`的内容
4.`echo`的内容不是写在`nginx`的配置文件中，**而是输出到浏览器中**，所以echo的打印字符的查看请在浏览器中查看

[
&#x9;nginx echo 输出 检查配置正确性
&#x20;nginx echo 输出 检查配置正确性 http://www.360doc.com/content/13/0322/11/4672379\_273186975.shtml](http://www.360doc.com/content/13/0322/11/4672379_273186975.shtml "
&#x9;nginx echo 输出 检查配置正确性
&#x20;nginx echo 输出 检查配置正确性 http://www.360doc.com/content/13/0322/11/4672379_273186975.shtml")
