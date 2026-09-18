# 配置

## 目录

- [git pull 策略](#git-pull-策略)
- [git merge 策略](#git-merge-策略)
- [查看当前未推送到远程的commitId](#查看当前未推送到远程的commitId)

# git pull 策略

默认使用rebase 策略

```javascript 
git config pull.rebase true   
// 对应到.git/gitconfig 


```


等价于： git pull  - - rebase&#x20;

# git merge 策略

禁用快速合并

```bash 
git config merge.ff false


```


# 查看当前未推送到远程的commitId

```bash 
git log origin/<branch>..HEAD
// 或更简洁的：
git log @{u}..
//以单行格式查看未推送的提交（更简洁）
git log @{u}.. --oneline

```
