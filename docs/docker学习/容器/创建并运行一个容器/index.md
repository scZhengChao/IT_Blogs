# 创建并运行一个容器

创建并运行nginx容器的命令：

```docker 
docker run --name containerName -p 80:80 -d nginx

```


命令解读：

- docker run ：创建并运行一个容器
- \--name : 给容器起一个名字，比如叫做mn
- -p ：将宿主机端口与容器端口映射，冒号左侧是宿主机端口，右侧是容器端口
- -d：后台运行容器
- nginx：镜像名称，例如nginx

这里的`-p`参数，是将容器端口映射到宿主机端口。

默认情况下，**容器是隔离环境，我们直接访问宿主机的80端口，肯定访问不到容器中的nginx。**

现在，将容器的80与宿主机的80关联起来，当我们访问宿主机的80端口时，就会被映射到容器的80，这样就能访问到nginx了：

![](./assets/image/image_tFWJsdXCpz.png)

浏览器直接访问：

![](./assets/image/image_HfPg_xXZUB.png)
