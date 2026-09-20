# 使用多阶段构建

## 目录

- [这时可以用多阶段构建：](#这时可以用多阶段构建)
- [缓存package](#缓存package)
  - [dockerfile](#dockerfile)
  - [最后的dockerfile](#最后的dockerfile)

看下这个 `dockerfile`，大家发现有啥问题没：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c5c7b72c0e74681a19d9a9627c9e7b2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

有的同学可能会说：为什么先复制 `package.json` 进去，安装依赖之后再复制其他文件，直接全部复制进去不就行了？

不是的，这两种写法的效果不同。

**docker 是分层存储的，dockerfile 里的每一行指令是一层，会做缓存。**

**每次 docker build 的时候，只会从变化的层开始重新构建，没变的层会直接复用。**

也就说现在这种写法，如果 package.json 没变，那么就不会执行 npm install，直接复用之前的。

**那如果一开始就把所有文件复制进去呢？**

那不管 package.json 变没变，任何一个文件变了，都会重新 npm install，这样没法充分利用缓存，性能不好。

我们试试看就知道了：

现在重新跑 docker build，不管跑多少次，速度都很快，因为文件没变，直接用了镜像缓存：

```bash 
docker build -t dockerfile-test:second .

```


![](./assets/image/image_xDmO7U9ZTH.png)

现在我们改下 [README.md](http://README.md "README.md")：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adb9d4044cc04dcaae887870b0466a05~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

然后重新跑 build：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/337d91042adb49cd8d9160967db512ea~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

现在花了 25s，其实是没有重新 npm install 的。

然后改下 package.json：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9607cdf0b15b444b9b70c77fad0e64e3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

再跑 docker build

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5a7bfbfd74640439fde65550d86033d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**时间明显多了很多，过程中你可以看到在 npm install 那层停留了很长时间。**

**这就是为什么要这样写：**

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a82acd8cbb784530a8aa03566a023440~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这里没问题，大家还能发现有没有什么别的问题么？

**问题就是源码和很多构建的依赖是不需要的**，但是现在**都保存在了镜像里。**

实际上我**们只需要构建出来的 ./dist 目录下的文件还有运行时的依赖。**

那怎么办呢？

## 这时可以用多阶段构建：

```docker 
FROM node:18-alpine3.14 as build-stage

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18-alpine3.14 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]


```


FROM 后面添**加一个 as 来指定当前构建阶段的名字。**

通过\*\* COPY --from=xxx 可以从上个阶段复制文件过来\*\*。

然后 npm install 的时候添加 --production，这样只会安装 dependencies 的依赖。

**docker build 之后，只**会留**下最后一个阶段的镜像。**

也就是说，最终构建出来的镜像里是没有源码的，有的只是 dist 的文件和运行时依赖。

这样镜像就会小很多。

我们来试试看：

```docker 
docker build -t dockerfile-test:third -f 222.Dockerfile .

```


**标签为 third。**

**-f 是指定 Dockerfile 的名字。**

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0614454fe6394bb1bdd6d7477c25f623~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

然后 desktop 里看下构建出来的镜像：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a36847acfb7e4d9d8f23e27ebf8d5c1b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

镜像体积比没有用多阶段构建的时候小了 250 M。

然后跑起来试试看：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8860c194ad40429b835883f0a9464718~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这次映射 2335 端口到容器内的 3000 端口。

依然能正常访问：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ab205faff4e4d33b6c0962aba48df5a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

# 缓存package

将命令通过以下几步翻译为一个 Dockerfile：

1. 选择一个基础镜像。由于需要在容器中执行构建操作，我们需要 node 的运行环境，因此 `FROM` 选择 node。
2. 将以上几个脚本命令放在 `RUN` 指令中。
3. 启动服务命令放在 `CMD` 指令中。

***我们注意到，一个前端项目的耗时时间主要集中在两个命令：***

1. ***npm i (yarn)***
2. ***npm run build***

***在本地环境中，如果没有新的 npm package 需要下载，不需要重新 npm i。***

构建完成。然而还可以针对以下两点进行优化。

1. 构建镜像时间过长，**优化构建时间**。
2. 构建镜像文件过大，**优化镜像体积**。

在本地环境中，如果没有新的 npm package 需要下载，不需要重新 npm i。

**那 Docker 中是不也可以做到这一点？**

在 Dockerfile 中 \*\*，**[\*\*对于 \*\*](https://docs.docker.com/engine/reference/builder/#add "对于 ")[**ADD**](https://docs.docker.com/engine/reference/builder/#add "ADD")[\*\* 指令\*\*​](https://docs.docker.com/engine/reference/builder/#add " 指令")**来讲，如果添加文件内容的 ****`checksum`**** 没有发生变化，则可以**[**利用构建缓存**](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache "利用构建缓存")**。而对于前端项目而言，如果 ****`package.json/yarn.lock`**** 文件内容没有变更，则无需再次 ****`npm i`****。\*\*

将 `package.json/yarn.lock` 事先置于镜像中，安装依赖将可以获得缓存的优化，优化如下。

#### dockerfile

```docker 
FROM node:14-alpine as builder

WORKDIR /code

 # 单独分离 package.json，是为了安装依赖可最大限度利用缓存
 ADD package.json yarn.lock /code/
RUN yarn

ADD . /code
RUN npm run build

# 选择更小体积的基础镜像
FROM nginx:alpine
COPY --from=builder code/build /usr/share/nginx/html
```


[部署 CRA：Docker 缓存优化技术以及多阶段构建 | 前端部署十五篇 | 大厂面试  https://q.shanyue.tech/deploy/cra-docker.html#dockerfile](https://q.shanyue.tech/deploy/cra-docker.html#dockerfile "部署 CRA：Docker 缓存优化技术以及多阶段构建 | 前端部署十五篇 | 大厂面试  https://q.shanyue.tech/deploy/cra-docker.html#dockerfile")

docker 是分层存储的，dockerfile 里的每一行指令是一层，会做缓存。

每次 d**ocker build 的时候，只会从变化的层开始重新构建，没变的层会直接复用。**

#### 最后的dockerfile

```nginx 
FROM node:14-alpine as builder

WORKDIR /code

 # 单独分离 package.json，是为了 yarn 可最大限度利用缓存
 ADD package.json yarn.lock /code/
 RUN yarn

# 单独分离 public/src，是为了避免 ADD . /code 时 ，因为 Readme/nginx.conf 的更改避免缓存生效 
# 也是为了  npm run build 可最大限度利用缓存
 ADD public /code/public
ADD src /code/src
 RUN npm run build

# 选择更小体积的基础镜像
FROM nginx:alpine
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder code/build /usr/share/nginx/html
```


[Docker Layer 缓存机制及前端构建优化](<./Docker Layer 缓存机制及前端构建优化/index.md> "Docker Layer 缓存机制及前端构建优化")
