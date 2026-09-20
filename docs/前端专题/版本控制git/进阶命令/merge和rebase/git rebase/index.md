# git rebase

## 目录

- [详解](#详解)
- [其他案例](#其他案例)
- [rebase慎用场景：](#rebase慎用场景)
- [实践经验](#实践经验)

# 详解

- 待变基分支和基分支：
  - **feature：待变基分支、当前分支**
  - **master：基分支、目标分支**
- 官方解释：当执行rebase操作时，git会从**两个分支的共同祖先开始提取待变基分支上的修改**，然后将**待变基分支指向基分支的最新提交**，最后将刚才提取的修改应用到基分支的最新提交的后面。
- 两个分支master和feature，其中feature是在提交点B处从master上拉出的分支，master上有一个新提交M，feature上有两个新提交C和D。

![](./assets/image/image_r7bhnPDbyj.png)

```bash 
git checkout feature 
 git rebase master 
```


下图为**变基后的提交节点图：**

![](./assets/image/image_R3kUw_2B5-.png)

- 当在feature分支上执行git rebase master时，git会从master和featuer的共同**祖先B开始提取feature分支上的修改**，也就是C和D两个提交，先提取到。然后将feature分支**指向master分支的最新提交上**，也就是M。最后把提取的C和D接到M后面，但这个过程是**删除原来的C和D，生成新的C’和D’，他们的提交内容一样，但commit id不同，feature自然最后也是指向D’**
- rebase**字面意思就是"变基"**，可以直接理解为改变基底。**feature分支是基于master分支的B拉出来的分支，feature的基底是B**。而master在B之后有新的提交，就相当于此时要用master**上新的提交来作为feature分支的新基底**。
  - 注意，如果master上在B以后没有新提交，那么就还是用原来的B作为基，**rebase操作相当于无效，此时和git merge就基本没区别了**，差异只在于**git merge会多一条记录Merge操作的提交记录**。

# 其他案例

- 现在假设main分支内新增的内容与你正在开发的新功能有关。
- 为了把main分支里新增的代码应用在你的feature分支，你有两种方法：merge 和 rebase

![](./assets/image/image_21O1Fjzxfd.png)

使用merge：

```bash 
git checkout feature
git merge main
或
git merge feature main

```


- 这会在feature分支中创建一个合并提交，这次提交会连结两个分支的提交历史，在分支图示结构中看起来像下面这样

![](./assets/image/image_19Uf4cfZu2.png)

使用rebase：

```bash 
git checkout feature
 git rebase main
```


- 这些操作会把**feature分支的起始历史放到main分支的最后一次提交之上**，也达成了使用main分支中新代码的目的。但是，相对于merge操作中新建一个合并提交，rebase操作会**通过为原始分支的每次提交创建全新的提交，从而重写原始分支的提交历史**

![](./assets/image/image_6rTbJJnk4l.png)

# rebase慎用场景：

场景一：

- 不要在公共分支上使用它
- 如果把main分支rebase到feature分支之上。
  - 情况一：rebase命令**会把main分支中的所有提交都放到feature分支的提交记录顶端**。问题在于这个改变目前只出现在你的本地仓库。其他开发者仍然在原来的main分支上进行开发。由于rebase会产生全新的提交记录，所以Git会认为现在你本地的main分支与所有其他人的产生了分叉。
  - 情况二：往公共分支上合代码的时候，使用merge。如果使用rebase，那么其他开发人员想看主分支的历史，就不是原来的历史了，历史已经被你篡改了。比如张三和李四从共同的节点拉出来开发，张三先开发完提交了两次然后merge上去了，李四后来开发完rebase上去（注意：李四需要切换到主分支，然后执行git rebase，然后再git push到远端），则李四的新提交变成了张三之前新提交的新基底，本来李四的提交是最新的，结果最新的提交显示反而是张三的，就乱套了
    - 也就是换基底了。

![](./assets/image/image_3SiDbbjo0r.png)

# 实践经验

- rebase 最好不用用于两条分支之间；
- **rebase 重复冲突；最好不要用rebase 了；用pull或者merge；** 或者

```typescript 
git config --global rerere.enabled true 
```


**并不推荐；这条命令的作用是记录你之前解决过的冲突；如果下次是相同的冲突；就会按照记录的方式解决；不用再去手动解决；**

[commit 如何变更](<./commit 如何变更/index.md> "commit 如何变更")
