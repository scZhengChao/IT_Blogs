# 使用 ARG 增加构建灵活性

我们写一个 test.js

```javascript 
console.log(process.env.aaa);
console.log(process.env.bbb);

```


打印了环境变量 aaa、bbb

跑一下：

```bash 
export aaa=1 bbb=2
node ./test.js

```


可以看到打印了这俩环境变量：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd86890fe8ab4ab394a0be5d708863c9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

然后我们写个 dockerfile，文件名是 333.Dockerfile：

```docker 
FROM node:18-alpine3.14

ARG aaa
ARG bbb

WORKDIR /app

COPY ./test.js .

ENV aaa=${aaa} \
    bbb=${bbb}

CMD ["node", "/app/test.js"]

```


**使用 ARG 声明构建参数，使用 \${xxx} 来取**

然后用 ENV 声明环境变量。

**dockerfile 内换行使用 \\**

之后构建的时候传入构建参数：

```bash 
docker build  --build-arg aaa=3 --build-arg bbb=4  -t arg-test -f 333.Dockerfile .
```


**通过 --build-arg xxx=yyy 传入 ARG 参数的值。**

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/052f8b4d301e4724984deffdf64da266~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

点击查看镜像详情，可以看到 ARG 已经被替换为具体的值了：

![](./assets/image/image_V6aW_2PAaG.png)

![](./assets/image/image_4db6qYdaIT.png)

然后跑起来：

```docker 
docker run  --name fourth-container arg-test

```


这次就不用 -d 后台运行了，直接看下日志：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3a15c10087044fda31bcc99b6ce7db1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可以看到容器内拿到的环境变量就是 ENV 设置的。

也就是说 ARG 是构建时的参数，ENV 时运行时的变量。

灵活使用 ARG，可以增加 dockerfile 的灵活性。
