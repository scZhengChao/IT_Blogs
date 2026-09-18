# git pull

## 目录

- [描述](#描述)
- [示例](#示例)
  - [git pull 总提示让输入merge 信息](#git-pull-总提示让输入merge-信息)
  - [自动合并](#自动合并)
  - [查看差异](#查看差异)
- [git pull  和 git pull —rebase](#git-pull--和-git-pull-rebase)

## 描述

**将远程存储库中的更改合并到当前分支中**。在默认模式下，`git pull`是`git fetch`后跟`git merge FETCH_HEAD`的缩写。

更准确地说，`git pull`使用给定的参数运行`git fetch`，并调用`git merge`将检索到的分支头合并到当前分支中。&#x20;

- 使用`--rebase`，它运行`git rebase`而不是`git merge`。

# 示例

```纯文本 
git pull <远程主机名> <远程分支名>:<本地分支名>

```


比如，要取回`origin`主机的`next`分支，与本地的`master`分支合并，需要写成下面这样 -

```git 
git pull origin next:master

```


如果远程分支(`next`)要与**当前分支合并**，则冒号后面的部分可以**省略**。上面命令可以简写为：

```git 
git pull origin next

```


上面命令表示，取回`origin/next`分支，再与当前分支合并。实质上，这等同于先做`git fetch`，再执行`git merge`。

```git 
$ git fetch origin
$ git merge origin/next

```


在某些场合，Git会**自动在本地分支与远程分支之间，建立一种追踪关系(tracking)**。比如，在`git clone`的时候，所有本地分支默认与远程主机的同名分支，建立追踪关系，也就是说，本地的`master`分支自动”追踪”`origin/master`分支。

**Git也允许手动建立追踪关系。**

```git 
git branch --set-upstream master origin/next

```


上面命令指定`master`分支追踪`origin/next`分支。

如果当前分支与远程分支**存在追踪关系**，`git pull`就可以**省略远程分支名。**

```git 
git pull origin

```


上面命令表示，**本地的当前分支**自动与对应的`origin`主机”**追踪分支**”(remote-tracking branch)进行合并。

如果**当前分支只有一个追踪分支**，连**远程主机名都可以省略**。

```git 
git pull

```


上面命令表示，当前分支自动与唯一一个追踪分支进行合并。

如果合并需要采用`rebase`模式，可以使用`–rebase`选项。

```git 
git pull --rebase <远程主机名> <远程分支名>:<本地分支名>
```


**git fetch和git pull的区别**

1. *git fetch*：相当于是从远程获取最新版本到本地，不会自动合并。

```git 
$ git fetch origin master
$ git log -p master..origin/master
$ git merge origin/master

```


以上命令的含义：

- 首先从远程的`origin`的`master`主分支下载最新的版本到`origin/master`分支上
- 然后比较本地的`master`分支和`origin/master`分支的差别
- 最后进行合并

上述过程其实可以用以下更清晰的方式来进行：

```git 
$ git fetch origin master:tmp
$ git diff tmp 
$ git merge tmp

```


1. *git pull*：相当于是从远程获取最新版本并`merge`到本地

```git 
git pull origin master

```


上述命令其实相当于`git fetch` 和 `git merge`在实际使用中，`git fetch`更安全一些，因为在`merge`前，我们可以**查看更新情况，然后再决定是否合并。**

## git pull 总提示让输入merge 信息

    [https://blog.csdn.net/diyiday/article/details/83791321](https://blog.csdn.net/diyiday/article/details/83791321 "https://blog.csdn.net/diyiday/article/details/83791321")

    这是因为git pull的时候会自动进行merge操作

1. 方法一（推荐）：当你本地有commit的时候，建议使用**git pull origin develop --rebase 进行**拉取代码，就是拉取并rebase的意思，这样就不会出现您上面说的问题。
2. 方法二 ：当你**本地修改还没有commit，那么你可以将本地的修改先暂存起来，git stash**，然后git pull，这样不会有冲突，最后再git stash pop取出你的修改。
3. 方法三 ： 再或者你可以使用git fetch，fetch是不会自动merge的，**fetch到一个本地的新的分支，然后rebase那个新分支(具体查看git fetch 操作)**
   1. git fetch origin master:tmp

      在本地新建一个temp分支，并将远程origin仓库的master分支代码下载到本地temp分支
   2. git diff tmp

      来比较本地代码与刚刚从远程下载下来的代码的区别
   3. git merge tmp

      合并temp分支到本地的master分支
   4. git branch -d temp

      如果不想保留temp分支 可以用这步删除

## 自动合并

1. git pull --rebase &#x20;

如果有冲突解决完冲突后 git add .

    git rebase --continue   解决冲突后继续  代码改完了之后 要 git add . 然后git rebase --continue

    git rebase --skip         跳过

    git rebase --abort        回到rebase 之前的状态

1. Pulling without specifying how to reconcile divergent branches is
2. fatal: Need to specify how to reconcile divergent branches.

默认自动合并

git config pull.rebase false --global

## 查看差异

git pull对于拉下来的修改文件自动对其进行git add /rm 及git commit 操作。所以拉下来的文件有那些修改，查看的方式可把它们归结于上一次提交的比较。 &#x20;

`git diff HEAD `显示工作目录与git仓库之间的差异，而`git diff HEAD^` 则显示上一次提交之前工作目录与git仓库之间的差异。所以我们在**git pull后**，可以通过`git diff HEAD^` 来查看拉**下来的文件有那些具体的修改**。

# git pull  和 git pull —rebase

```纯文本 
git pull = git fetch + git merge
git pull --rebase = git fetch + git rebase 

现在有两个分支:test和master,假设远端的master的代码已经更改了(在B基础上变动:C,F),test的代码更改了要提交代码(在B基础上变动:D,E),如下图：

      D---E test
      /
 A---B---C---F--- master

问题就来了,如果C,F和D,E的更改发生冲突,那么就需要我们合并冲突了,下面我们来看看git merge和git rebase怎么合并的

git merge:

       D--------E
      /          \
 A---B---C---F--- -G---    test, master
 
git rebase
  git --rebase会将两个分支融合成一个线性的提交， 不会形成新的节点 （下面是在master上rebase）
 A---B---D---E---C‘---F‘---   test, master

rebase好处
  想要更好的提交树，使用rebase操作会更好一点。
  这 样可以线性的看到每一次提交，并且没有增加提交节点。 
  merge 操作遇到冲突的时候，当前merge不能继续进行下去。手动修改冲突内容后，add 修改，commit 就可以了。
  而rebase 操作的话，会中断rebase,同时会提示去解决冲突。
  解决冲突后,将修改add后执行git rebase –continue继续操作，或者git rebase –skip忽略冲突。
```
