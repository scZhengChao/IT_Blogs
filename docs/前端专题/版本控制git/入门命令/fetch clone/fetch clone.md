# fetch clone

## 目录

- [git fetch](#git-fetch)
  - [拉取远程分支合并到当前分支](#拉取远程分支合并到当前分支)
- [git clone](#git-clone)
  - [拉去远程分支](#拉去远程分支)

# git fetch

## 拉取远程分支合并到当前分支

```javascript 
1. git fetch origin master:tmp  或者 (git checkout -b tmp origin/master  git checkout master)
//在本地新建一个temp分支，并将远程origin仓库的master分支代码下载到本地temp分支
2. git diff tmp
//来比较本地代码与刚刚从远程下载下来的代码的区别
3. git merge tmp
//合并temp分支到本地的master分支
4. git branch -d temp
//如果不想保留temp分支 可以用这步删除
5. git push 
// 将本地推到远程

```


# git clone

## 拉去远程分支

git clone -b branch url  克隆远程分支
