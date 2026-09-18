# 怎么查看自己使用的是哪一个shell？

在现代的 Linux 上，sh 已经被 bash 代替，/bin/sh往往是指向/bin/bash的符号链接。如果你希望查看当前 Linux或MacOS的默认shell，那么可以输出 shell 环境变量：

```html 
echo $SHELL 
或者
 echo $0
```


如果想知道自己系统安装了哪些shell，使用如下命令可得到如下所示的信息。

```html 
cat /etc/shells
```
