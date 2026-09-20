# 通过 Desktop 学 Docker 也太简单了

[ 通过 Desktop 学 Docker 也太简单了 - 掘金 后端系统会部署很多服务，包括我们自己开发的服务，还有 mysql、redis 等中间件的服务，部署它们需要一系列依赖的安装、环境变量的设置等等。 如果你要部署多台机器的话，同样的操作要重复多次，万一哪 https://juejin.cn/post/7237424021759180857](https://juejin.cn/post/7237424021759180857 " 通过 Desktop 学 Docker 也太简单了 - 掘金 后端系统会部署很多服务，包括我们自己开发的服务，还有 mysql、redis 等中间件的服务，部署它们需要一系列依赖的安装、环境变量的设置等等。 如果你要部署多台机器的话，同样的操作要重复多次，万一哪 https://juejin.cn/post/7237424021759180857")

&#x20;     后端系统会部署很多服务，包括我们自己开发的服务，还有 mysql、redis 等中间件的服务，部署它们需要一系列依赖的安装、环境变量的设置等等。

如果你要部署多台机器的话，同样的操作要重复多次，万一哪一步漏掉了，服务就跑不起来了。
就很麻烦。
而 Docker 就能完美解决这个问题：
**它把系统的所有文件封装成一个镜像，镜像跑起来作为容器，它可以在一台机器上跑多个容器，每个容器都有独立的操作系统环境**，比如文件系统、网络端口等，在容器内跑各种服务。

![](./assets/image/image_KF5hkDX0o7.png)

**这也是为什么它的 logo 是这样的：**

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a395455ab5941d8af56a0342efda985~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

`Docker` 提供了 `Docker Hub` 镜像仓库，可以把本地镜像 push 到仓库或者从仓库 pull 镜像到本地。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f8ed80edf034c44a5f8a5ce4a03315d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

我们 pull 个镜像下来试试看：

首先需要安装 Docker，直接从[官网](https://link.juejin.cn/?target=https://docker.com "官网")下载 docker desktop 就行：

![](./assets/image/image_w6IdZDPGHd.png)

它内置了 docker 命令。

把它安装到系统之后，可以在命令行看下 docker 命令是否可用：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d84cf0ec2b25421286d57b35dd1a0093~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](./assets/image/image_99F4yiVu8S.png)

如果不可用，那要设置下这个：

![](./assets/image/image_bBmPzyAaDM.png)

点击 Settings > Advanced，里面有两种安装路径，**如果是 /user/local/bin，那 docker 命令就是直接可用的**，因为这个路径在 PATH 变量里。

如果是第二种，那就需要**手动把 \$HOME/.docker/bin 加到 PATH 环境变量里。**

然后我们来看看 docker desktop 的界面：

![](./assets/image/image_lDfchsspdd.png)

![](./assets/image/image_f95VUB9t4x.png)

images 是本地的所有镜像，containers 是镜像跑起来的容器。

docker desktop 可以可视化的管理它们，很方便。

我们 pull 一个镜像试试看。

![](./assets/image/image_0Vc5FG2rp5.png)

搜索 nginx 镜像，点击 pull（搜索这步需要科学上网，不然搜不到）。

pull 下来之后，就可以在本地 images 看到了：

![](./assets/image/image_7XIFPp9lmY.png)

点击 run 会让你填一些参数：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/555e97e310c74081912888dccda95e6a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

首先是名字，如果不填，docker desktop 会给你**生成随机的容器名字**。

就是这种：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40fbead5cd9c411ab3e65a688c69aef5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

然后是端口，容器内跑的\*\* nginx 服务是在 80 端口\*\*，你要把宿主机的某个端口映射到容器的 80 端口才可以访问。

接下来是**数据卷 volume，这个是把宿主机某个目录挂到容器内。**(必须是**绝对路径**)

因为容器是镜像跑起来的，下次再用这个镜像跑的还是同样的容器，那你在容器内保存的数据就会消失。

所以我们都是把某个宿主机目录，挂载到容器内的某个保存数据的目录，这样数据是保存在宿主机的，下次再用镜像跑一个新容器，只要把这个目录挂载上去就行。

挂载本地的 /tmp/aaa 到容器内的 /user/share/nginx/html 目录。

点击 run：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3dab38ba7546426781ad5990f7ec4e7a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可以看到容器内的 nginx 服务跑起来了。

我们在 /tmp/aaa 目录下添加一个 index.html:

至于环境变量，这个就很容易理解了。

我们分别设置一下：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2cbaaf6efbf488ab841a54cfbf3c070~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

挂载本地的 /tmp/aaa 到容器内的 /user/share/nginx/html 目录。

点击 run：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3dab38ba7546426781ad5990f7ec4e7a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可以看到容器内的 nginx 服务跑起来了。

我们在 /tmp/aaa 目录下添加一个 index.html:

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2c2fb3ca0db45d8b8936a1bfebecad1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

浏览器访问 [http://localhost](https://link.juejin.cn/?target=http://localhost "http://localhost") 就可以访问到：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76c805c5de3b47d0bae4c39141a5631b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这就说明数据卷挂载成功了。

点击 files 标签就可以看到容器内的文件。

可以看到 /usr/share/nginx/html **被标识为 mounted**，就是挂载目录的意思：

![](./assets/image/image_H3f-oc-E5E.png)

我们再在本地添加一个文件：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5638889e8e8048c4878536f9d2d0bef0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

你会发现容器内这个目录内容也变了：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5dda62645e84ed18665bcbd32cc5a66~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](./assets/image/image_T4yAghoV6x.png)

这就是 volume 挂载的作用。

如果你**挂载某些目录报错**，是因为 `docker desktop` 挂载的目录是需要配置的，在 `Settings` > `Resources` > `File Sharing` 里加一下就行：

至于**挂载到的目录，在镜像搜索结果页有写**：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bbe1e0dc98d4d799250d74c9da153a4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

通过命令行 docker run 来跑镜像， **-v 是指定挂载的数据卷**，**后面的 :ro 代表 readonly**，也就是容器内这个目录只读，**:rw 表示容器内可以读写这个目录。**

这就是数据卷的作用。

此外，你还可以**进入到容器内执行各种命令**：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bcafb3239c1e4469a3a1e90ffa79dc49~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

是不是感觉 docker 学起来还挺简单的？

docker 常用的就是这些东西。

当然，在服务器上没有 Docker Desktop 这种东西，还是要敲命令的。

比如我们点击 pull 按钮，就相当于执行了 docker pull：

```bash 
docker pull nginx:latest

```


latest 是标签，也就是这个：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d438a6f7ef5442abcea39f0c62e6301~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

然后我们点击 run 按钮，**填了个表单，就相当于执行了 docker run**：

```bash 
docker run --name nginx-test2 -p 80:80 -v /tmp/aaa:/usr/share/nginx/html -e KEY1=VALUE1 -d nginx:latest 


```


-p 是端口映射

-v 是指定数据卷挂载目录

-e 是指定环境变量

-d 是后台运行

对照下前面可视化界面，是不是瞬间就懂了：

![](./assets/image/image_R_NnnwFJPo.png)

docker run 会**返回一个容器的 hash：**

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97c622d43fdf401da3b324496710accc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

就是这里的 id：

![](./assets/image/image_4XpixIote0.png)

这个**界面可以用 docker ps 来获取：**

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/637543ff05444c1bb8fb2eec3cce63e0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

它是显示容器列表的，**默认是运行中的。**

想显示全部的，**可以加个 -a**

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24d3bc05e98d4af4bf5fa48a2b47a1bb~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

除了 container 列表，image 镜像列表也可以通过\*\* docker images\*\* 命令获取：

![](./assets/image/image_H_08xGOR2F.png)

我们在容器的 terminal 里执行命令，对应的是 **docker exec** 命令：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/402924b76ba84361b4dd48aa4db8d1a4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0601c124b48e414ca4b22b93d6e433d7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**-i 是 terminal 交互的方式运行**

**-t 是 tty 终端类型**

然后指定**容器 id 和 shell 类型，就可以交互的方式在容器内执行命令了。**

查看日志，对应 **docker logs** 命令：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d86752e576824bd58a97b118377abbbd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fec0abf5d94f407f91fed3e240db77d9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

输入 `exit` 退出：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0262e0d045f74b5cb3cce2aaf44ea057~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**docker inspect 可以**查看**容器的详情**

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7754966f9a64d49b8110e35c7f0551f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

对应 `desktop` 里的 `inspect` 的 tab：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24cd735b47634d948e4fb3999624e41e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

`docker volume` 可以管理数据卷：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bfbe4013bbf4fe1b2e272ba7e95c196~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

对应 desktop 的这部分：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b4ec0dff7b74ae68727c786028fb22e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

此外，还有这些常用命令：

- docker start：启动一个已经停止的容器
- docker rm：删除一个容器
- docker stop：停止一个容器

都可以通过 docker desktop 很方便的操作。

那如果我们要自己制作一个这样的镜像，怎么做呢？

docker 容器内就是一个独立的系统环境，想想如果在这样一个系统上，要安装 nginx 服务，怎么做呢？

需要执行一些命令、复制一些文件进来，然后启动服务。

制作镜像自然也要进行这样的过程，不过可以自动化。

**只要在 dockerfile 里声明要做哪些事情，docker build 的时候就会根据这个 dockerfile 来自动化构建出一个镜像来。**

```docker 
FROM node:latest

WORKDIR /app

COPY . .

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "-p", "8080"]

```


这些指令的含义如下：

- FROM：基于一个基础镜像来修改
- WORKDIR：指定当前工作目录
- COPY：把容器外的内容复制到容器内
- EXPOSE：声明当前容器要访问的网络端口，比如这里起服务会用到 8080
- RUN：**在容器内执行命令**
- CMD：**容器启动的时候执行的命令**

我们先通过 FROM 继承了 node 基础镜像，里面就有 npm、node 这些命令了。

通过 WORKDIR 指定当前目录。

然后通过 COPY 把 Dockerfile 同级目录下的内容复制到容器内，这里的 . 也就是 /app 目录

之后通过 RUN 执行 npm install，全局安装 http-server

通过 EXPOSE **指定要暴露的端口**

CMD 指定容器跑起来之后执行的命令，这里就是执行 http-server 把服务跑起来。

把这个文件保存为 Dockerfile，然后在同级添加一个 index.html

![](./assets/image/image_5hF2tEkC5v.png)

然后通过 docker build 就可以根据这个 dockerfile 来生成镜像。

```bash 
docker build -t aaa:ccc .

```


**aaa 是镜像名，ccc 是镜像的标签**

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78b75cad62c14aa5bde5455b81fe817c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

FROM 是继承一个基础镜像，看输出也可以看出来，**前面都是 node 镜像的内容，会一层层下载下来。**

最后才是本地的我们添加的那些。

这时你在 desktop 的 images 列表里就可以看到这个镜像了：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29f516c1f3874802b3822e2b61d071d7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

然后执行 docker run 把这个镜像跑起来，用 desktop 我们就直接点击 run 按钮了：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78eaea612f654aae896f8760a0b860de~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

会让你输入这些内容：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e791bc3f1bbb4dc8bf8698c556618cb7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

是不是上节用 nginx 镜像的感觉回来了？这次是我们自己 build 的镜像。

指定容器名、映射的端口、点击 run：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91c03c09b625413bbb3afde49c073572~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

然后可以看到容器内的日志，服务启动成功了：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ab0a16d25054400a07f53ac683d1c30~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

当然，容器内打印的是 8080 端口，但在容器外要用映射的 8888 端口访问：

访问 [http://localhost:8888](https://link.juejin.cn?target=http://localhost:8888 "http://localhost:8888") 就可以看到我们在 html 写的内容了：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90d4381f765f4980be3bc24f523fc96d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**在容器内页打印了一条访问日志：**

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2874fd653694bf1a3ca88edf058cce5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

至此，我们写的第一个 dockerfile 和 build 出的第一个镜像就跑成功了！

**我们在 files 里看看 /app 下是啥内容：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3301630ab724feabdde84a9cc1fcc21~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

双击 index.html，可以看到这就是我们 build 镜像的时候 COPY 进去的文件。

但是我们想修改静态文件怎么办呢？

进入容器内改太麻烦，不如把这个 /app 目录设置为挂载点吧。

这样改下 Dockerfile：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/694c7d53c1f64ef4972cb1beda771ba8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

然后重新 build 出一个镜像来：

```bash 
docker build -t aaa:ddd -f 2.Dockerfile

```


因为现在不是**默认的 Dockerfile 了，需要用 -f 指定下 dockefile 的文件名。**

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b16cdc1821fe4f1e8d0f2d3827832c52~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

构建完之后再 run 一下这个新镜像：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd9d4f456c7c4554a7cedf33a0ee15a7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这次我把我的桌面目录作为数据卷挂载到 /app 目录了：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10602e44e26f4e019c26276ac59947ca~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/432ed7adea09434a9055134b95899c5e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

容器跑起来后可以看到确实挂载上去了，也标识为了 mount：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd2ca0036d214d5c991da9d67ea08cd8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

浏览器访问下：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/464690f71f7e46b79b300ba16416a725~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

在 inspect 这里也可以看到挂载的目录：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f681b0ce058d48e4b9c0e374bdb03d18~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**有同学说，就算不在 dockerfile 里指定 VOLUME，我还是可以 docker run 的时候通过 -v 挂载数据卷呀。**

**那我为啥还要指定 VOLUME？**

在 dockerfile 里指定 VOLUME 之后，如果你 docker run 的时候**没有带 -v**，那会**放在一个临时的目录里**。

比如我直接点击 run，不设置参数：

![](./assets/image/image_x6mxaFrkw8.png)

docker 会随机给他生成一个名字。

还会随机生成一个目录作为数据卷挂载上去：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e5e60a80cab49a595ae9aa7cc083881~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**inspect 可以看到这时候的路径是一个临时的目录：**

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42c87675dbf64458a343c3f349eb736a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这样就算你删了容器，数据也可以在这里找回。

设想下，如果你跑了个 mysql 容器，存了很多数据，但是跑容器的时候没指定数据卷。有一天，你把容器删了，所有数据都没了，可不可怕？

为了避免这种情况，mysql 的 **dockerfile 里是必须声明 volume 的**，这样就算你**没通过 -v 指定数据卷，将来也可以找回数据。**

在镜像详情可以看到 mysql 的 dockerfile，确实声明了 volume

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f8305a1fec941b58a29d40fe46ae6c0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这样就能保证数据不丢失。
