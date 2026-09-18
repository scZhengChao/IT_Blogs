# git remote

## 目录

- [git remote](#git-remote)
  - [第一次上传](#第一次上传)
  - [git remote -v](#git-remote--v)

# git remote

## 第一次上传

1. 初始化git版本库：git init
2. 添加文件到本地库：git add .
3. 提交文件到本地库：git commit -m "msg(提交日志)"

**重要提示：2、3可合并（git commit -am ""）**

1. 关联远程库：git remote add origin  url 关联之后可以用git remote -v 来检查是否关联成功
2. 一般情况需要先pull一下：git pull origin master一般情况下含有共同文件时需要执行 git merge origin/master --allow-unrelated-histories这之后解决一下冲突
3. push到远程库：git push -u origin master

```react jsx 
git remote. add origin github分支地址.    关联仓库

git push -u origin master
```


## git remote -v

检查是否关联成功
