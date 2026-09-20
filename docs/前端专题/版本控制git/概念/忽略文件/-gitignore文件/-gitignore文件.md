# .gitignore文件

## 目录

- [匹配规则](#匹配规则)

           在git中如果想忽略掉某个文件，不让这个文件提交到版本库中，可以**使用修改 .gitignore 文件的**方法。这个文件每一行保存了一个匹配的规则例如：

### 匹配规则

1. \# 此为注释 – 将被 Git 忽略
2. \*.a                    # 忽略所有 .a 结尾的文件             
3. !lib.a                 # 但 lib.a 除外             
4. /TODO             # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO             
5. build/               # 忽略 build/ 目录下的所有文件
6. doc/ \*.txt           # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
