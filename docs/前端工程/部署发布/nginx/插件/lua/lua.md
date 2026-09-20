# lua

## 目录

- [Nginx+Lua 实现灰度发布（复杂控制）](#NginxLua-实现灰度发布复杂控制)

[   https://www.toutiao.com/article/6789821119785337348/?tt\_from=weixin\&utm\_campaign=client\_share\&wxshare\_count=1\&timestamp=1591675303\&app=news\_article\&utm\_source=weixin\&utm\_medium=toutiao\_android\&use\_new\_style=1\&req\_id=202006091201430100260760873254F450\&group\_id=6789821119785337348](https://www.toutiao.com/article/6789821119785337348/?tt_from=weixin\&utm_campaign=client_share\&wxshare_count=1\&timestamp=1591675303\&app=news_article\&utm_source=weixin\&utm_medium=toutiao_android\&use_new_style=1\&req_id=202006091201430100260760873254F450\&group_id=6789821119785337348 "   https://www.toutiao.com/article/6789821119785337348/?tt_from=weixin\&utm_campaign=client_share\&wxshare_count=1\&timestamp=1591675303\&app=news_article\&utm_source=weixin\&utm_medium=toutiao_android\&use_new_style=1\&req_id=202006091201430100260760873254F450\&group_id=6789821119785337348")

# Nginx+Lua 实现灰度发布（复杂控制）

```nginx 
第一个lua脚本
ngx.say 是打印的打印输出的意思。。。
location /echo {
    default_type text/plain;
    echo hello lua;
}
location /lua {
    default_type text/plain;
    content_by_lua 'ngx.say("hello world")';
}

用lua脚本做nginx的访问的限制...
location @client{
    proxy_pass http://www.ruifengyun.com;
}
location ~ /test {
    default_type text/html;
    content_by_lua 'ngx.say("this is ruifengyun.com!")';
    access_by_lua '
    if ngx.var.remote_addr == "10.2.20.110" then
    ngx.exit(ngx.HTTP_FORBIDDEN)
    end
    if ngx.var.remote_addr == "10.2.20.112" then
    ngx.exec("@client")
    end
    ';
}


控制经过判断之后，才能访问
location / {
    access_by_lua '
    local res = ngx.location.capture("/auth")
    if res.status == ngx.HTTP_OK then
    return
    end
    if res.status == ngx.HTTP_FORBIDDEN then
    ngx.exit(res.status)
    end
    ngx.exit(ngx.HTTP_INTERNAL_SERVER_ERROR)
    ';
    # proxy_pass/fastcgi_pass/postgres_pass/...
}

使用lua做nginx的rewrite跳转
这个是先判断 check-pam接口的return的内容是不是spam，是的话，转跳到其他的页面
location / {
    rewrite_by_lua '
    local res = ngx.location.capture("/check-spam")
    if res.body == "spam" then
    ngx.redirect("/terms-of-use.html")
    end
    '; fastcgi_pass ...;
}

根据ip做不同的响应
location / {
    content_by_lua '
    myIP = ngx.req.get_headers()["X-Real-IP"]
    if myIP == nil then
    myIP = ngx.req.get_headers()["x_forwarded_for"]
    end
    if myIP == nil then
    myIP = ngx.var.remote_addr
    end
    if myIP == "" then
    ngx.exec("@client")
    else
    ngx.exec("@client_test")
    end
    ';
}
redirect的使用
return ngx.redirect("/foo")
return ngx.redirect("http://localhost:1984/foo", ngx.HTTP_MOVED_TEMPORARILY)
return ngx.redirect("/foo", 301)

返回302临时重定向 地址栏会显示跳转后的地址
rewrite ^ /foo? redirect; # nginx config
return ngx.redirect('/foo'); -- lua code

lua过滤post过来的参数
location = /test {
    content_by_lua '
    ngx.req.read_body()
    local args = ngx.req.get_post_args()
    for key, val in pairs(args) do
    if type(val) == "table" then
    ngx.say(key, ": ", table.concat(val, ", "))
    else
    ngx.say(key, ": ", val)
    end
    end
    ';
}

一个Lua的例子：
#!/usr/bin/env lua
ngx.say('aaaaaa </br>')
local url = ngx.var.uri
ngx.say('
',url,'<br/>')
ngx.print('这次访问的header头是 ',ngx.req.raw_header())
ngx.print('<meta http-equiv="content-type" content="text/html;charset=utf-8">')
ngx.print('<h1> 这个是 h1 </h1>')
ngx.print('这次访问的是 get 还是 post 呀 ',ngx.req.get_Method())
local args = ngx.req.get_uri_args()
ngx.print(args)
local res = ngx.location.capture("/")
ngx.print('<br>http code<br>‘,res.status)

lua 调用mysql的例子
worker_processes 2;
error_log logs/error.log warn;
events {
    worker_connections 1024;
}
http {
    upstream backend {
    drizzle_server 127.0.0.1:3306 protocol=mysql
    dbname=ngx_test user=ngx_test password=ngx_test;
    drizzle_keepalive max=10 overflow=ignore mode=single;
}
server {
    listen 8080;
    location @cats-by-name {
    set_unescape_uri $name $arg_name;
    set_quote_sql_str $name;
    drizzle_query 'select * from cats where name=$name';
    drizzle_pass backend;
    rds_json on;
}
location @cats-by-id {
    set_quote_sql_str $id $arg_id;
    drizzle_query 'select * from cats where id=$id';
    drizzle_pass backend;
    rds_json on;
}
location = /cats {
    access_by_lua '
    if ngx.var.arg_name then
    return ngx.exec("@cats-by-name")
    end
    if ngx.var.arg_id then
    return ngx.exec("@cats-by-id")
    end
    ';
    rds_json_ret 400 "expecting \"name\" or \"id\" query arguments";
}
}
}
改改密码就能用啦~    

lua获取url中的参数
location = /adder {
    set_by_lua $res "
    local a = tonumber(ngx.arg[1])
    local b = tonumber(ngx.arg[2])
    return a + b" $arg_a $arg_b;
    echo $res;
}
ngx.req.set_uri
nginx里面的配置是：
location /test {
    rewrite ^/test/(.*) /$1 break;
    proxy_pass http://my_backend;
}
lua里面的配置是：
location /test {
    rewrite_by_lua '
    local uri = ngx.re.sub(ngx.var.uri, "^/test/(.*)", "$1", "o")
    ngx.req.set_uri(uri)
    ';
    proxy_pass http://my_backend;
}

我想大家看这个对照，已经知道是啥意思了.
通过lua获取nginx的内置变量，通过这些变量做些逻辑的处理~

另外： HTTP_X_FORWARDED_FOR是透过代理服务器取得客户端的真实IP地址，有些用此方法读取到的仍然是代理服务器的IP。还有一点需要注意的是：如果客户端没有通过代理服务器来访问，那么用 HTTP_X_FORWARDED_FOR 取到的值将是空的。

函数版的访问
location /lua1 {
    default_type 'text/plain';
    content_by_lua 'ngx.say("hello, lua")';
}
# 请求另外的url
location /lua2 {
    content_by_lua '
　　local res = ngx.location.capture("/hello1")
　　ngx.say("data: " .. res.body)
';
}
```
