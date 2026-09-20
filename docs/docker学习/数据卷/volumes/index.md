# volumes

## 目录

- [宿主机位置：](#宿主机位置)
- [查看详细](#查看详细)
- [删除](#删除)
- [匿名卷](#匿名卷)
- [优先级](#优先级)
- [mount](#mount)

Docker将运用与运行的环境打包形成容器运行， **Docker容器产生的数据**，**如果不通过docker commit生成新的镜像，使得数据做为镜像的一部分保存下来**， **那么当容器删除后，数据自然也就没有了。** 为了能保存数据在Docker中我们使用卷。|

卷就是目录或文件，存在于一个或多个容器中，由Docker挂载到容器，但卷不属于联合文件系统（Union FileSystem），因此能够绕过联合文件系统提供一些用于持续存储或共享数据的特性:。

卷的设计目的就是数据的持久化，完全独立于容器的生存周期，因此Docker不会在容器删除时删除其挂载的数据卷。

数据卷的特点:

1.数据卷可在容器之间共享或重用数据 &#x20;
2.卷中的更改可以直接生效 &#x20;
3.数据卷中的更改不会包含在镜像的更新中 &#x20;
4.数据卷的生命周期一直持续到没有容器使用它为止

# 宿主机位置：

`/var/lib/docker`

宿主卷不存在问题、

[ Mac使用docker时，卷默认挂载路径/var/lib/docker/volumes不存在问题\_今天能喝可乐吗的博客-CSDN博客\_/var/lib/docker/volumes 卷默认挂载路径当使用匿名挂载或者具名挂载时，卷会被挂载到默认的/var/lib/docker/volumes路径下。以具名挂载为例，使用docker volume inspect 卷名 ，查看该卷的详细信息。yc@localhost \~ % docker volume inspect juming\[    {        "CreatedAt": "2021-11-11T07:24:22Z",  https://blog.csdn.net/qq\_43758789/article/details/121272433](https://blog.csdn.net/qq_43758789/article/details/121272433 " Mac使用docker时，卷默认挂载路径/var/lib/docker/volumes不存在问题_今天能喝可乐吗的博客-CSDN博客_/var/lib/docker/volumes 卷默认挂载路径当使用匿名挂载或者具名挂载时，卷会被挂载到默认的/var/lib/docker/volumes路径下。以具名挂载为例，使用docker volume inspect 卷名 ，查看该卷的详细信息。yc@localhost ~ % docker volume inspect juming\[    {        \"CreatedAt\": \"2021-11-11T07:24:22Z\",  https://blog.csdn.net/qq_43758789/article/details/121272433")

# 查看详细

```bash 
[root@cos7-1 ~]# docker volume inspect testA
[
    {
        "CreatedAt": "2022-05-07T00:05:37+08:00",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/testA/_data",
        "Name": "testA",
        "Options": {},
        "Scope": "local"
    }
```


卷其实就是宿主机中的某个目录，从上述详细信息中可以看出，testA卷其实就是宿主机中的`/var/lib/docker/volumes/testA/_data`目录，在linux的docker主机中创建一个卷时，其对应的目录路径就是`/var/lib/docker/volumes/卷名/_data`

testA卷已经创建完成，但是没有任何容器使用这个卷，现在，我们来创建一个测试容器，让这个测试容器使用testA卷，创建容器的命令如下：

```bash 
docker run -td --name testAcon --volume testA:/data alpine
```


上述命令表示创建一个名为testAcon的容器，将testA卷映射到testAcon容器的/data目录中，`--volume`选项就是用来映射卷和容器目录的，`--volume testA:/data`表示将testA卷映射到容器的/data目录，上例是基于alpine镜像创建的容器，alipine镜像中默认是没有/data目录的，当卷映射的目录在容器中不存在时，会自动在容器中创建对应的目录。容器创建后，进入容器的/data目录，创建一个名为A.log的文件，如下

```bash 
[root@cos7-1 ~]# docker exec -it testAcon sh
/ # ls /data
/ # cd /data
/data # echo "test volume A" > /data/A.log
/data # cat /data/A.log 
test volume A
/data # exit
[root@cos7-1 ~]# 
```


回到宿主机，查看`/var/lib/docker/volumes/testA/_data`目录，发现多了一个A.log文件，这个文件正是我们在容器中创建的A.log

```bash 
[root@cos7-1 ~]# ls /var/lib/docker/volumes/testA/_data/
A.log
[root@cos7-1 ~]# cat /var/lib/docker/volumes/testA/_data/A.log 
test volume A
```


如果此时我们在宿主机中修改A.log文件的内容，会发现容器中的A.log的内容也随之变化了，因为它们就是同一个文件。 &#x20;
现在，我们停止并删除testAcon容器，可以发现，testA卷中的数据仍然保留在宿主机中。

# 删除

如果确定卷中的数据不需要再使用了，则可以删除对应的卷。使用`docker volume rm`命令即可删除对应的卷，但是删除卷之前，需要先确保卷没有被任何容器引用，如果有容器使用了对应的卷，会提示无法删除，需要先删除对应的容器，示例如下

```bash 
#查看当前卷，有三个，两个命名卷，一个匿名卷，此处以删除匿名卷为例，命名卷操作也是相同的
[root@cos7-1 ~]# docker volume ls
DRIVER    VOLUME NAME
local     86bb1cfa654bbeeefc766131de443ebafbadbccb1e789c4e4cd160698c3bead3
local     testA
local     testB

#尝试删除匿名卷，出现提示，卷正在被容器60afd2...使用，这个ID就是testDcon容器的ID
[root@cos7-1 ~]# docker volume rm 86bb1cfa654bbeeefc766131de443ebafbadbccb1e789c4e4cd160698c3bead3
Error response from daemon: remove 86bb1cfa654bbeeefc766131de443ebafbadbccb1e789c4e4cd160698c3bead3: volume is in use - [60afd20098ed4cb7631ee6eaff5bf4cc9fb5fe8e623c044d95075b637f5d6c9d]

#先停止容器并删除容器
[root@cos7-1 ~]# docker stop testDcon
testDcon
[root@cos7-1 ~]# docker rm testDcon
testDcon

#再次删除卷，已经正常删除了
[root@cos7-1 ~]# docker volume rm 86bb1cfa654bbeeefc766131de443ebafbadbccb1e789c4e4cd160698c3bead3
86bb1cfa654bbeeefc766131de443ebafbadbccb1e789c4e4cd160698c3bead3
[root@cos7-1 ~]# 
[root@cos7-1 ~]# docker volume ls
DRIVER    VOLUME NAME
local     testA
local     testB
```


可以看到，删除卷的前提是，没有引用对应卷的容器存在。 &#x20;
所以，在删除卷或者删除容器时，你可能会有下面两种需求 &#x20;
\*\*一，查看某个容器都使用了哪些卷 &#x20;
二，查看某个卷都被哪些容器使用了 &#x20;
\*\*通过如下两条命令，可以满足我们的需求

```bash 
#通过下例查看testCcon容器都使用了哪些卷
#如下命令其实就是过滤出容器的详细信息中的Mounts段
 #如下示例的testCcon容器使用了两个卷，testA和testB
[root@cos7-1 ~]# docker inspect testCcon -f '{{.Mounts}}'
 [{volume testB /var/lib/docker/volumes/testB/_data /var/log local z true } {volume testA /var/lib/docker/volumes/testA/_data /data local z true }]

# 通过下例查看testA卷被哪些容器使用了
#如下示例中testA卷被testBcon和testCcon两个容器使用了
[root@cos7-1 ~]# docker ps -a -f "volume=testA" 
 CONTAINER ID   IMAGE     COMMAND     CREATED        STATUS                      PORTS     NAMES
9b6d44174554   alpine    "/bin/sh"   21 hours ago   Exited (137) 13 hours ago             testBcon
d8d7470c5d86   alpine    "/bin/sh"   24 hours ago   Exited (137) 13 hours ago             testCcon
```


除了单独删除某个卷，我们还可以批量删除卷，使用`docker volume prune`命令，可以批量删除所有的没有被任何容器使用的卷，由于我的测试环境的testA卷和testB卷都有容器在使用，所以使用`docker volume prune`命令并不能删除它们，为了展示效果，我先提前删除对应的容器

```bash 
#先删除对应的容器
[root@cos7-1 ~]# docker ps -a
CONTAINER ID   IMAGE     COMMAND     CREATED        STATUS                      PORTS     NAMES
9b6d44174554   alpine    "/bin/sh"   24 hours ago   Exited (137) 16 hours ago             testBcon
d8d7470c5d86   alpine    "/bin/sh"   27 hours ago   Exited (137) 16 hours ago             testCcon
[root@cos7-1 ~]# docker rm testBcon
testBcon
[root@cos7-1 ~]# docker rm testCcon
testCcon

#查看现有卷
[root@cos7-1 ~]# docker volume ls
DRIVER    VOLUME NAME
local     testA
local     testB

#执行批量删除命令，会出现确认提示，输入y确认删除所有的没有被任何容器引用的卷
[root@cos7-1 ~]# docker volume prune
WARNING! This will remove all local volumes not used by at least one container.
Are you sure you want to continue? [y/N] y
Deleted Volumes:
testA
testB

Total reclaimed space: 14B

#删除完成后，再次查看卷，已经删除
[root@cos7-1 ~]# docker volume ls
DRIVER    VOLUME NAME
```


# 匿名卷

匿名卷和命名卷相比，多了一个自动删除的特性，当匿名卷与`docker run`命令的`--rm`选项配合使用时，如果容器被停止删除，匿名卷也会随之被自动删除，如果想要搞明白匿名卷自动删除的特性，最好先搞明白`docker run`命令的`--rm`选项的作用，`--rm`选项表示当容器停止时，自动删除对应的容器，示例如下：

```bash 
#创建一个testAcon容器，使用--rm选项，表示当testAcon容器停止时，会被自动删除
[root@cos7-1 ~]# docker run --rm -td --name testAcon alpine
21f6be3ab1fcf96c72586872cc2faccfbdb5fc1e459d7a3128b04ca743f01449

#查看容器已经正常运行
[root@cos7-1 ~]# docker ps
CONTAINER ID   IMAGE     COMMAND     CREATED         STATUS         PORTS     NAMES
21f6be3ab1fc   alpine    "/bin/sh"   6 seconds ago   Up 5 seconds             testAcon

#停止testAcon容器
[root@cos7-1 ~]# docker stop testAcon
testAcon

#再次查看容器，testAcon容器已经被自动删除
[root@cos7-1 ~]# docker ps -a
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```


**如上所示，如果创建容器的时候使用了**\*\*`--rm`****选项，当容器停止时，会被自动删除，当我们频繁的进行测试实验时，****`--rm`\*\***选项非常好用，我们可以多次重复进行实验，避免实验过程中不断的生成多余的容器。**

如果创建容器时使用了`--rm`选项，并且同时使用了匿名卷和命名卷，会发现，当容器停止时，匿名卷会随容器被自动删除，而命名卷不会，实验过程如下

```bash 
#查看容器，查看卷，目前没有任何容器和卷
[root@cos7-1 ~]# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[root@cos7-1 ~]# docker volume ls
DRIVER    VOLUME NAME

#创建容器时，使用--rm选项，同时使用匿名卷和命名卷
[root@cos7-1 ~]# docker run --rm -td --name testAcon -v /data1 -v testA:/data2 alpine
dc7b0414fc411d7e9ad6770767196927c7d117cad66d2c2718e911de832bd1f3

#再次查看卷和容器
[root@cos7-1 ~]# docker volume ls
DRIVER    VOLUME NAME
local     e598d33c3a568d4d5e7de8b932c01d750c92c1ceb071d40d183a555742acd16f
local     testA
[root@cos7-1 ~]# 
[root@cos7-1 ~]# docker ps
CONTAINER ID   IMAGE     COMMAND     CREATED          STATUS          PORTS     NAMES
dc7b0414fc41   alpine    "/bin/sh"   16 seconds ago   Up 16 seconds             testAcon

#停止容器
[root@cos7-1 ~]# docker stop testAcon
testAcon

#发现容器和匿名卷都自动删除了，但是命名卷仍然保留了下来
[root@cos7-1 ~]# docker volume ls
DRIVER    VOLUME NAME
local     testA
[root@cos7-1 ~]# 
[root@cos7-1 ~]# docker ps -a
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```


无论是命名卷还是匿名卷，它们都存放在`/var/lib/docker/volumes`目录中，这个目录是固定的，它们都能被`docker volume`命令管理，除了命名卷和匿名卷，还有一种映射宿主机目录的方法，这种方法被称之为”绑定挂载”，绑定挂载的英文原文为`bind mounts`。绑定挂载能够将指定的宿主机目录挂载到容器中，绑定挂载的使用方法也很简单，仍然是使用`--volume`选项或者`-v`选项，我们只需要将卷名替换成宿主机上的目录路径即可，示例如下：

```bash 
#宿主机上的/root/test1目录如下
[root@cos7-1 ~]# ls /root/test1
a  b

#创建一个容器，将宿主机的/root/test1目录映射到容器的/data1目录中，在进行实验时，可以将/root/test1换成任意其他目录。
[root@cos7-1 ~]# docker run --rm -td --name testAcon -v /root/test1:/data1 alpine
9ccbb91679dd92909817d0de851fe9074345fb668787838ec2304fce8047f735

#进入容器，查看/data1目录，与宿主机中的内容相同，退出容器
[root@cos7-1 ~]# docker exec -it testAcon sh
/ # 
/ # ls /data1
a  b
/ # exit
```


绑定挂载不会生成任何卷，它直接将指定的宿主机目录映射到容器中，所以，`docker volume`命令无法查看或管理到绑定挂载的路径。官方建议使用卷，而不是绑定挂载，但是，绑定挂载有一个优势，就是绑定挂载可以直接将宿主机中的文件（非目录）直接挂载到容器中，比如，将宿主机中的`/etc/localtime`文件映射到容器中的`/etc/localtime`文件

```bash 
docker run --rm -td --name testAcon -v /etc/localtime:/etc/localtime alpine
```


通常，使用绑定挂载就是为了将宿主机中的配置文件挂载到容器中，如果是整个目录的数据，建议使用卷，卷只能映射目录，不能映射文件。

即使通过绑定挂载将宿主机的单个文件挂载到容器中，基于容器通过`docker commit`创建出新的镜像后，新镜像中也不会包含对应文件的数据的。我们可以做一个实验，让A容器使用绑定挂载，把`宿主机的a.log`挂载到`容器的/opt/a.log`（注意：实验时请使用有内容的文件，即确保a.log非空），然后基于A容器创建b镜像，最后基于b镜像创建B容器，进入B容器后，会发现`/opt/a.log`是存在的，但是，`B容器中的/opt/a.log`是一个空文件，没有任何内容，也就是说，`源A容器中绑定挂载的a.log`的内容并没有通过`docker commit`命令提交过来，这是为什么呢？之前说过，卷中的数据是独立于容器的，绑定挂载也一样，它们都是宿主机中的数据，当我们把`宿主机的a.log`挂载到`容器的/opt/a.log`时，容器会创建`'/opt/a.log路径'`作为宿主机文件的`挂载点`，而`'/opt/a.log挂载点路径'`是在`容器A的可读写层`中创建的，所以，当基于容器A创建新镜像时，挂载点路径（空文件）也被提交到了新镜像中，但是真正的宿主机文件（数据）并没有随之提交，这就是出现上述现象的原因，具体过程这里就不演示了，快动手试一下吧。

# 优先级

在使用卷或者绑定挂载进行实验时，你可能会纠结一个问题，就是数据覆盖问题，在映射之前，卷和宿主机目录可能为空或者非空，容器目录可能为空或者非空，那么在映射后，到底以哪里的数据为准呢？我总结了一张表，表中写明了映射前后的数据关系（有些容器目录比较特殊，比如/etc，因为/etc目录中有挂载的hosts文件等）。

![](./assets/image/image_2engVo95tb.png)

# mount

上文中，无论是使用命名卷、匿名卷还是绑定挂载，都在使用`--volume`选项或者`-v`选项，其实，除了这两个选项，还有另一个选项，也能实现同样的效果，这个选项就是`--mount`，`--mount`选项的使用示例如下

```bash 
#创建容器test1，使用命名卷testA，映射到容器的/data目录
docker run -td --name test1 --mount type=volume,source=testA,target=/data alpine

#创建容器test2，使用匿名卷，映射到容器的/data目录
docker run -td --name test2 --mount type=volume,target=/data alpine

#创建容器test3，使用绑定挂载，将宿主机的/root/test1目录挂载到/data目录
docker run -td --name test3 --mount type=bind,source=/root/test1/,target=/data alpine
```


可见，`--mount`选项的写法似乎更加清晰，在`--mount`选项中，`type`用于指定挂载类型，上例中的`type=volume`表示使用卷，`type=bind`表示使用绑定挂载，无论是命名卷还是匿名卷，都使用`type=volume`，当使用卷时，如果使用的是命名卷，就使用`source`参数指定对应的卷名，如果使用匿名卷，则省略`source`参数，`target`参数用于指定将卷或者宿主机目录挂载到容器的哪个目录上，如果使用绑定挂载，`source`参数对应宿主机上的目录。

上例中，`source`参数可以写成`src`，`target`参数可以写成`dst`或者`destination`，即如下两条命令是等效的。

```bash 
docker run --rm -td --name test4 --mount type=volume,src=testB,dst=/data alpine
docker run --rm -td --name test4 --mount type=volume,source=testB,target=/data alpine
```


除了上文聊到的`-v`选项、`--mount`选项，还有一个选项我们可能也会用到，它就是`--volumes-from`选项，`--volumes-from`选项可以让一个容器去使用另一个容器的卷，比如：容器A使用了两个卷，当我们创建容器B时，明确告诉容器B：“容器A用了哪些卷，你就用哪些卷”，就好像让B去抄A的作业一样，示例如下

```bash 
#首先，查看一下当前卷列表，没有任何卷
[root@cos7-1 ~]# docker volume ls
DRIVER    VOLUME NAME

 #创建一个test1容器，如下，test1容器使用了一个匿名卷，一个testA卷，一个绑定挂载的宿主机目录
[root@cos7-1 ~]# docker run -td --name test1 -v /data -v testA:/data1 -v /root/test1:/data2 alpine
 c1fd78c3ef6ac1e0544646deaf65aed24d8aef47d849e5199c954b6a9308dc52

#再次查看卷列表，匿名卷和testA卷已经自动创建了
[root@cos7-1 ~]# docker volume ls
DRIVER    VOLUME NAME
local     7f58548a996cb64f17c0a1e4679e9cf88c6fc87751623f090280f9651b85db81
local     testA

 #此时，创建一个test2容器，下例命令中的--volumes-from test1表示让test2照抄test1的卷（以及绑定挂载）
[root@cos7-1 ~]# docker run -td --name test2 --volumes-from test1  alpine
 d7ac879750abb71480cfe630c379466db5d2c713b80b39a2451d0493ec814c49

#查看test1容器和test2容器的挂载列表，发现它们挂载的卷（以及宿主机目录）都是相同的，对应的容器中的目录也是相同的。
[root@cos7-1 ~]# docker inspect test1 -f '{{.Mounts}}'
[{volume testA /var/lib/docker/volumes/testA/_data /data1 local z true } {bind  /root/test1 /data2   true rprivate} {volume 7f58548a996cb64f17c0a1e4679e9cf88c6fc87751623f090280f9651b85db81 /var/lib/docker/volumes/7f58548a996cb64f17c0a1e4679e9cf88c6fc87751623f090280f9651b85db81/_data /data local  true }]
[root@cos7-1 ~]# 
[root@cos7-1 ~]# docker inspect test2 -f '{{.Mounts}}'
[{volume 7f58548a996cb64f17c0a1e4679e9cf88c6fc87751623f090280f9651b85db81 /var/lib/docker/volumes/7f58548a996cb64f17c0a1e4679e9cf88c6fc87751623f090280f9651b85db81/_data /data local  true } {volume testA /var/lib/docker/volumes/testA/_data /data1 local  true } {bind  /root/test1 /data2   true rprivate}]
[root@cos7-1 ~]# 
```


`--volumes-from`选项也可以多次使用，从而指定多个容器，比如

```bash 
--volumes-from test3 --volumes-from test5
```
