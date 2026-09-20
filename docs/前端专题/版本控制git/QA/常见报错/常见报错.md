# 常见报错

## 目录

- [git bash 中文乱码](#git-bash-中文乱码)
- [reference broken](#reference-broken)
- [Updating an unborn branch with changes added to the index.](#Updating-an-unborn-branch-with-changes-added-to-the-index)
- [Git Pull Failed Your local changes would be overwritten by merge](#Git-Pull-Failed-Your-local-changes-would-be-overwritten-by-merge)
- [insufficient permission for adding an object to repository database](#insufficient-permission-for-adding-an-object-to-repository-database)

# git bash 中文乱码

1. 打开git bash后，

对窗口右键->Options->Text->Locale改为zh\_CN，Character set改为UTF-8

关闭git bash，再打开，可以显示中文了。

1. 如果前一种方法不行

则在git bash中尝试执行下面内容

git config --global core.quotepath false &#x20;

关闭git bash，再打开，可以显示中文了。

1. 如果前面不行

git config --global i18n.commitencoding utf-8    #如果是GBK 请换成gbk

git config --global i18n.logoutputencoding utf-8   #如果是GBK 请换成gbk

export LESSCHARSET=utf-8

关闭git bash，再打开，可以显示中文了。

# **reference broken**

原因： git push 过程中电脑重启了； 导致git 文件损坏

解决办法

1. 第一步：删除到.git目录下的master文件

rm ./.git/refs/remotes/origin/master

1. 第二步：抓取远程仓库最新代码

git fetch

1. 第三步：远程分支内容合并到本地master分支下

git merge origin/master

# **Updating an unborn branch with changes added to the index.**

后来发现原来是 提交到版本库中的文件没有没有提交到 分支中,还在暂存区

- 所以执行  git commit -m 'xx' 就行了

# **Git Pull Failed Your local changes would be overwritten by merge**

在你pull的时候发现pull失败，因为本地有修改，所以有两种解决方式：

1.将修改暂存，保留修改

\$ git stash     //暂存当前正在进行的工作。

\$ git pull      //拉取服务器的代码

\$ git stash pop  //合并暂存的代码

2.直接覆盖，放弃本地修改

\$git reset --hard  //回滚到上一个版本  硬覆盖

\$git pull

**The following untracked working tree files would be overwritten by checkout**

通过错误提示可知，是由于一些untracked working tree files引起的问题。所以只要解决了这些untracked的文件就能解决这个问题。

    解决方式：

git clean -d -fx

即可。可能很多人都不明白-d，-fx到底是啥意思，其实git clean -d -fx表示：删除 一些 没有 git add 的 文件；

    git clean 参数

    -n 显示将要删除的文件和目录；

    -x -----删除忽略文件已经对git来说不识别的文件

    -d -----删除未被添加到git的路径中的文件

    -f -----强制运行

    git clean -n

    git clean -df

    git clean -f

Updates were rejected because the tip of your current branch is behind

出现这个错误的原因是git本地仓库的当前版本低于远程仓库的版本(大白话就是：你在github上进行的修改没有同步到本地git仓库中)。&#x20;

解决方案

错误的解决方案(注意是错误的解决方案)

```javascript 
 在终端下输入：git push -u origin master -f
   这句话执行的后果就是在远程仓库中进行的相关修改会被删除，使远程仓库回到你本地仓库未修改之前的那个版本，
   然后上传你基于本地仓库的修改。这如果在企业开发中就会让别的程序员的这些天的开发付之东流，一切回到解放前。
```


正确的解决方案

```javascript 
 先在终端下输入：git pull origin master
这句话是说将远程中进行的相关修改保存下来
  但这时可能会报错：error: Your local changes to the following files would be overwritten by merge:
  解决方案看我另一篇博客：https://blog.csdn.net/IT_SoftEngineer/article/details/107133284
  解决上述问题后就可保证远程仓库的更新会被同步到本地而本地仓库的修改也不会被覆盖
  然后就是add,commit,push命令将本地的修改上传到远程仓库中
```


# insufficient permission for adding an object to repository database

```javascript 
➜  atd git:(b4.232) ✗ git pull
remote: Counting objects: 78, done.
remote: Compressing objects: 100% (77/77), done.
remote: Total 78 (delta 60), reused 0 (delta 0)
error: insufficient permission for adding an object to repository database .git/objects
fatal: failed to write object
fatal: unpack-objects failed
```


git报错

insufficient permission for adding an object to repository database&#x20;

是因为项目的 .git 目录有些文件夹的权限是root用户，

解决办法，切换到root超级管理员，修改文件所属用户为当前电脑用户

chown -R xxxx: .git
