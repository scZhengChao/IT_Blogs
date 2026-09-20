# git rebase合并多次commit

rebase的作用简要概括为：可以对某**一段线性提交历史进行编辑、删除、复制、粘贴；** 因此，合理使用rebase命令可以使我们的提交历史干净、简洁！

但是需要注意的是：

> **不要**通过rebase对任何**已经提交到公共仓库中的commit进行修改**（你自己一个人玩的分支除外）

当我们在本地仓库中提交了多次，在我们把本地提交push到公共仓库中之前，**为了让提交记录更简洁明了，我们希望把如下分支B、C、D三个提交记录合并为一个完整的提交，然后再push到公共仓库。**

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/2/1631fdf49c54c568~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

这里我们使用命令:

```markdown 

git rebase -i  [startpoint]  [endpoint]


```


其中`-i`的意思是`--interactive`，即**弹出交互式的界面让**用户编辑完成合并操作，`[startpoint] [endpoint]`则指定了一个**编辑区间**，如果不指定`[endpoint]`，则该区间的**终点默认是当前分支HEAD所指向的commit**(注：该区间指定的是一个**前开后闭的区间**)。

- **作用范围**：从当前分支的`HEAD`开始，到`<commitId>`（**不包括该提交**）的所有提交会被列出，供你交互式编辑。
- **`<commitId>`**：可以是提交哈希（如`abc1234`）、分支名（如`master`）或相对引用（如`HEAD~3`，表示最近 3 个提交）。

&#x20;在查看到了log日志后，我们运行以下命令：

```bash 
git rebase -i 36224db


```


或者

```bash 
git rebase -i HEAD~3 



```


然后我们会看到如下界面:

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/2/1631fdf49c668a35~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

上面未被注释的部分列出的是我们本次rebase操作包含的所有提交，下面注释部分是git为我们提供的命令说明。每一个commit id 前面的pick表示指令类型，git 为我们提供了以下几个命令:

```markdown 
pick：保留该commit（缩写:p）
reword：保留该commit，但我需要修改该commit的注释（缩写:r）
edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）
squash：将该commit和前一个commit合并（缩写:s）
fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）
exec：执行shell命令（缩写:x）
drop：我要丢弃该commit（缩写:d）

```


根据我们的需求，我们将commit内容编辑如下:

> pick d2cf1f9 fix: 第一次提交
>
> s 47971f6 fix: 第二次提交
>
> s fb28c8d fix: 第三次提交

上面的意思就是把第二次、第三次提交都合并到第一次提交上

然后`wq`保存退出后是注释修改界面:

![](./image/image_Qiv7j0Qrqc.png)
