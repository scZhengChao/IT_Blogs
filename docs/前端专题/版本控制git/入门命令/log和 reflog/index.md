# log和 reflog

## 目录

- [--graph --all](#--graph---all)
- [reflog](#reflog)
  - [描述](#描述)
  - [应用场景](#应用场景)
  - [命令使用](#命令使用)
  - [log  和  reflog](#log--和--reflog)

reflog： **记录的是 你git 操作的全过程；merge；rebase；commit 等等**

log： 记录的你**提交的一个基线 commit 记录的； 总的来说；不全**

# --graph --all

切换分支到 test 此时test 分支与dev分支基线一致 执行命令  git log --graph --all 可以看到

merge 的 合并 过程

![](./image/image_A0dD7tJfPk.png)

rebase 的 合并操作

![](./image/image_kSyMEdqsDg.png)

# reflog

### 描述

> 此命令管理重录中记录的信息。

如果说 `reset --soft` 是后悔药，那 reflog 就是强力后悔药。它记录了所有的 commit 操作记录，便于错误操作后找回记录。

### 应用场景

应用场景：某天你眼花，发现自己在其他人分支提交了代码还推到远程分支，这时因为分支只有你的最新提交，就想着使用 `reset --hard`，结果紧张不小心记错了 commitHash，reset 过头，把同事的 commit 搞没了。没办法，`reset --hard` 是强制回退的，找不到 commitHash 了，只能让同事从本地分支再推一次（同事瞬间拳头就硬了，怎么又是你）。于是，你的技术形象又一落千丈。

### 命令使用

![](./image/image_AG5vK7hh3k.png)

分支记录如上，想要 reset 到 b。

![](./image/image_y7FRRaZSbu.png)

误操作 reset 过头，b 没了，最新的只剩下 a。

![](./image/image_0HPMKV3AOu.png)

这时用 `git reflog` 查看历史记录，把错误提交的那次 commitHash 记下。

再次 reset 回去，就会发现 b 回来了。

## log  和  reflog

- log  本 分支的 提交&#x20;
- reflog 本地的所有提交
