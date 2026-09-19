# docker

## 目录

- [官网](#官网)
- [安装](#安装)
- [docker-ce](#docker-ce)
- [卸载docker](#卸载docker)

[10\_部署\_nginx\_cluster\_pm2\_docker【瑞客论坛 www.ruike1.com】.pdf](<10_部署_nginx_cluster_pm2_docker【瑞客论坛 www.ruike1.com.pdf> "10_部署_nginx_cluster_pm2_docker【瑞客论坛 www.ruike1.com】.pdf")

[ Docker Hub  https://hub.docker.com/](https://hub.docker.com/ " Docker Hub  https://hub.docker.com/")

**Docker概念**

- 操作系统层面的虚拟化技术
- 隔离的进程独立于宿主和其它的隔离的进程 - 容器 
- GO语言开发

**特点**

- 高效的利用系统资源&#x20;
- 快速的启动时间&#x20;
- 一致的运行环境
- 持续交付和部署&#x20;
- 更轻松的迁移

**对比传统虚拟机总结**

| **特性**   | **容器**     | **虚拟机**    |
| -------- | ---------- | ---------- |
| **启动**   | **秒级**     | **分钟级**    |
| **硬盘使用** | **一般为 MB** | **一般为 GB** |
| **性能**   | **接近原生**   | **弱于**     |
| 系统支持量    | 单机支持上千个容器  | 一般几十个      |

**三个核心概念**

- \*\*镜像 \*\*
- \*\*容器 \*\*​
- **仓库**

# 官网

[ Docker Desktop for Apple silicon  https://docs.docker.com/desktop/mac/apple-silicon/](https://docs.docker.com/desktop/mac/apple-silicon/ " Docker Desktop for Apple silicon  https://docs.docker.com/desktop/mac/apple-silicon/")

[   https://docs.docker.com/desktop/install/mac-install/](https://docs.docker.com/desktop/install/mac-install/ "   https://docs.docker.com/desktop/install/mac-install/")

[   https://www.docker.com/pricing/](https://www.docker.com/pricing/ "   https://www.docker.com/pricing/")

# 安装

[ M1芯片的MacBook安装docker\_柳小葱的博客-CSDN博客\_docker m1 ????在经历了deepin,centos7安装docker失败之后（deepin系统curl指令出错，centos7版本太低），我决定在我的Macbook m1上安装docker这里写目录标题1.确定自己电脑版本2.上官网下载m1版本的docker3.安装docker4.配置国内镜像加速5.检查配置1.确定自己电脑版本2.上官网下载m1版本的docker下载链接: MacBook m1芯片的do https://blog.csdn.net/weixin\_48077303/article/details/122338153](https://blog.csdn.net/weixin_48077303/article/details/122338153 " M1芯片的MacBook安装docker_柳小葱的博客-CSDN博客_docker m1 ????在经历了deepin,centos7安装docker失败之后（deepin系统curl指令出错，centos7版本太低），我决定在我的Macbook m1上安装docker这里写目录标题1.确定自己电脑版本2.上官网下载m1版本的docker3.安装docker4.配置国内镜像加速5.检查配置1.确定自己电脑版本2.上官网下载m1版本的docker下载链接: MacBook m1芯片的do https://blog.csdn.net/weixin_48077303/article/details/122338153")

理解：

[ m1芯片macOS安装docker 学习来源： https://github.com/datawhalechina/team-learning-program/blob/master/Docker Docker自开源后受到广泛的关注和讨论，至今其GitHub 项目 (opens new window)已经超过 60k个星标和17.3k个fork。甚至由… https://zhuanlan.zhihu.com/p/364183156](https://zhuanlan.zhihu.com/p/364183156 " m1芯片macOS安装docker 学习来源： https://github.com/datawhalechina/team-learning-program/blob/master/Docker Docker自开源后受到广泛的关注和讨论，至今其GitHub 项目 (opens new window)已经超过 60k个星标和17.3k个fork。甚至由… https://zhuanlan.zhihu.com/p/364183156")

启动docker 无反应： 结束所有docker 进程；重启docker

[   https://jarvanbest.com/2021/12/31/Mac-M1基于Docker-Desktop部署Gitlab/](https://jarvanbest.com/2021/12/31/Mac-M1基于Docker-Desktop部署Gitlab/ "   https://jarvanbest.com/2021/12/31/Mac-M1基于Docker-Desktop部署Gitlab/")

# docker-ce

[   https://developer.aliyun.com/mirror/docker-ce/?spm=a2c6h.25603864.0.0.7b3a7e2dNvGhKV](https://developer.aliyun.com/mirror/docker-ce/?spm=a2c6h.25603864.0.0.7b3a7e2dNvGhKV "   https://developer.aliyun.com/mirror/docker-ce/?spm=a2c6h.25603864.0.0.7b3a7e2dNvGhKV")

# 卸载docker

[Dockerfile](file/Dockerfile_ghbsyn-u9K " Dockerfile")

[docker-compose.yaml](docker-compose_xHbePD0Oz7.yaml " docker-compose.yaml")

[nginx.conf](nginx_0sR2N-ia5e.conf " nginx.conf")

[.gitlab-ci.yml](-gitlab-ci_bTLEoylUx9.yml " .gitlab-ci.yml")

[api](IT/docker/api/api.md "api")

[镜像](IT/docker/镜像/镜像.md "镜像")

[容器](容器.md "容器")

[数据卷](数据卷.md "数据卷")

[   https://juejin.cn/post/7157662419681017870](https://juejin.cn/post/7157662419681017870 "   https://juejin.cn/post/7157662419681017870")

[技巧](技巧.md "技巧")

[基础介绍](基础介绍.md "基础介绍")

[docker desktop](<docker desktop.md> "docker desktop")

[dockerfile   自定义镜像](<dockerfile   自定义镜像.md> "dockerfile   自定义镜像")

[docker-compose](docker-compose.md "docker-compose")

[Docker镜像仓库](Docker镜像仓库.md "Docker镜像仓库")

[案例](IT/docker/案例/案例.md "案例")
