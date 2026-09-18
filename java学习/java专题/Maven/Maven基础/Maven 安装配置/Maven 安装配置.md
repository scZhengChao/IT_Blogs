# Maven 安装配置

[Mac上Maven的安装和环境变量配置保姆级教程（最新版实时更新）*mac安装maven-CSDN博客 文章浏览阅读2.9w次，点赞119次，收藏144次。Maven是一款广泛应用于Java开发领域的项目管理和构建自动化工具，本文介绍了Mac上Maven的安装和Maven环境变量配置，根据本人的安装过程逐步编写，有疑问和意见欢迎评论区或私信探讨。* mac安装maven <https://blog.csdn.net/wangyufei0815/article/details/137875138>](https://blog.csdn.net/wangyufei0815/article/details/137875138 " Mac上Maven的安装和环境变量配置保姆级教程（最新版实时更新）_mac安装maven-CSDN博客 文章浏览阅读2.9w次，点赞119次，收藏144次。Maven是一款广泛应用于Java开发领域的项目管理和构建自动化工具，本文介绍了Mac上Maven的安装和Maven环境变量配置，根据本人的安装过程逐步编写，有疑问和意见欢迎评论区或私信探讨。_mac安装maven https://blog.csdn.net/wangyufei0815/article/details/137875138")

1. 解压 apache-maven-3.6.1.rar 既安装完成
2. 配置环境变量 MAVEN\_HOME 为安装路径的bin目录
3. 配置本地仓库：修改 conf/settings.xml 中的 \<localRepository> 为一个指定目录
4. 配置阿里云私服：修改 conf/settings.xml 中的 \<mirrors>标签，为其添加如下子标签：

```xml 
<mirror>     <id>nexus-aliyun</id>     <mirrorOf>*</mirrorOf>     <name>Nexus aliyun</name>     <url>http://maven.aliyun.com/nexus/content/groups/public</url></mirror>
```
