# 缓存区

## 目录

- [忽略本地某一文件更改，不提交](#忽略本地某一文件更改不提交)

# [忽略本地某一文件更改，不提交](https://www.cnblogs.com/ithubb/p/14131829.html "忽略本地某一文件更改，不提交")

```javascript 
// 比如有一个文件： config.php 里面有一些本地开发环境参数，不需要提交
 git update-index --assume-unchanged config.php 
//执行
git status 
就看不到config.php 文件了

 如果需要提交config.php文件了，执行： 
git update-index --no-assume-unchanged config.php 
git status 
就可以看到config.php了，这时就可以提交了

```
