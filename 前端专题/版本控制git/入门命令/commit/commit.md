# commit

## 目录

- [git commit](#git-commit)
  - [please commit your changes or stash them before you switch branches](#please-commit-your-changes-or-stash-them-before-you-switch-branches)
  - [撤销git commit ](#撤销git-commit-)
  - [撤销git push](#撤销git-push)
  - [修改commit -m 的内容  ](#修改commit--m-的内容)
    - [    只是修改最后一次](#-只是修改最后一次)
    - [   修改制定commid\_id的煮熟内容](#-修改制定commid_id的煮熟内容)
    - [最新](#最新)
  - [允许提交空：](#允许提交空)
  - [查看commit的内容](#查看commit的内容)
  - [跳过eslint检查](#跳过eslint检查)

# git commit

创建提交记录&#x20;

这个步骤是创建了一个提交对象，提交对象里面就记录了提交的时间、作者、以及提交的原因等信息；

上述 git commit 命令做了以下几件事：&#x20;

- 首先所有具体文件的数据，已经在 add 操作时用数据对象记录在Git数据库中，并且所有文件的索引都保存在**暂存区**中，所以 commit 操作就不用再创建数据对象了&#x20;
- 如果**暂存区**中存在目录关系，就会先创建树对象来记录文件目录关系，这样文件数据和目录关系都有了记录&#x20;
- 然后会再创建一个树对象，代表当前项目快照，这个树对象里面包含的就是上述信息，也就是所有要保存记录的数据&#x20;
- 然后用这个树对象，配置中的user.name和email，以及当前的时间戳和 -m 参数后面的内容生成提交对象&#x20;

我们可以用 git log 命令，查看提交的历史记录，就能拿到 commit 的 SHA-1值（也就是我们平时说的commit id）&#x20;

## please commit your changes or stash them before you switch branches

当你切换分支的时候;有没有提交的文件：

- git status 切换分支

![  ](a53b5ee2a4a0d82ce7ccd5ea8c27a048_cJVLvH0MJY.png "  ")

- git checkout -- 文件   把文件在工作区的修改全部撤销；总之就是让这个文件回到最近的git commit 或者git add 的状态
- git checkout -- .  就是撤销所有的文件

## 撤销git commit&#x20;

1. &#x20;执行 git log 查看需要撤销的commit的前面一个提交版本的id；
2. 执行 git reset --hard commit\_id ，该commit\_id为需要撤销的commi**t的提交的前面一个提交的版本**，即需要恢复到的提交的id，重置至指定版本的提交，达到撤销提交的目的
3. &#x20;执行 git log 查看，commit提交已撤销，git reset 还原，git log 也随之还原

注意：

是 git log 而不是git reflog ；

代码也同步还原到 你 git reset --hard commit\_id  的id的版本，也就是说，你以后add . 的代码不见了，

## 撤销git push

1. &#x20;执行  git log查看日志，获取需要回退的版本号 
2. &#x20;执行 git reset –-soft <版本号> ，如 git reset --soft 4f5e9a90edeadcc45d85f43bd861a837fa7ce4c7 ，重置至指定版本的提交，达到撤销提交的目的然后执行 git log 查看

此时，已重置至指定版本的提交，log中已经没有了需要撤销的提交，也是git log没有提交记录，但是本地代码没变，和撤销git commit 的区别是--soft没变，--hard变了；

1. &#x20;执行 git push origin 分支名 –-force ，强制提交当前版本号。

至此，撤销push提交完成。

## 修改commit -m 的内容 \*\* \*\*

###     **只是修改最后一次**

```react tsx 
git commit --amend -m "内容" 
```


### \*\*  \*\* 修改制定commid\_id的煮熟内容

1. 需要获取到想要修改内容**之前**一个commit id
2. 使用交互式变基比命令

**git rebase -i "需要修改的commit的前一次commit的编号"**

git rebase -i 28b197a00473ea1b46fab13263c294cce0d7401c

1. 输入i，**将pick 改为reword**，rewrite3改为想要修改的commit内容，即rewrite3\_new。改完之后为按esc键。再按shift+冒号键。输入wq。再按enter键
2. 之后会再次弹出一个框框
3. 再次按照上面vim的操作，将rewrite3修改为rewrite3\_new即可。然后保存退出
4. git log 发现修改成功

### 最新

- 在项目目录下打开git bash，输入 **git rebase -i HEAD\~20（当前版本往前推20个）** 或者

  **git rebase -i "需要修改的commit的前一次commit的编号"** 如果要从根节点（root节点）就进行root变基: &#x20;

  git rebase -i --root &#x20;

  (-i即--interactive)
- 回车之后会进入vim编辑界面，使用方向键选到提交信息有问题的那一行， &#x20;

  然后输入i进入编辑模式，将这一行的 `pick` 改为 `r`  ，然后按一下esc，接着输入   :x    退出编辑器 &#x20;
- 退出之后会再次进入vim编辑器界面，按 i 进入编辑模式，然后修改第一行的提交信息为正常，之后再按 esc 键，输入 :x 退出编辑器。

## 允许提交空：

git commit --allow-empty

## 查看commit的内容

    首先，需要通过打印所有commit hashID，之后的git show都是基于commit hashID输出的。

1.查看最新的commit

git show

2.查看指定commit hashID的所有修改：

- git log
- git show commitId

## 跳过eslint检查

git commit --no-verify -m "commit"   就可以跳过eslint代码检查
