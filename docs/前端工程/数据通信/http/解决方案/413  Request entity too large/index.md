# 413  Request entity too large

## 目录

- [1.分为两种情况](#1分为两种情况)
- [2.解释](#2解释)
- [3.一般解决办法：](#3一般解决办法)

### 1.分为两种情况

1.带413

```typescript 
413 Request Entity Too Large
```


2.不带413

```typescript 
Request Entity Too Large
```


### 2.解释

两种情况略有不同。

1.是请求文件太大（不包含参数）

2.是请求实体太大（包含参数，文件等）

客户端发送的实体主体部分比服务器能够或者希望处理的要大。出现这个[状态码](https://so.csdn.net/so/search?q=状态码\&spm=1001.2101.3001.7020 "状态码")的一般都是上传接口。

### 3.一般解决办法：

1.查看反代设置

nginx 中： `client_max_body_size` 具体的大小值，默认为1m; 此时可调整大小

2.查看应用的设置

一般可能是web项目中配置的大小不够。查看应用设置

PHP配置：

- file\_uploads = on ;打开文件上传选项
- upload\_max\_filesize = 20M;文件上传限制
- post\_max\_size =20; post上限
- max\_execution\_time =180; 脚本最大执行时间（秒），过短会导致文件还没上传完脚本就停止了
- max\_input\_time =180; 请求最大传输时间，过短会导致文件还没上传完传输就停止了
- memory\_limit = 128M; 内存上限

修改完成后重启php-fpm或reload配置

3.服务器运行情况是否正常
