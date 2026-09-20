# 1.3 安装Tomcat

## 目录

- [1.3.1 Tomcat安装](#131-Tomcat安装)
- [1.3.2 Tomcat进程查看](#132-Tomcat进程查看)
- [1.3.4 停止Tomcat](#134-停止Tomcat)

#### 1.3.1 Tomcat安装

Tomcat的安装和上述JDK的安装采用相同的方式，都是使用二进制发布包的形式进行安装，在我们的资料目录下，也已经准备了Tomcat的安装包：

![](./assets/image/image_7t8FTiqNhL.png)

具体安装步骤如下：

**1). 上传安装包**

使用FinalShell自带的上传工具将Tomcat的二进制发布包上传到Linux(与前面上传JDK安装包步骤一致)。

![](./assets/image/image_iemmti4QpG.png)

**2) 进入soft文件夹，解压Tomcat到soft目录下**

```bash 
#切换到soft目录下
cd /usr/local/soft
查看目录内容
ll
解压tomcat到soft目录下
tar -zxvf apache-tomcat-8.5.27.tar.gz

```


解压好之后将之前的压缩文件删除即可。

![](./assets/image/image_dDwEohhmZJ.png)

查看tomcat的安装目录，几乎和windows版本一样的。

![](./assets/image/image_ne60Ex_z3X.png)

**3). 启动Tomcat**

进入Tomcat的bin目录启动服务。执行命令为:

```bash 
cd /usr/local/apache-tomcat-8.5.27/

cd bin

./startup.sh

```


![](./assets/image/image_coXXQ2JX8-.png)

![](./assets/image/image_33TpgAcp8y.png)

#### 1.3.2 Tomcat进程查看

上述我们将Tomcat启动完成之后，并不能知道Tomcat是否正常运行，那么我们验证Tomcat启动是否成功，有多种方式，我们这里主要介绍常见的两种方式：

**1). 查询系统进程**

我们也可以通过Linux系统的查看系统进程的指令，来判定Tomcat进程是否存在，从而判定Tomcat是否启动。执行如下指令：

```bash 
ps -aux | grep tomcat

```


![](./assets/image/image_y6V0F9KwOc.png)

**说明:**

- ps命令是linux下非常强大的进程查看命令，通过ps -aux可以查看当前运行的所有进程的详细信息
- "|" 在Linux中称为管道符，可以将前一个命令的结果输出给后一个命令作为输入
- 使用ps命令查看进程时，经常配合管道符和查找命令 grep 一起使用，来查看特定进程

#### 1.3.4 停止Tomcat

在Linux系统中，停止Tomcat服务的方式主要有两种：

**1). 运行Tomcat提供的脚本文件**

在Tomcat安装目录下有一个bin目录，这个目录中存放的是tomcat的运行脚本文件，其中有一个脚本就是用于停止tomcat服务的。

![](./assets/image/image_ks6MiUJvW1.png)

我们可以切换到bin目录，并执行如下指令，来停止Tomcat服务：

```bash 
./shutdown.sh

```


**2). 结束Tomcat进程**

我们可以先通过`ps -ef |grep tomcat`指令查看`tomcat`进程的信息，从进程信息中获取`tomcat`服务的进程号。然后通过`kill -9 `的形式，来杀死系统进程。

![](./assets/image/image_MqNlKzHXV0.png)

通过上述的指令，我们可以获取到tomcat的进程号为 79947。接下来，我们就可以通过指令 ，来杀死tomcat的进程 ：

```bash 

kill -9 79947


```


执行完上述指令之后，我们再访问Linux系统中的Tomcat，就访问不到了。

> 注意：
>
> kill命令是Linux提供的用于结束进程的命令， &#x20;
> 注意 ：
>
> 虽然上述讲解的两种方式，都可以停止Tomcat服务，但是推荐使用第一种方式(./shutdown.sh)执行脚本来关闭tomcat服务，如果通过第一种方式停止不了tomcat了，这个时候，我们可以考虑使用第二种方式，强制杀死进程。
