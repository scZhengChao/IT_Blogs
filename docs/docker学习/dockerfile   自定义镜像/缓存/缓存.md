# 缓存

## 目录

- [nginx 的 try\_files 指令](#nginx-的-try_files-指令)
- [长期缓存 (Long Term Cache)](#长期缓存-Long-Term-Cache)
- [nginx.conf](#nginxconf)

```bash 
FROM node:14-alpine as builder

WORKDIR /code
#ENV PUBLIC_URL https://shanyue-cra.oss-cn-beijing.aliyuncs.com/Ω
# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
ADD package.json package-lock.json /code/
RUN npm i

ADD . /code
# 单独分离 public/src，是为了避免 ADD . /code 时，因为 Readme/nginx.conf 的更改避免缓存生效
# 也是为了 npm run build 可最大限度利用缓存
#ADD public /code/public
#ADD src /code/src

RUN pwd
RUN ls
RUN npm run build


# 选择更小体积的基础镜像
FROM nginx:alpine
 ADD nginx.conf /etc/nginx/conf.d/default.conf  
 COPY --from=builder code/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```


## nginx 的 try\_files 指令

在 nginx 中，可通过 try\_files 指令将所有页面导向 `index.html`。

```nginx 
location / {

  # 如果资源不存在，则回退到 index.html
  try_files  $uri $uri/ /index.html;  

}
```


## 长期缓存 (Long Term Cache)

在 CRA 应用中，`./build/static` 目录均由 webpack 构建产生，资源路径将会带有 hash 值

```nginx 
$ tree ./build/static
./build/static
├── css
│   ├── main.073c9b0a.css
│   └── main.073c9b0a.css.map
├── js
│   ├── 787.cf6a8955.chunk.js
│   ├── 787.cf6a8955.chunk.js.map
│   ├── main.a3facdf8.js
│   ├── main.a3facdf8.js.LICENSE.txt
│   └── main.a3facdf8.js.map
└── media
    └── logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg

3 directories, 8 files
```


此时可通过 `expires` 对它们配置一年的长期缓存，它实际上是配置了 `Cache-Control: max-age=31536000` 的响应头。

那为什么带有 hash 的资源可设置长期缓存呢: **资源的内容发生变更，他将会生成全新的 hash 值，即全新的资源路径。** 而旧有资源将不会进行访问。

```nginx 
location /static {
    expires 1y;
}
```


# nginx.conf

```nginx 
server {
    listen       80;
    server_name  localhost;

    root   /usr/share/nginx/html;
    index  index.html index.htm;

    location / {
        # 解决单页应用服务端路由的问题
        try_files  $uri $uri/ /index.html;  

        # 非带 hash 的资源，需要配置 Cache-Control: no-cache，避免浏览器默认为强缓存
        expires -1;
    }

    location /static {
        # 带 hash 的资源，需要配置长期缓存
        expires 1y;
    }
}
```


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


第二行的`LABEL`指令不对镜像的构建产生作用，只是一个记录信息的指令，按照 key、value 的格式，可以用来记录诸如作者、版本等元数据信息，类比到前端的话，就是和`meta`标签的作用类似。
