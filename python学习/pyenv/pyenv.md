# pyenv

## 目录

- [写在前面](#写在前面)
- [一、Python工作环境管理](#一Python工作环境管理)
  - [1、问题情景](#1问题情景)
  - [2.使用pyenv管理不同的Python版本](#2使用pyenv管理不同的Python版本)
  - [3、pyenv是什么? 能干什么?](#3pyenv是什么-能干什么)
  - [4、简单使用](#4简单使用)
- [python 安装](#python-安装)
  - [pyenv切换python版本](#pyenv切换python版本)

# 写在前面

有些情况下需要python 环境。

Python工作环境管理Python2和Python3之间存在着较大的差异，并且由于各种原因导致了Python2和Python3的长期共存。在实际工作过程中，我们可能会同时用到Python2和Python3，因此，需要经常在Python2和Python3之间进行来回切换。

# 一、Python工作环境管理

在Python世界里，**除了需要对Python的版本进行管理以外，还需要对不同的软件包进行管理**。大部分情况下，对于开源的库我们使用不同的版本即可。但是，有时候可能需要对相同的Python版本，在不同的项目中使用不同版本的软件包。

&#x20;     在这里，我们将介绍两个工具，**即pyenv和virtualenv**。前者用于管理不同的Python版本，后者用 于管理不同的工作环境。有了这两个工具，Python相关的版本问题将不再是问题。

## 1、问题情景

1. Python解释器版本混乱，2和3差别巨大，而且细分版本也不尽相同，难以选择和管理。
2. 不同Linux发行版自带Python不同，如ubuntu16自带2.7和3.5版本，其中系统许多组件依赖于自带解释器，一旦删除或者更改都可能会造成系统出问题。
3. 不同的Python解释器软件包管理也是问题，如pip和ipython等必备包组件，而且在项目开发中如何保证不同的包环境互不干扰也是一个问题。

那么有没有一个终极的解决办法，能在管理不同解释器版本的同时控制不同的包环境呢? 有的，就是pyenv。

## 2.使用pyenv管理不同的Python版本

安装不同的Python版本并不是一件容易的事情，在不同的Python版本之间来回切换更加困难，而且多版本并存非常容易互相干扰。因此，我们需要一个名为pyenv的工具。**pyenv是一个Python版本管理工具，它能够进行全局的Python版本切换，也可以为单个项目提供对应的Python版本**。使用pyenv以后，可以在服务器上安装多个不同的Python版本，也可以安装不同的Python实现。不同Python版本之间的切换也非常简单。接下来我们就一起看一下pyenv的安装和使用。

## 3、pyenv是什么? 能干什么?

> pyenv是一个forked自ruby社区的简单、低调、遵循UNIX哲学的Python环境管理工具，它可以**轻松切换全局解释器版**本，同时结合vitualenv插件可以方便的管理对应的包源。

我们知道，在terminal中输入一个命令比如‘ls’时，shell会从当前环境的PATH中的各个目录里看是不是有ls这个可执行文件，如果找到就执行，否则就会报‘command no found’ 的错误，**同理，只要控制PATH变量就能够做到python版本的切换**，pyenv通过在PATH头部插入shims路径来实现对python版本的控制。

pyenv和流行的pipenv、virtualenv的关系

- pipenv是requests 作者 Kenneth Reitz大神写的一个python虚拟环境管理工具，结合了pip和virtualenv的功能，侧重点还是在包环境管理上，使用思路是先创建一个指定python版本的环境，然后在此环境上安装相应的包，好评不错，看到很多大牛都在推荐。
- virtualenv是一个比较传统成熟的虚拟环境管理工具了，用的人也比较多，思路也是创建虚拟环境，然后安装相应的包，要进入环境就source一下activate脚本激活一下，尽管成熟，但是我个人不太喜欢用，在部署项目的时候老是容易出现一些环境问题。
- pyenv相对来说知名度就差很多了，不过也很稳定，这三个环境管理工具我都用过，我个人更喜欢pyenv，理由如下:

1）相对于其他两相对于其他两个工具，pyenv更侧重在python 解释器版本管理上，比包管理更大一个层级，使用pyenv我可以方便的下载指定版本的python解释器，pypy，anaconda等，可以随时自由的在shell环境中本地、全局切换python解释器 &#x20;
2）开发的时候不需要限定某个版本的虚拟环境，只需要在部署的时候用pyenv指定某个版本就好了 &#x20;
3）pyenv切换解释器版本的时候，pip和ipython以及对应的包环境都是一起切换的，所以如果你要同时运行ipython2.x和ipython3.x多个解释器验证一些代码时就很方便 &#x20;
4）pyenv也可以创建好指定的虚拟环境，但不需要指定具体目录，自由度更高，使用也简单

## 4、简单使用

```typescript 
# 查看当前版本
pyenv version
 
# 查看所有版本
pyenv versions
 
# 查看所有可安装的版本
pyenv install --list
 
# 安装指定版本
pyenv install 3.6.5

# 安装新版本后rehash一下
pyenv rehash
 
# 删除指定版本
pyenv uninstall 3.5.2
 
# 指定全局版本
pyenv global 3.6.5
 
# 指定多个全局版本, 3版本优先
pyenv global 3.6.5 2.7.14
 
# 实际上当你切换版本后, 相应的pip和包仓库都是会自动切换过去的


安装完成后，可以使用以下命令将项目的 Python 版本切换为 3.8：
pyenv local 3.8.0

接下来，我们需要在项目 的根目录中创建一个 .npmrc 文件，该文件用于配置 NPM 安装过程中的环境变量。在 .npmrc 文件中添加以下内容：
python=/path/to/project/.python-version
```


# python 安装

[ mirrors / pyenv / pyenv Simple Python version management 🚀 Github 镜像仓库 🚀 源项目地址 ⬇ https://gitcode.net/mirrors/pyenv/pyenv?utm\_source=csdn\_github\_accelerator](https://gitcode.net/mirrors/pyenv/pyenv?utm_source=csdn_github_accelerator " mirrors / pyenv / pyenv Simple Python version management 🚀 Github 镜像仓库 🚀 源项目地址 ⬇ https://gitcode.net/mirrors/pyenv/pyenv?utm_source=csdn_github_accelerator")

```typescript 
brew install pyenv

```


**pyenv(python 版本管理)将帮助我们在我们的电脑中拥有多个 python 版本。**

```typescript 
//我们现在可以使用以下命令继续安装所需的 python 版本
pyenv install 2.7.18

```


**我们可以像这样导出我们的环境变量**

```typescript 
export PATH="$(pyenv root)/shims:${PATH}"

echo 'PATH=$(pyenv root)/shims:$PATH' >> ~/.zshrc

exec $SHELL

```


重新启动 shell 并尝试安装项目的依赖项后,我再次发现没有 python2 可执行文件,但您想知道我做错了什么?如果我刚刚安装它。好吧,我们需要告诉 **pyenv** 使用在我们的终端中运行以下命令的 python 版本

```typescript 
pyenv init

```


确保按照说明进行配置,重新启动终端后,我们可以告诉我们的 shell 使用我们需要的 python 版本

```typescript 
pyenv shell 2.7.18
```


## pyenv切换python版本

查看当前系统中包含的Python版本

```typescript 
[root@python ~]# pyenv versions 
* system (set by /root/.pyenv/version)
```


使用pyenv安装不同的Python版本：

```typescript 
[root@python ~]#pyenv install -v 3.8.1  
[root@python ~]#pyenv install -v 2.7.13 
```


再次查看当前系统中包含的Python版本

```typescript 
[root@python ~]# pyenv versions
* system (set by /root/.pyenv/version)
  2.7.13
  3.8.1
```


切换版本

```typescript 
#切换前为3.8.1
[root@python ~]# python
Python 3.8.1 (default, Apr 20 2020, 15:00:10) 
[GCC 4.8.5 20150623 (Red Hat 4.8.5-39)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> exit()
 
#切换为2.7.13
[root@python ~]# pyenv  global 2.7.13 
[root@python ~]# python
Python 2.7.13 (default, Apr 20 2020, 15:04:15) 
[GCC 4.8.5 20150623 (Red Hat 4.8.5-39)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
```


使用pyenv以后，可以快速切换Python的版本。**切换Python版本以后，与版本相关的依赖也会一起切 换。因此，我们不用担心不同的版本在系统中是否会相互干扰**。例如，切换Python版本以后，相应的 pip也会跟着切换，所以不用担心自己使用的pip版本和Python版本不匹配的问题，如下所示：

```typescript 
[root@python ~]# pyenv  global 3.8.1
[root@python ~]# pip --version
pip 19.2.3 from /root/.pyenv/versions/3.8.1/lib/python3.8/site-packages/pip (python 3.8)
```


如果想要删除Python版本，使用uninstall命令即可。如下所示：

```typescript 
[root@python ~]# pyenv uninstall 2.7.10
```


[离线安装](离线安装.md "离线安装")
