# COPY vs ADD

其实不只是 ENTRYPOINT 和 CMD 相似，dockerfile 里还有一对指令也比较相似，就是 ADD 和 COPY。

这俩都可以把宿主机的文件复制到容器内。

但有一点区别，**就是对于 tar.gz 这种压缩文件的处理上：**

我们创建一个 aaa 目录，下面添加两个文件：

![](./assets/image/image_osslRIFE5D.webp)

使用 tar 命令打包：

```docker 
tar -zcvf aaa.tar.gz ./aaa

```


![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f69017d69794f64b7412964fbbd11a2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

然后写个 555.Dockerfile

```docker 
FROM node:18-alpine3.14

ADD ./aaa.tar.gz /aaa

COPY ./aaa.tar.gz /bbb

```


docker build 生成镜像：

```docker 
docker build -t add-test -f 555.Dockerfile .

```


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a40fdaed48df45bfb3d0b868c2cef58a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

docker run 跑起来：

```docker 
docker run -d --name sixth-container add-test

```


![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7e0e3abaeb7423e930d5b22c66f2f86~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可以看到 **，ADD 把 tar.gz 给解压然后复制到容器内了。**

![](./assets/image/image_ek_y_WIJKV.webp)

而 COPY 没有解压，它把文件整个复制过去了：

![](./assets/image/image_p0uhZ6dmrg.webp)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7e0f945732b4a0cb9d506f60f9d370d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**也就是说，ADD、COPY 都可以用于把目录下的文件复制到容器内的目录下。**

**但是 ADD 还可以解压 tar.gz 文件。**

一般情况下，还是用 COPY 居多。
