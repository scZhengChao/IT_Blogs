# 基于Ubuntu构建Java项目

需求：基于Ubuntu镜像构建一个新镜像，运行一个java项目

- 步骤1：新建一个空文件夹docker-demo

![](./assets/image/image_M14egJWeCe.png)

步骤2：拷贝课前资料中的docker-demo.jar文件到docker-demo这个目录

![](./assets/image/image_GuAg-kDhNR.png)

步骤3：拷贝课前资料中的jdk8.tar.gz文件到docker-demo这个目录

![](./assets/image/image_zJmRiHniCB.png)

步骤4：拷贝课前资料提供的Dockerfile到docker-demo这个目录

![](./assets/image/image_SAzsya_URo.png)

其中的内容如下：

```docker 
  # 指定基础镜像
  FROM ubuntu:16.04
  # 配置环境变量，JDK的安装目录
  ENV JAVA_DIR=/usr/local

  # 拷贝jdk和java项目的包
  COPY ./jdk8.tar.gz $JAVA_DIR/
  COPY ./docker-demo.jar /tmp/app.jar

  # 安装JDK
  RUN cd $JAVA_DIR \
   && tar -xf ./jdk8.tar.gz \
   && mv ./jdk1.8.0_144 ./java8

  # 配置环境变量
  ENV JAVA_HOME=$JAVA_DIR/java8
  ENV PATH=$PATH:$JAVA_HOME/bin

  # 暴露端口
  EXPOSE 8090
  # 入口，java项目的启动命令
  ENTRYPOINT java -jar /tmp/app.jar

```


- 步骤5：切换到docker-demo

  将准备好的docker-demo上传到虚拟机任意目录，然后进入docker-demo目录下

![](./assets/image/image_CCksidS1mJ.png)

步骤6：运行命令：

```markdown 
docker build -t javaweb:1.0 .
    说明:
        1.docker build 表示构建
        2.-t:t的全称是tag表示版本
        3.javaweb:1.0 ：镜像组成格式  repository:版本  javaweb表示repository，属于标识符，随便定义
        4. 在版本即1.0后面一定加空格然后书写点，点表示在当前目录执行Dockerfile文件

```


![](./assets/image/image_GbNBnUzv-7.png)

- 查看镜像

![](./assets/image/image_M1MMALzSkm.png)

- 构建容器：

```docker 
docker run --name myWeb1.0 -p 8090:8090 -d javaweb:1.0

```


![](./assets/image/image_lt02wm84sB.png)

- 查看启动的容器

![](./assets/image/image_Zs8qlxxSX0.png)

- 最后访问[http://192.168.200.128:8090/hello/count，其中的ip改成你的虚拟机ip](http://192.168.200.128:8090/hello/count，其中的ip改成你的虚拟机ip "http://192.168.200.128:8090/hello/count，其中的ip改成你的虚拟机ip")
