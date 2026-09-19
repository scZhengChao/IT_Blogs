# 创建并运行一个redis容器，并且支持数据持久化

## 目录

- [1.实现步骤](#1实现步骤)
- [2.具体实现](#2具体实现)
  - [步骤一：到DockerHub搜索Redis镜像](#步骤一到DockerHub搜索Redis镜像)
  - [步骤二：查看Redis镜像文档中的帮助信息](#步骤二查看Redis镜像文档中的帮助信息)
  - [步骤三：利用docker run 命令运行一个Redis容器](#步骤三利用docker-run-命令运行一个Redis容器)
  - [步骤四：进入redis容器](#步骤四进入redis容器)
  - [步骤五：执行redis-cli客户端命令](#步骤五执行redis-cli客户端命令)
  - [步骤六：设置数据num=666](#步骤六设置数据num666)
  - [步骤七:在window系统中使用redis客户端连接](#步骤七在window系统中使用redis客户端连接)

#### 1.实现步骤

```markdown 
步骤一：到DockerHub搜索Redis镜像
步骤二：查看Redis镜像文档中的帮助信息
步骤三：利用docker run 命令运行一个Redis容器
    docker run --name redis -p 6379:6379 -d redis redis-server --appendonly yes

```


#### 2.具体实现

##### 步骤一：到DockerHub搜索Redis镜像

![](image_9Y8PXYnPkh.png)

##### 步骤二：查看Redis镜像文档中的帮助信息

![](image_i_uualACXX.png)

##### 步骤三：利用docker run 命令运行一个Redis容器

```docker 
docker run --name redis -p 6379:6379 -d redis redis-server --appendonly yes
    --name：指定容器名称,redis表示容器名
    -p：指定端口映射。6379:6379 冒号左侧是宿主机端口，右侧是容器端口
    -d：让容器后台运行
    redis：表示镜像名
    redis-server：表示redis服务
    --appendonly yes ：开启aof持久化

```


##### 步骤四：进入redis容器

```bash 
docker exec -it redis bash

```


![](image_WhowiuAI4i.png)

##### 步骤五：执行redis-cli客户端命令

```bash 
redis-cli

```


![](image_7lFfaZo88P.png)

##### 步骤六：设置数据num=666

```text 
set num 666

```


![](image_jL3iGlZIrr.png)

##### 步骤七:在window系统中使用redis客户端连接

![](image_Nk0wlvmfVn.png)
