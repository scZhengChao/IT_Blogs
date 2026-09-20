# 忽略跟踪

## 目录

- [忽略跟踪](#忽略跟踪)
- [--cached --f](#--cached---f)
- [删除远程仓库的文件保留本地文件](#删除远程仓库的文件保留本地文件)

## 忽略跟踪

1. 但是有时候，`gitignore`考虑不全面，发现有不该提交的文件已经提交后(commit 后)，仅仅在.gitignore中加入忽略是不行的。这个时候需要执行:

```bash 
git rm -r --cached filename 

```


去掉已经托管的文件，然后提交即可。

1. 对于已入库的文件：

命令：

```bash 
git update-index --assume-unchanged /path/to/file   #忽略跟踪       路径+文件名

git update-index --assume-unchanged   要忽略的文件夹名/文件夹下文件名
git update-index --assume-unchanged   要忽略的文件夹名/
git update-index --assume-unchanged   要忽略的文件夹/*.后缀名


```


注意：这里要注意的是添加文件夹名的时候，要注意具体到文件夹名之后还要加上 / ，不然会报错！！！！

若以后不想忽略该文件的修改，则输入命令：

```bash 
git update-index --no-assume-unchanged /path/to/file   #恢复跟踪  
```


## **--cached --f**

使用 **git rm** 命令即可，有两种选择,

1. 一种是 **git rm --cached "文件路径"**，不**删除物理文件，仅将该文件从缓存中删除；**
2. 一种是 **git rm --f "文件路径"**，不仅将**该文件从缓存中删除，还会将物理文件删除（不会回收到垃圾桶）。**

## 删除远程仓库的文件保留本地文件

          在使用git和github的时候，**之前没有写.gitignore文件，就上传了一些没有必要的文件，**

1. 在添加了.gitignore文件后，就想删除远程仓库中的文件却想保存本地的文件。
2. 这时候不可以直接使用"git rm directory"，这样会删除本地仓库的文件
3. 可以使用"**git rm -r –-cached directory"来删除缓冲，**
4. 然后进行"commit"和"push"，这样会发现远程仓库中的不必要文件就被删除了，
5. 以后**可以直接使用"git add -A"来添加修改的内容，上传的文件就会受到.gitignore文件的内容约束。**
