# Intellij IDEA Maven dependency自动补全和Maven Artifact Search为空问题

## 目录

- [第一种方案：](#第一种方案)
- [第二种方案：  ](#第二种方案--)

DEA 使用Maven开发过程中遇到两种问题：

1、 IDEA上使用maven插件，在pom.xml编写项目依赖的jar包时，已经下载到本地的jar，无法自动补全,需要手动书写。

2、代码编写过程中，写新的类但是没有在pom.xml中添加依赖，可以ALT+Enter组合件选择 Add Maven Dependency (添加maven依赖)

![](image_9D_B2wchrz.png)

![](image_QfVISsU-s2.png)

发现搜索的结果总是为空 (No results)

有两种方案：一种是曲线救国直接从中央库搜索复制对应配置；还有一种方式是通过更新中央库索引。

# 第一种方案：

这也有一个曲线救国的方案，直接在  maven仓库中搜索：[https://mvnrepository.com](https://mvnrepository.com "https://mvnrepository.com") 并复制对应的依赖配置。

![](image_AF1DUXR2WR.png)

![](image_y7HDZD0jrp.png)

直接复制就可以在pom.xml里面粘贴

# **第二种方案：** &#x20;

在settings ->Build ->Build Tools-->Maven -->Repositories

![](image_Ca4gMoV8o-.png)

没有更新过的Updated对应的值为Never

点击右侧的Update按钮 &#x20;

![](https://i-blog.csdnimg.cn/blog_migrate/442347962ab00f0ed288c3e644b68627.png)

等待更新完成（时间较长，需要耐心等待，也可以使用代理），完成后会Processing indices（处理索引）

![](https://i-blog.csdnimg.cn/blog_migrate/34bc9d85ed701766068339e0721f5964.png)

然后更新本地仓库

![](https://i-blog.csdnimg.cn/blog_migrate/637476a34cba1b4377003fa21e170057.png)

等更新以后，核对一下是否更新成功：

![](https://i-blog.csdnimg.cn/blog_migrate/4f3732ca9c114addf0dc1fe347c961db.png)

这里应该有对应的更新日期，如果这一行显示的是粉红色，可以看到对应的原因，如：

![](https://i-blog.csdnimg.cn/blog_migrate/86d27ebd4e126ab87f7e18a19e594837.png)

那么需要在setting.xml中或者IDEA中设置代理

Maven依赖就可以自动提示补全了

![](https://i-blog.csdnimg.cn/blog_migrate/f6f5f24363fcd5d2ebdc39c40764b912.gif)

如果还没**有添加依赖也可以使用IDEA来搜索和添加maven依赖了。**

![](https://i-blog.csdnimg.cn/blog_migrate/694255d730b24402e6660dec35bb66c8.png)

![](image_MVb4cgoVlj.png)
