# cherry-pick

## 目录

- [描述](#描述)
- [应用场景
  ](#应用场景)
- [命令使用](#命令使用)
- [复制多个](#复制多个)
- [cherry-pick 代码冲突](#cherry-pick-代码冲突)
- [找回丢失的代码](#找回丢失的代码)

[   https://ruanyifeng.com/blog/2020/04/git-cherry-pick.html](https://ruanyifeng.com/blog/2020/04/git-cherry-pick.html "   https://ruanyifeng.com/blog/2020/04/git-cherry-pick.html")

# 描述

> 给定一个或多个现有提交，应用每个提交引入的更改，为每个提交记录一个新的提交。这需要您的工作树清洁（没有从头提交的修改）。

**将已经提交的 commit，复制出新的 commit 应用到分支里**

应用场景

commit 都提交了，为什么还要复制新的出来？

应用场景1：有时候版本的一些优化需求开发到一半，**可能其中某一个开发完的需求要临时上，** 或者某些原因导致待开发的需求卡住了已开发完成的需求上线。这时候就需要把 commit 抽出来，单独处理。

应用场景2：有时候**开发分支中的代码记录被污染了**，导致开发分支合到线上分支有问题，这时就需要拉一条干净的开发分支，再**从旧的开发分支中，把 commit 复制到新分支**。

# 命令使用

复制单个
现在有一条feature分支，commit 记录如下：

![](image_PsU8s6Q61R.png)

需要把 b 复制到另一个分支，首先把 commitHash 复制下来，然后切到 master 分支。

![](image_APfKnyprNc.png)

当前 master 最新的记录是 a，使用 `cherry-pick` 把 b 应用到当前分支。

![](image_Yeg-1GKuJB.png)

完成后看下最新的 log，b 已经应用到 master，作为最新的 commit 了。可以看到 commitHash 和之前的不一样，但是提交时间还是保留之前的。

# 复制多个

以上是单个 commit 的复制，下面再来看看 `cherry-pick` 多个 commit 要如何操作。

- **一次转移多个提交：**

```javascript 
git cherry-pick commit1 commit2
```


上面的**命令将 commit1 和 commit2 两个提交应用到当前分支**。

- **多个连续的commit，也可区间复制：**

```javascript 
git cherry-pick commit1^..commit2

```


上面的命令将 commit1 到 commit2 这个区间的 commit 都应用到当前分支（包含commit1、commit2），commit1 是最早的提交。

# cherry-pick 代码冲突

在 `cherry-pick` 多个commit时，可能会遇到代码冲突，这时 `cherry-pick` 会停下来，让用户决定如何继续操作。下面看看怎么解决这种场景。

![](image_M83hKhdkXu.png)

还是 feature 分支，现在需要把 c、d、e 都复制到 master 分支上。先把起点c和终点e的 commitHash 记下来。

![](image_SQ44JkcD0h.png)

切到 master 分支，使用区间的 `cherry-pick`。可以看到 c 被成功复制，当进行到 d 时，发现代码冲突，`cherry-pick` 中断了。**这时需要解决代码冲突，重新提交到暂存区。**

![](image_9nuTcMJ3Sg.png)

然后使用 `cherry-pick --continue` 让 `cherry-pick` 继续进行下去。最后 e 也被复制进来，整个流程就完成了。

以上是完整的流程，但有时候可能需要在代码冲突后，放弃或者退出流程：

- 放弃 `cherry-pick`：

```javascript 
gits cherry-pick --abort

```


回到操作前的样子，就像什么都没发生过。

- 退出 `cherry-pick`：

```javascript 
git cherry-pick --quit

```


**回到操作前的样子。即保留已经 ****`cherry-pick`**** 成功的 commit，并退出 ****`cherry-pick`**** 流程。**

# 找回丢失的代码

**问题描述**       某次[rebase](https://so.csdn.net/so/search?q=rebase\&spm=1001.2101.3001.7020 "rebase")导致我本地已经提交的代码丢失，没有提交到gitlab上。git log也没有记录。

**解决办法**       使用git reflog + git [cherry-pick](https://so.csdn.net/so/search?q=cherry-pick\&spm=1001.2101.3001.7020 "cherry-pick") commitId来重新将该次commit来添加到代码中

**步骤**1.使用git reflog命令来查看你最近所有的提交(非常详细的git记录,包括rebase等操作，有些git log是显示不出来的)

![](https://img-blog.csdnimg.cn/be699ada6f0545659c0c6942eeaf75fa.png)

2.使用git show commitId来查看是不是这次的修改丢失了 &#x20;

![](https://img-blog.csdnimg.cn/4b4787d1aa5544a4b4b7dd66096a4712.png)

3.使用git cherry-pick commitId 来重新把这次修改应用到该分支上 &#x20;

![](https://img-blog.csdnimg.cn/66ed5f6c305247aaa2617844ffabf9b4.png)

4.git cherry-pick的时候可能会有冲突 &#x20;
解决办法：使用vscode把冲突解决，**再git add .然后git cherry-pick --continue继续就**行了。
