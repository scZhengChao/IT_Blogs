# revert

## 目录

- [git revert](#git-revert)
  - [描述](#描述)
  - [应用场景](#应用场景)
  - [命令使用](#命令使用)
    - [revert 普通提交](#revert-普通提交)
    - [revert 合并提交](#revert-合并提交)
    - [revert 合并提交后，再次合并分支会失效](#revert-合并提交后再次合并分支会失效)
      - [原因分析](#原因分析)
      - [解决方案](#解决方案)
      - [案例](#案例)
    - [revert 多次提交](#revert-多次提交)

# git revert

        跟git reset用法基本一致，git revert 撤销某次操作，此次操作之前和之后的 commit和history都会保留，并且把这次撤销，作为一次最新的提交，如下： 新增一次提交作为抵消；而不是直接回退；

撤销（revert）被**设计为撤销公开的提交**（**比如已经push）的安全方式**，git reset被设计为重设本地更改 （精髓学到了）

因为两个命令的目的不同，它们的实现也不一样：重设完全地移除了一堆更改，而撤销保留了原来的更改，用一个新的提交来实现撤销&#x20;

两者主要区别如下：&#x20;

- git revert**是用一次新的commit来回滚之前的commit，git reset是直接删除指定的commit**
- git reset 是把HEAD向后移动了一下，**而git revert是HEAD继续前进**，只是新的commit的内容和要revert的内容正好相反，能够抵消要被revert的内容
- 在回滚这一操作上看，效果差不多。但是在日后继续 merge 以前的老版本时有区别

git revert是用一次逆向的commit“中和”之前的提交，因此日后合并老的branch时，之前提交合并的代码仍然存在，导致不能够重新合并&#x20;

但是git reset是之间把某些commit在某个branch上删除，因而和老的branch再次merge时，这些被回滚的commit应该还会被引入&#x20;

- 如果**回退分支的代码以后还需要的情况则使用git revert**， 如果分支是**提错了没用的**并且**不想让别人发现这些错误代码**，则使用git reset

## 描述

> 给定一个或多个现有提交，恢复相关提交引入的更改，并记录一些这些更改的新提交。这就要求你的工作树是干净的（没有来自头部的修改）。

将现有的提交还原，恢复提交的内容，并生成一条还原记录。

- git revert是用一次逆向的commit“中和”之前的提交
- git reset 是把HEAD向后移动了一下，而git revert是HEAD继续前进，只是新的commit的内容和要revert的内容正好相反，能够抵消要被revert的内容。

## 应用场景

应用场景：有一天测试突然跟你说，你开发上线的功能有问题，需要马上撤回，否则会影响到系统使用。这时可能会想到用 reset 回退，可是你看了看分支上最新的提交还有其他同事的代码，用 reset 会把这部分代码也撤回了。由于情况紧急，又想不到好方法，还是任性的使用 reset，然后再让同事把他的代码合一遍（同事听到想打人），于是你的技术形象在同事眼里一落千丈。

## 命令使用

### revert 普通提交

学会 revert 之后，立马就可以拯救这种尴尬的情况。

现在 master 记录如下：

![](./assets/image/image_nSWPKePKKr.png)

```javascript 
git revert 21dcd937fe555f58841b17466a99118deb489212

```


revert 掉自己提交的 commit。

![](./assets/image/image_hATZDGfglS.png)

因为 revert 会生成一条新的提交记录，这时会让你**编辑提交信息，编辑完后 :wq 保存退出就好了。**

![](./assets/image/image_9JJNkM-Rgx.png)

再来看下最新的 log，生成了一条 revert 记录，虽然自己之前的提交记录还是会保留着，但你修改的代码内容已经被撤回了。

### revert 合并提交

这个命令有一个特殊情况，就是**反做的commit是一次merge**，这时会遇到下边的错误。

```typescript 
git revert 83e2776
error: commit 83e2776adb7a47617fbd181228906e52ada396ac is a merge but no -m option was given.
fatal: revert failed

```


在 git 的 commit 记录里，**还有一种类型是合并提交，想要 revert 合并提交，使用上会有些不一样。**

![](./assets/image/image_5m5TDZ-n0y.png)

现在的 master 分支里多了条合并提交。

![](./assets/image/image_jsm3Rfm9R0.png)

**使用刚刚同样的 revert 方法，会发现命令行报错了。**

为什么会这样？在官方文档中有解释。

> 通常无法 revert 合并，因为您**不知道合并的哪一侧应被视为主线**。此选项指定主线的父编号（从1开始），并允许 revert 反转相对于指定父编号的更改

为什么呢？因为此时git不知道要做什么。merge commit是两个分支的汇合点。本质上这两个分支地位是完全相等的。虽然从下边的图看来，似乎master是你想要的。但是话说回来，master也仅仅是个名字而已，与其他分支并无区别。另外，这个merge也不一定发生在master分支。

解决方法正如错误提示中提示的那样——**指定父节点即可**。

```typescript 
$ git log -2
commit d607cb1b05a0fde3ded3078b0284d5c3a6440978 (HEAD -> master)
Author: chenfeiyang <30@qq.com>
Date:   Fri Apr 2 22:40:20 2021 +0800

    ddsd

commit 83e2776adb7a47617fbd181228906e52ada396ac
Merge: 7f68def abc78f0
Author: chenfeiyang <30@qq.com>
Date:   Fri Apr 2 22:39:46 2021 +0800

    Merge branch 'test'

```


通过以上操作，我们可以看到，我们要revert的commit `83e2776`，有两个父节点，`7f68def abc78f0`。我们想保留的是master分支上的修改，新的分支有问题，不要了，需要继续改一下。

```typescript 
$ git revert 83e2776 -m 1
[master ede1c4c] Revert "Merge branch 'test'"
 1 file changed, 1 insertion(+), 1 deletion(-)

```


我的理解是因为合并提交是两条分支的交集节点，而 git 不知道需要撤销的哪一条分支，需要**添加参数 -m 指定主线分支，保留主线分支的代码，另一条则被撤销。**

**-m 后面要跟一个 parent number 标识出"主线"，一般使用 1 保留主分支代码。**

**merge的revert:加上-m表示撤回哪一个分支的。它的数据是1或2.**

![](./assets/image/image_VkjAbN6Ofn.png)

```javascript 
git revert -m 1 <commitHash>
```


### revert 合并提交后，再次合并分支会失效

#### 原因分析

revert 操作实际是**只是进行了一次逆向 commit**，将 merge 的代码进行回滚，但是 commit 的记录还存在。也就是说，dev 上面存在的待提交的代码，其实已经是 master 的过去代码，属于已提交过的状态，所以不会显示 different。

![](./assets/image/image_TDZVut8BGZ.png)

还是上面的场景，**在 master 分支 revert 合并提交后，然后切到 feature 分支修复好 bug，再合并到 master 分支时，会发现之前被 revert 的修改内容没有重新合并进来。**

因为使用 revert 后， **feature 分支的 commit 还是会保留在 master 分支的记录中，当你再次合并进去时，git 判断有相同的 commitHash，就忽略了相关 commit 修改的内容。**

这时就需要 revert 掉之前 revert 的合并提交，有点拗口，接下来看操作吧。（**我觉得这个有点问题；在自己的分支上revert不就行了吗；commit继续前进）**

![](./assets/image/image_OX9Fnv_T_m.png)

现在 master 的记录是这样的。

![](./assets/image/image_6tWO29XUo-.png)

#### 解决方案

**方案一：官方推荐方法**

该核心思想就是：对 revert 的那次提交记录再次 revert 。

- 首先，切换到 master 分支，并基于 master 分支拉出一个分支 revert\_tmp。作为 master 的副本，revert\_tmp 的作用就是保存 revert 的提交记录；

```typescript 
git checkout master
git checkout -b revert_tmp
```


- 其次，在 master 分支上找到 revert 的那条提交记录的版本号，回滚至之前的版本（版本号可以通过“git log”命令，或者从网页端查看）；

```typescript 
git log         # 查询<版本号>，格式，如：f2c3b544166eec612ea6814d6cd19aeef46824f8
git revert <版本号>  
```


- 然后，切换到 dev 分支上，将 revert\_tmp 这个分支 merge 到 dev 分支上。

```typescript 
git checkout dev 
git merge revert_tmp 
git push -f
```


- 最后，在 dev 重新提交对 master 的 merge 申请，会发现 revert 之前的代码都回来了。

#### 案例

要上线了 master 分支 merge feature分支,后上线 &#x20;

```typescript 
git checkout master
git merge origin/feature
```


此时发现feature分支代码有问题, master 就revert此次merge  (紧急回滚上线)

(野路子操作,正规线上回滚操作流程 应该是每次上线打个tag,想回滚直接部署前一个tag)

```typescript 
git revert < commit id > -m 1 

```


在feature 分支把问题修复后,master分支再次merge feature分支

```typescript 
git merge origin/feature
```


问题出现了 **第一次merge的代码在master里"消失了",再怎么merge 都无法merge上**&#x20;

对 revert 的那次提交记录再次进行revert  (官方推荐方法)

```typescript 
git checkout master
# 从master拉一个新分支 revert_tmp
git checkout -b revert_tmp


# 找到 revert 的那条提交记录，注意了，revert 相关的会有两条记录，第一条是 revert，第二条是 revert 后 merge 的记录，这里取第一条
# 用revert_tmp分支revert之前的revert
git revert <版本号>

```


这样代码就都回来了 

当然也可以直接在master 上revert 之前revert的分支即可(不用新拉分支), 但是注意解决好冲突

### revert 多次提交

通过指定提交范围，git revert将撤消多个提交。

```typescript 
$ git revert da8b496..faada93
```
