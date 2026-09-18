# 案例

[ nginx 进行正则匹配（常见正则匹配符号表示）
&#x20;                                                                          -腾讯云开发者社区-腾讯云 今天遇到网站之前的url被百度搜索引擎抓取，需要在服务中进行301强制跳转，（如访问：www.baidu.com/kenni-1,www.baidu.com/kenni-1/，两个统一跳转到www.b https://cloud.tencent.com/developer/article/1500808](https://cloud.tencent.com/developer/article/1500808 " nginx 进行正则匹配（常见正则匹配符号表示）
&#x20;                                                                          -腾讯云开发者社区-腾讯云 今天遇到网站之前的url被百度搜索引擎抓取，需要在服务中进行301强制跳转，（如访问：www.baidu.com/kenni-1,www.baidu.com/kenni-1/，两个统一跳转到www.b https://cloud.tencent.com/developer/article/1500808")

今天遇到网站之前的url被百度搜索引擎抓取，需要在服务中进行301强制跳转，（如访问：[www.baidu.com/kenni-1,www.baidu.com/kenni-1/，两个统一跳转到www.baidu.com/kenni-1.html，以及www.baidu.com/kenni-1?page=11,跳转到www.baidu.com/kenni-1.html?page=11，kenni-后面接数字）](http://www.baidu.com/kenni-1,www.baidu.com/kenni-1/，两个统一跳转到www.baidu.com/kenni-1.html，以及www.baidu.com/kenni-1?page=11,跳转到www.baidu.com/kenni-1.html?page=11，kenni-后面接数字） "www.baidu.com/kenni-1,www.baidu.com/kenni-1/，两个统一跳转到www.baidu.com/kenni-1.html，以及www.baidu.com/kenni-1?page=11,跳转到www.baidu.com/kenni-1.html?page=11，kenni-后面接数字）")

因为[服务器](https://cloud.tencent.com/act/pro/promotion-cvm?from_column=20065\&from=20065 "服务器")使用的是nginx，所以在nginx增加如下配置：

访问 [域名](https://cloud.tencent.com/act/pro/domain-sales?from_column=20065\&from=20065 "域名")/kenni-10 跳转到域名 域名/kenni-10.html rewrite ^/kenni-(\[0-9]+)\$ /kenni-\$1.html permanent;

访问 域名/kenni-10/ 跳转到域名 域名/kenni-10.html rewrite ^/kenni-(\[0-9]+)/\$ /kenni-\$1.html permanent;

其他学习参考资料：

`1、^： 匹配字符串的开始位置；`

`2、 $：匹配字符串的结束位置；`

`3、.*: .匹配任意字符，*匹配数量0到正无穷；`

`4、. 斜杠用来转义，.匹配 . 特殊使用方法，记住记性了；`

`5、（值1|值2|值3|值4）：或匹配模式，例：（jpg|gif|png|bmp）匹配jpg或gif或png或bmp`

`6、i不区分大小写`

一．正则表达式匹配，

其中：&#x20;

- \~ 为区分大小写匹配&#x20;
- &#x20;\~\* 为不区分大小写匹配&#x20;
- !\~和!\~\*分别为区分大小写不匹配及不区分大小写不匹配&#x20;

二．文件及目录匹配，

其中：&#x20;

- -f和!-f用来判断是否存在文件&#x20;
- -d和!-d用来判断是否存在目录&#x20;
- -e和!-e用来判断是否存在文件或目录&#x20;
- -x和!-x用来判断文件是否可执行&#x20;

三．rewrite指令的最后一项参数为flag标记，flag标记有：&#x20;

1. last 相当于apache里面的\[L]标记，表示rewrite。&#x20;
2. break本条规则匹配完成后，终止匹配，不再匹配后面的规则。&#x20;
3. redirect 返回302临时重定向，浏览器地址会显示跳转后的URL地址。&#x20;
4. permanent 返回301永久重定向，浏览器地址会显示跳转后的URL地址。

使用last和break实现URI重写，浏览器地址栏不变。而且两者有细微差别，

- 使用alias指令必须用last标记;
- 使用proxy\_pass指令时，需要使用break标记。
- Last标记在本条rewrite规则执行完毕后，**会对其所在server{......}标签重新发起请求，**
- 而break标记则在本条规则匹配完成后，终止匹配。

&#x20;例如：如果我们将类似URL/photo/123456 重定向到/path/to/photo/12/1234/123456.png&#x20;

```nginx 
rewrite "/photo/([0-9]{2})([0-9]{2})([0-9]{2})"/path/to/photo/$1/$1$2/$1$2$3.png ;
```


四．NginxRewrite 规则相关指令

1. break指令&#x20;
   1. 使用环境：server,location,if;&#x20;
   2. 该指令的作用是完成当前的规则集，不再处理rewrite指令。
2. if指令
   1. &#x20;使用环境：server,location&#x20;
   2. 该指令用于检查一个条件是否符合，如果条件符合，则执行大括号内的语句。
   3. If指令不支持嵌套，不支持多个条件&&和||处理。
3. return指令&#x20;
   1. 语法：return code ;&#x20;
   2. 使用环境：server,location,if;&#x20;
   3. 该指令用于结束规则的执行并返回状态码给客户端。&#x20;
   4. 示例：如果访问的URL以".sh"或".bash"结尾，则返回403状态码&#x20;
   ```nginx 
   location ~ .*\.(sh|bash)?$ { return 403; }
   ```

4. rewrite 指令&#x20;
   1. 语法：rewrite regex replacement flag&#x20;
   2. 使用环境：server,location,if&#x20;
   3. 该指令根据表达式来重定向URI，或者修改字符串。
   4. 指令根据配置文件中的顺序来执行。
   5. 注意重写表达式只对相对路径有效。如果你想配对主机名，你应该使用if语句，示例如下：

```javascript 
 if( $host ~* www.(.*) ) { 
   set $host_without_www 1; 
   rewrite ^(.*) http://$host_without_www$1permanent; 
 }
```


1. Set指令&#x20;
   1. 语法：set variable value ; 默认值:none;&#x20;
   2. 使用环境：server,location,if;&#x20;
   3. 该指令用于定义一个变量，并给变量赋值。变量的值可以为文本、变量以及文本变量的联合。 示例：

```nginx 
set $varname "hello world";
```


五．Nginx的Rewrite规则编写实例

1. 当访问的文件和目录不存在时，重定向到某个php文件&#x20;

```nginx 
if( !-e $request_filename ) { 
  rewrite ^/(.*) index.php last; 
}
```


1. 目录对换&#x20;

```nginx 
/123456/xxxx ====> /xxxx?id=123456 

rewrite ^/(\d+)/(.+)/ /$2?id=$1 last;
```


1. 如果客户端使用的是IE浏览器，则重定向到/ie目录下&#x20;

```nginx 
if( $http_user_agent ~ MSIE) { 
  rewrite ^(.*) /ie/$1 break; 
}
```


1. 禁止访问多个目录&#x20;

```nginx 
location ~ ^/(cron|templates)/ { 
  deny all; break; 
}
```


1. 禁止访问以/data开头的文件

```nginx 
 location ~ ^/data { 
   deny all; 
 }
```


1. [禁止访问以.sh](http://6.xn--onq670e3vj0xrpul.sh "禁止访问以.sh"),.flv,.mp3为文件后缀名的文件&#x20;

```nginx 
location ~ .*\.(sh|flv|mp3)$ { 
  return 403; 
}
```


1. 设置某些类型文件的浏览器缓存时间

```nginx 
 location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ { 
   expires 30d; 
 } 
 location ~ .*\.(js|css)$ { 
   expires 1h; 
 }
```


1. 给favicon.ico和robots.txt设置过期时间; 这里为favicon.ico为99天,robots.txt为7天并不记录404错误日志&#x20;

```nginx 
location ~(favicon.ico) { 
  log_not_found off; 
  expires 99d; break; 
} 
location ~(robots.txt) { 
  log_not_found off; 
  expires 7d; break; 
}
```


1. 设定某个文件的过期时间;这里为600秒，并不记录访问日志

```nginx 
 location ^~ /html/scripts/loadhead_1.js { 
   access_log off; 
   root /opt/lampp/htdocs/web; 
   expires 600; 
   break; 
 }
```


1. 文件反盗链并设置过期时间 这里的return 412 为自定义的http状态码，默认为403，方便找出正确的盗链的请求 “rewrite ^/ [http://img.linuxidc.net/leech.gif;”显示一张防盗链图片](http://img.linuxidc.net/leech.gif;”显示一张防盗链图片 "http://img.linuxidc.net/leech.gif;”显示一张防盗链图片") “access\_log off;”不记录访问日志，减轻压力 “expires 3d”所有文件3天的浏览器缓存

```nginx 
location ~*^.+\.(jpg|jpeg|gif|png|swf|rar|zip|css|js)$ { 
  valid_referers none blocked .linuxidc.com.linuxidc.net localhost 208.97.167.194; 
  if ($invalid_referer) { 
    rewrite ^/ http://img.linuxidc.net/leech.gif; 
    return 412; 
    break;
  } 
  access_log off;
  root /opt/lampp/htdocs/web; 
  expires 3d; 
  break; 
}
```


1. 只允许固定ip访问网站，并加上密码

```bash 
root /opt/htdocs/www; 
allow 208.97.167.194; 
allow 222.33.1.2; 
allow 231.152.49.4; 
deny all; 
auth_basic “C1G_ADMIN”; 
auth_basic_user_file htpasswd;
```


1. 将多级目录下的文件转成一个文件，增强seo效果&#x20;

/job-123-456-789.html 指向/job/123/456/789.html

```nginx 
rewrite ^/job-([0-9]+)-([0-9]+)-([0-9]+)\.html$ /job/$1/$2/jobshow_$3.html last;
```


13.文件和目录不存在的时候重定向：

```nginx 
if (!-e $request_filename) { 
  proxy_pass http://127.0.0.1; 
}
```


1. 将根目录下某个文件夹指向2级目录
   1. &#x20;如/shanghaijob/ 指向 /area/shanghai/&#x20;
   2. 如果你将last改成permanent，那么浏览器地址栏显是/location/shanghai/&#x20;
   ```nginx 
   rewrite ^/([0-9a-z]+)job/(.*)$  /area/$1/$
   ```


&#x20;   上面例子有个问题是访问/shanghai时将不会匹配

```nginx 
 rewrite ^/([0-9a-z]+)job$ /area/$1/ last;
 rewrite ^/([0-9a-z]+)job/(.*)$ /area/$1/$2 last;

```


这样/shanghai 也可以访问了，但页面中的相对链接无法使用，

```markdown 
 如./list_1.html真实地址是/area/shanghia/list_1.html会变成/list_1.html,导至无法访问。
 那我加上自动跳转也是不行咯
 (-d $request_filename)它有个条件是 必需为真实目录 ，而我的rewrite不是的，所以没有效果
```


```bash 
if (-d $request_filename){
   rewrite ^/(.*)([^/])$ http://$host/$1$2/ permanent;
}

```


知道原因后就好办了，让我手动跳转吧

```nginx 
rewrite ^/([0-9a-z]+)job$ /$1job/ permanent;
rewrite ^/([0-9a-z]+)job/(.*)$ /area/$1/$2 last;


```


1. 域名跳转&#x20;

```nginx 
server { 
  listen 80; 
  server_name jump.linuxidc.com; 
  index index.html index.htm index.php; 
  root /opt/lampp/htdocs/www; 
  rewrite ^/ http://www.linuxidc.com/; 
  access_log off; 
}
```


1. 多域名转向&#x20;

```markdown 
 server_name  www.linuxidc.comwww.linuxidc.net;
 index index.html index.htm index.php;
 root  /opt/lampp/htdocs;
 if ($host ~ "linuxidc\.net") {
   rewrite ^(.*) http://www.linuxidc.com$1 permanent;
 }
```
