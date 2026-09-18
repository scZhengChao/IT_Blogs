# 构建镜像

## 目录

- [运行容器](#运行容器)
- [构建镜像 RUN 输出查看小技巧](#构建镜像-RUN-输出查看小技巧)

使用 `docker build` 命令可基于 Dockerfile 构建镜像。

镜像构建成功后，我们可以将仓库上传至 Docker 仓库，如 [Docker Hub (opens new window)](https://hub.docker.com/ "Docker Hub (opens new window)")。而对于业务项目而言，一般会上传至公司内部的私有镜像仓库，比如通过 [harbor (opens new window)](https://github.com/goharbor/harbor "harbor (opens new window)")搭建的私有镜像仓库。

```javascript 
# 构建一个名为 simple-app 的镜像
# -t: "name:tag" 构建镜像名称
$ docker build -t simple-app .

# git rev-parse --short HEAD: 列出当前仓库的 CommitId
# 也可将当前 Commit 作为镜像的 Tag
# 如果该前端项目使用 git tag 以及 package.json 中的 version 进行版本维护，也可将 version 作为生产环境镜像的 Tag
$ docker build -t simple-app:$(git rev-parse --short HEAD)

# 构建成功后，可用该命令列出所有的镜像
# 发现该镜像占用体积 133MB
$ docker images
REPOSITORY           TAG         IMAGE ID       CREATED          SIZE
simple-app           latest      c1571917d2c2   17 seconds ago   133MB

```


此时构建镜像成功，通过 `docker images` 可知镜像体积为 **133MB**。记住这个数字，以后优化镜像体积时用得到。

```javascript 
docker build --tag [镜像名]:[版本] -f Dockerfile .
 
docker run -p 9003:9003 --name [容器名称] -d  [镜像名称]:[版本]


```


## 运行容器

我们可以基于镜像运行 N 个容器，而本次启动的容器也是我们最终所要提供的静态服务。

```javascript 
# 根据该镜像运行容器
# 如果需要在后台运行则添加 -d 选项
# --rm: 当容器停止运行时，自动删除容器
# -p: 3000:3000，将容器中的 3000 端口映射到宿主机的 3000 端口，左侧端口为宿主机端口，右侧为容器端口
$  docker run --rm -p 3000:3000 simple-app
 
# 运行成功后可在另一个窗口查看所有容器
$ docker ps
CONTAINER ID   IMAGE        COMMAND                  CREATED          STATUS          PORTS                                       NAMES
50784910f758   simple-app   "docker-entrypoint.s…"   20 seconds ago   Up 20 seconds   0.0.0.0:3000->3000/tcp, :::3000->3000/tcp   wizardly_solomon
```


## 构建镜像 RUN 输出查看小技巧

在使用 `docker build` 进行构建时，通过 `RUN` 指令可以通过打印一些关键信息进行调试，

但是，在我们进行 `docker build` 时，无法查看其输出结果。

此时可以通过 `--progress plain` 来查看其输出结果。

```javascript 
FROM node:14-alpine

RUN echo shanyue

```


对以上镜像构建，可拿到 `echo shanyue` 的输出结果。

```javascript 
$ docker build --progress plain --no-cache .
4 [1/2] FROM docker.io/library/node:14-alpine
4 sha256:4641ddabdab058bf21b1550827533213f023ec21abf1ceb322993c137532f760
4 CACHED

5 [2/2] RUN echo shanyue
5 sha256:37883e3cbc36146a836ad89f3cf147723bcda1d2cf4e97655c9ed1afceb59517
5 0.237 shanyue
5 DONE 0.3s

```
