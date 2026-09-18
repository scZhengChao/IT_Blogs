# OpenJDK 和 OracleJDK

## 目录

- [开源性质](#开源性质)
- [更新和支持](#更新和支持)
- [功能差异](#功能差异)
- [如何查看JDK是OpenJDK还是OracleJDK](#如何查看JDK是OpenJDK还是OracleJDK)

`OpenJDK 和 OracleJDK`：哪个JDK更好更稳定，正式项目应该使用哪个呢？我会从，从[开源](https://edu.csdn.net/cloud/pm_summit?utm_source=blogglc\&spm=1001.2101.3001.7020 "开源")性质、更新和支持、功能差异等方面进行比较，如何选择，哪个[jdk](https://www.zhihu.com/search?q=jdk\&search_source=Entity\&hybrid_search_source=Entity\&hybrid_search_extra={"sourceType":"answer","sourceId":3357432791} "jdk")更好更稳定，正式项目用哪个呢，进行比较回答

![](https://i-blog.csdnimg.cn/blog_migrate/096a4bb3d2311c7f82ee7cf087e93a40.png)

#### 开源性质

**1、OpenJDK：**

OpenJDK是一个完全开源的Java开发工具包（JDK），由Oracle领导，并得到了广泛的社区支持。

它的源代码可以在公共域中自由访问和修改，这使得开发人员可以根据自己的需求自定义JDK。

**2、OracleJDK：**

OracleJDK是Oracle公司基于OpenJDK[源代码](https://www.zhihu.com/search?q=源代码\&search_source=Entity\&hybrid_search_source=Entity\&hybrid_search_extra={"sourceType":"answer","sourceId":3357432791} "源代码")开发的官方JDK版本。

它包含一些专有的功能和[性能优化](https://edu.csdn.net/cloud/sd_summit?utm_source=glcblog\&spm=1001.2101.3001.7020 "性能优化")，但在某些版本中需要商业许可。

#### 更新和支持

**1、OpenJDK：**

OpenJDK通常是最先接收到Java最新特性的版本。

社区支持广泛，但Oracle官方的免费公共更新可能不如OracleJDK频繁。

**2、OracleJDK：**

OracleJDK提供长期支持（LTS）版本，这对于需要长期稳定环境的企业级应用尤其重要。

Oracle为其JDK提供商业支持，包括安全更新和[性能优化](https://www.zhihu.com/search?q=性能优化\&search_source=Entity\&hybrid_search_source=Entity\&hybrid_search_extra={"sourceType":"answer","sourceId":3357432791} "性能优化")。

#### 功能差异

虽然OpenJDK和OracleJDK在功能上非常相似，但存在一些差异：

**1、性能优化：**

OracleJDK可能包含一些专有的性能增强特性。

OpenJDK在社区支持下，也逐渐增加了性能优化和新功能。

2、工具和插件：

OracleJDK提供了一些专有的工具和插件，如JRockit Mission Control等。

OpenJDK可能缺少这些工具，但开源社区提供了许多替代方案。

## [如何查看JDK是OpenJDK还是OracleJDK](https://blog.csdn.net/sinat_38259539/article/details/78114983 "如何查看JDK是OpenJDK还是OracleJDK")

要确定你安装的JDK是OpenJDK还是OracleJDK，可以使用命令行工具查看JDK的版本信息。以下是具体步骤：

使用命令行查看JDK版本

在命令行中输入以下命令：

java -version

如果是OpenJDK

如果你安装的是OpenJDK，输出的版本信息会类似于以下内容：

`openjdk version "1.8.0_144"`

`OpenJDK Runtime Environment (build 1.8.0_144-b01)`

`OpenJDK 64-Bit Server VM (build 25.144-b01, mixed mode)`

从输出中可以看到关键字“**OpenJDK**”，这表明你使用的是OpenJDK[1](https://blog.csdn.net/sinat_38259539/article/details/78114983 "1")[2](https://www.cnblogs.com/shoufeng/p/9719995.html "2")。

如果是OracleJDK

如果你安装的是OracleJDK，输出的版本信息会类似于以下内容：

`java version "1.8.0_162"`

`Java(TM) SE Runtime Environment (build 1.8.0_162-b12)`

`Java HotSpot(TM) 64-Bit Server VM (build 25.162-b12, mixed mode)`

从输出中可以看到关键字“**Java(TM) SE Runtime Environment**”和“**Java HotSpot(TM)**”，这表明你使用的是OracleJDK[1](https://blog.csdn.net/sinat_38259539/article/details/78114983 "1")[2](https://www.cnblogs.com/shoufeng/p/9719995.html "2")。
