# git使用小技巧二

## 目录

- [Git管理面板](#Git管理面板)
- [常用的操作](#常用的操作)
  - [创建分支](#创建分支)
  - [拉取分支](#拉取分支)
  - [合并分支](#合并分支)
  - [删除分支](#删除分支)
  - [提交代码](#提交代码)
  - [拉取代码](#拉取代码)
  - [暂存与取出](#暂存与取出)
  - [版本回退](#版本回退)
  - [合并部分提交记录](#合并部分提交记录)

[ 合理使用WebStorm - 好用的内置git工具 - 掘金 webstorm中集成了一个很好用的git管理工具，它可以大大提升我们的工作效率，本文就跟大家分享下工作中几个常用操作，欢迎各位感兴趣的开发者阅读本文。 https://juejin.cn/post/6989409377576812574?searchId=2024032809523549AECB6E55DAC0E71C0B](https://juejin.cn/post/6989409377576812574?searchId=2024032809523549AECB6E55DAC0E71C0B " 合理使用WebStorm - 好用的内置git工具 - 掘金 webstorm中集成了一个很好用的git管理工具，它可以大大提升我们的工作效率，本文就跟大家分享下工作中几个常用操作，欢迎各位感兴趣的开发者阅读本文。 https://juejin.cn/post/6989409377576812574?searchId=2024032809523549AECB6E55DAC0E71C0B")

## Git管理面板

我们通过webstorm左下角的Git来打开这套集成工具。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/253625260cbc42bb97a1fe750130dc09~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

打开后的界面如下所示：

- Local Changes 展示你当前已修改但未提交的文件
- Log: master 你当前所在的分支
  - 左侧区域展示的是所有分支列表
    - Local 本地的分支列表
    - Remote 远程仓库的分支列表
  - 右侧区域展示的是当前选中分支的提交记录
    - 选中一个提交记录，最右侧会展示当前提交记录所修改的文件

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc73d66eacae4bb7962594eac81eb959~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

如果你看不到左下角的Git，可能是因为你隐藏了`Tool Window Bars`，在菜单栏`View -Appearance - Tool Window Bars`将其勾选即可。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed5b5ed54eea4c0fa21333be48373eab~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

如果你对webstorm不是很熟悉，请移步我的另一篇文章：[合理使用WebStorm-环境配置篇](https://juejin.cn/post/6987411282274025485 "合理使用WebStorm-环境配置篇")。

## 常用的操作

接下来跟大家分享下，工作中一些常用的git操作，如何在这套内置工具上实现。

### 创建分支

当项目需求明确后，我们要做的第一件事就是创建一个新分支来做这个需求，在这套内置git工具中，我们只需在我们需要基于的分支上右键选择`New Branch from Selected...`即可。

例如：我们想基于`master`分支创建一个新的分支

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a12b6f07ede4b95a648ad1709a39661~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

在弹出框中输入新的分支名，点`CREATE`即可，如下图所示，我们给新分支起名为`AddMenu`

![](../../../assets/技术杂谈/利其器/image/image_rAs3dqyowj.png)

按照上述步骤操作即可完成一个新分支的创建。

> 注意：在弹出框中默认是创建并选中当前创建的分支的，如果你只想创建不想选中，取消弹出框里面的`Checkout branch`选中即可。

创建完车后，我们可能还需要将这个分支推到远程仓库，我们在创建好的分支上右键选择`Push...`即可。

![](../../../assets/技术杂谈/利其器/image/image_6GJKuUTGsY.png)

### 拉取分支

当我们想选中同事的分支，帮同事改bug时，则需要将这个分支拉到本地，在这套内置git工具中我们只需在`Remote`中找到这个分支，右键选择`Checkout`即可。

例如，我们想选中`github_page`分支：

![](../../../assets/技术杂谈/利其器/image/image_kz0trr4xnJ.png)

选择后，你会看到如下图所示的提示。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8562cb60aa1446a0bad4da2a3fb3bc4a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 合并分支

当我们将需求开发完成，测试通过后，就需要将分支合并到dev去了，在这套内置工具中，我们**只需要切换分支到dev**，然后**再需要合并的分支上右键**选择`Merge into Current`即可。

![](../../../assets/技术杂谈/利其器/image/image_9fXlz4H3UH.png)

如果有冲突的文件，则需要解决下冲突，如下所示：

- 选中一个冲突的文件
  - 序号1标注 使用当前所在分支(dev)的文件
  - 序号2标注 使用合并分支的文件
  - 序号3标注 比对两个版本的文件差异，解决冲突

![](../../../assets/技术杂谈/利其器/image/image_DjTv_k2LUv.png)

如果你选择了序号3标注的按钮，将看到如下所示的界面：

- 左侧为dev分支的代码，中间为最终结果区域，右侧为合并分支的代码
- 序号1、2、3标注的地方为应用此处更改到最终结果区域
- `X`的意思是舍弃此处的更改

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee9dfba88b2b4a6d908bf939c7858314~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 删除分支

当我们将某个分支合并到dev后，此时这个分支就不需要了，需要将其删除。

在webstorm中，我们只需在远程分支列表中找到这个分支，右键选择`Delete`即可

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e386e0536ed4e609002e7cff8e3df87~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 提交代码

当我们修复了一个bug，或者完成了一个模块的开发时，需要将代码提交到本地，然后再推送远程仓库，在webstorm中只需要点击`Toolbar`中的`commit`图标和`push`图标即可。

如下所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4f37fda83034514aef7fbd5127ac525~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

在弹出的窗口中，填写提交信息即可。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8d7cc960ed6472b8a9c039274fd4d69~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

提交完成后，点击推送按钮即可将本次提交推送到远程仓库。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc1058e1185344eda9a14470093ada20~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

在弹出的窗口中点`push`即可。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94995d512e3743bebc853f2676f08358~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> 注意：如果你看不到`Toolbar`，则需要在菜单栏: `view - Appearance - ToolBar`将其开启。
> 除此之外，你还可以在菜单栏的`Git`子菜单中去提交/推送，或者按快捷键`command K / command shift K`。

### 拉取代码

当需要获取某个分支上同事修改的最新代码时，此时就需要进行`pull`操作，我们只需在webstorm菜单栏的`git`子菜单下选择pull即可。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e25256f63554d168caa5e9477d0d916~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 暂存与取出

当我们在某个分支上开发需求时，突然来一个加急需求需要你在别的分支改，此时你的更改又不适宜提交，那么就需要将当前更改暂存起来。

我们只需在项目树上右键，选择`Git - Stash Changes...`即可将更改暂存，如下图所示：

![](../../../assets/技术杂谈/利其器/image/image_6ivUtpUaW2.png)

在弹出的窗口中填写保存信息。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61ae6741117d4663b4891629ac990560~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

紧急任务开发完成后，我们切回分支，在项目根目录右键，选择`Git - Unstash Change...`即可。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0996bb764654fa18d7a78909b17999a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 版本回退

当我们提交了代码后，测试那边测出了很多问题，此时我们就会觉得本次提交无意义，需要将其撤销。

我们只需在`Git`面板中，选中要回退的git版本，右键选择`Reset Current Branch to Here...`即可

![](../../../assets/技术杂谈/利其器/image/image_xe1Zdahq41.png)

在弹出的菜单中选择`Hard`选项即可。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3445f80b606b449889c9e632565a4ddc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

> 注意：如果你的提交已经推到了远程仓库，你想删除远程仓库的记录，在本地回退后还需要在终端执行`git push --force`命令进行强推。
>
> 强推是危险命令，如果你回退的版本之后还有别的同事提交的代码，那么此命令将会删除别的同事提交的代码。

### 合并部分提交记录

当我们需要**将某个分支的部分提交合并**到`dev`分支时，我们需要用到`git cherry-pick`命令。

在webstorm中，我们只需切换分支到dev，然后在`Git`面板中选中需要合并提交的分支，选择需要合并的记录，点击`樱桃`图标即可完成合并。

如下所示，我们需要将`AddMenu`分支的两个提交合并到`dev`分支：

![](../../../assets/技术杂谈/利其器/image/image_o9Q7Yq13-C.png)

最后，我们切换到dev分支即可看到合并过来的两个提交，如下所示：

![](../../../assets/技术杂谈/利其器/image/image_sVUPlaMlCJ.png)
