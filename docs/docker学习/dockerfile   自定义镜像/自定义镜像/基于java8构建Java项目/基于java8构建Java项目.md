# 基于java8构建Java项目

虽然我们可以基于Ubuntu基础镜像，添加任意自己需要的安装包，构建镜像，但是却比较麻烦。**所以大多数情况下，我们都可以在一些安装了部分软件的基础镜像上做改造。**

例如，构建java项目的镜像，可以在已经准备了JDK的基础镜像基础上构建。

![](image_EJDtWBrAMu.png)

**需求：** 基于java:8-alpine镜像，将一个Java项目构建为镜像

实现思路如下：

- ① 在tmp目录下在新建一个空的目录docker-demo02

![](image_WRlM7yfzap.png)

- ② 拷贝课前资料提供的docker-demo.jar到这个目录中
- ③ 然后在目录中新建一个文件，命名为Dockerfile，编写Dockerfile文件：
  - a ）基于java:8-alpine作为基础镜像
  - b ）将docker-demo.jar拷贝到镜像中
  - c ）暴露端口
  - d ）编写入口ENTRYPOINT

    内容如下：

```docker 
FROM java:8-alpine
COPY ./docker-demo.jar /tmp/app.jar
# 暴露端口
EXPOSE 8090
# 入口，java项目的启动命令
ENTRYPOINT java -jar /tmp/app.jar

```


![](image_TvvOao7b_r.png)

![](image_wSlf1tylpz.png)

④ 使用docker build命令构建镜像

```docker 
docker build -t javaweb:2.0 .

```


- ⑥ 使用docker run创建容器并运行

```docker 
docker run --name myWeb2.0 -p 8090:8090 -d javaweb:2.0

```
