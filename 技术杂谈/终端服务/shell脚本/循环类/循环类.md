# 循环类

## 目录

- [while sleep 定时执行任务](#while-sleep-定时执行任务)
- [for循环当前文件夹下的文件](#for循环当前文件夹下的文件)

# while sleep 定时执行任务

**从1到10，每隔一秒打印一个数字**

**#! /bin/bash**

\# while loops

n=1

**while**

&#x20;(( \$n <= 10 ))

**do**

  echo \$n

  (( n++ ))

  sleep 1

**done**

# **for循环当前文件夹下的文件**

[https://blog.csdn.net/chenhy24/article/details/93142037](https://blog.csdn.net/chenhy24/article/details/93142037 "https://blog.csdn.net/chenhy24/article/details/93142037")

name=/wls/wls81/name  不能有空格

变量不需要申明；\$name 使用变量名   ;

path=\$(cd \`dirname \$0\`; pwd)  //此处是获取当前目录

echo "we are now at:  \$path"

files=\$(ls \$path)

for file in \$files

do

&#x20;echo \$file&#x20;

//\$file 文件名字

done

dirname \$0，取得当前执行的脚本文件的父目录

cd \`dirname \$0\`，进入这个目录(切换当前工作目录)

pwd，显示当前工作目录(cd执行后的)
