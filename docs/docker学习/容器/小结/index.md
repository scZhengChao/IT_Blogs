# 小结

【1】暂停容器?

> docker pause 容器名

![](./image/image_2nWgnsqbJB.png)

【2】从暂停回到运行容器?

> docker unpause 容器名

![](./image/image_tuJb_kWiiZ.png)

【3】停止容器?

> docker stop 容器名

![](./image/image_4EkWCxGdky.png)

【4】从停止到启动容器?

> docker start 容器名

![](./image/image_MTA-1K7VPb.png)

【5】查看所有运行的容器状态?

可以通过-a参数查看所有状态的容器，包括已经停止的

![](./image/image_YiEK9zSeko.png)

【6】查看容器日志?

> docker logs 容器名

添加 -f 参数可以**持续查看日志**。浏览器访问，不用执行命令，直接在终端输出日志信息。

【7】删除容器

> docker rm 容器名
>
> 不能删除运行中的容器，除非添加 -f 参数
>
> docker rm -f 容器名

![](./image/image_Os4TJaGYS8.png)

【8】docker run命令的常见参数有哪些？

- \--name：指定容器名称
- -p：指定端口映射
- -d：让容器后台运行

```bash 
docker run --name containerName -p 80:80 -d nginx

```
