# Git Subtree

## 目录

- [Git Subtree 好在哪里](#Git-Subtree-好在哪里)
- [Git Subtree 的原理](#Git-Subtree-的原理)
  - [1、初始化子项目Subtree](#1初始化子项目Subtree)
  - [2、像往常一样更新代码](#2像往常一样更新代码)
  - [3、提交更改到子项目的Git服务器](#3提交更改到子项目的Git服务器)
  - [4、更新子项目新的代码到父项目](#4更新子项目新的代码到父项目)
- [Git Subtree 简明使用手册](#Git-Subtree-简明使用手册)
- [高阶功能](#高阶功能)

## Git Subtree 好在哪里

用一句话来描述 Git Subtree 的优势就是：

> 经由 Git Subtree 来维护的子项目代码，对于父项目来说是透明的，所有的开发人员**看到的就是一个普通的目录，原来怎么做现在依旧那么做**，只需要维护这个 Subtree 的人在合适的时候去做同步代码的操作。

它是怎么做到的呢？简单说下原理

## Git Subtree 的原理

首先，你有两个伟大的项目——我们叫他P1项目、P2项目，还有一个牛逼的要被多个项目共用的项目——我们叫他S项目。我们通过简要讲解使用Subtree来同步代码的过程来解释Subtree的原理

### 1、初始化子项目Subtree

通过

```typescript 
cd P1项目的路径
git subtree add --prefix=用来放S项目的相对路径     S项目git地址    xxx分支
```


这样的命令 **，把S项目（我们姑且叫他S项目）的代码下载到--prefix所指定的目录——我们姑且叫他S目录把，并在P1项目里自动产生一个commit（就是把S目录的内容提交到P1项目里）。**

对于P2项目也做同样的操作

### 2、像往常一样更新代码

大家在P1项目里各种提交commit，其中有些commit会涉及到S目录的更改，正如前面提到的，这是没任何关系的，大家也不会感受到有任何不一样。

### 3、提交更改到子项目的Git服务器

**关键的地方来了：** ​**当维护这个S项目 Subtree 的人希望把最近这段时间对S目录的更改提交到S项目的 Git 服务器上时，他执行一段类似于这样的命令：**

```typescript 
cd P1项目的路径
git subtree push --prefix=S项目的路径 S项目git地址 xxx分支
```


**Git 会遍历所有的commit，从中找出针对S目录的更改，然后把这些更改记录提交到S项目的Git服务器上**

### 4、更新子项目新的代码到父项目

OK，现在S项目有大量的新代码了，P2项目也想使用这些新代码，维护P2这个Subtree的人只要执行：

```typescript 
git subtree pull --prefix=S项目的路径 S项目git地址 xxx分支
```


这样就可以将P2项目里S项目目录里的内容更新为S项目xxx分支的最新代码了。

## Git Subtree 简明使用手册

假设，你要在各个项目里的\_components/zenjs\_这个目录对 [*http://github.com/youzan/zenjs.git*](https://link.segmentfault.com/?enc=Z5DU6gaXMiyMVSTiizeBIQ==.4CwtMbQVZG+YE43XGX0raHE0KkgqLf0XTI0rD/sqguYfbb6i3PukXNIMvkHsyjH/ "http://github.com/youzan/zenjs.git") 这个项目做Subtree

1.首先必须确保各个项目已经添加zenjs 这个 remote（关于remote是什么可以看[这里](https://link.segmentfault.com/?enc=sBK7hlxNUQoyEKo/7suj0g==.HORdGs7FYx72JyD0VumALzqxGHDBgzLamP2wkO4KI4kGjHA5DDENZLNMhAgzWdnp "这里")）:

```typescript 
git remote add zenjs http://github.com/youzan/zenjs.git
```


2.将zenjs添加到各个项目里

```typescript 
git subtree add --prefix=components/zenjs zenjs master  
```


3.各项目更新zenjs代码的方法:

```typescript 
git subtree pull --prefix=components/zenjs zenjs master
```


4.各项目提交zenjs代码的方法:

```typescript 
git subtree push --prefix=components/zenjs zenjs hotfix/zenjs_xxxx
```


这会在远程的zenjs的**仓库里生成一个叫 hotfix/zenjs\_xxxx 的的分支**，包含了你过去对components/zenjs 所有的更改记录

5.把**hotfix/zenjs\_xxx分支更新并合并到master并提交**

这样其他工程就可以更新到你提交的代码了。

有人可能会问，只用master分支，不管版本，太有风险了。

对的，正如我们前面说到的那样，subtree的方案适用的场景是：各个项目共用一个库，而这个库正在快速迭代更新的过程中。如果追求稳定，只需要给库拉出一个如v0.1.0这样的版本号命名的稳定分支，subtree只用这个分支即可。

我们现在使用的方式就是：A项目经常会对zenjs做更新，所以A项目用subtree来双向同步；B项目只是使用，所以用bower用来按版本来更新代码。

## 高阶功能

重新split出一个新起点（这样，每次提交subtree的时候就不会从头遍历一遍了）

```typescript 
git subtree split --rejoin --prefix=components/zenjs --branch new_zenjs
git push zenjs new_zenjs:master
```
