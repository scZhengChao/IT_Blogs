# sparse checkout

## 目录

- [Sparse checkouts](#Sparse-checkouts)
- [基本使用方式](#基本使用方式)

我们现在有越来越多的项目都是前后端分离的架构，所以在一个 Git Repo 里面同时放前后端代码是很常见的情况。不过，问题来了，如果前后端分离的很干净，若是前端人员不想要看到“后端”的原始代码，那 Git 有办法做到“部分取出”的功能吗？是的，还真的有！这篇文章我就来说说这个好用的功能。

个人或者公司通过git托管项目，有时候项目很多，但是都不大，单独为每个项目创建一个repository又不值得，这个时候，可以把相似功能的项目抽到一个repository当中，这个时候，可以通过sparse checkout来实现我们所要的功能。

也就是设定sparse checkout后，我可以只同步自己想要的部分代码，不用所有代码都更新。

# Sparse checkouts

Sparse checkouts 是一个从 Git 2.25 才开始支持的功能，主要用途就是帮助你取得一个 Repo 的部分内容，大幅减少本机硬盘空间的占用，也可以帮助你更加专注在当前的开发项目。这样的机制尤其对目前 Monorepo 正夯的时候，提供一个绝佳的解决方案。

英文的 Sparse 是一个形容词，表示“稀疏的”、“零落的”的意思，代表你仅会从 Repo 取出“零星的”档案！我们从 Git 官网的 git-sparse-checkout 文件可以看到他的定义：

```bash 
Reduce your working tree to a subset of tracked files

```


# 基本使用方式

```bash 
cd .git
git config core.sparseCheckout true
echo "demofile" >> .info/sparse-checkout //demofile就是我想要更新的目录

//然后就可以只拉取部分代码了
git pull origin master

```


或者

```bash 
$ git init new.project && cd new.project
$ git config core.sparseCheckout true
$ echo '/ajax/libs/jquery/*' >> .git/info/sparse-checkout
git remote add origin git://github.com/cdnjs/cdnjs.git
git pull origin master --depth=10  #(这边可以加上前面说的 shallow pull，加上 --depth=n )：



```


如果之后想改变要 checkout 的文件呢？

就直接更改项目底下的 .git/info/sparse-checkout 档案，

范例：

```bash 
/ajax/libs/jquery/*
/build
/CONTRIBUTING.md
/MIT-LICENSE
/README.md
/sparseCheckout.md
//cdn2.peterdavehello.org/auto-update.js
/circle.yml
/CONTRIBUTING-WIP.md
//cdn2.peterdavehello.org/package.json
/update-script.sh

```


有一点要注意就是文件名前面代表项目根目录的斜线不要省略，若非要 checkout 所有同名文件，就要把完整路径写清楚，例如 `/package.json` 如果写成 package.json，则所有的 package.json 都会被 checkout 出来
