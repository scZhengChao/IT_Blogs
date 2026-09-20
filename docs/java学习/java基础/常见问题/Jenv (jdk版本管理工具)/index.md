# Jenv (jdk版本管理工具)

## 目录

- [一、手动配置的方案](#一手动配置的方案)
- [二、jenv](#二jenv)
- [如何使用Jenv](#如何使用Jenv)
  - [添加](#添加)
  - [移除](#移除)
  - [查看](#查看)
  - [切换](#切换)
    - [切换不生效原因](#切换不生效原因)
  - [安装新的 JDK 版本](#安装新的-JDK-版本)

# 一、手动配置的方案

[MAC如何安装多版本jdk(以8,11,17为例）*mac安装jdk17-CSDN博客 文章浏览阅读2.3k次，点赞9次，收藏22次。我们定义了三个别名：java8， java11和java17，其中默认配置为 jdk11。傻瓜式安装pkg文件后，打开终端窗口，执行如下命令查看我们安装的 JDK 版本。三者要相互切换，在终端中输入命令即可，如下。可以看到安装了三个版本。* mac安装jdk17 <https://blog.csdn.net/qq_45686949/article/details/134858805>](https://blog.csdn.net/qq_45686949/article/details/134858805 " MAC如何安装多版本jdk(以8,11,17为例）_mac安装jdk17-CSDN博客 文章浏览阅读2.3k次，点赞9次，收藏22次。我们定义了三个别名：java8， java11和java17，其中默认配置为 jdk11。傻瓜式安装pkg文件后，打开终端窗口，执行如下命令查看我们安装的 JDK 版本。三者要相互切换，在终端中输入命令即可，如下。可以看到安装了三个版本。_mac安装jdk17 https://blog.csdn.net/qq_45686949/article/details/134858805")

# 二、jenv

[ jEnv - Manage your Java environment Discover jenv, the command line Java manager https://www.jenv.be/](https://www.jenv.be/ " jEnv - Manage your Java environment Discover jenv, the command line Java manager https://www.jenv.be/")

```bash 
brew install jenv

export PATH="$HOME/.jenv/bin:$PATH"
eval "$(jenv init -)"

source ~/.zshrc

```


# 如何使用Jenv

Jenv的使用很简单，利用配置JDK8的方法，我下载了JDK11，存储地址是`/Library/Java/JavaVirtualMachines/zulu-11.jdk`，我们添加到Jenv里：

#### 添加

```bash 
jenv add /Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home
```


![](./assets/image/image_5CHn9CbktG.png)

#### 移除

可以看到，jenv自动检录多余的名称。你可以放任不管，但是如果你是“强迫症”人群，可以手动`remove`多余名称：

这个并没有移除本地jdk资源

![](./assets/image/image_srj02KrwqE.png)

```bash 
jenv remove <version>
# 示例：
jenv remove 1.8.0_301
```


#### 查看

之后，使用`versions`命令，可以看到Jenv管理的JDK版本：

```bash 
jenv versions
```


![](./assets/image/image_Yb_ui4tWMO.png)

#### 切换

**当我们要在当前目录下，调用JDK11时候，终端输入：**

```bash 
jenv local 11
```


> jenv global 11.0

- global &#x20;

  通过global来切换全局的jdk环境。
- local &#x20;

  仅对当前目录有效。
- shell &#x20;

  仅对当前会话有效。 &#x20;

  3、切换之后通过 `java -version` 查看是否成功

Jenv 会自动设置`JAVA_HOME`和`JAVACMD`环境变量，无需手动配置。验证方法：

```bash 
echo $JAVA_HOME
# 输出示例：/Library/Java/JavaVirtualMachines/jdk-11.0.23.jdk/Contents/Home
```


##### 切换不生效原因

`source ~/.zshrc`之后才成功。

#### **安装新的 JDK 版本**

```bash 
jenv install <version>
# 示例：
jenv install 21  # 安装最新 Java 21
```


- Jenv 会通过 Homebrew 自动下载并安装指定版本。
