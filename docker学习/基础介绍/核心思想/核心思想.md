# 核心思想

## 目录

- [基础路径](#基础路径)
- [dockerfile](#dockerfile)

# 基础路径

在 Dockerfile 中，***每一行的指令都可以理解为一个单独的 layer***，因此指令之间都是独立存在的，也就是下面这样的语句其实是无效的

```typescript 
RUN cd ./src

COPY docs /var/web
```


此时如果构建镜像的话，就会提示找不到docs目录，原因就是上面所说的 Dockerfile 中的每一级的指令都是独立的，虽然第一行是 cd src 了，***但是到了 COPY 指令，实际还是在根目录下***，根目录下面并没有docs的文件夹，因此才会报错了。

这个时候可以使用 `WORKDIR` 指令，指定接下来的所有指令的基础路径。

```typescript 
WORKDIR ./src

# 下面的所有指令都是基于src的文件夹去执行的
```


# dockerfile

```typescript 
# 第一阶段
FROM node:16-buster-slim as builder

LABEL description="A demo Dockerfile for build Docsify."

COPY . /var/web/

RUN set -x \
  && cd /var/web \
  && npm install \
  && npm run build

# 第二阶段
FROM nginx:1.23.1-alpine as prod

EXPOSE 80
COPY --from=0 /var/web/docs /usr/share/nginx/html
CMD [ "nginx", "-g", "daemon off;" ]
```


可以看到`FROM`指令最后有一个`as xxx`这种形式的声明，它表示每一阶段构建的名称，利用这个名称，可以只构建某一阶段的镜像：

```typescript 
docker build --target builder -t docify/blog .

```


接着`EXPOSE`指令暴露了80端口，注意这里只是***表明了暴露的端口是多少***，并不是设置了端口，因为***实际的端口实际是容器中 nginx 端口***。该指令只是起到了一个说明的作用。

`COPY`指令上面已经说过了，区别就在于这里多了一个`form=0`，这表示从***第0阶段生成的结果中拿到 install 好的文件去拷贝到 nginx 的目录***下。
