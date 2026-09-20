# gitlab-runner

## 目录

- [拉取Runner镜像并启动](#拉取Runner镜像并启动)
- [进入Runner容器内](#进入Runner容器内)
- [运行以下命令](#运行以下命令)
  - [输入Gitlab实例的地址](#输入Gitlab实例的地址)
  - [输入token](#输入token)
  - [输入与Runner关联的标签](#输入与Runner关联的标签)
  - [输入Runner的执行器](#输入Runner的执行器)
  - [设置执行器的版本](#设置执行器的版本)
- [遇到问题：](#遇到问题)
- [复用镜像及开启debug模式](#复用镜像及开启debug模式)
  - [开启Debug模式](#开启Debug模式)
- [](#)

[ Docker安装Gitlab和Runner并实现CICD\_阿靖哦的博客-CSDN博客\_gitlab runner的执行器 本文详细介绍如何在Linux系统使用Docker安装Gitlab、Gitlab-Runner并实现项目的CICD https://blog.csdn.net/weixin\_43835717/article/details/102073410](https://blog.csdn.net/weixin_43835717/article/details/102073410 " Docker安装Gitlab和Runner并实现CICD_阿靖哦的博客-CSDN博客_gitlab runner的执行器 本文详细介绍如何在Linux系统使用Docker安装Gitlab、Gitlab-Runner并实现项目的CICD https://blog.csdn.net/weixin_43835717/article/details/102073410")

### 拉取Runner镜像并启动

```javascript 
sudo docker run \
-d \
--name gitlab-runner \
--restart always  \
-v /Users/zhengchao/home/docker/gitlab-runner/config:/etc/gitlab-runner \
-v /var/run/docker.sock:/var/run/docker.sock \
gitlab/gitlab-runner:latest
```


### 进入Runner容器内

```javascript 
docker exec -it gitlab-runner bash

```


### 运行以下命令

```javascript 
gitlab-runner register

```


#### 输入Gitlab实例的地址

地址是你手动设置Runner区域里面的URL

```javascript 
> Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com )
http://xxx

```


#### 输入token

token是你手动设置Runner区域里面的令牌

```javascript 
> Please enter the gitlab-ci token for this runner
xxx

```


输入Runner的描述

```javascript 
> Please enter the gitlab-ci description for this runner
[hostname] my-runner

```


#### 输入与Runner关联的标签

标签是为了让后期在CI脚本中指定选择某个或者多个Runner，这里我们设置他的标签为`test`，你们可以设置其他的

```javascript 
> Please enter the gitlab-ci tags for this runner (comma separated):
test

```


#### 输入Runner的执行器

由于我们都是基于Docker，所以这里选择执行器为Docker

```javascript 
> Please enter the executor: ssh, docker+machine, docker-ssh+machine, kubernetes, docker, parallels, virtualbox, docker-ssh, shell:
docker

```


#### 设置执行器的版本

```javascript 
> Please enter the Docker image (eg. ruby:2.1):
输入默认的docker镜像（根据自己的项目选择对应的docker镜像，也可以选择自己的本地docker镜像）
node:latest
```


退出容器

```javascript 
exit

```


通过以上命令后，就创建成功runner啦，这时候我们去GitLab中我们创建Runner的区域刷新就能看到了

![](./assets/image/image_O7BhnoZu91.png)

或者

```javascript 
docker run \
  -d \
  --name gitlab-runner \
  --restart always  \
  -v /Users/zhengchao/home/docker/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest register \
  --non-interactive \
  --executor "docker" \
  --docker-image alpine:latest \
  --url "http://localhost/" \
  --registration-token "YA7mo6fVxjRSocAKFBvx" \
  --description "docker-runner" \
  --tag-list "test" \
  --run-untagged="true" \
  --locked="false" \
  --access-level="not_protected" 

```


- executor：执行器，可选 docker、k8s、shell
- description：runner 的描述
- tag-list：runner 的 tag，使用逗号分隔，如果一个项目有多个 Runner，需要根据 tag 来指定使用那个 Runner 来运行任务
- locked：是否锁定，锁定后，只能适用于被项目，不能被其他项目使用

# 遇到问题：

在前几次注册runner时总是报错如下：

> ERROR: Registering runner… failed runner=eFn3g8w9 status=couldn’t execute POST against [http://localhost:9999/api/v4/runners:](http://localhost:9999/api/v4/runners: "http://localhost:9999/api/v4/runners:") Post [http://localhost:9999/api/v4/runners:](http://localhost:9999/api/v4/runners: "http://localhost:9999/api/v4/runners:") dial tcp 127.0.0.1:9999: connect: connection refusedPANIC: Failed to register the runner. You may be having network problems.

查阅资料说可能是防火墙没关，**或者gitlab和gitlab-runner的版本不兼容导致的。但我这里不是这两个问题导致的。经过几次尝试，我总结经验一个是url不能写localhost，而是用具体的ip。**

[http://192.168.43.14/](http://localhost/ "http://192.168.43.14/")

> ERROR: Failed to remove network for build                                                                                                                                        ERROR: Preparation failed: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running? (docker.go:847:0s)

**此处一大坑：-v /var/run/docker.sock:/var/run/docker.sock \  这个数据卷不能随便改**

docker: Error response from daemon: error while creating mount source path

**停止容器；重新启动容器**

> fatal: unable to access '[http://localhost:8880/root/vue-demo.git/'](http://localhost:8880/root/vue-demo.git/' "http://localhost:8880/root/vue-demo.git/'"): Failed to connect to localhost port 8880 after 0 ms: Connection refused

[ 14.gitlab的CI自动化持续集成\_mb5fed440247fb5的技术博客\_51CTO博客 14.gitlab的CI自动化持续集成，gitlab的自动化持续集成\<!TOC"gitlab的自动化持续集成""gitlabrunner安装""gitlabrunner注册""配置文件.gitlabci.yml语法""stage"\<!/TOCgitlabrunner安装1.在系统中的某个位置创建一个文... https://blog.51cto.com/u\_15072780/4206212](https://blog.51cto.com/u_15072780/4206212 " 14.gitlab的CI自动化持续集成_mb5fed440247fb5的技术博客_51CTO博客 14.gitlab的CI自动化持续集成，gitlab的自动化持续集成<!TOC\"gitlab的自动化持续集成\"\"gitlabrunner安装\"\"gitlabrunner注册\"\"配置文件.gitlabci.yml语法\"\"stage\"<!/TOCgitlabrunner安装1.在系统中的某个位置创建一个文... https://blog.51cto.com/u_15072780/4206212")

```javascript 
docker run \
-d \
--publish 443:443 \
--publish 9001:9001 \
--publish 8022:22  \
--hostname 192.168.43.14:9001 \
--name gitlab \
-e 'GITLAB_PORT=9001' \
-e 'GITLAB_SSH_PORT=8022' \
--restart always  \
-v /Users/zhengchao/home/docker/gitlab/config:/etc/gitlab \
-v /Users/zhengchao/home/docker/gitlab/logs:/var/log/gitlab \
-v /Users/zhengchao/home/docker/gitlab/data:/var/opt/gitlab \
--privileged=true yrzr/gitlab-ce-arm64v8
```


```javascript 
external_url 'http://192.168.43.14:9001' 
nginx['listen_port'] = 82
gitlab_rails['gitlab_ssh_host'] = '192.168.43.14'
gitlab_rails['gitlab_shell_ssh_port'] = 8022
```


**解决上面问题;至此；全部成功**

> remote: HTTP Basic: Access denied

本地git账号信息与远程git仓库账号不一致导致的。

**添加ssh key。然后会叫你输入密码账号**

> Cannot connect to the Docker daemon at tcp\://docker:2375

偶然发现；这种方式不用 改配置

```javascript 
docker run \
-d \
--publish 443:443 \
--publish 80:80 \
--publish 222:22 \
--hostname 192.168.43.14:80 \
--name gitlab \
-e 'GITLAB_PORT=80' \
-e 'GITLAB_SSH_PORT=222' \
--restart always  \
-v /Users/zhengchao/home/docker/gitlab/config:/etc/gitlab \
-v /Users/zhengchao/home/docker/gitlab/logs:/var/log/gitlab \
-v /Users/zhengchao/home/docker/gitlab/data:/var/opt/gitlab \
--privileged=true yrzr/gitlab-ce-arm64v8
```


# 复用镜像及开启debug模式

我们使用[docker](https://so.csdn.net/so/search?q=docker\&spm=1001.2101.3001.7020 "docker") 执行器时发现每次，构建都会去拉取基础镜像，这样很费时间

![](./assets/image/image_j1xE1D7mDK.png)

这种情况，我们可以通过修改，runner的配置实现本地存在镜像时，不再去下载镜像**首先找到runner的配置文件**

```bash 
[root@origin _data]# docker ps
CONTAINER ID   IMAGE                                 COMMAND                  CREATED         STATUS             PORTS     NAMES
3db1ac8dbf0e   b96bd51a5387                          "/usr/local/bin/mvn-…"   3 minutes ago   Up 3 minutes                 runner--tnccsb4-project-2-concurrent-0-9fb86bb61ae060b9-build-3
c66580bf739d   gitlab/gitlab-runner:alpine-v14.2.0   "/usr/bin/dumb-init …"   4 days ago      Up About an hour             gitlab-runner
[root@origin _data]# docker inspect c66
在容器详情里面找到对应的目录
"Mounts": [
            {
                "Type": "volume",
                "Name": "docker-compose_gitlab-runner-config",
                "Source": "/var/lib/docker/volumes/docker-compose_gitlab-runner-config/_data",
                "Destination": "/etc/gitlab-runner",
                "Driver": "local",
                "Mode": "rw",
                "RW": true,
                "Propagation": ""
            },

```


去到这个目录

```bash 
[root@origin _data]# cd /var/lib/docker/volumes/docker-compose_gitlab-runner-config/_data
[root@origin _data]# ll
total 4
drwx------. 2 root root   6 Aug 23 13:07 certs
-rw-------. 1 root root 563 Sep  9 00:21 config.toml
[root@origin _data]# 

```


就是这个 config.toml，打开

```bash 
[root@origin _data]# vim config.toml 

concurrent = 1
check_interval = 0

[session_server]
  session_timeout = 1800

[[runners]]
  name = "docker-runner"
  url = "http://gitlab.kalpana.top:9080/"
  token = "-tNcCsB4AKyK-W6juJS8"
  executor = "docker"
  [runners.custom_build_dir]
  [runners.cache]
    [runners.cache.s3]
    [runners.cache.gcs]
    [runners.cache.azure]
  [runners.docker]
    tls_verify = false
    image = "alpine:latest"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/cache"]
    shm_size = 0

```


加上

```bash 
pull_policy="if-not-present"

```


再次执行流水线任务，可以看到已经没有去下载镜像了

![](./assets/image/image_Y-wzzBlfM3.png)

很明显，never是从不从远端拉镜像，只用本地。`if-not-present` 是优先本地，然后是从网络拉取镜像。`always` 是从远端拉取镜像。

```bash 
vi /etc/gitlab-runner/config.toml
添加：    pull_policy = "if-not-present"

[[runners]]
  name = "cloud-runner"
  url = "https://www.gitlab.com/"
  token = "117942j2j3j234"
  executor = "docker"
  [runners.docker]
    tls_verify = false
    image = "alpine:latest"
    privileged = false
    pull_policy = "if-not-present"
    disable_cache = false
    volumes = ["/cache"]
    shm_size = 0
  [runners.cache]

```


### 开启Debug模式

[官方文档](https://docs.gitlab.com/runner/configuration/advanced-configuration.html#the-session_server-section "官方文档")

1. 暴露runner端口 8093

```bash 
version: '3.8'
services:
  gitlab-runner:
    image: gitlab/gitlab-runner:v14.1.0
    container_name: gitlab-runner
    restart: always
    ports:
    - '8093:8093'  
    volumes:
    - '/var/run/docker.sock:/var/run/docker.sock'
    - 'gitlab-runner-config:/etc/gitlab-runner'
volumes:
  gitlab-runner-config: {}

```


1. 修改配置

```bash 
[root@origin docker-compose]# cd /var/lib/docker/volumes/docker-compose_gitlab-runner-config/_data
[root@origin _data]# vim config.toml

```


2\. 在session\_server 节点下增加listen\_address ,advertise\_address

```bash 
[session_server]
  session_timeout = 1800
  listen_address = "[::]:8093"
  advertise_address = "192.168.0.103:8093"

```


3.重启runner

4.再触发流水线可以看到，已经有Debug入口了，在任务执行期间，可以通过这里进入当前runner内部，查看任务具体详情

![](./assets/image/image_751YzbZ_Lt.png)

#
