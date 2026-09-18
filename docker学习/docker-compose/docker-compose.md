# docker-compose

## 目录

- [更高效的方式: docker-compose](#更高效的方式-docker-compose)
  - [docker-compose.yaml](#docker-composeyaml)

## 更高效的方式: docker-compose

![](image_NnU1Rbpniw.png)

将命令行的选项翻译成配置文件，是更为简单且更容易维护的方式。比如对于 webpack 而言，基本上基于 webpack.config.js 配置文件使用。

而 docker compose 即可将 docker cli 的选项翻译成配置文件，除此之外，它还有更强大的功能。

编辑 docker-compose.yaml 配置文件如下所示。当然，由于这是一个最简项目，因此配置文件也极其简单。

```javascript 
version: "3"
services:
  app:
    # build: 从当前路径构建镜像
    build: .
    ports:
      - 3000:3000

```


配置结束之后，即可通过一行命令 `docker-compose up` 替代以前关于构建及运行容器的所有命令。

```javascript 
# up: 创建并启动容器
# --build: 每次启动容器前构建镜像
$ docker-compose up --build

```


此时在本地访问 `http://localhost:3000` 访问成功

此时，通过 `docker`/`docker-compose` 便部署成功了第一个前端应用。

以下，再介绍一个使用 Docker 的小技巧。

#### docker-compose.yaml

```yaml 
version: "3"
services:
  simple:
    build:
      context: .
      dockerfile: simple.Dockerfile
    ports:
      - 4000:80

```


使用 `docker-compose up --build simple` 启动容器。

访问 `http://localhost:4000` 页面成功。

[初识DockerCompose](初识DockerCompose.md "初识DockerCompose")

[安装DockerCompose](安装DockerCompose.md "安装DockerCompose")

[部署应用](部署应用.md "部署应用")
