# git merge 和 git rebase的区别

## 目录

- [git rebase 让你的提交记录更加清晰可读](#git-rebase-让你的提交记录更加清晰可读)
  - [git merge 和 git rebase 的区别](#git-merge-和-git-rebase-的区别)
  - [git rebase 交互模式](#git-rebase-交互模式)
  - [rebase 的风险](#rebase-的风险)

# git rebase 让你的提交记录更加清晰可读

git rebase 的使用

rebase 翻译为**变基**，它的作用和 merge 很相似，用于**把一个分支的修改合并到另外一个分支上**。

如下图所示，下图介绍了经过 rebase 前后提交历史的变化情况。

![](./assets/image/image_dF6iJp5aEg.png)

现在我们来用一个例子来解释一下上面的过程。

假设我们现在有2条分支，一个为 `master`，一个为 `feature`，他们都基于初始的一个提交 `add readme`进行检出分支，之后，`master` 分支增加了 `3.js`,和 `4.js`的文件，分别进行了2次提交，`feature`也增加了 `1.js `和` 2.js` 的文件，分别对应以下2条提交记录。

![](./assets/image/image_y70KqU5aP5.png)

![](./assets/image/image_VnNh7ep3Gj.png)

结合起来看是这样的：

![](./assets/image/image_eQnNL7DvMu.png)

此时，切换到` `**`feature/1`** 分支下，执行 `git rebase master` ,成功之后，通过 log 查看记录。

如下图所示：可以看到**先是逐个应用**了 `master` 分支的更改，然后以 `master`分支**最后的提交作为基点**，再逐个应用 `feature` 的每个更改。

![](./assets/image/image_UisvFTmur7.png)

所以，我们的提交记录就会非常清晰，没有分叉，上面演示的是比较顺利的情况，但是大部分情况下，rebase 的过程中会产生冲突的，此时，就需要手动解决冲突，然后使用 `git add` 、`git rebase --continue` 的方式来处理冲突，完成 `rebase`，如果不想要某次 `rebase` 的结果，那么需要使用 `git rebase --skip` 来跳过这次 `rebase`。

## git merge 和 git rebase 的区别

不同于 `git rebase`的是，`git merge` 在不是 `fast-forward`（快速合并）的情况下，**会产生一条额外的合并记录**，类似 **`Merge branch 'xxx' into 'xxx'`** 的一条提交信息。

![](./assets/image/image_hW5npXDWCq.png)

另外，在解决冲突的时候，用 `merge` **只需要解决一次冲突即可**，简单粗暴，而用 `rebase` 的时候 ，**需要一次又一次的解决冲突。**

## git rebase 交互模式

在开发中，常会遇到在**一个分支上产生了很多的无效的提交**，这种情况下使用 `rebase` 的**交互式模式**可以把**已经发生的多次提交压缩成一次提交，** 得到了一个干净的提交历史，例如某个分支的提交历史情况如下：

![](./assets/image/image_O6eQcXQlMR.png)

进入交互式模式的方法是执行：

```git 
git rebase -i <base-commit>

```


参数 `base-commit` 就是指明**操作的基点提交对象**，基于这个基点进行 `rebase` 的操作，对于上述提交历史的例子，我们要把最后的一个提交对象 （ac18084） 之前的提交压缩成一次提交，我们需要执行的命令格式是

```git 
git rebase -i ac18084

```


此时会进入一个 `vim` 的交互式页面，编辑器列出的信息像下列这样。

![](./assets/image/image_fvF0Eii2af.png)

想要合并这一堆更改，我们要使用 `squash` 策略进行合并，即把当前的 `commit` 和它的上一个 `commit` 内容进行合并， 大概可以表示为下面这样。

```git 
pick  ... ...
s     ... ... 
s     ... ... 
s     ... ... 

```


修改文件后 按下 `:` 然后 `wq` 保存退出，此时又会弹出一个编辑页面，这个页面是用来编辑提交的信息，修改为 `feat:` 更正,最后保存一下，接着使用 `git branch` 查看提交的 `commit` 信息，`rebase` 后的提交记录如下图所示，是不是清爽了很多？ `rebase` 操作可以让我们的提交历史变得更加清晰。

![](./assets/image/image_W2nXFM6j8w.png)

> 特别注意，只能在**自己使用的 feature 分支上进行 rebase 操作**，不允许在集成分支上进行 rebase，因为这种操作会修改集成分支的历史记录。

## rebase 的风险

> patch：【假设本地分支为 dev1，c1 和 c2 是本地往 dev1 分支上做的两次提交】把 dev1 分支上的c1和 c2 “拆”下来，并临时保存成 c1' 和 c2'。git 里将其称为 patch

`rebase` 会将**当前分支的新提交拆下来**，保存成 `patch`，然后**合并进其他分支新的** `commit`，最后将 `patch` 接**进当前分支**。这是 `rebase`对多条分支的操作。对于单条分支，rebase还能够合并多个 commit单号，将多个提交合并成一个提交。

`git rebase -i [commit id]`命令能够**合并(整改)** `commit id` 之前的所有 `commit`单。加上`-i`选项能够**提供一个交互界面**，分阶段修改`commit`信息并 rebase。

但这里就会出现一个问题：如果你合并多个单号时，**一不小心合并多了，将别人的提交也合并了**，此时你本地的 `commit history` 和**远程仓库**的 `commit history`不一样了，**无论你如何** `push`，都无法推送你的代码了。如果你并不记得 `rebase` **之前的** `HEAD`指向的 `commit` 的` commit ID`的话，`git reflog `**都救不了你。**

***tips:***  你可以 `push`时带上` −f` 参数，强制覆盖远程 `commit history`，你这样做估计会被打，因为覆盖之后，团队的其他人的本地 `commit history`就与**远程的不一样了**，**都无法推送了。**

因此，请保证**仅仅对自己私有的提交单**进行 `rebase`操作，对于已经**合并进远程仓库的历史提交单**，**不要使用** `rebase`操作合并 `commit` 单。
