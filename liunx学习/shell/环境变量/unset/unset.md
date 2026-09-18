# unset

```nginx 
unset 变量名
```


- 作用：彻底删除一个已经存在的 shell 变量或环境变量，使其不再存在。
- 示例：

```bash 
export MYVAR=123      # 设置环境变量
echo $MYVAR           # → 123
unset MYVAR           # 删除变量
echo $MYVAR           # → （空，什么都不输出）
```
