# dockerfile  自定义镜像

```bash 
FROM                       # 基础镜像,一切从这里开始
MAINTAINER            # 镜像是谁写的, 姓名+邮箱
RUN                          # 镜像构建的时候需要运行的命令
ADD                          # 步骤: 构建包含tomcat的镜像,添加tomcat压缩包即可
WORKDIR                # 镜像的工作目录
VOLUME                  # 卷:挂载的路径
EXPOSE                   # 配置端口暴露,否则需要 -p 指定
CMD                          # 指定这个容器启动的时候要运行的命令,只有最后一个生效,可被替代
ENTRYPOINT           # 指定这个容器启动的时候要运行的命令,可以追加命令
ONBUILD                  # 构建一个被继承的DockerFile时,就会运行 ONBUILD 的指令(触发指令)
COPY                        # 类似ADD,将我们文件拷贝到镜像中
ENV                          ＃构建的时候设置环境变量
```


[Dockerfile语法](Dockerfile语法.md "Dockerfile语法")

[自定义镜像](自定义镜像.md "自定义镜像")

[镜像结构](镜像结构.md "镜像结构")

[缓存](IT/docker/dockerfile%20%20%20自定义镜像/缓存/缓存.md "缓存")
