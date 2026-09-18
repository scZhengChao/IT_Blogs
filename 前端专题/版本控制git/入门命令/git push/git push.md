# git push

## 目录

- [git push](#git-push)
  - [关联原创分支](#关联原创分支)
  - [撤销git push](#撤销git-push)
  - [强制推送push代码       ](#强制推送push代码)
  - [删除远程分支](#删除远程分支)

# git push

## 关联原创分支

git push --set-upstream origin branch\_20190523

## 撤销git push

1. &#x20;执行  git log查看日志，获取需要回退的版本号 
2. &#x20;执行 git reset –-soft <版本号> ，如 git reset --soft 4f5e9a90edeadcc45d85f43bd861a837fa7ce4c7 ，重置至指定版本的提交，达到撤销提交的目的然后执行 git log 查看

此时，已重置至指定版本的提交，log中已经没有了需要撤销的提交，也是git log没有提交记录，但是本地代码没变，和撤销git commit 的区别是--soft没变，--hard变了；

1. &#x20;执行 git push origin 分支名 –-force ，强制提交当前版本号。

至此，撤销push提交完成。

## 强制推送push代码\*\*  \*\*     

1.  git push origin branch\_20190606  --force
2. git  push -f -u origin branch
3. git push -u origin dev:release

## 删除远程分支

执行命令git push origin --delete br\_rename\_old将远程分支br\_rename\_old删除
