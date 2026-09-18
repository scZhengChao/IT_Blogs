# 部署应用

## 目录

- [4.3.1.实现思路](#431实现思路)
- [4.3.2.具体实现](#432具体实现)

### 4.3.1.实现思路

【1】 查看**资料\原始代码. \docker-compose**文件夹，里面是已经编写好了docker-compose文件和项目

【2】修改docker-compose的配置文件docker-compose.yml变为自己当前的环境配置参数

【3】将docker-compose目录上传到虚拟机中的/tmp目录下面

【4】切换到docker-compose目录下即docker-compose.yml文件所在位置

【5】**查看之前启动的容器并全部删除**

【6 **】停止mysql服务**

【7】执行命令 **docker-compose up -d** 批量构建容器，并启动

【8】使用浏览器访问项目

【9】使用mysql客户端datagrip访问mysql服务

### 4.3.2.具体实现

【1】 查看**资料\原始代码\docker-compose**文件夹，里面是已经编写好了docker-compose文件和项目

【2】修改docker-compose的配置文件docker-compose.yml变为自己当前的环境配置参数

```yaml 
# DockerCompose的版本是3.2
version: "3.2"
# DockerCompose启动时启动的服务(应用)，一共启动2个服务
services:
  # 基于已有的镜像image: mysql:5.7.25去创建mysql容器
  mysql:
    # 你的虚拟机镜像应该是mysql:5.7.25。 这里基于你的mysql镜像创建容器 
    image: mysql:5.7.25
    container_name: mysql_container
    environment:
      MYSQL_ROOT_PASSWORD: 1234
    volumes:
      - "/tmp/mysql/data:/var/lib/mysql"
      - "/tmp/mysql/conf/my.cnf:/etc/mysql/conf.d/my.cnf"
    ports:
      - "3306:3306"
  # 自己构建镜像然后创建容器
  myweb:
    #  找到当前目录下myweb-service下面的Dockerfile然后构建镜像
     build: ./myweb-service
    # 镜像名是 myweb:3.0
    image: myweb:3.0
    container_name: myweb_container
    ports:
      # 在浏览器访问项目的端口号是8082
      - "8082:8090"
```


```docker 
# 利用DockerCompose部署,批量构建容器，并启动
# 说明:docker-compose up -d 以后台的方式运行容器.
# up表示创建和启动容器
# -d 表示后台
docker-compose up -d

```
