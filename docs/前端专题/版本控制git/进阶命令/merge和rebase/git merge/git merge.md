# git merge

## 目录

- [merge:](#merge)
- [忽略指定文件](#忽略指定文件)
- [忽略全部文件](#忽略全部文件)

## merge:

```react jsx 
git merge tmp.  // 合并temp分支到当前分支
```


## 忽略指定文件

- 启用虚拟的merge策略（--global酌情添加）  &#x20;

  `git config --global merge.ours.driver true` &#x20;

  可以通过`git config -l`查看是否启用以及其他配置
- 根目录添加`.gitattributes`文件，配置要忽略merge的文件

```typescript 
vue.config.js merge=ours
dist/** merge=ours

```


> 📌**所选文件merge冲突时会自动采用当前分支的内容，且之后每次merge都不会再改动（注意至少要冲突一次，否则不会生效）**

**一定要冲突一次；而且 本地merge 确实生效了不合并**；但是远程分支一合并就提示冲突；而且pull 也是不生效的；有点鸡肋

由于 Git 配置文件非常灵活，目前**服务端不支持在合并时忽略部分文件不合入**。

## 忽略全部文件

git merge -s ours 分支 完全不改变当前分支的文件，但视为已经merge

**只适用于本地；不适用于服务端**
