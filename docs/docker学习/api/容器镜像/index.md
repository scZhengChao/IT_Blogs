# 容器镜像

## 目录

- [run](#run)
- [image](#image)
  - [拉取仓库](#拉取仓库)
  - [打包镜像](#打包镜像)
  - [列出所有镜像](#列出所有镜像)
  - [删除虚悬镜像](#删除虚悬镜像)
- [build](#build)
- [ps](#ps)
  - [查看所有容器](#查看所有容器)
- [container](#container)
  - [查看容器](#查看容器)
  - [启动容器](#启动容器)
  - [删除容器](#删除容器)
- [rm](#rm)
  - [删除/停止/重启   容器/镜像](#删除停止重启---容器镜像)
- [restart](#restart)
  - [重启](#重启)
- [exec](#exec)
  - [进入容器 ](#进入容器-)

官方：

[ docker run docker run: The \`docker run\` command first \`creates\` a writeable container layer over the specified image, and then \`starts\` it using the specified command. That is, \`docker run\` is equivalent... https://docs.docker.com/engine/reference/commandline/run/](https://docs.docker.com/engine/reference/commandline/run/ " docker run docker run: The `docker run` command first `creates` a writeable container layer over the specified image, and then `starts` it using the specified command. That is, `docker run` is equivalent... https://docs.docker.com/engine/reference/commandline/run/")

# run

| -it   | 交互式运行    |
| ----- | -------- |
| -d    | 后台运行     |
| -p    | 端口映射     |
| -name | 容器名字     |
| -v    | 数据卷映射    |
| -rm   | 容器停止自动删除 |

# image

## 拉取仓库

从仓库抓取到本地

```bash 
docker image pull library/hello-world
```


## 打包镜像

```bash 
docker image build -t koa-demo:0.0.1 .

docker build --progress plain --no-cache .   查看构建过程中的输出

```


&#x20;

## 列出所有镜像

\# 列出本机的所有 image 文件。

```bash 
docker image  ls 
docker images 
```


## 删除虚悬镜像

```bash 
docker image prune  

删除指定镜像
docker image rm [imageName]   缩写  docker rmi id

```


# build

# ps

## 查看所有容器

```bash 
docker ps.  正在运行的容器

docker ps -a 全部容器

docker ps -n 3
```


# container

## 查看容器

```bash 
# 列出本机正在运行的容器
docker container ls



# 列出本机所有容器，包括终止运行的容器
docker container ls --all
```


## 启动容器

```bash 
docker container run  —rm -p 8000:3000 -it koa-demo /bin/bash
# 或者
$ docker container run -p 8000:3000 -it koa-demo:0.0.1 /bin/bash

  

docker container run hello-world -d 后台运行
docker run \
  -p 8080:8080 \
  -name tomcat \
  -d \
  -y  /usr/local/docker/tomcat/ROOT:/usr/Local/tomcat/webapps/ROOT  tomcat

```


## 删除容器

```bash 
docker container prune   删除所有 停止的 容器 

删除指定容器
docker container rm [containerID]  缩写 docker rm id

停止指定的容器运行
docker container kill [containerID]

docker container stop [containerID]

这两个信号的差别是，应用程序收到 SIGTERM 信号以后，可以 自行进行收尾清理工作，但也可以不理会这个信号 。
如果收到 SIGKILL 信号，就会强行立即终止，那 些正在进行中的操作会全部丢失。
```


# rm

## 删除/停止/重启   容器/镜像

```bash 

docker rm   id。删除容器

docker rmi    ID。 删除镜像

```


# restart

## 重启

```bash 
docker restart [name/id]
```


# exec

## 进入容器&#x20;

```bash 
docker exec -it 容器id bash

docker exec -it tomcat bash
```
