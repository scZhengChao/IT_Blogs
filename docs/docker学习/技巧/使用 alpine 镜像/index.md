# 使用 alpine 镜像

## 目录

- [使用 alpine 镜像，而不是默认的 linux 镜像](#使用-alpine-镜像而不是默认的-linux-镜像)

## 使用 alpine 镜像，而不是默认的 linux 镜像

docker 容器内跑的是 linux 系统，各种镜像的 dockerfile 都会继承 linux 镜像作为基础镜像。

比如我们刚刚创建的那个镜像，点开详情可以看到它的镜像继承关系：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7b4e66157f04e6db41c120223e1181c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

最终还是继承了 debian 的 Linux 镜像，这是一个 linux 发行版。

但其实这个 linux 镜像可以换成更小的版本，也就是 alpine。

它裁剪了很多不必要的 linux 功能，使得镜像体积大幅减小了。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/786525d5a5fa49e492bb70a6fc22af5d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**alpine 是高山植物，就是很少的资源就能存活的意思。**

我们改下 dockerfile，使用 alpine 的镜像：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e94bfb985f244cd8447778d28b938ec~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

node:18-alpine3.14 是使用 18 版本的 node 镜像，它底层使用 alpine 3.14 的基础镜像。

然后 docker build

```docker 
docker build -t dockerfile-test:second .

```


![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fceb38d17b540e8a792eaa702b7fba8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这次的 tag 为 second。

然后在 docker desktop 里看下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ad3b246c6f74294b0bcaf68811b8719~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

好家伙，足足小了 900M。

我们点开看看：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f64dcd18ace42b695220fd46b794f3d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可以看到它的底层 linux 镜像是 alpine3.14。

体积小了这么多，功能还正常么？

我们跑跑看：

```docker 
docker run -d -p 2334:3000 --name second-container dockerfile-test:second

```


![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/296e3082a1fa427abacce2129f9aea06~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

docker desktop 可以看到这个跑起来的容器：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a581340a62694ef7a81439ad900f1357~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

浏览器访问下，依然是正常的：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ad33cfcc58e425b938620683d617bf2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

alpine 只是去掉了很多 linux 里用不到的功能，使得镜像体积更小。
