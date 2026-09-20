# gitlab

## 目录

- [基于Docker配置本地Gitlab](#基于Docker配置本地Gitlab)
  - [1、拉取Gitlab镜像](#1拉取Gitlab镜像)
  - [2、启动Gitlab容器](#2启动Gitlab容器)
  - [3、修改配置](#3修改配置)
  - [4、浏览器访问 ](#4浏览器访问)
- [Gitlab配置](#Gitlab配置)
- [代码仓基本操作](#代码仓基本操作)

[ 实战：从 0 到 1 极狐GitLab CI/CD 前端持续部署\_拿我格子衫来的博客-CSDN博客\_cicd gitlab 前端 文章目录写在前面服务器配置环境安装安装 Docker安装 GitLab测试 GitLabGitLab Runner前端项目 CI/CD 流程的设计正式开始编写 .gitlab-ci.yml 的内容介绍 .gitlab-ci.yml镜像的使用stages  执行顺序的定义job 内容的编写在 CI/CD 中使用 SSH keys前端项目部署到阿里云OSS前端项目 CI/CD 最佳业务配置思路常见问题 https://fizzz.blog.csdn.net/article/details/119764533?spm=1001.2014.3001.5502](https://fizzz.blog.csdn.net/article/details/119764533?spm=1001.2014.3001.5502 " 实战：从 0 到 1 极狐GitLab CI/CD 前端持续部署_拿我格子衫来的博客-CSDN博客_cicd gitlab 前端 文章目录写在前面服务器配置环境安装安装 Docker安装 GitLab测试 GitLabGitLab Runner前端项目 CI/CD 流程的设计正式开始编写 .gitlab-ci.yml 的内容介绍 .gitlab-ci.yml镜像的使用stages  执行顺序的定义job 内容的编写在 CI/CD 中使用 SSH keys前端项目部署到阿里云OSS前端项目 CI/CD 最佳业务配置思路常见问题 https://fizzz.blog.csdn.net/article/details/119764533?spm=1001.2014.3001.5502")

[ Docker 部署 Gitlab 服务器（详细步骤）\_APDL\_10的博客-CSDN博客\_docker部署gitlab Docker 部署 Gitlab 服务器（详细步骤） https://blog.csdn.net/weixin\_53443677/article/details/125518696](https://blog.csdn.net/weixin_53443677/article/details/125518696 " Docker 部署 Gitlab 服务器（详细步骤）_APDL_10的博客-CSDN博客_docker部署gitlab Docker 部署 Gitlab 服务器（详细步骤） https://blog.csdn.net/weixin_53443677/article/details/125518696")

# 基于Docker配置本地Gitlab

[ 基于Docker配置本地Gitlab - DECHIN - 博客园 本文按照操作流程的时间顺序，分别介绍了Gitlab的Docker容器部署、Gitlab平台的基本配置以及基于Git的代码仓基本管理与同步方法。通过掌握这一套的流程，就可以实现在本地构建一个类似于Git https://www.cnblogs.com/dechinphy/p/gitlab.html](https://www.cnblogs.com/dechinphy/p/gitlab.html " 基于Docker配置本地Gitlab - DECHIN - 博客园 本文按照操作流程的时间顺序，分别介绍了Gitlab的Docker容器部署、Gitlab平台的基本配置以及基于Git的代码仓基本管理与同步方法。通过掌握这一套的流程，就可以实现在本地构建一个类似于Git https://www.cnblogs.com/dechinphy/p/gitlab.html")

[&#x20;
&#x20;   Mac M1基于Docker Desktop部署Gitlab |  蝉
&#x20;   https://jarvanbest.com/2021/12/31/Mac-M1基于Docker-Desktop部署Gitlab/](https://jarvanbest.com/2021/12/31/Mac-M1基于Docker-Desktop部署Gitlab/ "&#x20;
&#x20;   Mac M1基于Docker Desktop部署Gitlab |  蝉
&#x20;   https://jarvanbest.com/2021/12/31/Mac-M1基于Docker-Desktop部署Gitlab/")

[ Docker安装Gitlab和Runner并实现CICD\_阿靖哦的博客-CSDN博客\_gitlab runner的执行器 本文详细介绍如何在Linux系统使用Docker安装Gitlab、Gitlab-Runner并实现项目的CICD https://blog.csdn.net/weixin\_43835717/article/details/102073410](https://blog.csdn.net/weixin_43835717/article/details/102073410 " Docker安装Gitlab和Runner并实现CICD_阿靖哦的博客-CSDN博客_gitlab runner的执行器 本文详细介绍如何在Linux系统使用Docker安装Gitlab、Gitlab-Runner并实现项目的CICD https://blog.csdn.net/weixin_43835717/article/details/102073410")

### **1、拉取Gitlab镜像**

```bash 
docker pull gitlab/gitlab-ce:latest
```


### 2、启动[Gitlab](https://so.csdn.net/so/search?q=Gitlab\&spm=1001.2101.3001.7020 "Gitlab")容器

```bash 
 docker run \
 -d \
 -p 8443:443 \
 -p 8880:80 \
 -p 8822:22 \
 --name gitlab \
 -v /Users/zhengchao/home/docker/gitlab/config:/etc/gitlab \
 -v /Users/zhengchao/home/docker/gitlab/logs:/var/log/gitlab \
 -v /Users/zhengchao/home/docker/gitlab/data:/var/opt/gitlab \
 yrzr/gitlab-ce-arm64v8

```


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


```bash 
# 查看docker启动
docker ps
```


### 3、修改配置

**等待status 变成healthy 之后**——-这个非常重要&#x20;

```javascript 
## 检查gitlab各服务状态

  gitlab-ctl status

  ### 检查gitlab相关日志

  实时查看日志输出命令

    gitlab-ctl tail

  此处也可以在docker外面运行

    docker logs gitlab
```


> 接下来的配置请在容器内进行修改，不要在挂载到宿主机的文件上进行修改。否则可能出现配置更新不到容器内，或者是不能即时更新到容器内，导致gitlab启动成功，但是无法访问

```bash 
#进入容器内部
docker exec -it gitlab /bin/bash

#修改gitlab.rb
vi /etc/gitlab/gitlab.rb
 
#加入如下
#gitlab访问地址，可以写域名。
external_url 'http://localhost:8880' 
#ssh主机ip
gitlab_rails['gitlab_ssh_host'] = 'localhost'
#ssh连接端口
gitlab_rails['gitlab_shell_ssh_port'] = 8822
nginx['listen_port'] = 8880 # 大约在1354行

```


> 修改完成之后保存退出即可，由于咱们在docker中运行，在gitlab上生成的http地址应该是http\://192.168.249.132:9980,所以，要修改下面文件

```bash 
# 修改http和ssh配置
vi /opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml
 
  gitlab:
    host:localhost
    port: 8880 # 这里改为8880
    https: false
```


> 修改完成之后保存退出即可，重启gitlab

```bash 
#重启gitlab 
gitlab-ctl restart
#退出容器 
exit
```


### 4、浏览器访问 

路径访问：

<http://192.168.43.14:8880>

# Gitlab配置

首次登录会被要求重设密码，帐号是root。重设完密码之后，就可以进入Gitlab的登录页面：

查看初始密码：

```javascript 
docker exec -it gitlab grep 'Password:' /etc/gitlab/initial_root_password

9pRPWYgQr4MWnzP8ffno1q4VyiW2bH9sMiut2rvt8rk=

```


输入root帐号和刚才设定的密码之后，就可以登录进入Gitlab主页：

在主页上点击创建项目，可以新建一个本地的项目：

![](./assets/image/image_H9giyNkiVz.png)

创建好项目后的项目主页如下：

![](./assets/image/image_epr862ActT.png)

这里因为我们略过了一个步骤，在第一次使用Gitlab平台的时候，需要使用RSA加密生成密钥对，点击刚才界面上的添加ssh key进入添加密钥对的界面：

![](./assets/image/image__mx8tKEdGx.png)

此时我们需要在本地终端窗口中执行如下的指令来产生密钥对：**(注意：在当前路径下；注意你的路径)**

```javascript 
[dechin@dechin-manjaro projects]$ ssh-keygen -t rsa -b 2048
Generating public/private rsa key pair.
Enter file in which to save the key (/home/dechin/.ssh/id_rsa): private_gitlab.pub # 文件名，可以不加pub
Enter passphrase (empty for no passphrase):  # 输入自定义密码
Enter same passphrase again:  # 再次输入自定义密码
Your identification has been saved in private_gitlab.pub
Your public key has been saved in private_gitlab.pub.pub
The key fingerprint is:
SHA256:Xr3DhNi+8ZMJ×××××××××××××××××××0w dechin@dechin-manjaro
The key's randomart image is:
+---[RSA 2048]----+
|o..              |
|.. o. . .        |
|..+o + *         |
|   . E o.oo++o   |
|    o   . .++.   |
|     o..  . ..   |
+----[SHA256]-----+
```


执行完该指令会在当前目录下产生两个密钥文件：

```javascript 
[dechin@dechin-manjaro projects]$ ll
总用量 8
-rw------- 1 dechin dechin 1876  5月  5 16:43 private_gitlab.pub
-rw-r--r-- 1 dechin dechin  403  5月  5 16:43 private_gitlab.pub.pub
```


其中少一个pub的文件是私钥，不应该暴露出来，而多一个pub的文件是公钥，需要复制这个文件中的字符串，输入到刚才Gitlab的配置中：

```javascript 
[dechin@dechin-manjaro projects]$ cat private_gitlab.pub.pub 
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDt6VXrvTPhWr5iUy3KpIzRryX3SGBUAYietTMSqEOuZjRXr1u14lFk1cT5jwAHw7BtnfBOrwptTIYaWztoWR94gG1W1KFc6HRY0SWrUHtwXwOypWcqMv7Z2AT6TFIgNf/2ZZAlYisC0G9xTO5qTcYDyJe/88zcIm/5B6NQ7safAkGkGYY+WrFxBpnNU2bEdSbx4Sem2v2TD9GRxSg9RpLSXQaULi1bpDgGfxLJZBxj2Eeo11j9ayjipWFqJ43pJ dechin@dechin-manjaro

```


一般是以`ssh-rsa`开头的字符串，输入完成后点击`Add Key`，即可完成密钥对的配置：

![](./assets/image/image_lx5cozdV6L.png)

# 代码仓基本操作

在完成前面章节的基本配置之后，就可以使用https的方式将需要托管的代码仓库clone下来同步操作，首先复制仓库链接：

![](./assets/image/image_tvD7Hz7poF.png)

**注意：ssh 没法克隆；用http；第一次回让你输入账号密码**

剩下的和基本分支操作没什么区别
