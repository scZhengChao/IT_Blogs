# 参考配置文档

## 目录

- [proxy](#proxy)
- [代理路径](#代理路径)
- [ngin x+ sockjs + stomp.js](#ngin-x-sockjs-stompjs)
- [防止缓存](#防止缓存)
- [location](#location)

## proxy

```纯文本 
 proxy 主要选项 也可以放在serve 
 
 proxy_set_header.   设置由后端服务器获取用户的主机名或者真实的ip地址，以及代理者的真实ip地址。 
 client_body_buffer_size.  用户制定客户端请求主体缓冲区大小，可以理解为先保存到本地再传给用户。 
 proxy_connect_timeout.  表示与后台的服务器连接超时时间，即发起握手等候的响应超时时间。 
 proxy_send_timeout.  表示后端服务器的数据回传时间，即再规定时间之内后端服务器必须传完所有数据，否则，nginx将断开这个连接。 
 proxy_read_timeout.   设置nginx从代理的后端服务器获取信息的时间，表示连接建立成功后，nginx等待后端服务器的响应时间，其实是nginx已经进入后端的排队之中等候处理的时间。 
 proxy_buffer_size.   设置缓冲区大小，默认，该缓冲区大小等于指令proxy_buffer_size设置的大小 
 proxy_buffers.   设置缓冲区的数量和大小，nginx从代理的后端服务器获取的响应信息，会放置再缓冲区。 
 proxy_busy_buffer_size.  设置系统繁忙是将可使用proxy_buffers大小，官方推荐为：proxy_buffers的两倍 
 proxy_temp_file_write_size.  指定proxy
```


## 代理路径

**目录路径相关**

一个种方案是proxy\_pass后面加根路径/.
另一种方案是使用rewrite
使用Nginx做代理的时候，可以简单的直接把请求原封不动的转发给下一个服务。

```纯文本 

比如，访问abc.com/appv2/a/b.html, 要求转发到localhost:8088/appv2/a/b.html
简单配置如下：
upstream one {
    server localhost:8088 weight=5;
}
server {
    listen 80;
    server_name abc.com;
    access_log "pipe:rollback /data/log/nginx/access.log interval=1d baknum=7 maxsize=1G" main;
    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
    }
}


即，设置proxy_pass即可。请求只会替换域名。但很多时候，我们需要根据url的前缀转发到不同的服务。
比如
abc.com/user/profile.html转发到 用户服务localhost:8089/profile.html
abc.com/order/details.html转发到 订单服务 localhost:8090/details.html
即，url的前缀对下游的服务是不需要的，除非下游服务添加context-path, 但很多时候我们并不喜欢加这个。如果Nginx转发的时候，把这个前缀去掉就好了。
一个种方案是proxy_pass后面加根路径/.
server {
    listen 80;
    server_name abc.com;
    access_log "pipe:rollback /data/log/nginx/access.log interval=1d baknum=7 maxsize=1G" main;
    location ^~/user/ {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://user/;
    }
    location ^~/order/ {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://order/;
    }
}
 ^~/user/表示匹配前缀是user的请求，proxy_pass的结尾有/， 则会把/user/*后面的路径直接拼接到后面，即移除user.
 

另一种方案是使用rewrite
upstream user {
    server localhost:8089 weight=5;
}
upstream order {
    server localhost:8090 weight=5;
}
server {
    listen 80;
     abc.com;
    access_log "pipe:rollback /data/log/nginx/access.log interval=1d baknum=7 maxsize=1G" main;
    location ^~/user/ {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
        rewrite ^/user/(.*)$ /$1 break;
        proxy_pass http://user;
    }
    location ^~/order/ {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
        rewrite ^/order/(.*)$ /$1 break;
        proxy_pass http://order;
    }
}
注意到proxy_pass结尾没有/， rewrite重写了url。


关于rewrite
syntax: rewrite regex replacement [flag]
Default: —
Context: server, location, if
```


# **ngin x+ sockjs + stomp.js**

```纯文本 
 ngin x+ sockjs + stomp.js 
 
 如果用nginx + sockjs 
     配置： 
         proxy_http_version 1.1;     websocket必须要使用的http/1.1 通讯协议 
         proxy_set_header Upgrade $http_upgrade;   下面这两行是 告诉nginx 响应http协议的升级请求 
         proxy_set_header Connection "upgrade"; 
     因为WebSocket是一个长连接，不像HTTP那样是典型的短连接，所以反向代理服务器需要允许连接保持着打开，而不是在它们看起来空闲时就将它们关闭。 
     WebSocket是端对端的，所以当一个代理服务器从客户端拦截一个Upgrade请求，它需要去发送它自己的Upgrade请求到后端服务器，也包括合适的头。 
 
 代理： 
     location /api/{ 
         proxy_pass 'http:localhost:8080' 
     } 
     或者 
     location / { 
         root         D:/web/test                         绝对路径  / 
         index           index.html                        绝对路径下找 index。html 
     }
```


# 防止缓存

```纯文本 
 防止缓存  add_header Cache-Control "no-cache, no-store"; 
 
 https://www.cnblogs.com/kevingrace/p/10459429.html    写的非常好（其中匹配好像有一些错误） 
 
 https://www.cnblogs.com/xyyt/p/10431173.html 
 
 Http协议的cache-control的常见取值及其组合释义: 
 no-cache: 数据内容不能被缓存, 每次请求都重新访问服务器, 若有max-age, 则缓存期间不访问服务器. 
 no-store: 不仅不能缓存, 连暂存也不可以(即: 临时文件夹中不能暂存该资源). 
 private(默认): 只能在浏览器中缓存, 只有在第一次请求的时候才访问服务器, 若有max-age, 则缓存期间不访问服务器. 
 public: 可以被任何缓存区缓存, 如: 浏览器、服务器、代理服务器等. 
 max-age: 相对过期时间, 即以秒为单位的缓存时间. 
 no-cache, private: 打开新窗口时候重新访问服务器, 若设置max-age, 则缓存期间不访问服务器. 
 -  private, 正数的max-age: 后退时候不会访问服务器. 
 -  no-cache, 正数的max-age: 后退时会访问服务器. 
 
 
 -   可缓存性 
 public 
      表明响应可以被任何对象（包括：发送请求的客户端，代理服务器，等等）缓存。表示相应会被缓存，并且在多用户间共享。默认是public。 
 private 
      表明响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）,可以缓存响应内容。响应只作为私有的缓存，不能在用户间共享。如果要求HTTP认证，响应会自动设置为private。 
 no-cache 
      在释放缓存副本之前，强制高速缓存将请求提交给原始服务器进行验证。指定不缓存响应，表明资源不进行缓存。但是设置了no-cache之后并不代表浏览器不缓存，而是在缓存前要向服务器确认资源是否被更改。因此有的时候只设置no-cache防止缓存还是不够保险，还可以加上private指令，将过期时间设为过去的时间。 
 only-if-cached 
      表明客户端只接受已缓存的响应，并且不要向原始服务器检查是否有更新的拷贝. 
 
 -   到期 
 max-age=<seconds> 
      设置缓存存储的最大周期，超过这个时间缓存被认为过期(单位秒)。与Expires相反，时间是相对于请求的时间。max-age会覆盖掉Expires。 
 s-maxage=<seconds> 
      覆盖max-age 或者 Expires 头，但是仅适用于共享缓存(比如各个代理)，并且私有缓存中它被忽略。也就是说s-maxage只用于共享缓存，比如CDN缓存（s -> share）。与max-age 的区别是：         max-age用于普通缓存，而s-maxage用于代理缓存。如果存在s-maxage,则会覆盖max-age 和 Expires. 
 max-stale[=<seconds>] 
      表明客户端愿意接收一个已经过期的资源。 可选的设置一个时间(单位秒)，表示响应不能超过的过时时间。 
 min-fresh=<seconds> 
      表示客户端希望在指定的时间内获取最新的响应。 
 stale-while-revalidate=<seconds> 
      表明客户端愿意接受陈旧的响应，同时在后台异步检查新的响应。秒值指示客户愿意接受陈旧响应的时间长度。 
 stale-if-error=<seconds> 
      表示如果新的检查失败，则客户愿意接受陈旧的响应。秒数值表示客户在初始到期后愿意接受陈旧响应的时间。 
 
 -   重新验证和重新加载 
 must-revalidate 
      缓存必须在使用之前验证旧资源的状态，并且不可使用过期资源。表示如果页面过期，则去服务器进行获取。 
 proxy-revalidate 
      与must-revalidate作用相同，但它仅适用于共享缓存（例如代理），并被私有缓存忽略。 
 immutable 
      表示响应正文不会随时间而改变。资源（如果未过期）在服务器上不发生改变，因此客户端不应发送重新验证请求头（例如If-None-Match或If-Modified-Since）来检查更新，即使用户显式地刷新页面。在Firefox中，immutable只能被用在 https:// transactions. 
 
 -   其他 
 no-store 
      缓存不应存储有关客户端请求或服务器响应的任何内容。表示绝对禁止缓存! 
 no-transform 
      不得对资源进行转换或转变。Content-Encoding, Content-Range, Content-Type等HTTP头不能由代理修改。例如，非透明代理可以对图像格式进行转换，以便节省缓存空间或者减少缓慢链路上的流量。 no-transform指令不允许这样做。 
 
 
 
 location = /index.html { 
     add_header Cache-Control "no-cache, no-store"; 
     root /wls/appsystems/apps/; 
 } 
 no-cache, no-store可以只设置一个no-cache浏览器会缓存， 但刷新页面或者重新打开时 会请求服务器，服务器可以响应304，如果文件有改动就会响应200no-store浏览器不缓存，刷新页面需要重新下载页面 
 
 
 支付宝 
 upstream example-be { 
 　　ip_hash; 
 　　server unix:/run/example-be.sock; 
 } 
 server{ 
 　　listen 80; #监听端口 
 　　server_name example.com 
 
 　　# 后台api 
 　　location ~ ^/api { 
 　　　　proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
 　　　　include uwsgi_params; 
 　　　　 uwsgi_pass example-be; 
 　　 } 
 
 　　# 前端静态文件 
 　　location ~* \.(gif|jpg|jpeg|png|css|js|ico|eot|otf|fon|font|ttf|ttc|woff|woff2)$ { 
 　　　　root /var/www/example-fe/dist/; 
 　　} 
 
 　　# 前端html文件 
 　　location / { 
 　　　　# disable cache html 
 　　　　add_header Cache-Control 'no-cache, must-revalidate, proxy-revalidate, max-age=0'; 
 
 　　　　root /var/www/example-fe/dist/; 
 　　　　index index.html index.htm; 
 　　　　try_files $uri /index.html; 
 　　} 
 } 
 
 或者 
 if ( $request_filename ~* ^.*?\.(html|htm)$){ 
    add_header Cache-Control "no-cache, no-store" ; 
 } 
 error： unknown directive "if($request_filename" 
 注意：if 和 ( 缺一个空格 ，如果没有空格他把if($request_uri当成一个指令了，没有这个指令） 
 
 以上是nginx的缓存控制 
 下面是浏览器的缓存控制 
 
 一、浏览器对缓存的处理：Internet选项 
 　　★ 控制请求服务器策略：是忽略资源的缓存策略的情况下额外强制请求服务器的意思。 
 　　  ★ 检查存储的页面较新版本 
        　　 1.每次访问网页时 
               　　不管是否有缓存、资源状态是否过期，都会再次请求服务器。 
        　　 2.每次启动Internet Explorer时 
        　　　　不管是否有缓存、资源状态是否过期，都会再次请求服务器。 
      　　   3.自动 
            　　   大体上和2是一样的，只是对于图片的策略有点不同。 
        　　 4.从不 
               　　完全按照资源的缓存策略来请求服务器。 
 
 　　★  F5 刷新 ：请求服务端，但是会根据和服务器对比文件来确定是否下载 
 　　★  Ctrl + F5刷新 ：一定会去服务器下载。 
 二、缓存控制策略 
 　　★Last-Modified/If-Modified-Since要配合Cache-Control使用，Etag/If-None-Match也要配合Cache-Control使用。 
 
 　  　ps： 分布式系统里多台机器间文件的last-modified必须保持一致，以免负载均衡到不同机器导致比对失败 
 　　　   　分布式系统尽量关闭掉Etag(每台机器生成的etag都会不一样) 
 
 　　★ HTML通过meta的http-equiv属性控制浏览器缓存策略：通过设置Pragma和Cache-control和expires控制 
 　　　　ps:只能控制html的缓存策略，不能控制css/js/图片的缓存策略。 
 
 　　　　Cache-control的max-age和expires同时存在，那么先处理max-age。 
 　　　　Cache-control指定了no-cache后，max-age和expires。 
 　　　　Pragma: http 1.0 IE浏览器才识别，请求头中不会体现，但是确实有效果 
 　　　　Cache-control: http 1.1 
 
 三、Nginx设置浏览器缓存 
       ★Nginx设置浏览器缓存：可以在http 、server、location节点中添加。可以设置各种资源的缓存策略，不仅仅是HTML。而<meta http-equiv>节点只针对HTML 
 
 　　#add_header Cache-Control no-cache; 
 　　#add_header Cache-Control private; 
 　　add_header Cache-Control max-age=7200; 
 
 　　if ($request_filename ~* ^.*?\.(ico|jpeg|gif|jpg|png|woff)$){ 
 　　　　expires 7d; 
 　　} 
 　　if ($request_filename ~* ^.*?\.(js|css)$){ 
 　　　　expires 7d; 
 　　} 
 　　if ($request_filename ~* ^.*?\.(html|htm)$){ 
 　　　　expires 3d; 
 　　} 
 　　★Nginx中的配置会覆盖HTML的http-equiv="Cache-control"配置。 
 
 但是如果HTML中的加了下面3个标签，浏览器端效果还是只能no-cache。（从效果上来看：Nginx的Cache-control配置无效） 
           因为Nginx的Cache-control配置只是覆盖了Cache-control（如果html加的是后面两个标签，Nginx还是有效的），而Pragma仍然起着作用。 
 
 　　　　<meta http-equiv="Pragma" content="no-cache"/> 
 　　　　<meta http-equiv="Cache-control" content="no-cache;max-age=0"/> 
 　　　　<meta http-equiv="expires" content="0"/>
```


# location

```纯文本 
 location的匹配顺序 
 
 https://www.cnblogs.com/quail2333/p/11181747.html 
 
 略述： 
     1、nginx服务器首先在server块的多个location块中搜索是否有标准的uri和请求字符串匹配。如果有多个标准uri可以匹配，就匹配其中匹配度最高的一个location。 
     2、然后，nginx在使用location块中，正则uri和请求字符串，进行匹配。如果正则匹配成功，则结束匹配，并使用这个location处理请求；如果正则匹配失败，则使用标准uri中，匹配度最高的location。 
 详细： 
     1、如果有精确匹配，会先进行精确匹配，匹配成功，立刻返回结果。 
     2、普通匹配与顺序无关，因为按照匹配的长短来取匹配结果。 
     3、正则匹配与顺序有关，因为是从上往下匹配。(首先匹配，就结束解析过程) 
     4、在location中，有一种统配的location，所有的请求，都可以匹配 
 
 
 (location = uri {}) > (location 完整路径 {}) > (location ^~ 路径 {}) > (location ~,~* 正则顺序 {}) > (location 部分起始路径 {}) > (location / {}) 
 
 location = /php.php {  
     echo '精确匹配';  
 }  
 location ^~ /php/ {  
     echo '标准匹配，仅前缀';  
 }  
 location ~ \.(php) {  
     echo '区分大小写，小写';  
 }  
 location ~ \.(pHp) {  
     echo '区分大小写，大写';  
 }  
 location ~* \.(php)$ {  
     echo '不区分大小写'; 
 } 
 
 [root@www quail]# curl 192.168.249.132/php.php  
     精确匹配  
 [root@www quail]# curl 192.168.249.132/php/php.php  
     标准匹配，仅前缀  
 [root@www quail]# curl 192.168.249.132/pp.php  
     区分大小写，小写  
 [root@www quail]# curl 192.168.249.132/pp.pHp  
     区分大小写，大写  
 [root@www quail]# curl 192.168.249.132/php.pHP  
     不区分大小写 

```
