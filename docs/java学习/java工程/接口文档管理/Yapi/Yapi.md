# Yapi

## 目录

- [3、Yapi使用](#3Yapi使用)
  - [3.1 Yapi介绍与安装](#31-Yapi介绍与安装)
  - [3.2 Yapi基本使用](#32-Yapi基本使用)
  - [3.3 Yapi自动同步swagger](#33-Yapi自动同步swagger)
  - [3.4 Yapi接口导入导出【了解】](#34-Yapi接口导入导出了解)
    - [3.3.1 导出接口文档](#331-导出接口文档)
    - [3.3.2 导入接口文档](#332-导入接口文档)

## 3、Yapi使用

### 3.1 Yapi介绍与安装

**（1）Yapi介绍**

YApi 是高效、易用、功能强大的 api 管理平台，**旨在为开发、产品、测试人员提供更优雅的接口管理服务。** 可以帮助开发者轻松创建、发布、维护 API，YApi 还为用户提供了优秀的交互体验，开发人员只需利用平台提供的接口数据写入工具以及简单的点击操作就可以实现接口的管理。

YApi让接口开发更简单高效，让接口的管理更具可读性、可维护性，让团队协作更合理。

![](image_voGEWe1DSL.png)

官方源码地址:[https://github.com/YMFE/yapi](https://github.com/YMFE/yapi "https://github.com/YMFE/yapi")

官方文档:[https://hellosean1025.github.io/yapi/](https://hellosean1025.github.io/yapi/ "https://hellosean1025.github.io/yapi/")

**（2）Yapi安装**

docker安装过程参考：[https://www.jianshu.com/p/a97d2efb23c5](https://www.jianshu.com/p/a97d2efb23c5 "https://www.jianshu.com/p/a97d2efb23c5")

流程如下：

安装mongo数据库：

```markdown 
# 拉取mongo镜像，当然一位内部包比较大，直接导入资料包中的镜像资源即可
docker pull mongo
# 安装mongo数据库服务
# 创建存储卷
docker volume create mongo-data
# 启动 MongoDB
docker run -d \
  --name mongo-yapi \
  -v mongo-data:/data/db \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=anoyi \
  -e MONGO_INITDB_ROOT_PASSWORD=anoyi.com \
  mongo
```


初始化yaml的管理员账号和密码：

```markdown 
# 拉取yapi镜像包
docker pull registry.cn-hangzhou.aliyuncs.com/anoyi/yapi
# 自定义名称为config.json的配置文件
{
  "port": "3000",
  "adminAccount": "admin@anoyi.com",
  "timeout":120000,
  "db": {
    "servername": "mongo",
    "DATABASE": "yapi",
    "port": 27017,
    "user": "anoyi",
    "pass": "anoyi.com",
    "authSource": "admin"
  }
}
# 初始化管理员账户和密码
docker run -it --rm \
  --link mongo-yapi:mongo \
  --entrypoint npm \
  --workdir /yapi/vendors \
  -v $PWD/config.json:/yapi/config.json \
  registry.cn-hangzhou.aliyuncs.com/anoyi/yapi \
  run install-server
```


效果如下：

![](image_dscOzqzbw9.png)

最后初始化yaml容器：

```docker 
docker run -d \
  --name yapi \
  --link mongo-yapi:mongo \
  --workdir /yapi/vendors \
  -p 3000:3000 \
  -v $PWD/config.json:/yapi/config.json \
  registry.cn-hangzhou.aliyuncs.com/anoyi/yapi \
  server/app.js
```


访问路径：

```markdown 
访问： http://192.168.200.130:3000
登录账号：admin@anoyi.com
密码：ymfe.org
```


登录后效果：

![](image_8L3QlypHGr.png)

> 注意：
>
> **重启yapi服务时，需要同时启动mongo服务，可通过 docker start mongo-yapi yapi 启动**

### 3.2 Yapi基本使用

登录到Yapi平台之后，我们可以创建项目，在项目下创建接口分类，在对应的分类中添加接口。

1\). 创建项目

![](image_aXD_ogS0fJ.png)

![](image_76mzDGRAn2.png)

2\). 添加分类

在当前项目中,有针对用户、股票、日志、权限等相关的操作，我们在进行接口维护时，可以针对接口进行分类，如果没有对应的分类，我们自己添加分类；

![](image_hfXz-meAoE.png)

3\). 添加接口

![](image_xinFye5lX1.png)

接口基本信息录入之后，点击提交按钮，就可以看到该接口的基本信息：

![](image_vMpfXNu1fZ.png)

说明：

通过【编辑】设置请求参数约束信息，比如：参数类型、是否必填、参数描述等；

通过【运行】可设置ip、端口等相关运行环境；

4\). 运行接口

Yapi也提供了接口测试功能，当我们接口编辑完毕后，后端服务的代码开发完毕，启动服务，就可以使用Yapi进行接口测试了；

![](image__Ox6DEJ3zD.png)

> 注意：访问过程若出现跨域问题，则需要给chrome浏览器安装扩展插件，参考：chrome 安装 yapi 扩展教程.mhtml

在Yapi平台中，将接口文档定义好了之后，**前后端开发人员就需要根据接口文档中关于接口的描述进行前端和后端功能的开发**；

### 3.3 Yapi自动同步swagger

![](image_xqPSO3-32B.png)

> 注意：yapi平台要同步本地stock\_backend下的swagger信息时，要**保证填写的ip地址能够访问到本地的backend工程**，否则同步失效！！

### 3.4 Yapi接口导入导出【了解】

#### 3.3.1 导出接口文档

在Yapi平台中我们不仅可以在线阅读文档，还可以将Yapi中维护的文档直接导出来，可以导出md，json，html格式，在导出时自行选择即可；

![](image_2duOlK6TJ6.png)

而在导出的html文件或md文件中，主要描述的就是接口的基本信息， 包括： 请求路径、请求方式、接口描述、请求参数、返回数据等信息。展示形式如下：&#x20;

![](image_29zGrp0ZGv.png)

#### 3.3.2 导入接口文档

上述我们讲解了接口文档的导出，我们也可以将外部的接口文档导入到Yapi的平台中，这样我们就不用一个接口一个接口的添加了；

我们可以将课程资料中提供的json格式的接口文档直接导入Yapi平台中来(文档可通过swagger下载)；

![](image_WZJq7pcuYr.png)

导入过程中出现的确认弹窗，选择"确认"。

![](image_C0eujKTINH.png)

导入效果：

![](image_e4soGwkQzz.png)
