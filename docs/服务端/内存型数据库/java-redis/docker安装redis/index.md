# docker安装redis

## 目录

- [进入Redis容器](#进入Redis容器)
- [Redis 配置文件修改](#Redis-配置文件修改)
- [9、进入有密码的Redis控制台](#9进入有密码的Redis控制台)

[ Docker 安装 Redis 容器 (完整详细版)\_docker redis-CSDN博客 文章浏览阅读7.8w次，点赞64次，收藏267次。Docker 安装 (完整详细版)Docker 日常命令大全(完整详细版)1、获取Redis镜像Docker如果想安装软件 , 必须先到 Docker 镜像仓库下载镜像。Docker 镜像仓库​2、下载Redis镜像命令			描述		docker pull redis			下载最新版Redis镜像 (其实此命令就等同于 : docker pull  https://blog.csdn.net/BThinker/article/details/123374236](https://blog.csdn.net/BThinker/article/details/123374236 " Docker 安装 Redis 容器 (完整详细版)_docker redis-CSDN博客 文章浏览阅读7.8w次，点赞64次，收藏267次。Docker 安装 (完整详细版)Docker 日常命令大全(完整详细版)1、获取Redis镜像Docker如果想安装软件 , 必须先到 Docker 镜像仓库下载镜像。Docker 镜像仓库​2、下载Redis镜像命令			描述		docker pull redis			下载最新版Redis镜像 (其实此命令就等同于 : docker pull  https://blog.csdn.net/BThinker/article/details/123374236")

```markdown 
# 本次执行命令：
docker run --name redis -p 6379:6379 \
-v /home/redis/data:/data \
-v /home/redis/conf/redis.conf:/etc/redis/redis.conf \
-d redis:bullseye redis-server /etc/redis/redis.conf 
```


```markdown 
# 本次执行命令：
docker run --name redis -p 6379:6379 \
-v /Users/zhengchao/home/docker/redis/data:/data \
-v /Users/zhengchao/home/docker/redis/conf/redis.conf:/etc/redis/redis.conf \
-d redis redis-server /etc/redis/redis.conf 
```


| 命令                                                   | 描述                                                           |
| ---------------------------------------------------- | ------------------------------------------------------------ |
| –name redis                                          | 启动容器的名字                                                      |
| -d                                                   | 后台运行                                                         |
| -p 6379:6379                                         | 将容器的 6379(后面那个) 端口映射到主机的 6379(前面那个) 端口                       |
| –restart unless-stopped                              | 容器重启策略                                                       |
| -v /home/redis/data:/data                            | 将Redis储存文件夹挂在到主机                                             |
| -v /home/redis/conf/redis.conf:/etc/redis/redis.conf | 将配置文件夹挂在到主机                                                  |
| -d redis:bullseye                                    | 启动哪个版本的 Redis (本地镜像的版本)                                      |
| redis-server /etc/redis/redis.conf                   | Redis 容器中设置 redis-server 每次启动读取 /etc/redis/redis.conf 这个配置为准 |
| \\--appendonly yes                                   | 在Redis容器启动redis-server服务器并打开Redis持久化配置                       |
| \\\\                                                 | shell 命令换行                                                   |

#### 进入Redis容器

```markdown 
### 通过 Docker 命令进入 Redis 容器内部
docker exec -it redis /bin/bash
docker exec -it redis bash
### 进入 Redis 控制台
redis-cli
### 添加一个变量为 key 为 name , value 为 bella 的内容
> set name bella
### 查看 key 为 name 的 value 值
> get name
 
 
### 或者也可以直接通过Docker Redis 命令进入Redis控制台 (上面两个命令的结合)
docker exec -it redis redis-cli
```


#### Redis 配置文件修改

> 修改 /home/redis/conf/redis.conf

| 命令                | 功能                                                                       |
| ----------------- | ------------------------------------------------------------------------ |
| appendonly yes    | 启动Redis持久化功能 (默认 no , 所有信息都存储在内存 \\\[重启丢失] 。 设置为 yes , 将存储在硬盘 \\\[重启还在]) |
| protected-mode no | 关闭protected-mode模式，此时外部网络可以直接访问 (docker貌似自动开启了)                          |
| bind 0.0.0.0      | 设置所有IP都可以访问 (docker貌似自动开启了)                                              |
| requirepass 密码    | 设置密码                                                                     |

#### 9、进入有密码的Redis控制台

> 如果你设置了密码,需要通过如下命令进入Redis控制台

![](https://i-blog.csdnimg.cn/blog_migrate/8791c1af10062365c75e225ec7263076.png)

```markdown 
## 进入Redis容器
docker exec -it redis /bin/bash
 
## 通过密码进入Redis控制台
redis-cli -h 127.0.0.1 -p 6379 -a 123456
```


![](./image/image_96HrcYw3Sg.png)
