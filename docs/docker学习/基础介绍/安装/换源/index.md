# 换源

## 目录

- [配置镜像加速aliyun](#配置镜像加速aliyun)

在 /etc/docker/daemon.json 文件中添加以下参数：

```nginx 
{
  "registry-mirrors": ["[https://9cpn8tt6.mirror.aliyuncs.com](https://9cpn8tt6.mirror.aliyuncs.com)"]

}
```


如果是不存在，则直接创建即可。

当修改好之后，我们只需要重启以下服务器即可:

```nginx 
systemctl daemon-reload
systemctl restart docker

```


## 配置镜像加速aliyun

docker官方镜像仓库网速较差，我们需要设置国内镜像服务：

参考阿里云的镜像加速文档：[https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors "https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors")

![](./image/image_t4arPxkpD_.png)
