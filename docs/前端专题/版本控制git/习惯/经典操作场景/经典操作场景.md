# 经典操作场景

## 目录

- [我刚才提交了什么?](#我刚才提交了什么)
- [我的提交信息(commit message)写错了](#我的提交信息commit-message写错了)
- [我提交(commit)里的用户名和邮箱不对](#我提交commit里的用户名和邮箱不对)
- [我想从一个提交(commit)里移除一个文件](#我想从一个提交commit里移除一个文件)
- [我意外的做了一次硬重置(hard reset)，我想找回我的内容](#我意外的做了一次硬重置hard-reset我想找回我的内容)
- [暂存(Staging)](#暂存Staging)

# 我刚才提交了什么?

如果你用 `git commit -a` 提交了一次变化(changes)，而你又不确定到底这次提交了哪些内容。你就可以用下面的命令显示当前`HEAD`上的最近一次的提交(commit):

```javascript 
(main)$ git show
or
$ git log -n1 -p

```


# 我的提交信息(commit message)写错了

如果你的提交信息(commit message)写错了且这次提交(commit)还没有推(push), 你可以通过下面的方法来修改提交信息(commit message):

```javascript 
$ git commit --amend --only

```


这会打开你的默认编辑器, 在这里你可以编辑信息. 另一方面, 你也可以用一条命令一次完成:

```javascript 
git commit --amend --only -m 'xxxxxxx'

```


如果你已经推(push)了这次提交(commit), 你可以修改这次提交(commit)然后强推(force push), 但是不推荐这么做。

# 我提交(commit)里的用户名和邮箱不对

如果这只是单个提交(commit)，修改它：

```javascript 
$ git commit --amend --author "New Authorname <authoremail@mydomain.com>"

```


如果你需要修改所有历史, 参考 'git filter-branch'的指南页.

# 我想从一个提交(commit)里移除一个文件

通过下面的方法，从一个提交(commit)里移除一个文件:

```javascript 
$ git checkout HEAD^ myfile
$ git add -A
$ git commit --amend

```


这将非常有用，当你有一个开放的补丁(open patch)，你往上面提交了一个不必要的文件，你需要强推(force push)去更新这个远程补丁。

# 我意外的做了一次硬重置(hard reset)，我想找回我的内容

如果你意外的做了 `git reset --hard`, 你通常能找回你的提交(commit), 因为Git对每件事都会有日志，且都会保存几天。

```javascript 
(main)$ git reflog

你将会看到一个你过去提交(commit)的列表, 和一个重置的提交。选择你想要回到的提交(commit)的SHA，再重置一次:

(main)$ git reset --hard SHA1234


```


# 暂存(Staging)

我需要把暂存的内容添加到上一次的提交(commit)

```javascript 
(my-branch*)$ git commit --amend

//我想要暂存一个新文件的一部分，而不是这个文件的全部
//一般来说, 如果你想暂存一个文件的一部分, 你可这样做:
$ git add --patch filename.x
// -p 简写。这会打开交互模式， 你将能够用 s 选项来分隔提交(commit)；然而, 如果这个文件是新的, 会没有这个选择， 添加一个新文件时, 这样做:

 git add -N filename.x
// 然后, 你需要用 e 选项来手动选择需要添加的行，执行 git diff --cached 将会显示哪些行暂存了哪些行只是保存在本地了。




```
