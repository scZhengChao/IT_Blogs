# 设置 Git 短命令

## 目录

- [方式一](#方式一)

对我这种喜欢敲命令而不用图形化工具的爱好者来说，设置短命令可以很好的提高效率。下面介绍两种设置短命令的方式。

# **方式一**

```javascript 
git config --global alias.ps push   
```


**方式二**

```javascript 
打开全局配置文件
vim ~/.gitconfig

写入内容
[alias] 
        co = checkout
        ps = push
        pl = pull
        mer = merge --no-ff
        cp = cherry-pick
        
使用      
# 等同于 git cherry-pick <commitHash>
git cp <commitHash>


```


习惯

```纯文本 
git config --global alias.st status
git config --global alias.ck checkout
git config --global alias.ct commit
 
```
