# 改动不频繁的内容往前放

通过前文介绍过的原理，可以知道，**对于一个 Docker image 有 ABCD 四层，B 修改了，那么 BCD 会改变。**

根据这个原理，我们在构建的时候可以将**系统依赖往前写**，因为像 apt, dnf 这些安装的东西，是很少修改的。然后写应用的库依赖，比如 pip install，最后 copy 应用。

比如下面这个 Dockerfile，就会在每次代码改变的时候都重新 Build 大部分 layers，即使只改了一个网页的标题。

```bash 
FROM python:3.7-buster
 
# copy source
RUN mkdir -p /opt/app
COPY myapp /opt/app/myapp/
WORKDIR /opt/app
 
# install dependencies nginx
RUN apt-get update && apt-get install nginx
RUN pip install -r requirements.txt
RUN chown -R www-data:www-data /opt/app
 
# start server
EXPOSE 8020
STOPSIGNAL SIGTERM
CMD ["/opt/app/start-server.sh"]
```


我们可以改成，先安装 Nginx，再单独 copy requirements.txt，然后安装 pip 依赖，最后 copy 应用代码。

```bash 
FROM python:3.7-buster
 
# install dependencies nginx
RUN apt-get update && apt-get install nginx
COPY myapp/requirements.txt /opt/app/myapp/requirements.txt
RUN pip install -r requirements.txt
 
# copy source
RUN mkdir -p /opt/app
COPY myapp /opt/app/myapp/
WORKDIR /opt/app
 
RUN chown -R www-data:www-data /opt/app
 
# start server
EXPOSE 8020
STOPSIGNAL SIGTERM
CMD ["/opt/app/start-server.sh"]
```
