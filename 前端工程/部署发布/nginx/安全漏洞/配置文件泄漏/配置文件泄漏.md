# 配置文件泄漏

限制目录浏览，将所有访问nginx.conf 的请求，都导向403或者404，配置代码如下；

```javascript 
location ~*/.*nginx.conf {
  deny all;
  return 403;
}

```
