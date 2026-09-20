# Jenkins：运维早搞定了，但我就是想偷学点前端CI/CD！

## 目录

- [前言：运维已就绪，但好奇心作祟](#前言运维已就绪但好奇心作祟)
- [Jenkins基础与部署流程](#Jenkins基础与部署流程)
  - [1. Jenkins到底是个什么东西？](#1-Jenkins到底是个什么东西)
  - [2. 自动化部署流程详解](#2-自动化部署流程详解)
- [准备工作](#准备工作)
- [安装git](#安装git)
- [Docker安装](#Docker安装)
- [Docker安装Docker Compose](#Docker安装Docker-Compose)
- [创建Docker相关文件目录](#创建Docker相关文件目录)

#### **前言：运维已就绪，但好奇心作祟**

- **背景故事**： 虽然前端开发人员平时可能不会直接操控Jenkins，运维团队已经把这一切搞得井井有条。然而，你的好奇心驱使你想要深入了解这些自动化的流程。本文将带你一探究竟，看看Jenkins如何在前端项目中发挥作用。
- **目标介绍**： 了解Jenkins如何实现从代码提交到自动部署的全过程，并学习如何配置和优化这一流程。

### Jenkins基础与部署流程

#### 1. **Jenkins到底是个什么东西？**

- **Jenkins简介**： Jenkins是一个**开源的自动化服务器，用于持续集成和持续交付**。它能够**自动化各种开发任务，** 提高开发效率和软件质量。
- **核心功能**： Jenkins可以自动化构建、测试和部署任务，帮助开发团队实现快速、高效的开发流程。

#### 2. **自动化部署流程详解**

- **流程概述**： 本文将重点介绍前端自动化部署的完整流程，包括代码提交、构建、打包、部署等步骤。具体流程如下：
  1. **代码提交**：
     - 开发人员通过 `git push` 将代码提交到远程仓库。
  2. **触发Jenkins自动构建**：
     - Jenkins配置为在代码提交时自动触发构建任务。
  3. **拉取代码仓库代码**：
     - Jenkins从仓库拉取最新代码。
  4. **构建打包**：
     - Jenkins运行构建命令（如 `npm run build`），将源代码编译成可部署版本。
  5. **生成dist文件**：
     - 构建生成 `dist` 文件夹，包含打包后的静态资源。
  6. **压缩dist文件**：
     - 使用压缩工具（如 `tar` 或 `zip`）将 `dist` 文件夹压缩成 `dist.tar` 或 `dist.zip`。
  7. **迁移到指定环境目录下**：
     - 将压缩包迁移到目标环境目录（如 `/var/www/project/`）。
  8. **删除旧dist文件**：
     - 删除目标环境目录下旧的 `dist` 文件，以确保保留最新版本。
  9. **解压迁移过来的dist.tar**：
     - 在目标环境目录下解压新的 `dist.tar` 文件。
  10. **删除dist.tar**：
      - 解压后删除压缩包，节省存储空间。
  11. **部署成功**：
      - 自动化流程完成，新的前端版本已经成功部署。

### 准备工作

**服务器配置**：

- **操作系统**: CentOS7.9
- **CPU**: 2核
- **内存**: 2GB
- **系统盘**: SSD云硬盘 40GB

**项目** fork的大佬的开源项目[soybean-admin](https://link.juejin.cn/?target=https://github.com/soybeanjs/soybean-admin "soybean-admin")

### 安装git

```typescript 
yum install -y git

```


**查看是否安装成功**

```typescript 
git --version

```


***生成秘钥***

```typescript 
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

```


***查看公钥***

```typescript 
cat ~/.ssh/id_rsa.pub

```


![](./image/image_5ZUJIIIi1d.png)

***将公钥添加到GitHub或其他代码库的SSH Keys***

![](./image/image_8__u7RinTJ.png)

### **Docker安装**

> 直接查看 [菜鸟教程](https://link.juejin.cn/?target=https://www.runoob.com/docker/centos-docker-install.html "菜鸟教程")

> 安装完之后,配置docker镜像源详情参考 [24年6月国内Docker镜像源失效解决办法...](https://juejin.cn/post/7385374199914938406?searchId=20240826165232C73F3A6CB6FF10793308#heading-7 "24年6月国内Docker镜像源失效解决办法...")

**编辑 ****`/etc/resolv.conf`**** 文件**：

```typescript 
sudo vim /etc/resolv.conf

```


添加或修改以下行以使用 Cloudflare 的 DNS 服务器：

```typescript 
nameserver 1.1.1.1
nameserver 1.0.0.1

```


***创建完成的docker-hub镜像输出示例:***

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/837e2f5173ef41e786d8fcec659ede47~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc3RyaW5ndGlreQ==:q75.awebp?rk3s=f64ab15b\&x-expires=1725332365\&x-signature=KJrZE3%2Fmmw%2FPjXUu35yKum6WgTA%3D)

查看docker相关的rpm源文件是否存在

```typescript 
rpm -qa |grep docker

```


**作用**

- **`rpm -qa`**：列出所有已安装的 RPM 包。
- **`grep docker`**：筛选出包名中包含 `docker` 的条目。

**示例输出**

![](./image/image_wLofu79Otx.png)

**启动Docker服务**：

- 启动Docker服务并设置为开机自启：

```typescript 
sudo systemctl start docker
sudo systemctl enable docker

```


### Docker安装Docker Compose

Docker Compose 可以`定义和运行多个 Docker 容器`应用的工具。它允许你使用一个单独的文件（通常称为 docker-compose.yml）来配置应用程序的服务，然后使用该文件快速启动整个应用的所有服务。

第一步，下载安装

```typescript 
curl -L https://get.daocloud.io/docker/compose/releases/download/v2.4.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

```


第二步，查看是否安装成功

```typescript 
docker-compose -v

```


第三步，给`/docker/jenkins_home` 目录设置最高权限，所有用户都具有读、写、执行这个目录的权限。（等建了`/docker/jenkins_home`目录之后设置）

```typescript 
chmod 777 /docker/jenkins_home

```


### 创建Docker相关文件目录

可以命令创建或者相关shell可视化工具创建， 命令创建如下:

```typescript 
mkdir /docker 
mkdir /docker/compose 
mkdir /docker/jenkins_home 
mkdir /docker/nginx 
mkdir /docker/nginx/conf 
mkdir /docker/html 
mkdir /docker/html/dev 
mkdir /docker/html/release
mkdir /docker/html/pro

```


***创建***\*\*\*`docker-compose.yml`******、******`nginx.conf`\*\*\****配置文件***

```typescript 
cd /docker/compose touch docker-compose.yml 
cd /docker/nginx/conf touch nginx.conf

```


完成后目录结构如下：&#x20;
