# branch

## 目录

- [切换并关联远程分支](#切换并关联远程分支)
- [git branch ](#git-branch-)
  - [查看分支](#查看分支)
  - [切换分支 ](#切换分支)
  - [删除分支](#删除分支)
  - [跟新分支](#跟新分支)
  - [修改分支名字](#修改分支名字)

# 切换并关联远程分支

-    git checkout  branch\_20190523 切换到分支
-   git push --set-upstream origin branch\_20190523   推到远程主机的分支并且关联
-   git pull origin branch   pull的时候的也要指定远程分支

注意：这里可以不同关联远程分支；就在本地分支操作；也可以关联远程的master分支

git checkout  -b branch\_2019  新建本地分支，并切换到branch\_2019

**或者**

- git pull origin dev-200918 
- git branch --set-upstream-to=origin/dev-200918

# git branch&#x20;

## 查看分支

- git branch -a   查看所有分支
- git branch -r  查看远程分支
- git branch   查看当前使用分支(结果列表中前面标\*号的表示当前使用分支)
- git reflog show --date=iso V1.5.3 查看分支创建时间
- git remote update origin --prune #跟新远程主机origin整理分支

## 切换分支 

- git checkout 分支名    切换分支（不仅是本地分支；也可以是远程分支）
- git checkout -b 分支名  创建并切换分支
- git checkout -b  name  origin/name

## 删除分支

- git branch -d 分支名   删除本地分支　
- git push origin –delete 分支名   删除远程分支

## 跟新分支

- git fetch origin
  - git branch -a

## 修改分支名字

3、执行命令git branch -m br\_rename\_old br\_rename\_new将本地仓库的br\_rename\_old的名称修改为br\_rename\_new

4、执行命令git push --set-upstream origin br\_rename\_new将本地分支push到远程仓库
