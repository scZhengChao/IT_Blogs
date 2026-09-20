# 拒绝服务

限制单个IP连接数

```nginx 
limit_conn_zone $binary_remote_addr zone=perip:10m;
limit_conn_zone $server_name zone=perserver:10m;

server {
    ...
    limit_conn perip 10;
    limit_conn perserver 100;
}

```


[Nginx防止大流量攻击，限制流量访问（limit\_req\_zone模块）以及进行网站压力测试](../../方案/Nginx防止大流量攻击，限制流量访问（limit_req_/Nginx防止大流量攻击，限制流量访问（limit_req_zone模块）以及进行网站压力测试.md "Nginx防止大流量攻击，限制流量访问（limit_req_zone模块）以及进行网站压力测试")
