# reset 姿势

## 目录

- [如何撤回reset —hard](#如何撤回reset-hard)
- [git reset](#git-reset)
  - [ –-soft 与  –-hard 的区别](#--soft-与--hard-的区别)
  - [回退：](#回退)
    - [已经使用了  git add 缓存了代码](#已经使用了--git-add-缓存了代码)
    - [已经用 git commit  提交了代码](#已经用-git-commit提交了代码)
  - [回退远程分支](#回退远程分支)
- [把commit 的文件还原到工作区](#把commit-的文件还原到工作区)
  - [将commit撤销，把文件返回暂存区](#将commit撤销把文件返回暂存区)
  - [将暂存区文件返回到工作区](#将暂存区文件返回到工作区)

# 如何撤回reset —hard

- **尚未执行**\*\*`git push --force`\*\***且未关闭 Git**
  - 执行`git reflog`命令，该命令会记录所有`HEAD`的历史操作。
  - 在输出中找到`reset`操作之前的提交记录，通常可以通过`HEAD@{1}`来表示最近的一次操作之前的状态。
  - 执行`git reset --hard HEAD@{1}`，将`HEAD`指针恢复到`reset`操作之前的提交，从而撤销`git reset --hard`的操作。
- **已经执行了**\*\*`git push`\*\***更改**
  - 通过`git reflog`查找推送之前的提交哈希值。
  - 使用`git reset --hard <commit_hash>`命令恢复到该提交。
  - 再次使用`git push --force`将更改推送到远程仓库，以覆盖错误的推送。

# git reset

## &#x20;–-soft 与  –-hard 的区别

git reset 命令分为两种： git reset –-soft 与 git reset –-hard ，

区别是：

- 前者表示只是改变了HEAD的指向，本地代码不会变化，我们使用git status依然可以看到，同时也可以git commit提交。（但是文件还是在缓存区，工作区和缓存区都没有变化）
- 后者直接回改变本地源码，不仅仅指向变化了，代码也回到了那个版本时的代码。（工作区和缓存区都变了）
- git reset id  只是回退缓存区；而不更改工作区（用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变。）

```javascript 
 git reset HEAD^ hello.php  # 回退 hello.php 文件的版本到上一个版本 
```


## 回退：

```javascript 
git reset  --hard HEAD^   //回退到上个版本
git reset --hard commit_id  //回退到指定版本
git reset android   // 有冲突时可以回退 回退子项目

```


### 已经使用了  git add 缓存了代码

1. 可以使用  `git reset HEAD filepathname` 来放弃指定文件的缓存（比如： git reset HEAD readme.md）
2. 放弃所以的缓存可以使用 **git reset HEAD .   命令。**

&#x20; 此命令用来清除 git  **对于文件修改的缓存**。相当于撤销 git add 命令所在的工作。

### 已经用 git commit  提交了代码

- git log    
- **git reset --hard HEAD^** 来回退到上一次commit的状态。
- git reset --hard  commitid 此命令可以用来回退到任意版本：

## 回退远程分支

1. git push origin HEAD --force #远程提交回退
2. 或者
   1. git reset--hard HEAD\~1&#x20;
   2. git push --force

# 把commit 的文件还原到工作区

### 将[commit](https://so.csdn.net/so/search?q=commit\&spm=1001.2101.3001.7020 "commit")撤销，把文件返回暂存区

```text 
git reset --soft HEAD^
```


### 将暂存区文件返回到工作区

```bash 
git reset HEAD

```


[指针](./指针/index.md "指针")
