# 初识DockerCompose

通过我们上述学习，对于每个应用都是手动创建和运行容器，那么实际开发中小一点的公司几十个应用，大一点公司几百个应用，而如果一个一个手动部署，效率会比较低也比较麻烦。因此我们可以学习下面的技术Docker-Compose来解决。

Docker Compose可以**基于Compose文件帮我们快速的部署分布式应用，而无需手动一个个创建和运行容器！**

![](./assets/image/image_azuVN1LKHc.png)

Compose文件是一个文本文件，通过指令定义集群中的每个容器如何运行。格式如下：

```yaml 
version: "3.8"
 services:
  mysql:
    image: mysql:5.7.25
    environment:
     MYSQL_ROOT_PASSWORD: 123 
    volumes:
     - "/tmp/mysql/data:/var/lib/mysql"
  web:
    build: .
    ports:
     - "8090:8090"

```


上面的Compose文件就描述一个项目，其中包含两个容器：

- mysql：一个基于`mysql:5.7.25`镜像构建的容器，并且挂载了1个目录
- web：一个基于`docker build`临时构建的镜像容器，映射端口时8090

DockerCompose的详细语法参考官网：[**https://docs.docker.com/compose/compose-file/**](https://docs.docker.com/compose/compose-file/ "https://docs.docker.com/compose/compose-file/")

其实DockerCompose文件可以**看做是将多个docker run命令写到一个文件，只是语法稍有差异。**

补充:以前执行命令创建镜像和容器方式：

```docker 
docker run --restart=always -p 3306:3306 --name mysql -v /tmp/mysql/data:/var/lib/mysql  -e MYSQL_ROOT_PASSWORD=1234 -d mysql:5.7.25

docker build -t javaweb:1.0 .

```
